/* Project HORIZON lab guides · lab.js
   The motion layer for the four lab pages (loaded after site.js). Four jobs:
   1. the reading-progress bar (.lab-progress i, --p from 0 to 1)
   2. the route map: stations before the one on screen are .done, the current one .here,
      and the track fills to it (--route on .route)
   3. reveal on scroll: .stage, .tally, figures, .earned fade up once (skipped for reduced motion)
   4. count-up: <b data-count="1988"> counts from 0 when it scrolls into view */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Progress bar --------------------------------------------------------- */
  var bar = document.querySelector('.lab-progress i');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      if (bar) bar.style.setProperty('--p', max > 0 ? Math.min(1, h.scrollTop / max) : 0);
      route();
      ticking = false;
    });
  }

  /* 2. Route map ------------------------------------------------------------- */
  var track = document.querySelector('.route');
  var stations = track ? Array.prototype.slice.call(track.querySelectorAll('.stn')) : [];
  var stops = stations.map(function (a) {
    return document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
  });
  function route() {
    if (!track) return;
    var line = window.innerHeight * 0.35;
    var here = -1;
    stops.forEach(function (el, i) { if (el && el.getBoundingClientRect().top < line) here = i; });
    stations.forEach(function (a, i) {
      a.classList.toggle('done', i < here);
      a.classList.toggle('here', i === here);
      if (i === here) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current');
    });
    var n = stations.length - 1;
    track.style.setProperty('--route', n > 0 ? Math.max(0, here) / n : 0);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* 3 + 4. Reveal and count-up ------------------------------------------------ */
  function fmt(n, ref) {
    var s = Math.round(n).toString();
    return ref.indexOf(',') !== -1 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : s;
  }
  function countUp(el) {
    var text = el.textContent;
    var to = parseFloat(el.getAttribute('data-count'));
    if (isNaN(to) || reduce) return;
    var t0 = null, dur = 1100;
    function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(to * e, text);
      if (k < 1) requestAnimationFrame(step); else el.textContent = text;
    }
    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) return;
  var counts = document.querySelectorAll('[data-count]');
  var reveal = reduce ? [] : document.querySelectorAll('.stage, .tally, main figure, .earned, .lab-next, .ticket, .brief .mfd');
  if (reveal.length) {
    document.documentElement.classList.add('js-reveal');
    reveal.forEach(function (el) { el.classList.add('rvl'); });
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      if (el.classList.contains('rvl')) el.classList.add('in');
      if (el.hasAttribute('data-count')) countUp(el);
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  reveal.forEach(function (el) { io.observe(el); });
  counts.forEach(function (el) { io.observe(el); });
})();
