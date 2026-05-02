/* ══════════════════════════════════════════
   ELVIS PORTFOLIO — SHARED JS
   ══════════════════════════════════════════ */

/* ── THEME ── */
function getTheme() { return localStorage.getItem('ea_theme') || 'dark'; }
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('ea_theme', t);
}
function toggleTheme() { setTheme(getTheme() === 'dark' ? 'light' : 'dark'); }

/* ── LANG ── */
function getLang() { return localStorage.getItem('ea_lang') || 'pt'; }
function setLang(l) {
  localStorage.setItem('ea_lang', l);
  applyLang(l);
}
function toggleLang() { setLang(getLang() === 'pt' ? 'en' : 'pt'); }
function applyLang(l) {
  document.querySelectorAll('[data-pt],[data-en]').forEach(el => {
    const txt = el.getAttribute('data-' + l);
    if (txt !== null) el.textContent = txt;
  });
  document.querySelectorAll('[data-pt-html],[data-en-html]').forEach(el => {
    const html = el.getAttribute('data-' + l + '-html');
    if (html !== null) el.innerHTML = html;
  });
  document.querySelectorAll('[data-pt-href],[data-en-href]').forEach(el => {
    const href = el.getAttribute('data-' + l + '-href');
    if (href !== null) el.href = href;
  });
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.textContent = l === 'pt' ? 'EN' : 'PT';
  });
  document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
}

/* ── CURSOR ── */
function initCursor() {
  const cur = document.getElementById('cur');
  const curR = document.getElementById('curR');
  if (!cur || !curR) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
  });
  (function ring() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    curR.style.left = rx + 'px'; curR.style.top = ry + 'px';
    requestAnimationFrame(ring);
  })();
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.width = '20px'; cur.style.height = '20px';
      curR.style.width = '56px'; curR.style.height = '56px';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.width = '10px'; cur.style.height = '10px';
      curR.style.width = '36px'; curR.style.height = '36px';
    });
  });
}

/* ── NAV SCROLL ── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const btn = document.getElementById('mBtn');
  const mob = document.getElementById('mobNav');
  if (!btn || !mob) return;
  btn.addEventListener('click', () => mob.classList.toggle('open'));
}
function closeMob() {
  const mob = document.getElementById('mobNav');
  if (mob) mob.classList.remove('open');
}

/* ── REVEAL ── */
function initReveal() {
  const els = document.querySelectorAll('.rv,.rv2');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('on'), i * 80);
    });
  }, { threshold: .08, rootMargin: '0px 0px -32px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── INIT ALL ── */
function initAll() {
  setTheme(getTheme());
  applyLang(getLang());
  initCursor();
  initNav();
  initMobileMenu();
  initReveal();
  // Wire up toggle buttons
  document.querySelectorAll('[data-toggle-theme]').forEach(b =>
    b.addEventListener('click', toggleTheme));
  document.querySelectorAll('[data-toggle-lang]').forEach(b =>
    b.addEventListener('click', toggleLang));
}

document.addEventListener('DOMContentLoaded', initAll);
