document.addEventListener("DOMContentLoaded", () => {
	const user = JSON.parse(localStorage.getItem("user"));
	const userHeader = document.getElementById("user-header");
	const userGreeting = document.getElementById("user-greeting");

	if (user && userHeader && userGreeting) {
		userHeader.style.display = "grid";
		userGreeting.innerText = `Hello, ${user.name}`;
	}
});

window.logout = () => {
	localStorage.removeItem("user");
	localStorage.clear();
	window.location.href = "http://127.0.0.1:5500/frontend/index.html";
};
