/* Flat-modern vector illustration library — Deck PAUD HI & Kemitraan Strategis
   Seluruh ilustrasi dibangun dari primitif SVG agar gaya konsisten di semua slide. */

const P = {
  blue: '#1E76C8', blueD: '#12518F', blueL: '#8CC6F0', blueXL: '#DCEDFB',
  green: '#2FA36B', greenD: '#1C7A4C', greenL: '#8FD9B2', greenXL: '#E3F6EC',
  orange: '#F5871F', orangeD: '#CE6A0C', orangeL: '#FFC28C', orangeXL: '#FFF1E0',
  yellow: '#FFC53D', yellowL: '#FFE082',
  red: '#EF6A5E', redD: '#D24A3E', pink: '#EE8FAC', purple: '#8E7CC3', purpleD: '#6C5AA0',
  teal: '#2BB3B3', tealD: '#1C8C8C',
  white: '#FFFFFF', ink: '#173753', inkL: '#4A6A85',
  navy: '#2C4A63',
  grass: '#8AD3A6', grassD: '#5FBE8B', grassXD: '#3FA574',
  wood: '#C68B59', woodD: '#9E6C3F', roof: '#EF8B62'
};
const SKIN = ['#F7CBA6', '#EEB187', '#D79A6E', '#B87B50'];
const HAIR = ['#2E2119', '#3D2B1F', '#4A3423', '#1F1712'];

const R = (n) => Number(Number(n).toFixed(2));
const cap = (x1, y1, x2, y2, w, c) =>
  `<line x1="${R(x1)}" y1="${R(y1)}" x2="${R(x2)}" y2="${R(y2)}" stroke="${c}" stroke-width="${R(w)}" stroke-linecap="round"/>`;
const circ = (cx, cy, r, f, extra = '') => `<circle cx="${R(cx)}" cy="${R(cy)}" r="${R(r)}" fill="${f}" ${extra}/>`;
const ell = (cx, cy, rx, ry, f, extra = '') => `<ellipse cx="${R(cx)}" cy="${R(cy)}" rx="${R(rx)}" ry="${R(ry)}" fill="${f}" ${extra}/>`;
const rect = (x, y, w, h, f, r = 0, extra = '') =>
  `<rect x="${R(x)}" y="${R(y)}" width="${R(w)}" height="${R(h)}" rx="${R(r)}" fill="${f}" ${extra}/>`;
const path = (d, f, extra = '') => `<path d="${d}" fill="${f}" ${extra}/>`;
const g = (inner, transform = '', extra = '') => `<g ${transform ? `transform="${transform}"` : ''} ${extra}>${inner}</g>`;

/* ------------------------------------------------------------------ ORANG
   Acuan: kaki di (0,0). Dewasa tinggi ±160 unit, anak ±113 unit. */
const ARM = {
  down: { e: [0.50, 0.52], h: [0.62, 0.98] },
  open: { e: [0.66, 0.40], h: [1.18, 0.20] },
  up: { e: [0.62, 0.22], h: [0.86, -0.58] },
  hip: { e: [0.70, 0.48], h: [0.34, 0.80] },
  hold: { e: [0.60, 0.52], h: [0.22, 0.86] },
  front: { e: [0.58, 0.50], h: [0.10, 0.70] },
  wave: { e: [0.62, 0.30], h: [1.00, -0.62] },
  point: { e: [0.60, 0.44], h: [1.30, 0.16] }
};

function person(o = {}) {
  const {
    x = 0, y = 0, s = 1, flip = false, child = false,
    skin = SKIN[0], hair = HAIR[0], hairStyle = 'short',
    shirt = P.blue, pants = P.navy, shoe = '#33475C',
    arms = 'down', hijab = null, cheeks = true, extras = '', shadow = true
  } = o;

  const M = child
    ? { hipY: -34, shY: -76, neckY: -82, headY: -98, r: 17, bw: 34, limb: 9.5, armLen: 32, foot: 7 }
    : { hipY: -58, shY: -114, neckY: -121, headY: -142, r: 20, bw: 44, limb: 11.5, armLen: 44, foot: 8 };

  let out = '';
  if (shadow) out += ell(0, 4, M.bw * 0.78, M.bw * 0.15, 'rgba(23,55,83,0.10)');

  // kaki + sepatu
  out += cap(-M.bw * 0.21, M.hipY + 6, -M.bw * 0.25, -M.foot, M.limb, pants);
  out += cap(M.bw * 0.21, M.hipY + 6, M.bw * 0.25, -M.foot, M.limb, pants);
  out += cap(-M.bw * 0.33, -M.foot * 0.45, -M.bw * 0.12, -M.foot * 0.45, M.limb * 0.98, shoe);
  out += cap(M.bw * 0.12, -M.foot * 0.45, M.bw * 0.33, -M.foot * 0.45, M.limb * 0.98, shoe);

  // badan
  out += rect(-M.bw / 2, M.shY, M.bw, (M.hipY - M.shY) + 12, shirt, M.bw * 0.33);

  // lengan (dua ruas + telapak)
  const L = M.armLen, sy = M.shY + M.limb * 0.85, sx = M.bw * 0.40;
  const drawArm = (side, pose) => {
    const cfg = ARM[pose] || ARM.down;
    const bx = side * sx;
    const ex = bx + side * cfg.e[0] * L, ey = sy + cfg.e[1] * L;
    const hx = bx + side * cfg.h[0] * L, hy = sy + cfg.h[1] * L;
    return cap(bx, sy, ex, ey, M.limb * 0.88, shirt) +
      cap(ex, ey, hx, hy, M.limb * 0.80, shirt) +
      circ(hx, hy, M.limb * 0.48, skin);
  };
  const oneSided = (arms === 'wave' || arms === 'point');
  out += drawArm(-1, oneSided ? 'down' : arms);
  out += drawArm(1, arms);

  // leher
  out += cap(0, M.neckY + 7, 0, M.neckY - 2, M.limb * 0.82, skin);

  // rambut belakang / jilbab
  const hy0 = M.headY, r = M.r;
  if (hijab) {
    out += path(`M ${R(-r - 2)} ${R(hy0 - 2)}
      C ${R(-r * 1.18)} ${R(hy0 + r * 1.25)} ${R(-r * 0.95)} ${R(hy0 + r * 1.85)} ${R(-r * 0.52)} ${R(hy0 + r * 2.05)}
      L ${R(r * 0.52)} ${R(hy0 + r * 2.05)}
      C ${R(r * 0.95)} ${R(hy0 + r * 1.85)} ${R(r * 1.18)} ${R(hy0 + r * 1.25)} ${R(r + 2)} ${R(hy0 - 2)} z`, hijab);
    out += circ(0, hy0, r + 2, hijab);
    out += ell(0, hy0 + 1.5, r * 0.76, r * 0.85, skin);
  } else {
    if (hairStyle === 'long') out += rect(-r - 2, hy0 - 6, (r + 2) * 2, r * 2.4, hair, r * 0.85);
    else if (hairStyle === 'bob') out += rect(-r - 2, hy0 - 6, (r + 2) * 2, r * 1.7, hair, r * 0.8);
    else if (hairStyle === 'bun') out += circ(0, hy0 - r - 5, r * 0.42, hair);
    else if (hairStyle === 'pigtail') { out += circ(-r - 4, hy0 + 4, r * 0.38, hair); out += circ(r + 4, hy0 + 4, r * 0.38, hair); }
    out += circ(0, hy0, r, skin);
    if (hairStyle === 'cap') {
      out += path(`M ${R(-r - 1)} ${R(hy0 - 1)} a ${R(r + 1)} ${R(r + 1)} 0 0 1 ${R(2 * (r + 1))} 0 z`, P.red);
      out += rect(-r - 8, hy0 - 4, r * 1.3, 5.5, P.redD, 2.6);
    } else if (hairStyle === 'curly') {
      out += path(`M ${R(-r)} ${R(hy0 + 1)} a ${R(r)} ${R(r)} 0 0 1 ${R(2 * r)} 0 z`, hair);
      for (let i = -2; i <= 2; i++) out += circ(i * r * 0.42, hy0 - r * 0.82 + Math.abs(i) * 2.4, r * 0.30, hair);
    } else if (hairStyle === 'bald') { /* tanpa rambut */ }
    else {
      out += path(`M ${R(-r)} ${R(hy0 - 1)} a ${R(r)} ${R(r)} 0 0 1 ${R(2 * r)} 0
        q ${R(-r * 0.48)} ${R(r * 0.36)} ${R(-r * 1.02)} ${R(r * 0.06)}
        q ${R(-r * 0.46)} ${R(-r * 0.26)} ${R(-r * 0.98)} ${R(-r * 0.06)} z`, hair);
    }
  }

  // wajah
  const eo = r * 0.36, ey0 = hy0 + r * 0.08;
  out += circ(-eo, ey0, r * 0.12, '#2B2B2B') + circ(eo, ey0, r * 0.12, '#2B2B2B');
  out += `<path d="M ${R(-r * 0.28)} ${R(hy0 + r * 0.40)} q ${R(r * 0.28)} ${R(r * 0.32)} ${R(r * 0.56)} 0"
      stroke="#2B2B2B" stroke-width="${R(r * 0.10)}" fill="none" stroke-linecap="round"/>`;
  if (cheeks) {
    out += circ(-r * 0.64, hy0 + r * 0.36, r * 0.15, 'rgba(238,143,172,0.55)');
    out += circ(r * 0.64, hy0 + r * 0.36, r * 0.15, 'rgba(238,143,172,0.55)');
  }
  out += extras;

  return g(out, `translate(${R(x)},${R(y)}) scale(${R(flip ? -s : s)},${R(s)})`);
}

