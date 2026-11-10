const site = document.querySelector('#site');
const menu = document.querySelector('#menu');
const profile = document.querySelector('#profile');
const text = 'テキスト';
const longCopy = [text.repeat(6), text.repeat(4), text.repeat(8)];
const shortCopy = [text.repeat(6), text.repeat(4), text.repeat(5)];
const routes = new Set(['opening', 'top', 'about', 'archive', 'detail', 'member', 'contact', 'form', 'submitted']);
const image = (file, className = '', attributes = '') => `<img src="assets/${file}" alt="" class="${className}" ${attributes}>`;
const position = (x, y, width, height) => `left:${x}px;top:${y}px;${width == null ? '' : `width:${width}px;`}${height == null ? '' : `height:${height}px;`}`;
const copy = (lines = longCopy, extra = '') => `<div class="copy ${extra}">${lines.map(line => `<p>${line}</p>`).join('')}</div>`;
const placedCopy = (x, y, width, lines = longCopy, extra = '') => `<div class="placed ${extra}" style="${position(x, y, width)}">${copy(lines)}</div>`;
const photo = (file, x, y, width, height = width) => image(file, 'placed photo', `style="${position(x, y, width, height)}"`);
const formHeader = () => `<header class="form-opening-header"><a href="#opening" aria-label="BAMP! トップ">${image('bamp-87-304.svg')}</a></header>`;
const header = () => `<header class="page-header"><a href="#top" class="header-logo">BAMP!</a></header>`;
const footer = () => '<footer class="page-footer"><p>©2026 BUMP!</p></footer>';
const hero = (file, title, subtitle = 'テキストテキスト') => `<section class="hero">${image(file, 'hero-photo')}<h1 class="hero-heading">${title}<span class="hero-subtitle">${subtitle}</span></h1></section>`;
const more = (to, x, y, label = 'view more') => `<a class="more ${label === 'contact us' ? 'contact-link' : ''}" href="#${to}" style="left:${x}px;top:${y}px"><span>${label}</span>${image(label === 'contact us' ? 'f2652.svg' : 'e7256.svg', 'underline')}${image(label === 'contact us' ? 'ca0f8.svg' : '9f1fc.svg', 'arrow')}</a>`;

function opening(pc) {
  return `<div class="frame opening ${pc ? 'pc' : ''}" data-figma-node="${pc ? '87:290' : '3:3'}">
    <video class="opening-video" ${matchMedia('(prefers-reduced-motion: reduce)').matches ? '' : 'autoplay'} muted playsinline preload="auto" poster="assets/opening-poster.jpg"><source src="assets/opening.mp4" type="video/mp4"></video>
    <div class="opening-shade"></div>
    ${image(pc ? 'bamp-87-294.svg' : 'bamp-5-5.svg', 'opening-wordmark', 'aria-label="BAMP!" role="img"')}
    ${image(pc ? 'bamp-87-295.svg' : 'bamp-5-6.svg', 'opening-tagline', 'aria-label="Bamboo → Action → Movement → Phenomenal!" role="img"')}
    <h1 class="opening-copy">熱狂の渦中へ、いざ。</h1>
    <a class="enter" href="#form"><span class="enter-label">entry</span></a>
    <header class="opening-header">${pc ? image('bamp-87-304.svg', 'opening-small-logo', 'aria-label="BAMP!" role="img"') : ''}</header>
  </div>`;
}

function top() {
  return `${hero('1f111.png', 'キャッチコピー', 'キャッチコピーキャ').replace('class="hero-subtitle"', 'class="hero-subtitle" style="font-size:36px;font-weight:500;line-height:43px"')}
    <section class="top-about">
      <h2 class="section-title placed" style="${position(24, 150)}">about us</h2>
      ${photo('2528a.png', 54, 238, 229)}${photo('1d58f.png', 180, 387, 177)}
      ${placedCopy(24, 614, 354)}${more('about', 24, 866)}
    </section>
    <section class="top-archive">
      ${photo('06655.png', 271, 527, 136)}${photo('9ec3f.png', -30, 328, 199)}${photo('e7ff4.png', 231, 142, 199)}
      <h2 class="section-title placed" style="${position(144, 200)}">archive</h2>
      ${placedCopy(70, 288, 261, [text.repeat(6), text.repeat(4), text.repeat(2), text.repeat(4)], 'archive-copy')}
      ${more('archive', 103, 601)}
    </section>
    <section class="top-bottom">
      <h2 class="section-title placed" style="${position(24, 100)}">member</h2>
      ${placedCopy(24, 188, 354, shortCopy)}${more('member', 24, 411)}
      ${photo('929c5.png', -114, 491, 183)}${photo('929c5.png', 119, 491, 183)}${photo('929c5.png', 352, 491, 183)}
      <h2 class="section-title placed" style="${position(24, 774)}">contact</h2>
      <div class="contact-preview"></div>${placedCopy(48, 886, 306, [text.repeat(6), text.repeat(3), '\u200b'])}
      ${more('contact', 117, 1146, 'contact us')}
    </section>`;
}

