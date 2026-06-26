# CLAUDE.md — навигация по проекту `tg-app/`

Это **Telegram Mini App** ресторана МОМО. Открывается из бота (`@momo_sev_bot`, заглушка) и работает как нативное приложение поверх Telegram. Контент и структура — из родительского [brief.md ЧАСТЬ II](../brief.md) и [research.md «TMA-исследование»](../research.md).

## Что где лежит

| Файл | За что отвечает | Когда сюда лезть |
|---|---|---|
| **index.html** | Каркас всех 9 экранов + 2 bottom sheet. Только статичная разметка, без JS-логики. | Добавить новый экран, поменять структуру блока, переставить компоненты местами. |
| **styles.css** | Все стили: дизайн-токены (CSS-переменные), тема light/dark, layout, переходы, кнопки, обратная связь касания. 17 пронумерованных секций, см. шапку файла. | Поменять цвета, отступы, скругления, шрифты. Добавить анимацию. Адаптация под мелкие экраны. |
| **data.js** | **Весь контент**: меню (8 категорий + блюда), бар, детское, сезоны, фото галереи, контакты, реквизиты, BOT_USERNAME. Никакой логики. | Поменять цену блюда, добавить новый коктейль, обновить адрес, заменить фото. **Этот файл правится чаще всего.** |
| **app.js** | Логика: Telegram SDK (init/theme/swipes), роутер экранов, BackButton/MainButton, рендер каждого экрана из data.js, bottom sheet, `requestContact` для брони, haptic feedback. 19 пронумерованных секций. | Поменять поведение кнопки, добавить новую интеракцию, ловить event Telegram, переписать роутер. |
| **CLAUDE.md** | Этот файл — карта проекта для будущих агентов. | Когда добавили новый файл / экран / интеграцию — допишите сюда. |

## Архитектура одной страницей

```
┌─────────────────────────────────────────────────────────┐
│ index.html                                              │
│   <Telegram WebApp SDK> → window.Telegram.WebApp        │
│   <script src="data.js">  → window.MOMO (все данные)    │
│   <script src="app.js">   → init + render + router      │
└─────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│  app.js на старте:                                      │
│  1. initTelegram()       — ready/expand/theme/swipes    │
│  2. renderHome/Kitchen/Bar/Kids/Seasons/Gallery/...     │
│     (все экраны рендерятся ОДИН РАЗ из data.js)         │
│  3. По умолчанию показывает Home                        │
│  4. Если есть ?startapp=... — открывает нужный экран    │
└─────────────────────────────────────────────────────────┘
```

## Навигация между экранами

Все экраны лежат в DOM одновременно. Видимый — только тот, у кого класс `.active`. Переключает их функция `go(screenId)` в `app.js`.

```
HOME (#home)
 ├─→ Кухня (#kitchen)
 │    └─→ Категория (#category) [динамически: appetizers/salads/.../desserts]
 │         └─→ bottom sheet «Карточка блюда»
 ├─→ Бар (#bar)
 ├─→ Детское меню (#kids)
 ├─→ Сезонное меню (#seasons)
 │    └─→ bottom sheet «Карточка блюда»
 ├─→ Галерея (#gallery)
 │    └─→ полноэкранное фото
 ├─→ Бронирование (#book)  ← главный CTA, MainButton
 ├─→ Банкеты (#banket)
 └─→ Контакты (#contacts)
```

**BackButton Telegram** работает автоматически: app.js хранит стек экранов, при нажатии возвращает на предыдущий. На Home — закрывает Mini App.

**MainButton Telegram** меняет текст по экрану:
- На большинстве экранов: «📞 Забронировать стол» → ведёт на Book
- На Book: «📲 Поделиться номером» → вызывает `WebApp.requestContact()`
- На Банкетах: «📞 Позвонить администратору» → `tel:`

## Где что менять

### Поменять цену блюда / добавить новое блюдо
→ `data.js` → объект `DISHES`, нужная категория

### Добавить новую категорию кухни
→ `data.js` → `KITCHEN_CATEGORIES` (добавить запись) + `DISHES` (добавить ключ с массивом блюд)

### Поменять Hero-фото
→ `data.js` → `HERO.photo`

### Сменить цвет акцента бренда
→ `styles.css` → `:root` → `--momo-coral` (и `--momo-coral-d` для тёмного варианта)

### Переключить рестораны / адрес / телефон
→ `data.js` → `RESTAURANT` (название, address, phone, hours)

### Активировать настоящего бота
→ `data.js` → `RESTAURANT.BOT_USERNAME` — поменять с `@momo_sev_bot` на свой
→ После регистрации бота через @BotFather через `/setmenubutton` указать URL вашего деплоя

