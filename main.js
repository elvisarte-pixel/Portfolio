/* ═══════════════════════════════════════════════════════
   ELVIS ALMEIDA PORTFOLIO — main.js
═══════════════════════════════════════════════════════ */

/* ── THEME ── */
function getTheme() { return localStorage.getItem('ea_theme') || 'dark'; }
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('ea_theme', t);
}
function toggleTheme() { applyTheme(getTheme() === 'dark' ? 'light' : 'dark'); }

/* ── LANGUAGE ── */
function getLang() { return localStorage.getItem('ea_lang') || 'pt'; }
function applyLang(l) {
  localStorage.setItem('ea_lang', l);
  document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';

  // text content
  document.querySelectorAll('[data-pt],[data-en]').forEach(el => {
    const v = el.getAttribute('data-' + l);
    if (v !== null) el.textContent = v;
  });

  // innerHTML
  document.querySelectorAll('[data-pt-html],[data-en-html]').forEach(el => {
    const v = el.getAttribute('data-' + l + '-html');
    if (v !== null) el.innerHTML = v;
  });

  // update all lang buttons
  document.querySelectorAll('.toggle-lang, [data-toggle-lang]').forEach(b => {
    b.textContent = l === 'pt' ? 'EN' : 'PT';
  });
}
function toggleLang() { applyLang(getLang() === 'pt' ? 'en' : 'pt'); }

/* ── CUSTOM CURSOR ── */
function initCursor() {
  const cur = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
  });

  (function raf() {
    rx += (mx - rx) * .11;
    ry += (my - ry) * .11;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(raf);
  })();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
  });
}

/* ── NAV SCROLL ── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ── HAMBURGER MENU ── */
function initHamburger() {
  const btn = document.getElementById('btnHam');
  const menu = document.getElementById('mob-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.classList.toggle('open');
  });
}
function closeMob() {
  const menu = document.getElementById('mob-menu');
  const btn = document.getElementById('btnHam');
  if (menu) menu.classList.remove('open');
  if (btn) btn.classList.remove('open');
}

/* ── PORTFOLIO TABS ── */
function initTabs() {
  document.querySelectorAll('.ptab').forEach(btn => {
    btn.addEventListener('click', () => {
      // deactivate all
      document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.ppanel').forEach(p => p.classList.remove('active'));
      // activate clicked
      btn.classList.add('active');
      const panel = document.getElementById('panel-' + btn.dataset.tab);
      if (!panel) return;
      panel.classList.add('active');
      // trigger reveal animations for newly shown items
      panel.querySelectorAll('.rv, .rv2').forEach((el, i) => {
        if (!el.classList.contains('on')) {
          setTimeout(() => el.classList.add('on'), i * 60);
        }
      });
    });
  });
}

/* ── SCROLL REVEAL ── */
function initReveal() {
  const els = document.querySelectorAll('.rv, .rv2');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('on'), i * 70);
      }
    });
  }, { threshold: .07, rootMargin: '0px 0px -28px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── WIRE UP CONTROLS ── */
function initControls() {
  // main nav buttons
  const btnTheme = document.getElementById('btnTheme');
  const btnLang  = document.getElementById('btnLang');
  if (btnTheme) btnTheme.addEventListener('click', toggleTheme);
  if (btnLang)  btnLang.addEventListener('click', toggleLang);

  // any element with data-toggle-theme / data-toggle-lang (mobile menu)
  document.querySelectorAll('[data-toggle-theme]').forEach(b =>
    b.addEventListener('click', toggleTheme));
  document.querySelectorAll('[data-toggle-lang]').forEach(b =>
    b.addEventListener('click', toggleLang));
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getTheme());
  applyLang(getLang());
  initCursor();
  initNav();
  initHamburger();
  initTabs();
  initReveal();
  initControls();
});