/* --------------------------------------------------------------- PROPERTI */
const sun = (x, y, r) => {
  let s = '';
  for (let i = 0; i < 12; i++) {
    const a = (i * 30) * Math.PI / 180;
    s += cap(x + Math.cos(a) * r * 1.30, y + Math.sin(a) * r * 1.30, x + Math.cos(a) * r * 1.66, y + Math.sin(a) * r * 1.66, r * 0.17, P.yellow);
  }
  return s + circ(x, y, r * 1.17, '#FFE9A8') + circ(x, y, r, P.yellow);
};
const cloud = (x, y, s, op = 1) => g(
  ell(0, 0, 46, 26, '#FFFFFF') + ell(-34, 8, 30, 19, '#FFFFFF') + ell(36, 8, 27, 17, '#FFFFFF') + rect(-40, -6, 80, 22, '#FFFFFF', 11),
  `translate(${R(x)},${R(y)}) scale(${s})`, `opacity="${op}"`);
const hill = (w, baseY, h, c) =>
  path(`M 0 ${R(baseY)} Q ${R(w * 0.28)} ${R(baseY - h)} ${R(w * 0.55)} ${R(baseY - h * 0.45)} Q ${R(w * 0.80)} ${R(baseY - h * 1.1)} ${R(w)} ${R(baseY - h * 0.3)} L ${R(w)} ${R(baseY + 500)} L 0 ${R(baseY + 500)} z`, c);
const tree = (x, y, s) => g(
  rect(-11, -66, 22, 70, P.woodD, 7) + circ(-38, -70, 34, P.grassD) + circ(38, -70, 34, P.grassD) + circ(0, -98, 46, P.grassXD) + circ(4, -64, 32, P.grassXD),
  `translate(${R(x)},${R(y)}) scale(${s})`);
const bush = (x, y, s) => g(circ(-24, 0, 22, P.grassD) + circ(24, 0, 20, P.grassD) + circ(0, -12, 28, P.grassXD) + rect(-46, -6, 92, 12, P.grassD, 6), `translate(${R(x)},${R(y)}) scale(${s})`);
const flower = (x, y, s, c) => g(
  cap(0, 0, 0, -24, 3.4, P.grassXD) +
  [0, 72, 144, 216, 288].map(a => circ(Math.cos(a * Math.PI / 180) * 7.5, -28 + Math.sin(a * Math.PI / 180) * 7.5, 5.8, c)).join('') +
  circ(0, -28, 3.8, P.yellow), `translate(${R(x)},${R(y)}) scale(${s})`);
const blocks = (x, y, s) => g(
  rect(-32, -24, 24, 24, P.red, 5) + rect(-6, -24, 24, 24, P.blue, 5) + rect(-19, -48, 24, 24, P.yellow, 5) + rect(20, -24, 24, 24, P.green, 5),
  `translate(${R(x)},${R(y)}) scale(${s})`);
const book = (x, y, s, c1 = P.orange, c2 = P.blue, c3 = P.green) => g(
  rect(-28, -10, 56, 10, c1, 3) + rect(-25, -20, 50, 10, c2, 3) + rect(-22, -30, 44, 10, c3, 3),
  `translate(${R(x)},${R(y)}) scale(${s})`);
const openBook = (x, y, s) => g(
  path('M -46 0 Q -24 -12 0 -6 L 0 16 Q -24 8 -46 20 z', P.white) +
  path('M 46 0 Q 24 -12 0 -6 L 0 16 Q 24 8 46 20 z', '#EFF5FA') +
  path('M -46 0 Q -24 -12 0 -6 L 0 -2 Q -24 -8 -46 4 z', P.blueL) +
  path('M 46 0 Q 24 -12 0 -6 L 0 -2 Q 24 -8 46 4 z', P.blueL), `translate(${R(x)},${R(y)}) scale(${s})`);
