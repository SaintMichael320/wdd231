/**
 * discover.mjs — Discover page logic
 * Attractions data inlined to avoid ES module import path issues.
 */

const attractions = [
  {
    id: 1,
    name: "Union Buildings",
    address: "Government Ave, Arcadia, Pretoria, 0083",
    description: "The official seat of the South African government, designed by Sir Herbert Baker and completed in 1913. Perched on Meintjieskop hill, its terraced amphitheatre gardens offer sweeping views over the city. The iconic Nelson Mandela statue stands at its entrance.",
    image: "images/discover/union-buildings.webp",
    imageAlt: "Union Buildings government seat on Meintjieskop hill, Pretoria",
    link: "https://www.gov.za/about-government/union-buildings"
  },
  {
    id: 2,
    name: "Voortrekker Monument",
    address: "Eeufees Rd, Monument Park, Pretoria, 0181",
    description: "A monumental granite structure honouring the Voortrekker pioneers, completed in 1949. The monument features a Hall of Heroes with 27 marble friezes depicting the Great Trek. A precisely engineered skylight illuminates the cenotaph exactly at noon on 16 December each year.",
    image: "images/discover/voortrekker-monument.webp",
    imageAlt: "Voortrekker Monument granite structure in Pretoria",
    link: "https://www.vtm.org.za"
  },
  {
    id: 3,
    name: "National Zoological Gardens",
    address: "232 Boom St, Pretoria Central, Pretoria, 0002",
    description: "One of the largest zoos in the world, home to over 9 000 animal specimens across 700 species. Established in 1899, the zoo spans 85 hectares in the heart of the city. A cable car provides aerial views over the animal enclosures and the Apies River valley.",
    image: "images/discover/pretoria-zoo.webp",
    imageAlt: "National Zoological Gardens of South Africa in Pretoria",
    link: "https://www.nzg.ac.za"
  },
  {
    id: 4,
    name: "Church Square",
    address: "Church Square, Pretoria Central, Pretoria, 0002",
    description: "The historic heart of Pretoria, ringed by grand Victorian and Edwardian buildings including the Palace of Justice. The central Paul Kruger statue has watched over the square since 1896. Once a market and gathering place, it remains the symbolic centre of South Africa's capital.",
    image: "images/discover/church-square.webp",
    imageAlt: "Church Square with Paul Kruger statue in central Pretoria",
    link: "https://www.tshwane.gov.za"
  },
  {
    id: 5,
    name: "Freedom Park",
    address: "Salvokop, Pretoria, 0027",
    description: "A heritage site and world-class memorial dedicated to freedom and human dignity, overlooking Pretoria from Salvokop hill. The Garden of Remembrance and Sikhumbuto memorial wall bear the names of fallen South Africans across multiple conflicts and struggles throughout history.",
    image: "images/discover/freedom-park.webp",
    imageAlt: "Freedom Park heritage memorial site on Salvokop, Pretoria",
    link: "https://www.freedompark.co.za"
  },
  {
    id: 6,
    name: "Pretoria Botanical Garden",
    address: "2 Cussonia Ave, Brummeria, Pretoria, 0184",
    description: "A 76-hectare haven of indigenous flora managed by the South African National Biodiversity Institute. Over 5 000 plant species thrive here, from succulent rock gardens to a magnificent cycad amphitheatre. The garden is also a beloved venue for open-air concerts and picnics.",
    image: "images/discover/botanical-garden.webp",
    imageAlt: "Pretoria National Botanical Garden with indigenous plants",
    link: "https://www.sanbi.org/gardens/pretoria"
  },
  {
    id: 7,
    name: "Ditsong Museum of Natural History",
    address: "432 Paul Kruger St, Pretoria Central, Pretoria, 0002",
    description: "Formerly the Transvaal Museum, this institution houses outstanding collections of African mammals, birds, rocks, and fossils. The Austin Roberts Bird Hall showcases the continent's avian diversity. The museum's 1892 neo-classical building is itself a Pretoria landmark.",
    image: "images/discover/ditsong-museum.webp",
    imageAlt: "Ditsong Museum of Natural History in central Pretoria",
    link: "https://www.ditsong.org.za/natural-history"
  },
  {
    id: 8,
    name: "Jacaranda City Viewpoint",
    address: "Meintjieskop, Arcadia, Pretoria, 0083",
    description: "Pretoria earns its title Jacaranda City each October when over 70 000 jacaranda trees explode in violet bloom. The viewpoint above Arcadia offers the finest panorama of this purple canopy, a spectacle celebrated by locals and visitors alike every spring.",
    image: "images/discover/jacaranda-city.webp",
    imageAlt: "Pretoria streets lined with purple blooming jacaranda trees in October",
    link: "https://www.visittshwane.co.za"
  }
];

/* ── VISITOR MESSAGE ── */
function renderVisitorMessage() {
  const banner = document.getElementById('visitor-msg');
  if (!banner) return;

  const lastVisitRaw = localStorage.getItem('discoverLastVisit');
  const now = Date.now();
  let message = '';

  if (!lastVisitRaw) {
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const msElapsed = now - Number(lastVisitRaw);
    const daysElapsed = Math.floor(msElapsed / (1000 * 60 * 60 * 24));
    if (daysElapsed < 1) {
      message = 'Back so soon! Awesome!';
    } else if (daysElapsed === 1) {
      message = 'You last visited 1 day ago.';
    } else {
      message = `You last visited ${daysElapsed} days ago.`;
    }
  }

  localStorage.setItem('discoverLastVisit', now);

  banner.innerHTML = `
    <span class="visitor-icon" aria-hidden="true">👋</span>
    <span class="visitor-text">${message}</span>
    <button class="visitor-close" aria-label="Dismiss message" onclick="this.closest('.visitor-banner').remove()">✕</button>
  `;
}

/* ── BUILD CARDS ── */
function buildCards() {
  const grid = document.getElementById('discover-grid');
  if (!grid) return;

  attractions.forEach((place, index) => {
    const article = document.createElement('article');
    article.className = 'discover-card';
    article.setAttribute('role', 'listitem');
    article.style.gridArea = `area${index + 1}`;

    article.innerHTML = `
      <figure class="card-figure">
        <img
          src="${place.image}"
          alt="${place.imageAlt}"
          width="300"
          height="200"
          loading="${index < 2 ? 'eager' : 'lazy'}"
          class="card-img"
        >
      </figure>
      <div class="card-body">
        <h2 class="card-title">${place.name}</h2>
        <address class="card-address">${place.address}</address>
        <p class="card-desc">${place.description}</p>
        <a
          href="${place.link}"
          class="card-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Learn more about ${place.name} — opens in new tab"
        >Learn More <span aria-hidden="true">→</span></a>
      </div>
    `;

    grid.appendChild(article);
  });
}

/* ── INIT ── */
renderVisitorMessage();
buildCards();
