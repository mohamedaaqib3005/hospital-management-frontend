import { registerPatient } from "./request.js";

const registrationForm = document.getElementById("registerForm");

registrationForm.addEventListener("submit", sendFormData);

async function sendFormData(e) {
	e.preventDefault();

	const fullName = document.getElementById("fullName").value;
	const userName = document.getElementById("userName").value;
	const dob = document.getElementById("dob").value;
	const password = document.getElementById("password").value;

	const genderInput = document.querySelector('input[name="gender"]:checked');
	const gender = genderInput ? genderInput.value : "";

	const data = {
		fullName,
		userName,
		dob,
		password,
		gender,
	};

	console.log("the data sent to backend", data);

	const status = document.getElementById("registrationStatus");

	try {
		await registerPatient(data);
		status.innerText = "Registration successful!";
		status.style.color = "green";
	} catch (error) {
		status.innerText = `"Registration failed: " ${error.message}`;
		status.style.color = "red";
	}
}

// const genderInput = form.querySelector('input[name="gender"]:checked');
// const gender = genderInput ? genderInput.value : "";

// const result = await registerPatient(data);

// const status = document.getElementById("registrationStatus");
// if (result) {
//   status.innerText = "Registration Successful";
//   status.style.color = "green";
// } else {
//   status.innerText = "Registration failed";
//   status.style.color = "red";
// }
