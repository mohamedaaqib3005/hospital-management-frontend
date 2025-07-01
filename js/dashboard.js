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
    userGreeting.innerText = `Hello, ${userName}`;
  }
});

const specialities = [
  { id: 1, name: "cardiology", image: "../assets/cardiology.jpg" },
  { id: 2, name: "dermatology", image: "../assets/girl.jpg" },
  { id: 3, name: "neurology", image: "../assets/brain.jpeg" },
];

const container = document.getElementById("specialities-container");

specialities.forEach((spec) => {
  const figure = document.createElement("figure");

  figure.innerHTML = `<a href="doctor-list.html?speciality=${encodeURIComponent(spec.name)}">

<img src="${spec.image}" alt="${spec.name}" />

</a>

<figcaption>${spec.name.charAt(0).toUpperCase() + spec.name.slice(1)
    }</figcaption>

`;

  container.appendChild(figure);
});

window.logout = () => {
  // document.cookie = "isLoggedIn=; path=/; max-age=0";// ask server to clear session
  // document.cookie = "userName=; path=/; max-age=0";// islogged is only for session storage not cookies
  window.location.href = "http://127.0.0.1:5500/frontend/index.html";// call the backend api
};
