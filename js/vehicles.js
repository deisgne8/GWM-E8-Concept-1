(() => {
  const isSaudi = new URLSearchParams(location.search).get('market') === 'sa';
  const cards = [...document.querySelectorAll('[data-range-card]')];
  const brandButtons = [...document.querySelectorAll('[data-filter-brand]')];
  const powerButtons = [...document.querySelectorAll('[data-filter-power]')];
  const count = document.querySelector('[data-range-count]');
  let brand = new URLSearchParams(location.search).get('brand') || 'ALL';
  let power = 'ALL';
  const update = () => {
    let visible = 0;
    cards.forEach(card => { const show = (brand === 'ALL' || card.dataset.brand === brand) && (power === 'ALL' || card.dataset.power.split(' ').includes(power)); card.hidden = !show; if (show) visible++; });
    count.textContent = visible;
    brandButtons.forEach(button => button.classList.toggle('is-active', button.dataset.filterBrand === brand));
    powerButtons.forEach(button => button.classList.toggle('is-active', button.dataset.filterPower === power));
  };
  brandButtons.forEach(button => button.addEventListener('click', () => { brand = button.dataset.filterBrand; update(); }));
  powerButtons.forEach(button => button.addEventListener('click', () => { power = button.dataset.filterPower; update(); }));
  update();

  const drawer = document.querySelector('[data-test-drive-dialog]');
  const openDrawer = () => { if (!drawer.open) drawer.showModal(); document.body.classList.add('drawer-open'); };
  const closeDrawer = () => { drawer.close(); document.body.classList.remove('drawer-open'); };
  document.querySelectorAll('[data-test-drive]').forEach(button => button.addEventListener('click', openDrawer));
  document.querySelectorAll('[data-test-drive-close]').forEach(button => button.addEventListener('click', closeDrawer));
  drawer.addEventListener('click', event => { if (event.target === drawer) closeDrawer(); });
  const driveForm = drawer.querySelector('[data-test-drive-form]');
  driveForm.addEventListener('submit', event => { event.preventDefault(); if (!driveForm.reportValidity()) return; driveForm.querySelector('[data-test-drive-success]').hidden = false; driveForm.querySelector('button[type="submit"]').disabled = true; });

  const overlay = document.querySelector('[data-ask-overlay]');
  const askForm = document.querySelector('[data-ask-form]');
  const askInput = askForm.elements.question;
  const log = document.querySelector('[data-ask-log]');
  const answers = isSaudi ? [
    [/hybrid|hev|phev|electric|bev|هجين|هجينة|كهرب/i,'تتوفر طرازات مختارة من هافال وتانك وباور بأنظمة دفع هجينة أو هجينة قابلة للشحن. استخدم عوامل التصفية أعلاه لاستكشافها.','مجموعة سيارات جي دبليو إم السعودية'],
    [/tank\s*300|desert|off.?road|تانك|صحراء|صحرا/i,'تُعرض TANK 300 كسيارة دفع رباعي للطرق الوعرة. تأكد من المواصفات المحلية وظروف المسار قبل القيادة الصحراوية.','مجموعة جي دبليو إم تانك'],
    [/test drive|book|تجربة|حجز/i,'اختر «احجز تجربة قيادة»، ثم حدد الطراز وأدخل البيانات المطلوبة. يتحقق هذا النموذج التجريبي من الخطوات محلياً من دون إرسال البيانات.','رحلة حجز تجربة القيادة']
  ] : [
    [/hybrid|hev|phev|electric|bev/i,'Selected HAVAL, TANK and POER models are presented with HEV or PHEV powertrains. Use the filters above to explore them.','Vehicle range'],
    [/tank\s*300|desert|off.?road/i,'The TANK 300 is presented as an off-road SUV. Confirm the market specification and assess route conditions before desert driving.','GWM TANK range'],
    [/test drive|book/i,'Select “Book a test drive”, choose your model and enter the required details. This concept validates the journey locally without sending data.','Test-drive journey']
  ];
  const openAsk = () => { overlay.classList.add('is-open'); overlay.setAttribute('aria-hidden','false'); document.body.classList.add('ask-open'); setTimeout(() => askInput.focus(),80); };
  const closeAsk = () => { overlay.classList.remove('is-open'); overlay.setAttribute('aria-hidden','true'); document.body.classList.remove('ask-open'); };
  const ask = question => { const text=question.trim(); if(!text)return; log.querySelector('.ask-intro')?.remove(); const user=document.createElement('div'); user.className='ask-message ask-message--user'; user.innerHTML='<p></p>'; user.querySelector('p').textContent=text; log.append(user); const fallback=isSaudi?[null,'يمكنني مساعدتك في السيارات وأنظمة الدفع وخطوات حجز تجربة القيادة محلياً. اذكر اسم الطراز أو نظام الدفع.','مفهوم جي دبليو إم السعودية']:[null,'I can help with vehicles, powertrains and the local test-drive journey. Try naming a model family or powertrain.','GWM Middle East concept']; const selected=answers.find(([match])=>match.test(text))||fallback; setTimeout(()=>{ const reply=document.createElement('div'); reply.className='ask-message ask-message--assistant'; const p=document.createElement('p'); p.textContent=selected[1]; const meta=document.createElement('div'); meta.className='ask-message__meta'; meta.innerHTML=`<span>${isSaudi?'المصدر':'Source'}</span><strong></strong>`; meta.querySelector('strong').textContent=selected[2]; reply.append(p,meta); log.append(reply); log.scrollTop=log.scrollHeight; },500); };
  document.querySelectorAll('[data-ask-gwm]').forEach(button=>button.addEventListener('click',openAsk));
  document.querySelectorAll('[data-ask-close]').forEach(button=>button.addEventListener('click',closeAsk));
  document.querySelectorAll('[data-ask-suggestion]').forEach(button=>button.addEventListener('click',()=>ask(button.textContent)));
  askForm.addEventListener('submit',event=>{event.preventDefault();ask(askInput.value);askInput.value='';});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(overlay.classList.contains('is-open'))closeAsk();else if(drawer.open)closeDrawer();}});
})();
