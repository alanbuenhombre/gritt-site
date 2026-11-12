/* Gritt Reports — prototipo interactivo para el caso de estudio.
   Datos de prueba generados con semilla: no hay clientes reales detrás. */
'use strict';
(function () {
  const root = document.getElementById('grApp');
  if (!root) return;

  /* ---------- textos ES / EN ---------- */
  const L = {
    es: {
      nav: { resumen: 'Resumen', contenido: 'Contenido', audiencia: 'Audiencia', pauta: 'Pauta' },
      clients: 'Clientes', studio: 'Estudio Gritt', plan: 'Plan estudio · 3 de 10 clientes',
      period: { 7: '7 días', 30: '30 días', 90: '90 días' },
      vsPrev: 'vs. periodo anterior',
      metrics: { reach: 'Alcance', views: 'Visualizaciones', inter: 'Interacciones', follows: 'Seguidores nuevos' },
      metricSub: { reach: 'cuentas únicas', views: 'reproducciones y vistas', inter: 'likes, comentarios, guardados', follows: 'netos en el periodo' },
      evo: 'Evolución', prev: 'Periodo anterior', current: 'Este periodo', tapHint: 'Toca una tarjeta para cambiar la métrica',
      insights: 'Lectura del periodo', split: 'Por plataforma',
      clientView: 'Vista cliente', adminView: 'Vista estudio', share: 'Compartir',
      shareTitle: 'Link del reporte', expires: 'Expira en 30 días', password: 'Proteger con contraseña', copy: 'Copiar link', copied: 'Link copiado · demo',
      next: 'Próximo envío', nextTxt: 'Lunes · 9:00 a. m. · resumen por email a 2 contactos',
      demo: 'Demo · datos de prueba',
      posts: 'Publicaciones', all: 'Todas', sortViews: 'Más vistas', sortEr: 'Más interacción',
      er: 'interacción', viewsShort: 'vistas',
      age: 'Edad', gender: 'Género', women: 'Mujeres', men: 'Hombres', other: 'Otro', cities: 'Ciudades principales',
      budget: 'Presupuesto del periodo', spent: 'invertido', of: 'de', campaigns: 'Campañas', result: 'resultados', perResult: 'por resultado',
      weekly: 'Inversión por semana', wk: 'S', active: 'Cuándo está activa la audiencia', less: 'menos', more: 'más', paidVsOrg: 'Alcance pagado vs. orgánico', paid: 'Pagado', organic: 'Orgánico',
      reportFor: 'Reporte de redes', preparedBy: 'Preparado por Gritt Studio', reportIntro: (c, p) => `Así le fue a ${c} en los últimos ${p}. Lo importante primero; el detalle, abajo.`,
      top3: 'Lo que mejor funcionó',
      ins: {
        growth: (m, d) => `${m} ${d >= 0 ? 'subió' : 'bajó'} <strong>${Math.abs(d).toFixed(1)}%</strong> frente al periodo anterior.`,
        lead: (p, s) => `<strong>${p}</strong> aporta el ${s}% del alcance: es el canal que hoy mueve la cuenta.`,
        format: (f, x) => `Los <strong>${f}</strong> logran ${x}× más vistas que el promedio de publicaciones.`,
        day: (d) => `El mejor día para publicar fue el <strong>${d}</strong>.`
      },
      days: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      fmt: { reel: 'Reels', carrusel: 'Carruseles', video: 'Videos', foto: 'Fotos' },
      fmtOne: { reel: 'Reel', carrusel: 'Carrusel', video: 'Video', foto: 'Foto' },
      empty: 'Activa al menos una plataforma para ver datos.'
    },
    en: {
      nav: { resumen: 'Overview', contenido: 'Content', audiencia: 'Audience', pauta: 'Paid' },
      clients: 'Clients', studio: 'Gritt Studio', plan: 'Studio plan · 3 of 10 clients',
      period: { 7: '7 days', 30: '30 days', 90: '90 days' },
      vsPrev: 'vs. previous period',
      metrics: { reach: 'Reach', views: 'Views', inter: 'Interactions', follows: 'New followers' },
      metricSub: { reach: 'unique accounts', views: 'plays and views', inter: 'likes, comments, saves', follows: 'net in period' },
      evo: 'Trend', prev: 'Previous period', current: 'This period', tapHint: 'Tap a card to switch the metric',
      insights: 'Period readout', split: 'By platform',
      clientView: 'Client view', adminView: 'Studio view', share: 'Share',
      shareTitle: 'Report link', expires: 'Expires in 30 days', password: 'Password protect', copy: 'Copy link', copied: 'Link copied · demo',
      next: 'Next send', nextTxt: 'Monday · 9:00 a.m. · email summary to 2 contacts',
      demo: 'Demo · test data',
      posts: 'Posts', all: 'All', sortViews: 'Most viewed', sortEr: 'Most engaging',
      er: 'engagement', viewsShort: 'views',
      age: 'Age', gender: 'Gender', women: 'Women', men: 'Men', other: 'Other', cities: 'Top cities',
      budget: 'Period budget', spent: 'spent', of: 'of', campaigns: 'Campaigns', result: 'results', perResult: 'per result',
      weekly: 'Spend per week', wk: 'W', active: 'When the audience is active', less: 'less', more: 'more', paidVsOrg: 'Paid vs. organic reach', paid: 'Paid', organic: 'Organic',
      reportFor: 'Social report', preparedBy: 'Prepared by Gritt Studio', reportIntro: (c, p) => `Here is how ${c} did over the last ${p}. What matters first; details below.`,
      top3: 'What worked best',
      ins: {
        growth: (m, d) => `${m} ${d >= 0 ? 'grew' : 'dropped'} <strong>${Math.abs(d).toFixed(1)}%</strong> against the previous period.`,
        lead: (p, s) => `<strong>${p}</strong> drives ${s}% of reach: it is the channel moving the account today.`,
        format: (f, x) => `<strong>${f}</strong> get ${x}× more views than the average post.`,
        day: (d) => `The best day to post was <strong>${d}</strong>.`
      },
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      fmt: { reel: 'Reels', carrusel: 'Carousels', video: 'Videos', foto: 'Photos' },
      fmtOne: { reel: 'Reel', carrusel: 'Carousel', video: 'Video', foto: 'Photo' },
      empty: 'Turn on at least one platform to see data.'
    }
  };
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'es');
  const t = () => L[lang()];

  /* ---------- datos de prueba ---------- */
  const CLIENTS = {
    atlas: { name: 'Atlas Outdoor', sector: 'Outdoor gear', seed: 11, scale: 1.0, mix: { ig: 0.55, tk: 0.35, fb: 0.10 }, slug: 'atlas' },
    norte: { name: 'Norte Café', sector: 'Specialty coffee', seed: 29, scale: 0.42, mix: { ig: 0.62, tk: 0.18, fb: 0.20 }, slug: 'norte' },
    vela:  { name: 'Vela Yoga', sector: 'Wellness studio', seed: 47, scale: 0.24, mix: { ig: 0.70, tk: 0.22, fb: 0.08 }, slug: 'vela' }
  };
  const PLAT = { ig: 'Instagram', tk: 'TikTok', fb: 'Facebook' };
  const PLAT_SHORT = { ig: 'IG', tk: 'TK', fb: 'FB' };
  const BASE = { reach: 5200, views: 9800, inter: 640, follows: 26 };

  function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

  // Serie diaria de 180 días por cliente/plataforma/métrica: los últimos N son el periodo actual,
  // los N anteriores el periodo de comparación.
  const cache = {};
  function series(cid, p, m) {
    const k = cid + p + m;
    if (cache[k]) return cache[k];
    const c = CLIENTS[cid];
    const r = rng(c.seed * 97 + p.charCodeAt(0) * 13 + m.length * 7);
    const out = [];
    const trend = 0.0022 + (c.seed % 5) * 0.0005 + (p === 'tk' ? 0.0018 : p === 'fb' ? -0.0016 : 0) + ({ reach: 0, views: 0.0011, inter: -0.0019, follows: 0.0026 })[m] * (1 + (c.seed % 3) * 0.4);
    for (let i = 0; i < 180; i++) {
      const dow = i % 7;
      const weekly = dow === 2 || dow === 4 ? 1.22 : dow === 0 ? 0.78 : 1;
      const spike = r() > 0.93 ? 1.6 + r() * 1.1 : 1;
      const v = BASE[m] * c.scale * c.mix[p] * (1 + trend * i) * weekly * spike * (0.82 + r() * 0.36);
      out.push(v);
    }
    return (cache[k] = out);
  }
  function combined(cid, plats, m, n, offset) {
    const arr = new Array(n).fill(0);
    plats.forEach(p => {
      const s = series(cid, p, m);
      const start = 180 - n - offset;
      for (let i = 0; i < n; i++) arr[i] += s[start + i];
    });
    return arr;
  }
  const sum = a => a.reduce((x, y) => x + y, 0);

  function posts(cid) {
    const c = CLIENTS[cid];
    const r = rng(c.seed * 5 + 3);
    const titles = {
      atlas: ['Ruta al páramo en 3 minutos', 'Qué empacar para un día de lluvia', 'Prueba de la chaqueta en 2.800 m', 'El equipo detrás de cada mochila', 'Amanecer en el nevado', 'Guía rápida de botas', 'Unboxing de la nueva línea', 'Comunidad: tus fotos de octubre'],
      norte: ['Del grano a la taza en 60 s', 'Latte art: tulipán paso a paso', 'Origen Huila, nuevo lote', 'Una mañana en la tostadora', 'Tres métodos, un mismo café', 'Brunch de domingo', 'Conoce a nuestro barista', 'Promo: 2x1 en filtrados'],
      vela:  ['Respiración de 4 minutos', 'Flujo para la espalda baja', 'Nuevo horario de clases', 'Así es nuestra sala', 'Postura del mes: guerrero II', 'Clase abierta del sábado', 'Testimonio: Laura, 6 meses', 'Playlist para practicar']
    }[cid];
    const fmts = ['reel', 'carrusel', 'video', 'foto'];
    const pl = ['ig', 'tk', 'ig', 'fb', 'ig', 'tk', 'ig', 'ig'];
    return titles.map((title, i) => {
      const f = i % 3 === 0 ? 'reel' : fmts[Math.floor(r() * 4)];
      const p = f === 'video' ? 'tk' : pl[i];
      const mult = f === 'reel' ? 2.4 : f === 'video' ? 1.9 : f === 'carrusel' ? 1.1 : 0.7;
      const views = Math.round(BASE.views * c.scale * mult * (0.6 + r() * 1.2) * 1.4);
      const er = +(2.2 + r() * 5.8 + (f === 'carrusel' ? 1.4 : 0)).toFixed(1);
      return { title, f, p, views, er, hue: Math.floor(r() * 360) };
    });
  }

  /* ---------- formato ---------- */
  function compact(n) {
    const lg = lang();
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace('.', lg === 'es' ? ',' : '.') + 'M';
    if (n >= 1e4) return Math.round(n / 1e3) + 'K';
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace('.', lg === 'es' ? ',' : '.') + 'K';
    return Math.round(n).toString();
  }
  const money = n => '$' + Math.round(n).toLocaleString(lang() === 'es' ? 'es-CO' : 'en-US');
  const pct = (a, b) => (b ? ((a - b) / b) * 100 : 0);

  /* ---------- estado ---------- */
  const state = { client: 'atlas', view: 'resumen', period: 30, plats: { ig: true, tk: true, fb: true }, metric: 'reach', mode: 'studio', fmt: 'all', sort: 'views', share: false };
  const activePlats = () => Object.keys(state.plats).filter(k => state.plats[k]);

  /* ---------- helpers de render ---------- */
  const el = (sel) => root.querySelector(sel);
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp() {
    root.querySelectorAll('[data-count]').forEach(node => {
      const to = +node.dataset.count;
      const kind = node.dataset.kind || 'compact';
      const f = v => (kind === 'money' ? money(v) : kind === 'int' ? Math.round(v).toLocaleString() : compact(v));
      if (reduce) { node.textContent = f(to); return; }
      const from = +(node.dataset.from || 0);
      const t0 = performance.now(); const dur = 700;
      const step = now => {
        const k = Math.min(1, (now - t0) / dur); const e = 1 - Math.pow(1 - k, 3);
        node.textContent = f(from + (to - from) * e);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  // mini cápsulas: últimos 10 tramos del periodo
  function spark(arr, w = 78, h = 26) {
    const src = arr.length > 10 ? arr.slice(-10) : arr;
    const mx = Math.max(...src), mn = Math.min(...src) * 0.6;
    const n = src.length, gap = 3, bw = (w - gap * (n - 1)) / n;
    const hi = src.indexOf(Math.max(...src));
    return `<svg viewBox="0 0 ${w} ${h}" aria-hidden="true">${src.map((v, i) => {
      const bh = Math.max(4, ((v - mn) / (mx - mn || 1)) * h);
      return `<rect class="${i === hi ? 'is-hi' : ''}" x="${(i * (bw + gap)).toFixed(1)}" y="${(h - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="${(bw / 2).toFixed(1)}" style="animation-delay:${i * 35}ms"/>`;
    }).join('')}</svg>`;
  }

  function rings() {
    return `<svg class="gr-deco" viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width=".6">${[90, 74, 58, 42, 26].map((r, i) => `<circle cx="100" cy="100" r="${r}" ${i % 2 ? 'stroke-dasharray="2 4"' : ''}/>`).join('')}<line x1="10" y1="100" x2="190" y2="100" stroke-dasharray="1 5"/></g></svg>`;
  }

  // agrega días a buckets para que 90 días no sean 90 puntos
  function bucket(arr) {
    const size = arr.length > 45 ? 7 : arr.length > 14 ? 1 : 1;
    if (size === 1) return arr;
    const out = []; for (let i = 0; i < arr.length; i += size) out.push(sum(arr.slice(i, i + size)));
    return out;
  }

  // media móvil de 3 puntos: la tendencia se lee mejor que el ruido diario
  function smooth(arr) {
    if (arr.length < 10) return arr;
    return arr.map((v, i) => (arr[Math.max(0, i - 1)] + v + arr[Math.min(arr.length - 1, i + 1)]) / 3);
  }

  const CH = { W: 640, H: 200, t: 18, b: 2 };
  function chartGeom(cur, prev) {
    const a = bucket(cur), b = bucket(prev);
    const mx = Math.max(...a, ...b) * 1.08;
    const n = a.length, slot = CH.W / n, bw = Math.max(4, Math.min(30, slot * 0.62));
    const x = i => i * slot + slot / 2;
    const y = v => CH.t + (1 - v / mx) * (CH.H - CH.t - CH.b);
    return { a, b, mx, n, slot, bw, x, y };
  }

  // cápsulas por tramo (periodo actual) + línea punteada (periodo anterior)
  function chart(cur, prev, metricLabel) {
    const g = chartGeom(cur, prev); const { a, b, n, bw, x, y } = g;
    const iMax = a.indexOf(Math.max(...a));
    const caps = a.map((v, i) => {
      const top = y(v), h = CH.H - CH.b - top;
      const cls = i === n - 1 ? 'is-last' : i === iMax ? 'is-max' : '';
      const hatch = v < b[i] ? `<rect class="cap-hatch" x="${(x(i) - bw / 2).toFixed(1)}" y="${y(b[i]).toFixed(1)}" width="${bw.toFixed(1)}" height="${(top - y(b[i])).toFixed(1)}" rx="${(bw / 2).toFixed(1)}" style="animation-delay:${i * 18}ms"/>` : '';
      return `${hatch}<rect class="cap ${cls}" data-i="${i}" x="${(x(i) - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="${(bw / 2).toFixed(1)}" style="animation-delay:${i * 18}ms"/>`;
    }).join('');
    const pts = b.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    const grid = [0.33, 0.66].map(k => `<line class="gr-grid" x1="0" x2="${CH.W}" y1="${(CH.t + k * (CH.H - CH.t)).toFixed(1)}" y2="${(CH.t + k * (CH.H - CH.t)).toFixed(1)}"/>`).join('');
    const ticks = [0, 1, 2].map(k => state.period === 7
      ? t().days[(k === 0 ? 3 : k === 1 ? 6 : 9) % 7].slice(0, 3)
      : (k === 0 ? `−${state.period}d` : k === 1 ? `−${Math.round(state.period / 2)}d` : (lang() === 'es' ? 'hoy' : 'today')));
    return `
      <svg class="gr-chart" viewBox="0 0 ${CH.W} ${CH.H}" preserveAspectRatio="none" role="img" aria-label="${metricLabel}">
        <defs><pattern id="grHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="rgba(20,20,22,.04)"/><line x1="0" y1="0" x2="0" y2="6" stroke="rgba(20,20,22,.28)" stroke-width="1.6"/></pattern></defs>
        ${grid}${caps}
        <polyline points="${pts}" class="gr-prev" vector-effect="non-scaling-stroke"/>
      </svg>
      <div class="gr-ticks">${ticks.map(x => `<span>${x}</span>`).join('')}</div>
      <div class="gr-tip" role="status" aria-live="polite" style="opacity:0"></div>`;
  }

  function bindChart(cur, prev) {
    const box = el('.gr-chartbox'); if (!box) return;
    const svg = box.querySelector('svg'); const tip = box.querySelector('.gr-tip');
    const g = chartGeom(cur, prev); const caps = svg.querySelectorAll('.cap');
    const move = ev => {
      const rect = svg.getBoundingClientRect();
      const px = ((ev.touches ? ev.touches[0].clientX : ev.clientX) - rect.left) / rect.width * CH.W;
      const i = Math.max(0, Math.min(g.n - 1, Math.floor(px / g.slot)));
      caps.forEach(c => c.classList.toggle('is-hov', +c.dataset.i === i));
      const d = pct(g.a[i], g.b[i]);
      const unit = g.a.length < cur.length ? (lang() === 'es' ? 'Semana ' : 'Week ') + (i + 1) : (lang() === 'es' ? 'Día ' : 'Day ') + (i + 1);
      tip.innerHTML = `<span>${unit}</span><strong>${compact(g.a[i])}</strong><em class="${d >= 0 ? 'up' : 'down'}">${d >= 0 ? '↑' : '↓'} ${Math.abs(d).toFixed(0)}%</em>`;
      tip.style.opacity = 1;
      tip.style.top = Math.max(-10, g.y(g.a[i]) / CH.H * rect.height - 44) + 'px';
      tip.style.left = Math.min(Math.max(g.x(i) / CH.W * 100, 12), 88) + '%';
    };
    const leave = () => { caps.forEach(c => c.classList.remove('is-hov')); tip.style.opacity = 0; };
    svg.addEventListener('mousemove', move); svg.addEventListener('touchmove', move, { passive: true });
    svg.addEventListener('mouseleave', leave); svg.addEventListener('touchend', leave);
  }

  /* ---------- vistas ---------- */
  function kpiData() {
    const pl = activePlats(); const n = state.period;
    return ['reach', 'views', 'inter', 'follows'].map(m => {
      const cur = combined(state.client, pl, m, n, 0); const prev = combined(state.client, pl, m, n, n);
      return { m, cur, prev, total: sum(cur), d: pct(sum(cur), sum(prev)) };
    });
  }

  function kpiCards(k, interactive) {
    return `<div class="gr-kpis">${k.map(x => `
      <${interactive ? 'button type="button"' : 'div'} class="gr-kpi ${interactive && state.metric === x.m ? 'is-on' : ''}" data-metric="${x.m}">
        ${rings()}
        <span class="gr-kpi__label">${t().metrics[x.m]}</span>
        <span class="gr-kpi__value" data-count="${Math.round(x.total)}">${compact(x.total)}</span>
        <span class="gr-kpi__sub">${t().metricSub[x.m]}</span>
        <span class="gr-kpi__foot"><em class="${x.d >= 0 ? 'up' : 'down'}">${x.d >= 0 ? '↑' : '↓'} ${Math.abs(x.d).toFixed(1)}%</em><span class="gr-kpi__spark">${spark(bucket(x.cur))}</span></span>
      </${interactive ? 'button' : 'div'}>`).join('')}</div>`;
  }

  function insights(k) {
    const T = t(); const pl = activePlats();
    const reach = k[0];
    const shares = pl.map(p => ({ p, v: sum(combined(state.client, [p], 'reach', state.period, 0)) })).sort((a, b) => b.v - a.v);
    const lead = shares[0]; const share = Math.round(lead.v / reach.total * 100);
    const ps = posts(state.client).filter(x => pl.includes(x.p));
    const avg = ps.length ? sum(ps.map(x => x.views)) / ps.length : 1;
    const byF = {}; ps.forEach(x => { (byF[x.f] = byF[x.f] || []).push(x.views); });
    const best = Object.entries(byF).map(([f, v]) => ({ f, a: sum(v) / v.length })).sort((a, b) => b.a - a.a)[0];
    const sel = k.find(x => x.m === state.metric) || reach;
    const dowTotals = [0, 0, 0, 0, 0, 0, 0]; sel.cur.forEach((v, i) => { dowTotals[(i + 3) % 7] += v; });
    const bestDay = dowTotals.indexOf(Math.max(...dowTotals));
    const items = [T.ins.growth(T.metrics[sel.m], sel.d), pl.length > 1 ? T.ins.lead(PLAT[lead.p], share) : null, best ? T.ins.format(T.fmt[best.f], (best.a / avg).toFixed(1)) : null, T.ins.day(T.days[bestDay])].filter(Boolean).slice(0, 3);
    return `<ol class="gr-ins">${items.map((s, i) => `<li><span>0${i + 1}</span><p>${s}</p></li>`).join('')}</ol>`;
  }

  function splitBar() {
    const pl = activePlats();
    const v = pl.map(p => ({ p, v: sum(combined(state.client, [p], state.metric, state.period, 0)) }));
    const tot = sum(v.map(x => x.v)) || 1;
    return `<div class="gr-split"><div class="gr-split__bar">${v.map(x => `<span class="gr-split__seg gr-c-${x.p}" style="flex:${x.v / tot}"></span>`).join('')}</div>
      <ul class="gr-split__legend">${v.map(x => `<li><i class="gr-c-${x.p}"></i>${PLAT[x.p]}<b>${Math.round(x.v / tot * 100)}%</b></li>`).join('')}</ul></div>`;
  }

  function viewResumen() {
    const T = t(); const k = kpiData(); const sel = k.find(x => x.m === state.metric);
    return `${kpiCards(k, true)}
      <div class="gr-row">
        <section class="gr-card gr-card--chart">
          <header class="gr-card__head"><h4>${T.evo} · ${T.metrics[state.metric]}</h4>
            <span class="gr-legend"><i class="gr-legend__cur"></i>${T.current}<i class="gr-legend__prev"></i>${T.prev}</span></header>
          <div class="gr-chartbox">${chart(sel.cur, sel.prev, T.metrics[state.metric])}</div>
          <p class="gr-hint">${T.tapHint}</p>
        </section>
        <div class="gr-col">
          <section class="gr-card"><header class="gr-card__head"><h4>${T.insights}</h4><span class="gr-tag">auto</span></header>${insights(k)}</section>
          <section class="gr-card"><header class="gr-card__head"><h4>${T.split}</h4></header>${splitBar()}</section>
        </div>
      </div>`;
  }

  function postRows(list) {
    const T = t(); const maxEr = Math.max(...list.map(x => x.er), 1);
    return list.map(x => `<li class="gr-post">
      <span class="gr-post__thumb" style="--h:${x.hue}"><b>${T.fmtOne[x.f]}</b></span>
      <span class="gr-post__body"><strong>${x.title}</strong><small>${PLAT[x.p]}</small></span>
      <span class="gr-post__num">${compact(x.views)}<small>${T.viewsShort}</small></span>
      <span class="gr-post__er"><span><i style="width:${x.er / maxEr * 100}%"></i></span><small>${x.er.toString().replace('.', lang() === 'es' ? ',' : '.')}% ${T.er}</small></span>
    </li>`).join('');
  }

  function viewContenido() {
    const T = t(); const pl = activePlats();
    let list = posts(state.client).filter(x => pl.includes(x.p));
    if (state.fmt !== 'all') list = list.filter(x => x.f === state.fmt);
    list.sort((a, b) => state.sort === 'views' ? b.views - a.views : b.er - a.er);
    const chips = ['all', 'reel', 'carrusel', 'video', 'foto'].map(f => `<button type="button" class="gr-chip ${state.fmt === f ? 'is-on' : ''}" data-fmt="${f}">${f === 'all' ? T.all : T.fmt[f]}</button>`).join('');
    return `<section class="gr-card">
      <header class="gr-card__head gr-card__head--wrap"><h4>${T.posts} · ${list.length}</h4>
        <div class="gr-tools"><div class="gr-chips">${chips}</div>
        <div class="gr-seg gr-seg--sm">${['views', 'er'].map(s => `<button type="button" data-sort="${s}" class="${state.sort === s ? 'is-on' : ''}">${s === 'views' ? T.sortViews : T.sortEr}</button>`).join('')}</div></div></header>
      <ul class="gr-posts">${list.length ? postRows(list) : `<li class="gr-empty">—</li>`}</ul></section>`;
  }

  function viewAudiencia() {
    const T = t(); const c = CLIENTS[state.client]; const r = rng(c.seed + 101);
    const ages = ['13–17', '18–24', '25–34', '35–44', '45–54', '55+'];
    const raw = ages.map((a, i) => (i === 2 ? 34 : i === 1 ? 24 : i === 3 ? 20 : 6) + r() * 8);
    const tot = sum(raw); const agesP = raw.map(v => v / tot * 100); const mxA = Math.max(...agesP);
    const w = Math.round(48 + r() * 18 + (state.client === 'vela' ? 14 : 0)); const o = 2; const m = 100 - w - o;
    const cities = { atlas: ['Bogotá', 'Medellín', 'Cali', 'Manizales', 'Bucaramanga'], norte: ['Bogotá', 'Chía', 'Medellín', 'Pereira', 'Cali'], vela: ['Bogotá', 'Cajicá', 'Chía', 'Zipaquirá', 'Medellín'] }[state.client];
    let left = 100; const cv = cities.map((n, i) => { const v = i === 0 ? 38 + r() * 14 : Math.max(3, (left - 10) * (0.28 + r() * 0.2)); left -= v; return { n, v }; });
    return `<div class="gr-row gr-row--3">
      <section class="gr-card"><header class="gr-card__head"><h4>${T.age}</h4></header>
        <ul class="gr-bars">${ages.map((a, i) => `<li class="${agesP[i] === mxA ? 'is-top' : ''}"><span>${a}</span><i><b style="width:${agesP[i] / mxA * 100}%"></b></i><em>${agesP[i].toFixed(0)}%</em></li>`).join('')}</ul></section>
      <section class="gr-card"><header class="gr-card__head"><h4>${T.gender}</h4></header>
        ${donut(w, m, o, T.women)}
        <ul class="gr-split__legend"><li><i class="gr-c-ig"></i>${T.women}<b>${w}%</b></li><li><i class="gr-c-tk"></i>${T.men}<b>${m}%</b></li><li><i class="gr-c-fb"></i>${T.other}<b>${o}%</b></li></ul></section>
      <section class="gr-card"><header class="gr-card__head"><h4>${T.cities}</h4></header>
        <ul class="gr-bars gr-bars--city">${cv.map((x, i) => `<li class="${i === 0 ? 'is-top' : ''}"><span>${x.n}</span><i><b style="width:${x.v / cv[0].v * 100}%"></b></i><em>${x.v.toFixed(0)}%</em></li>`).join('')}</ul></section>
    </div>
    <section class="gr-card gr-heat"><header class="gr-card__head"><h4>${T.active}</h4><span class="gr-legend">${T.less}<i class="gr-heat__scale"></i>${T.more}</span></header>
      <div class="gr-heat__grid">${heat(c)}</div></section>`;
  }

  function donut(w, m, o, label) {
    const R = 60, C = 2 * Math.PI * R, gap = 6;
    const seg = (p, off, stroke) => `<circle cx="75" cy="75" r="${R}" stroke="${stroke}" stroke-dasharray="${Math.max(0, p / 100 * C - gap).toFixed(1)} ${C.toFixed(1)}" stroke-dashoffset="${(-off / 100 * C).toFixed(1)}"/>`;
    return `<div class="gr-donut"><svg viewBox="0 0 150 150" aria-hidden="true">
      <circle cx="75" cy="75" r="${R}" stroke="rgba(20,20,22,.06)"/>
      ${seg(w, 0, 'var(--lm-d)')}${seg(m, w, 'var(--k)')}${seg(o, w + m, 'rgba(20,20,22,.25)')}</svg>
      <div><strong data-count="${w}" data-kind="int">${w}</strong><small>% ${label}</small></div></div>`;
  }

  function heat(c) {
    const r = rng(c.seed + 707); const hours = [6, 8, 10, 12, 14, 16, 18, 20, 22];
    const order = [1, 2, 3, 4, 5, 6, 0];
    let html = '<span></span>' + hours.map(h => `<small>${h}h</small>`).join('');
    order.forEach(d => {
      html += `<small>${t().days[d].slice(0, 3)}</small>`;
      hours.forEach(h => {
        const peak = Math.exp(-Math.pow((h - 19) / 3.2, 2)) + 0.55 * Math.exp(-Math.pow((h - 12.5) / 1.8, 2));
        const v = Math.min(1, peak * (d === 0 || d === 6 ? 0.8 : 1) * (0.75 + r() * 0.45));
        html += `<i class="${v > 0.93 ? 'is-peak' : ''}" style="--v:${v.toFixed(2)};animation-delay:${(order.indexOf(d) * 9 + hours.indexOf(h)) * 12}ms" title="${t().days[d]} ${h}h"></i>`;
      });
    });
    return html;
  }

  function viewPauta() {
    const T = t(); const c = CLIENTS[state.client]; const r = rng(c.seed + 303);
    const budget = Math.round(c.scale * 2400000 * (state.period / 30) / 10000) * 10000;
    const used = budget * (0.58 + r() * 0.3);
    const camps = [
      { n: lang() === 'es' ? 'Alcance · lanzamiento' : 'Reach · launch', s: used * 0.46, res: Math.round(used * 0.46 / 9) },
      { n: lang() === 'es' ? 'Tráfico · tienda' : 'Traffic · store', s: used * 0.34, res: Math.round(used * 0.34 / 420) },
      { n: lang() === 'es' ? 'Mensajes · asesoría' : 'Messages · advice', s: used * 0.20, res: Math.round(used * 0.20 / 3800) }
    ];
    const paidShare = Math.round(28 + r() * 18);
    const weeks = Math.max(1, Math.round(state.period / 7)); const wv = Array.from({ length: weeks }, () => 0.6 + r() * 0.8); const wt = sum(wv);
    const wk = wv.map(v => v / wt * used); const mx = Math.max(...wk);
    return `<div class="gr-row">
      <div class="gr-col">
        <section class="gr-card"><header class="gr-card__head"><h4>${T.budget}</h4><span class="gr-tag">COP</span></header>
          <p class="gr-money"><strong data-count="${Math.round(used)}" data-kind="money">${money(used)}</strong> <small>${T.spent} ${T.of} ${money(budget)}</small></p>
          <div class="gr-progress"><i style="width:${used / budget * 100}%"></i></div></section>
        <section class="gr-card"><header class="gr-card__head"><h4>${T.weekly}</h4></header>
          <div class="gr-colbars">${wk.map((v, i) => `<span class="${v === mx ? 'is-max' : ''}" title="${money(v)}"><i style="height:${v / mx * 100}%;animation-delay:${i * 50}ms"></i><small>${weeks > 6 ? (i % 2 ? '' : 'S' + (i + 1)) : 'S' + (i + 1)}</small></span>`).join('')}</div></section>
      </div>
      <section class="gr-card"><header class="gr-card__head"><h4>${T.campaigns}</h4></header>
        <ul class="gr-camps">${camps.map(x => `<li><strong>${x.n}</strong><span>${money(x.s)}</span><span>${x.res.toLocaleString()} ${T.result}</span><span>${money(x.s / x.res)} ${T.perResult}</span></li>`).join('')}</ul>
        <div class="gr-pvo"><h4>${T.paidVsOrg}</h4><div class="gr-split__bar"><span class="gr-split__seg gr-c-tk" style="flex:${paidShare}"></span><span class="gr-split__seg gr-c-ig" style="flex:${100 - paidShare}"></span></div>
          <ul class="gr-split__legend"><li><i class="gr-c-tk"></i>${T.paid}<b>${paidShare}%</b></li><li><i class="gr-c-ig"></i>${T.organic}<b>${100 - paidShare}%</b></li></ul></div></section>
    </div>`;
  }

  function viewClient() {
    const T = t(); const k = kpiData(); const c = CLIENTS[state.client]; const sel = k.find(x => x.m === state.metric);
    const top = posts(state.client).filter(x => activePlats().includes(x.p)).sort((a, b) => b.views - a.views).slice(0, 3);
    return `<div class="gr-report">
      <header class="gr-report__head">
        <span class="gr-report__brand"><img src="gritt-logo.png" alt="Gritt">${T.preparedBy}</span>
        <h3>${c.name}</h3>
        <p>${T.reportFor} · ${T.period[state.period]} · ${activePlats().map(p => PLAT[p]).join(' · ')}</p>
        <p class="gr-report__intro">${T.reportIntro(c.name, T.period[state.period])}</p>
      </header>
      ${kpiCards(k, false)}
      <section class="gr-card gr-card--chart"><header class="gr-card__head"><h4>${T.evo} · ${T.metrics[state.metric]}</h4>
        <span class="gr-legend"><i class="gr-legend__cur"></i>${T.current}<i class="gr-legend__prev"></i>${T.prev}</span></header>
        <div class="gr-chartbox">${chart(sel.cur, sel.prev, T.metrics[state.metric])}</div></section>
      <div class="gr-row">
        <section class="gr-card"><header class="gr-card__head"><h4>${T.insights}</h4></header>${insights(k)}</section>
        <section class="gr-card"><header class="gr-card__head"><h4>${T.top3}</h4></header><ul class="gr-posts gr-posts--mini">${postRows(top)}</ul></section>
      </div>
    </div>`;
  }

  /* ---------- shell ---------- */
  function render() {
    if (!activePlats().length) state.plats.ig = true;
    const T = t(); const c = CLIENTS[state.client]; const client = state.mode === 'client';
    const nav = Object.keys(T.nav).map(v => `<button type="button" class="gr-nav__item ${state.view === v ? 'is-on' : ''}" data-view="${v}">${icon(v)}<span>${T.nav[v]}</span></button>`).join('');
    const cl = Object.keys(CLIENTS).map(id => `<button type="button" class="gr-client ${state.client === id ? 'is-on' : ''}" data-client="${id}"><i>${CLIENTS[id].name[0]}</i><span>${CLIENTS[id].name}<small>${CLIENTS[id].sector}</small></span></button>`).join('');
    const body = client ? viewClient() : ({ resumen: viewResumen, contenido: viewContenido, audiencia: viewAudiencia, pauta: viewPauta }[state.view])();
    root.innerHTML = `
      <div class="gr-win">
        <div class="gr-chrome"><span class="gr-dots"><i></i><i></i><i></i></span>
          <span class="gr-url">${client ? `gritt.link/r/${c.slug}-${state.period}d` : `app.grittreports.co/${c.slug}/${state.view}`}</span>
          <span class="gr-demo">${T.demo}</span></div>
        <div class="gr-shell ${client ? 'is-client' : ''}">
          <aside class="gr-side">
            <div class="gr-logo"><img src="gritt-logo.png" alt="Gritt"><span>Reports</span></div>
            <nav class="gr-nav">${nav}</nav>
            <p class="gr-side__label">${T.clients}</p>
            <div class="gr-clients">${cl}</div>
            <div class="gr-side__foot"><span>${T.studio}</span><small>${T.plan}</small></div>
          </aside>
          <main class="gr-main">
            <div class="gr-top">
              <div class="gr-top__title"><h3>${client ? T.reportFor : c.name}</h3><small>${client ? c.name : T.nav[state.view] + ' · ' + T.vsPrev}</small></div>
              <div class="gr-top__ctl">
                <div class="gr-seg" role="group" aria-label="period">${[7, 30, 90].map(p => `<button type="button" data-period="${p}" class="${state.period === p ? 'is-on' : ''}">${p}D</button>`).join('')}</div>
                <div class="gr-plats" role="group" aria-label="platforms">${Object.keys(PLAT).map(p => `<button type="button" data-plat="${p}" class="gr-plat ${state.plats[p] ? 'is-on' : ''}" aria-pressed="${state.plats[p]}"><i class="gr-c-${p}"></i>${PLAT_SHORT[p]}</button>`).join('')}</div>
                <button type="button" class="gr-btn" data-act="mode">${client ? T.adminView : T.clientView}</button>
                <div class="gr-sharewrap"><button type="button" class="gr-btn gr-btn--lime" data-act="share">${T.share}</button>
                  ${state.share ? `<div class="gr-pop" role="dialog" aria-label="${T.shareTitle}"><p>${T.shareTitle}</p><code>gritt.link/r/${c.slug}-${state.period}d</code>
                  <label><input type="checkbox" checked> ${T.expires}</label><label><input type="checkbox"> ${T.password}</label>
                  <button type="button" class="gr-btn gr-btn--lime" data-act="copy">${T.copy}</button></div>` : ''}</div>
              </div>
            </div>
            <div class="gr-view" data-key="${state.client}-${state.view}-${state.mode}">${body}</div>
            ${!client && state.view === 'resumen' ? `<div class="gr-next"><span class="gr-pulse"></span><strong>${T.next}</strong><span>${T.nextTxt}</span></div>` : ''}
          </main>
        </div>
        <div class="gr-toast" role="status" aria-live="polite"></div>
      </div>`;
    countUp();
    const k = kpiData(); const sel = k.find(x => x.m === state.metric);
    if (sel) bindChart(sel.cur, sel.prev);
  }

  function icon(v) {
    const p = {
      resumen: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="4" rx="1.5"/><rect x="14" y="11" width="7" height="10" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
      contenido: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 15l5-5 4 4 3-3 6 6"/>',
      audiencia: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.8-3.3 3.1-5 6-5s5.2 1.7 6 5"/><circle cx="17" cy="9" r="2.4"/><path d="M16 15c2.3 0 4.2 1.4 5 4"/>',
      pauta: '<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>'
    }[v];
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  }

  function toast(msg) {
    const n = el('.gr-toast'); if (!n) return;
    n.textContent = msg; n.classList.add('is-on');
    clearTimeout(toast.t); toast.t = setTimeout(() => n.classList.remove('is-on'), 1800);
  }

  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b || !root.contains(b)) { if (state.share && !e.target.closest('.gr-pop')) { state.share = false; render(); } return; }
    const d = b.dataset;
    if (d.view) { state.view = d.view; state.mode = 'studio'; }
    else if (d.client) { state.client = d.client; }
    else if (d.period) { state.period = +d.period; }
    else if (d.plat) { state.plats[d.plat] = !state.plats[d.plat]; if (!activePlats().length) { state.plats[d.plat] = true; toast(t().empty); return; } }
    else if (d.metric) { state.metric = d.metric; }
    else if (d.fmt) { state.fmt = d.fmt; }
    else if (d.sort) { state.sort = d.sort; }
    else if (d.act === 'mode') { state.mode = state.mode === 'client' ? 'studio' : 'client'; state.share = false; }
    else if (d.act === 'share') { state.share = !state.share; }
    else if (d.act === 'copy') {
      const link = 'https://gritt.link/r/' + CLIENTS[state.client].slug + '-' + state.period + 'd';
      try { navigator.clipboard && navigator.clipboard.writeText(link).catch(() => {}); } catch (_) {}
      state.share = false; render(); toast(t().copied); return;
    } else return;
    if (!d.act || d.act !== 'share') state.share = state.share && d.act === 'share';
    render();
  });

  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  render();
})();
