// date.js - Dynamic copyright year and last modified date

// Set current copyright year
const yearEl = document.getElementById('copyright-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Set last modified date
const lastModifiedEl = document.getElementById('lastModified');
if (lastModifiedEl) {
  lastModifiedEl.innerHTML = `Last Modified: ${document.lastModified}`;
}