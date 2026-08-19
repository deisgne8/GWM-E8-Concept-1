(() => {
  const models = {
    'h9': { family: 'GWM HAVAL', name: 'H9', slogan: 'Born for Off-Roading', category: 'Off-road SUV', body: 'Off-road SUV', powertrain: 'ICE · Diesel', image: 'catalog-haval-h9-studio.png', lifestyle: 'haval-h9.jpg' },
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
  const isSaudi = params.get('market') === 'sa';
  const modelKey = models[params.get('model')] ? params.get('model') : 'h9';
  const model = models[modelKey];
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
  document.querySelectorAll('[data-model-lifestyle]').forEach(image => {
    image.src = `assets/images/${model.lifestyle || model.image}`;
    image.alt = model.lifestyle ? `${fullName} in a supplied location image` : `${fullName} in a studio view`;
  });
  if (modelKey !== 'h9') {
    const heroFilm = document.querySelector('.product-hero__film');
    heroFilm?.pause();
    if (heroFilm) { heroFilm.hidden = true; document.querySelector('.product-hero').style.backgroundImage = `linear-gradient(90deg,rgba(0,0,0,.88),rgba(0,0,0,.16)),url(${imagePath})`; document.querySelector('.product-hero').style.backgroundSize = 'cover'; document.querySelector('.product-hero').style.backgroundPosition = 'center'; }
    const designFilm = document.querySelector('[data-design-film]');
    const designFallback = document.querySelector('[data-design-film-fallback]');
    designFilm?.classList.add('is-static');
    if (designFallback) designFallback.hidden = false;
    document.querySelectorAll('[data-h9-gallery]').forEach(gallery => { gallery.hidden = true; });
    const cabinFallback = document.querySelector('[data-cabin-explorer]');
    cabinFallback?.classList.add('is-static');
    cabinFallback?.querySelectorAll('[data-cabin-image]').forEach((image, index) => {
      image.hidden = index !== 0;
      if (index === 0) {
        image.src = imagePath;
        image.alt = `${fullName} in a studio view`;
      }
    });
  }
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

  const marketSelector = document.querySelector('[data-market-selector]');
  const marketOpen = document.querySelector('[data-market-open]');
  const closeMarket = () => { marketSelector.classList.remove('is-open'); marketSelector.setAttribute('aria-hidden', 'true'); marketOpen.setAttribute('aria-expanded', 'false'); document.body.classList.remove('market-selector-open'); };
  marketOpen.addEventListener('click', () => { marketSelector.classList.add('is-open'); marketSelector.setAttribute('aria-hidden', 'false'); marketOpen.setAttribute('aria-expanded', 'true'); document.body.classList.add('market-selector-open'); marketSelector.querySelector('.market-selector__panel [data-market-close]').focus(); });
  document.querySelectorAll('[data-market-close]').forEach(button => button.addEventListener('click', closeMarket));

  const modelNavLinks = [...document.querySelectorAll('.model-nav__links a')];
  const sectionIds = modelNavLinks.map(link => link.hash.slice(1));
  const header = document.querySelector('[data-header]');
  const modelNav = document.querySelector('[data-model-nav]');
  const updateModelNav = () => {
    let active = sectionIds[0];
    sectionIds.forEach(id => { const section = document.getElementById(id); if (section && section.getBoundingClientRect().top < 190) active = id; });
    modelNavLinks.forEach(link => link.classList.toggle('is-active', link.hash === `#${active}`));
    modelNav.classList.toggle('is-compact', window.scrollY > window.innerHeight * .9);
    header.classList.toggle('is-product-scrolled', window.scrollY > 40);
  };
  updateModelNav();
  window.addEventListener('scroll', updateModelNav, { passive: true });
  modelNavLinks.forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.hash);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const designFilm = document.querySelector('[data-design-film]');
  const designVideo = document.querySelector('[data-design-film-video]');
  if (modelKey === 'h9' && designFilm && designVideo && !reducedMotion) {
    const beats = [...designFilm.querySelectorAll('[data-design-beat]')];
    const progressItems = [...designFilm.querySelectorAll('[data-design-progress]')];
    const progressBar = designFilm.querySelector('[data-design-film-progress]');
    const loading = designFilm.querySelector('[data-design-film-loading]');
    let sectionTop = 0;
    let scrollDistance = 1;
    let targetTime = 0;
    let renderedTime = 0;
    let duration = 7.234;
    let animationFrame = 0;
    let resizeFrame = 0;
    let isNear = false;
    let lastSeek = 0;
    let chapterScrollLocked = false;
    let touchStartY = 0;
    let touchStartProgress = 0;
    const chapterStops = [.16, .365, .58, .79, .95];

    designFilm.classList.add('is-enhanced');
    designVideo.pause();

    const clamp = value => Math.min(1, Math.max(0, value));
    const measureFilm = () => {
      sectionTop = designFilm.getBoundingClientRect().top + window.scrollY;
      scrollDistance = Math.max(1, designFilm.offsetHeight - window.innerHeight);
    };
    const updateChapters = progress => {
      let activeBeat = -1;
      beats.forEach((beat, index) => {
        const active = progress >= Number(beat.dataset.start) && progress <= Number(beat.dataset.end);
        beat.classList.toggle('is-active', active);
        if (active) activeBeat = index;
      });
      designFilm.dataset.activeBeat = String(activeBeat);
      const activeChapter = activeBeat === 4 ? 3 : activeBeat >= 0 ? activeBeat : progress < .28 ? 0 : progress < .48 ? 1 : progress < .7 ? 2 : 3;
      progressItems.forEach((item, index) => item.classList.toggle('is-active', index === activeChapter));
      progressBar.style.transform = `scaleX(${progress})`;
    };
    const renderFilm = timestamp => {
      animationFrame = 0;
      if (!isNear || designVideo.readyState < 2) return;
      const difference = targetTime - renderedTime;
      if (Math.abs(difference) <= .003) {
        renderedTime = targetTime;
        const commitFinalFrame = () => { designVideo.currentTime = targetTime; };
        if (designVideo.seeking) designVideo.addEventListener('seeked', commitFinalFrame, { once: true });
        else commitFinalFrame();
        return;
      }
      renderedTime += Math.max(-.32, Math.min(.32, difference * .24));
      if (timestamp - lastSeek > 40) {
        designVideo.currentTime = renderedTime;
        lastSeek = timestamp;
      }
      animationFrame = requestAnimationFrame(renderFilm);
    };
    const updateFilm = () => {
      const sectionRect = designFilm.getBoundingClientRect();
      isNear = sectionRect.bottom > -window.innerHeight && sectionRect.top < window.innerHeight * 2;
      const progress = clamp((window.scrollY - sectionTop) / scrollDistance);
      targetTime = progress === 0 ? 0 : progress === 1 ? duration : progress * duration;
      updateChapters(progress);
      if ((progress === 0 || progress === 1) && designVideo.readyState >= 2) {
        renderedTime = targetTime;
        designVideo.currentTime = targetTime;
      } else if (isNear && !animationFrame) animationFrame = requestAnimationFrame(renderFilm);
      if (!isNear && animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };
    const currentFilmProgress = () => clamp((window.scrollY - sectionTop) / scrollDistance);
    const moveToChapter = (direction, progress = currentFilmProgress()) => {
      const nextStop = direction > 0
        ? chapterStops.find(stop => stop > progress + .035)
        : [...chapterStops].reverse().find(stop => stop < progress - .035);
      if (nextStop === undefined) return false;
      chapterScrollLocked = true;
      window.scrollTo({ top: sectionTop + nextStop * scrollDistance, behavior: 'smooth' });
      window.setTimeout(() => { chapterScrollLocked = false; }, 850);
      return true;
    };
    const handleChapterWheel = event => {
      const rect = designFilm.getBoundingClientRect();
      const chapterIsPinned = rect.top <= 240 && rect.bottom >= window.innerHeight - 2;
      if (!chapterIsPinned || Math.abs(event.deltaY) < 6) return;
      if (chapterScrollLocked) {
        event.preventDefault();
        return;
      }
      if (moveToChapter(Math.sign(event.deltaY))) event.preventDefault();
    };
    const handleTouchStart = event => {
      touchStartY = event.changedTouches[0]?.clientY || 0;
      touchStartProgress = currentFilmProgress();
    };
    const handleTouchEnd = event => {
      const distance = touchStartY - (event.changedTouches[0]?.clientY || touchStartY);
      const rect = designFilm.getBoundingClientRect();
      if (rect.top <= 240 && rect.bottom >= window.innerHeight - 2 && Math.abs(distance) > 42 && !chapterScrollLocked) {
        moveToChapter(Math.sign(distance), touchStartProgress);
      }
    };
    const markReady = () => {
      duration = Math.min(Number.isFinite(designVideo.duration) ? designVideo.duration : 7.234, 7.234);
      loading?.classList.add('is-ready');
      if (loading) loading.querySelector('strong').textContent = isSaudi ? 'فيلم تصميم H9 جاهز' : 'H9 design film ready';
      measureFilm();
      updateFilm();
    };
    const nearObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        designVideo.preload = 'auto';
        if (designVideo.readyState < 2) designVideo.load();
        updateFilm();
      }
    }, { rootMargin: '120% 0px', threshold: 0 });

    nearObserver.observe(designFilm);
    designVideo.addEventListener('loadedmetadata', () => {
      duration = Math.min(designVideo.duration || 7.234, 7.234);
      designVideo.currentTime = clamp((window.scrollY - sectionTop) / scrollDistance) * duration;
    }, { once: true });
    designVideo.addEventListener('loadeddata', markReady, { once: true });
    designVideo.addEventListener('error', () => {
      designFilm.classList.remove('is-enhanced');
      loading?.classList.remove('is-ready');
    }, { once: true });
    window.addEventListener('scroll', updateFilm, { passive: true });
    window.addEventListener('wheel', handleChapterWheel, { passive: false });
    designFilm.addEventListener('touchstart', handleTouchStart, { passive: true });
    designFilm.addEventListener('touchend', handleTouchEnd, { passive: true });
    const resizeFilm = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => { resizeFrame = 0; measureFilm(); updateFilm(); });
    };
    window.addEventListener('resize', resizeFilm, { passive: true });
    window.addEventListener('orientationchange', resizeFilm, { passive: true });
    measureFilm();
    updateFilm();
  }

  document.documentElement.classList.add('js-reveal');
  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }), { threshold: .16, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  const cabinExplorer = document.querySelector('[data-cabin-explorer]');
  if (cabinExplorer && modelKey === 'h9') {
    const cabinImages = [...cabinExplorer.querySelectorAll('[data-cabin-image]')];
    const cabinControls = [...cabinExplorer.querySelectorAll('[data-cabin-control]')];
    const cabinLabel = cabinExplorer.querySelector('[data-cabin-label]');
    const cabinHotspot = cabinExplorer.querySelector('[data-cabin-hotspot]');
    const cabinNote = cabinExplorer.querySelector('[data-cabin-note]');
    const viewNames = isSaudi
      ? { front: 'المقصورة الأمامية', space: 'مساحة مرنة', display: 'الشاشة المركزية' }
      : { front: 'Front cabin', space: 'Flexible space', display: 'Central display' };
    const viewOrder = Object.keys(viewNames);
    let activeCabinView = 'front';

    const setCabinView = view => {
      if (!viewNames[view]) return;
      activeCabinView = view;
      cabinImages.forEach(image => image.classList.toggle('is-active', image.dataset.cabinImage === view));
      cabinControls.forEach(control => {
        const selected = control.dataset.cabinControl === view;
        control.classList.toggle('is-active', selected);
        control.setAttribute('aria-selected', String(selected));
        control.tabIndex = selected ? 0 : -1;
      });
      if (cabinLabel) cabinLabel.textContent = viewNames[view];
      if (cabinNote && cabinHotspot) {
        cabinNote.hidden = true;
        cabinHotspot.setAttribute('aria-expanded', 'false');
      }
    };

    cabinControls.forEach(control => {
      control.addEventListener('click', () => setCabinView(control.dataset.cabinControl));
      control.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let index = viewOrder.indexOf(activeCabinView);
        if (event.key === 'Home') index = 0;
        else if (event.key === 'End') index = viewOrder.length - 1;
        else index = (index + (event.key === 'ArrowRight' ? 1 : -1) + viewOrder.length) % viewOrder.length;
        setCabinView(viewOrder[index]);
        cabinExplorer.querySelector(`[data-cabin-control="${viewOrder[index]}"]`)?.focus();
      });
    });
    cabinHotspot?.addEventListener('click', () => {
      const open = cabinHotspot.getAttribute('aria-expanded') !== 'true';
      cabinHotspot.setAttribute('aria-expanded', String(open));
      cabinNote.hidden = !open;
    });
    setCabinView(activeCabinView);
  }

  const parallaxItems = [...document.querySelectorAll('[data-parallax] img')];
  let parallaxFrame = 0;
  const updateParallax = () => {
    parallaxFrame = 0;
    if (reducedMotion) return;
    parallaxItems.forEach(image => { const rect = image.parentElement.getBoundingClientRect(); if (rect.bottom > 0 && rect.top < innerHeight) image.style.transform = `translate3d(0,${Math.max(-28,Math.min(28,(rect.top + rect.height / 2 - innerHeight / 2) * -.035))}px,0) scale(1.04)`; });
  };
  window.addEventListener('scroll', () => { if (!parallaxFrame) parallaxFrame = requestAnimationFrame(updateParallax); }, { passive: true });

  const mediaItems = document.querySelectorAll('[data-media-item]');
  document.querySelectorAll('[data-media-control]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-media-control]').forEach(item => { const selected = item === button; item.classList.toggle('is-active', selected); item.setAttribute('aria-selected', String(selected)); });
    mediaItems.forEach(item => { const selected = item.dataset.mediaItem === button.dataset.mediaControl; item.hidden = !selected; if (item.tagName === 'VIDEO' && !selected) item.pause(); });
  }));

  const dialog = document.querySelector('[data-test-drive-dialog]');
  document.querySelectorAll('[data-test-drive]').forEach(button => button.addEventListener('click', () => dialog.showModal()));
  const toast = document.querySelector('[data-toast]');
  let toastTimer;
  const showToast = message => { window.clearTimeout(toastTimer); toast.textContent = message; toast.hidden = false; toastTimer = window.setTimeout(() => { toast.hidden = true; }, 4200); };
  document.querySelectorAll('[data-placeholder-action]').forEach(element => element.addEventListener('click', () => showToast(element.dataset.placeholderAction)));

  const askOverlay = document.querySelector('[data-ask-overlay]');
  const askLog = document.querySelector('[data-ask-log]');
  const askForm = document.querySelector('[data-ask-form]');
  const askInput = askForm.querySelector('input');
  const closeAsk = () => { askOverlay.classList.remove('is-open'); askOverlay.setAttribute('aria-hidden', 'true'); document.body.classList.remove('ask-open'); };
  const answerQuestion = question => {
    const text = question.trim();
    if (!text) return;
    askLog.querySelector('.ask-intro')?.remove();
    const user = document.createElement('div'); user.className = 'ask-message ask-message--user'; user.innerHTML = `<p>${text.replace(/[<>]/g, '')}</p>`; askLog.append(user);
    let answer = isSaudi
      ? `يُعرض ${fullName} هنا بنظام دفع ${model.powertrain}. يجب تأكيد الفئات والمواصفات والتوافر مع وكيل جي دبليو إم المعتمد في المملكة.`
      : `${fullName} is presented here with a ${model.powertrain} powertrain. Exact grades, specifications and availability must be confirmed with the local GWM market team.`;
    if (/test drive|book|تجربة|حجز/i.test(text)) answer = isSaudi ? `استخدم زر «احجز تجربة قيادة» لبدء طلب تجربة ${fullName}.` : `Use any “Book a test drive” button on this page to start a request for the ${fullName}.`;
    if (/availability|where|dealer|توفر|متاح|وكيل|أين/i.test(text)) answer = isSaudi ? `يختلف توفر ${fullName} حسب المنطقة والفئة. تواصل مع وكيل جي دبليو إم المعتمد في المملكة للتأكد.` : `Local availability for the ${fullName} varies by market. Choose your market from the globe menu for the relevant country experience.`;
    const sourceLabel = isSaudi ? 'المصدر' : 'Source';
    const sourceName = isSaudi ? `صفحة ${fullName} السعودية` : `${fullName} concept page`;
    const response = document.createElement('div'); response.className = 'ask-message ask-message--assistant'; response.innerHTML = `<p>${answer}</p><div class="ask-message__meta"><span>${sourceLabel}</span><strong>${sourceName}</strong></div>`; askLog.append(response); askLog.scrollTop = askLog.scrollHeight;
  };
  document.querySelectorAll('[data-ask-gwm]').forEach(button => button.addEventListener('click', () => { askOverlay.classList.add('is-open'); askOverlay.setAttribute('aria-hidden', 'false'); document.body.classList.add('ask-open'); askInput.focus(); }));
  document.querySelectorAll('[data-ask-close]').forEach(button => button.addEventListener('click', closeAsk));
  document.querySelectorAll('[data-ask-suggestion]').forEach(button => button.addEventListener('click', () => answerQuestion(button.textContent)));
  askForm.addEventListener('submit', event => { event.preventDefault(); answerQuestion(askInput.value); askInput.value = ''; });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMarket(); closeAsk(); } });
})();
