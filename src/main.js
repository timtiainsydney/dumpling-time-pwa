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
        <div class="home-long">
          <section class="home-hero" id="homeHero">
            <img src="/home/hero-night.jpg" alt="Dumpling Time Newtown entrance at night">
            <div class="hero-shade"></div>
            <div class="hero-contact">
              <span>43 Enmore Road, Newtown NSW 2042</span>
              <span>0450 650 680</span>
            </div>
            <div class="hero-copy">
              <p class="script-title">Welcome to</p>
              <h2>Dumpling<br>Time</h2>
              <p>Handmade dumplings, bao, noodles and late-night drinks in the heart of Newtown.</p>
              <div class="hero-actions">
                <button class="poster-btn" id="heroMenuBtn">Menu</button>
                <button class="poster-btn ghost" id="heroBookBtn">Book</button>
              </div>
            </div>
          </section>

          <section class="poster-story" id="storySection">
            <p class="script-title">Discover</p>
            <h2>Our Story</h2>
            <p>Dumpling Time is a small Newtown dining room built around warm service, handmade comfort food and a lively neighbourhood bar feeling.</p>
            <p>Drop in for dumplings and bao, stay for cocktails, shared plates and the glow of Enmore Road after dark.</p>
          </section>

          <section class="poster-gallery" id="spaceSection">
            <img src="/home/story-storefront-night.jpg" alt="Dumpling Time storefront at night">
            <img src="/home/story-interior-entrance.jpg" alt="Dumpling Time dining room entrance">
          </section>

          <section class="poster-menu" id="menuShortcuts">
            <p class="script-title">Taste</p>
            <h2>Fresh From The Kitchen</h2>
            <div class="category-shortcuts">
              <button data-cat="dumpling">Dumplings</button>
              <button data-cat="bao">Bao</button>
              <button data-cat="entree">Entree</button>
              <button data-cat="main">Main</button>
              <button data-cat="rice-noodle">Rice & Noodle</button>
            </div>
          </section>

          <section class="poster-feature">
            <img src="/home/taste-collage-1.jpg" alt="Dumpling and prawn dumpling collage">
            <div>
              <p class="app-kicker">Signature Bites</p>
              <h3>Bao, dumplings and sizzling plates made for sharing.</h3>
            </div>
          </section>

          <section class="poster-stack">
            <img src="/home/taste-collage-2.jpg" alt="Bao and main dishes collage">
            <img src="/home/taste-collage-3.jpg" alt="Bar and interior collage">
            <img src="/home/taste-collage-4.jpg" alt="Dining room atmosphere collage">
          </section>

          <section class="poster-drinks" id="drinksSection">
            <img src="/home/drinks-collage-new.jpg" alt="Cocktails and beers at Dumpling Time">
            <div>
              <p class="script-title">Stay Later</p>
              <h2>Drinks After Dumplings</h2>
              <p>Cocktails, beer and wine make the dining room feel easy, warm and a little bit festive.</p>
            </div>
            <img src="/home/bar-drinks.jpg" alt="Dumpling Time bar drinks">
          </section>

          <section class="poster-business" id="franchiseSection">
            <div class="franchise-hero">
              <p class="script-title">Grow With Us</p>
              <h2>Franchise</h2>
              <p class="franchise-lead">Bring Dumpling Time to the next neighbourhood with a refined brand, a proven menu and an operating model built to scale.</p>
              <div class="franchise-metrics">
                <span>Brand</span>
                <span>Menu</span>
                <span>Systems</span>
              </div>
              <button class="franchise-btn" id="franchiseCta" type="button">Start a conversation</button>
            </div>

            <div class="franchise-grid">
              <article>
                <p class="app-kicker">Why us</p>
                <h3>Built to repeat</h3>
                <p>A focused menu, recognisable identity and store experience designed to travel well across new neighbourhoods.</p>
              </article>
              <article>
                <p class="app-kicker">Support</p>
                <h3>More than recipes</h3>
                <p>Brand, training, supply chain, launch guidance and operating systems working together as one business engine.</p>
              </article>
              <article>
                <p class="app-kicker">Partner fit</p>
                <h3>Operators wanted</h3>
                <p>Best suited to people who care about hospitality, consistency and building something durable over time.</p>
              </article>
            </div>

            <div class="franchise-steps">
              <p class="app-kicker">Pathway</p>
              <ol>
                <li><span>01</span> Enquiry</li>
                <li><span>02</span> Conversation</li>
                <li><span>03</span> Site review</li>
                <li><span>04</span> Training</li>
                <li><span>05</span> Launch</li>
              </ol>
            </div>
            <div class="franchise-details">
              <article>
                <p class="app-kicker">Investment</p>
                <h3>Built with discipline</h3>
                <ul>
                  <li>Indicative investment discussed after initial fit review</li>
                  <li>Site, fit-out and opening costs assessed by location</li>
                  <li>Commercial terms shaped around long-term viability</li>
                </ul>
              </article>
              <article>
                <p class="app-kicker">Requirements</p>
                <h3>What we look for</h3>
                <ul>
                  <li>Hands-on hospitality mindset</li>
                  <li>Commitment to quality and brand consistency</li>
                  <li>Capacity to build and lead a local team</li>
                </ul>
              </article>
            </div>

            <form class="franchise-form" id="franchiseForm">
              <div>
                <p class="app-kicker">Franchise enquiry</p>
                <h3>Start the conversation</h3>
              </div>
              <input type="text" placeholder="Name" id="franchiseName" required>
              <input type="email" placeholder="Email" id="franchiseEmail" required>
              <input type="text" placeholder="Preferred location" id="franchiseLocation" required>
              <textarea rows="4" placeholder="Tell us a little about your background" id="franchiseBackground" required></textarea>
              <button type="submit" class="franchise-submit">Submit enquiry</button>
              <p class="franchise-status" id="franchiseStatus" aria-live="polite"></p>
            </form>
          </section>

          <section class="business-section" id="businessSection">
            <div class="section-intro">
              <p class="app-kicker">Business</p>
              <h2>Built For More Than One Store</h2>
              <p>Dumpling Time grows through the right partnerships, supplying trusted products, serving larger groups and opening selective commercial pathways beyond the dining room.</p>
            </div>
            <div class="business-grid">
              <article>
                <h3>Wholesale</h3>
                <p>Reliable dumpling and bao lines for cafes, venues and food businesses that want quality without building the category from scratch.</p>
              </article>
              <article>
                <h3>Corporate</h3>
                <p>Catering formats for offices, events and teams that need food to arrive with warmth, pace and a sense of occasion.</p>
              </article>
              <article>
                <h3>Distribution</h3>
                <p>Carefully chosen routes for partners who can extend reach while protecting what makes the brand distinct.</p>
              </article>
            </div>
            <button class="section-cta">Talk to our business team</button>
          </section>

          <section class="systems-section" id="systemsSection">
            <div class="section-intro">
              <p class="app-kicker">Systems</p>
              <h2>Built To Scale Before We Need To</h2>
              <p>Future growth needs more than more stores. It needs shared data, repeatable processes and dedicated IT capability strong enough to support every location from the start.</p>
            </div>
            <div class="systems-visuals">
              <img src="/home/systems-expansion-stores.jpg" alt="Future multi-store Dumpling Time concept">
              <img src="/home/systems-network-visual.jpg" alt="Connected multi-store operations visual">
            </div>
            <div class="capability-grid systems-grid">
              <article><span>01</span><h3>Unified Data</h3><p>One source of truth across future locations, not fragmented manual updates.</p></article>
              <article><span>02</span><h3>Repeatable Operations</h3><p>Processes designed to be documented, monitored and reproduced store by store.</p></article>
              <article><span>03</span><h3>Team Capability</h3><p>Operations, training, supply chain and IT support work together to keep systems, workflows and store standards stable as future locations come online.</p></article>
              <article><span>04</span><h3>Expansion Readiness</h3><p>Building the backbone early lowers future rework cost and protects growth opportunities.</p></article>
            </div>
            <p class="section-closing">Growth should reveal opportunity, not the systems gap behind it.</p>
          </section>

          <section class="supply-section" id="supplyChainSection">
            <div class="section-intro">
              <p class="app-kicker">Supply Chain</p>
              <h2>Consistency Is Designed In</h2>
              <p>Growth only works when quality can travel. Our supply chain protects flavour, pace and reliability as the business expands.</p>
            </div>
            <div class="capability-grid">
              <article><span>01</span><h3>Sourcing</h3><p>Trusted ingredients chosen for repeatable quality, disciplined cost and dependable availability.</p></article>
              <article><span>02</span><h3>Central Prep</h3><p>Core prep systems that reduce store complexity while keeping the guest experience fresh and expressive.</p></article>
              <article><span>03</span><h3>Quality Control</h3><p>Clear standards, training and checks that help every location deliver the same Dumpling Time promise.</p></article>
              <article><span>04</span><h3>Inventory</h3><p>Practical stock and replenishment systems that support busy service without unnecessary waste.</p></article>
            </div>
            <p class="section-closing">A strong brand scales on more than demand. It scales on control.</p>
          </section>

          <section class="delivery-section" id="deliverySection">
            <div class="section-intro">
              <p class="app-kicker">Delivery</p>
              <h2>From Kitchen To Customer</h2>
              <p>Every order should feel considered �� whether guests dine in, collect on the way home or order across the neighbourhood.</p>
            </div>
            <div class="capability-grid delivery-grid">
              <article><span>01</span><h3>Pickup</h3><p>Fast takeaway flows for guests who want Dumpling Time on their own schedule.</p></article>
              <article><span>02</span><h3>Platforms</h3><p>Delivery-ready pathways that connect stores with the channels customers already use.</p></article>
              <article><span>03</span><h3>Packaging</h3><p>Packaging choices that protect heat, texture and presentation beyond the kitchen pass.</p></article>
              <article><span>04</span><h3>Order Flow</h3><p>Clear ordering, kitchen and handoff systems that keep service moving when demand climbs.</p></article>
            </div>
            <p class="section-closing">Good delivery is not an add-on. It is part of the product.</p>
          </section>

          <section class="poster-capabilities" id=""platformSection"">
            <article>
              <p class="app-kicker">Platform</p>
              <h3>Operations</h3>
              <p>Live ordering, kitchen, payment and management tools behind the wider business.</p>
            </article>
          </section>

          <section class="poster-location" id="locationSection">
            <p class="app-kicker">Visit Us</p>
            <h2>Newtown</h2>
            <p>43 Enmore Road, Newtown NSW 2042</p>
            <p>Phone: 0450 650 680</p>
            <button class="direction-btn" id="directionsBtn">Get Directions &#8594;</button>
          </section>
        </div>
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
          <div class="form-group"><label for="bookPhone">Phone</label><input type="tel" placeholder="04xxxxxxxx" maxlength="10" inputmode="numeric" id="bookPhone"></div>
          <div class="form-group"><label for="bookAdults">Adults</label><input type="number" min="1" value="2" id="bookAdults"></div>
          <div class="form-group"><label for="bookChildren">Children</label><input type="number" min="0" value="0" id="bookChildren"></div>
          <div class="form-group"><label for="bookHighChair">High chair needed?</label><select id="bookHighChair"><option value="no">No</option><option value="yes">Yes</option></select></div>
          <div class="form-group"><label for="bookDate">Date</label><input type="date" id="bookDate"></div>
          <div class="form-group"><label for="bookTime">Time</label><input type="time" id="bookTime"></div>
          <div class="info-text" id="bookingHoursNote"></div>
          <button class="submit-btn" id="submitBooking">Request Booking</button>
          <div class="info-text" id="bookingStatus">Or call 0450 650 680</div>
        </div>
      </section>
    </main>

    <nav class="bottom-nav" aria-label="Primary navigation">
      <button class="nav-item active" data-page="home"><span class="nav-icon">&#8962;</span><span>Home</span></button>
      <button class="nav-item" data-page="menu"><span class="nav-icon">&#9776;</span><span>Menu</span></button>
      <button class="nav-item" data-page="booking"><span class="nav-icon">&#128197;</span><span>Book</span></button>
    </nav>

    <button class="hamburger-menu" id="hamburgerMenu" type="button" aria-label="Open menu" aria-expanded="false">
      <span></span>
      <span></span>
    </button>

    <div class="menu-scrim" id="menuScrim"></div>
    <aside class="menu-drawer" id="menuDrawer" aria-label="Quick menu">
      <button type="button" class="drawer-close" id="drawerClose" aria-label="Close menu">&#215;</button>
      <p class="app-kicker">Dumpling Time</p>
      <h2>Explore</h2>
      <button data-jump="home">Home</button>
      <button data-page-link="menu">Menu</button>
      <button data-jump="story">Our Story</button>
      <button data-jump="franchise">Franchise</button>
      <button data-jump="business">Business</button>
      <button data-jump="systems">Systems</button>
      <button data-jump="supply-chain">Supply Chain</button>
      <button data-jump="delivery">Delivery</button>
      <button data-jump="platform">Platform</button>
      <button data-jump="contact">Contact</button>
    </aside>

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
        <p id="iosInstallCopy">On iPhone, tap Share in Safari, then choose Add to Home Screen.</p>
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

