// Reveal on scroll (entradas suaves escalonadas)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 6) * 60}ms`;
  observer.observe(el);
});

// Hero slider: la tercera columna cicla entre sus imágenes con crossfade
const rotate = document.querySelector('.hs-rotate');
if (rotate) {
  const imgs = rotate.querySelectorAll('img');
  let idx = 0;
  setInterval(() => {
    imgs[idx].classList.remove('is-on');
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add('is-on');
  }, 2600);
}

// Hero slider: 4 fotos verticales que rotan aleatoriamente sin repetirse en pantalla
(function(){
  const slider = document.getElementById('heroSlider');
  if (!slider || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const base = 'propias/opt/';
  const pool = ['005-1-bone-mesh.jpg','branding-posittioning.jpg','001-norvell-top.jpg',
                '003-roselilab-photo.jpg','005-top.jpg','006-top.jpg'];
  const imgs = [...slider.querySelectorAll('img')];
  let visible = imgs.map(i => i.src.split('/').pop());
  setInterval(() => {
    const slot = Math.floor(Math.random() * imgs.length);
    const notVisible = pool.filter(p => !visible.includes(p));
    if (!notVisible.length) return;
    const next = notVisible[Math.floor(Math.random() * notVisible.length)];
    visible[slot] = next;
    const img = imgs[slot];
    img.style.transition = 'opacity .6s ease';
    img.style.opacity = '0';
    setTimeout(() => { img.src = base + next; img.style.opacity = '1'; }, 550);
  }, 3800);
})();

// Trabajo reciente: grid de 6 que rota entre el pool sin repetir en pantalla + lightbox
(function(){
  const grid = document.getElementById('casesGrid');
  if (!grid) return;
  const base = 'propias/opt/';
  const pool = ['001-norvell.jpg','002.jpg','003-lumea.jpg','003-roselilab.jpg','004-voxen.jpg',
                '005-bone-mesh.jpg','006-aptest.jpg','007-ikkaros.jpg','009-sounda.jpg','010-solartrade.jpg'];
  const cells = [...grid.querySelectorAll('.case-card')];
  const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };

  let visible = shuffle(pool).slice(0, cells.length); // 6 iniciales, todas distintas
  cells.forEach((c, i) => {
    const img = document.createElement('img');
    img.src = base + visible[i]; img.alt = ''; img.loading = 'lazy';
    c.appendChild(img);
    const cue = document.createElement('span');
    cue.className = 'zoomcue'; cue.innerHTML = '⤢'; c.appendChild(cue);
    c.dataset.src = visible[i];
    c.addEventListener('click', () => openLB(base + c.dataset.src));
  });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    setInterval(() => {
      // elige una celda al azar y la cambia por una imagen del pool que NO esté visible
      const slot = Math.floor(Math.random() * cells.length);
      const notVisible = pool.filter(p => !visible.includes(p));
      if (!notVisible.length) return;
      const next = notVisible[Math.floor(Math.random() * notVisible.length)];
      visible[slot] = next;
      const cell = cells[slot], img = cell.querySelector('img');
      img.style.opacity = '0';
      setTimeout(() => { img.src = base + next; cell.dataset.src = next; img.style.opacity = '1'; }, 500);
    }, 3200);
  }

  // Lightbox
  const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg');
  const openLB = src => { lbImg.src = src; lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); };
  const closeLB = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); };
  document.getElementById('lbClose').addEventListener('click', closeLB);
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
})();

// Typewriter: rota la palabra final (grupos que quieren crear/mejorar su marca)
const tw = document.getElementById('twword');
if (tw && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const words = ['emprendimiento', 'startup', 'empresa', 'marca'];
  let wi = 0, ci = 0, deleting = false;
  const tick = () => {
    const w = words[wi];
    ci += deleting ? -1 : 1;
    tw.textContent = w.slice(0, ci);
    let delay = deleting ? 45 : 90;
    if (!deleting && ci === w.length) { delay = 1500; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 1200);
}

// Preview del agente: cicla las 3 escenas con zoom + barra de progreso
const demo = document.querySelector('.agent-demo');
if (demo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const scenes = demo.querySelectorAll('.ad-scene');
  const bar = demo.querySelector('.ad-bar');
  const DUR = 3600;
  let sc = 0;
  const play = () => {
    scenes.forEach((s, i) => s.classList.toggle('is-on', i === sc));
    bar.style.transition = 'none';
    bar.style.width = '0';
    requestAnimationFrame(() => {
      bar.style.transition = `width ${DUR}ms linear`;
      bar.style.width = '100%';
    });
    sc = (sc + 1) % scenes.length;
  };
  play();
  setInterval(play, DUR);
}
