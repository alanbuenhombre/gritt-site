/* Gritt · movimiento de la home (v6)
   Scroll suave, reel que se expande, títulos que se encienden, imágenes que se arman,
   carril horizontal de casos del Lab, etapas del Lab fijas y el logo original en partículas.
   Paleta e tipografías de Gritt. Sin dependencias salvo Lenis (opcional). */
(function () {
  'use strict';
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DPR = Math.min(2, window.devicePixelRatio || 1);
  var root = document.documentElement;
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function W() { return root.clientWidth; }
  function H() { return window.innerHeight; }

  /* ── Scroll suave (Lenis) ── */
  var lenis = null;
  if (!RM && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      lenis.start();
      lenis.scrollTo(t, { offset: -64 });
      history.replaceState(null, '', id);
    });
    var mm = document.getElementById('mmenu');
    if (mm) new MutationObserver(function () { mm.classList.contains('open') ? lenis.stop() : lenis.start(); }).observe(mm, { attributes: true, attributeFilter: ['class'] });
  }

  /* ── Títulos: palabra por palabra ── */
  var heads = [];
  document.querySelectorAll('.sh-t, .ct h2').forEach(function (h) {
    var words = [];
    (function walk(n) {
      [].slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var f = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { f.appendChild(document.createTextNode(t)); return; }
            var s = document.createElement('span'); s.className = 'w'; s.textContent = t; f.appendChild(s); words.push(s);
          });
          c.parentNode.replaceChild(f, c);
        } else if (c.nodeType === 1) walk(c);
      });
    })(h);
    heads.push({ el: h, words: words, lit: -1 });
  });
  function updHeads() {
    var vh = H();
    heads.forEach(function (o) {
      var r = o.el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) return;
      var p = RM ? 1 : clamp((vh * 0.92 - r.top) / (vh * 0.42), 0, 1);
      var lit = Math.round(p * o.words.length);
      if (lit === o.lit) return;
      o.lit = lit;
      o.words.forEach(function (w, i) { w.classList.toggle('on', i < lit); });
    });
  }

  /* ── Imágenes que se arman por bloques ── */
  function bgOf(el) {
    for (var n = el.parentElement; n; n = n.parentElement) {
      var c = getComputedStyle(n).backgroundColor;
      if (c && c !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(c)) return c;
    }
    return '#F2F2F0';
  }
  if (!RM && 'IntersectionObserver' in window) {
    var pio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var o = e.target.querySelector(':scope > .pxo'); pio.unobserve(e.target);
        if (!o) return;
        requestAnimationFrame(function () { o.classList.add('go'); });
        setTimeout(function () { o.remove(); }, 1500);
      });
    }, { threshold: 0.28 });
    document.querySelectorAll('.case .cm, .chap-m, .bx-im, .svc-m figure').forEach(function (el) {
      var r = el.getBoundingClientRect(), w = r.width || 300, h = r.height || 200;
      var cols = 10, rows = Math.max(3, Math.round(cols * h / w));
      var o = document.createElement('div'); o.className = 'pxo';
      o.style.gridTemplateColumns = 'repeat(' + cols + ',1fr)';
      o.style.gridTemplateRows = 'repeat(' + rows + ',1fr)';
      o.style.setProperty('--pxc', bgOf(el));
      for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
        var i = document.createElement('i');
        i.style.transitionDelay = ((x / cols) * 0.35 + Math.random() * 0.4).toFixed(3) + 's';
        o.appendChild(i);
      }
      el.appendChild(o); pio.observe(el);
    });
  }

  /* ── Reel que se expande ── */
  var xp = document.getElementById('xpand'), xpWrap = document.querySelector('.hero .wrap');
  var xpLast = '';
  function updXp() {
    if (!xp || !xp.classList.contains('on')) return;
    var vw = W(), vh = H(), r = xp.getBoundingClientRect();
    var cs = getComputedStyle(xpWrap), wr = xpWrap.getBoundingClientRect();
    var fx0 = wr.left + parseFloat(cs.paddingLeft), fw0 = vw - 2 * fx0;
    var fh0 = vw <= 860 ? fw0 * 1.25 : fw0 / 2;
    if (fh0 > vh) fh0 = vh;
    // el bloque sube para que el reel quede donde estaba; al fijarse queda centrado y crece hacia los bordes
    var gap = Math.min(56, Math.max(36, vw * .05)), mt = gap - (vh - fh0) / 2;
    if (Math.abs(parseFloat(xp.style.marginTop || 0) - mt) > .5) xp.style.marginTop = mt + 'px';
    var p = clamp(-r.top / (0.72 * (r.height - vh)), 0, 1), e = ease(p);
    var fx = fx0 * (1 - e), fh = fh0 + (vh - fh0) * e, xc = clamp((p - 0.82) / 0.14, 0, 1);
    var key = mt.toFixed(1) + '|' + fx.toFixed(1) + '|' + fh.toFixed(1) + '|' + xc.toFixed(2);
    if (key === xpLast) return; xpLast = key;
    xp.style.setProperty('--fx', fx + 'px');
    xp.style.setProperty('--fw', (vw - 2 * fx) + 'px');
    xp.style.setProperty('--fh', fh + 'px');
    xp.style.setProperty('--fr', (14 * (1 - e)) + 'px');
    xp.style.setProperty('--xc', xc);
    xp.style.setProperty('--fx-in', fx0 + 'px');
    xp.classList.toggle('full', xc > 0.6);
  }
  if (xp && !RM) xp.classList.add('on');

  /* ── Carril horizontal de casos del Lab ── */
  var hz = document.getElementById('hz'), hzT = document.getElementById('hzTrack'), hzDist = 0;
  var hzBar = document.getElementById('hzBar'), hzN = document.getElementById('hzN'), hzTot = document.getElementById('hzT');
  function hzVisible() { return [].filter.call(hzT.children, function (c) { return !c.classList.contains('hide'); }); }
  function hzLayout() {
    if (!hz) return;
    var n = hzVisible().length;
    if (hzTot) hzTot.textContent = ('0' + n).slice(-2);
    var want = !RM && W() > 860;
    hz.classList.toggle('on', want);
    hzT.style.transform = '';
    if (!want) { hz.style.height = ''; hzDist = 0; return; }
    hzDist = Math.max(0, hzT.scrollWidth - W());
    if (hzDist < 8) { hz.classList.remove('on'); hz.style.height = ''; hzDist = 0; return; }
    hz.style.height = (hzDist + H()) + 'px';
  }
  function updHz() {
    if (!hz || !hz.classList.contains('on') || !hzDist) return;
    // medidas en vivo: si la ventana cambió (zoom, resize, prerender) el carril se ajusta solo
    var live = Math.max(0, hzT.scrollWidth - W());
    if (Math.abs(live - hzDist) > 2 || Math.abs(hz.offsetHeight - (live + H())) > 2) {
      hzDist = live;
      if (hzDist < 8) { hzLayout(); return; }
      hz.style.height = (hzDist + H()) + 'px';
      if (lenis) lenis.resize();
    }
    // el avance se mide sobre el tramo fijado real: la última tarjeta llega justo al final
    var r = hz.getBoundingClientRect(), span = Math.max(1, r.height - H()), p = clamp(-r.top / span, 0, 1);
    hzT.style.transform = 'translate3d(' + (-p * hzDist).toFixed(1) + 'px,0,0)';
    hzBar.style.setProperty('--hp', (p * 100).toFixed(2) + '%');
    var n = hzVisible().length;
    if (hzN) hzN.textContent = ('0' + (Math.round(p * (n - 1)) + 1)).slice(-2);
  }
  document.addEventListener('casesfilter', function () { hzLayout(); if (lenis) lenis.resize(); });

  /* ── Logo original en partículas ── */
  var LOGO = new Image(); LOGO.src = 'logos/gritt-white.png';
  function sample(bx, by, bw, bh, step) {
    var r = LOGO.naturalWidth / LOGO.naturalHeight, lw = bw, lh = bw / r;
    if (lh > bh) { lh = bh; lw = bh * r; }
    var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(lw)); c.height = Math.max(1, Math.round(lh));
    var x = c.getContext('2d'); x.drawImage(LOGO, 0, 0, c.width, c.height);
    var d = x.getImageData(0, 0, c.width, c.height).data, out = [], ox = bx + (bw - lw) / 2, oy = by + (bh - lh) / 2;
    for (var y = step / 2; y < c.height; y += step) for (var xx = step / 2; xx < c.width; xx += step) {
      var i = ((y | 0) * c.width + (xx | 0)) * 4;
      if (d[i + 3] > 150) out.push([ox + xx + (Math.random() - .5) * step * .3, oy + y + (Math.random() - .5) * step * .3]);
    }
    return out;
  }
  function Field(cv, o) {
    this.cv = cv; this.ctx = cv.getContext('2d'); this.o = o; this.m = o.m0 || 0; this.tgt = this.m;
    this.mx = -1e4; this.my = -1e4; this.ps = []; this.w = 0; this.h = 0; this.vis = false;
    var self = this, hov = o.hover || cv;
    hov.addEventListener('pointermove', function (e) { var r = cv.getBoundingClientRect(); self.mx = e.clientX - r.left; self.my = e.clientY - r.top; });
    hov.addEventListener('pointerleave', function () { self.mx = self.my = -1e4; });
  }
  Field.prototype.build = function () {
    var w = this.cv.clientWidth, h = this.cv.clientHeight;
    if (!w || !h || !LOGO.naturalWidth) return false;
    this.w = w; this.h = h; this.cv.width = Math.round(w * DPR); this.cv.height = Math.round(h * DPR);
    var b = this.o.box(w, h), step = Math.max(3, b.w / this.o.dens);
    this.rr = Math.min(this.o.r, step * .3);
    var L = sample(b.x, b.y, b.w, b.h, step), N = L.length;
    L.sort(function (a, c) { return a[0] - c[0]; });
    var G = L;
    if (this.o.grid) {
      var g = this.o.grid(w, h), cols = Math.round(Math.sqrt(N * g.w / g.h)), rows = Math.ceil(N / cols);
      var sp = Math.min(g.w / cols, g.h / rows), gx = g.x + (g.w - sp * (cols - 1)) / 2, gy = g.y + (g.h - sp * (rows - 1)) / 2;
      G = [];
      for (var k = 0; k < N; k++) G.push([gx + (k % cols) * sp, gy + Math.floor(k / cols) * sp]);
      G.sort(function (a, c) { return a[0] - c[0] || a[1] - c[1]; });
    }
    var ps = [];
    for (var i = 0; i < N; i++) {
      ps.push({ sx: Math.random() * w, sy: Math.random() * h, gx: G[i][0], gy: G[i][1], lx: L[i][0], ly: L[i][1],
        ph: Math.random() * 6.28, sp: .6 + Math.random() * .8, d: Math.random() * .6, ox: 0, oy: 0, acc: Math.random() < .07 });
    }
    this.ps = ps; return true;
  };
  Field.prototype.draw = function (t) {
    if (!this.ps.length && !this.build()) return;
    this.m += (this.tgt - this.m) * (this.o.k || .08);
    var c = this.ctx, m = this.m, R = this.o.repel || 0, mx = this.mx, my = this.my, rad = this.rr || this.o.r;
    c.setTransform(DPR, 0, 0, DPR, 0, 0); c.clearRect(0, 0, this.w, this.h);
    var A = [], B = [];
    for (var i = 0; i < this.ps.length; i++) {
      var p = this.ps[i];
      var sx = p.sx + Math.sin(t * .00045 * p.sp + p.ph) * 16, sy = p.sy + Math.cos(t * .0004 * p.sp + p.ph) * 16, x, y;
      if (m <= 1) { var a = ease(clamp(m * 1.6 - p.d, 0, 1)); x = sx + (p.gx - sx) * a; y = sy + (p.gy - sy) * a; }
      else { var b = ease(clamp((m - 1) * 1.6 - p.d, 0, 1)); x = p.gx + (p.lx - p.gx) * b; y = p.gy + (p.ly - p.gy) * b; }
      if (R) {
        var dx = x - mx, dy = y - my, dd = Math.sqrt(dx * dx + dy * dy), tx = 0, ty = 0;
        if (dd < R && dd > .01) { var f = (1 - dd / R) * R * .45; tx = dx / dd * f; ty = dy / dd * f; }
        p.ox += (tx - p.ox) * .14; p.oy += (ty - p.oy) * .14; x += p.ox; y += p.oy;
      }
      (p.acc ? B : A).push(x, y);
    }
    c.fillStyle = this.o.col; c.beginPath();
    for (var j = 0; j < A.length; j += 2) { c.moveTo(A[j] + rad, A[j + 1]); c.arc(A[j], A[j + 1], rad, 0, 6.2832); }
    c.fill();
    c.fillStyle = this.o.acc; c.beginPath();
    for (var q = 0; q < B.length; q += 2) { c.moveTo(B[q] + rad * 1.25, B[q + 1]); c.arc(B[q], B[q + 1], rad * 1.25, 0, 6.2832); }
    c.fill();
  };
  var fields = [];
  function watch(f, el) {
    fields.push(f);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { f.vis = es[0].isIntersecting; }, { rootMargin: '120px' }).observe(el);
    else f.vis = true;
    if ('ResizeObserver' in window) new ResizeObserver(function () { f.ps = []; }).observe(f.cv);
  }

  // Hero: el logo se arma desde la dispersión cada vez que abre el reel
  var intro = document.querySelector('.intro'), icv = document.getElementById('introViz'), fIntro = null;
  if (intro && icv) {
    fIntro = new Field(icv, { col: 'rgba(237,237,233,.92)', acc: '#8EA9FF', r: 1.15, dens: 95, k: .045,
      box: function (w, h) { return { x: w * .237, y: h * .273, w: w * .526, h: h * .455 }; } });
    watch(fIntro, intro);
    var replay = function () { fIntro.m = 0; fIntro.tgt = 0; setTimeout(function () { fIntro.tgt = 1; }, 250); };
    new MutationObserver(function () { if (intro.classList.contains('active') && !intro.classList.contains('hold')) replay(); })
      .observe(intro, { attributes: true, attributeFilter: ['class'] });
    if (RM) { fIntro.m = fIntro.tgt = 1; } else replay();
  }

  // El Lab: dispersión (Explorando) → retícula (Prototipo) → logo (Con clientes)
  var lpin = document.getElementById('lpin'), lcv = document.getElementById('labViz'), fLab = null;
  var stages = lpin ? [].slice.call(lpin.querySelectorAll('.stage')) : [];
  var lvN = document.getElementById('lvN'), lvT = document.getElementById('lvT'), lvD = lpin ? lpin.querySelectorAll('.lviz-d i') : [];
  var NAMES = ['Explorando', 'Prototipo', 'Con clientes'], curStage = -1;
  if (lcv) {
    fLab = new Field(lcv, { col: "rgba(237,237,233,.85)", acc: "#8EA9FF", r: 1.45, dens: 104, repel: 70, k: .07,
      hover: lcv.parentElement,
      box: function (w, h) { return { x: -w * .02, y: h * .06, w: w * 1.04, h: h * .8 }; },
      grid: function (w, h) { return { x: w * .1, y: h * .08, w: w * .8, h: h * .78 }; } });
    watch(fLab, lcv);
  }
  function setStage(i) {
    if (i === curStage) return; curStage = i;
    stages.forEach(function (s, k) { s.classList.toggle('on', k === i); });
    if (lvN) lvN.textContent = '0' + (i + 1) + ' / 03';
    if (lvT) lvT.textContent = NAMES[i];
    [].forEach.call(lvD, function (d, k) { d.classList.toggle('on', k <= i); });
  }
  function lpinLayout() { if (lpin) lpin.classList.toggle('on', !RM && W() > 960); }
  function updLab(t) {
    if (!fLab) return;
    if (RM) { fLab.tgt = fLab.m = 2; setStage(2); return; }
    if (lpin.classList.contains('on')) {
      var r = lpin.getBoundingClientRect(), p = clamp(-r.top / (r.height - H()), 0, 1);
      fLab.tgt = clamp((p - .1) / .26, 0, 1) + clamp((p - .5) / .26, 0, 1);
      setStage(p < .36 ? 0 : p < .72 ? 1 : 2);
    } else {
      var st = Math.floor(t / 3400) % 3;
      fLab.tgt = st; setStage(st);
    }
  }

  // Footer: gritt gigante que se arma al llegar y se aparta con el cursor
  var gf = document.querySelector('.gfoot'), gcv = document.getElementById('footViz'), fFoot = null;
  if (gf && gcv) {
    fFoot = new Field(gcv, { col: 'rgba(237,237,233,.9)', acc: '#8EA9FF', r: 1.7, dens: 120, repel: 90, k: .05, hover: gf,
      box: function (w, h) { return { x: w * (.1 / 1.2), y: h * (.12 / 1.24), w: w / 1.2, h: h / 1.24 }; } });
    watch(fFoot, gf);
    if (RM) fFoot.m = fFoot.tgt = 1;
    else new IntersectionObserver(function (es) { if (es[0].isIntersecting) fFoot.tgt = 1; }, { threshold: .35 }).observe(gf);
  }
  function markReady() { if (intro) intro.classList.add('pv'); if (gf) gf.classList.add('pv'); }
  if (LOGO.complete && LOGO.naturalWidth) markReady(); else LOGO.addEventListener('load', markReady);

  /* ── Servicios: el índice marca la línea que estás viendo ── */
  var svx = [].slice.call(document.querySelectorAll('.svx a')), svcs = svx.map(function (a) { return document.querySelector(a.getAttribute('href')); }), svCur = 0;
  function updSvx() {
    if (!svx.length) return;
    var vh = H(), best = 0;
    svcs.forEach(function (c, i) { if (c && c.getBoundingClientRect().top < vh * 0.45) best = i; });
    if (best === svCur) return; svCur = best;
    svx.forEach(function (a, i) { a.classList.toggle('on', i === best); });
  }

  /* ── Capa lab: regla con lectura de avance y sección actual ── */
  var lrM = document.getElementById('lrM'), lsN = document.getElementById('lsN'), lsT = document.getElementById('lsT');
  var SECS = [['inicio', 'Inicio'], ['servicios', 'Servicios'], ['lab', 'El Lab'], ['por-que', 'Por qué'], ['contacto', 'Contacto']]
    .map(function (x) { return [document.getElementById(x[0]), x[1]]; }).filter(function (x) { return x[0]; });
  var lrLast = -1, secLast = -1, lastY = -1, idleT = 0;
  function updRule() {
    if (!lrM) return;
    // la lectura aparece solo mientras haces scroll; al detenerte se apaga para leer tranquilo
    if (window.scrollY !== lastY) {
      lastY = window.scrollY; document.body.classList.remove('lab-idle');
      clearTimeout(idleT); idleT = setTimeout(function () { document.body.classList.add('lab-idle'); }, 1100);
    }
    var max = root.scrollHeight - H(), p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0, v = Math.round(p * 100);
    if (v !== lrLast) { lrLast = v; lrM.style.setProperty('--lp', (p * 100).toFixed(2) + '%'); lrM.setAttribute('data-v', ('00' + v).slice(-3)); }
    var cur = 0; SECS.forEach(function (x, i) { if (x[0].getBoundingClientRect().top < H() * .4) cur = i; });
    if (cur !== secLast) { secLast = cur; lsN.textContent = ('0' + cur).slice(-2); lsT.textContent = SECS[cur][1]; }
  }

  /* ── Bucle único ── */
  function layout() { hzLayout(); lpinLayout(); xpLast = ''; if (lenis) lenis.resize(); }
  addEventListener('resize', layout);
  addEventListener('load', layout);
  layout();
  function frame(t) {
    if (lenis) lenis.raf(t);
    updXp(); updHz(); updLab(t); updHeads(); updSvx(); updRule();
    fields.forEach(function (f) { if (f.vis) f.draw(t); });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

