/* Project HORIZON lab guides · site.js
   Three jobs, nothing else:
   1. a Copy button on every .prompt pre (wraps the <pre> in .pre-wrap so the label strip and button have a home)
   2. highlight the current section in the TOC (IntersectionObserver)
   3. live filter for the glossary: #glossary-search over .gloss dt/dd */
(function () {
  'use strict';

  /* 1. Copy buttons ------------------------------------------------------- */
  document.querySelectorAll('.prompt pre').forEach(function (pre) {
    var box = pre.closest('.prompt');
    var wrap = document.createElement('div');
    wrap.className = 'pre-wrap';
    if (box && box.hasAttribute('data-label')) wrap.setAttribute('data-label', box.getAttribute('data-label'));
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy this block');

    function done(label) {
      btn.textContent = label;
      btn.classList.add('done');
      setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('done'); }, 1600);
    }
    function fallback() {
      try {
        var r = document.createRange();
        r.selectNodeContents(pre);
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(r);
        done('Press Ctrl+C');
      } catch (e) { done('Select it'); }
    }
    btn.addEventListener('click', function () {
      var text = pre.textContent.replace(/\s+$/, '') + '\n';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done('Copied'); }, fallback);
      } else {
        fallback();
      }
    });
    wrap.appendChild(btn);
  });

  /* 2. TOC: highlight the section on screen -------------------------------- */
  var toc = document.querySelector('.toc');
  if (toc && 'IntersectionObserver' in window) {
    var links = {};
    var targets = [];
    toc.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var id = decodeURIComponent(a.getAttribute('href').slice(1));
      var el = id && document.getElementById(id);
      if (el && !links[id]) { links[id] = a; targets.push(el); }
    });
    var visible = {};
    var current = null;
    function pick() {
      var next = null;
      for (var i = 0; i < targets.length; i++) {
        if (visible[targets[i].id]) { next = links[targets[i].id]; break; }
      }
      if (next === current) return;
      if (current) { current.classList.remove('on'); current.removeAttribute('aria-current'); }
      current = next;
      if (current) { current.classList.add('on'); current.setAttribute('aria-current', 'true'); }
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      pick();
    }, { rootMargin: '-12% 0px -70% 0px', threshold: 0 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* 3. Glossary filter ----------------------------------------------------- */
  var q = document.getElementById('glossary-search');
  if (q) {
    var lists = Array.prototype.slice.call(document.querySelectorAll('.gloss'));
    var count = document.getElementById('glossary-count');
    var empty = document.getElementById('glossary-empty');
    var total = 0;
    lists.forEach(function (dl) { total += dl.querySelectorAll('dt').length; });

    function filter() {
      var term = q.value.trim().toLowerCase();
      var shown = 0;
      lists.forEach(function (dl) {
        var hits = 0;
        dl.querySelectorAll('dt').forEach(function (dt) {
          var dd = dt.nextElementSibling;
          var hay = dt.textContent + ' ' + (dd && dd.tagName === 'DD' ? dd.textContent : '');
          var hit = !term || hay.toLowerCase().indexOf(term) !== -1;
          dt.hidden = !hit;
          if (dd && dd.tagName === 'DD') dd.hidden = !hit;
          if (hit) hits++;
        });
        shown += hits;
        var group = dl.closest('.gloss-group');
        if (group) group.hidden = hits === 0; else dl.hidden = hits === 0;
      });
      if (count) count.textContent = shown + ' of ' + total + ' terms';
      if (empty) empty.hidden = shown !== 0;
    }
    q.addEventListener('input', filter);
    filter();
  }
})();
