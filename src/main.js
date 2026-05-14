import { registerSW } from 'virtual:pwa-register';
import './styles.css';

let updateApp = null;

updateApp = registerSW({
  immediate: true,
  onNeedRefresh() {
    document.getElementById('updateSheet')?.classList.add('show');
  },
  onOfflineReady() {
    document.getElementById('offlineReady')?.classList.add('show');
    window.setTimeout(() => document.getElementById('offlineReady')?.classList.remove('show'), 3200);
  }
});

const menuDatabase = [
  { id: 1, name: 'steamed BBQ Pork Bun 2Pcs', desc: 'Sweet savory BBQ pork, fluffy soft bun', price: '$7.80', category: 'dumpling', diet: [''], image: '/menu/bbq-pork-bun.png' },
  { id: 2, name: 'Steamed Pork Soupy Dumpling 6pcs', desc: 'Soup-filled pork burst, rich broth inside', price: '$10.80', category: 'dumpling', diet: [''], image: '/menu/pork-soupy-dumpling.png' },
  { id: 3, name: 'Boiled Pork Wontons with Chili and Sesame oil 8pcs', desc: 'Spicy numbing wontons, savory sesame kick.', price: '$9.80', category: 'dumpling', diet: [''], image: '/menu/chili-wontons.png' },
  { id: 4, name: 'Steamed Pork and Prawn Siu Mai 4pcs', desc: 'Juicy pork & prawn, classic Cantonese open dumpling', price: '$12.80', category: 'dumpling', diet: [''], image: '/menu/pork-prawn-siu-mai.png' },
  { id: 5, name: 'Pork and Chives Dumpling 6pcs/12pcs', desc: 'Savory pork with fresh chives, fragrant and juicy.', price: '$7.80/$12.80', category: 'dumpling', diet: [''], image: '/menu/pork-chives-dumpling.png' },
  { id: 6, name: 'Pork, Prawn and Chives Dumpling 6pcs/12pcs', desc: 'Three delicious fillings in one perfect dumpling.', price: '$8.80/$14.80', category: 'dumpling', diet: [''], image: '/menu/pork-prawn-chives-dumpling.png' },
  { id: 7, name: 'Steamed Gluten Free Prawn Dumpling 4pcs', desc: 'Crystal skin, sweet prawn, 100% gluten free', price: '$11.80', category: 'dumpling', diet: ['gluten-free'], image: '/menu/gluten-free-prawn-dumpling.png' },
  { id: 8, name: 'Chicken and Chive Dumpling 6pcs/12pcs', desc: 'Light chicken with fresh chives, healthy and tasty.', price: '$7.80/$12.80', category: 'dumpling', diet: [''], image: '/menu/chicken-chive-dumpling.png' },
  { id: 9, name: 'Beef and onion dumpling 6pcs/12pcs', desc: 'Rich beef and sweet onion, hearty flavour.', price: '$8.80/$14.80', category: 'dumpling', diet: [''], image: '/menu/beef-onion-dumpling.png' },
  { id: 10, name: 'Crispy Tofu and Eggplant Bao 2pcs', desc: 'Crispy tofu and tender eggplant in a soft, fluffy bao.', price: '$9.80', category: 'bao', diet: [''], image: '/menu/crispy-tofu-eggplant-bao.png' },
  { id: 11, name: 'Roasted Duck Bao 2pcs', desc: 'Rich roasted duck with hoisin sauce, wrapped in a warm bao.', price: '$12.80', category: 'bao', diet: [''], image: '/menu/roasted-duck-bao.png' },
  { id: 12, name: 'BBQ Pork Bao 2pcs', desc: 'Sweet and savory BBQ pork tucked inside a pillowy bao bun.', price: '$12.80', category: 'bao', diet: [''], image: '/menu/bbq-pork-bao.png' },
  { id: 13, name: 'Stir Fried Chicken Bao 2pcs', desc: 'Savory stir-fried chicken with Asian spices in a soft bao.', price: '$11.80', category: 'bao', diet: [''], image: '/menu/stir-fried-chicken-bao.png' },
  { id: 14, name: 'Stir Fried Beef Bao 2pcs', desc: 'Tender stir-fried beef with aromatic sauce, bao-wrapped perfection.', price: '$11.80', category: 'bao', diet: [''], image: '/menu/stir-fried-beef-bao.png' }
];

const categoryLabels = {
  all: 'All',
  dumpling: 'Dumplings',
  bao: 'BAO'
};

let currentCategory = 'all';
let currentDiet = 'all';
let installPromptEvent = null;

