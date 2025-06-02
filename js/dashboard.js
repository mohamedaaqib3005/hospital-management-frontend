function getCookie(name) {
	const cookies = document.cookie.split("; ");
	for (const cookie of cookies) {
		const [key, value] = cookie.split("=");
		if (key === name) return decodeURIComponent(value);
	}
	return null;
}

document.addEventListener("DOMContentLoaded", () => {
	const userName = getCookie("userName");
	const userHeader = document.getElementById("user-header");
	const userGreeting = document.getElementById("user-greeting");

	if (userName && userHeader && userGreeting) {
		userHeader.style.display = "grid";
		userGreeting.innerText = `Hello, ${user.name}`;
	}
});

window.logout = () => {
	document.cookie = "isLoggedIn=; path=/; max-age=0";
	document.cookie = "userName=; path=/; max-age=0";
	window.location.href = "http://127.0.0.1:5500/frontend/index.html";
};
