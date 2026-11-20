// Motion Mania site — the skill's motion layer, implemented with no dependencies.
// Hero entrance and hover are CSS. This file adds the two dealt type moments:
// counter-rolls (proof figures) and word-highlight (statement).
(function () {
  'use strict';

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    if (a.hostname && a.hostname !== location.hostname) {
      a.setAttribute('rel', 'noopener noreferrer');
      if (!a.hasAttribute('target')) a.setAttribute('target', '_blank');
    }
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- moment 1: counter-rolls -------------------------------------------
  var facts = document.querySelector('[data-counters]');
  if (facts && !reduce && 'IntersectionObserver' in window) {
    var nums = facts.querySelectorAll('[data-count-to]');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.disconnect();
        nums.forEach(function (el) {
          var to = parseFloat(el.getAttribute('data-count-to'));
          var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
          var start = performance.now();
          var dur = 1100;
          function tick(now) {
            var t = Math.min(1, (now - start) / dur);
            var eased = 1 - Math.pow(1 - t, 3);
            el.textContent = (to * eased).toFixed(dec);
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      });
    }, { threshold: 0.35 });
    io.observe(facts);
  }

  // ---- moment 2: word-highlight ------------------------------------------
  var statement = document.querySelector('[data-highlight]');
  if (statement) {
    var words = Array.prototype.slice.call(statement.querySelectorAll('.w'));
    if (reduce) {
      words.forEach(function (w) { w.classList.add('on'); });
    } else {
      var update = function () {
        var rect = statement.getBoundingClientRect();
        var vh = window.innerHeight;
        var from = vh * 0.86;
        var to = vh * 0.18;
        var p = (from - rect.top) / (from - to);
        if (p < 0) p = 0;
        if (p > 1) p = 1;
        var n = Math.round(p * words.length);
        words.forEach(function (w, i) { w.classList.toggle('on', i < n); });
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
    }
  }

  // ---- Black Friday deal: one fixed end date for everyone; after it, the normal price shows.
  var deals = document.querySelectorAll('[data-deal-end]');
  if (deals.length) {
    var end = Date.parse(deals[0].getAttribute('data-deal-end'));
    var tick = function () {
      var left = end - Date.now();
      if (!(left > 0)) { document.documentElement.classList.add('deal-over'); return false; }
      var m = Math.floor(left / 60000);
      var text = Math.floor(m / 1440) + 'd ' + Math.floor((m % 1440) / 60) + 'h ' + (m % 60) + 'm';
      document.querySelectorAll('[data-deal-timer]').forEach(function (el) { el.textContent = text; });
      return true;
    };
    if (tick()) var dealTimer = setInterval(function () { if (!tick()) clearInterval(dealTimer); }, 30000);
  }
})();
