// Contrast audit for the browser pane (javascript_tool): paste or inject, then call window.__contrast() and read the result.
// Lists leaf text elements whose colour against the effective background is below WCAG AA (4.5, or 3 for large text).
window.__contrast = function () {
  const parse = (s) => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
  const over = (top, bot) => ({ r: top.r * top.a + bot.r * (1 - top.a), g: top.g * top.a + bot.g * (1 - top.a), b: top.b * top.a + bot.b * (1 - top.a), a: 1 });
  const bgOf = (el) => {
    const layers = [];
    for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor); if (c && c.a > 0) { layers.push(c); if (c.a === 1) break; } }
    let base = { r: document.documentElement.classList.contains('dark') ? 15 : 241, g: document.documentElement.classList.contains('dark') ? 23 : 245, b: document.documentElement.classList.contains('dark') ? 42 : 249, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
    return base;
  };
  const out = [];
  const seen = new Set();
  document.querySelectorAll('body *').forEach((el) => {
    if (el.closest('svg') || !el.childNodes.length) return;
    const own = Array.from(el.childNodes).filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(' ');
    if (!own) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || el.getBoundingClientRect().width === 0) return;
    const fg = parse(cs.color); if (!fg) return;
    const bg = bgOf(el);
    const fgc = over({ ...fg, a: fg.a * (parseFloat(cs.opacity) || 1) }, bg);
    const L1 = lum(fgc), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const px = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight, 10) >= 700;
    const need = px >= 24 || (px >= 18.66 && bold) ? 3 : 4.5;
    if (ratio < need) {
      const key = el.className + '|' + cs.color + '|' + Math.round(ratio * 10);
      if (seen.has(key)) return; seen.add(key);
      out.push({ text: own.slice(0, 30), ratio: Math.round(ratio * 100) / 100, need, cls: String(el.className).slice(0, 90) });
    }
  });
  return out;
};
