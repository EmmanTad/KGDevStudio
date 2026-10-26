/* KG Dev Studio — app logic: views, packages, projects, contact form, theme */
(function () {
  var P = KG.packages, J = KG.projects;
  var $ = function (s) { return document.querySelector(s) }, cur = 'landing', views = ['home', 'packages', 'projects'], flt = 'all';
  var GROUPS = { site: 'WEBSITES', tech: 'TECH SERVICES' };

  function short(p) { return p.n.replace(' Package', '').replace(' Website', '') }

  function tabsHtml() {
    var out = '';
    Object.keys(GROUPS).forEach(function (g) {
      out += '<span class="gl">' + GROUPS[g] + '</span>';
      P.filter(function (p) { return p.g === g }).forEach(function (p) {
        out += '<button class="tab" role="tab" data-k="' + p.k + '" aria-selected="' + (p.k === cur) + '">' + short(p) + '</button>';
      });
    });
    return out;
  }

  function panel() {
    var p = P.filter(function (x) { return x.k === cur })[0];
    $('#tabs').innerHTML = tabsHtml();
    $('#pn').innerHTML =
      '<div class="box"><div class="bh"><div class="ic">' + KG.icon(p.ic) + '</div><div><span class="k">' + p.tag + '</span><h3>' + p.n + '</h3></div></div>' +
      '<p class="who">' + p.who + '</p>' + (p.k === 'automation' ? '<p class="tw"><b>Recent automation work:</b> ' + KG.cases.map(function (c) { return c.n }).join(' \u2022 ') + '</p>' : '') + '<ul class="ft">' +
      p.f.map(function (f) { return '<li>' + f[0] + (f[1] ? '<small>' + f[1] + '</small>' : '') + '</li>' }).join('') + '</ul>' +
      (p.add ? '<div class="add"><span class="k">ADD-ONS AND MAINTENANCE</span><ul>' + p.add.map(function (a) { return '<li>' + a + '</li>' }).join('') + '</ul></div>' : '') + '</div>' +
      '<aside class="side"><div class="box"><span class="k">TURNAROUND</span><div class="big">' + p.t + '</div><p class="who" style="margin:0">' + p.s + '</p></div>' +
      '<div class="box"><span class="k">PRICING</span><div class="big" style="font-size:24px">Custom quote</div><p class="who" style="margin:0 0 18px">Tailored to your scope and needs.</p><button class="btn pri" style="width:100%" id="q">Request a quote</button></div></aside>';
    $('#q').onclick = function () { $('#sel').value = p.k; go('contact') };
  }

  function teaser() {
    var out = '';
    Object.keys(GROUPS).forEach(function (g) {
      out += '<span class="gl">' + GROUPS[g] + '</span>';
      P.filter(function (p) { return p.g === g }).forEach(function (p) {
        out += '<button class="tc ' + g + '" data-k="' + p.k + '"><div class="ic">' + KG.icon(p.ic) + '</div><span class="t">' + p.tag + '</span><h3>' + short(p) + '</h3><p>' + p.who + '</p><span class="go">View details →</span></button>';
      });
    });
    $('#tz').innerHTML = out;
  }

  function cases() {
    var el = $('#au'); if (!el) return;
    el.innerHTML = KG.cases.map(function (a) {
      return '<article class="ac"><div class="ac-top"><span class="ac-k">' + a.k + '</span><span class="ac-y">' + a.y + '</span></div>' +
        '<h3>' + a.n + '</h3>' +
        '<div class="afl" aria-hidden="true">' + a.s.map(function (s, i) { return (i ? '<i></i>' : '') + '<span style="--i:' + i + '">' + s + '</span>' }).join('') + '</div>' +
        '<p class="ac-l"><b>Problem</b>' + a.p + '</p><p class="ac-l"><b>Solution</b>' + a.r + '</p>' +
        '<ul class="ac-i">' + a.i.map(function (x) { return '<li>' + x + '</li>' }).join('') + '</ul>' +
        '<div class="tg">' + a.t.map(function (x) { return '<span>' + x + '</span>' }).join('') + '</div>' + (a.w ? '<button class="ac-w" data-fw="' + a.w + '">View animated workflow \u2192</button>' : '') + (a.b ? '<button class="ac-w" data-bi="1">View animated dashboard \u2192</button>' : '') + '</article>';
    }).join('');
  }

  function projects() {
    var N = { landing: 'Landing page', basic: 'Business site', event: 'Events', ecom: 'E-commerce', other: 'Others', automation: 'Automation', monitoring: 'Monitoring' }, seen = {}, L = [['all', 'All']];
    J.forEach(function (j) { if (!seen[j.c]) { seen[j.c] = 1; L.push([j.c, N[j.c] || j.c]) } });
    $('#fl').innerHTML = L.map(function (l) { return '<button class="tab" data-f="' + l[0] + '" aria-selected="' + (flt === l[0]) + '">' + l[1] + '</button>' }).join('');
    $('#pj').innerHTML = J.filter(function (j) { return flt === 'all' || j.c === flt }).map(function (j) {
      var bg = 'background:linear-gradient(135deg,' + j.a + ',' + j.b + ')', inner, link;
      inner = (j.v ? '<div class="vis">' + KG.visual(j.v) + '</div>' : '<span class="mk">' + j.m + '</span>');
      if (j.u) {
        var dm = j.u.replace('https://', '').replace(/\/$/, '');
        return '<article class="pc"><a class="im" href="' + j.u + '" target="_blank" rel="noopener noreferrer" aria-label="Visit ' + j.n + '" style="' + bg + '"><span class="bd">' + j.k + '</span>' + inner + '<span class="dm">' + dm + '</span></a>' + body(j, '<a class="vl" href="' + j.u + '" target="_blank" rel="noopener noreferrer">Visit live site ↗</a>') + '</article>';
      }
      return '<article class="pc sample"><div class="im" style="' + bg + '"><span class="bd">' + j.k + '</span>' + inner + '<span class="dm">Demo preview</span></div>' + body(j, '<a class="vl" href="#contact" data-go="contact">Request something similar →</a>') + '</article>';
    }).join('');
    function body(j, cta) { return '<div class="tx"><h3>' + j.n + '</h3><p>' + j.d + '</p><div class="tg">' + j.g.map(function (t) { return '<span>' + t + '</span>' }).join('') + '</div>' + cta + '</div>' }
  }

  function show(v) {
    views.forEach(function (x) { $('#v-' + x).classList.toggle('on', x === v) });
    document.querySelectorAll('nav a').forEach(function (a) { a.classList.toggle('on', a.dataset.go === v) });
  }
  function go(v) {
    if (v === 'contact') { $('#contact').scrollIntoView({ behavior: 'smooth' }); return }
    show(v); window.scrollTo(0, 0); try { history.replaceState(null, '', '#' + v) } catch (e) { }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-go]'); if (a) { e.preventDefault(); go(a.dataset.go); return }
    var t = e.target.closest('.tc,.tab[data-k]'); if (t) { cur = t.dataset.k; panel(); if (t.classList.contains('tc')) go('packages'); return }
    var f = e.target.closest('.tab[data-f]'); if (f) { flt = f.dataset.f; projects() }
  });

  /* contact form: package list */
  $('#sel').innerHTML = '<option value="">Not sure yet</option>' +
    Object.keys(GROUPS).map(function (g) {
      return '<optgroup label="' + GROUPS[g].charAt(0) + GROUPS[g].slice(1).toLowerCase() + '">' + P.filter(function (p) { return p.g === g }).map(function (p) { return '<option value="' + p.k + '">' + p.n + '</option>' }).join('') + '</optgroup>';
    }).join('');

  teaser(); cases(); panel(); projects();

  /* live numbers for the stats band */
  var live = J.filter(function (j) { return j.u }).length;
  document.querySelector('[data-stat="pk"]').dataset.to = P.length;
  document.querySelector('[data-stat="pj"]').dataset.to = live;

  var h = (location.hash || '').slice(1); show(views.indexOf(h) > -1 ? h : 'home');

  /* theme */
  var r = document.documentElement;
  try { var th = localStorage.getItem('kg-th'); if (th) r.setAttribute('data-theme', th) } catch (e) { }
  $('#th').onclick = function () {
    var d = r.getAttribute('data-theme') === 'dark' || (!r.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches), n = d ? 'light' : 'dark';
    r.setAttribute('data-theme', n); try { localStorage.setItem('kg-th', n) } catch (e) { }
  };

  $('#yr').textContent = new Date().getFullYear();
  $('#f').addEventListener('submit', function (e) {
    var f = e.target, pk = f.elements.Package.options[f.elements.Package.selectedIndex].text;
    f.elements._subject.value = 'Quote request — ' + pk;
  });
})();