const ball = (x, y, r) => g(circ(0, 0, r, P.white) + path(`M ${-r} 0 a ${r} ${r} 0 0 1 ${2 * r} 0 z`, P.orange) + circ(0, 0, r * 0.24, P.blue) +
  `<circle cx="0" cy="0" r="${r}" fill="none" stroke="${P.orangeD}" stroke-width="2.5"/>`, `translate(${R(x)},${R(y)})`);
const balloon = (x, y, s, c) => g(ell(0, 0, 18, 22, c) + path('M -4 20 L 0 27 L 4 20 z', c) +
  `<path d="M 0 27 q 9 22 -2 44" stroke="${P.inkL}" stroke-width="2.4" fill="none"/>`, `translate(${R(x)},${R(y)}) scale(${s})`);
const star = (x, y, r, c) => {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 ? r * 0.46 : r, a = (i * 36 - 90) * Math.PI / 180;
    d += `${i ? 'L' : 'M'} ${R(x + Math.cos(a) * rr)} ${R(y + Math.sin(a) * rr)} `;
  }
  return path(d + 'z', c);
};
const rainbow = (x, y, r, s = 1) => g(
  [P.red, P.orange, P.yellow, P.green, P.blue].map((c, i) =>
    `<path d="M ${R(-r + i * 17)} 0 a ${R(r - i * 17)} ${R(r - i * 17)} 0 0 1 ${R(2 * (r - i * 17))} 0" fill="none" stroke="${c}" stroke-width="14" stroke-linecap="round"/>`).join(''),
  `translate(${R(x)},${R(y)}) scale(${s})`);
const fence = (x, y, w, s = 1) => {
  let out = '';
  for (let i = 0; i <= w; i += 50) out += path(`M ${i - 9} 0 L ${i - 9} -48 L ${i} -62 L ${i + 9} -48 L ${i + 9} 0 z`, P.white);
  out += rect(-12, -42, w + 24, 10, P.white, 5) + rect(-12, -22, w + 24, 10, P.white, 5);
  return g(out, `translate(${R(x)},${R(y)}) scale(${s})`);
};
const school = (x, y, s) => g(
  rect(-140, -142, 280, 144, P.white, 12) +
  path('M -162 -142 L 0 -228 L 162 -142 z', P.roof) +
  rect(-36, -72, 72, 74, P.blue, 9) + rect(-30, -66, 28, 32, P.blueXL, 5) + rect(4, -66, 28, 32, P.blueXL, 5) + circ(0, -36, 5.5, P.yellow) +
  rect(-116, -122, 52, 44, P.blueXL, 7) + rect(64, -122, 52, 44, P.blueXL, 7) +
  rect(-116, -56, 48, 38, P.blueXL, 7) + rect(68, -56, 48, 38, P.blueXL, 7) +
  circ(0, -184, 18, P.yellow) + star(0, -184, 12.5, P.white) +
  rect(-162, -4, 324, 14, P.grassD, 7), `translate(${R(x)},${R(y)}) scale(${s})`);
const swing = (x, y, s) => g(
  cap(-44, 0, -15, -92, 8, P.orangeD) + cap(44, 0, 15, -92, 8, P.orangeD) + cap(-22, -92, 22, -92, 8, P.orangeD) +
  cap(-15, -90, -15, -38, 3.4, P.inkL) + cap(15, -90, 15, -38, 3.4, P.inkL) + rect(-22, -40, 44, 9, P.blue, 4.5),
  `translate(${R(x)},${R(y)}) scale(${s})`);
const slide_ = (x, y, s) => g(
  cap(-60, 0, -60, -84, 9, P.blueD) + cap(-32, 0, -32, -84, 9, P.blueD) +
  path('M -72 -84 L -22 -84 L 68 6 L 34 6 z', P.orange) + rect(-76, -94, 60, 13, P.orangeD, 6.5),
  `translate(${R(x)},${R(y)}) scale(${s})`);
const heartIcon = (x, y, s, c = P.red) => g(path('M 0 22 C -30 2 -26 -20 -10 -20 C -3 -20 0 -14 0 -12 C 0 -14 3 -20 10 -20 C 26 -20 30 2 0 22 z', c), `translate(${R(x)},${R(y)}) scale(${s})`);
const crossMed = (x, y, s, c = P.red) => g(rect(-9, -26, 18, 52, c, 6) + rect(-26, -9, 52, 18, c, 6), `translate(${R(x)},${R(y)}) scale(${s})`);
const qmark = (x, y, r, c) => circ(x, y, r, c) +
  `<text x="${R(x)}" y="${R(y + r * 0.36)}" font-family="Arial,Helvetica,sans-serif" font-size="${R(r * 1.42)}" font-weight="bold" fill="#FFFFFF" text-anchor="middle">?</text>`;

