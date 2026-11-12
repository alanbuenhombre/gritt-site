/* ═══ Capa lab: transiciones entre secciones (retícula que se ensambla en cada frontera) + lente de medición ═══ */
(function () {
  var c = document.getElementById('labFx'); if (!c) return;
  var x = c.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1), W, H;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  function rs() { W = innerWidth; H = innerHeight; c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); }
  rs(); addEventListener('resize', rs);
  var secs = [].slice.call(document.querySelectorAll('section[id]')).filter(function (s) { return s.id && s.id !== 'inicio'; });
  var meta = secs.map(function (s) {
    var i = s.querySelector('.sh-i, .cs-k'), sp = i ? i.querySelectorAll('span, b') : [];
    return { el: s, n: sp[0] ? sp[0].textContent.replace(/[()]/g, '') : '', t: sp[1] ? sp[1].textContent : s.id };
  });
  // modo suave (páginas de caso): menos puntos, sin lecturas y el lente se apaga sobre el texto
  var SOFT = c.dataset.mode === 'soft';
  var G = 16, B = SOFT ? 90 : 150, INK = '#161616', BA = SOFT ? 0.28 : 1, LA = SOFT ? 0.45 : 1;
  var TXT = 'p,h1,h2,h3,h4,dd,dt,li,blockquote,figcaption,.one,.quote,.lead,.ch-l,.gc-b,.dv-b,.film-t,.bcard,.facts,.chap-d,.res';
  var overTxt = false, lv = 1;
  // ruido estable por celda para que la retícula "se ensamble"
  function hs(a, b) { var h = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return h - Math.floor(h); }
  var mx = -1e4, my = -1e4, lx = -1e4, ly = -1e4, last = -1e9;
  if (fine) addEventListener('pointermove', function (e) { mx = e.clientX; my = e.clientY; if (lx < -1e3) { lx = mx; ly = my; } last = performance.now(); if (SOFT) overTxt = !!(e.target.closest && e.target.closest(TXT)); }, { passive: true });
  function pad(v, n) { v = String(Math.max(0, Math.round(v))); while (v.length < n) v = '0' + v; return v; }
  function frame(t) {
    requestAnimationFrame(frame);
    x.clearRect(0, 0, W, H);
    var sy = window.scrollY, off = sy % G;
    x.fillStyle = INK; x.strokeStyle = INK;
    x.font = '500 9px "IBM Plex Mono", ui-monospace, monospace';
    // 1 · fronteras entre secciones
    for (var k = 0; k < meta.length; k++) {
      var yb = meta[k].el.getBoundingClientRect().top;
      if (yb < -B || yb > H + B) continue;
      var v = 1 - Math.min(1, Math.abs(yb - H * 0.55) / (H * 0.55)); // 1 cuando la frontera pasa por el centro
      if (v <= 0.02) continue;
      var ve = v * v * (3 - 2 * v);
      var y0 = Math.floor((yb - B + off) / G) * G - off;
      for (var gy = y0; gy <= yb + B; gy += G) {
        var dyn = Math.abs(gy - yb) / B; if (dyn > 1) continue;
        var row = Math.round((gy + sy) / G);
        for (var gx = G / 2; gx < W; gx += G) {
          var col = Math.round(gx / G), r = hs(col, row);
          var thr = ve * 1.15 - dyn * 0.9;           // la banda se llena desde la línea hacia afuera
          if (r > thr) continue;
          var drift = (1 - ve) * (r - 0.5) * 60;     // los puntos llegan desde fuera y se alinean
          x.globalAlpha = (1 - dyn) * (1 - dyn) * 0.5 * ve * BA;
          x.fillRect(gx + drift - 0.6, gy - 0.6, 1.2, 1.2);
        }
      }
      // línea de corte que se dibuja desde el centro
      var half = W * 0.5 * ve;
      x.globalAlpha = 0.22 * ve * BA; x.fillRect(W / 2 - half, Math.round(yb) - 0.5, half * 2, 1);
      // lectura
      if (W > 760 && !SOFT) {
        x.globalAlpha = 0.65 * ve;
        var lbl = (meta[k].n ? meta[k].n + ' · ' : '') + meta[k].t.toUpperCase();
        x.textAlign = 'right'; x.fillText(lbl + '  ↓', W - 48, yb - 10);
        x.textAlign = 'left'; x.fillText('Y ' + pad(yb + sy, 5) + '  ·  ' + pad(ve * 100, 3) + '%', 48, yb - 10);
      }
    }
    // 2 · lente de medición alrededor del cursor (solo con mouse)
    if (fine && t - last < 2200 && !RM) {
      lx += (mx - lx) * 0.12; ly += (my - ly) * 0.12;
      lv += ((SOFT && overTxt ? 0 : 1) - lv) * 0.15;
      var R = 120, fade = Math.min(1, (2200 - (t - last)) / 600) * lv * LA;
      var gx0 = Math.floor((lx - R) / G) * G + G / 2, gy0 = Math.floor((ly - R + off) / G) * G - off;
      for (var ax = gx0; ax <= lx + R; ax += G) for (var ay = gy0; ay <= ly + R; ay += G) {
        var dx = ax - lx, dy = ay - ly, d = Math.sqrt(dx * dx + dy * dy); if (d > R) continue;
        var q = 1 - d / R, push = q * q * 7;
        x.globalAlpha = q * q * 0.5 * fade;
        x.fillRect(ax + (d ? dx / d * push : 0) - 0.6, ay + (d ? dy / d * push : 0) - 0.6, 1.2, 1.2);
      }
      x.globalAlpha = 0.14 * fade; x.setLineDash([2, 5]); x.beginPath(); x.arc(lx, ly, R, 0, 6.2832); x.stroke(); x.setLineDash([]);
      if (!SOFT) {
        x.globalAlpha = 0.5 * fade; x.textAlign = 'left';
        x.fillText('X ' + pad(lx, 4) + '  Y ' + pad(ly + sy, 5), lx + R * 0.74, ly - R * 0.74);
      }
    }
    x.globalAlpha = 1;
  }
  requestAnimationFrame(frame);
})();
