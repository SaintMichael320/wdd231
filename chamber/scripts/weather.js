const API_KEY  = '7cd1d6728c7c950dc18e9f981146ef04';
const LAT      = -25.7479;
const LON      =  28.2293;
const UNITS    = 'metric';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const ICONS = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '⛅',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️',
};

function icon(code) { return ICONS[code] || '🌡️'; }

function dayLabel(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString('en-ZA', { weekday: 'short' });
}

function renderSkeleton() {
  const nowEl = document.getElementById('weather-now');
  const fcEl  = document.getElementById('weather-forecast');
  if (!nowEl || !fcEl) return;
  nowEl.innerHTML = `<p class="loading-text">Fetching Pretoria weather…</p>`;
  fcEl.innerHTML  = '';
}

async function fetchWeather() {
  const nowEl = document.getElementById('weather-now');
  const fcEl  = document.getElementById('weather-forecast');
  if (!nowEl || !fcEl) return;

  renderSkeleton();

  try {
    // Current conditions
    const curRes = await fetch(
      `${BASE_URL}/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`
    );
    if (!curRes.ok) throw new Error(`HTTP ${curRes.status}`);
    const cur = await curRes.json();

    const temp = Math.round(cur.main.temp);
    const feel = Math.round(cur.main.feels_like);
    const desc = cur.weather[0].description;
    const code = cur.weather[0].icon;
    const humidity = cur.main.humidity;
    const wind = Math.round(cur.wind.speed * 3.6); // m/s → km/h

    nowEl.innerHTML = `
      <div class="weather-now">
        <div class="wx-icon" aria-hidden="true">${icon(code)}</div>
        <div>
          <div>
            <span class="wx-temp">${temp}</span>
            <span class="wx-unit">°C</span>
          </div>
          <div class="wx-desc">${desc}</div>
          <div class="wx-loc">Pretoria · Feels like ${feel}°C · ${humidity}% humidity · Wind ${wind} km/h</div>
        </div>
      </div>
    `;

    // 5-day/3-hr forecast → extract 3 future daily readings
    const fcRes = await fetch(
      `${BASE_URL}/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&cnt=40&appid=${API_KEY}`
    );
    if (!fcRes.ok) throw new Error(`HTTP ${fcRes.status}`);
    const fcData = await fcRes.json();

    const todayDate = new Date().getDate();
    const seen = new Set();
    const days = [];

    for (const item of fcData.list) {
      const d   = new Date(item.dt * 1000);
      const day = d.getDate();
      const hr  = d.getHours();
      if (day !== todayDate && !seen.has(day) && hr >= 11 && hr <= 14) {
        seen.add(day);
        days.push(item);
        if (days.length === 3) break;
      }
    }

    // Fallback: any reading per future day
    if (days.length < 3) {
      seen.clear(); days.length = 0;
      for (const item of fcData.list) {
        const day = new Date(item.dt * 1000).getDate();
        if (day !== todayDate && !seen.has(day)) {
          seen.add(day); days.push(item);
          if (days.length === 3) break;
        }
      }
    }

    fcEl.innerHTML = days.map((d, i) => {
      const t = Math.round(d.main.temp);
      const ic = icon(d.weather[0].icon);
      const lbl = dayLabel(i + 1);
      return `
        <div class="fc-day">
          <div class="fc-label">${lbl}</div>
          <div class="fc-icon" aria-hidden="true">${ic}</div>
          <div class="fc-temp">${t}°C</div>
        </div>
      `;
    }).join('');

  } catch (err) {
    console.error('[weather.js]', err.message);
    if (nowEl) nowEl.innerHTML = `
      <p class="wx-error" style="font-size:0.8rem;color:var(--text-dim);padding:1rem;">
        ⚠️ Weather unavailable — please add your OpenWeatherMap API key in <code>scripts/weather.js</code>.
      </p>`;
    if (fcEl) fcEl.innerHTML = '';
  }
}

fetchWeather();