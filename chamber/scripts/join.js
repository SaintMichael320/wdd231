// join.js — Timestamp injection + modal management

/* ── Timestamp ── */
const tsField = document.getElementById('timestamp');
if (tsField) {
  tsField.value = new Date().toLocaleString('en-ZA', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}

/* ── Modal helpers ── */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.showModal();
    // Move focus to first focusable element inside
    const first = modal.querySelector('button, [tabindex="0"]');
    if (first) first.focus();
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.close();
}

/* ── "Learn More" buttons → open modal ── */
document.querySelectorAll('.btn-learn').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.modal));
});

/* ── Close buttons ── */
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});

/* ── "Select" buttons → prefill dropdown + close modal ── */
document.querySelectorAll('.btn-select').forEach(btn => {
  btn.addEventListener('click', () => {
    const select = document.getElementById('membership');
    if (select && btn.dataset.level) {
      select.value = btn.dataset.level;
    }
    closeModal(btn.dataset.close);
    // Scroll to and focus the dropdown for confirmation
    if (select) {
      select.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => select.focus(), 300);
    }
  });
});

/* ── Close modal on backdrop click ── */
document.querySelectorAll('.membership-modal').forEach(modal => {
  modal.addEventListener('click', e => {
    const rect = modal.getBoundingClientRect();
    const isOutside = (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom
    );
    if (isOutside) modal.close();
  });
});

/* ── Preloader ── */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) setTimeout(() => pre.classList.add('hidden'), 400);
});