document.querySelector('#app').innerHTML = `
  <div class="app-container">
    <div class="app-status-bar">
      <span id="connectionState">Online</span>
      <span>Dumpling Time</span>
    </div>

    <header class="app-header">
      <div>
        <p class="app-kicker">Newtown, NSW</p>
        <h1>Dumpling Time</h1>
      </div>
      <button class="header-install" id="headerInstall" type="button">Install</button>
    </header>

    <main class="main-content" id="mainContent">
      <section id="homePage" class="page active-page">
        <div class="hero">
          <h2>Fresh dumplings, bao and comfort bites</h2>
          <p>Made for quick ordering, phone-first browsing and offline menu access.</p>
          <div class="address">43 Enmore Road, Newtown, NSW 2042</div>
        </div>
        <div class="action-buttons">
          <button class="action-btn" id="dineInBtn">Dine In</button>
          <button class="action-btn" id="takeawayBtn">Takeaway</button>
          <button class="action-btn" id="bookTableBtn">Book</button>
        </div>
        <section class="card">
          <div class="section-title">Popular Picks</div>
          <div class="menu-item compact-pick">
            <img class="menu-image" src="/menu/bbq-pork-bun.png" alt="steamed BBQ Pork Bun 2Pcs">
            <div class="menu-info">
              <div class="menu-name">steamed BBQ Pork Bun 2Pcs</div>
              <div class="menu-desc">Sweet savory BBQ pork, fluffy soft bun</div>
            </div>
            <div class="menu-price">$7.80</div>
          </div>
          <div class="menu-item compact-pick">
            <img class="menu-image" src="/menu/roasted-duck-bao.png" alt="Roasted Duck Bao 2pcs">
            <div class="menu-info">
              <div class="menu-name">Roasted Duck Bao 2pcs</div>
              <div class="menu-desc">Rich roasted duck with hoisin sauce</div>
            </div>
            <div class="menu-price">$12.80</div>
          </div>
        </section>
        <section class="card app-note">
          <div class="section-title">App Ready</div>
          <p>Install this PWA from your phone browser to open it as a standalone app with cached menu images.</p>
        </section>
      </section>

      <section id="menuPage" class="page">
        <div class="page-heading">
          <p class="app-kicker">Browse menu</p>
          <h2>Menu</h2>
        </div>
        <div class="dietary-row" id="dietaryQuickFilter">
          <span class="dietary-badge active-diet" data-diet="all">All</span>
          <span class="dietary-badge" data-diet="vegan">Vegan</span>
          <span class="dietary-badge" data-diet="vegetarian">Vegetarian</span>
          <span class="dietary-badge" data-diet="gluten-free">Gluten Free</span>
        </div>
        <div class="filter-tabs" id="categoryFilter">
          ${Object.entries(categoryLabels).map(([key, label]) => `<span class="filter-chip ${key === 'all' ? 'active-filter' : ''}" data-cat="${key}">${label}</span>`).join('')}
        </div>
        <div id="menuList" class="menu-list"></div>
      </section>

      <section id="bookingPage" class="page">
        <div class="page-heading">
          <p class="app-kicker">Reserve a table</p>
          <h2>Booking</h2>
        </div>
        <div class="card">
          <div class="form-group"><label for="bookName">Name</label><input type="text" placeholder="Your name" id="bookName"></div>
          <div class="form-group"><label for="bookGuests">Guests</label><input type="number" value="2" id="bookGuests"></div>
          <div class="form-group"><label for="bookDate">Date</label><input type="date" id="bookDate"></div>
          <div class="form-group"><label for="bookTime">Time</label><input type="time" id="bookTime"></div>
          <button class="submit-btn" id="submitBooking">Request Booking</button>
          <div class="info-text">Or call (02) 1234 5678</div>
        </div>
      </section>
    </main>

    <nav class="bottom-nav" aria-label="Primary navigation">
      <button class="nav-item active" data-page="home"><span class="nav-icon">⌂</span><span>Home</span></button>
      <button class="nav-item" data-page="menu"><span class="nav-icon">☰</span><span>Menu</span></button>
      <button class="nav-item" data-page="booking"><span class="nav-icon">☎</span><span>Book</span></button>
    </nav>

    <div class="install-sheet" id="installSheet" aria-live="polite">
      <div>
        <strong>Install Dumpling Time</strong>
        <p>Add it to your home screen for a full-screen app experience and offline menu access.</p>
      </div>
      <div class="install-actions">
        <button class="install-dismiss" id="dismissInstall">Later</button>
        <button class="install-primary" id="installApp">Install</button>
      </div>
    </div>

    <div class="install-sheet" id="iosInstallSheet" aria-live="polite">
      <div>
        <strong>Add to Home Screen</strong>
        <p>On iPhone, tap Share in Safari, then choose Add to Home Screen.</p>
      </div>
      <div class="install-actions">
        <button class="install-primary" id="dismissIosInstall">Got it</button>
      </div>
    </div>

    <div class="install-sheet" id="updateSheet" aria-live="polite">
      <div>
        <strong>New version ready</strong>
        <p>Refresh once to load the latest menu and images.</p>
      </div>
      <div class="install-actions">
        <button class="install-primary" id="updateApp">Refresh</button>
      </div>
    </div>

    <div class="offline-ready" id="offlineReady">Menu cached for offline use</div>
  </div>
`;

