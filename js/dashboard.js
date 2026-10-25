/* KG Dev Studio — animated Power BI dashboard walkthrough (illustrative sample data) */
(function () {
  var host = document.getElementById('db'); if (!host) return;
  var $ = function (s, r) { return (r || document).querySelector(s) };
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var T = ['Employee details', 'Team compliance', 'Training heatmap', 'Executive summary'];
  var cur = 0, timer = 0, visible = false, started = false;
  var TEAMS = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G', 'Team H'];

  function kp(l, v, c, s, suf) { return '<div class="kp"><small style="color:' + c + '">' + l + '</small><b data-n="' + v + '" data-s="' + (suf || '') + '">0</b><em>' + s + '</em></div>' }
  function pill(s) { var c = { 'Not Started': 'ns', 'In Progress': 'ip', 'Completed': 'ok' }[s]; return '<span class="pl ' + c + '">' + s + '</span>' }
  function col(p) { return p >= 95 ? '#22a559' : p >= 80 ? '#e8a317' : '#d9453d' }

  var V = [
    function () {
      var rows = [['emp-014', 'Team A', 'Cybersecurity Awareness (FY27)', 'Not Started', '\u2014'], ['emp-021', 'Team B', 'Cybersecurity Awareness (FY27)', 'In Progress', '\u2014'], ['emp-007', 'Team C', 'Data Privacy Essentials', 'Completed', 'Sep 12, 2026'], ['emp-033', 'Team A', 'Cybersecurity Awareness (FY27)', 'Not Started', '\u2014'], ['emp-040', 'Team D', 'Secure Coding Basics', 'In Progress', '\u2014'], ['emp-002', 'Team E', 'Data Privacy Essentials', 'Completed', 'Sep 09, 2026']];
      return '<div class="kps">' + kp('TOTAL RESOURCES', 48, '#6d3fd0', 'Active resources') + kp('TOTAL TRAININGS', 18, '#e8a317', 'Unique assigned trainings') + kp('PENDING', 37, '#e8a317', 'Requires follow-up') + kp('OVERDUE', 0, '#d9453d', 'Immediate attention') + kp('LATEST COMPLETION', 100, '#22a559', 'Latest completed trainings', '%') + '</div>' +
        '<div class="grid2"><aside class="flt"><h5>FILTERS</h5><span>Employee</span><i>All \u25BE</i><span>Training name</span><i>All \u25BE</i><span>Team</span><i>All \u25BE</i><span>Training status</span><i>Multiple \u25BE</i></aside>' +
        '<div class="tbl"><h5>EMPLOYEE TRAINING DETAILS</h5><table><tr><th>Employee</th><th>Team</th><th>Training</th><th>Status</th><th>Completed</th></tr>' +
        rows.map(function (r, i) { return '<tr class="rw" style="--i:' + i + '"><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td><td>' + pill(r[3]) + '</td><td>' + r[4] + '</td></tr>' }).join('') + '</table></div></div>';
    },
    function () {
      var C = [78, 81, 402, 203, 486, 409, 98, 105], P = [1, 1, 8, 4, 8, 7, 2, 3];
      return '<div class="kps">' + kp('TOTAL RESOURCES', 48, '#6d3fd0', 'Active resources') + kp('COMPLIANCE RATE', 98, '#1565ff', 'Target: 100%', '%') + kp('COMPLETED', 1862, '#22a559', 'Completed trainings') + kp('PENDING', 34, '#e8a317', 'Requires follow-up') + kp('OVERDUE', 0, '#d9453d', 'Immediate attention') + '</div>' +
        '<div class="grid3"><div class="tbl"><h5>TRAINING SUMMARY BY TEAM</h5><table><tr><th>Team</th><th>Completed</th><th>Pending</th><th>Compliance</th></tr>' +
        TEAMS.map(function (t, i) { var p = Math.round(100 * C[i] / (C[i] + P[i])); return '<tr class="rw" style="--i:' + i + '"><td>' + t + '</td><td>' + C[i] + '</td><td>' + P[i] + '</td><td><span class="dbar"><i style="--w:' + p + ';background:' + col(p) + '"></i></span> <b class="dpc">' + p + '%</b></td></tr>' }).join('') + '</table></div>' +
        '<div class="dring"><h5>OVERALL COMPLIANCE</h5><svg viewBox="0 0 120 120"><circle class="rb" cx="60" cy="60" r="50"/><circle class="rf" cx="60" cy="60" r="50" pathLength="100" style="--p:98"/></svg><b data-n="98" data-s="%">0</b><small>1,862 of 1,896</small></div></div>';
    },
    function () {
      var H = ['Course A', 'Course B', 'Course C', 'Course D', 'Course E', 'Course F'], L = [31, 24, 36, 52, 12, 9, 0];
      return '<h5 class="hh">TRAINING COMPLIANCE BY TEAM AND TRAINING (%)</h5><div class="tbl"><table class="hm"><tr><th>Team</th>' + H.map(function (h) { return '<th>' + h + '</th>' }).join('') + '</tr>' +
        TEAMS.slice(0, 7).map(function (t, r) { return '<tr><td>' + t + '</td>' + H.map(function (h, c) { var v = c === 5 ? L[r] : 100, g = v === 100 ? '#22a559' : v >= 50 ? '#e8a317' : '#d9453d'; return '<td class="cl" style="--d:' + (r + c) * 70 + ';background:' + g + '">' + v + '%</td>' }).join('') + '</tr>' }).join('') + '</table></div><p class="leg"><i style="background:#22a559"></i>Compliant <i style="background:#e8a317"></i>At risk <i style="background:#d9453d"></i>Non-compliant</p>';
    },
    function () {
      var R = [['Team E', 12], ['Team C', 9], ['Team G', 0]], I = ['0 teams are fully compliant across every required training.', '1,054 training assignments have been completed.', '40 assignments are pending and need employee follow-up.', '0 overdue trainings need immediate attention.', '5 teams are below the 80% compliance target.'];
      return '<div class="exec"><div class="es"><h5>EXECUTIVE SUMMARY</h5><p>Overall training compliance is currently <b>96.3%</b>. <b>40</b> pending trainings remain and require attention before the due date.</p></div>' +
        '<div class="kps k3">' + kp('COMPLIANCE RATE', 96, '#1565ff', 'Target: 100%', '%') + kp('COMPLETED', 1054, '#22a559', 'Completed trainings') + kp('PENDING', 40, '#e8a317', 'Requires follow-up') + '</div></div>' +
        '<div class="grid2 g2"><div class="tbl"><h5>TEAM COMPLIANCE OVERVIEW</h5><table><tr><th>Team</th><th>Compliance</th><th>Risk</th><th>Action</th></tr>' +
        R.map(function (r, i) { return '<tr class="rw" style="--i:' + i + '"><td>' + r[0] + '</td><td><span class="dbar"><i style="--w:' + Math.max(r[1], 3) + ';background:#d9453d"></i></span> <b class="dpc">' + r[1] + '%</b></td><td><span class="pl hi">HIGH</span></td><td>Review overdue and pending trainings</td></tr>' }).join('') + '</table></div>' +
        '<div class="ins"><h5>KEY INSIGHTS</h5>' + I.map(function (x, i) { return '<p class="rw" style="--i:' + (i + 2) + '"><i></i>' + x + '</p>' }).join('') + '</div></div>';
    }
  ];

  function count() {
    host.querySelectorAll('[data-n]').forEach(function (el) {
      var to = +el.dataset.n, s = el.dataset.s || '', t0 = performance.now(), f = function (t) {
        var k = reduce ? 1 : Math.min(1, (t - t0) / 1100), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(to * e).toLocaleString('en-US') + s; if (k < 1) requestAnimationFrame(f)
      }; requestAnimationFrame(f);
    });
  }
  function show(i) {
    cur = i; clearTimeout(timer);
    $('#db-tabs').innerHTML = T.map(function (t, k) { return '<button class="tab" data-db="' + k + '" aria-selected="' + (k === i) + '">' + t + '</button>' }).join('');
    var b = $('#db-body'); b.innerHTML = '<div class="dv">' + V[i]() + '</div>'; count();
    if (!reduce && visible) timer = setTimeout(function () { show((cur + 1) % T.length) }, 7500);
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-db]'); if (t) { show(+t.dataset.db); return }
    if (e.target.closest('[data-bi]')) $('#dash').scrollIntoView({ behavior: 'smooth' });
  });
  host.addEventListener('mouseenter', function () { clearTimeout(timer) });
  host.addEventListener('mouseleave', function () { if (!reduce && visible) timer = setTimeout(function () { show((cur + 1) % T.length) }, 3000) });
  show(0);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) {
    visible = es[0].isIntersecting; if (visible) { show(cur) } else clearTimeout(timer)
  }, { threshold: .3 }).observe(host); else visible = true;
})();
