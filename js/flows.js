/* KG Dev Studio — animated workflow flowcharts (Anon-Pool Recovery, Server Restart) */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s) };
  var N = function (id, t, h, l, ic) { return { id: id, t: t, h: h, l: l || [], ic: ic } };
  var IC = { ol: 'O', xl: 'X', sp: 'S', fx: '{x}', lp: '\u27F3', tm: '\u23F1', cd: '\u2696', of: 'O' };

  var CH = {
    anon: {
      tab: 'Anon-Pool Recovery', mw: 1000,
      cols: [
        [N('s0', 'start', 'START'),
        N('n1', 'conf', '1. CONFIGURATION', ['Set BIN_PATH, HW_LOG_DIR, error patterns, LOGDIR, LOGFILE', 'Create the log directory']),
        N('n2', 'help', '2. HELPER FUNCTIONS', ['log(message)', 'rotate_logs()', 'get_latest_hw_log()', 'get_error_count()', 'print_last_n_errors()'])],
        [N('n3', 'conf', '3. MAIN · STARTUP', ['rotate_logs', 'Log: script execution started']),
        N('n4', 'proc', '4. IDENTIFY LATEST LOG', ['LATEST_LOG = get_latest_hw_log()']),
        N('n5', 'proc', '5. COUNT ANON POOL ERRORS', ['ERROR_COUNT = get_error_count()']),
        N('n6', 'proc', '6. LOG SUMMARY', ['Log the latest HW log checked', 'Log the anon pool error count']),
        N('n7', 'dec', '7. ARE THERE ANON POOL ERRORS?', ['ERROR_COUNT > 0']),
        N('n15', 'proc', '15. NO ERRORS FOUND', ['Log: no anon pool errors', 'Restart skipped'])],
        [N('n8', 'act', '8. SHOW LAST ERRORS', ['print_last_n_errors()']),
        N('n9', 'act', '9. LOG AND NOTIFY', ['Anon pool issue detected', 'Proceeding with server restart']),
        N('n10', 'act', '10. CHANGE TO BIN PATH', ['cd $BIN_PATH', 'If it fails: log error, exit 1']),
        N('n11', 'act', '11. STOP OCH WEB', ['./opmnctl stopall']),
        N('n12', 'act', '12. VERIFY STATUS (AFTER STOP)', ['./opmnctl status -l']),
        N('n13', 'act', '13. START OCH WEB', ['./opmnctl startall']),
        N('n14', 'act', '14. VERIFY STATUS (AFTER START)', ['./opmnctl status -l'])]
      ],
      foot: [N('n16', 'conf', '16. COMPLETION', ['Log: script execution completed successfully']), N('e', 'end', 'END', ['exit 0'])],
      edges: 's0>n1 n1>n2 n2>n3:u n3>n4 n4>n5 n5>n6 n6>n7 n7>n15:v:No n7>n8:u:Yes n8>n9 n9>n10 n10>n11 n11>n12 n12>n13 n13>n14 n14>n16:z n15>n16 n2>n16:l n16>e',
      sc: {
        yes: ['Errors found', 's0 n1 n2 n3 n4 n5 n6 n7 n8 n9 n10 n11 n12 n13 n14 n16 e'],
        no: ['No errors', 's0 n1 n2 n3 n4 n5 n6 n7 n15 n16 e']
      }
    },
    srv: {
      tab: 'Server Restart', mw: 1040,
      cols: [
        [N('s0', 'start', 'START'),
        N('c1', 'conf', '1. CONFIGURATION', ['LOGDIR and dated LOGFILE', 'DATE_FMT']),
        N('c2', 'conf', '2. ENVIRONMENT SETUP', ['source siebenv.sh (exit 1 if it fails)', 'Check password file exists', 'Read password into SIEBEL_PW']),
        N('c3', 'help', '3. FUNCTION DEFINITIONS', ['log()', 'run_srvrmgr(cmd)', 'abort(msg)']),
        N('c4', 'conf', '4. START (HEADERS)', ['Log the start header to LOGFILE'])],
        [N('c5', 'proc', '5. CAPTURE COMPONENT DATA', ['srvrmgr: list comp show alias, running tasks, max tasks', 'Abort if the output contains “fatal”']),
        N('c6', 'proc', '6. PARSE OUTPUT', ['awk extracts alias, running, max, start time', 'Empty: log WARNING and exit 0']),
        N('c7', 'help', '7. EXCLUDED COMPONENTS', ['DQMgr, FSMSrvr, GenTrig, ServerMgr, SRBroker, SRProc, SvrTblCleanup, SvrTaskPersist, AdminNotify, SCBroker, WorkActn, WorkMon']),
        N('c8', 'conf', '8. PROCESS EACH COMPONENT', ['Loops until the end of the parsed data']),
        N('k1', 'proc', '8.1 READ COMPONENT RECORD', ['alias, NUM_RUN, MAX_TASKS, start time']),
        N('k2', 'dec', '8.2–8.4 CHECKS', ['Empty field? Excluded? Numbers valid?', 'Any problem: skip to next component']),
        N('k3', 'dec', '8.5 ALREADY LOGGED?', ['Check LOGFILE']),
        N('k4', 'proc', '8.6 LOG COMPONENT STATUS', ['Formatted table line'])],
        [N('m7', 'dec', '8.7 IS COMPONENT MAXED OUT?', ['NUM_RUN >= MAX_TASKS']),
        [N('r9', 'act', '8.9 RESTART COMPONENT', ['Log: maxed out (x/y)', 'srvrmgr: kill comp', 'srvrmgr: start comp', 'Log: restarted']),
        N('r8', 'proc', '8.8 OPERATING NORMALLY', ['Log: component operating normally'])]]
      ],
      foot: [N('l9', 'conf', '9. LOG ROTATION', ['Keep the last 10 logs only', 'Delete older comp_monitor logs']), N('l10', 'conf', '10. END (FOOTER)', ['Log: Monitor Completed Successfully']), N('e', 'end', 'END', ['exit 0'])],
      row: 1,
      edges: 's0>c1 c1>c2 c2>c3 c3>c4 c4>c5:u c5>c6 c6>c7 c7>c8 c8>k1 k1>k2 k2>k3 k3>k4:v:No k4>m7:u m7>r9:z:Yes m7>r8:z:No r9>l9:z r8>l9:z l9>l10:h l10>e:h',
      sc: {
        yes: ['Component maxed out', 's0 c1 c2 c3 c4 c5 c6 c7 c8 k1 k2 k3 k4 m7 r9 l9 l10 e'],
        no: ['Operating normally', 's0 c1 c2 c3 c4 c5 c6 c7 c8 k1 k2 k3 k4 m7 r8 l9 l10 e']
      }
    }
  };

  CH.quiz = {
    tab: 'Quiz Email Flow', mw: 980, sp: { g0: 'cd', f0: 'cd' },
    cols: [
      [N('g0', 'gap', ''),
      N('g1', 'act', 'Get user profile (V2)', ['Get the profile of the user'], 'of'),
      N('g2', 'var', 'Compose (EmployeeAnswer)', ['Compose the employee answer'], 'fx'),
      N('g3', 'var', 'Compose (QuizID)', ['Compose the Quiz ID'], 'fx'),
      N('g4', 'act', 'List rows present in a table', ['Retrieve data from the Excel table'], 'xl'),
      N('g5', 'var', 'Compose (Category)', ['Compose the category'], 'fx'),
      N('g6', 'var', 'Compose CorrectAnswer', ['Compose the correct answer'], 'fx'),
      N('g7', 'var', 'Compose IsCorrect', ['Determine if answer is correct'], 'fx'),
      N('g8', 'var', 'Compose ResponseTimeSeconds', ['Calculate response time in seconds'], 'fx'),
      N('g9', 'act', 'Add a row into a table', ['Add the response as a new row in the Excel table'], 'xl')],
      [N('t0', 'proc', 'When a new email arrives (V3)', ['Trigger'], 'ol'), N('cd', 'dec', 'CONDITION', ['Evaluate the condition'], 'cd')],
      [N('f0', 'gap', ''), N('fa', 'skip', 'FALSE \u00B7 0 ACTIONS', ['Nothing happens, the flow ends'])]
    ],
    foot: [N('e', 'end', 'END', ['Flow completed'])],
    edges: 't0>cd cd>g1:w:True cd>fa:u:False g1>g2 g2>g3 g3>g4 g4>g5 g5>g6 g6>g7 g7>g8 g8>g9 g9>e:z fa>e:z',
    sc: { yes: ['Condition true', 't0 cd g1 g2 g3 g4 g5 g6 g7 g8 g9 e'], no: ['Condition false', 't0 cd fa e'] }
  };
  CH.clean = {
    tab: 'Data Cleanup', mw: 600, mx: 700,
    cols: [[
      N('rc', 'proc', 'Recurrence', ['Trigger the flow on a scheduled interval'], 'tm'),
      N('ls', 'act', 'List rows present in a table', ['Retrieve rows from the Excel table'], 'xl'),
      N('iv', 'var', 'Initialize variable', ['Initialize array variable to store rows'], 'fx'),
      N('lp', 'conf', 'Apply to each', ['Loop through each row from the Excel table'], 'lp'),
      N('cd', 'dec', 'CONDITION', ['Evaluate the condition for the current row'], 'cd'),
      [N('del', 'act', 'Delete a row', ['Delete the current row from the table'], 'xl'), N('ap', 'var', 'Append to array variable', ['Add the current row to the array variable'], 'fx')]
    ]],
    foot: [N('e', 'end', 'END', ['Flow completes after processing all rows'])],
    edges: 'rc>ls ls>iv iv>lp lp>cd cd>del:z:True cd>ap:z:False del>e:z ap>e:z',
    sc: { yes: ['Row deleted (True)', 'rc ls iv lp cd del e'], no: ['Row collected (False)', 'rc ls iv lp cd ap e'] }
  };
  CH.sync = {
    tab: 'Data Sync', mw: 980, sp: { g0: 'cd', f0: 'cd' },
    cols: [
      [N('g0', 'gap', ''),
      N('c1', 'var', 'Compose', ['Record already exists', 'Optional: prepare info / logging'], 'fx'),
      N('c2', 'var', 'Compose ConvertedResponseTime', ['Convert response time to the right format'], 'fx'),
      N('c3', 'act', 'Create item (SharePoint List)', ['Create a new item in the SharePoint list'], 'sp')],
      [N('rc', 'proc', 'Recurrence', ['Trigger the flow on a scheduled interval'], 'tm'),
      N('ls', 'act', 'List rows present in a table (Excel)', ['Retrieve data from the Excel table'], 'xl'),
      N('ky', 'var', 'Compose CurrentUniqueKey', ['Compose a unique key for the current record'], 'fx'),
      N('gi', 'act', 'Get items (SharePoint)', ['Check SharePoint list for matching record'], 'sp'),
      N('cd', 'dec', 'CONDITION', ['Record exists?'], 'cd')],
      [N('f0', 'gap', ''), N('sk', 'skip', 'END / SKIP', ['Record not found', 'No action taken'])]
    ],
    foot: [N('e', 'end', 'END', ['Flow completed for the current record'])],
    edges: 'rc>ls ls>ky ky>gi gi>cd cd>c1:w:Yes c1>c2 c2>c3 cd>sk:u:No c3>e:z sk>e:z',
    sc: { yes: ['Record exists (Yes)', 'rc ls ky gi cd c1 c2 c3 e'], no: ['Not found (No)', 'rc ls ky gi cd sk e'] }
  };

  var host = $('#fw'); if (!host) return;
  var cur = 'anon', scn = 'yes', seq = [], i = -1, playing = true, timer = 0, visible = false;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (reduce) playing = false;
  var chart, svg, now, edges = {};

  function nh(n) { return '<div class="fn t-' + n.t + '" data-id="' + n.id + '"><h4>' + (n.ic ? '<i class="ni ni-' + n.ic + '">' + IC[n.ic] + '</i>' : '') + n.h + '</h4>' + n.l.map(function (x) { return '<p>' + x + '</p>' }).join('') + '</div>' }
  function ch(cols) { return cols.map(function (c) { return '<div class="fc">' + c.map(function (x) { return Array.isArray(x) ? '<div class="fr">' + x.map(nh).join('') + '</div>' : nh(x) }).join('') + '</div>' }).join('') }

  function build() {
    var C = CH[cur];
    $('#fw-tabs').innerHTML = Object.keys(CH).map(function (k) { return '<button class="tab" data-fw="' + k + '" aria-selected="' + (k === cur) + '">' + CH[k].tab + '</button>' }).join('');
    $('#fw-sc').innerHTML = Object.keys(C.sc).map(function (k) { return '<button class="fw-b" data-sc="' + k + '" aria-pressed="' + (k === scn) + '">' + C.sc[k][0] + '</button>' }).join('');
    chart = $('#fw-chart'); chart.style.setProperty('--mw', C.mw + 'px'); chart.style.setProperty('--n', C.cols.length); chart.style.setProperty('--mx', C.mx ? C.mx + 'px' : 'none');
    chart.innerHTML = '<div class="fcols">' + ch(C.cols) + '</div><div class="ffoot' + (C.row ? ' row' : '') + '">' + C.foot.map(nh).join('') + '</div><svg class="fsvg" aria-hidden="true"></svg>';
    svg = $('.fsvg', chart); now = $('#fw-now');
    requestAnimationFrame(function () { var s = C.sp || {}; Object.keys(s).forEach(function (g) { var el = $('[data-id="' + g + '"]', chart), a = $('[data-id="' + s[g] + '"]', chart); el.style.height = Math.max(0, a.getBoundingClientRect().bottom - el.getBoundingClientRect().top + 34) + 'px' }); draw(); restart() });
  }

  function R(id) { var r = $('[data-id="' + id + '"]', chart).getBoundingClientRect(), c = chart.getBoundingClientRect(); return { l: r.left - c.left, r: r.right - c.left, t: r.top - c.top, b: r.bottom - c.top, x: (r.left + r.right) / 2 - c.left, y: (r.top + r.bottom) / 2 - c.top } }
  function draw() {
    var C = CH[cur], w = chart.offsetWidth, h = chart.offsetHeight, out = '<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#7f93b8"/></marker></defs>';
    edges = {};
    C.edges.split(' ').forEach(function (s) {
      var p = s.split(':'), ab = p[0].split('>'), k = p[1] || 'v', A = R(ab[0]), B = R(ab[1]), d;
      if (k === 'v') d = Math.abs(A.x - B.x) < 4 ? 'M' + A.x + ' ' + A.b + 'V' + B.t : 'M' + A.x + ' ' + A.b + 'V' + (A.b + B.t) / 2 + 'H' + B.x + 'V' + B.t;
      else if (k === 'z') d = 'M' + A.x + ' ' + A.b + 'V' + (A.b + B.t) / 2 + 'H' + B.x + 'V' + B.t;
      else if (k === 'u') { var mx = (A.r + B.l) / 2; d = 'M' + A.r + ' ' + A.y + 'H' + mx + 'V' + B.y + 'H' + B.l }
      else if (k === 'w') { var wx = (A.l + B.r) / 2; d = 'M' + A.l + ' ' + A.y + 'H' + wx + 'V' + B.y + 'H' + B.r }
      else if (k === 'l') d = 'M' + A.x + ' ' + A.b + 'V' + B.y + 'H' + B.l;
      else d = 'M' + A.r + ' ' + A.y + 'H' + B.l;
      var lx = k === 'w' ? A.l - 40 : k === 'u' || k === 'h' ? A.r + 8 : k === 'z' ? B.x + 8 : A.x + 8, ly = k === 'u' || k === 'h' || k === 'w' ? A.y - 7 : k === 'z' ? B.t - 8 : A.b + 17, lab = p[2] ? '<text class="el" x="' + lx + '" y="' + ly + '">' + p[2] + '</text>' : '';
      out += '<path class="e" data-e="' + ab[0] + '>' + ab[1] + '" d="' + d + '" marker-end="url(#ar)"/><path class="ef" data-f="' + ab[0] + '>' + ab[1] + '" d="' + d + '"/>' + lab;
    });
    svg.setAttribute('width', w); svg.setAttribute('height', h); svg.innerHTML = out;
  }

  function clear() {
    chart.classList.remove('run');
    chart.querySelectorAll('.on,.done').forEach(function (e) { e.classList.remove('on', 'done') });
    svg.querySelectorAll('.act,.dn').forEach(function (e) { e.classList.remove('act', 'dn') });
  }
  function restart() { clearTimeout(timer); seq = CH[cur].sc[scn][1].split(' '); i = -1; clear(); now.innerHTML = '<b>Ready.</b> Press play or step through the workflow.'; if (playing && visible) timer = setTimeout(next, 700) }

  function find(id) { var n = null; CH[cur].cols.concat([CH[cur].foot]).forEach(function (c) { c.forEach(function (x) { (Array.isArray(x) ? x : [x]).forEach(function (y) { if (y.id === id) n = y }) }) }); return n }
  function next() {
    clearTimeout(timer);
    if (i >= seq.length - 1) { if (playing) timer = setTimeout(restart, 2400); return }
    var prev = seq[i], id = seq[++i];
    chart.classList.add('run');
    chart.querySelectorAll('.on').forEach(function (e) { e.classList.remove('on'); e.classList.add('done') });
    svg.querySelectorAll('.act').forEach(function (e) { e.classList.remove('act'); var m = svg.querySelector('[data-e="' + e.dataset.f + '"]'); if (m) m.classList.add('dn') });
    var el = $('[data-id="' + id + '"]', chart); el.classList.add('on');
    var f = prev && svg.querySelector('[data-f="' + prev + '>' + id + '"]'); if (f) f.classList.add('act');
    var n = find(id), lab = ''; if (i < seq.length - 1) { var t = svg.querySelector('[data-e="' + id + '>' + seq[i + 1] + '"]'); if (n.t === 'dec' && t) { var tx = (CH[cur].edges.split(' ').filter(function (s) { return s.indexOf(id + '>' + seq[i + 1]) === 0 })[0] || '').split(':')[2]; if (tx) lab = ' <em>→ ' + tx + '</em>' } }
    now.innerHTML = '<span>Step ' + (i + 1) + ' of ' + seq.length + '</span><b>' + n.h + lab + '</b>' + (n.l[0] ? ' · ' + n.l[0] : '');
    var sc = el.closest('.fw-scroll'); if (sc && el.offsetLeft + el.offsetWidth > sc.scrollLeft + sc.clientWidth || (sc && el.offsetLeft < sc.scrollLeft)) sc.scrollTo({ left: Math.max(0, el.offsetLeft - 40), behavior: 'smooth' });
    if (playing) timer = setTimeout(next, 1250);
  }
  function setPlay(p) { playing = p; $('#fw-play').textContent = p ? '❚❚ Pause' : '▶ Play'; clearTimeout(timer); if (p) { if (i >= seq.length - 1) restart(); else timer = setTimeout(next, 300) } }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-fw]'); if (t) { cur = t.dataset.fw; scn = 'yes'; build(); if (t.classList.contains('ac-w')) { var go = document.querySelector('#fw-tabs'); document.querySelector('[data-go=home]'); $('#flows').scrollIntoView({ behavior: 'smooth' }) } return }
    t = e.target.closest('[data-sc]'); if (t) { scn = t.dataset.sc; $('#fw-sc').querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b === t) }); playing = !reduce; setPlay(playing); restart(); return }
    if (e.target.closest('#fw-play')) { setPlay(!playing); return }
    if (e.target.closest('#fw-step')) { playing = false; $('#fw-play').textContent = '▶ Play'; next(); return }
    if (e.target.closest('#fw-re')) { restart() }
  });
  var rz; addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(function () { if (chart.offsetWidth) { draw(); var k = i; restart(); playing = false; $('#fw-play').textContent = '▶ Play'; for (var j = 0; j <= k; j++) next() } }, 200) });

  build(); $('#fw-play').textContent = playing ? '❚❚ Pause' : '▶ Play';
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) {
    visible = es[0].isIntersecting; if (visible && playing && i < 0) timer = setTimeout(next, 600); else if (!visible) clearTimeout(timer); else if (playing) timer = setTimeout(next, 400);
  }, { threshold: .25 }).observe(host); else { visible = true; restart() }
})();
