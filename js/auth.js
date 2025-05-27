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

loginForm?.addEventListener("submit", loginUser);

async function loginUser(e) {
	e.preventDefault();

	const userName = document.getElementById("loginUsername").value;
	const password = document.getElementById("loginPassword").value;
	const loginStatus = document.getElementById("loginStatus");

	try {
		const result = await loginPatient({ userName, password });
		loginStatus.innerText = result.message || "Login successful!";
		loginStatus.style.color = "green";
	} catch (error) {
		loginStatus.innerText = `Login failed: ${error.message}`;
		loginStatus.style.color = "red";
	}
}

const modal = document.getElementById("loginModal");
const closeBtn = document.getElementById("closeModal");

closeBtn.addEventListener("click", () => {
	modal.style.display = "none";
});
