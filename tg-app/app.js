/* ================================================================
   app.js — логика MOMO Telegram Mini App
   ================================================================
   Что здесь происходит:
     1. Инициализация Telegram WebApp SDK (ready, expand, тема, swipe)
     2. Простой роутер экранов через hash в URL (#home, #kitchen и т.д.)
     3. Управление нативными элементами Telegram: BackButton, MainButton
     4. Рендер всех экранов из данных в data.js
     5. Bottom sheet для деталей блюда и полноэкранного фото
     6. Бронирование через WebApp.requestContact()
     7. HapticFeedback на каждом тапе
   ================================================================ */

(function () {
  'use strict';

  // ---------- Достаём данные и Telegram SDK ----------
  const M = window.MOMO;                              // см. data.js
  const tg = window.Telegram && window.Telegram.WebApp;
  const haptic = tg && tg.HapticFeedback;

  // Если запускаем не в Telegram (например, открыли HTML файлом)
  // — даём fallback на console.log вместо вызовов SDK.
  const isInsideTelegram = !!(tg && tg.initData !== undefined);

  // Стек экранов для корректной работы BackButton.
  // Текущий экран — последний в массиве.
  const screenStack = ['home'];

  // ============================================================
  // §1. ИНИЦИАЛИЗАЦИЯ Telegram WebApp
  // ============================================================
  function initTelegram() {
    if (!tg) return;

    tg.ready();
    tg.expand();                                // занять весь экран
    tg.disableVerticalSwipes && tg.disableVerticalSwipes();
    tg.setHeaderColor && tg.setHeaderColor('secondary_bg_color');

    // Применяем тему — фон/текст из themeParams
    applyTelegramTheme();

    // Подписка на смену темы (пользователь переключил light/dark)
    tg.onEvent('themeChanged', applyTelegramTheme);

    // Подписка на BackButton (системную кнопку в шапке Telegram)
    tg.onEvent('backButtonClicked', onBackButtonClicked);

    // Подписка на MainButton (нативная кнопка снизу)
    tg.onEvent('mainButtonClicked', onMainButtonClicked);
  }

  // Подставляет нужный вариант логотипа в зависимости от темы Telegram
  function updateLogoForTheme() {
    const logoEl = document.getElementById('hero-logo');
    if (!logoEl) return;
    const isDark = tg && tg.colorScheme === 'dark';
    logoEl.src = isDark ? M.HERO.logoDark : M.HERO.logo;
  }

  // Маппинг themeParams Telegram на наши CSS-переменные
  function applyTelegramTheme() {
    if (!tg) return;
    const p = tg.themeParams || {};
    const root = document.documentElement;

    // Если Telegram прислал цвета — используем их
    if (p.bg_color)              root.style.setProperty('--tg-bg', p.bg_color);
    if (p.secondary_bg_color)    root.style.setProperty('--tg-secondary', p.secondary_bg_color);
    if (p.text_color)            root.style.setProperty('--tg-text', p.text_color);
    if (p.hint_color)            root.style.setProperty('--tg-hint', p.hint_color);
    if (p.link_color)            root.style.setProperty('--tg-link', p.link_color);
    if (p.section_bg_color)      root.style.setProperty('--tg-section-bg', p.section_bg_color);
    if (p.section_separator_color) root.style.setProperty('--tg-section-separator', p.section_separator_color);

    // Переключение тёмной/светлой темы по colorScheme
    if (tg.colorScheme === 'dark') {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }

    // Логотип меняется по теме: на тёмной — белый, на светлой — чёрный
    updateLogoForTheme();

    // Высота viewport — Telegram может присылать через CSS-переменную
    if (tg.viewportStableHeight) {
      root.style.setProperty('--tg-viewport-height', tg.viewportStableHeight + 'px');
    }
  }

  // ============================================================
  // §2. РОУТЕР ЭКРАНОВ
  // ============================================================

  // Переход на экран. Если push=true — кладём в стек (BackButton вернёт).
  // Если push=false — сбрасываем стек (используется при возврате на Home).
  function go(screenId, push) {
    if (push !== false) push = true;

    const current = screenStack[screenStack.length - 1];
    if (current === screenId) return; // уже там

    if (push) screenStack.push(screenId);
    showScreen(screenId);
    syncBackButton();
    syncMainButton(screenId);
  }

  // Возврат назад. Снимаем верх стека, показываем то, что осталось.
  function back() {
    if (screenStack.length <= 1) {
      // Если уже на Home — закрываем Mini App
      if (tg && tg.close) tg.close();
      return;
    }
    screenStack.pop();
    const prev = screenStack[screenStack.length - 1];
    showScreen(prev);
    syncBackButton();
    syncMainButton(prev);
  }

  // Сброс стека и переход на Home
  function goHome() {
    screenStack.length = 0;
    screenStack.push('home');
    showScreen('home');
    syncBackButton();
    syncMainButton('home');
  }

  // Показать экран — переключаем .active классы
  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(el => {
      const isTarget = el.dataset.screen === screenId;
      el.classList.toggle('active', isTarget);
    });
    // прокручиваем новый экран наверх
    const target = document.querySelector('.screen.active .screen__body');
    if (target) target.scrollTop = 0;
  }

  // Синхронизируем BackButton с глубиной стека
  function syncBackButton() {
    if (!tg || !tg.BackButton) return;
    if (screenStack.length > 1) {
      tg.BackButton.show();
    } else {
      tg.BackButton.hide();
    }
  }

  function onBackButtonClicked() {
    hapticTap();
    back();
  }

  // ============================================================
  // §3. MAIN BUTTON (нативная кнопка Telegram внизу)
  // ============================================================
  // На каждом экране у MainButton свой текст и действие.
  // Действие сохраняем в замыкании.
  let mainButtonAction = null;

  function syncMainButton(screenId) {
    if (!tg || !tg.MainButton) return;
    const mb = tg.MainButton;

    switch (screenId) {
      case 'home':
      case 'kitchen':
      case 'category':
      case 'bar':
      case 'kids':
      case 'seasons':
      case 'gallery':
      case 'contacts':
        mb.setText('📞 Забронировать стол');
        mb.color = '#E07856';                  // coral
        mb.textColor = '#FFFFFF';
        mainButtonAction = () => go('book');
        mb.show();
        break;
      case 'book':
        mb.setText('📲 Поделиться номером');
        mb.color = '#E07856';
        mb.textColor = '#FFFFFF';
        mainButtonAction = requestContactAndBook;
        mb.show();
        break;
      case 'banket':
        mb.setText('📞 Позвонить администратору');
        mb.color = '#E07856';
        mb.textColor = '#FFFFFF';
        mainButtonAction = callPhone;
        mb.show();
        break;
      default:
        mb.hide();
        mainButtonAction = null;
    }
  }

  function onMainButtonClicked() {
    hapticTap();
    if (typeof mainButtonAction === 'function') mainButtonAction();
  }

  // ============================================================
  // §4. БРОНИРОВАНИЕ через requestContact
  // ============================================================
  function requestContactAndBook() {
    if (!tg || !tg.requestContact) {
      // Не в Telegram — просто звоним
      callPhone();
      return;
    }

    tg.requestContact((ok, result) => {
      if (ok) {
        // Тактильная похвала
        if (haptic) haptic.notificationOccurred('success');

        // В реальной интеграции: бот получает событие, перезванивает.
        // Здесь показываем подтверждение и закрываем Mini App,
        // чтобы пользователь вернулся в чат бота и увидел сообщение.
        if (tg.showPopup) {
          tg.showPopup(
            {
              title: 'Спасибо!',
              message: 'Администратор перезвонит в течение 15 минут.',
              buttons: [{ id: 'ok', type: 'ok', text: 'Хорошо' }]
            },
            () => {
              if (tg.close) tg.close();
            }
          );
        } else {
          tg.showAlert && tg.showAlert('Спасибо! Перезвоним в течение 15 минут.');
        }
      } else {
        if (haptic) haptic.notificationOccurred('error');
      }
    });
  }

  // Просто звонок
  function callPhone() {
    const tel = 'tel:' + M.RESTAURANT.phone;
    // Через openLink звонок не запустить; используем обычный navigation
    window.location.href = tel;
  }

  // ============================================================
  // §5. HAPTIC FEEDBACK — мелкий хелпер
  // ============================================================
  function hapticTap() {
    if (haptic) {
      try { haptic.impactOccurred('light'); } catch (_) {}
    }
  }

  function hapticSelect() {
    if (haptic) {
      try { haptic.selectionChanged(); } catch (_) {}
    }
  }

  // ============================================================
  // §6. РЕНДЕР HOME
  // ============================================================
  function renderHome() {
    const heroImg = document.getElementById('hero-img');
    heroImg.src = M.HERO.photo;
    heroImg.alt = M.HERO.alt;

    // Логотип — нужный вариант по теме (на старте может быть до initTelegram)
    updateLogoForTheme();

    // Подзаголовок под логотипом — короткий адрес + часы
    document.getElementById('hero-subtitle').textContent =
      M.RESTAURANT.addressShort + ' · ' + M.RESTAURANT.hoursShort.split(',')[0];

    document.getElementById('hero-social').innerHTML =
      '<span class="star">★ ' + M.RESTAURANT.rating + '</span>' +
      ' <span class="dot">·</span> ' + M.RESTAURANT.reviews + ' отзывов' +
      ' <span class="dot">·</span> с ' + M.RESTAURANT.sinceYear + ' года';

    // Сегменты «Сегодня я…»
    const wrap = document.getElementById('segments');
    wrap.innerHTML = '';
    M.SEGMENTS.forEach(seg => {
      const btn = document.createElement('button');
      btn.className = 'segment clickable';
      btn.innerHTML = `
        <div class="segment__icon">${seg.icon}</div>
        <div>
          <div class="segment__title">${seg.title}</div>
          <div class="segment__sub">${seg.subtitle}</div>
        </div>
      `;
      btn.addEventListener('click', () => {
        hapticTap();
        go(seg.target);
      });
      wrap.appendChild(btn);
    });

    // Полоска «Банкеты»
    document.getElementById('stripe-banket').addEventListener('click', () => {
      hapticTap();
      go('banket');
    });

    // Промо «Сезонное меню»
    document.getElementById('promo-img').src = M.SEASONS.dishes[0].photo;
    document.getElementById('promo-eyebrow').textContent = M.SEASONS.season;
    document.getElementById('promo-seasons').addEventListener('click', () => {
      hapticTap();
      go('seasons');
    });

    // Текстовая нижняя навигация
    document.querySelectorAll('[data-go]').forEach(el => {
      el.addEventListener('click', () => {
        hapticTap();
        go(el.dataset.go);
      });
    });
  }

  // ============================================================
  // §7. РЕНДЕР Кухня — список категорий
  // ============================================================
  function renderKitchen() {
    const list = document.getElementById('cat-list');
    list.innerHTML = '';
    M.KITCHEN_CATEGORIES.forEach(cat => {
      const count = (M.DISHES[cat.id] || []).length;
      const btn = document.createElement('button');
      btn.className = 'cat clickable';
      btn.innerHTML = `
        <div class="cat__emoji">${cat.emoji}</div>
        <div>
          <div class="cat__title">${cat.title}</div>
          <div class="cat__sub">${count} ${pluralDishes(count)}</div>
        </div>
        <div class="cat__chevron">›</div>
      `;
      btn.addEventListener('click', () => {
        hapticTap();
        renderCategory(cat.id, cat.title);
        go('category');
      });
      list.appendChild(btn);
    });
  }

  function pluralDishes(n) {
    const last = n % 10;
    const lastTwo = n % 100;
    if (lastTwo >= 11 && lastTwo <= 14) return 'блюд';
    if (last === 1) return 'блюдо';
    if (last >= 2 && last <= 4) return 'блюда';
    return 'блюд';
  }

  // ============================================================
  // §8. РЕНДЕР отдельной категории кухни
  // ============================================================
  function renderCategory(catId, catTitle) {
    document.getElementById('category-title').textContent = catTitle;
    const list = document.getElementById('dish-list');
    list.innerHTML = '';
    (M.DISHES[catId] || []).forEach(dish => {
      const card = document.createElement('button');
      card.className = 'dish clickable';
      card.innerHTML = `
        <img class="dish__img" src="${dish.photo}" alt="${escapeHtml(dish.name)}" loading="lazy">
        <div class="dish__body">
          <div class="dish__name">${escapeHtml(dish.name)}</div>
          <div class="dish__desc">${escapeHtml(dish.desc)}</div>
          <div class="dish__foot">
            <div class="dish__meta">
              <span class="dish__grams">${dish.grams}</span>
              <span class="dish__price">${dish.price} ₽</span>
            </div>
            <div class="dish__allergens">
              ${dish.allergens.map(a =>
                `<span class="allergen-chip" title="${M.ALLERGENS[a].label}">${M.ALLERGENS[a].icon}</span>`
              ).join('')}
            </div>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        hapticTap();
        openDishSheet(dish);
      });
      list.appendChild(card);
    });
  }

  // ============================================================
  // §9. РЕНДЕР Бара
  // ============================================================
  function renderBar() {
    // Коктейли
    const c = document.getElementById('bar-cocktails');
    c.innerHTML = '';
    M.COCKTAILS.forEach(item => {
      const row = document.createElement('div');
      row.className = 'bar-row';
      row.innerHTML = `
        <div>
          <div class="bar-row__name">${escapeHtml(item.name)}</div>
          <div class="bar-row__desc">${escapeHtml(item.desc)}</div>
        </div>
        <div>
          <div class="bar-row__price">${item.price} ₽</div>
          <div class="bar-row__volume">${item.volume}</div>
        </div>
      `;
      c.appendChild(row);
    });

    // Согревающие
    const w = document.getElementById('bar-warm');
    w.innerHTML = '';
    M.WARM_DRINKS.forEach(item => {
      const row = document.createElement('div');
      row.className = 'bar-row';
      row.innerHTML = `
        <div class="bar-row__name">${escapeHtml(item.name)}</div>
        <div class="bar-row__price">${item.price} ₽</div>
      `;
      w.appendChild(row);
    });
  }

  // ============================================================
  // §10. РЕНДЕР детского меню
  // ============================================================
  function renderKids() {
    const list = document.getElementById('kids-list');
    list.innerHTML = '';
    M.KIDS_MENU.forEach(item => {
      const row = document.createElement('div');
      row.className = 'kids-row';
      row.innerHTML = `
        <div class="kids-row__name">${escapeHtml(item.name)}</div>
        <div class="kids-row__grams">${item.grams}</div>
        <div class="kids-row__price">${item.price} ₽</div>
      `;
      list.appendChild(row);
    });

    const benefits = document.getElementById('kids-benefits-list');
    benefits.innerHTML = '';
    M.KIDS_BENEFITS.forEach(b => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="ic">${b.icon}</span><span>${escapeHtml(b.text)}</span>`;
      benefits.appendChild(li);
    });
  }

  // ============================================================
  // §11. РЕНДЕР Севастопольские сезоны
  // ============================================================
  function renderSeasons() {
    document.getElementById('seasons-badge').textContent = '🌿 ' + M.SEASONS.badge;
    document.getElementById('seasons-title').textContent = M.SEASONS.title;
    document.getElementById('seasons-season').textContent = M.SEASONS.season;
    document.getElementById('seasons-intro').textContent = M.SEASONS.intro;

    // Блюда
    const dWrap = document.getElementById('seasons-dishes');
    dWrap.innerHTML = '';
    M.SEASONS.dishes.forEach(dish => {
      const card = document.createElement('button');
      card.className = 'season-card clickable';
      card.innerHTML = `
        <img class="season-card__img" src="${dish.photo}" alt="${escapeHtml(dish.name)}" loading="lazy">
        <div class="season-card__body">
          <div class="season-card__name">${escapeHtml(dish.name)}</div>
          <div class="season-card__desc">${escapeHtml(dish.desc)}</div>
          <div class="season-card__foot">
            <span class="season-card__grams">${dish.grams}</span>
            <span class="season-card__price">${dish.price} ₽</span>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        hapticTap();
        openDishSheet({ ...dish, allergens: [] });
      });
      dWrap.appendChild(card);
    });

    // Коктейли — у всех общая фотка, как временный fix
    const cWrap = document.getElementById('seasons-cocktails');
    cWrap.innerHTML = '';
    M.SEASONS.cocktails.forEach(c => {
      const card = document.createElement('button');
      card.className = 'season-card clickable';
      card.innerHTML = `
        <img class="season-card__img" src="${M.SEASONS.cocktailsPhoto}" alt="${escapeHtml(c.name)}" loading="lazy">
        <div class="season-card__body">
          <div class="season-card__name">${escapeHtml(c.name)}</div>
          <div class="season-card__desc">${escapeHtml(c.desc)}</div>
          <div class="season-card__foot">
            <span class="season-card__grams">авторский</span>
            <span class="season-card__price">${c.price} ₽</span>
          </div>
        </div>
      `;
      cWrap.appendChild(card);
    });

    // Ссылка на фестиваль
    document.getElementById('seasons-link').addEventListener('click', () => {
      hapticTap();
      if (tg && tg.openLink) tg.openLink(M.SEASONS.festivalUrl);
      else window.open(M.SEASONS.festivalUrl, '_blank');
    });
  }

  // ============================================================
  // §12. РЕНДЕР галереи
  // ============================================================
  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';
    M.GALLERY.forEach((photo, idx) => {
      const item = document.createElement('button');
      item.className = 'gallery-grid__item clickable' + (photo.size === 'big' ? ' big' : '');
      item.innerHTML = `<img src="${photo.url}" alt="${escapeHtml(photo.alt)}" loading="lazy">`;
      item.addEventListener('click', () => {
        hapticTap();
        openPhoto(photo.url, photo.alt);
      });
      grid.appendChild(item);
    });
  }

  // ============================================================
  // §13. РЕНДЕР Бронирование
  // ============================================================
  function renderBook() {
    document.getElementById('book-share').addEventListener('click', () => {
      hapticTap();
      requestContactAndBook();
    });

    const call = document.getElementById('book-call');
    call.href = 'tel:' + M.RESTAURANT.phone;
    call.addEventListener('click', hapticTap);

    document.getElementById('book-chat').addEventListener('click', () => {
      hapticTap();
      if (tg && tg.openTelegramLink) tg.openTelegramLink(M.RESTAURANT.ADMIN_BANQUET);
      else window.open(M.RESTAURANT.ADMIN_BANQUET, '_blank');
    });

    document.getElementById('book-hours').textContent = M.RESTAURANT.hours + ' без выходных';
  }

  // ============================================================
  // §14. РЕНДЕР Банкетов
  // ============================================================
  function renderBanket() {
    document.getElementById('banket-title').textContent = M.BANQUET.title;
    document.getElementById('banket-intro').textContent = M.BANQUET.intro;
    document.getElementById('banket-cta-sub').textContent = M.BANQUET.ctaText;

    const ul = document.getElementById('banket-features');
    ul.innerHTML = '';
    M.BANQUET.features.forEach(f => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="ic">${f.icon}</span><span>${escapeHtml(f.text)}</span>`;
      ul.appendChild(li);
    });

    document.getElementById('banket-call').href = 'tel:' + M.RESTAURANT.phone;
    document.getElementById('banket-call').addEventListener('click', hapticTap);
  }

  // ============================================================
  // §15. РЕНДЕР Контактов
  // ============================================================
  function renderContacts() {
    document.getElementById('contact-address-value').textContent = M.RESTAURANT.address;
    document.getElementById('contact-hours-value').textContent =
      M.RESTAURANT.hours + ' · без выходных';

    const phone = document.getElementById('contact-phone');
    phone.href = 'tel:' + M.RESTAURANT.phone;
    document.getElementById('contact-phone-value').textContent = M.RESTAURANT.phoneDisplay;

    // Адрес → построить маршрут
    document.getElementById('contact-address').addEventListener('click', openRouteInMaps);
    document.getElementById('contact-route').addEventListener('click', openRouteInMaps);

    // Соцсети
    document.getElementById('social-vk').addEventListener('click', () => {
      hapticTap();
      if (tg && tg.openLink) tg.openLink(M.RESTAURANT.socials.vk);
      else window.open(M.RESTAURANT.socials.vk, '_blank');
    });
    document.getElementById('social-ig').addEventListener('click', () => {
      hapticTap();
      if (tg && tg.openLink) tg.openLink(M.RESTAURANT.socials.instagram);
      else window.open(M.RESTAURANT.socials.instagram, '_blank');
    });

    phone.addEventListener('click', hapticTap);
  }

  // Открыть маршрут в нативной карте (с детектом платформы)
  function openRouteInMaps() {
    hapticTap();
    const coords = '44.617133,33.522417';
    const addr = encodeURIComponent(M.RESTAURANT.address);
    let url;

    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) {
      // Apple Maps на iOS
      url = `maps://?daddr=${coords}&q=${addr}`;
    } else if (/Android/.test(ua)) {
      // geo: открывается в нативной карте Android
      url = `geo:${coords}?q=${coords}(МОМО)`;
    } else {
      url = `https://yandex.ru/maps/?ll=${coords}&z=16&pt=${coords},pm2rdm`;
    }

    if (tg && tg.openLink) tg.openLink(url);
    else window.location.href = url;
  }

  // ============================================================
  // §16. BOTTOM SHEET — карточка блюда
  // ============================================================
  const backdropEl = document.getElementById('sheet-backdrop');
  const sheetDishEl = document.getElementById('sheet-dish');

  function openDishSheet(dish) {
    document.getElementById('sheet-dish-img').src = dish.photo;
    document.getElementById('sheet-dish-img').alt = dish.name;
    document.getElementById('sheet-dish-name').textContent = dish.name;
    document.getElementById('sheet-dish-desc').textContent = dish.desc;
    document.getElementById('sheet-dish-grams').textContent = dish.grams || '';
    document.getElementById('sheet-dish-price').textContent = dish.price + ' ₽';

    const aWrap = document.getElementById('sheet-dish-allergens');
    aWrap.innerHTML = '';
    if (dish.allergens && dish.allergens.length) {
      const title = document.createElement('div');
      title.style.cssText = 'font-size: 12px; color: var(--tg-hint); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;';
      title.textContent = 'Аллергены';
      aWrap.appendChild(title);
      dish.allergens.forEach(a => {
        const row = document.createElement('div');
        row.className = 'a-row';
        row.innerHTML = `<span class="ic">${M.ALLERGENS[a].icon}</span><span>${M.ALLERGENS[a].label}</span>`;
        aWrap.appendChild(row);
      });
    }

    backdropEl.classList.add('open');
    sheetDishEl.classList.add('open');
  }

  function closeDishSheet() {
    backdropEl.classList.remove('open');
    sheetDishEl.classList.remove('open');
  }

  backdropEl.addEventListener('click', closeDishSheet);

  // Свайп вниз по handle закрывает sheet
  let touchStartY = 0;
  sheetDishEl.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  sheetDishEl.addEventListener('touchend', (e) => {
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (dy > 80) closeDishSheet();
  }, { passive: true });

  // ============================================================
  // §17. ПОЛНОЭКРАННОЕ ФОТО (галерея)
  // ============================================================
  const photoSheet = document.getElementById('sheet-photo');
  const photoImg = document.getElementById('sheet-photo-img');

  function openPhoto(src, alt) {
    photoImg.src = src;
    photoImg.alt = alt || '';
    photoSheet.classList.add('open');
  }
  function closePhoto() {
    photoSheet.classList.remove('open');
  }
  document.getElementById('sheet-photo-close').addEventListener('click', closePhoto);
  photoSheet.addEventListener('click', (e) => {
    if (e.target === photoSheet) closePhoto();
  });

  // ============================================================
  // §18. БЕЗОПАСНОЕ ВСТАВЛЕНИЕ ТЕКСТА
  // ============================================================
  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ============================================================
  // §19. ЗАПУСК
  // ============================================================
  function init() {
    initTelegram();

    // Рендерим все экраны один раз — потом просто переключаем
    renderHome();
    renderKitchen();
    renderBar();
    renderKids();
    renderSeasons();
    renderGallery();
    renderBook();
    renderBanket();
    renderContacts();

    // Считываем deep-link параметр (?startapp=banquet, ?startapp=date)
    const startParam = tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param;
    if (startParam === 'banket' || startParam === 'banquet') {
      goHome();
      go('banket');
    } else if (startParam === 'menu' || startParam === 'kitchen') {
      goHome();
      go('kitchen');
    } else if (startParam === 'seasons' || startParam === 'season') {
      goHome();
      go('seasons');
    } else if (startParam === 'book' || startParam === 'booking') {
      goHome();
      go('book');
    } else {
      // По умолчанию открываем Home
      showScreen('home');
      syncBackButton();
      syncMainButton('home');
    }

    // Логгируем в консоль для отладки
    if (!isInsideTelegram) {
      console.log('[MOMO TMA] Запущено вне Telegram. SDK-фичи работают как заглушки.');
    }
  }

  // Стартуем после готовности DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
