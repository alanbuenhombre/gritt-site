// Páginas de caso · Gritt Lab
(function () {
  var WA = '573002112871';
  document.querySelectorAll('.wa').forEach(function (a) {
    a.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(a.dataset.msg || 'Hola Gritt, quiero hablar de mi marca');
  });
  var els = [].slice.call(document.querySelectorAll('.up'));
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .08, rootMargin: '0px 0px -5% 0px' });
  els.forEach(function (e) { io.observe(e); });
  setTimeout(function () { els.forEach(function (e) { e.classList.add('in'); }); }, 5000);
})();
