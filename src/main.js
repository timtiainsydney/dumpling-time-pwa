import { registerSW } from 'virtual:pwa-register';
import './styles.css';

registerSW({
  immediate: true,
  onNeedRefresh() {
    window.location.reload();
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
  { id: 9, name: 'Beef and onion dumpling 6pcs/12pcs', desc: 'rich beef and sweet onion, hearty flavour.', price: '$8.80/$14.80', category: 'dumpling', diet: [''], image: '/menu/beef-onion-dumpling.png' },
  { id: 10, name: 'Crispy Tofu and Eggplant Bao 2pcs', desc: 'Crispy tofu and tender eggplant in a soft, fluffy bao.', price: '$9.80', category: 'bao', diet: [''], image: '/menu/crispy-tofu-eggplant-bao.png' },
  { id: 11, name: 'Roasted Duck Bao 2pcs', desc: 'Rich roasted duck with hoisin sauce, wrapped in a warm bao.', price: '$12.80', category: 'bao', diet: [''], image: '/menu/roasted-duck-bao.png' },
  { id: 12, name: 'BBQ Pork Bao 2pcs', desc: 'Sweet and savory BBQ pork tucked inside a pillowy bao bun.', price: '$12.80', category: 'bao', diet: [''], image: '/menu/bbq-pork-bao.png' },
  { id: 13, name: 'Stir Fried Chicken Bao 2pcs', desc: 'Savory stir-fried chicken with Asian spices in a soft bao.', price: '$11.80', category: 'bao', diet: [''], image: '/menu/stir-fried-chicken-bao.png' },
  { id: 14, name: 'Stir Fried Beef Bao 2pcs', desc: 'Tender stir-fried beef with aromatic sauce, bao-wrapped perfection.', price: '$11.80', category: 'bao', diet: [''], image: '/menu/stir-fried-beef-bao.png' }
];

let currentCategory = 'all';
let currentDiet = 'all';
let installPromptEvent = null;

document.querySelector('#app').innerHTML = `
  <div class="app-container">
    <div class="main-content" id="mainContent">
      <div id="homePage" class="page active-page">
        <div class="hero">
          <h1>DUMPLING TIME</h1>
          <p>Vibrant Chinese Bistro</p>
          <div class="address">43 Enmore Road, Newtown, NSW 2042</div>
        </div>
        <div class="action-buttons">
          <button class="action-btn" id="dineInBtn">堂食</button>
          <button class="action-btn" id="takeawayBtn">自取</button>
          <button class="action-btn" id="bookTableBtn">预订</button>
        </div>
        <div class="card">
          <div class="section-title">今日推荐</div>
          <div class="menu-item">
            <div class="menu-info"><div class="menu-name">手工猪肉饺子</div><div class="menu-desc">鲜嫩多汁，招牌必点</div></div>
            <div class="menu-price">$16.90</div>
          </div>
          <div class="menu-item">
            <div class="menu-info"><div class="menu-name">川味牛肉面</div><div class="menu-desc">麻辣汤底，软烂牛肉</div></div>
            <div class="menu-price">$18.90</div>
          </div>
        </div>
        <div class="card">
          <div class="section-title">Happy Hour!</div>
          <p class="spaced-copy">每天 5PM - 7PM</p>
          <p>$5 啤酒 / 葡萄酒<br>$10 鸡尾酒</p>
        </div>
        <div class="card">
          <p class="quote">"Great food should be accessible to everyone. Vegan, vegetarian, gluten-free options available."</p>
        </div>
      </div>

      <div id="menuPage" class="page">
        <div class="hero compact-hero"><h2>我们的菜单</h2></div>
        <div class="dietary-row" id="dietaryQuickFilter">
          <span class="dietary-badge active-diet" data-diet="all">全部</span>
          <span class="dietary-badge" data-diet="vegan">Vegan</span>
          <span class="dietary-badge" data-diet="vegetarian">Vegetarian</span>
          <span class="dietary-badge" data-diet="gluten-free">Gluten Free</span>
        </div>
        <div class="filter-tabs" id="categoryFilter">
          <span class="filter-chip active-filter" data-cat="all">全部</span>
          <span class="filter-chip" data-cat="dumpling">饺子系列</span>
          <span class="filter-chip" data-cat="bao">BAO</span>
          <span class="filter-chip" data-cat="noodle">面食系列</span>
          <span class="filter-chip" data-cat="side">小食饮品</span>
        </div>
        <div id="menuList" class="menu-list"></div>
      </div>

      <div id="bookingPage" class="page">
        <div class="hero compact-hero"><h2>预订座位</h2></div>
        <div class="card">
          <div class="form-group"><label for="bookName">姓名</label><input type="text" placeholder="您的姓名" id="bookName"></div>
          <div class="form-group"><label for="bookGuests">人数</label><input type="number" value="2" id="bookGuests"></div>
          <div class="form-group"><label for="bookDate">日期</label><input type="date" id="bookDate"></div>
          <div class="form-group"><label for="bookTime">时间</label><input type="time" id="bookTime"></div>
          <button class="submit-btn" id="submitBooking">确认预订</button>
          <div class="info-text">也可致电 (02) 1234 5678</div>
        </div>
      </div>
    </div>

    <div class="bottom-nav">
      <button class="nav-item active" data-page="home"><span class="nav-icon">⌂</span><span>首页</span></button>
      <button class="nav-item" data-page="menu"><span class="nav-icon">☰</span><span>菜单</span></button>
      <button class="nav-item" data-page="booking"><span class="nav-icon">☎</span><span>预订</span></button>
    </div>

    <div class="install-sheet" id="installSheet" aria-live="polite">
      <div>
        <strong>安装 Dumpling Time</strong>
        <p>把菜单和预订入口添加到主屏幕，离线也能打开。</p>
      </div>
      <div class="install-actions">
        <button class="install-dismiss" id="dismissInstall">稍后</button>
        <button class="install-primary" id="installApp">安装</button>
      </div>
    </div>
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
    container.innerHTML = '<div class="card empty-state">没有找到匹配的菜品</div>';
    return;
  }
  container.innerHTML = filtered.map((item) => {
    const dietTags = [
      item.diet.includes('vegan') ? '<span class="diet-tag">Vegan</span>' : '',
      item.diet.includes('vegetarian') ? '<span class="diet-tag">Veg</span>' : '',
      item.diet.includes('gluten-free') ? '<span class="diet-tag">GF</span>' : ''
    ].join('');

    return `
      <div class="menu-item">
        <img class="menu-image" src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="menu-info">
          <div class="menu-name">${item.name} ${dietTags}</div>
          <div class="menu-desc">${item.desc}</div>
        </div>
        <div class="menu-price">${item.price}</div>
      </div>
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
}

navBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    switchPage(btn.dataset.page);
  });
});

document.getElementById('dineInBtn')?.addEventListener('click', () => {
  alert('模拟堂食: 请直接前往餐厅，我们为您预留愉快氛围。');
});
document.getElementById('takeawayBtn')?.addEventListener('click', () => {
  alert('模拟自取: 可拨打餐厅电话 (02) 1234 5678 提前下单。');
});
document.getElementById('bookTableBtn')?.addEventListener('click', () => {
  switchPage('booking');
});
document.getElementById('submitBooking')?.addEventListener('click', () => {
  const name = document.getElementById('bookName').value;
  if (!name) {
    alert('请输入姓名');
    return;
  }
  alert(`${name}，预订已提交！我们会尽快与您确认。`);
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

document.getElementById('dismissInstall')?.addEventListener('click', () => {
  document.getElementById('installSheet')?.classList.remove('show');
});

window.addEventListener('appinstalled', () => {
  installPromptEvent = null;
  document.getElementById('installSheet')?.classList.remove('show');
});

const today = new Date().toISOString().split('T')[0];
const dateInput = document.getElementById('bookDate');
if (dateInput) dateInput.value = today;
renderMenu();