function about() {
  return `${hero('85e3e.png', 'about us')}<section class="about-body">${placedCopy(24, 200, 354)}${placedCopy(24, 602, 354, shortCopy)}${placedCopy(24, 975, 354)}</section>`;
}

function archive() {
  return `${hero('15eb1.png', 'archive')}<section class="archive-body">${[0, 1].map(() => `<a class="archive-item" href="#detail">${image('929c5.png')}<p>タイトル</p></a>`).join('')}</section>`;
}

function detail() {
  return `${hero('de83c.png', 'タイトル')}<div class="detail-body">
    <nav class="detail-nav" aria-label="記事内ナビゲーション"><a href="#detail/overview">概要</a><a href="#detail/interview">インタビュー</a><a href="#detail/process">プロセス</a></nav>
    ${image('dcd71.svg', 'detail-nav-line')}
    ${[['overview', '概要'], ['interview', 'インタビュー'], ['process', 'プロセス']].map(([id, title], i) => `<section id="${id}" class="detail-section" style="top:${283 + 918 * i}px"><h2>${title}</h2>${copy(longCopy, 'first')}${image('929c5.png')}${copy(longCopy, 'last')}</section>`).join('')}
  </div>`;
}

function member() {
  return `${hero('9952a.png', 'member')}<section class="members">${Array.from({length: 10}, (_, index) => `<button class="member-button" data-profile aria-haspopup="dialog" aria-controls="profile" aria-label="名前 名前のプロフィール ${index + 1}">${image('929c5.png')}<span>名前 名前</span></button>`).join('')}</section>`;
}

function contact() {
  return `${hero('b5ba9.png', 'cantact')}<section class="contact-body"><h2>エントリー一覧</h2><div class="entry-list">${Array.from({length: 4}, () => `<article class="entry-card"><h3>演出</h3>${copy([text.repeat(11)])}</article>`).join('')}</div></section>`;
}

function form() {
  const fields = [
    ['name', '名前', 'text', '例）竹田　取太郎', 'name', true],
    ['email', 'メールアドレス', 'email', '例）test@example.com', 'email', true],
    ['affiliation', '現所属', 'text', '例）竹大学竹学部7年', 'organization', true],
    ['birthday', '生年月日', 'text', '例）2000/07/07', 'bday', true],
    ['phone', '電話番号', 'tel', '例）080-7777-7777', 'tel', false],
  ];
  return `<section class="form-page" aria-labelledby="form-title">
    <h1 id="form-title">エントリー</h1>
    <form id="entry-form" action="https://formsubmit.co/bampro200@gmail.com" method="POST">
      <input type="hidden" name="_webhook" value="https://script.google.com/macros/s/AKfycbz-TIND-ZKOVgiQBM_cAzVaIndYGq2fggNpD-sxvAJpBVnvHzI9N0YBy7WrAJePPV2J/exec">
      <input type="hidden" name="受付ID" value="${crypto.randomUUID()}">
      <input type="hidden" name="_subject" value="BAMP! エントリー">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_next" value="https://bamprogit.github.io/#submitted">
      <input type="text" name="_honey" tabindex="-1" autocomplete="off" hidden>
      ${fields.map(([id, label, type, placeholder, autocomplete, required]) => `<div class="form-field"><label for="${id}">${label}${required ? '<span class="required">必須</span>' : ''}</label><input id="${id}" name="${id === 'email' ? 'email' : label}" type="${type}" placeholder="${placeholder}" autocomplete="${autocomplete}" maxlength="${id === 'birthday' ? 10 : 254}" ${required ? 'required' : ''}></div>`).join('')}
      <div class="form-field"><label for="remarks">その他・備考</label><textarea id="remarks" name="その他・備考" placeholder="ご自由にご記入ください" maxlength="5000"></textarea></div>
      <button class="form-submit" type="submit"><span>送信する</span>${image('6f79f.svg', 'arrow')}</button>
      <p class="form-status" role="status" hidden></p>
    </form>
  </section>`;
}

function submitted() {
  return '<section class="form-page form-complete"><h1>送信しました</h1><a href="#opening">BAMP!</a></section>';
}