### Поменять текст MainButton на экране
→ `app.js` → функция `syncMainButton(screenId)` — добавить/изменить case

### Добавить новый экран
1. `index.html` — добавить `<section class="screen" data-screen="myNew">...</section>`
2. `app.js` — функция `renderMyNew()` + вызов в `init()`
3. `app.js` — `syncMainButton` — что показывать на этом экране
4. Откуда-то на него навигировать: `go('myNew')` в обработчике

## Telegram WebApp API — что используем

| Метод | Где | Зачем |
|---|---|---|
| `WebApp.ready()` | app.js `initTelegram()` | сообщить Telegram, что app загрузилось |
| `WebApp.expand()` | app.js `initTelegram()` | развернуть на весь экран |
| `WebApp.disableVerticalSwipes()` | app.js `initTelegram()` | защита от случайного закрытия |
| `WebApp.themeParams` + `themeChanged` | app.js `applyTelegramTheme()` | подхват цветов и темы пользователя |
| `WebApp.BackButton.show/hide` | app.js `syncBackButton()` | управление BackButton |
| `WebApp.MainButton.setText/show/hide` | app.js `syncMainButton()` | управление MainButton |
| `WebApp.requestContact(cb)` | app.js `requestContactAndBook()` | главная фишка — бронь без формы |
| `WebApp.HapticFeedback` | везде через `hapticTap()` / `hapticSelect()` | тактильный отклик на тапы |
| `WebApp.openLink(url)` | app.js (соцсети, карта) | открыть внешнюю ссылку |
| `WebApp.openTelegramLink(url)` | app.js (чат с админом) | открыть `t.me/...` |
| `WebApp.showPopup` | app.js (после брони) | нативное подтверждение |
| `WebApp.close()` | app.js (после успешной брони) | вернуть пользователя в чат бота |
| `WebApp.initDataUnsafe.start_param` | app.js `init()` | deep-link для прямого перехода на экран |

## Запуск локально

Telegram открывает только HTTPS-URL. Для теста локально нужен туннель:

```bash
# Установить cloudflared (один раз)
brew install cloudflared

# Запустить статический сервер в этой папке
cd tg-app
python3 -m http.server 8000

# В другом окне — туннель
cloudflared tunnel --url http://localhost:8000
# Получите https://xxx.trycloudflare.com — это URL для @BotFather
```

В @BotFather: `/newapp` → выбрать бота → ввести этот HTTPS-URL.
Открыть бота в Telegram → меню → откроется TMA.

Для проверки без Telegram — просто откройте `index.html` через статический сервер (см. выше). Будет работать, но без SDK-фич (BackButton/MainButton/HapticFeedback). В консоли увидите сообщение `[MOMO TMA] Запущено вне Telegram. SDK-фичи работают как заглушки.`

## Деплой

Vercel — простейший вариант. В корне есть `vercel.json` с настройками (если понадобится — можно создать).

```bash
# В корне репозитория
cd tg-app
vercel
# Указать project name: momo-tma
# Опубликовать в production: vercel --prod
```

Получите URL вида `https://momo-tma.vercel.app` — это и есть TMA-URL для @BotFather.

## Что НЕ в первой версии

Полный список — в `../brief.md` (Часть II, раздел TMA-6). Кратко:

- ❌ Корзина / онлайн-заказ еды / доставка
- ❌ Bot Payments (оплата сертификатов, депозиты) — V3
- ❌ Карта лояльности (CloudStorage штампы) — V2
- ❌ Push о смене сезонного меню — V2
- ❌ shareToStory на блюдах — V2
- ❌ addToHomeScreen — V2
- ❌ Календарь брони с выбором даты/времени — V2 (на MVP — `requestContact` + перезвон)
- ❌ FAQ как отдельный экран — V2
- ❌ Поиск по меню / фильтры — V2 (когда позиций станет много)
- ❌ Регистрация / своё OAuth — никогда (есть `initData`)
- ❌ Английская версия — V2
- ❌ Свой login — никогда
- ❌ Cookie-баннер — никогда
- ❌ Своя кнопка «Назад» / sticky-header — никогда (есть BackButton)

## Связь с остальным проектом

- **../index.html** — публичный лендинг МОМО (для туристов через Google/Яндекс). Работает параллельно с TMA, не заменяется.
- **../brief.md** — Часть I (лендинг) + Часть II (этот TMA). Главный источник правды для содержания.
- **../research.md** — кейсы TMA, экспертные оценки, лучшие практики.
- **../РОЕКТ.md, ../design-research.md, ../RISKS.md, ../PLAN.md** — справочно.

**Главный принцип:** TMA = канал постоянных гостей через Telegram. Лендинг = публичный канал (Google, Яндекс). Один контент, два канала.
