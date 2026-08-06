(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('[data-menu]');
  const menuOpen = document.querySelector('[data-menu-open]');
  const menuCloseButtons = document.querySelectorAll('[data-menu-close]');
  const dialog = document.querySelector('[data-test-drive-dialog]');
  const toast = document.querySelector('[data-toast]');
  let lastFocused = null;
  let toastTimer;

  if (document.body.classList.contains('intro-active')) {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    window.addEventListener('load', () => window.scrollTo(0, 0), { once: true });
  }

  const keepIntroAtTop = () => {
    if (document.body.classList.contains('intro-active') && !document.body.classList.contains('intro-complete') && window.scrollY !== 0) window.scrollTo(0, 0);
  };
  const updateHeader = () => header.classList.toggle('is-scrolled', !document.body.classList.contains('intro-active') && window.scrollY > 36);
  updateHeader();
  window.addEventListener('scroll', keepIntroAtTop, { passive: true });
  window.addEventListener('scroll', updateHeader, { passive: true });

  const openMenu = () => {
    lastFocused = document.activeElement;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    menuOpen.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    menu.querySelector('.site-menu__panel [data-menu-close]').focus();
  };
  const closeMenu = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menuOpen.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (lastFocused) lastFocused.focus();
  };
  menuOpen.addEventListener('click', openMenu);
  menuCloseButtons.forEach(button => button.addEventListener('click', closeMenu));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
    if (event.key !== 'Tab' || !menu.classList.contains('is-open')) return;
    const focusable = [...menu.querySelectorAll('a, button:not([disabled])')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  const slides = [...document.querySelectorAll('[data-slide]')];
  const controls = [...document.querySelectorAll('[data-slide-control]')];
  const carousel = document.querySelector('[data-carousel]');
  let currentSlide = 0;
  let carouselTimer;
  let introFinished = false;
  const showSlide = index => {
    currentSlide = index;
    slides.forEach((slide, i) => {
      const isActive = i === index;
      const video = slide.querySelector('video');
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      slide.inert = !isActive;
      if (video) {
        if (isActive && !reducedMotion) video.play().catch(() => {});
        else video.pause();
      }
    });
    controls.forEach((control, i) => { control.classList.toggle('is-active', i === index); control.toggleAttribute('aria-current', i === index); });
  };
  const stopCarousel = () => window.clearInterval(carouselTimer);
  const startCarousel = () => {
    stopCarousel();
    if (introFinished && !reducedMotion) carouselTimer = window.setInterval(() => showSlide((currentSlide + 1) % slides.length), 6500);
  };
  controls.forEach(control => control.addEventListener('click', () => { showSlide(Number(control.dataset.slideControl)); startCarousel(); }));
  carousel.addEventListener('mouseenter', stopCarousel);
  carousel.addEventListener('mouseleave', startCarousel);
  carousel.addEventListener('focusin', stopCarousel);
  carousel.addEventListener('focusout', startCarousel);
  showSlide(0);

  const introIdentity = [...document.querySelectorAll('.hero-slide__identity')];
  const introContent = [...document.querySelectorAll('.hero-slide__content, .hero__controls, .ask-gwm')];
  const introBelowFold = [...document.querySelectorAll('#main-content > section:not(.hero), #footer')];
  const setInert = (elements, value) => elements.forEach(element => { element.inert = value; });
  const revealHeader = () => {
    document.body.classList.add('intro-header-visible');
    header.inert = false;
  };
  const revealIdentity = () => {
    document.body.classList.add('intro-identity-visible');
    setInert(introIdentity, false);
  };
  const completeIntro = () => {
    revealIdentity();
    revealHeader();
    window.scrollTo(0, 0);
    document.body.classList.add('intro-content-visible', 'intro-complete');
    setInert(introContent, false);
    setInert(introBelowFold, false);
    introFinished = true;
    startCarousel();
    window.setTimeout(() => {
      document.body.classList.remove('intro-active', 'intro-identity-visible', 'intro-header-visible', 'intro-content-visible', 'intro-complete');
    }, 1000);
  };

  header.inert = true;
  setInert(introIdentity, true);
  setInert(introContent, true);
  setInert(introBelowFold, true);
  if (reducedMotion) {
    completeIntro();
  } else {
    window.setTimeout(revealIdentity, 2000);
    window.setTimeout(revealHeader, 6000);
    window.setTimeout(completeIntro, 8000);
  }

  const brandTabs = [...document.querySelectorAll('[data-brand]')];
  const vehicleCards = [...document.querySelectorAll('[data-vehicle-brand]')];
  const showBrand = (tab, moveFocus = false) => {
    const brand = tab.dataset.brand;
    brandTabs.forEach(item => {
      const isActive = item === tab;
      item.setAttribute('aria-selected', String(isActive));
      item.tabIndex = isActive ? 0 : -1;
    });
    vehicleCards.forEach(card => { card.hidden = card.dataset.vehicleBrand !== brand; });
    const grid = document.querySelector('#vehicle-grid');
    if (grid) grid.setAttribute('aria-labelledby', tab.id);
    if (moveFocus) tab.focus();
  };
  brandTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showBrand(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + brandTabs.length) % brandTabs.length;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % brandTabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = brandTabs.length - 1;
      showBrand(brandTabs[nextIndex], true);
    });
  });

  const powertrainExplorer = document.querySelector('[data-powertrain-explorer]');
  if (powertrainExplorer) {
    const powertrainTabs = [...powertrainExplorer.querySelectorAll('[data-powertrain-tab]')];
    const powertrainPanels = [...powertrainExplorer.querySelectorAll('[data-powertrain-panel]')];
    let activePowertrain = 0;
    const showPowertrain = (index, moveFocus = false) => {
      activePowertrain = (index + powertrainPanels.length) % powertrainPanels.length;
      powertrainTabs.forEach((tab, tabIndex) => {
        const isActive = tabIndex === activePowertrain;
        tab.setAttribute('aria-selected', String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
        if (isActive && moveFocus) tab.focus();
      });
      powertrainPanels.forEach((panel, panelIndex) => {
        const isActive = panelIndex === activePowertrain;
        panel.hidden = !isActive;
        panel.classList.toggle('is-active', isActive);
      });
    };
    powertrainTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => showPowertrain(index));
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        if (event.key === 'Home') showPowertrain(0, true);
        else if (event.key === 'End') showPowertrain(powertrainTabs.length - 1, true);
        else showPowertrain(activePowertrain + (event.key === 'ArrowRight' ? 1 : -1), true);
      });
    });
    powertrainExplorer.querySelector('[data-powertrain-previous]').addEventListener('click', () => showPowertrain(activePowertrain - 1));
    powertrainExplorer.querySelector('[data-powertrain-next]').addEventListener('click', () => showPowertrain(activePowertrain + 1));
  }

  const technologyTabs = document.querySelector('[data-technology-tabs]');
  if (technologyTabs) {
    const technologyButtons = [...technologyTabs.querySelectorAll('[data-technology-tab]')];
    const technologyPanels = [...technologyTabs.querySelectorAll('[data-technology-panel]')];
    const technologyBackgrounds = [...technologyTabs.querySelectorAll('[data-technology-background]')];
    let activeTechnology = 0;
    const showTechnology = (index, moveFocus = false) => {
      activeTechnology = (index + technologyButtons.length) % technologyButtons.length;
      technologyButtons.forEach((button, buttonIndex) => {
        const isActive = buttonIndex === activeTechnology;
        button.setAttribute('aria-selected', String(isActive));
        button.tabIndex = isActive ? 0 : -1;
        if (isActive && moveFocus) button.focus();
      });
      technologyPanels.forEach((panel, panelIndex) => {
        const isActive = panelIndex === activeTechnology;
        panel.hidden = !isActive;
        panel.classList.toggle('is-active', isActive);
      });
      technologyBackgrounds.forEach((background, backgroundIndex) => background.classList.toggle('is-active', backgroundIndex === activeTechnology));
    };
    technologyButtons.forEach((button, index) => {
      button.addEventListener('click', () => showTechnology(index));
      button.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        if (event.key === 'Home') showTechnology(0, true);
        else if (event.key === 'End') showTechnology(technologyButtons.length - 1, true);
        else showTechnology(activeTechnology + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1), true);
      });
    });
  }

  const careVideo = document.querySelector('[data-care-video]');
  const carePlay = document.querySelector('[data-care-play]');
  if (careVideo && carePlay) {
    const careVisual = careVideo.closest('.care__visual');
    carePlay.addEventListener('click', async () => {
      try {
        careVideo.controls = true;
        careVideo.muted = true;
        await careVideo.play();
      } catch {
        careVideo.controls = false;
        careVideo.muted = false;
        showToast('Video playback could not be started.');
      }
    });
    careVideo.addEventListener('play', () => careVisual.classList.add('is-playing'));
    careVideo.addEventListener('ended', () => {
      careVisual.classList.remove('is-playing');
      careVideo.controls = false;
      careVideo.muted = false;
      careVideo.currentTime = 0;
    });
  }

  document.querySelectorAll('[data-test-drive]').forEach(button => button.addEventListener('click', () => dialog.showModal()));
  document.querySelectorAll('a[href="#test-drive-dialog"]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); dialog.showModal(); }));

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 4200);
  }
  document.querySelectorAll('[data-placeholder-action]').forEach(button => button.addEventListener('click', () => showToast(button.dataset.placeholderAction)));
  document.querySelector('[data-language-toggle]').addEventListener('click', () => showToast('Arabic content is pending approved translation.'));
})();
