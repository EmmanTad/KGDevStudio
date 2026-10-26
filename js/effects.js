/* KG Dev Studio — animations: scroll reveal, header, tilt, and tech effects */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---------- scroll reveal ---------- */
  var sel = '.tc,.ac,.pc,.box,.hd,.band,.ct .i,#f,.chan a,.stat,.step,.term';
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target; io.unobserve(el); el.classList.add('in');
      setTimeout(function () { el.classList.remove('rv', 'in'); el.style.transitionDelay = ''; }, 1500);
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' }) : null;
  function tag(root) {
    if (!io) return;
    var groups = new Map();
    root.querySelectorAll(sel).forEach(function (el) {
      if (el.dataset.rv) return;
      el.dataset.rv = 1; el.classList.add('rv');
      var i = groups.get(el.parentNode) || 0; groups.set(el.parentNode, i + 1);
      el.style.transitionDelay = Math.min(i, 8) * 90 + 'ms';
      io.observe(el);
    });
  }
  var main = document.querySelector('main'); tag(main);
  new MutationObserver(function () { tag(main); }).observe(main, { childList: true, subtree: true });

  /* ---------- header + progress bar ---------- */
  var hd = document.querySelector('header'), pr = document.getElementById('prog');
  function sc() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    hd.classList.toggle('sd', y > 10); pr.style.width = (h > 0 ? y / h * 100 : 0) + '%';
  }
  addEventListener('scroll', sc, { passive: true }); sc();

  /* ---------- mobile menu ---------- */
  var mn = document.getElementById('mn');
  function menu(o) { hd.classList.toggle('mo', o); mn.setAttribute('aria-expanded', o); mn.textContent = o ? '\u2715' : '\u2630'; mn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu') }
  mn.addEventListener('click', function () { menu(!hd.classList.contains('mo')) });
  document.addEventListener('click', function (ev) { if (hd.classList.contains('mo') && (ev.target.closest('nav a') || !ev.target.closest('header'))) menu(false) });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') menu(false) });
  addEventListener('resize', function () { if (innerWidth > 980) menu(false) });

  /* ---------- hero image tilt ---------- */
  var img = document.querySelector('.hero .hv img');
  if (img && matchMedia('(hover:hover)').matches) {
    img.addEventListener('mousemove', function (e) {
      var r = img.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      img.style.transform = 'perspective(900px) rotateY(' + x * 8 + 'deg) rotateX(' + -y * 8 + 'deg)';
    });
    img.addEventListener('mouseleave', function () { img.style.transform = ''; });
  }

  /* helper: is element on screen? */
  function watch(el, cb) {
    if (!('IntersectionObserver' in window)) { cb(true); return }
    new IntersectionObserver(function (es) { cb(es[0].isIntersecting) }, { threshold: .1 }).observe(el);
  }

  /* ---------- 1. hero network canvas (connected nodes that react to the cursor) ---------- */
  (function () {
    var c = document.getElementById('net'); if (!c) return;
    var x = c.getContext('2d'), W = 0, H = 0, pts = [], m = { x: -999, y: -999 }, on = true, raf = 0, dpr = Math.min(devicePixelRatio || 1, 2);
    function size() {
      var r = c.parentNode.getBoundingClientRect(); W = r.width; H = r.height;
      c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(18, Math.min(70, Math.round(W * H / 15000))); pts = [];
      for (var i = 0; i < n; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 });
    }
    function frame() {
      x.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        if (!reduce) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; }
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) { x.strokeStyle = 'rgba(47,212,255,' + (.28 * (1 - d / 130)) + ')'; x.lineWidth = 1; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke(); }
        }
        var mx = p.x - m.x, my = p.y - m.y, md = Math.sqrt(mx * mx + my * my);
        if (md < 170) { x.strokeStyle = 'rgba(106,168,255,' + (.5 * (1 - md / 170)) + ')'; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(m.x, m.y); x.stroke(); }
        x.fillStyle = 'rgba(159,230,255,.85)'; x.beginPath(); x.arc(p.x, p.y, 1.8, 0, 6.283); x.fill();
      }
      if (on && !reduce && !document.hidden) raf = requestAnimationFrame(frame); else raf = 0;
    }
    function start() { if (!raf) raf = requestAnimationFrame(frame) }
    size(); frame();
    addEventListener('resize', function () { size(); if (reduce) frame(); });
    var hero = c.parentNode;
    hero.addEventListener('mousemove', function (e) { var r = c.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; });
    hero.addEventListener('mouseleave', function () { m.x = m.y = -999; });
    watch(hero, function (v) { on = v; if (v) start(); });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) start(); });
  })();

  /* ---------- 2. typewriter: rotating services line ---------- */
  (function () {
    var el = document.getElementById('rot'); if (!el) return;
    var words = KG.hero, wi = 0, ci = 0, del = false;
    if (reduce) { el.textContent = words[0]; return }
    (function tick() {
      var w = words[wi], t = del ? 32 : 70; ci += del ? -1 : 1; el.textContent = w.slice(0, ci);
      if (!del && ci === w.length) { del = true; t = 1500 } else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; t = 350 }
      setTimeout(tick, t);
    })();
  })();

  /* ---------- 3. animated counters ---------- */
  (function () {
    var els = document.querySelectorAll('.stat b[data-stat]'); if (!els.length) return;
    function run(el) {
      var to = +el.dataset.to || 0, suf = el.dataset.suf || '', t0 = null;
      if (reduce || to === 0) { el.textContent = to + suf; return }
      function step(t) { if (!t0) t0 = t; var k = Math.min((t - t0) / 1300, 1), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * e) + suf; if (k < 1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    }
    els.forEach(function (el) {
      if (!('IntersectionObserver' in window)) { run(el); return }
      var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { o.disconnect(); run(el); } }, { threshold: .5 }); o.observe(el);
    });
  })();

  /* ---------- 4. capability marquee (duplicate track for seamless loop) ---------- */
  (function () {
    var t = document.getElementById('mqt'); if (!t) return;
    var html = KG.stack.map(function (s) { return '<span>' + s + '</span>' }).join('');
    t.innerHTML = html + html;
  })();

  /* ---------- 5. terminal typing loop ---------- */
  (function () {
    var pre = document.getElementById('term'); if (!pre) return;
    var lines = [
      ['pm', '$ kg deploy --site your-business'],
      ['cm', '# building and optimizing...'],
      ['ok', '✔ responsive layout ready'],
      ['ok', '✔ SSL + security scan passed'],
      ['ok', '✔ automation workflow connected'],
      ['ok', '✔ monitoring online, alerts armed'],
      ['pm', '$ status → all systems operational']
    ], vis = false;
    watch(pre, function (v) { vis = v });
    if (reduce) { pre.innerHTML = lines.map(function (l) { return '<span class="' + l[0] + '">' + l[1] + '</span>' }).join('\n'); return }
    function loop() {
      pre.innerHTML = ''; var li = 0;
      (function nextLine() {
        if (!vis) return setTimeout(nextLine, 500);
        if (li >= lines.length) return setTimeout(loop, 3500);
        var l = lines[li++], s = document.createElement('span'); s.className = l[0]; pre.appendChild(s);
        var caret = document.createElement('i'); caret.className = 'caret'; pre.appendChild(caret);
        var typed = l[0] === 'pm', i = 0, speed = typed ? 38 : 12;
        (function type() {
          s.textContent = l[1].slice(0, ++i);
          if (i < l[1].length) return setTimeout(type, speed);
          caret.remove(); pre.appendChild(document.createTextNode('\n'));
          setTimeout(nextLine, typed ? 450 : 260);
        })();
      })();
    }
    loop();
  })();

  /* ---------- 6. live monitor widget (demo data) ---------- */
  (function () {
    var sp = document.getElementById('spark'), ms = document.getElementById('ms'); if (!sp) return;
    var N = 28, vals = [], on = false;
    for (var i = 0; i < N; i++) vals.push(30 + Math.random() * 55);
    sp.innerHTML = vals.map(function () { return '<i></i>' }).join('');
    function paint() { var b = sp.children; for (var i = 0; i < N; i++) b[i].style.height = vals[i] + '%'; }
    function tick() {
      if (!on) return;
      var v = 28 + Math.random() * 60; vals.push(v); vals.shift(); paint();
      ms.textContent = Math.round(90 + (100 - v) * 1.1);
    }
    paint(); watch(sp, function (v) { on = v });
    if (!reduce) setInterval(tick, 1100);
  })();
})();
