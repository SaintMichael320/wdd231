const url = "data/members.json";
const container = document.querySelector("#members");

// Fetch data
async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data);
}

// Display members
function displayMembers(members) {
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name}">
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    container.appendChild(card);
  });
}

getMembers();

// Toggle view
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");

gridBtn.addEventListener("click", () => {
  container.classList.add("grid");
  container.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list");
  container.classList.remove("grid");
});

// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Mobile menu
const menuBtn = document.querySelector("#menu");
const nav = document.querySelector("#nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});