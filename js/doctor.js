document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector("main");
    const params = new URLSearchParams(window.location.search);// gets the query string after ? and converts into object
    console.log(params);
    const speciality = params.get("speciality");
    console.log(speciality);

    if (!speciality) {
        container.innerHTML = "<h2>No speciality selected.</h2>";
        return;
    }

    const startTime = new Date("2024-01-01").toISOString(); //convert to ISO 8601 format
    const endTime = new Date("2026-01-01").toISOString();

    try {
        const response = await fetch(`http://localhost:5000/api/doctors/specialities/${speciality}?startTime=${startTime}&endTime=${endTime}`, {
            // credentials: "include"
        });
        console.log(response)
        const data = await response.json();
        console.log(data);

        if (!Array.isArray(data) || data.length === 0) {
            container.innerHTML = "<h2>No doctors available for this speciality.</h2>";
            return;
        }
        // make 2 condition as it can be response not ok other 

        const grouped = {};
        data.forEach(d => {
            if (!grouped[d.doctor_id]) {
                grouped[d.doctor_id] = {
                    full_name: d.full_name,
                    gender: d.gender,
                    fees: d.fees,
                    slots: []
                };
            }
            grouped[d.doctor_id].slots.push({
                id: d.slot_id,
                time: new Date(d.slot_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                raw: d.slot_time
            });
        });
        console.log("the raw data is", data);
        container.innerHTML = "";

        Object.entries(grouped).forEach(([id, doc], index) => {
            const card = document.createElement("div");
            card.className = "card-container";

            const slotInputs = doc.slots.map((s, i) => `
        <label>
          <input type="radio" name="slot-${id}" value="${s.id}" ${i === 0 ? "checked" : ""}/>
          ${s.time}
        </label>
      `).join("");
// inner.text or text content 
// use function to escape like &lt 
// string will go html runtime escape it 
            const today = new Date().toISOString().split("T")[0];// only date 
            console.log("the grouped data is", grouped);
            card.innerHTML = `
        <div class="side-profile">
          <img src="../assets/doctor-${(index % 5) + 1}.jpg" alt="${doc.full_name}" />
          <ul class="social-icons">
            <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i class="fab fa-instagram"></i></a></li>
            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
          </ul>
        </div>
        <div class="details">
          <h2>${doc.full_name}</h2>
          <p class="specialization">${speciality}</p>
          <p class="experience">Gender: ${doc.gender}</p>
          <div class="date-selection">
            <label for="appointment-date-${id}">Select Date:</label>
            <input type="date" id="appointment-date-${id}" name="appointment-date" value="${today}" />
          </div>
          <div class="slot-selection">
            <p>Appointment Slot:</p>
            ${slotInputs}
          </div>
          <button class="book-btn" onclick="bookNow(${id})">Book Appointment</button>
        </div>
      `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Failed to fetch doctors:", error);
        container.innerHTML = "<h2>Error loading doctor list.</h2>";
    }
});

window.bookNow = function (doctorId) {
    const selectedSlot = document.querySelector(`input[name="slot-${doctorId}"]:checked`);// finds 
    console.log(selectedSlot);
    const selectedDate = document.querySelector(`#appointment-date-${doctorId}`).value;
    console.log(selectedDate);
    if (!selectedSlot || !selectedDate) {
        alert("Please select date and slot");
        return;
    }

    const slotId = selectedSlot.value;

    // Redirect to confirm appointment
    window.location.href = `confirm.html?doctor_id=${doctorId}&slot_id=${slotId}&date=${selectedDate}`;
};
