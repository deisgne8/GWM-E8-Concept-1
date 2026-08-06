(() => {
  const models = {
    'h9': { family: 'GWM HAVAL', name: 'H9', slogan: 'Born for Off-Roading', category: 'Off-road SUV', body: 'Off-road SUV', powertrain: 'ICE · Diesel', image: 'catalog-haval-h9-studio.png' },
    'h7': { family: 'GWM HAVAL', name: 'H7', slogan: 'Bold Styling', category: 'SUV', body: 'SUV', powertrain: 'HEV', image: 'catalog-haval-h7-studio.png' },
    'h6': { family: 'GWM HAVAL', name: 'H6', slogan: 'Next-gen High-tech Auto', category: 'SUV', body: 'SUV', powertrain: 'HEV · ICE', image: 'catalog-haval-h6-studio.png' },
    'jolion-max': { family: 'GWM HAVAL', name: 'Jolion Max', slogan: 'More of Everything', category: 'SUV', body: 'SUV', powertrain: 'HEV', image: 'catalog-haval-jolion-max-studio.png' },
    'tank-300': { family: 'GWM TANK', name: 'TANK 300', slogan: 'Bold and refined', category: 'Off-road SUV', body: 'Off-road SUV', powertrain: 'HEV · ICE', image: 'catalog-tank-300-studio.png' },
    'tank-400': { family: 'GWM TANK', name: 'TANK 400', slogan: 'Explore the TANK 400', category: 'Off-road SUV', body: 'Off-road SUV', powertrain: 'Details on request', image: 'catalog-tank-400-studio.png' },
    'tank-500': { family: 'GWM TANK', name: 'TANK 500', slogan: 'Offroad on Demand', category: 'Premium SUV', body: 'Premium SUV', powertrain: 'HEV', image: 'catalog-tank-500-studio.png' },
    'tank-700': { family: 'GWM TANK', name: 'TANK 700', slogan: 'Flagship off-road luxury', category: 'Off-road SUV', body: 'Off-road SUV', powertrain: 'PHEV', image: 'catalog-tank-700-studio.png' },
    'wingle-5': { family: 'GWM WINGLE', name: 'Wingle 5', slogan: 'Straightforward strength', category: 'Pickup', body: 'Pickup', powertrain: 'Diesel', image: 'catalog-wingle-5-studio.png' },
    'wingle-7': { family: 'GWM WINGLE', name: 'Wingle 7', slogan: 'Work without compromise', category: 'Pickup', body: 'Pickup', powertrain: 'Diesel', image: 'catalog-wingle-7-studio.png' },
    'poer-hi4-t': { family: 'GWM POER', name: 'Hi4-T', slogan: 'Explore the Hi4-T', category: 'Pickup', body: 'Pickup', powertrain: 'Hi4-T', image: 'catalog-poer-hi4-t-studio.png' },
    'cannon-phev': { family: 'GWM POER', name: 'Cannon PHEV', slogan: 'Explore the Cannon PHEV', category: 'Pickup', body: 'Pickup', powertrain: 'PHEV', image: 'catalog-cannon-phev-studio.png' },
    'king-kong-cannon': { family: 'GWM POER', name: 'King Kong Cannon', slogan: 'Explore the King Kong Cannon', category: 'Pickup', body: 'Pickup', powertrain: 'Details on request', image: 'catalog-king-kong-cannon-studio.png' },
    'artillery': { family: 'GWM POER', name: 'Artillery', slogan: 'Explore the Artillery', category: 'Pickup', body: 'Pickup', powertrain: 'Details on request', image: 'catalog-artillery-studio.png' }
  };

  const params = new URLSearchParams(window.location.search);
  const model = models[params.get('model')] || models.h9;
  const imagePath = `assets/images/${model.image}`;
  const fullName = ['GWM TANK', 'GWM WINGLE'].includes(model.family) ? `GWM ${model.name}` : `${model.family} ${model.name}`;

  document.title = `${fullName} | GWM Middle East`;
  document.querySelectorAll('[data-model-family]').forEach(element => { element.textContent = model.family; });
  document.querySelectorAll('[data-model-title]').forEach(element => { element.textContent = model.name; });
  document.querySelectorAll('[data-model-short-name]').forEach(element => { element.textContent = model.name; });
  document.querySelectorAll('[data-model-full-name]').forEach(element => { element.textContent = fullName; });
  document.querySelectorAll('[data-model-slogan]').forEach(element => { element.textContent = model.slogan; });
  document.querySelectorAll('[data-model-category]').forEach(element => { element.textContent = model.category; });
  document.querySelectorAll('[data-model-body]').forEach(element => { element.textContent = model.body; });
  document.querySelectorAll('[data-model-powertrain]').forEach(element => { element.textContent = model.powertrain; });
  document.querySelectorAll('[data-model-description]').forEach(element => { element.textContent = `Explore the ${fullName}, presented for the Middle East. Approved regional product information will be added when available.`; });
  document.querySelectorAll('[data-model-image]').forEach(image => { image.src = imagePath; image.alt = `${fullName} in a front three-quarter studio view`; });
  const dialogModel = document.querySelector('[data-dialog-model]');
  if (dialogModel) dialogModel.value = fullName;

  const menu = document.querySelector('[data-menu]');
  const menuOpen = document.querySelector('[data-menu-open]');
  const menuCloseButtons = document.querySelectorAll('[data-menu-close]');
  let lastFocused = null;
  const openMenu = () => { lastFocused = document.activeElement; menu.classList.add('is-open'); menu.setAttribute('aria-hidden', 'false'); menuOpen.setAttribute('aria-expanded', 'true'); document.body.classList.add('menu-open'); menu.querySelector('[data-menu-close]').focus(); };
  const closeMenu = () => { menu.classList.remove('is-open'); menu.setAttribute('aria-hidden', 'true'); menuOpen.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); if (lastFocused) lastFocused.focus(); };
  menuOpen.addEventListener('click', openMenu);
  menuCloseButtons.forEach(button => button.addEventListener('click', closeMenu));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.classList.contains('is-open')) closeMenu(); });

  const modelNavLinks = [...document.querySelectorAll('.model-nav__links a')];
  const sectionIds = modelNavLinks.map(link => link.hash.slice(1));
  const updateModelNav = () => {
    let active = sectionIds[0];
    sectionIds.forEach(id => { const section = document.getElementById(id); if (section && section.getBoundingClientRect().top < 190) active = id; });
    modelNavLinks.forEach(link => link.classList.toggle('is-active', link.hash === `#${active}`));
  };
  updateModelNav();
  window.addEventListener('scroll', updateModelNav, { passive: true });

  const dialog = document.querySelector('[data-test-drive-dialog]');
  document.querySelectorAll('[data-test-drive]').forEach(button => button.addEventListener('click', () => dialog.showModal()));
  const toast = document.querySelector('[data-toast]');
  let toastTimer;
  const showToast = message => { window.clearTimeout(toastTimer); toast.textContent = message; toast.hidden = false; toastTimer = window.setTimeout(() => { toast.hidden = true; }, 4200); };
  document.querySelectorAll('[data-placeholder-action]').forEach(element => element.addEventListener('click', () => showToast(element.dataset.placeholderAction)));
})();
