// CURSOR
const cursor = document.getElementById('cursor');
const trail = document.getElementById('trail');
const isMobile = window.matchMedia('(max-width: 768px)').matches;
let mx = 0, my = 0;

if (!isMobile && cursor && trail) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    setTimeout(() => {
      trail.style.left = mx + 'px';
      trail.style.top = my + 'px';
    }, 80);
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// SCROLL PROGRESS
const progressEl = document.getElementById('progress');
if (progressEl) {
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    progressEl.style.width = pct + '%';
  });
}

// SCROLL REVEAL
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// STAGGER PROJECTS + PUBS
const staggerIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const sibs = e.target.parentElement.querySelectorAll('.project-item, .pub-item');
      sibs.forEach((s, i) => setTimeout(() => s.classList.add('visible'), i * 90));
      staggerIO.unobserve(e.target);
    }
  });
}, { threshold: 0.05 });

const fp = document.querySelector('.project-item');
const fpu = document.querySelector('.pub-item');
if (fp) staggerIO.observe(fp);
if (fpu) staggerIO.observe(fpu);

// MAGNETIC LINKS
if (!isMobile) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.15;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

// NAME GLITCH
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%?&';
const hint = document.getElementById('nameHint');
if (hint) hint.textContent = isMobile ? 'tap my name ↑' : 'hover my name ↑';

function scrambleTo(el, target, onDone) {
  let iter = 0;
  const interval = setInterval(() => {
    el.textContent = target.split('').map((c, i) => {
      if (c === ' ') return ' ';
      if (i < iter) return target[i];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    if (iter >= target.length) {
      clearInterval(interval);
      el.textContent = target;
      if (onDone) onDone();
    }
    iter += 0.45;
  }, 35);
}

const nameFirst = document.getElementById('nameFirst');
if (nameFirst) {
  let isQuangMinh = true;
  let scramblingFirst = false;

  function triggerFirst() {
    if (scramblingFirst) return;
    scramblingFirst = true;
    if (hint) hint.classList.add('gone');
    const next = isQuangMinh ? 'Jeremy' : 'Quang Minh';
    scrambleTo(nameFirst, next, () => {
      isQuangMinh = !isQuangMinh;
      scramblingFirst = false;
    });
  }
  nameFirst.addEventListener('mouseenter', triggerFirst);
  nameFirst.addEventListener('touchstart', e => { e.preventDefault(); triggerFirst(); }, { passive: false });
}

const nameLast = document.getElementById('nameLast');
if (nameLast) {
  let scramblingLast = false;

  function triggerLast() {
    if (scramblingLast) return;
    scramblingLast = true;
    scrambleTo(nameLast, 'Vu', () => { scramblingLast = false; });
  }
  nameLast.addEventListener('mouseenter', triggerLast);
  nameLast.addEventListener('touchstart', e => { e.preventDefault(); triggerLast(); }, { passive: false });
}
