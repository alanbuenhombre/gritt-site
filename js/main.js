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