function validateBirthday(input) {
  const match = /^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/.exec(input.value.trim());
  let valid = false;
  if (match) {
    const [, year, month, day] = match.map(Number);
    const date = new Date(year, month - 1, day);
    valid = year >= 1000 && date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day && date <= new Date();
  }
  input.setCustomValidity(valid || !input.value ? '' : '生年月日を年/月/日で入力してください。');
}
site.addEventListener('input', event => {
  if (event.target.id === 'birthday') validateBirthday(event.target);
});
site.addEventListener('submit', event => {
  if (event.target.id !== 'entry-form') return;
  const form = event.target;
  for (const input of form.querySelectorAll('input[required]')) {
    input.value = input.value.trim();
  }
  validateBirthday(form.querySelector('#birthday'));
  if (!form.reportValidity()) { event.preventDefault(); return; }
  const button = form.querySelector('.form-submit');
  button.disabled = true;
  button.querySelector('span').textContent = '送信中';
});
addEventListener('pageshow', () => {
  const button = document.querySelector('.form-submit');
  if (button) { button.disabled = false; button.querySelector('span').textContent = '送信する'; }
});

let currentRoute;
let currentPC;
let opener;
const pageFunctions = {top, about, archive, detail, member, contact, form, submitted};
const nodeIds = {top: '17:216', about: '26:468', archive: '26:519', detail: '26:539', member: '26:583', contact: '34:637', form: '302:2', submitted: '302:2'};

function scalePage() {
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const width = currentRoute === 'opening' && currentPC ? 1280 : 402;
  const height = currentPC ? 832 : 874;
  const scale = currentRoute === 'opening'
    ? Math.min(viewportWidth / width, viewportHeight / height)
    : Math.min(viewportWidth / width, 1);
  site.style.setProperty('--page-scale', scale);
  const desktopOpening = viewportWidth >= 900;
  const openingWidth = desktopOpening ? 1280 : 402;
  const openingHeight = desktopOpening ? 832 : 874;
  const openingScale = Math.min(viewportWidth / openingWidth, viewportHeight / openingHeight);
  const logoX = (viewportWidth - openingWidth * openingScale) / 2 + (desktopOpening ? 38.689 : 26.14) * openingScale;
  const logoY = (viewportHeight - openingHeight * openingScale) / 2 + (desktopOpening ? 38.952 : 65.52) * openingScale;
  site.style.setProperty('--form-logo-x', `${logoX}px`);
  site.style.setProperty('--form-logo-y', `${logoY}px`);
  site.style.setProperty('--form-logo-scale', openingScale);
  site.style.setProperty('--form-offset', `${Math.max(0, logoY + 25 * openingScale + 24 * scale - 110 * scale)}px`);
  site.dataset.route = currentRoute;
  document.documentElement.style.setProperty('--dialog-scale', Math.min(viewportWidth / 402, viewportHeight / 328, 1));
}

function closeDialogs() {
  for (const dialog of [menu, profile]) if (dialog.open) dialog.close();
}

function render() {
  const [requested, anchor] = location.hash.slice(1).split('/');
  const route = routes.has(requested) ? requested : 'opening';
  const pc = document.documentElement.clientWidth >= 900;
  closeDialogs();
  if (route !== currentRoute || (route === 'opening' && currentPC !== pc)) {
    currentRoute = route;
    currentPC = pc;
    const backdrop = route === 'top' ? '1f111.png' : route === 'about' ? '85e3e.png' : null;
    site.innerHTML = route === 'opening' ? opening(pc) : `${(route === 'form' || route === 'submitted') ? formHeader() : ''}<div class="frame ${(route === 'form' || route === 'submitted') ? 'form-frame' : ''} ${backdrop ? 'with-backdrop' : ''}" data-figma-node="${nodeIds[route]}">${backdrop ? `<div class="page-backdrop">${image(backdrop)}</div>` : ''}${(route === 'form' || route === 'submitted') ? '' : header()}${pageFunctions[route]()}${footer()}</div>`;
    document.title = route === 'opening' || route === 'top' ? 'BAMP!' : `${route === 'detail' ? 'archive' : route} | BAMP!`;
    window.scrollTo(0, 0);
    const video = site.querySelector('video');
    if (video) {
      video.muted = true;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause();
      else video.play().catch(() => { /* The original poster remains visible if autoplay is unavailable. */ });
    }
  }
  scalePage();
  if (anchor && route === 'detail') requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView());
}

document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-menu], [data-profile], [data-close]');
  if (!trigger) return;
  if (trigger.hasAttribute('data-close')) {
    trigger.closest('dialog').close();
    return;
  }
  opener = trigger;
  (trigger.hasAttribute('data-menu') ? menu : profile).showModal();
});
for (const dialog of [menu, profile]) {
  dialog.addEventListener('close', () => { if (opener?.isConnected) opener.focus({preventScroll: true}); });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
menu.addEventListener('click', event => {
  if (event.target.closest('a')) {
    const next = event.target.closest('a').hash;
    closeDialogs();
    if (next === location.hash) window.scrollTo(0, 0);
  }
});
addEventListener('hashchange', render);
addEventListener('resize', () => {
  if (currentRoute === 'opening' && currentPC !== (document.documentElement.clientWidth >= 900)) render();
  else scalePage();
});
render();
