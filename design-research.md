# design-research.md — дизайн-исследование лендинга MOMO

Дата: 2026-05-18 (обновлено после поступления реальных фото интерьера)
Контекст: дополнение к [research.md](research.md). Это документ про визуальный язык, структуру и тренды.

> ⚠️ **Важные исправления (хронология).**
>
> **2026-05-18 — палитра.** Первая версия этого файла строилась на двух источниках: обложке детского меню (лотосы на пыльно-розовом) и фестивальных макетах «Севастопольские сезоны» (розовый атлас). Это привело к ложному выводу о «розово-мятной пастельной палитре». После анализа 32 фото реального интерьера в `МОМО/интерьер_апрель2026/` картина оказалась богаче: бренд держится на пятицветной системе **Coral + Teal + Navy + Soft Pink + Off-white** на тёплом дубовом полу. Лотосы — ключевой визуал, но на **тёмно-синем фоне** с мятными листьями и пыльно-розовыми цветами.
>
> **2026-05-19 — фестиваль ≠ бренд.** «Севастопольские сезоны» — **внешний городской проект** (организатор sevastravel.ru), не часть бренда MOMO. Палитра, шрифты и обложки фестиваля меняются от сезона к сезону и принадлежат фестивалю. Поэтому розовый атлас и display-серифный wordmark «Меню» из фестивальных макетов в `Севастопольские сезоны/` **не учитываются** как часть фирстиля MOMO. На лендинге фестиваль появляется как **участие** (бейдж, ссылка), а секция «Севастопольские сезоны» на сайте MOMO оформляется в палитре MOMO.
>
> Документ переписан с учётом обеих поправок. См. §1 «Реальный визуальный код MOMO».

