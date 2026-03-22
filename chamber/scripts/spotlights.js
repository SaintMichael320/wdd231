// spotlights.js — Randomly display 2–3 gold/silver member spotlight cards

async function loadSpotlights() {
  const container = document.getElementById('spotlights-container');
  if (!container) return;

  container.innerHTML = '<p class="loading-text">Loading member spotlights…</p>';

  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { members } = await res.json();

    // Filter to gold + silver only
    const eligible = members.filter(m => m.membership === 'gold' || m.membership === 'silver');

    // Fisher-Yates shuffle
    for (let i = eligible.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
    }

    // Pick 2 or 3
    const count = Math.random() < 0.5 ? 2 : 3;
    const picks = eligible.slice(0, count);

    container.className = `spotlights-grid count-${count}`;
    container.innerHTML = picks.map(m => {
      const isGold = m.membership === 'gold';
      const domain = m.website.replace(/^https?:\/\//, '');
      const badgeClass = isGold ? 'gold-badge' : 'silver-badge';
      const cardClass  = isGold ? 'gold-member' : 'silver-member';
      const star = isGold ? '★' : '◆';

      return `
        <article class="spotlight ${cardClass}" aria-label="${m.name} spotlight">
          <img
            src="${m.image}"
            alt="${m.name} company logo"
            class="spot-logo"
            width="90" height="60"
            loading="lazy"
            onerror="this.style.visibility='hidden'"
          />
          <div>
            <p class="spot-name">${m.name}</p>
            <p class="spot-info">
              📞 <a href="tel:${m.phone.replace(/\s/g,'')}" style="color:inherit;">${m.phone}</a><br>
              📍 ${m.address}
            </p>
            <a
              href="${m.website}"
              class="spot-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit ${m.name} website, opens in new tab"
            >${domain}</a>
            <p style="margin-top:0.6rem;">
              <span class="spot-badge ${badgeClass}">${star} ${m.membership.charAt(0).toUpperCase() + m.membership.slice(1)} Member</span>
            </p>
          </div>
        </article>
      `;
    }).join('');

  } catch (err) {
    console.error('[spotlights.js]', err.message);
    if (container) container.innerHTML =
      `<p class="loading-text">Member spotlights unavailable.</p>`;
  }
}

loadSpotlights();