function renderMenu() {
  let filtered = [...menuDatabase];
  if (currentCategory !== 'all') {
    filtered = filtered.filter((item) => item.category === currentCategory);
  }
  if (currentDiet !== 'all') {
    filtered = filtered.filter((item) => item.diet.includes(currentDiet));
  }
  const container = document.getElementById('menuList');
  if (!container) return;
  if (filtered.length === 0) {
    container.innerHTML = '<div class="card empty-state">No matching items found.</div>';
    return;
  }
  container.innerHTML = filtered.map((item) => {
    const dietTags = [
      item.diet.includes('vegan') ? '<span class="diet-tag">Vegan</span>' : '',
      item.diet.includes('vegetarian') ? '<span class="diet-tag">Veg</span>' : '',
      item.diet.includes('gluten-free') ? '<span class="diet-tag">GF</span>' : ''
    ].join('');

    return `
      <article class="menu-item">
        <img class="menu-image" src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="menu-info">
          <div class="menu-name">${item.name} ${dietTags}</div>
          <div class="menu-desc">${item.desc}</div>
        </div>
        <div class="menu-price">${item.price}</div>
      </article>
    `;
  }).join('');
}

const pages = {
  home: document.getElementById('homePage'),
  menu: document.getElementById('menuPage'),
  booking: document.getElementById('bookingPage')
};
const navBtns = document.querySelectorAll('.nav-item');

function switchPage(pageId) {
  Object.keys(pages).forEach((key) => {
    pages[key].classList.remove('active-page');
  });
  pages[pageId].classList.add('active-page');
  navBtns.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });
  if (pageId === 'menu') renderMenu();
  document.getElementById('mainContent')?.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateConnectionState() {
  const state = document.getElementById('connectionState');
  if (!state) return;
  state.textContent = navigator.onLine ? 'Online' : 'Offline';
  state.classList.toggle('offline', !navigator.onLine);
}

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function showInstallHelp() {
  if (installPromptEvent) {
    document.getElementById('installSheet')?.classList.add('show');
    return;
  }
  if (isIos() && !isStandalone()) {
    document.getElementById('iosInstallSheet')?.classList.add('show');
  }
}

navBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    switchPage(btn.dataset.page);
  });
});

document.getElementById('dineInBtn')?.addEventListener('click', () => {
  alert('Dine in: Please visit the restaurant and order at the counter.');
});
document.getElementById('takeawayBtn')?.addEventListener('click', () => {
  alert('Takeaway: Call (02) 1234 5678 to order ahead.');
});
document.getElementById('bookTableBtn')?.addEventListener('click', () => {
  switchPage('booking');
});
document.getElementById('submitBooking')?.addEventListener('click', () => {
  const name = document.getElementById('bookName').value.trim();
  if (!name) {
    alert('Please enter your name.');
    return;
  }
  alert(`${name}, your booking request has been submitted.`);
});

document.querySelectorAll('.filter-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active-filter'));
    chip.classList.add('active-filter');
    currentCategory = chip.dataset.cat;
    renderMenu();
  });
});
document.querySelectorAll('.dietary-badge').forEach((badge) => {
  badge.addEventListener('click', () => {
    document.querySelectorAll('.dietary-badge').forEach((b) => b.classList.remove('active-diet'));
    badge.classList.add('active-diet');
    currentDiet = badge.dataset.diet;
    renderMenu();
  });
});

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPromptEvent = event;
  document.getElementById('installSheet')?.classList.add('show');
});

document.getElementById('installApp')?.addEventListener('click', async () => {
  if (!installPromptEvent) return;
  installPromptEvent.prompt();
  await installPromptEvent.userChoice;
  installPromptEvent = null;
  document.getElementById('installSheet')?.classList.remove('show');
});

document.getElementById('headerInstall')?.addEventListener('click', showInstallHelp);
document.getElementById('dismissInstall')?.addEventListener('click', () => {
  document.getElementById('installSheet')?.classList.remove('show');
});
document.getElementById('dismissIosInstall')?.addEventListener('click', () => {
  document.getElementById('iosInstallSheet')?.classList.remove('show');
});
document.getElementById('updateApp')?.addEventListener('click', () => {
  if (updateApp) updateApp(true);
});

window.addEventListener('appinstalled', () => {
  installPromptEvent = null;
  document.getElementById('installSheet')?.classList.remove('show');
  document.getElementById('headerInstall')?.classList.add('hidden');
});
window.addEventListener('online', updateConnectionState);
window.addEventListener('offline', updateConnectionState);

const today = new Date().toISOString().split('T')[0];
const dateInput = document.getElementById('bookDate');
if (dateInput) dateInput.value = today;
if (isStandalone()) document.getElementById('headerInstall')?.classList.add('hidden');
updateConnectionState();
renderMenu();

const initialScreen = new URLSearchParams(window.location.search).get('screen');
if (initialScreen === 'menu' || initialScreen === 'booking') {
  switchPage(initialScreen);
}