/* ----------------------------------------------------------------- KANVAS */
function canvas(w, h, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`;
}
function room(w, h, gy, wall, floor, floorEdge) {
  return rect(0, 0, w, gy + 8, wall) + rect(0, gy, w, h - gy + 4, floor) + rect(0, gy - 7, w, 14, floorEdge);
}
function skyScene(w, h, gy, opt = {}) {
  const { sunX = w * 0.12, sunY = h * 0.14, rain = false, hills = true, clouds = true } = opt;
  let s = `<defs><linearGradient id="sk${w}${h}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#D4EBFB"/><stop offset="100%" stop-color="#F4FBFF"/></linearGradient></defs>`;
  s += rect(0, 0, w, gy + 10, `url(#sk${w}${h})`);
  s += sun(sunX, sunY, h * 0.062);
  if (rain) s += rainbow(w * 0.70, gy - h * 0.01, h * 0.34, 1);
  if (clouds) {
    s += cloud(w * 0.32, h * 0.12, 0.9, 0.95) + cloud(w * 0.60, h * 0.07, 0.65, 0.9) + cloud(w * 0.87, h * 0.17, 0.75, 0.9);
  }
  if (hills) { s += hill(w, gy + 6, h * 0.15, '#B6E5CB'); s += hill(w, gy + 12, h * 0.09, P.grass); }
  s += rect(0, gy, w, h - gy + 6, P.grassD);
  s += path(`M 0 ${R(gy)} Q ${R(w * 0.5)} ${R(gy - 18)} ${R(w)} ${R(gy)} L ${R(w)} ${R(gy + 24)} L 0 ${R(gy + 24)} z`, P.grass);
  return s;
}

/* ==========================================================================
   SCENES
   ========================================================================== */
const S = {};

/* 1. Sampul — pemandangan sekolah, guru, anak, orang tua */
S.hero = () => {
  const w = 2600, h = 780, gy = 500;
  let s = skyScene(w, h, gy, { sunX: 250, sunY: 128, rain: true });
  s += tree(230, gy + 30, 1.25);
  s += school(2130, gy + 20, 1.0);
  s += fence(80, gy + 32, 260, 0.75);
  s += slide_(1360, gy + 30, 1.0);
  s += bush(1720, gy + 38, 0.95);
  s += person({ x: 620, y: 748, s: 1.62, skin: SKIN[1], hijab: P.green, shirt: P.greenD, arms: 'open' });
  s += person({ x: 420, y: 752, s: 1.20, child: true, skin: SKIN[2], hairStyle: 'curly', shirt: P.blue, pants: P.orangeD, arms: 'up' });
  s += person({ x: 800, y: 750, s: 1.24, child: true, skin: SKIN[0], hairStyle: 'pigtail', shirt: P.orange, arms: 'wave' });
  s += person({ x: 960, y: 748, s: 1.18, child: true, skin: SKIN[1], hijab: P.pink, shirt: P.yellow, pants: P.greenD, arms: 'hold' });
  s += person({ x: 1620, y: 748, s: 1.58, skin: SKIN[0], hairStyle: 'short', shirt: P.blue, arms: 'point' });
  s += person({ x: 1790, y: 752, s: 1.16, child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.red, arms: 'wave' });
  s += blocks(1130, 754, 1.05) + book(1240, 754, 0.95) + ball(190, 736, 24);
  s += flower(90, 762, 1.0, P.orange) + flower(2520, 758, 1.0, P.red) + flower(2450, 768, 0.85, P.purple);
  s += balloon(2280, 190, 1.15, P.red) + balloon(2380, 232, 1.0, P.blue) + balloon(2200, 252, 0.85, P.green);
  return canvas(w, h, s);
};

/* 1b. Band sekolah ramah anak (rasio lebar untuk pita bawah slide) */
S.sekolahband = () => {
  const w = 2660, h = 560, gy = 360;
  let s = skyScene(w, h, gy, { sunX: 210, sunY: 95, rain: true });
  s += school(980, gy + 16, 0.78);
  s += tree(240, gy + 22, 0.85) + tree(2420, gy + 22, 0.78);
  s += fence(70, gy + 28, 340, 0.6) + fence(1560, gy + 28, 520, 0.6);
  s += slide_(1520, gy + 24, 0.7) + swing(1840, gy + 24, 0.66);
  s += person({ x: 420, y: 538, s: 1.30, skin: SKIN[2], hijab: P.green, shirt: P.greenD, arms: 'open' });
  s += person({ x: 560, y: 542, s: 0.98, child: true, skin: SKIN[0], hairStyle: 'curly', shirt: P.yellow, arms: 'wave' });
  s += person({ x: 1410, y: 542, s: 0.96, child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.orange, arms: 'wave' });
  s += person({ x: 1700, y: 542, s: 0.94, child: true, skin: SKIN[1], hijab: P.pink, shirt: P.blue, pants: P.greenD, arms: 'up' });
  s += person({ x: 2200, y: 538, s: 1.28, skin: SKIN[0], hairStyle: 'short', shirt: P.blue, arms: 'point' });
  s += flower(110, 550, 0.85, P.red) + flower(2560, 548, 0.85, P.orange) + bush(2600, gy + 30, 0.6);
  return canvas(w, h, s);
};

/* 2. Guru mengajar di kelas */
S.kelas = () => {
  const w = 1400, h = 1000, gy = 800;
  let s = room(w, h, gy, P.blueXL, '#F3E2CB', '#E3CBAB');
  s += rect(90, 110, 620, 400, P.white, 20) + rect(120, 140, 560, 340, '#EAF7F0', 14);
  s += path('M 220 400 L 300 250 L 380 400 z', P.greenD);
  s += rect(430, 300, 110, 100, P.orangeL, 10) + circ(485, 290, 46, P.orange);
  s += circ(600, 300, 40, P.blue) + star(600, 400, 40, P.yellow);
  s += rect(150, 175, 150, 26, P.blueL, 13) + rect(150, 215, 210, 26, P.greenL, 13);
  s += rect(1120, 380, 230, 22, P.wood, 8) + rect(1120, 530, 230, 22, P.wood, 8) + rect(1128, 402, 18, 150, P.woodD, 6) + rect(1324, 402, 18, 150, P.woodD, 6);
  s += book(1180, 378, 1.15) + book(1290, 378, 1.0, P.blue, P.red, P.teal) + book(1200, 528, 1.1, P.green, P.yellow, P.purple);
  s += rect(1230, 700, 92, 108, P.orangeL, 14) + circ(1276, 646, 50, P.grassXD) + circ(1230, 682, 36, P.grassD) + circ(1322, 682, 36, P.grassD);
  s += person({ x: 880, y: 850, s: 2.55, skin: SKIN[1], hijab: P.blue, shirt: P.blueD, arms: 'point' });
  const kid = (x, sc, sk, hs, sh, hj, ar) => person({ x, y: 858, s: sc, child: true, skin: sk, hairStyle: hs, shirt: sh, hijab: hj, arms: ar });
  s += kid(250, 1.95, SKIN[0], 'short', P.orange, null, 'up');
  s += kid(430, 1.90, SKIN[2], 'curly', P.green, null, 'hold');
  s += kid(610, 1.92, SKIN[1], 'pigtail', P.red, null, 'up');
  s += kid(1090, 1.86, SKIN[0], 'short', P.yellow, P.pink, 'hold');
  s += openBook(330, 862, 1.4) + blocks(760, 860, 1.2);
  return canvas(w, h, s);
};

/* 3. Posyandu — kader mengukur tinggi & menimbang */
S.posyandu = () => {
  const w = 1300, h = 1000, gy = 820;
  let s = room(w, h, gy, P.greenXL, '#EDE0C9', '#DCC9AC');
  s += rect(860, 120, 360, 300, P.white, 18) + crossMed(1040, 210, 1.15, P.green);
  s += rect(910, 300, 260, 20, P.greenL, 10) + rect(910, 336, 200, 20, P.blueL, 10) + rect(910, 372, 230, 20, P.orangeL, 10);
  // pengukur tinggi
  s += rect(560, 200, 54, 630, P.white, 10, `stroke="${P.blueL}" stroke-width="5"`);
  for (let i = 0; i < 12; i++) s += rect(564, 240 + i * 48, 26, 6, P.blueL, 3);
  s += rect(506, 372, 150, 22, P.orange, 11);
  s += person({ x: 690, y: 862, s: 2.35, child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.blue, arms: 'down' });
  s += person({ x: 350, y: 856, s: 2.45, skin: SKIN[1], hijab: P.orange, shirt: P.orangeD, arms: 'point' });
  s += person({ x: 1040, y: 858, s: 2.30, skin: SKIN[2], hijab: P.purple, shirt: P.blue, arms: 'hold' });
  s += person({ x: 1200, y: 862, s: 1.55, child: true, skin: SKIN[2], hairStyle: 'curly', shirt: P.yellow, pants: P.greenD, arms: 'up' });
  s += rect(100, 786, 170, 46, P.blueD, 14) + circ(185, 762, 38, P.white, `stroke="${P.blueD}" stroke-width="6"`) + cap(185, 762, 203, 740, 5.5, P.red);
  return canvas(w, h, s);
};

/* 4. Pemeriksaan kesehatan */
S.kesehatan = () => {
  const w = 1300, h = 1000, gy = 820;
  let s = room(w, h, gy, P.blueXL, '#E6EEF6', '#D2E0EC');
  s += rect(70, 110, 300, 250, P.white, 18) + crossMed(220, 200, 1.25, P.red);
  s += rect(110, 275, 220, 18, P.blueL, 9) + rect(110, 307, 160, 18, P.greenL, 9);
  s += rect(880, 560, 380, 36, P.white, 12) + rect(900, 596, 28, 230, '#C9D8E5', 9) + rect(1212, 596, 28, 230, '#C9D8E5', 9) + rect(870, 532, 400, 30, P.blueL, 14);
  s += person({
    x: 420, y: 858, s: 2.45, skin: SKIN[0], hairStyle: 'bun', shirt: '#5FC7C7', pants: P.tealD, arms: 'front',
    extras: cap(-17, -104, -17, -66, 5, P.white) + cap(17, -104, 17, -66, 5, P.white) + circ(0, -58, 12, P.white) + rect(-11, -114, 22, 13, P.white, 5)
  });
  s += person({ x: 660, y: 862, s: 1.95, child: true, skin: SKIN[1], hairStyle: 'short', shirt: P.orange, arms: 'open' });
  s += person({ x: 900, y: 858, s: 2.30, skin: SKIN[2], hijab: P.green, shirt: P.greenD, arms: 'hip' });
  s += heartIcon(700, 250, 2.0, P.red) + heartIcon(810, 350, 1.1, P.pink) + heartIcon(620, 360, 0.8, P.pink);
  return canvas(w, h, s);
};

/* 5. Makan bergizi bersama */
S.gizi = () => {
  const w = 1400, h = 1000, gy = 840;
  let s = room(w, h, gy, P.orangeXL, '#EBD7BC', '#D9C1A1');
  s += rect(90, 110, 270, 230, P.white, 18) + circ(225, 210, 62, P.green) + path('M 225 160 q 40 26 0 82 q -40 -56 0 -82 z', P.white);
  s += rect(130, 300, 190, 18, P.greenL, 9);
  s += person({ x: 400, y: 800, s: 2.05, child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.blue, arms: 'front' });
  s += person({ x: 650, y: 800, s: 2.05, child: true, skin: SKIN[2], hairStyle: 'pigtail', shirt: P.red, arms: 'front' });
  s += person({ x: 900, y: 800, s: 2.00, child: true, skin: SKIN[1], hijab: P.pink, shirt: P.yellow, pants: P.greenD, arms: 'front' });
  s += person({ x: 1180, y: 866, s: 2.35, skin: SKIN[1], hijab: P.blue, shirt: P.blueD, arms: 'hold' });
  s += rect(230, 700, 800, 50, P.wood, 14) + rect(280, 750, 30, 150, P.woodD, 10) + rect(950, 750, 30, 150, P.woodD, 10);
  const plate = (x) => ell(x, 690, 74, 26, P.white) + ell(x, 682, 68, 22, '#F4F7FA') +
    circ(x - 24, 676, 19, '#FFF0C8') + circ(x + 10, 674, 15, P.greenD) + circ(x + 34, 682, 13, P.orange);
  s += plate(400) + plate(650) + plate(900);
  s += rect(520, 636, 40, 56, P.white, 7) + rect(524, 642, 32, 44, '#E9F3FB', 5);
  s += rect(770, 636, 40, 56, P.white, 7) + rect(774, 642, 32, 44, '#E9F3FB', 5);
  return canvas(w, h, s);
};

/* 6. Kelas orang tua / parenting */
S.parenting = () => {
  const w = 1400, h = 1000, gy = 830;
  let s = room(w, h, gy, '#F1EAFB', '#E2DAF1', '#D2C8E6');
  s += rect(880, 120, 400, 420, P.white, 16) + rect(908, 148, 344, 364, '#F8F5FF', 12);
  s += heartIcon(1080, 270, 2.2, P.purple);
  s += rect(950, 380, 260, 20, '#DCD2F0', 10) + rect(950, 420, 200, 20, '#DCD2F0', 10) + rect(950, 460, 230, 20, '#DCD2F0', 10);
  s += cap(950, 542, 950, 836, 11, P.wood) + cap(1210, 542, 1210, 836, 11, P.wood);
  s += person({ x: 700, y: 866, s: 2.45, skin: SKIN[1], hijab: P.orange, shirt: P.orangeD, arms: 'point' });
  s += person({ x: 160, y: 866, s: 2.25, skin: SKIN[0], hairStyle: 'short', shirt: P.blue, arms: 'hip' });
  s += person({ x: 360, y: 866, s: 2.20, skin: SKIN[2], hijab: P.green, shirt: P.greenD, arms: 'hip' });
  s += person({ x: 540, y: 866, s: 2.22, skin: SKIN[1], hairStyle: 'bun', shirt: P.red, arms: 'up' });
  s += person({ x: 260, y: 870, s: 1.45, child: true, skin: SKIN[0], hairStyle: 'curly', shirt: P.yellow, arms: 'wave' });
  return canvas(w, h, s);
};

/* 7. Rapat kemitraan lintas sektor */
S.rapat = () => {
  const w = 1600, h = 1000, gy = 900;
  let s = room(w, h, gy, '#EAF4FB', '#DBE7F1', '#C9DBE9');
  s += rect(560, 60, 490, 340, P.white, 16) + rect(590, 90, 430, 280, '#F2F8FD', 12);
  s += rect(630, 262, 48, 60, P.blue, 7) + rect(700, 202, 48, 120, P.green, 7) + rect(770, 158, 48, 164, P.orange, 7) + rect(840, 118, 48, 204, P.red, 7);
  s += cap(622, 332, 990, 332, 6, '#C7D8E6') + rect(618, 118, 90, 22, P.blueL, 11);
  const seat = (x, o) => person(Object.assign({ x, y: 1130, s: 2.85 }, o));
  s += seat(240, { skin: SKIN[0], hairStyle: 'short', shirt: P.blue, arms: 'open' });
  s += seat(520, { skin: SKIN[1], hijab: P.green, shirt: P.greenD, arms: 'hip' });
  s += seat(800, { skin: SKIN[2], hairStyle: 'short', shirt: P.orange, arms: 'up' });
  s += seat(1080, { skin: SKIN[1], hijab: P.purple, shirt: P.purpleD, arms: 'hip' });
  s += seat(1360, { skin: SKIN[0], hairStyle: 'bun', shirt: P.red, arms: 'open' });
  s += rect(50, 872, 1500, 46, P.wood, 16) + rect(90, 918, 1420, 82, P.woodD, 12);
  s += rect(240, 838, 118, 34, P.white, 6) + rect(600, 836, 118, 34, P.white, 6) + rect(1120, 838, 118, 34, P.white, 6);
  s += rect(880, 820, 96, 52, P.orangeL, 8) + rect(890, 832, 76, 11, P.white, 5) + rect(890, 850, 56, 11, P.white, 5);
  return canvas(w, h, s);
};

/* 8. Gotong royong sarana sanitasi & air bersih */
S.gotongroyong = () => {
  const w = 1500, h = 1000, gy = 800;
  let s = skyScene(w, h, gy, { sunX: 1320, sunY: 140, hills: true });
  s += tree(1400, gy + 40, 1.2);
  s += rect(600, 470, 340, 54, P.white, 14) + rect(632, 524, 34, 300, '#D6E4EF', 10) + rect(874, 524, 34, 300, '#D6E4EF', 10);
  for (let i = 0; i < 3; i++) {
    s += rect(650 + i * 96, 400, 26, 74, '#9FB6C7', 7) + circ(663 + i * 96, 392, 14, P.blue);
    s += cap(663 + i * 96, 476, 663 + i * 96, 508, 6, '#8FC6F0');
  }
  s += rect(960, 754, 84, 74, P.blue, 12) + rect(978, 738, 46, 20, P.blueD, 7);
  s += person({ x: 250, y: 860, s: 2.30, skin: SKIN[2], hairStyle: 'cap', shirt: P.orange, arms: 'up' });
  s += person({ x: 440, y: 860, s: 2.34, skin: SKIN[0], hairStyle: 'short', shirt: P.green, arms: 'up' });
  s += rect(180, 508, 330, 32, P.wood, 10);
  s += person({ x: 1140, y: 860, s: 2.28, skin: SKIN[1], hijab: P.blue, shirt: P.blueD, arms: 'front' });
  s += person({ x: 1300, y: 864, s: 1.62, child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.red, arms: 'wave' });
  s += bush(90, gy + 46, 1.0) + flower(1460, 880, 1.2, P.orange);
  return canvas(w, h, s);
};

/* 9. Bermain sambil belajar */
S.bermain = () => {
  const w = 1500, h = 950, gy = 720;
  let s = skyScene(w, h, gy, { sunX: 170, sunY: 130, rain: true });
  s += school(1290, gy + 30, 0.95);
  s += tree(140, gy + 34, 1.15);
  s += slide_(430, gy + 34, 1.25) + swing(800, gy + 34, 1.2);
  s += person({ x: 300, y: 900, s: 1.85, child: true, skin: SKIN[0], hairStyle: 'pigtail', shirt: P.orange, arms: 'up' });
  s += person({ x: 610, y: 902, s: 1.85, child: true, skin: SKIN[2], hairStyle: 'curly', shirt: P.blue, pants: P.orangeD, arms: 'wave' });
  s += person({ x: 960, y: 900, s: 1.80, child: true, skin: SKIN[1], hijab: P.pink, shirt: P.green, arms: 'open' });
  s += ball(720, 866, 32) + blocks(1110, 906, 1.3);
  s += flower(70, 918, 1.3, P.red) + flower(1430, 916, 1.3, P.purple) + bush(1450, gy + 44, 0.9);
  return canvas(w, h, s);
};

/* 10. Lingkungan sekolah ramah anak */
S.sekolahramah = () => {
  const w = 1800, h = 850, gy = 620;
  let s = skyScene(w, h, gy, { sunX: 150, sunY: 120, rain: true });
  s += school(620, gy + 24, 1.15);
  s += tree(180, gy + 30, 1.2) + tree(1640, gy + 30, 1.05);
  s += fence(40, gy + 40, 300, 0.85) + fence(1180, gy + 40, 460, 0.85);
  s += slide_(1130, gy + 34, 0.95) + swing(1430, gy + 34, 0.9);
  s += person({ x: 1010, y: 806, s: 1.55, child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.orange, arms: 'wave' });
  s += person({ x: 1290, y: 808, s: 1.50, child: true, skin: SKIN[1], hijab: P.pink, shirt: P.blue, pants: P.greenD, arms: 'up' });
  s += person({ x: 300, y: 804, s: 2.05, skin: SKIN[2], hijab: P.green, shirt: P.greenD, arms: 'open' });
  s += person({ x: 460, y: 808, s: 1.48, child: true, skin: SKIN[0], hairStyle: 'curly', shirt: P.yellow, arms: 'wave' });
  s += flower(90, 826, 1.2, P.red) + flower(1740, 824, 1.2, P.orange) + bush(1760, gy + 46, 0.85);
  return canvas(w, h, s);
};

/* 11. Refleksi */
S.refleksi = () => {
  const w = 1000, h = 1000;
  let s = circ(500, 520, 400, P.blueXL) + circ(500, 520, 310, '#EDF6FE');
  s += person({ x: 430, y: 900, s: 2.6, skin: SKIN[1], hijab: P.blue, shirt: P.blueD, arms: 'hip' });
  s += person({ x: 680, y: 906, s: 1.85, child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.orange, arms: 'up' });
  s += qmark(760, 200, 66, P.orange) + qmark(250, 250, 46, P.green) + qmark(870, 430, 34, P.yellow);
  return canvas(w, h, s);
};

/* 12. Kolaborasi — lingkaran pemangku kepentingan */
S.kolaborasi = () => {
  const w = 1200, h = 1100;
  let s = circ(600, 550, 430, P.greenXL) + circ(600, 550, 330, '#EFFAF3');
  const ring = [
    { a: -90, c: P.blue, hj: null, hs: 'short', sk: SKIN[0] },
    { a: -30, c: P.greenD, hj: P.green, hs: 'short', sk: SKIN[1] },
    { a: 30, c: P.orange, hj: null, hs: 'cap', sk: SKIN[2] },
    { a: 90, c: P.red, hj: null, hs: 'bun', sk: SKIN[0] },
    { a: 150, c: P.purpleD, hj: P.purple, hs: 'short', sk: SKIN[1] },
    { a: 210, c: P.teal, hj: null, hs: 'short', sk: SKIN[2] }
  ];
  ring.forEach(r => {
    const rad = r.a * Math.PI / 180;
    const x = 600 + Math.cos(rad) * 400, y = 550 + Math.sin(rad) * 330;
    s += person({ x, y: y + 110, s: 1.4, skin: r.sk, hijab: r.hj, hairStyle: r.hs, shirt: r.c, arms: 'open', shadow: false });
  });
  s += circ(600, 550, 150, P.white) + heartIcon(600, 528, 3.6, P.orange);
  return canvas(w, h, s);
};

/* 13. Bunda PAUD / pemerintah daerah */
S.bundapaud = () => {
  const w = 1300, h = 1000, gy = 830;
  let s = room(w, h, gy, P.orangeXL, '#EAD6BC', '#D8C2A2');
  s += rect(730, 100, 470, 140, P.orange, 18) + rect(766, 136, 398, 30, P.white, 15) + rect(766, 182, 286, 24, '#FFD8B0', 12);
  s += cap(760, 240, 760, 838, 12, P.woodD) + cap(1170, 240, 1170, 838, 12, P.woodD);
  s += person({ x: 400, y: 866, s: 2.75, skin: SKIN[1], hijab: P.orange, shirt: P.orangeD, arms: 'open' });
  s += person({ x: 190, y: 870, s: 1.80, child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.blue, arms: 'up' });
  s += person({ x: 620, y: 870, s: 1.76, child: true, skin: SKIN[2], hairStyle: 'pigtail', shirt: P.green, arms: 'wave' });
  s += person({ x: 950, y: 866, s: 2.45, skin: SKIN[0], hairStyle: 'short', shirt: P.blue, arms: 'hip' });
  s += star(140, 180, 50, P.yellow) + star(250, 290, 30, P.orangeL) + star(90, 330, 22, P.yellowL);
  return canvas(w, h, s);
};

/* 14. Perayaan / penutup */
S.perayaan = () => {
  const w = 2900, h = 690, gy = 450;
  let s = skyScene(w, h, gy, { sunX: 2660, sunY: 100, rain: true });
  s += fence(2280, gy + 28, 520, 0.68) + tree(150, gy + 24, 0.72);
  const cast = [
    { x: 620, s: 1.36, o: { skin: SKIN[1], hijab: P.green, shirt: P.greenD, arms: 'up' } },
    { x: 760, s: 1.02, o: { child: true, skin: SKIN[0], hairStyle: 'pigtail', shirt: P.orange, arms: 'wave' } },
    { x: 890, s: 1.34, o: { skin: SKIN[0], hairStyle: 'short', shirt: P.blue, arms: 'open' } },
    { x: 1030, s: 1.00, o: { child: true, skin: SKIN[2], hairStyle: 'curly', shirt: P.red, arms: 'up' } },
    { x: 1160, s: 1.37, o: { skin: SKIN[2], hairStyle: 'bun', shirt: P.orange, arms: 'wave' } },
    { x: 1300, s: 1.02, o: { child: true, skin: SKIN[1], hijab: P.pink, shirt: P.yellow, arms: 'open' } },
    { x: 1430, s: 1.35, o: { skin: SKIN[1], hijab: P.purple, shirt: P.purpleD, arms: 'up' } },
    { x: 1570, s: 1.00, o: { child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.green, arms: 'wave' } },
    { x: 1700, s: 1.35, o: { skin: SKIN[0], hairStyle: 'cap', shirt: P.teal, arms: 'open' } }
  ];
  cast.forEach(c => s += person(Object.assign({ x: c.x, y: 668, s: c.s }, c.o)));
  [[300, 90, P.red], [560, 70, P.blue], [820, 110, P.orange], [1080, 62, P.green], [1340, 100, P.purple], [1600, 74, P.yellow], [1880, 116, P.red], [2120, 80, P.blue]]
    .forEach(([x, y, c], i) => { s += star(x, y, 20 - (i % 3) * 4, c) + circ(x + 56, y + 52, 8, c); });
  s += balloon(210, 170, 1.1, P.red) + balloon(330, 210, 0.9, P.yellow) + balloon(2760, 190, 1.0, P.blue);
  return canvas(w, h, s);
};

/* 15. Data / dashboard */
S.data = () => {
  const w = 1200, h = 1050;
  let s = circ(600, 500, 440, P.blueXL);
  s += rect(190, 170, 820, 540, P.white, 26);
  s += rect(232, 214, 320, 32, P.blueL, 16) + rect(232, 266, 210, 22, '#DCE6EE', 11);
  s += rect(250, 430, 76, 190, P.blue, 9) + rect(356, 500, 76, 120, P.green, 9) + rect(462, 370, 76, 250, P.orange, 9) + rect(568, 460, 76, 160, P.teal, 9);
  s += cap(238, 626, 668, 626, 7, '#D5E1EA');
  s += circ(830, 470, 118, P.greenXL);
  s += path('M 830 470 L 830 352 A 118 118 0 0 1 935 525 z', P.green);
  s += path('M 830 470 L 935 525 A 118 118 0 0 1 750 562 z', P.orange);
  s += circ(830, 470, 58, P.white);
  s += rect(738, 630, 190, 20, '#E3EBF1', 10) + rect(738, 664, 140, 20, '#E3EBF1', 10);
  s += person({ x: 250, y: 1000, s: 2.15, skin: SKIN[1], hijab: P.blue, shirt: P.blueD, arms: 'point' });
  s += person({ x: 970, y: 1000, s: 2.10, skin: SKIN[0], hairStyle: 'short', shirt: P.orange, arms: 'hip' });
  return canvas(w, h, s);
};

/* 16. Tumbuh kembang anak */
S.tumbuh = () => {
  const w = 1200, h = 1000, gy = 850;
  let s = room(w, h, gy, P.greenXL, '#DBEDE1', '#C7E0CF');
  s += rect(620, 150, 480, 500, P.white, 22);
  s += cap(672, 606, 1052, 606, 7, '#D9E6DE') + cap(672, 606, 672, 210, 7, '#D9E6DE');
  s += `<path d="M 680 582 Q 790 546 856 416 Q 916 306 1036 244" fill="none" stroke="${P.green}" stroke-width="14" stroke-linecap="round"/>`;
  [[680, 582], [788, 500], [872, 384], [960, 296], [1036, 244]].forEach(([x, y]) => s += circ(x, y, 15, P.white) + circ(x, y, 9, P.greenD));
  s += person({ x: 150, y: 880, s: 1.30, child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.yellow, arms: 'up' });
  s += person({ x: 320, y: 880, s: 1.75, child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.orange, arms: 'open' });
  s += person({ x: 500, y: 880, s: 2.25, child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.green, arms: 'wave' });
  s += `<path d="M 130 720 Q 320 600 520 490" fill="none" stroke="${P.orangeL}" stroke-width="10" stroke-dasharray="20 18" stroke-linecap="round"/>`;
  s += star(548, 452, 38, P.yellow);
  return canvas(w, h, s);
};

/* 17. Perlindungan anak */
S.perlindungan = () => {
  const w = 1100, h = 1050;
  let s = circ(550, 520, 420, '#F3EAFB');
  s += path('M 550 150 L 850 254 L 850 530 Q 850 748 550 866 Q 250 748 250 530 L 250 254 z', P.purple);
  s += path('M 550 206 L 802 294 L 802 526 Q 802 706 550 806 Q 298 706 298 526 L 298 294 z', '#FFFFFF');
  s += person({ x: 470, y: 780, s: 1.95, skin: SKIN[1], hijab: P.blue, shirt: P.blueD, arms: 'open', shadow: false });
  s += person({ x: 650, y: 786, s: 1.40, child: true, skin: SKIN[0], hairStyle: 'short', shirt: P.orange, arms: 'up', shadow: false });
  s += heartIcon(550, 350, 2.6, P.red);
  return canvas(w, h, s);
};

/* 18. Peta jalan */
S.roadmap = () => {
  const w = 1600, h = 800, gy = 620;
  let s = skyScene(w, h, gy, { sunX: 1420, sunY: 120, hills: true });
  s += `<path d="M -20 780 Q 460 640 800 700 Q 1140 760 1620 610" fill="none" stroke="#F2F6F9" stroke-width="96" stroke-linecap="round"/>`;
  s += `<path d="M -20 780 Q 460 640 800 700 Q 1140 760 1620 610" fill="none" stroke="#C9D6E0" stroke-width="6" stroke-dasharray="28 28"/>`;
  [[240, 700, P.blue], [640, 654, P.green], [1040, 706, P.orange], [1420, 640, P.red]].forEach(([x, y, c]) => {
    s += path(`M ${x} ${y} L ${x - 12} ${y - 30} L ${x + 12} ${y - 30} z`, c) + circ(x, y - 66, 42, c) + circ(x, y - 66, 26, P.white);
  });
  s += tree(90, gy + 34, 0.9) + bush(1540, gy + 40, 0.85);
  s += person({ x: 830, y: 762, s: 1.85, skin: SKIN[1], hijab: P.orange, shirt: P.orangeD, arms: 'point' });
  return canvas(w, h, s);
};

/* 19. Trisentra — keluarga, satuan PAUD, masyarakat */
S.trisentra = () => {
  const w = 2600, h = 780, gy = 520;
  let s = skyScene(w, h, gy, { sunX: 1300, sunY: 100, hills: true, clouds: true });
  // rumah (keluarga)
  s += rect(220, gy - 190, 300, 192, P.white, 14) + path(`M 192 ${gy - 190} L 370 ${gy - 306} L 548 ${gy - 190} z`, P.orange);
  s += rect(328, gy - 112, 86, 114, P.blue, 10) + rect(246, gy - 164, 74, 54, P.blueXL, 8) + rect(422, gy - 164, 74, 54, P.blueXL, 8);
  // satuan PAUD
  s += school(1300, gy + 16, 0.92);
  // fasilitas masyarakat (posyandu / puskesmas)
  s += rect(2010, gy - 186, 330, 188, P.white, 14) + rect(1984, gy - 222, 382, 42, P.greenD, 14);
  s += rect(2050, gy - 142, 86, 68, P.greenL, 8) + rect(2210, gy - 142, 86, 68, P.greenL, 8) + rect(2120, gy - 58, 106, 60, P.green, 8);
  s += crossMed(2175, gy - 248, 0.5, P.white);
  s += person({ x: 330, y: 748, s: 1.42, skin: SKIN[0], hairStyle: 'short', shirt: P.blue, arms: 'open' });
  s += person({ x: 470, y: 752, s: 1.05, child: true, skin: SKIN[0], hairStyle: 'pigtail', shirt: P.orange, arms: 'wave' });
  s += person({ x: 1190, y: 748, s: 1.42, skin: SKIN[1], hijab: P.green, shirt: P.greenD, arms: 'point' });
  s += person({ x: 1330, y: 752, s: 1.03, child: true, skin: SKIN[2], hairStyle: 'curly', shirt: P.red, arms: 'up' });
  s += person({ x: 2070, y: 748, s: 1.40, skin: SKIN[2], hairStyle: 'cap', shirt: P.purpleD, arms: 'open' });
  s += person({ x: 2210, y: 752, s: 1.02, child: true, skin: SKIN[1], hijab: P.pink, shirt: P.yellow, arms: 'up' });
  s += flower(90, 762, 0.95, P.red) + flower(2520, 760, 0.95, P.purple);
  return canvas(w, h, s);
};

/* 20. Praktik baik — guru & orang tua berkolaborasi memegang dokumen */
S.praktikbaik = () => {
  const w = 1300, h = 1000, gy = 830;
  let s = room(w, h, gy, P.blueXL, '#E3EDF6', '#D0DFEC');
  s += rect(400, 70, 500, 390, P.white, 20) + rect(434, 104, 432, 60, P.blueL, 14);
  [0, 1, 2].forEach(i => {
    const yy = 200 + i * 82;
    s += circ(478, yy, 30, [P.green, P.orange, P.blue][i]) + path(`M ${466} ${yy} l 9 10 l 17 -19`, 'none', `stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`);
    s += rect(526, yy - 13, 300 - i * 60, 26, ['#D9F0E4', '#FFE6CD', '#DCEDFB'][i], 13);
  });
  s += rect(1010, 300, 200, 24, P.wood, 8) + rect(1018, 322, 16, 120, P.woodD, 6) + rect(1186, 322, 16, 120, P.woodD, 6);
  s += book(1070, 298, 1.0) + book(1160, 298, 0.85, P.blue, P.red, P.teal);
  s += rect(100, 716, 100, 116, P.orangeL, 14) + circ(150, 660, 54, P.grassXD) + circ(104, 698, 40, P.grassD) + circ(196, 698, 40, P.grassD);
  s += person({ x: 330, y: 872, s: 2.5, skin: SKIN[1], hijab: P.green, shirt: P.greenD, arms: 'open' });
  s += person({ x: 1060, y: 872, s: 2.45, skin: SKIN[0], hairStyle: 'short', shirt: P.orange, arms: 'open' });
  s += person({ x: 700, y: 876, s: 1.72, child: true, skin: SKIN[2], hairStyle: 'curly', shirt: P.blue, arms: 'up' });
  s += star(1150, 150, 40, P.yellow) + star(1230, 240, 26, P.orangeL) + star(230, 200, 30, P.yellow);
  return canvas(w, h, s);
};

module.exports = {
  P, SKIN, HAIR, S, person, canvas, sun, cloud, tree, bush, flower, star, circ, rect, path, g,
  heartIcon, crossMed, school, blocks, book, rainbow, qmark, skyScene, room
};
