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

  const openTestDrive = () => {
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('drawer-open');
  };
  const closeTestDrive = () => {
    dialog.close();
    document.body.classList.remove('drawer-open');
  };
  document.querySelectorAll('[data-test-drive]').forEach(button => button.addEventListener('click', openTestDrive));
  document.querySelectorAll('a[href="#test-drive-dialog"]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); openTestDrive(); }));
  dialog.querySelectorAll('[data-test-drive-close]').forEach(button => button.addEventListener('click', closeTestDrive));
  dialog.addEventListener('click', event => { if (event.target === dialog) closeTestDrive(); });
  dialog.addEventListener('close', () => document.body.classList.remove('drawer-open'));

  const testDriveForm = dialog.querySelector('[data-test-drive-form]');
  const testDriveSuccess = dialog.querySelector('[data-test-drive-success]');
  testDriveForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!testDriveForm.reportValidity()) return;
    testDriveSuccess.hidden = false;
    testDriveForm.querySelector('button[type="submit"]').disabled = true;
    testDriveSuccess.focus?.();
  });

  const askOverlay = document.querySelector('[data-ask-overlay]');
  const askForm = document.querySelector('[data-ask-form]');
  const askInput = askForm.querySelector('input[name="question"]');
  const askLog = document.querySelector('[data-ask-log]');
  let askLastFocused = null;
  const askAnswers = [
    {
      match: /hybrid|hev|phev|electric|bev|powertrain/i,
      answer: 'The concept range includes HEV and PHEV choices across selected HAVAL, TANK and POER models, alongside battery-electric mobility. Exact availability varies by Middle East market.',
      source: 'Powertrain Explorer',
      follow: 'Show the vehicle range'
    },
    {
      match: /tank\s*300|desert|off.?road/i,
      answer: 'The TANK 300 is presented as an off-road SUV. Suitability for a specific desert route depends on terrain, conditions, driver experience and the specification approved for your market.',
      source: 'GWM TANK model range',
      follow: 'Explore TANK models'
    },
    {
      match: /test drive|book|drive/i,
      answer: 'You can start a test-drive request from the header or any vehicle page. Choose a model, country and city, then add your contact details.',
      source: 'Test-drive journey',
      follow: 'Book a test drive'
    },
    {
      match: /dealer|service|warranty|owner/i,
      answer: 'GWM CARE brings together service booking, warranty information and owner support. Market-specific coverage and dealer details will be connected to approved regional sources.',
      source: 'GWM CARE',
      follow: 'View owner support'
    }
  ];
  const fallbackAnswer = {
    answer: 'I can help with the local GWM vehicle range, powertrains, ownership support and test-drive journey. Try asking about a model family or how you prefer to drive.',
    source: 'GWM Middle East concept',
    follow: 'Browse all vehicles'
  };
  const openAsk = () => {
    askLastFocused = document.activeElement;
    askOverlay.classList.add('is-open');
    askOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('ask-open');
    window.setTimeout(() => askInput.focus(), 80);
  };
  const closeAsk = () => {
    askOverlay.classList.remove('is-open');
    askOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ask-open');
    askLastFocused?.focus();
  };
  const appendAskMessage = (role, text, extra = null) => {
    const row = document.createElement('div');
    row.className = `ask-message ask-message--${role}`;
    const message = document.createElement('p');
    message.textContent = text;
    row.append(message);
    if (extra) {
      const meta = document.createElement('div');
      meta.className = 'ask-message__meta';
      meta.innerHTML = `<span>Source</span><strong>${extra.source}</strong>`;
      const follow = document.createElement('button');
      follow.type = 'button';
      follow.textContent = extra.follow;
      follow.addEventListener('click', () => {
        if (/test drive/i.test(extra.follow)) { closeAsk(); openTestDrive(); }
        else if (/owner/i.test(extra.follow)) { closeAsk(); document.querySelector('#owners')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }); }
        else window.location.href = /TANK/i.test(extra.follow) ? 'vehicles.html?brand=TANK' : 'vehicles.html';
      });
      meta.append(follow);
      row.append(meta);
    }
    askLog.append(row);
    askLog.scrollTop = askLog.scrollHeight;
  };
  const askQuestion = question => {
    const text = question.trim();
    if (!text) return;
    askLog.querySelector('.ask-intro')?.remove();
    appendAskMessage('user', text);
    const thinking = document.createElement('div');
    thinking.className = 'ask-thinking';
    thinking.innerHTML = '<i></i><span>Ask GWM is thinking…</span>';
    askLog.append(thinking);
    askLog.scrollTop = askLog.scrollHeight;
    const selected = askAnswers.find(item => item.match.test(text)) || fallbackAnswer;
    window.setTimeout(() => {
      thinking.remove();
      appendAskMessage('assistant', selected.answer, selected);
    }, reducedMotion ? 0 : 650);
  };
  document.querySelectorAll('[data-ask-gwm]').forEach(button => button.addEventListener('click', openAsk));
  document.querySelectorAll('[data-ask-close]').forEach(button => button.addEventListener('click', closeAsk));
  document.querySelectorAll('[data-ask-suggestion]').forEach(button => button.addEventListener('click', () => askQuestion(button.textContent)));
  askForm.addEventListener('submit', event => { event.preventDefault(); askQuestion(askInput.value); askInput.value = ''; });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && askOverlay.classList.contains('is-open')) closeAsk();
  });

  function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 4200);
  }
  document.querySelectorAll('[data-placeholder-action]').forEach(button => button.addEventListener('click', () => showToast(button.dataset.placeholderAction)));
  document.querySelector('[data-language-toggle]').addEventListener('click', () => showToast('Arabic content is pending approved translation.'));
})();
