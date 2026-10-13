/* Locs Myth at Natural Essence — site behaviour (vanilla, no libraries) */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement, body = doc.body;
  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = function () { return reduceMQ.matches; };
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var raf = window.requestAnimationFrame.bind(window);

  /* ---------- Header state ---------- */
  var header = doc.querySelector('.site-header');
  function onHeader() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 24); }
  onHeader();
  window.addEventListener('scroll', onHeader, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = doc.querySelector('.menu-toggle');
  var panel = doc.getElementById('mobile-nav');
  if (toggle && panel) {
    var closeBtn = panel.querySelector('.close');
    var open = function () {
      panel.hidden = false; toggle.setAttribute('aria-expanded', 'true'); body.classList.add('menu-open');
      (panel.querySelector('a, button') || panel).focus();
    };
    var close = function (restore) {
      panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); body.classList.remove('menu-open');
      if (restore !== false) toggle.focus();
    };
    toggle.addEventListener('click', function () { panel.hidden ? open() : close(); });
    if (closeBtn) closeBtn.addEventListener('click', function () { close(); });
    panel.addEventListener('click', function (e) { if (e.target.closest('a')) close(false); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) close(); });
    window.matchMedia('(min-width: 980px)').addEventListener('change', function (e) { if (e.matches && !panel.hidden) close(false); });
  }

  /* ---------- Pressed-in headline ---------- */
  doc.querySelectorAll('.press').forEach(function (el) {
    if (reduced()) return;
    var i = 0;
    var clone = el.cloneNode(true);
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = doc.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (word) {
            if (!word) return;
            if (/^\s+$/.test(word)) { frag.appendChild(doc.createTextNode(' ')); return; }
            var w = doc.createElement('span'); w.className = 'w';
            word.split('').forEach(function (c) {
              var s = doc.createElement('span'); s.className = 'ch'; s.textContent = c;
              s.style.setProperty('--i', i++); w.appendChild(s);
            });
            frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) { walk(n); }
      });
    };
    walk(clone);
    var label = doc.createElement('span'); label.className = 'sr-only'; label.textContent = el.textContent.replace(/\s+/g, ' ').trim();
    var visual = doc.createElement('span'); visual.setAttribute('aria-hidden', 'true');
    while (clone.firstChild) visual.appendChild(clone.firstChild);
    el.textContent = ''; el.appendChild(label); el.appendChild(visual);
    raf(function () { el.classList.add('is-pressing'); });
  });

  /* ---------- Looping art videos (hero + botanicals) ---------- */
  var tallMQ = window.matchMedia('(max-aspect-ratio: 4/5)');
  var videos = Array.prototype.slice.call(doc.querySelectorAll('video[data-loop]'));
  var probe = doc.createElement('video');
  var useWebm = !probe.canPlayType('video/mp4; codecs="avc1.42E01E"') && !!probe.canPlayType('video/webm; codecs="vp9"');
  function pickSrc(v) {
    var src = (v.dataset.srcTall && tallMQ.matches) ? v.dataset.srcTall : v.dataset.src;
    return (src && useWebm) ? src.replace(/\.mp4$/, '.webm') : src;
  }
  function loadVideo(v) {
    var src = pickSrc(v);
    if (!src || v.dataset.current === src) return;
    v.dataset.current = src; v.classList.remove('is-playing');
    v.src = src; v.load();
  }
  if (videos.length && !saveData && 'IntersectionObserver' in window) {
    videos.forEach(function (v) {
      v.muted = true; v.setAttribute('muted', '');
      v.addEventListener('playing', function () { v.classList.add('is-playing'); });
    });
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (reduced()) { v.pause(); return; }
        if (en.isIntersecting) {
          loadVideo(v);
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else if (!v.paused) { v.pause(); }
      });
    }, { rootMargin: '200px 0px' });
    videos.forEach(function (v) { vio.observe(v); });
    tallMQ.addEventListener('change', function () {
      videos.forEach(function (v) { if (v.dataset.current) { loadVideo(v); var p = v.play(); if (p && p.catch) p.catch(function () {}); } });
    });
    reduceMQ.addEventListener('change', function () { if (reduced()) videos.forEach(function (v) { v.pause(); }); });
  }

  /* ---------- Reveals (pressed prints, fades) ---------- */
  var revealEls = doc.querySelectorAll('.fade, .print.reveal');
  if ('IntersectionObserver' in window && !reduced()) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); rio.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { rio.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Copper strand drawn down the margin ---------- */
  var strandMQ = window.matchMedia('(min-width: 1320px)');
  var strand = null, strandState = null;
  function buildStrand() {
    if (strand) { strand.remove(); strand = null; strandState = null; }
    if (!strandMQ.matches || reduced()) return;
    var start = doc.querySelector('.hero, .page-hero');
    var footer = doc.querySelector('.site-footer');
    if (!start || !footer) return;
    var top = start.getBoundingClientRect().bottom + window.scrollY - 40;
    var bottom = footer.getBoundingClientRect().top + window.scrollY - 60;
    var h = Math.max(200, bottom - top);
    var vw = root.clientWidth;
    var left = Math.max(8, (vw - 1280) / 4 - 20);
    var ns = 'http://www.w3.org/2000/svg';
    var svg = doc.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'strand'); svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '40'); svg.setAttribute('height', String(Math.round(h)));
    svg.setAttribute('viewBox', '0 0 40 ' + Math.round(h));
    svg.style.top = Math.round(top) + 'px'; svg.style.left = Math.round(left) + 'px';
    var xAt = function (y, sign) { return 20 + 6 * Math.sin(y / 700 * 6.283) + sign * 4.2 * Math.sin(y / 44 * 6.283); };
    var d1 = 'M' + xAt(0, 1).toFixed(1) + ' 0', d2 = 'M' + xAt(0, -1).toFixed(1) + ' 0';
    for (var y = 4; y <= h; y += 4) { d1 += 'L' + xAt(y, 1).toFixed(1) + ' ' + y; d2 += 'L' + xAt(y, -1).toFixed(1) + ' ' + y; }
    var p1 = doc.createElementNS(ns, 'path'); p1.setAttribute('class', 's1'); p1.setAttribute('d', d1);
    var p2 = doc.createElementNS(ns, 'path'); p2.setAttribute('class', 's2'); p2.setAttribute('d', d2);
    var tip = doc.createElementNS(ns, 'circle'); tip.setAttribute('class', 'tip'); tip.setAttribute('r', '3.2');
    svg.appendChild(p1); svg.appendChild(p2); svg.appendChild(tip);
    body.appendChild(svg);
    var L1 = p1.getTotalLength(), L2 = p2.getTotalLength();
    [[p1, L1], [p2, L2]].forEach(function (a) { a[0].style.strokeDasharray = a[1] + ' ' + a[1]; a[0].style.strokeDashoffset = a[1]; });
    strand = svg; strandState = { top: top, h: h, p1: p1, p2: p2, L1: L1, L2: L2, tip: tip, xAt: xAt };
    drawStrand();
  }
  function drawStrand() {
    if (!strandState) return;
    var s = strandState;
    var t = Math.min(1, Math.max(0, (window.scrollY + window.innerHeight * 0.62 - s.top) / s.h));
    s.p1.style.strokeDashoffset = s.L1 * (1 - t);
    s.p2.style.strokeDashoffset = s.L2 * (1 - t);
    var y = t * s.h;
    s.tip.setAttribute('cx', ((s.xAt(y, 1) + s.xAt(y, -1)) / 2).toFixed(1)); s.tip.setAttribute('cy', y.toFixed(1));
    s.tip.style.opacity = t > 0.002 && t < 0.998 ? 1 : 0;
  }

  /* ---------- Loc journey (pinned sweep on wide screens) ---------- */
  var journey = doc.querySelector('.journey');
  var jState = null;
  var pinMQ = window.matchMedia('(min-width: 980px)');
  function setupJourney() {
    if (!journey) return;
    var should = pinMQ.matches && !reduced();
    journey.classList.toggle('is-pinned', should);
    var cards = journey.querySelectorAll('.stage-card');
    if (!should) { cards.forEach(function (c) { c.classList.remove('is-active', 'is-past'); }); jState = null; return; }
    jState = {
      pin: journey.querySelector('.journey__pin'),
      art: journey.querySelector('.journey__art'),
      cards: cards,
      labels: journey.querySelectorAll('.journey__labels li'),
      bars: journey.querySelectorAll('.journey__progress span'),
      centers: [16.5, 32.6, 50, 66.6, 83.3],
      idx: -1
    };
    drawJourney();
  }
  function drawJourney() {
    if (!jState) return;
    var pin = jState.pin;
    var r = pin.getBoundingClientRect();
    var span = pin.offsetHeight - (window.innerHeight - (header ? header.offsetHeight : 0));
    var p = Math.min(1, Math.max(0, (-(r.top - (header ? header.offsetHeight : 0))) / Math.max(1, span)));
    var f = p * 5;
    var pos = Math.min(4, Math.max(0, f - 0.5));
    var i0 = Math.floor(pos), frac = pos - i0;
    var c = jState.centers;
    var x = i0 >= 4 ? c[4] : c[i0] + (c[i0 + 1] - c[i0]) * (frac < 0.35 ? 0 : frac > 0.65 ? 1 : (frac - 0.35) / 0.3);
    jState.art.style.setProperty('--sx', x.toFixed(2) + '%');
    var idx = Math.min(4, Math.floor(f));
    jState.bars.forEach(function (b, i) { b.style.setProperty('--p', Math.min(1, Math.max(0, f - i)).toFixed(3)); });
    if (idx !== jState.idx) {
      jState.idx = idx;
      jState.cards.forEach(function (card, i) { card.classList.toggle('is-active', i === idx); card.classList.toggle('is-past', i < idx); });
      jState.labels.forEach(function (l, i) { l.classList.toggle('is-active', i === idx); });
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    raf(function () { ticking = false; drawStrand(); drawJourney(); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  var rt;
  function onResize() { clearTimeout(rt); rt = setTimeout(function () { setupJourney(); buildStrand(); }, 150); }
  window.addEventListener('resize', onResize);
  setupJourney();
  window.addEventListener('load', function () { buildStrand(); });
  if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { setTimeout(buildStrand, 60); });
  reduceMQ.addEventListener('change', function () { setupJourney(); buildStrand(); });

  /* ---------- Gallery lightbox ---------- */
  var lb = doc.getElementById('lightbox');
  var triggers = Array.prototype.slice.call(doc.querySelectorAll('[data-full]'));
  if (lb && triggers.length && typeof lb.showModal === 'function') {
    var lbImg = lb.querySelector('img'), lbCap = lb.querySelector('figcaption'), lbCount = lb.querySelector('.lightbox__count');
    var cur = 0, opener = null;
    var show = function (i) {
      cur = (i + triggers.length) % triggers.length;
      var t = triggers[cur];
      lbImg.src = t.dataset.full; lbImg.alt = t.querySelector('img').alt;
      lbImg.width = +t.dataset.w || 1200; lbImg.height = +t.dataset.h || 1600;
      lbCap.textContent = t.dataset.caption || '';
      lbCount.textContent = (cur + 1) + ' of ' + triggers.length;
    };
    triggers.forEach(function (t, i) { t.addEventListener('click', function () { opener = t; show(i); lb.showModal(); }); });
    lb.querySelector('[data-lb="prev"]').addEventListener('click', function () { show(cur - 1); });
    lb.querySelector('[data-lb="next"]').addEventListener('click', function () { show(cur + 1); });
    lb.querySelector('[data-lb="close"]').addEventListener('click', function () { lb.close(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1); }
    });
    lb.addEventListener('close', function () { if (opener) opener.focus(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  }

  /* ---------- Questions form (Netlify) ---------- */
  var form = doc.getElementById('ask-form');
  if (form) {
    var status = doc.getElementById('form-status');
    if (/[?&]sent=1/.test(location.search)) { status.hidden = false; status.textContent = 'Thank you. Your question is in, and the salon will get back to you by phone or email. To lock in a time now, book on Booksy.'; }
    var fieldOf = function (el) { return el.closest('.field'); };
    var validate = function () {
      var ok = true, first = null;
      form.querySelectorAll('.field').forEach(function (f) { f.classList.remove('invalid'); });
      var mark = function (el) { fieldOf(el).classList.add('invalid'); el.setAttribute('aria-invalid', 'true'); ok = false; if (!first) first = el; };
      form.querySelectorAll('input, select, textarea').forEach(function (el) { el.removeAttribute('aria-invalid'); });
      var name = form.elements['name'], phone = form.elements['phone'], email = form.elements['email'], msg = form.elements['message'];
      if (!name.value.trim()) mark(name);
      var hasPhone = phone.value.replace(/\D/g, '').length >= 10;
      var hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      if (email.value.trim() && !hasEmail) mark(email);
      if (phone.value.trim() && !hasPhone) mark(phone);
      if (!phone.value.trim() && !email.value.trim()) { mark(phone); }
      if (!msg.value.trim()) mark(msg);
      if (first) first.focus();
      return ok;
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      var local = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|)$/.test(location.hostname) || location.protocol === 'file:';
      var done = function (text) { status.hidden = false; status.textContent = text; status.focus(); };
      if (local) { done('Preview mode: the form is wired for Netlify and will send once the site is live.'); return; }
      var data = new URLSearchParams(new FormData(form)).toString();
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data })
        .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); done('Thank you. Your question is in, and the salon will get back to you by phone or email. To lock in a time now, book on Booksy.'); })
        .catch(function () { form.submit(); });
    });
  }
})();
