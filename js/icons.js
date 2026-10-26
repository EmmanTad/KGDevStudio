/* KG Dev Studio — animated SVG service icons (animated with css/tech.css) */
window.KG.icon = function (key) {
  var o = '<svg viewBox="0 0 64 64" aria-hidden="true">', c = '</svg>', I = {
    web: o + '<rect x="6" y="10" width="52" height="44" rx="6"/><path d="M6 21h52"/><circle cx="12" cy="15.5" r=".8"/><circle cx="17" cy="15.5" r=".8"/>' +
      '<path class="ln a2" d="M14 30h26"/><path class="ln" d="M14 38h34"/><path class="ln a2" d="M14 46h20"/><rect class="cur" x="37" y="43" width="3" height="6"/>' + c,
    cart: o + '<path d="M6 10h8l6 28h28l6-20H16"/><circle cx="24" cy="49" r="3.5"/><circle cx="44" cy="49" r="3.5"/><rect class="drop" x="28" y="14" width="9" height="9" rx="2"/>' + c,
    gear: o + '<g class="fx g1"><circle cx="25" cy="27" r="13" stroke-width="5" stroke-dasharray="5.1 5.1"/><circle cx="25" cy="27" r="8"/><circle cx="25" cy="27" r="3" class="a2"/></g>' +
      '<g class="fx g2"><circle cx="46" cy="46" r="8" stroke-width="4" stroke-dasharray="4.2 4.2" class="a2"/><circle cx="46" cy="46" r="4.5" class="a2"/></g>' + c,
    pulse: o + '<rect x="5" y="9" width="54" height="40" rx="6"/><path d="M24 57h16M32 49v8"/><path class="ecg a2" pathLength="100" d="M10 31h10l4-10 6 20 5-14 3 4h16"/>' + c,
    dash: o + '<rect x="6" y="8" width="52" height="48" rx="6"/><path d="M6 18h52"/><rect class="bar" x="14" y="30" width="6" height="20" rx="1"/><rect class="bar" x="25" y="30" width="6" height="20" rx="1"/><rect class="bar" x="36" y="30" width="6" height="20" rx="1"/><rect class="bar" x="47" y="30" width="6" height="20" rx="1"/>' + c,
    shield: o + '<circle class="ring a2" cx="32" cy="32" r="22"/><path d="M32 6l20 8v14c0 14-9 24-20 30C21 52 12 42 12 28V14z"/><path class="tick a2" d="M22 32l7 7 13-14"/>' + c
  };
  return I[key] || I.web;
};

/* animated mini visuals used inside project cards */
window.KG.visual = function (kind) {
  if (kind === 'flow') return '<svg viewBox="0 0 280 90" aria-hidden="true"><path d="M30 45h220"/>' +
    '<g class="nd"><rect x="8" y="26" width="44" height="38" rx="8"/><rect x="78" y="26" width="44" height="38" rx="8"/><rect x="148" y="26" width="44" height="38" rx="8"/><rect x="218" y="26" width="44" height="38" rx="8"/></g>' +
    '<path d="M22 45h16M92 38h16M92 52h16M162 45l8 8 12-14M232 40l12 5-12 5z"/>' +
    '<circle class="pk" cx="40" cy="45" r="4"/><circle class="pk" cx="40" cy="45" r="4"/><circle class="pk" cx="40" cy="45" r="4"/></svg>';
  if (kind === 'pulse') return '<svg viewBox="0 0 280 90" aria-hidden="true"><path d="M4 45h60l14-34 22 68 18-48 10 14h148" class="ecg" pathLength="100"/><circle class="dt" cx="268" cy="14" r="5"/></svg>';
  return '';
};
