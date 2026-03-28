// thankyou.js — Preloader + render submitted form data from URL params

/* ── Preloader ── */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) setTimeout(() => pre.classList.add('hidden'), 400);
});

/* ── Membership level display labels ── */
const LEVEL_LABELS = {
  np:     'NP Membership — Non-Profit (No Fee)',
  bronze: 'Bronze Membership (R750/month)',
  silver: 'Silver Membership (R1,500/month)',
  gold:   'Gold Membership (R3,000/month)'
};

/* ── Safe param reader ── */
function getParam(params, key, fallback) {
  const val = params.get(key);
  return (val && val.trim() !== '') ? val.trim() : (fallback || '—');
}

/* ── Build and inject the summary table ── */
function buildSummary() {
  const summary = document.getElementById('submission-summary');
  if (!summary) return;

  const params = new URLSearchParams(window.location.search);

  // Guard: user navigated here directly without submitting
  if (!params.has('fname')) {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = 'Notice';
    dd.textContent = 'No submission data found. Please complete the application form.';
    dd.classList.add('summary-empty');
    summary.appendChild(dt);
    summary.appendChild(dd);
    return;
  }

  const fname     = getParam(params, 'fname');
  const lname     = getParam(params, 'lname');
  const email     = getParam(params, 'email');
  const phone     = getParam(params, 'phone');
  const orgname   = getParam(params, 'orgname');
  const level     = params.get('membership') || '';
  const timestamp = getParam(params, 'timestamp');

  const levelLabel = LEVEL_LABELS[level] || '—';

  const rows = [
    { label: 'Full Name',      value: `${fname} ${lname}` },
    { label: 'Email Address',  value: email },
    { label: 'Mobile Phone',   value: phone },
    { label: 'Organisation',   value: orgname },
    { label: 'Membership',     value: levelLabel },
    { label: 'Submitted At',   value: timestamp }
  ];

  // Build DOM nodes — no innerHTML avoids XSS from URL params
  rows.forEach(row => {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = row.label;
    dd.textContent = row.value;
    summary.appendChild(dt);
    summary.appendChild(dd);
  });

  // Personalise the page heading with the applicant's first name
  const heading = document.getElementById('thankyou-heading');
  if (heading && fname !== '—') {
    heading.textContent = `Welcome, ${fname}`;
  }
}

buildSummary();