function isSafariBrowser() {
  const ua = window.navigator.userAgent;
  return /safari/i.test(ua) && !/crios|fxios|edgios|opios|instagram|fbav|fban/i.test(ua);
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
    const iosInstallCopy = document.getElementById('iosInstallCopy');
    if (iosInstallCopy) {
      iosInstallCopy.textContent = isSafariBrowser()
        ? 'On iPhone, tap Share in Safari, then choose Add to Home Screen.'
        : 'If this opened inside another app, tap Open in Browser first. Then in Safari, tap Share and choose Add to Home Screen.';
    }
    document.getElementById('iosInstallSheet')?.classList.add('show');
  }
}

navBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    switchPage(btn.dataset.page);
  });
});

function closeDrawer() {
  document.getElementById('menuDrawer')?.classList.remove('show');
  document.getElementById('menuScrim')?.classList.remove('show');
  document.getElementById('hamburgerMenu')?.setAttribute('aria-expanded', 'false');
}

function openDrawer() {
  document.getElementById('menuDrawer')?.classList.add('show');
  document.getElementById('menuScrim')?.classList.add('show');
  document.getElementById('hamburgerMenu')?.setAttribute('aria-expanded', 'true');
}

function jumpHomeSection(sectionId) {
  switchPage('home');
  const section = document.getElementById(sectionId);
  if (section) {
    window.setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }
}