## Содержание
1. [Реальный визуальный код MOMO](#1-реальный-код)
2. [Финальная палитра (5 цветов + 3 нейтрала)](#2-палитра)
3. [Контрастные пары WCAG 2.2 AA](#3-контраст)
4. [Конкуренты-референсы](#4-референсы)
5. [Идеальная структура лендинга](#5-структура)
6. [Тренды 2025–2026](#6-тренды)
7. [Анимации и интерактивность](#7-анимации)
8. [CRO-паттерны](#8-cro)
9. [Финальный синтез для MOMO](#9-синтез)

---

<a id="1-реальный-код"></a>
## 1. Реальный визуальный код MOMO (из фото интерьера)

### Архитектура помещения
- Большие панорамные окна с прямым видом на Севастопольскую бухту.
- Несколько зон: лаунж с серыми диванами у окон, обеденная зона с круглыми тёмными столами, барная стойка, открытая терраса.
- Светлый дубовый пол (honey oak), белые стены, потолок в белом.
- Деревянные вертикальные слат-перегородки делят зоны — тёплое дерево, не «индустриальный лофт».
- Терраса: белая кованая балюстрада с орнаментом, тёплая полосатая маркиза, керамическая плитка терракотового оттенка, белые круглые подвесные лампы.

### Ключевые визуальные акценты
1. **Кораллово-терракотовые подвесные лампы Muuto-style** — главный цветовой акцент. Висят в каждой зоне, читаются как фирменный приём.
2. **Большие панно с лотосами на тёмно-синем фоне** — ключевой бренд-визуал. Розовые и белые лотосы, мятные листья, навигационный синий бэкграунд. Это **то самое**, что нужно цитировать на сайте.
3. **Декоративные подушки** — коралл и мята вперемешку на серых диванах.
4. **Плашка с логотипом MOMO** — тёмная, белый wordmark с горизонтальными линиями (тот же, что на обложке детского меню — гарантирует консистентность).
5. **Бар** — чёрный с вертикальными полосами, ряды бутылок с золотой подсветкой, неоновая вывеска «MOMO».
6. **Меню-буклеты** — каждая страница имеет пастельную цветную карточку под каждым напитком (пыльно-розовая, мятная, лиловая, персиковая) — это **внутренний паттерн меню**, не общий стиль бренда.

### Световой режим
- **Дневной режим:** яркий, тёплый, золотистый — особенно у окон и на террасе в золотой час.
- **Вечерний режим:** тёплый, приглушённый, акценты от коралловых ламп и бара.

На сайте это должно работать как **переход палитры**: верх страницы дневной и светлый, секция бара — тёмно-синяя с коралловой подсветкой.

### Стиль подачи блюд (из папок `люда_апрель2026/`, `ваня_апрель2026/`, `Щекотихина/`)
- Классические европейские тарелки: фарфор с винтажным цветочным/растительным орнаментом, посуда с золотой каймой.
- Мидии в кремовом соусе с багетом, утка с пюре, тартар лосося с домашним хлебом, фуа-гра-десерты, разноцветные макаруны.
- Подача — европейская fine-casual: не молекулярная авангардистика, не «домашняя пельмешка», а **рестораны Средиземноморья + классическая русская кухня в современной подаче**.
- Свет на студийных фото — тёплый дневной, естественный, без агрессивных бликов.

**Вывод по бренду:** MOMO — это **современный приморский бистро с Средиземноморским вайбом**, не «инстаграм-кафе». Семейность реализована через атмосферу и сервис, не через сладкий пастельный визуал.

---

<a id="2-палитра"></a>
## 2. Финальная палитра (5 цветов + 3 нейтрала)

### Активные бренд-цвета

| Токен | HEX | Роль | Где живёт в реальности |
|---|---|---|---|
| `--coral` | `#E07856` | **Primary accent / CTA** | Подвесные лампы, подушки |
| `--teal` | `#7FB8B0` | Secondary accent | Подушки, лотосовые листья, бирюзовые акценты |
| `--navy` | `#1F3045` | Anchor (заголовки, тёмные плашки) | Фон лотосовых панно, плашка логотипа |
| `--pink` | `#E8B6B0` | Tertiary / soft accent | Лотосовые цветы, карточки в меню-буклете |
| `--oak` | `#D4B896` | Wood / decor | Паркет, деревянные перегородки |

### Нейтралы

| Токен | HEX | Роль |
|---|---|---|
| `--bg` | `#F5F1EA` | Off-white фон сайта (тёплый, не cold-white) |
| `--surface` | `#FFFFFF` | Карточки, поверхности |
| `--gray` | `#9C9A95` | Warm gray — для disabled state, фоновых элементов |
| `--ink` | `#1F3045` | Основной текст (= navy) |
| `--ink-soft` | `#6B655E` | Вторичный текст |
| `--charcoal` | `#2A2520` | Самые тёмные элементы (стойка бара, рамки фото) |

### Правило балансировки 60/20/10/5/5 (для пятицветной системы)

| Слой | Доля | Что использует |
|---|---|---|
| **Surface (фон)** | 60% | `--bg` Off-white |
| **Primary mass** (текст, тёмные плашки) | 20% | `--navy` + `--charcoal` |
| **Brand accent (CTA, важные акценты)** | 10% | `--coral` |
| **Secondary accent** | 5–7% | `--teal` |
| **Tertiary / decor** | 3% | `--pink` + `--oak` |

**Главное правило:** на любом экране **только один акцент доминирует**. Hero — coral. Меню — teal. Контакты — navy. Pink и Oak — поддержка иллюстраций, никогда не CTA и не текст.

### Тёмная схема для секции бара (вечерний регистр)

| Роль | HEX |
|---|---|
| Background base | `#0F1B2C` |
| Surface | `#1F3045` Navy |
| Surface elevated (hover) | `#2B3E54` |
| Primary text | `#F5F1EA` Off-white (контраст 14.2 : 1, AAA) |
| Secondary text | `#D4B896` Oak (контраст ~7 : 1, AAA) |
| CTA | `#E07856` Coral |
| Mint glow / тэги | `#7FB8B0` Teal |
| Soft glow / hover | `#E8B6B0` Pink |
| Divider | `#3A506B` |

Логика: фон сайта остаётся off-white, секция бара переключается на navy → создаёт **визуальный «нырок» в вечер**, повторяя ощущение, когда заходишь в реальный бар MOMO.

---

<a id="3-контраст"></a>
## 3. Контрастные пары WCAG 2.2 AA

| Foreground | Background | Ratio | Verdict | Применение |
|---|---|---|---|---|
| `#1F3045` Navy | `#F5F1EA` Off-white | 12.8 : 1 | AAA | **Body text по умолчанию** |
| `#2A2520` Charcoal | `#F5F1EA` Off-white | 14.6 : 1 | AAA | H1–H2 заголовки |
| `#E07856` Coral | `#F5F1EA` Off-white | 3.1 : 1 | AA Large only | H1, ценники 24pt+. **НЕ для body** |
| `#1F3045` Navy | `#E07856` Coral | 4.1 : 1 | AA | **Текст на coral CTA — рекомендуемый** |
| `#FFFFFF` | `#E07856` Coral | 3.4 : 1 | AA Large only | Текст 18pt+ на coral |
| `#7FB8B0` Teal | `#F5F1EA` Off-white | 2.0 : 1 | FAIL | **Только декор, не текст** |
| `#1F3045` Navy | `#7FB8B0` Teal | 6.4 : 1 | AAA | Текст на teal-плашке |
| `#E8B6B0` Pink | `#F5F1EA` Off-white | 1.5 : 1 | FAIL | **Только декор** |
| `#1F3045` Navy | `#E8B6B0` Pink | 8.4 : 1 | AAA | Текст на pink-блоке |
| `#9C9A95` Warm Gray | `#F5F1EA` Off-white | 2.6 : 1 | FAIL для текста | UI-бордеры, disabled, captions |
| `#D4B896` Oak | `#1F3045` Navy | 5.8 : 1 | AA | Декоративный текст на navy |
| `#F5F1EA` Off-white | `#1F3045` Navy | 12.8 : 1 | AAA | Текст в footer / dark секциях |

**Жёсткое правило:** Teal и Pink — НИКОГДА не текст на off-white. Они работают только как заливка плашек, и текст на них — navy или charcoal.

### Coral vs Navy для CTA — решение

**Финальная рекомендация:** **`#E07856` Coral — primary CTA** («Забронировать», «Заказать»).

Обоснование:
- Food vertical — appetite stimulation важнее, чем банковский trust-сигнал.
- Navy и так доминирует в типографике и логотипе — coral создаёт максимальный контраст без конкуренции с brand-anchor.
- На off-white фоне coral визуально «вспыхивает» — конверсионный hot-spot.
- Аудитория 25–60 (семьи + пары) считывает coral как тёплый, доступный, не пафосный — подходит для среднего чека ~1500 ₽.

**Secondary CTA — Navy outline** («Меню», «О нас»): navy-бордер 2px, navy-текст, прозрачный фон. Это даёт чёткую визуальную иерархию: главное действие = заливка coral, вспомогательное = navy outline.

---

<a id="4-референсы"></a>
## 4. Конкуренты-референсы

> ⚠️ **Честная ревизия от 2026-05-18.** Все референсы из ранних версий были перепроверены через WebFetch и WebSearch. Большая часть не выдержала проверки. Ниже — **только то, что я реально открыл и подтвердил**, плюс отдельный блок «moodboard-инструкция» для самостоятельного поиска тех референсов, которые мои инструменты подгрузить не могут.

### 4.1. Что было снято при проверке

| Старый референс | Причина |
|---|---|
| [Top Typography Trends 2025](https://dribbble.com/shots/25002770-Top-Typography-Trends-2025) (Dribbble) | **Ссылка 404**. Удалена. |
| [Son Daven](https://www.awwwards.com/sites/son-daven) (Awwwards) | На самом деле — **гостинично-ресторанный комплекс в Карпатах**, не coastal. Не подходит как Mediterranean-референс. |
| [Paput Menorca](https://www.awwwards.com/sites/paput-menorca) (Awwwards) | Существует, ресторан-бар на Менорке. Но Awwwards отдаёт через WebFetch только текстовое описание — **я не видел реальных визуалов**. Оставляю как «нужно проверить вручную», не как утверждённый референс. |
| Все Dribbble-шоты из ранних версий | **Dribbble рендерит шоты через JavaScript**, WebFetch получает пустую страницу. В первой версии я цитировал заголовки из поисковой выдачи, не видя визуалов. Удалены. |
| Chakra, Oak & Cocoa, Earthgraced, Juice Lab | Цитировал по результатам поиска, не подтверждены визуально. И сами по себе пастельно-розовые — после ревизии палитры (см. §1) они не попадают в реальный бренд MOMO. |
| OnePageLove-рестораны (11 Bar, Le Petit Bleu, Monte, Allta) | Проверены через WebFetch. **Никто не Mediterranean coastal**: 11 Bar — лондонский подвал, Le Petit Bleu — Новый Орлеан, Monte — австралийская кофейня. Сняты с этой роли, оставлены только в §5 как структурные референсы. |

### 4.2. Подтверждённые референсы (проверены руками)

**[Tastavents](https://tastavents.com)** — единственный реальный Mediterranean coastal ресторан в списке. Барселона.
**Подтверждено:** Awwwards Honorable Mention (окт 2024). Палитра `#3E270F` тёмный коричневый + `#FFF1DD` кремовый — **двухцветная, не пятицветная**, как у MOMO.
**Что брать:** структуру — video-hero, «exquisite ingredients» подача, scroll-сторителлинг меню, бронь-модалка.
**Что НЕ брать:** саму палитру (коричневая, без coral/teal/navy).

**[Restaurant GEM.](https://www.awwwards.com/sites/restaurant-gem)** — fine dining, не Mediterranean coastal.
**Подтверждено:** Awwwards Nominee (окт 2025). Hover-превью блюд, реагирующие на курсор.
**Что брать:** только паттерн hover-превью.
**Что НЕ брать:** fine-dining-драматургию, рафинированную светлую палитру.

**[Da Maria](https://www.awwwards.com/sites/da-maria)** — Рим, итальянский ресторан.
**Подтверждено:** Awwwards Honorable Mention (апр 2026). Палитра `#EFF0EC` off-white + `#DA4143` красный.
**Что брать:** editorial-вёрстка («журнальная»), бронь-модалка с GSAP+Barba микроанимациями, off-white фон.
**Что НЕ брать:** красный акцент — у нас coral, не red.

**[Earls Restaurants](https://www.awwwards.com/sites/earls-restaurants-website)** — глобальная сеть, корпоративный.
**Подтверждено:** Awwwards Honorable Mention (сен 2020). Палитра чёрный `#000` + синий `#2779a7` + бирюзовый `#49c5b6`.
**Что брать:** **бирюзовый акцент** в навигации/иконках (близко к нашему teal `#7FB8B0`), вертикальное меню.
**Что НЕ брать:** corporate-tone, чёрный фон.

### 4.3. Итог по подтверждённым

Из четырёх подтверждённых референсов **ни один не имеет палитры, близкой к MOMO** (coral + teal + navy + pink + oak). Это значит: **палитра MOMO — оригинальная**, у неё нет очевидного «образца с awwwards, на который похожи». Это не плохо — это значит, дизайнер не сможет «срисовать», нужно собирать систему с нуля по §2.

Что брать из подтверждённых — только **паттерны структуры и взаимодействия**:
- Video-hero (Tastavents).
- Hover-превью блюд (GEM).
- Editorial-вёрстка + бронь-модалка с GSAP (Da Maria).
- Teal-акценты в UI (Earls).

### 4.4. Moodboard-инструкция (для самостоятельного поиска)

Дальше — то, что **мои инструменты не могут пройти за вас**: Dribbble, Behance, Pinterest и приватные галереи Tilda. Список конкретных поисковых запросов с пометками, что искать и что отсеивать.

**Awwwards (работает через WebFetch для текста, не для визуала):**
- [awwwards.com/websites/food-drink](https://www.awwwards.com/websites/food-drink/) — каталог. Фильтры: Tags → «Coastal», «Mediterranean», «Restaurant».
- Поиск: `awwwards mediterranean seaside restaurant 2025` (использовать в гугле, не на awwwards).
- На что смотреть: палитра coral+navy+teal, hero с морем/бухтой, ботанические декоры.

**Dribbble (только глазами, инструменты не видят):**
1. [dribbble.com/tags/mediterranean-restaurant](https://dribbble.com/tags/mediterranean-restaurant) — 10 работ.
2. [dribbble.com/search/coastal-restaurant-website](https://dribbble.com/search/coastal-restaurant-website) — больше работ.
3. [dribbble.com/search/seaside-bistro](https://dribbble.com/search/seaside-bistro)
4. Цветовые теги: [dribbble.com/colors/E07856](https://dribbble.com/colors/E07856) — все работы с coral; [dribbble.com/colors/1F3045](https://dribbble.com/colors/1F3045) — все с navy.
5. Авторы, которые регулярно делают F&B coastal: Marko Stupic, Cosmin Capitanu, Halo Lab, Plainthing Studio.
6. **Отсеивать:** пастельно-розовые «brunch cafe» (Chakra-стиль), кофейни в скандинавском минимализме, fine-dining с тёмной темой.

**Behance:**
1. [behance.net/search/projects/mediterranean%20restaurant%20website](https://www.behance.net/search/projects/mediterranean%20restaurant%20website)
2. [behance.net/search/projects/seaside%20bistro%20website](https://www.behance.net/search/projects/seaside%20bistro%20website)
3. [behance.net/search/projects/coastal%20restaurant%20branding](https://www.behance.net/search/projects/coastal%20restaurant%20branding)
4. **Отсеивать:** упаковочный дизайн без сайта, логотипы, фуд-фото без UI.

**Pinterest (фильтр «Boards»):**
- `mediterranean restaurant website` + `coral navy palette` + `coastal bistro web design`.
- Лучшая платформа для собрать 30–50 кадров за час и увидеть консенсус-эстетику.

**Чек-лист «брать или не брать» по каждому найденному:**
1. Палитра близка к нашей пятицветке? (coral / teal / navy / pink-soft / oak)
2. Стиль — Mediterranean coastal, не fine-dining и не brunch?
3. Hero — locale-driven (море, бухта, гавань), не product-driven (тарелка крупным планом)?
4. Есть видимая структура секций (меню, бронь, локация)?
5. Не fade-out корпоратив, не «лофт-индастриал»?

Если 4 из 5 — добавляйте в moodboard. Если 2 — мимо.

---

<a id="5-структура"></a>
## 5. Идеальная структура лендинга (9 блоков)

Исследование основано на разборе one-pager'ов из [One Page Love → Restaurant](https://onepagelove.com/inspiration/restaurant/) ([11 Bar](https://onepagelove.com/11bar), [Le Petit Bleu](https://onepagelove.com/le-petit-bleu), [Monte](https://onepagelove.com/monte)) и [Tilda Landing Page Anatomy](https://tilda.education/en/courses/landing-page/landing-page-anatomy/). Эти проекты — не Mediterranean coastal, **используются только как структурные референсы** для последовательности блоков и UX-паттернов, не для палитры.

| # | Блок | Какие цвета (по новой палитре) | Зачем именно тут |
|---|---|---|---|
| 1 | **Hero**: фото бухты + позиционирование + sticky «Бронь» | Off-white фон + coral CTA + navy текст | Настроение, не оффер |
| 2 | **О месте**: 2–3 предложения о философии + фото семьи/команды | Off-white + oak декор + лотосовые иллюстрации в углах | Story → доверие |
| 3 | **Меню-витрина**: 6–9 карточек + кнопка «Полное меню» | Off-white + teal-плашки на табах подкатегорий | Главный конверсионный блок |
| 4 | **Атмосфера / Галерея**: 6–10 фото интерьера, террасы, гостей | Off-white фон, фото показывают coral лампы + navy панно | «Куда я приду» — критично для семьи |
| 5 | **Для кого**: семья / детский ДР / бизнес-ланч | Pink плашка для детского, off-white для остальных | Закрывает «подходит ли мне» |
| 6 | **Социальное доказательство**: 3–4 отзыва + «★ 4.9, 2045 отзывов» | Off-white, серая рамка, navy текст | Самый частый недостающий блок |
| 7 | **FAQ**: 5–7 вопросов | Off-white | Закрывает «стоп-факторы» |
| 8 | **Локация и часы**: карта, адрес, фото входа | Off-white + navy карта-плашка | Без локации бронь не закрывается |
| 9 | **Финальный CTA**: «Забронируйте стол · +7 978 855-75-54 · 1–2 гудка» | Coral плашка во всю ширину | Одно действие = выше конверсия |

**Бонус-секция:** «Бар» — единственный блок с **тёмно-синей палитрой** (см. §2). Создаёт визуальный «нырок» в вечер.
**Sticky:** кнопка «Забронировать» — coral, в правом нижнем, во всех 9 блоках.

### Антипаттерны (НЕ добавлять)
1. Полноэкранный видео-фон с автоплеем — съедает мобильный трафик, тормозит LCP.
2. Бесконечная карусель отзывов — мешает читать, выглядит как «прячем плохие».
3. Попап «оставьте номер — перезвоним» — если он автоматически вылетает через 5 секунд. Сама форма «Перезвоните мне» в макете — это не попап, это inline-блок рядом с tel:-CTA.
4. Большая форма бронирования прямо на странице.
5. «Наши партнёры/поставщики» — B2B-паттерн.
6. Новости/блог-лента на главной — устаревает.

---

<a id="6-тренды"></a>
## 6. Тренды веб-дизайна 2025–2026

Источники: [Webflow Blog 2026](https://webflow.com/blog/web-design-trends-2026), [Smashing Magazine](https://www.smashingmagazine.com/category/trends/), [Pantone 2026](https://www.pantone.com/color-of-the-year/2026), [Hospitality Designs 2026](https://www.hospitalitydesigns.com/color-trends-2026-when-interiors-start-to-taste-like-something/).

### Типографика

1. **Editorial-serif с film-poster H1** — высококонтрастные «киношные» сериф-шрифты с курсивами. Лидеры: PP Editorial New, GT Sectra. → **MOMO:** H1 `PP Editorial New Light Italic` 80–120px на off-white.
2. **Oversized display + mini-caption** — гигантский serif + компактный моно/гротеск-капшен. → **MOMO:** под огромным «momo» — `est. Sevastopol · since 2013` 12px uppercase tracking +120.
3. **Kinetic / scroll-driven type** — текст растягивается и переформируется при скролле. → **MOMO осторожно:** только мягкий wave-reveal слова «momo» в hero.

### Цвет — главный тренд 2026

4. **«Explosion of color» / 5-цветные системы** (Webflow 2026) — отказ от схемы «монохром + один акцент» в пользу когезивных систем. → **MOMO:** прямое попадание — у нас и так 5-цветная система coral/teal/navy/pink/oak.
5. **Cloud Dancer + warm accents** (Pantone 2026) — off-white фон + Muskmelon orange / Tea Rose. → **MOMO:** базовый фон `#F5F1EA` ровно по Cloud Dancer, coral попадает в Muskmelon. **Бренд в тренде по случайному совпадению.**
6. **Hospitality earthy palettes** — «warm taupe, soft clay, terracotta, stone gray + один bold pop». → **MOMO:** наш coral — это bold pop в Mediterranean earth-palette.

### Композиция

7. **Editorial / anti-grid (magazine layout)** — сломанная сетка, перекрывающиеся блоки. → **MOMO:** секция «О нас» — фото слева в круге, текст обтекает справа, цитата курсивом залезает на фото.
8. **Bento grid 2.0 с видео-тайлами и hover-reveal** — модульные карточки разной пропорции с короткими видео-петлями. → **MOMO:** 4-секционное bento с loop-видео пары (закат над бухтой) + три категории меню.

### Декор

9. **Hand-drawn botanical + animated illustrations** — анимированная ботаническая иллюстрация — новый стандарт. → **MOMO прямое попадание:** **лотосы — уже бренд-визуал**. Использовать их анимированно в углах секций (sway 1–2°, 4с loop).
10. **Grain, noise & tactile textures** — зерно и шум возвращаются. → **MOMO:** SVG-noise overlay `opacity: 0.04` на фон + texture на карточках меню (как старая бумага).

### Доступность

**Comfort modes** (WCAG 2.2 AA как новый дефолт) — сайты уважают `prefers-reduced-motion`, `prefers-color-scheme`, дают comfort-mode-тогглы. → **MOMO:** семья = бабушки и дети. Хедер-кнопка «A» с двумя режимами шрифта + переключатель «спокойный режим».

---

<a id="7-анимации"></a>
## 7. Анимации и интерактивность

| # | Приём | Инструмент | Где в MOMO |
|---|---|---|---|
| 1 | Scroll-stacking карточек меню | GSAP + ScrollTrigger | Секция «Меню недели» — 4–5 карточек блюд стопкой |
| 2 | SplitText scroll-reveal | GSAP SplitText | «Наша история», подзаголовки разделов |
| 3 | Cross-Document View Transitions API | View Transitions API + fallback Motion | Меню → детальная карточка блюда (shared фото) |
| 4 | Магнитные кнопки | GSAP `quickTo` + lerp | Coral CTA «Забронировать» — амплитуда 6–10px, только десктоп |
| 5 | Parallax с Lenis smooth-scroll | Lenis + GSAP | Hero + лотосовые декоры. Сдержанно (5–15px) |
| 6 | Hover на карточке: zoom + clip-reveal | CSS-only | **Карточки меню, залов, команды — топ-1 по соотношению вау/стоимость** |
| 7 | Skeleton + staggered fade-in | Framer Motion `staggerChildren` | Меню, галерея, отзывы — снимает раздражение на 4G в Севастополе |
| 8 | Lottie-микроанимации | `@lottiefiles/dotlottie-react` | Иконки преимуществ (терраса, детская, бухта), success после брони |
| 9 | Sticky horizontal scroll-секция | GSAP ScrollTrigger + `pin: true` | «История MOMO» (timeline 4 кадра). Максимум 1 раз |
| 10 | Sway-анимация ботанических иллюстраций | CSS-only `@keyframes` | Лотосы и веточки в углах — медленный 1–2° rotate, 4с loop |

### TOP-3 для MVP MOMO
1. **Hover-эффект на карточках (#6)** — CSS-only, максимум premium при нуле JS.
2. **SplitText scroll-reveal заголовков (#2)** — задаёт тон «истории», мягко.
3. **Sway лотосов (#10)** — фирменный, цитирует панно из интерьера.

### НЕ для MOMO
- Агрессивный cursor-blob с distortion — холодный студийно-агентский язык.
- 3D-hero на весь экран (Spline-сцена как главный объект) — тяжело (2–6 MB), грузится секундами на 4G, ломает «уютный» тон.

---

<a id="8-cro"></a>
## 8. CRO-паттерны

Источники: [Unbounce](https://unbounce.com/conversion-rate-optimization/landing-page-cta-placement/), [CXL](https://cxl.com/blog/above-the-fold/), [NN/g](https://www.nngroup.com/articles/3-is-of-microcopy/), [Baymard](https://baymard.com/lp/ux-best-practice-guidelines).

### Топ-5 для MOMO
1. **Sticky-CTA coral «Забронировать · +7 978 855-75-54» + 5 повторов** по странице. CTA в конце длинного лендинга поднимал конверсию на 304% в case-study Unbounce.
2. **Микрокопия под кнопкой:** *«Ответим за 5 минут. Без предоплаты»* — снимает главный страх первой брони.
3. **Распределённые соц-доказательства:** «★ 4.9, 2045 отзывов» в hero (4.9, а не 5.0!) + 3–4 цитаты по странице + счётчик «12 000 гостей в 2025».
4. **Прозрачность до формы:** средний чек («от 1500 ₽/гость»), фото зала, парковка, рабочие часы.
5. **FAQ 6–8 пунктов перед финальным CTA**: «нужна ли предоплата / с детьми / веганские / опоздание / парковка / до скольки кухня».

### Чего избегать
- «Зарезервировать» (бюрократично), «Узнать о наличии» (шаг назад). → Использовать: «Забронировать стол».
- Фейковая срочность («акция кончится через 23:59:59») — сожжёт доверие семейной аудитории.
- Куча конкурирующих CTA — все вторичные (соцсети, маршрут, звонок) делать слабее: текстовые ссылки, иконки.

---

<a id="9-синтез"></a>
## 9. Финальный синтез для MOMO

### Что обязательно зафиксировать в дизайн-системе

**Палитра** — 5 активных бренд-цветов + 3 нейтрала (см. §2). Coral как primary CTA, Navy как anchor типографики. **Розовый — только декор, не CTA.**

**Типографика:**
- **Display H1**: `PP Editorial New Light Italic` 80–120px — для hero и заглавий секций.
- **Body**: `Inter` / `Manrope`.
- **Logo/wordmark**: повторяет реальный wordmark МОМО — sans-serif с горизонтальными линиями.
- **Hand-drawn акцент** — рукописные подписи под фото (опционально).

**Декор:**
- **Лотосы на navy** — цитата интерьера. SVG-иллюстрации в углах секций «О нас» и «Севастопольские сезоны». Sway 1–2°.
- SVG-noise overlay opacity 0.04 на фон всего сайта.
- Coral-blob-подложки под отдельными фото блюд (как акценты, не как везде).

### Что менять в [project.md](project.md)

1. **§5.1 Палитра** — **полная замена**: было «розово-мятная Cloud Dancer», стало 5-цветная coral/teal/navy/pink/oak. Обновить таблицу токенов.
2. **§5.2 Типографика** — заменить `Cormorant Garamond` на `PP Editorial New`.
3. **§5.4 Иконки** — добавить «лотосы на navy в углах секций как ключевой декор».
4. **§5.5 Анимации** — расширить (см. §7 этого файла).
5. **§6 Структура** — добавить **FAQ** (его не было), **«форматы визита»**, и переключить секцию бара на **тёмно-синюю палитру** (новое).
6. **§6.1 Hero** — обновить: фон **off-white** (не белый), CTA **coral** (не rose-deep), вид на бухту как главный визуал.

### Что менять в [research.md](research.md)
- **§2.1 MVP-функции** — добавить FAQ (пункт 11 в MVP), Sticky-CTA + 5 повторов.
- **§3 UX-паттерны** — добавить раздел «микрокопия» с фразами под CTA.

### Что добавить в [PLAN.md](PLAN.md)

В **Фазу 1 (Дизайн)**:
- [ ] **Переработать палитру** в Figma по §2 (coral/teal/navy/pink/oak + 3 нейтрала)
- [ ] Сверить контрастность WCAG 2.2 AA для всех пар (§3)
- [ ] Нарисовать 6–8 SVG-иллюстраций лотосов на navy (для углов секций)
- [ ] Подобрать рукописный шрифт-акцент (Catchy Mager / Authoria)
- [ ] Дизайн bento-блока с loop-видео заката над бухтой

В **Фазу 2 (Разработка MVP)**:
- [ ] CSS-only hover на карточках меню
- [ ] SplitText scroll-reveal на заголовках
- [ ] Sticky coral CTA «Бронь» + 5 повторов по странице
- [ ] Comfort mode toggle: размер шрифта + отключение анимаций
- [ ] SVG-noise overlay
- [ ] Sway-анимация лотосов в углах
- [ ] **Тёмно-синяя альтернативная схема для секции бара** (см. §2)

### Что снять с риска
Из [RISKS.md](RISKS.md):
- **#1.3 (нет hero-фото)** — `МОМО/IMG_0717.jpeg` уже отличный hero-кадр террасы на закате. Достаточно для MVP.
- **#1.5 (контент-стратегия)** — bento-блоки и карточки меню требуют CMS. Подчёркивает решение про headless-CMS.

---

## Источники

**Палитра и тренды:**
- [Pantone Color of the Year 2026 — Cloud Dancer](https://www.pantone.com/color-of-the-year/2026)
- [Webflow Blog — Web design trends 2026](https://webflow.com/blog/web-design-trends-2026)
- [Hospitality Designs 2026 — Color trends](https://www.hospitalitydesigns.com/color-trends-2026-when-interiors-start-to-taste-like-something/)
- [The truth about 2026 color trends in hospitality — eHotelier](https://insights.ehotelier.com/insights/2026/02/25/the-truth-about-2026-color-trends-in-hospitality-design/)
- [Mediterranean Color Palette Ideas — Media.io](https://www.media.io/color-palette/mediterranean-color-palette.html)
- [Top 2026 Web Design Color Trends — Lounge Lizard](https://www.loungelizard.com/blog/web-design-color-trends/)
- [Warm vs Cool Color Psychology — LandingPageFlow](https://www.landingpageflow.com/post/which-performs-better-warm-vs-cool-color-psychology)
- [Best CTA Button Colors 2026 — WiserNotify](https://wisernotify.com/blog/call-to-action-colors/)
- [WCAG 2.2 Color Contrast Guide — StudioLimb](https://www.studiolimb.com/guides/wcag-color-contrast-guide.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

**Конкуренты-референсы (проверены через WebFetch):**
- [Tastavents — Awwwards](https://www.awwwards.com/sites/tastavents-restaurant) — единственный реальный Mediterranean coastal (Барселона)
- [Restaurant GEM. — Awwwards](https://www.awwwards.com/sites/restaurant-gem) — паттерн hover-превью
- [Da Maria — Awwwards](https://www.awwwards.com/sites/da-maria) — editorial-вёрстка + бронь-модалка (Рим)
- [Earls Restaurants — Awwwards](https://www.awwwards.com/sites/earls-restaurants-website) — teal-акцент в UI
- [Awwwards Food & Drink](https://www.awwwards.com/websites/food-drink/) — каталог для дальнейшего поиска

**Площадки для самостоятельного moodboard-сбора (см. §4.4):**
- [Dribbble Mediterranean Restaurant](https://dribbble.com/tags/mediterranean-restaurant)
- [Dribbble color tag #E07856 (coral)](https://dribbble.com/colors/E07856)
- [Behance Mediterranean Restaurant Website](https://www.behance.net/search/projects/mediterranean%20restaurant%20website)

**Структура и шаблоны:**
- [One Page Love — Restaurant Inspiration](https://onepagelove.com/inspiration/restaurant/)
- [Tilda Landing Page Anatomy](https://tilda.education/en/courses/landing-page/landing-page-anatomy/)

**CRO:**
- [Unbounce — CTA Placement](https://unbounce.com/conversion-rate-optimization/landing-page-cta-placement/)
- [CXL — Above the Fold](https://cxl.com/blog/above-the-fold/)
- [NN/g — 3 I's of Microcopy](https://www.nngroup.com/articles/3-is-of-microcopy/)
- [Baymard — UX Best Practices](https://baymard.com/lp/ux-best-practice-guidelines)
