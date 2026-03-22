// date.js — Dynamic copyright year and last modified

const yearEl = document.getElementById('copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.getElementById('lastModified');
if (lastModEl) lastModEl.textContent = `Last modified: ${document.lastModified}`;