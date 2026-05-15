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
  { id: 14, name: 'Stir Fried Beef Bao 2pcs', desc: 'Tender stir-fried beef with aromatic sauce, bao-wrapped perfection.', price: '$11.80', category: 'bao', diet: [''], image: '/menu/stir-fried-beef-bao.png' },
  { id: 15, name: 'Mixed Tofu Dumpling (Steamed/Pan Fried) 6pcs/12pcs', desc: 'Fried Tofu, Bok Choy, Carrot, Chinese Broccoli', price: '$8.80/$13.80', category: 'vegetarian-dumplings', diet: ['vegan'], image: '/menu/mixed-tofu-dumpling.png' },
  { id: 16, name: 'Mixed Vegetable Dumpling (Steamed/Pan Fried) 6pcs/12pcs', desc: 'Carrot, Green Cabbage, Coriander', price: '$8.80/$13.80', category: 'vegetarian-dumplings', diet: ['vegan'], image: '/menu/mixed-vegetable-dumpling.png' },
  { id: 17, name: 'Eggplant Dumpling (Steamed/Pan Fried) 6pcs/12pcs', desc: 'Tender eggplant mixed with savory seasonings, wrapped in soft handmade dumpling pastry.', price: '$7.80/$12.80', category: 'vegetarian-dumplings', diet: ['vegan'], image: '/menu/eggplant-dumpling.png' },
  { id: 18, name: 'Mushroom and Bok Choy Dumpling (Steamed/Pan Fried) 6pcs/12pcs', desc: 'Fresh mushrooms and bok choy combined for a light, flavorful vegetarian dumpling filling.', price: '$8.80/$13.80', category: 'vegetarian-dumplings', diet: ['vegan'], image: '/menu/mushroom-bok-choy-dumpling.png' },
  { id: 19, name: 'Egg and Chives Dumpling (Steamed/Pan Fried) 6pcs/12pcs', desc: 'Fluffy eggs and fresh chives create a classic, savory homemade dumpling taste.', price: '$7.80/$12.80', category: 'vegetarian-dumplings', diet: ['vegetarian'], image: '/menu/egg-chives-dumpling.png' },
  { id: 20, name: 'Pecking Duck Pancakes 4pcs', desc: 'Crispy duck with cucumber and hoisin sauce in soft pancakes.', price: '$15.80', category: 'entree', diet: [''], image: '/menu/pecking-duck-pancakes.jpg' },
  { id: 21, name: 'San Choy Bow (Duck/Pork/Chicken/Vegetable) 2pcs', desc: 'Savory stir-fried filling served in fresh crunchy lettuce cups.', price: '$11.80', category: 'entree', diet: [''], image: '/menu/san-choy-bow.jpg' },
  { id: 22, name: 'Salt and Pepper Tofu', desc: 'Crispy tofu tossed with garlic, chili, and aromatic pepper seasoning.', price: '$12.80', category: 'entree', diet: [''], image: '/menu/salt-pepper-tofu.jpg' },
  { id: 23, name: 'Salt and Pepper Chili Chips', desc: 'Crispy fries seasoned with chili, garlic, and signature salt pepper spice.', price: '$10.80', category: 'entree', diet: [''], image: '/menu/salt-pepper-chili-chips.jpg' },
  { id: 24, name: 'Deep Fried Eggplant with Sweet Lime and Soy Sauce', desc: 'Golden fried eggplant glazed with sweet lime and savory soy sauce.', price: '$13.80', category: 'entree', diet: [''], image: '/menu/deep-fried-eggplant.jpg' },
  { id: 25, name: 'Cucumber Salad with Vinegar and Chili Oil', desc: 'Refreshing cucumber salad tossed with vinegar, garlic, and spicy chili oil.', price: '$10.80', category: 'entree', diet: [''], image: '/menu/cucumber-salad.jpg' },
  { id: 26, name: 'Cheese and Prawn Spring Roll 4pcs', desc: 'Crispy spring rolls filled with juicy prawns and melted cheese.', price: '$12.80', category: 'entree', diet: [''], image: '/menu/cheese-prawn-spring-roll.jpg' },
  { id: 27, name: 'Vegetable Spring Roll 4pcs', desc: 'Golden crispy rolls packed with fresh mixed vegetable filling.', price: '$10.80', category: 'entree', diet: [''], image: '/menu/vegetable-spring-roll.jpg' },
  { id: 28, name: 'Shallot Pancakes', desc: 'Flaky pan-fried pancakes layered with fragrant fresh shallots.', price: '$9.80', category: 'entree', diet: [''], image: '/menu/shallot-pancakes.jpg' },
  { id: 29, name: 'Sizzling (Beef or Chicken) Mongolian', desc: '', price: '$22.80', category: 'main', diet: [''], image: '/menu/sizzling-mongolian.jpg' },
  { id: 30, name: 'Sizzling Lamb Mongolian Style', desc: '', price: '$24.80', category: 'main', diet: [''], image: '/menu/sizzling-lamb-mongolian.jpg' },
  { id: 31, name: 'Stir Fried Cumin Lamb', desc: '', price: '$24.80', category: 'main', diet: [''], image: '/menu/stir-fried-cumin-lamb.jpg' },
  { id: 32, name: 'Crispy Shredded Beef with Sweet Black Vinegar Sauce', desc: '', price: '$22.80', category: 'main', diet: [''], image: '/menu/crispy-shredded-beef.jpg' },
  { id: 33, name: 'Satay (Beef or Chicken) with Vegetable', desc: '', price: '$19.80', category: 'main', diet: [''], image: '/menu/satay-beef-chicken-vegetable.jpg' },
  { id: 34, name: 'Black Bean (Beef or Chicken) with vegetable', desc: '', price: '$19.80', category: 'main', diet: [''], image: '/menu/black-bean-beef-chicken.jpg' },
  { id: 35, name: 'Black Pepper (Beef or Chicken) with vegetable', desc: '', price: '$19.80', category: 'main', diet: [''], image: '/menu/black-pepper-beef-chicken.jpg' },
  { id: 36, name: 'Singapore Chili (Beef or Chicken) with vegetable', desc: '', price: '$19.80', category: 'main', diet: [''], image: '/menu/singapore-chili-beef-chicken.jpg' },
  { id: 37, name: 'Honey Chicken', desc: '', price: '$19.80', category: 'main', diet: [''], image: '/menu/honey-chicken.jpg' },
  { id: 38, name: 'Kung-Pao Chicken', desc: '', price: '$19.80', category: 'main', diet: [''], image: '/menu/kung-pao-chicken.jpg' },
  { id: 39, name: 'Sweet and Sour (Pork or Chicken) with Pineapple', desc: '', price: '$19.80', category: 'main', diet: [''], image: '/menu/sweet-sour-pork-chicken.jpg' },
  { id: 40, name: 'Stir Fried Green Beans and Okra with Garlic and Pork', desc: '', price: '$19.80', category: 'main', diet: [''], image: '/menu/green-beans-okra-pork.jpg' },
  { id: 41, name: 'Stir Fried King Prawn with Seasonal vegetables in (XO or Garlic) sauce', desc: '', price: '$25.80', category: 'main', diet: [''], image: '/menu/king-prawn-seasonal-vegetables.jpg' },
  { id: 42, name: 'Salt and Pepper King Prawn', desc: '', price: '$25.80', category: 'main', diet: [''], image: '/menu/salt-pepper-king-prawn.jpg' },
  { id: 43, name: 'Singapore Chili King Prawns', desc: '', price: '$25.80', category: 'main', diet: [''], image: '/menu/singapore-chili-king-prawns.jpg' },
  { id: 44, name: 'Honey King Prawn', desc: '', price: '$25.80', category: 'main', diet: [''], image: '/menu/honey-king-prawn.jpg' },
  { id: 45, name: 'Salt and Pepper Squid', desc: '', price: '$22.80', category: 'main', diet: [''], image: '/menu/salt-pepper-squid.jpg' },
  { id: 46, name: 'Stir Fried Mixed Seasonal Vegetables with (Garlic or Singapore Chili or XO seafood) Sauce', desc: '', price: '$18.80', category: 'vegetarian-main', diet: ['vegan'], image: '/menu/mixed-seasonal-vegetables.jpg' },
  { id: 47, name: 'Chinese Broccoli in (Garlic or Oyster) Sauce', desc: '', price: '$18.80', category: 'vegetarian-main', diet: ['vegan'], image: '/menu/chinese-broccoli-sauce.jpg' },
  { id: 48, name: 'Stir Fried Snow Peas and Broccoli', desc: '', price: '$18.80', category: 'vegetarian-main', diet: ['vegan'], image: '/menu/snow-peas-broccoli.jpg' },
  { id: 49, name: 'Eggplant Soy Sauce Hot Pot', desc: '', price: '$18.80', category: 'vegetarian-main', diet: ['vegan'], image: '/menu/eggplant-soy-sauce-hot-pot.jpg' },
  { id: 50, name: 'Szechuan Style Spicy Eggplant Hot Pot', desc: '', price: '$18.80', category: 'vegetarian-main', diet: ['vegan'], image: '/menu/szechuan-spicy-eggplant-hot-pot.jpg' },
  { id: 51, name: 'Stir Fried Green Beans with Okra', desc: '', price: '$18.80', category: 'vegetarian-main', diet: ['vegan'], image: '/menu/green-beans-okra.jpg' },
  { id: 52, name: 'Mapo Tofu Hot Pot', desc: '', price: '$18.80', category: 'vegetarian-main', diet: ['vegan'], image: '/menu/mapo-tofu-hot-pot.jpg' },
  { id: 53, name: 'Stir Fried Mixed Mushroom with Okra', desc: '', price: '$19.80', category: 'vegetarian-main', diet: ['vegan'], image: '/menu/mixed-mushroom-okra.jpg' },
  { id: 54, name: 'Stir Fried Bok Choy with Soy Sauce', desc: '', price: '$18.80', category: 'vegetarian-main', diet: ['vegan'], image: '/menu/bok-choy-soy-sauce.jpg' },
  { id: 55, name: 'Vegetarian Fried Rice with Egg', desc: '', price: '$14.80', category: 'rice-noodle', diet: [''], image: '/menu/vegetarian-fried-rice-egg.jpg' },
  { id: 56, name: 'Egg Fried Rice with Soy Sauce and Shallot', desc: '', price: '$13.80', category: 'rice-noodle', diet: [''], image: '/menu/egg-fried-rice-soy-shallot.jpg' },
  { id: 57, name: 'Shredded Duck Fried Rice with Egg', desc: '', price: '$15.80', category: 'rice-noodle', diet: [''], image: '/menu/shredded-duck-fried-rice.jpg' },
  { id: 58, name: 'BBQ Pork Fried Rice with Egg', desc: '', price: '$15.80', category: 'rice-noodle', diet: [''], image: '/menu/bbq-pork-fried-rice.jpg' },
  { id: 59, name: 'Special Combination Fried Rice (Prawn and Chicken and Beef and Vegetable) with Egg', desc: '', price: '$16.80', category: 'rice-noodle', diet: [''], image: '/menu/special-combination-fried-rice.jpg' },
  { id: 60, name: 'Thai Fried Rice with (Chicken or Beef or Prawn) and Egg', desc: '', price: '$15.80/$15.80/$17.80', category: 'rice-noodle', diet: [''], image: '/menu/thai-fried-rice.jpg' },
  { id: 61, name: 'Stir Fried Rice Flat Noodles with (Pork or Beef or Chicken or Vegetable) and Egg', desc: '', price: '$16.80', category: 'rice-noodle', diet: [''], image: '/menu/stir-fried-rice-flat-noodles.jpg' },
  { id: 62, name: 'Stir Fried Hand Made Noodles with (Pork or Beef or Chicken or Vegetable)', desc: '', price: '$15.80', category: 'rice-noodle', diet: [''], image: '/menu/stir-fried-hand-made-noodles.jpg' },
  { id: 63, name: 'Stir Fried Rice Thin Noodle with (Chicken or Vegetable) and Singapore Sauce and Egg', desc: '', price: '$15.80', category: 'rice-noodle', diet: [''], image: '/menu/singapore-rice-thin-noodle.jpg' },
  { id: 64, name: 'BBQ Pork in Hand Made Noodle Soup', desc: '', price: '$15.80', category: 'rice-noodle', diet: [''], image: '/menu/bbq-pork-noodle-soup.jpg' },
  { id: 65, name: '(Chicken or Beef or Vegetable) Laksa', desc: '', price: '$15.80', category: 'rice-noodle', diet: [''], image: '/menu/chicken-beef-vegetable-laksa.jpg' },
  { id: 66, name: 'Seafood Laksa', desc: '', price: '$17.80', category: 'rice-noodle', diet: [''], image: '/menu/seafood-laksa.jpg' },
  { id: 67, name: 'Steamed Rice', desc: '', price: '$3.00', category: 'rice-noodle', diet: [''], image: '/menu/steamed-rice.jpg' }
];

const categoryLabels = {
  all: 'All',
  dumpling: 'Dumplings',
  bao: 'BAO',
  'vegetarian-dumplings': 'Vegetarian Dumplings',
  entree: 'ENTREE',
  main: 'MAIN',
  'vegetarian-main': 'VEGETARIAN MAIN',
  'rice-noodle': 'RICE AND NOODLE'
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
      <button class="nav-item active" data-page="home"><span class="nav-icon">âŒ?/span><span>Home</span></button>
      <button class="nav-item" data-page="menu"><span class="nav-icon">â˜?/span><span>Menu</span></button>
      <button class="nav-item" data-page="booking"><span class="nav-icon">â˜?/span><span>Book</span></button>
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
          ${item.desc ? `<div class="menu-desc">${item.desc}</div>` : ''}
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
