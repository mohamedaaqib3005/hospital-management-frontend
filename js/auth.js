import { registerPatient, loginPatient } from "./request.js";

const registrationForm = document.getElementById("registerForm");

registrationForm.addEventListener("submit", sendFormData);

async function sendFormData(e) {
	e.preventDefault();

	const fullName = document.getElementById("fullName").value;
	const userName = document.getElementById("userName").value;
	const dob = document.getElementById("dob").value;
	const password = document.getElementById("registerPassword").value;

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
// Login Form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", loginUser);

async function loginUser(e) {
	e.preventDefault();

	const userName = document.getElementById("loginUsername").value;
	const password = document.getElementById("loginPassword").value;
	const loginStatus = document.getElementById("loginStatus");

	const data = {
		userName,
		password,
	};
	console.log("the data sent to backend", data);
	try {
		await registerPatient(data);
		await loginPatient({ userName, password });

		// document.cookie = `isLoggedIn=true; path=/; max-age=${60 * 60 * 24}`;
		// document.cookie = `userName=${encodeURIComponent(userName)}; path=/; max-age=${60 * 60 * 24}`;

		loginStatus.innerText = "Login successful!";
		loginStatus.style.color = "green";

		setTimeout(() => {
			window.location.href =
				"http://127.0.0.1:5500/frontend/pages/dashboard.html";
		}, 1000);
	} catch (error) {
		loginStatus.innerText = `Login failed: ${error.message}`;
		loginStatus.style.color = "red";
	}
}
// popup
const loginLink = document.getElementById("loginLink");
const loginDialog = document.getElementById("loginModal");
const closeBtn = document.getElementById("closeModal");

loginLink.addEventListener("click", (e) => {
	e.preventDefault();
	loginDialog.showModal();
});

closeBtn.addEventListener("click", () => loginDialog.close());

loginDialog.addEventListener("click", (e) => {
	if (e.target === loginDialog) loginDialog.close();
});
