// join.js — Preloader, timestamp injection, and modal management

/* ── Preloader ── */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) setTimeout(() => pre.classList.add('hidden'), 400);
});

/* ── Timestamp: record when the form was loaded ── */
const tsField = document.getElementById('timestamp');
if (tsField) {
  tsField.value = new Date().toLocaleString('en-ZA', {
    year:   'numeric',
    month:  'long',
    day:    'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/* ── Modal helpers ── */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.showModal();
  const firstFocusable = modal.querySelector('button, [tabindex="0"]');
  if (firstFocusable) firstFocusable.focus();
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.close();
}

/* ── "Learn More" buttons → open corresponding modal ── */
document.querySelectorAll('.btn-learn').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.modal));
});

/* ── All elements with data-close → close that modal ── */
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});

/* ── "Select" buttons → pre-fill dropdown then close modal ── */
document.querySelectorAll('.btn-select').forEach(btn => {
  btn.addEventListener('click', () => {
    const select = document.getElementById('membership');
    if (select && btn.dataset.level) {
      select.value = btn.dataset.level;
    }
    closeModal(btn.dataset.close);
    if (select) {
      select.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => select.focus(), 300);
    }
  });
});

/* ── Close modal when clicking outside the dialog box ── */
document.querySelectorAll('.membership-modal').forEach(modal => {
  modal.addEventListener('click', e => {
    const rect = modal.getBoundingClientRect();
    const clickedOutside = (
      e.clientX < rect.left  ||
      e.clientX > rect.right ||
      e.clientY < rect.top   ||
      e.clientY > rect.bottom
    );
    if (clickedOutside) modal.close();
  });
});

/* ── Close modal on Escape key (native dialog handles this,
      but we also restore body scroll if needed) ── */
document.querySelectorAll('.membership-modal').forEach(modal => {
  modal.addEventListener('close', () => {
    // Return focus to the button that opened this modal
    const trigger = document.querySelector(`[data-modal="${modal.id}"]`);
    if (trigger) trigger.focus();
  });
});