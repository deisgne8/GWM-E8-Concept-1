(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('market') !== 'sa') return;

  document.documentElement.lang = 'ar';
  document.documentElement.dir = 'rtl';
  document.body.classList.add('market-saudi');

  const translations = new Map(Object.entries({
    'Skip to main content': 'انتقل إلى المحتوى الرئيسي',
    'Skip to content': 'انتقل إلى المحتوى',
    'Vehicles': 'السيارات',
    'Owners': 'الملاك',
    'Powertrains': 'أنظمة الدفع',
    'Technology': 'التقنية',
    'Newsroom': 'الأخبار',
    'Book a test drive': 'احجز تجربة قيادة',
    'Test drive': 'تجربة قيادة',
    'Ask GWM': 'اسأل جي دبليو إم',
    '✦ Ask GWM': '✦ اسأل جي دبليو إم',
    'GWM Middle East home': 'الصفحة الرئيسية لجي دبليو إم السعودية',
    'Filter vehicles': 'تصفية السيارات',
    'Explore GWM brands': 'استكشف علامات جي دبليو إم',
    'Explore GWM HAVAL': 'استكشف هافال',
    'Explore GWM TANK': 'استكشف جي دبليو إم تانك',
    'Explore GWM POER': 'استكشف باور',
    'Explore GWM ORA': 'استكشف أورا',
    'Explore GWM WINGLE': 'استكشف وينجل',
    'Vehicle range': 'مجموعة السيارات',
    'Find your GWM.': 'اعثر على سيارة جي دبليو إم المناسبة لك.',
    'Explore model families and powertrains. Regional specifications and availability remain subject to confirmation.': 'استكشف عائلات الطرازات وأنظمة الدفع. تخضع المواصفات والتوافر في المملكة للتأكيد من الوكيل المعتمد.',
    'Family': 'العلامة',
    'Powertrain': 'نظام الدفع',
    'All': 'الكل',
    'Diesel': 'ديزل',
    'models shown': 'طرازاً معروضاً',
    'Explore model →': 'استكشف الطراز ←',
    'Off-road SUV · ICE': 'سيارة دفع رباعي للطرق الوعرة · محرك احتراق داخلي',
    'SUV · HEV': 'سيارة دفع رباعي · هجينة',
    'SUV · HEV / ICE': 'سيارة دفع رباعي · هجينة / محرك احتراق داخلي',
    'Off-road SUV · HEV / ICE': 'سيارة دفع رباعي للطرق الوعرة · هجينة / محرك احتراق داخلي',
    'Off-road SUV': 'سيارة دفع رباعي للطرق الوعرة',
    'Premium SUV · HEV': 'سيارة دفع رباعي فاخرة · هجينة',
    'Flagship SUV · PHEV': 'سيارة دفع رباعي رائدة · هجينة قابلة للشحن',
    'Pickup · Diesel': 'بيك أب · ديزل',
    'Pickup · PHEV': 'بيك أب · هجينة قابلة للشحن',
    'Pickup': 'بيك أب',
    'Return to homepage': 'العودة إلى الصفحة الرئيسية',
    'Next step': 'الخطوة التالية',
    'This local prototype validates your enquiry without transmitting personal data.': 'يتحقق هذا النموذج المحلي من طلبك من دون إرسال بياناتك الشخصية.',
    'Preferred model': 'الطراز المفضل',
    'Choose a model': 'اختر طرازاً',
    'Full name': 'الاسم الكامل',
    'Email': 'البريد الإلكتروني',
    'Mobile': 'رقم الجوال',
    'I agree to be contacted about this request.': 'أوافق على التواصل معي بخصوص هذا الطلب.',
    'Submit request': 'إرسال الطلب',
    'Request received': 'تم استلام الطلب',
    'Local reference GWM-ME-4102. No data was transmitted.': 'المرجع المحلي GWM-ME-4102. لم يتم إرسال أي بيانات.',
    'Ask about vehicles, powertrains, ownership or booking a test drive.': 'اسأل عن السيارات أو أنظمة الدفع أو خدمات الملاك أو حجز تجربة قيادة.',
    'Suggested': 'مقترحات',
    'Which GWM models are hybrids?': 'ما طرازات جي دبليو إم الهجينة؟',
    'Is the TANK 300 suited to desert driving?': 'هل تناسب TANK 300 القيادة الصحراوية؟',
    'How do I book a test drive?': 'كيف أحجز تجربة قيادة؟',
    'Send': 'إرسال',
    'Choose your market': 'اختر سوقك',
    'Select a country to view its local GWM experience.': 'اختر الدولة لعرض تجربة جي دبليو إم المحلية.',
    'United Arab Emirates': 'الإمارات العربية المتحدة',
    'Saudi Arabia': 'المملكة العربية السعودية',
    'Kuwait': 'الكويت',
    'Qatar': 'قطر',
    'Explore GWM Middle East': 'استكشف جي دبليو إم في الشرق الأوسط',
    'Explore': 'استكشف',
    'Overview': 'نظرة عامة',
    'Design': 'التصميم',
    'Cabin': 'المقصورة',
    'Interior': 'المقصورة الداخلية',
    'Safety': 'السلامة',
    'Specifications': 'المواصفات',
    'Middle East': 'الشرق الأوسط',
    'Regional network': 'شبكة الوكلاء',
    'About GWM': 'عن جي دبليو إم',
    'Born for Off-Roading': 'وُلدت للطرق الوعرة',
    'Discover H9': 'اكتشف H9',
    'Scroll to discover': 'مرّر للاكتشاف',
    'GWM HAVAL H9 design story': 'قصة تصميم جي دبليو إم هافال H9',
    'A studio film rotating around the GWM HAVAL H9 as its doors and rear access open to reveal the cabin.': 'فيلم استوديو يدور حول جي دبليو إم هافال H9 بينما تُفتح الأبواب والجزء الخلفي لتظهر المقصورة.',
    'H9 design film ready': 'فيلم تصميم H9 جاهز',
    'Preparing the H9 design film': 'جارٍ تجهيز فيلم تصميم H9',
    '01 / Presence': '01 / الحضور',
    'An unmistakable arrival.': 'حضور لا يُخطئه أحد.',
    'Upright proportions and a commanding stance give the H9 presence from the very first glance.': 'تمنح النسب الواثقة والوقفة المهيبة H9 حضوراً لافتاً من النظرة الأولى.',
    '02 / Design': '02 / التصميم',
    'Strength in every line.': 'قوة في كل خط.',
    'A long, confident silhouette brings clarity and purpose to every angle.': 'يمنح التصميم الممتد والواثق كل زاوية وضوحاً وهدفاً.',
    '03 / Access': '03 / سهولة الوصول',
    'Open to every journey.': 'جاهزة لكل رحلة.',
    'Wide-opening doors and generous rear access make every arrival feel effortless.': 'تجعل الأبواب واسعة الفتح والوصول الرحب من الخلف كل وصول أكثر سهولة.',
    '04 / Versatility': '04 / المرونة',
    'Space that adapts.': 'مساحة تتكيف معك.',
    'Space that adapts': 'مساحة تتكيف معك',
    'An accommodating cabin transitions naturally between passengers, luggage, and the journeys ahead.': 'تتكيف المقصورة الرحبة بسلاسة مع الركاب والأمتعة والرحلات القادمة.',
    'Designed around real life.': 'مصممة لحياتك اليومية.',
    'Explore the GWM HAVAL H9': 'استكشف جي دبليو إم هافال H9',
    'Scroll to reveal': 'مرّر للكشف',
    'Design story': 'قصة التصميم',
    'Presence without compromise.': 'حضور بلا تنازلات.',
    'H9 gallery': 'معرض H9',
    'Every angle considered.': 'كل زاوية مدروسة.',
    'Explore the purposeful form and adaptable character of the GWM HAVAL H9.': 'استكشف التصميم الواثق والطابع المتكيف لجي دبليو إم هافال H9.',
    'Explore the GWM HAVAL H9 cabin': 'استكشف مقصورة جي دبليو إم هافال H9',
    'Show cabin detail': 'إظهار تفاصيل المقصورة',
    'Made for the journey.': 'مصممة للرحلة.',
    'An expansive cabin shaped around passenger comfort and everyday versatility.': 'مقصورة رحبة صُممت لراحة الركاب والمرونة اليومية.',
    'Front cabin': 'المقصورة الأمامية',
    'A space shaped around every journey.': 'مساحة صُممت لكل رحلة.',
    'The H9 cabin brings its displays, controls and adaptable space together in one considered environment. Equipment and availability vary by grade and market.': 'تجمع مقصورة H9 الشاشات وأدوات التحكم والمساحة المرنة ضمن بيئة متكاملة. تختلف التجهيزات والتوافر حسب الفئة والسوق.',
    'Information in view': 'المعلومات أمامك',
    'A focused dashboard layout keeps driving information and central controls clearly presented.': 'يعرض تصميم لوحة القيادة معلومات القيادة وأدوات التحكم المركزية بوضوح.',
    'Controls within reach': 'تحكم في متناول اليد',
    'The centre console brings essential cabin functions together in a purposeful, driver-oriented arrangement.': 'تجمع وحدة التحكم الوسطية وظائف المقصورة الأساسية بترتيب عملي موجّه للسائق.',
    'An accommodating interior supports changing combinations of passengers, luggage and everyday journeys.': 'تدعم المقصورة الرحبة ترتيبات متنوعة للركاب والأمتعة والاستخدام اليومي.',
    'Review regional specifications': 'راجع المواصفات المحلية',
    'Interior experience': 'تجربة المقصورة',
    'Designed around the journey.': 'مصممة حول الرحلة.',
    'Dedicated approved interior photography is not yet available. Explore the supplied H9 film and studio views without substituting fabricated imagery.': 'صور المقصورة المعتمدة غير متاحة حالياً. استكشف فيلم H9 وصور الاستوديو المقدمة من دون استخدام صور غير معتمدة.',
    'Film': 'فيلم',
    'On location': 'في الموقع',
    'Studio': 'الاستوديو',
    'Confidence begins with clarity.': 'الثقة تبدأ بالوضوح.',
    'Safety and driver-assistance equipment varies by grade and market. Confirm the approved local vehicle configuration.': 'تختلف تجهيزات السلامة ومساعدة السائق حسب الفئة والسوق. يُرجى تأكيد مواصفات السيارة المحلية المعتمدة.',
    'Structural protection': 'الحماية الهيكلية',
    'Exact body and restraint specifications are subject to approved regional data.': 'تخضع مواصفات الهيكل وأنظمة التثبيت للبيانات المحلية المعتمدة.',
    'Driver assistance': 'مساعدة السائق',
    'Feature availability differs by model grade and local specification.': 'يختلف توفر المزايا حسب فئة الطراز والمواصفات المحلية.',
    'Everyday visibility': 'رؤية أوضح كل يوم',
    'Camera, sensing and lighting equipment must be confirmed locally.': 'يجب تأكيد تجهيزات الكاميرات والاستشعار والإضاءة محلياً.',
    'Only currently approved model data is shown. Expand each group to scan available information.': 'تُعرض بيانات الطراز المعتمدة حالياً فقط. افتح كل مجموعة للاطلاع على المعلومات المتاحة.',
    'Model overview': 'نظرة عامة على الطراز',
    'Body style': 'نوع الهيكل',
    'Market availability': 'التوافر في السوق',
    'Confirm locally': 'يُرجى التأكيد محلياً',
    'Performance': 'الأداء',
    'Engine / motor': 'المحرك',
    'Details on request': 'التفاصيل عند الطلب',
    'Transmission': 'ناقل الحركة',
    'Drive system': 'نظام الدفع',
    'Dimensions and capacity': 'الأبعاد والسعة',
    'Dimensions': 'الأبعاد',
    'Seating': 'المقاعد',
    'Warranty': 'الضمان',
    'Make the H9 yours.': 'اجعل H9 سيارتك.',
    'Request a quote': 'اطلب عرض سعر',
    'Download brochure': 'تنزيل الكتيب',
    'Find a dealer': 'ابحث عن وكيل',
    'Go with more': 'انطلق إلى المزيد',
    'Back to homepage': 'العودة إلى الصفحة الرئيسية',
    'Model': 'الطراز',
    'Book a service': 'احجز موعد صيانة',
    'GWM CARE': 'عناية جي دبليو إم',
    'Company': 'الشركة',
    'Contact': 'اتصل بنا',
    'This concept form is not connected to a booking service. Your details will not be submitted.': 'هذا النموذج التجريبي غير متصل بخدمة الحجز، ولن يتم إرسال بياناتك.',
    'Your name': 'اسمك',
    'Close prototype form': 'إغلاق النموذج التجريبي',
    'Ask GWM about': 'اسأل جي دبليو إم عن',
    'this model': 'هذا الطراز',
    'Ask about this vehicle, its powertrain, ownership support or arranging a test drive.': 'اسأل عن هذه السيارة أو نظام الدفع أو خدمات الملاك أو ترتيب تجربة قيادة.',
    'What powertrain is available?': 'ما نظام الدفع المتاح؟',
    'Where can I find local availability?': 'أين أجد معلومات التوافر محلياً؟',
    'Copyright 2026.': 'حقوق النشر 2026.'
  }));

  const translateText = value => {
    const trimmed = value.trim();
    if (!trimmed) return value;
    if (/^\d+ models shown$/.test(trimmed)) return value.replace('models shown', 'طرازاً معروضاً');
    return translations.get(trimmed) || value;
  };

  const localize = root => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement?.closest('script,style')) return;
      const translated = translateText(node.nodeValue);
      if (translated !== node.nodeValue) node.nodeValue = translated;
    });
    root.querySelectorAll('[aria-label],[placeholder],[data-placeholder-action]').forEach(element => {
      ['aria-label', 'placeholder', 'data-placeholder-action'].forEach(attribute => {
        const value = element.getAttribute(attribute);
        if (value && translations.has(value)) element.setAttribute(attribute, translations.get(value));
      });
    });
    root.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.getAttribute('href'), window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname.endsWith('/index.html')) url.pathname = url.pathname.replace('/index.html', '/saudi-arabia.html');
      if (url.pathname.endsWith('/vehicles.html') || url.pathname.endsWith('/product.html')) url.searchParams.set('market', 'sa');
      link.setAttribute('href', `${url.pathname.split('/').pop()}${url.search}${url.hash}`);
    });
  };

  const apply = () => {
    localize(document.body);
    const modelCopy = {
      h9: ['وُلدت للطرق الوعرة', 'سيارة دفع رباعي للطرق الوعرة', 'محرك احتراق داخلي · ديزل'],
      h7: ['تصميم جريء', 'سيارة دفع رباعي', 'هجينة'],
      h6: ['تقنية متقدمة لجيل جديد', 'سيارة دفع رباعي', 'هجينة · محرك احتراق داخلي'],
      'jolion-max': ['المزيد في كل تفاصيلها', 'سيارة دفع رباعي', 'هجينة'],
      'tank-300': ['جرأة وأناقة', 'سيارة دفع رباعي للطرق الوعرة', 'هجينة · محرك احتراق داخلي'],
      'tank-400': ['اكتشف TANK 400', 'سيارة دفع رباعي للطرق الوعرة', 'التفاصيل عند الطلب'],
      'tank-500': ['قدرات على الطرق الوعرة عند الطلب', 'سيارة دفع رباعي فاخرة', 'هجينة'],
      'tank-700': ['فخامة رائدة للطرق الوعرة', 'سيارة دفع رباعي للطرق الوعرة', 'هجينة قابلة للشحن'],
      'wingle-5': ['قوة عملية بلا تعقيد', 'بيك أب', 'ديزل'],
      'wingle-7': ['عمل بلا تنازلات', 'بيك أب', 'ديزل'],
      'poer-hi4-t': ['اكتشف Hi4-T', 'بيك أب', 'Hi4-T'],
      'cannon-phev': ['اكتشف Cannon PHEV', 'بيك أب', 'هجينة قابلة للشحن'],
      'king-kong-cannon': ['اكتشف King Kong Cannon', 'بيك أب', 'التفاصيل عند الطلب'],
      artillery: ['اكتشف Artillery', 'بيك أب', 'التفاصيل عند الطلب']
    };
    const model = modelCopy[params.get('model')];
    if (model) {
      document.querySelectorAll('[data-model-slogan]').forEach(element => { element.textContent = model[0]; });
      document.querySelectorAll('[data-model-category],[data-model-body]').forEach(element => { element.textContent = model[1]; });
      document.querySelectorAll('[data-model-powertrain]').forEach(element => { element.textContent = model[2]; });
      const fullName = document.querySelector('[data-model-full-name]')?.textContent || '';
      document.querySelectorAll('[data-model-description]').forEach(element => {
        element.textContent = `اكتشف ${fullName} في المملكة العربية السعودية. ستُضاف معلومات المنتج المحلية المعتمدة عند توفرها.`;
      });
    }
    const languageButton = document.querySelector('.language-button');
    if (languageButton) languageButton.textContent = 'English';
    document.title = document.body.classList.contains('range-page')
      ? 'مجموعة السيارات | جي دبليو إم السعودية'
      : document.title.replace('GWM Middle East', 'جي دبليو إم السعودية').replace('Middle East', 'السعودية');
  };

  window.GWMSaudi = { isSaudi: true, translateText, localize };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