function openCategory(category) {
  currentCategory = category;
  switchPage('menu');
  document.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.classList.toggle('active-filter', chip.dataset.cat === category);
  });
  renderMenu();
}

document.getElementById('hamburgerMenu')?.addEventListener('click', openDrawer);
document.getElementById('drawerClose')?.addEventListener('click', closeDrawer);
document.getElementById('menuScrim')?.addEventListener('click', closeDrawer);
document.querySelectorAll('[data-jump]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targets = {
      home: 'homeHero',
      story: 'storySection',
      franchise: 'franchiseSection',
      business: 'businessSection',
      systems: 'systemsSection',
      'supply-chain': 'supplyChainSection',
      delivery: 'deliverySection',
      platform: 'platformSection',
      contact: 'locationSection'
    };
    closeDrawer();
    jumpHomeSection(targets[btn.dataset.jump]);
  });
});
document.querySelectorAll('[data-page-link]').forEach((btn) => {
  btn.addEventListener('click', () => {
    closeDrawer();
    switchPage(btn.dataset.pageLink);
  });
});
document.querySelectorAll('[data-cat-link], .category-shortcuts button').forEach((btn) => {
  btn.addEventListener('click', () => {
    closeDrawer();
    openCategory(btn.dataset.catLink || btn.dataset.cat);
  });
});
document.getElementById('heroMenuBtn')?.addEventListener('click', () => switchPage('menu'));
document.getElementById('heroBookBtn')?.addEventListener('click', () => switchPage('booking'));
document.getElementById('directionsBtn')?.addEventListener('click', () => {
  window.location.href = 'https://www.google.com/maps/search/?api=1&query=43%20Enmore%20Road%20Newtown%20NSW%202042';
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
function getBookingHours(dateValue) {
  if (!dateValue) return null;
  const day = new Date(`${dateValue}T12:00:00`).getDay();
  if (day === 2) return { closed: true };
  if (day === 5 || day === 6) return { min: '17:00', max: '21:30', label: '5:00pm-9:30pm' };
  return { min: '17:00', max: '20:30', label: '5:00pm-8:30pm' };
}

function resetBookingStatus() {
  const status = document.getElementById('bookingStatus');
  if (status) status.textContent = 'Or call 0450 650 680';
}

function updateBookingAvailability() {
  const dateValue = document.getElementById('bookDate')?.value;
  const timeInput = document.getElementById('bookTime');
  const note = document.getElementById('bookingHoursNote');
  if (!timeInput || !note) return;
  const hours = getBookingHours(dateValue);
  if (!hours) {
    note.textContent = 'Please choose a date to see available booking hours.';
    return;
  }
  if (hours.closed) {
    timeInput.value = '';
    timeInput.disabled = true;
    timeInput.removeAttribute('min');
    timeInput.removeAttribute('max');
    note.textContent = 'Closed on Tuesdays - bookings are unavailable.';
    return;
  }
  timeInput.disabled = false;
  timeInput.min = hours.min;
  timeInput.max = hours.max;
  note.textContent = `Available booking time: ${hours.label}`;
  if (timeInput.value && (timeInput.value < hours.min || timeInput.value > hours.max)) {
    timeInput.value = '';
  }
}
document.getElementById('submitBooking')?.addEventListener('click', () => {
  resetBookingStatus();
  const name = document.getElementById('bookName').value.trim();
  const phone = document.getElementById('bookPhone').value.trim();
  const adults = Number(document.getElementById('bookAdults').value);
  const children = Number(document.getElementById('bookChildren').value);
  const dateValue = document.getElementById('bookDate').value;
  const timeValue = document.getElementById('bookTime').value;
  const hours = getBookingHours(dateValue);
  const status = document.getElementById('bookingStatus');
  if (!name) {
    alert('Please enter your name.');
    return;
  }
  if (!phone) {
    alert('Please enter your phone number.');
    return;
  }
  if (!/^04\d{8}$/.test(phone)) {
    alert('Please enter a valid Australian mobile number starting with 04 and containing 10 digits in total.');
    return;
  }
  if (!Number.isFinite(adults) || adults < 1) {
    alert('Please enter at least 1 adult.');
    return;
  }
  if (!Number.isFinite(children) || children < 0) {
    alert('Please enter a valid number of children.');
    return;
  }
  if (!dateValue) {
    alert('Please choose a date.');
    return;
  }
  if (hours?.closed) {
    alert('Sorry, we are closed on Tuesdays.');
    return;
  }
  if (!timeValue) {
    alert('Please choose a booking time.');
    return;
  }
  if (timeValue < hours.min || timeValue > hours.max) {
    alert(`Please choose a time between ${hours.label}.`);
    return;
  }
  if (status) {
    status.textContent = 'Your booking request has been sent. We will message you shortly to confirm your table.';
  }
});

document.getElementById('franchiseForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('franchiseName').value.trim();
  const email = document.getElementById('franchiseEmail').value.trim();
  const location = document.getElementById('franchiseLocation').value.trim();
  const background = document.getElementById('franchiseBackground').value.trim();
  const status = document.getElementById('franchiseStatus');

  if (!name || !email || !location || !background) {
    status.textContent = 'Please complete every field before submitting.';
    status.className = 'franchise-status error';
    return;
  }

  const emailLooksValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  if (!emailLooksValid) {
    status.textContent = 'Please enter a valid email address.';
    status.className = 'franchise-status error';
    return;
  }

  const enquiry = {
    name,
    email,
    location,
    background,
    submittedAt: new Date().toISOString()
  };
  const savedEnquiries = JSON.parse(localStorage.getItem('franchiseEnquiries') || '[]');
  savedEnquiries.push(enquiry);
  localStorage.setItem('franchiseEnquiries', JSON.stringify(savedEnquiries));

  event.currentTarget.reset();
  status.textContent = 'Thanks �� your enquiry has been submitted. We will be in touch soon.';
  status.className = 'franchise-status success';
});

document.getElementById('franchiseCta')?.addEventListener('click', () => {
  document.getElementById('franchiseForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  window.setTimeout(() => document.getElementById('franchiseName')?.focus(), 350);
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
dateInput?.addEventListener('change', () => {
  resetBookingStatus();
  updateBookingAvailability();
});
document.getElementById('bookTime')?.addEventListener('input', resetBookingStatus);
updateBookingAvailability();
if (isStandalone()) document.getElementById('headerInstall')?.classList.add('hidden');
if (isIos() && !isStandalone() && !isSafariBrowser()) {
  const iosInstallCopy = document.getElementById('iosInstallCopy');
  if (iosInstallCopy) {
    iosInstallCopy.textContent = 'If this opened inside another app, tap Open in Browser first. Then in Safari, tap Share and choose Add to Home Screen.';
  }
  window.setTimeout(() => document.getElementById('iosInstallSheet')?.classList.add('show'), 900);
}
updateConnectionState();
renderMenu();

const initialScreen = new URLSearchParams(window.location.search).get('screen');
if (initialScreen === 'menu' || initialScreen === 'booking') {
  switchPage(initialScreen);
}














