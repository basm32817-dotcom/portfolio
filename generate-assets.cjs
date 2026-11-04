/* ------------------------------------------------------------------
   ABO BASSEM — local asset generator
   Run from the project root with:  node scripts/generate-assets.cjs
   Requires: sharp (only for the PNG icon / social image exports)
   All generated SVGs are plain files you can replace with your own
   screenshots or photos at any time.
------------------------------------------------------------------- */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IMG = path.join(ROOT, 'assets', 'images');
const PROJ = path.join(IMG, 'projects');
const CERT = path.join(IMG, 'certificates');
for (const d of [IMG, PROJ, CERT]) fs.mkdirSync(d, { recursive: true });

const F = 'Segoe UI, Tahoma, Arial, sans-serif';
const M = 'Consolas, Menlo, monospace';
const e = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const txt = (x, y, size, fill, content, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${o.mono ? M : F}" font-size="${size}" font-weight="${o.w || 400}" fill="${fill}" text-anchor="${o.a || 'start'}" opacity="${o.o ?? 1}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${e(content)}</text>`;
const rect = (x, y, w, h, r, fill, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}"` : ''}${o.opacity ? ` opacity="${o.opacity}"` : ''}/>`;
const circle = (cx, cy, r, fill, o = {}) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}"` : ''}${o.opacity ? ` opacity="${o.opacity}"` : ''}/>`;

function defs(accent, accent2) {
  return `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#060a14"/><stop offset=".55" stop-color="#0a1020"/><stop offset="1" stop-color="#0c0a1c"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accent}"/><stop offset="1" stop-color="${accent2}"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".09"/><stop offset="1" stop-color="#ffffff" stop-opacity=".025"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accent}" stop-opacity=".35"/><stop offset="1" stop-color="${accent2}" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M34 0H0V34" fill="none" stroke="#7c9cff" stroke-opacity=".055" stroke-width="1"/>
    </pattern>
    <filter id="blur"><feGaussianBlur stdDeviation="55"/></filter>
    <clipPath id="frame"><rect x="0" y="0" width="1200" height="750" rx="0"/></clipPath>
  </defs>`;
}

function chrome(url, accent) {
  return `
    ${rect(0, 0, 1200, 42, 0, '#070c17')}
    ${circle(24, 21, 5.5, '#ff5f57')}${circle(44, 21, 5.5, '#febc2e')}${circle(64, 21, 5.5, '#28c840')}
    ${rect(94, 10, 500, 23, 11, '#0d1424', { stroke: '#233052' })}
    ${txt(110, 26, 11, '#7f8ca8', '●  ' + url, { mono: true })}
    ${rect(1103, 11, 72, 21, 10, accent, { opacity: .15 })}
    ${txt(1139, 26, 10, accent, 'LIVE', { a: 'middle', w: 700, ls: 1.5 })}`;
}

function sidebar(active, items, accent, x = 24) {
  let out = rect(x, 64, 218, 662, 18, 'url(#glass)', { stroke: '#ffffff12' });
  out += circle(x + 34, 102, 16, 'url(#accent)');
  out += txt(x + 34, 107, 12, '#fff', 'AB', { a: 'middle', w: 800 });
  out += txt(x + 60, 99, 13, '#e9eeff', 'ABO BASSEM', { w: 700, ls: .5 });
  out += txt(x + 60, 114, 8.5, '#8492b4', 'MANAGEMENT SUITE', { ls: 1.2 });
  items.forEach((it, i) => {
    const y = 156 + i * 46;
    const on = i === active;
    if (on) out += rect(x + 12, y - 21, 194, 38, 10, accent, { opacity: .14, stroke: accent + '44' });
    out += txt(x + 30, y + 2, 12, on ? accent : '#8c99b8', (on ? '● ' : '○ ') + it);
  });
  out += rect(x + 12, 646, 194, 58, 12, '#ffffff08', { stroke: '#ffffff0f' });
  out += txt(x + 26, 668, 10, '#8492b4', 'SYSTEM STATUS');
  out += circle(x + 30, 686, 4, '#34d399');
  out += txt(x + 42, 690, 11, '#d4dcf4', 'All systems operational');
  return out;
}

function statCard(x, y, w, label, value, accent, delta) {
  return `${rect(x, y, w, 84, 14, 'url(#glass)', { stroke: '#ffffff12' })}
    ${rect(x + 14, y + 14, 4, 34, 2, accent)}
    ${txt(x + 28, y + 30, 10, '#8d9ab8', label.toUpperCase(), { ls: .8 })}
    ${txt(x + 28, y + 62, 24, '#f2f5ff', value, { w: 700 })}
    ${delta ? txt(x + w - 14, y + 62, 10, accent, delta, { a: 'end', w: 700 }) : ''}`;
}

/* ---------------------------------------------------------------- */
/* 1. SUPERMARKET                                                    */
/* ---------------------------------------------------------------- */
function supermarket() {
  const A = '#34d399', A2 = '#22d3ee';
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750">${defs(A, A2)}
  <g clip-path="url(#frame)">
    ${rect(0, 0, 1200, 750, 0, 'url(#bg)')}
    ${circle(1100, 80, 260, 'url(#glow)', { filter: 'url(#blur)' })}
    ${rect(0, 0, 1200, 750, 0, 'url(#grid)')}
    ${chrome('supermarket.app/dashboard', A)}
    ${rect(24, 64, 1152, 74, 16, 'url(#glass)', { stroke: '#ffffff12' })}
    ${circle(58, 101, 20, 'url(#accent)')}
    ${txt(58, 106, 15, '#03110d', '🛒', { a: 'middle' })}
    ${txt(90, 96, 17, '#f3f7ff', 'نظام السوبر ماركت', { w: 700 })}
    ${txt(90, 115, 10, '#7f8ca8', 'SUPERMARKET MANAGEMENT SYSTEM', { ls: 1.2 })}
    ${['نقطة البيع', 'المنتجات', 'المخزون', 'المبيعات', 'العملاء'].map((t, i) => {
      const x = 520 + i * 96;
      return rect(x, 84, 84, 34, 9, i === 0 ? A : '#ffffff08', { opacity: i === 0 ? .16 : 1, stroke: i === 0 ? A + '55' : '#ffffff10' }) +
        txt(x + 42, 106, 11, i === 0 ? A : '#9aa6c2', t, { a: 'middle', w: i === 0 ? 700 : 400 });
    }).join('')}
    ${rect(24, 154, 840, 552, 18, 'url(#glass)', { stroke: '#ffffff12' })}
    ${txt(46, 188, 15, '#eef3ff', 'المنتجات السريعة', { w: 700 })}
    ${txt(46, 206, 10, '#7f8ca8', 'POINT OF SALE  ·  QUICK ADD')}
    ${rect(700, 172, 144, 30, 8, '#ffffff08', { stroke: '#ffffff12' })}
    ${txt(716, 192, 10, '#8492b4', '🔎  بحث عن منتج')}
    ${[['أرز مصري', '25.00 ج.م', A, '🍚'], ['زيت زيتون', '180.00 ج.م', A, '🫒'], ['حليب كامل', '38.50 ج.م', A2, '🥛'], ['مكرونة', '12.00 ج.م', A2, '🍝'], ['شاي عائلة', '74.00 ج.م', A, '🫖'], ['مياه معدنية', '6.00 ج.م', A2, '💧'], ['جبنة بيضاء', '56.00 ج.م', A, '🧀'], ['مناديل', '22.00 ج.م', A2, '🧻']].map((p, i) => {
      const x = 46 + (i % 4) * 201, y = 228 + Math.floor(i / 4) * 174;
      return `${rect(x, y, 184, 156, 14, '#0c1424', { stroke: '#ffffff10' })}
        ${rect(x + 12, y + 12, 160, 76, 10, 'url(#accent)', { opacity: .12 })}
        ${txt(x + 92, y + 58, 30, '#fff', p[3], { a: 'middle', o: .9 })}
        ${txt(x + 14, y + 110, 12, '#e9eeff', p[0], { w: 600 })}
        ${txt(x + 14, y + 132, 11, p[2], p[1], { w: 700 })}
        ${rect(x + 124, y + 118, 46, 26, 7, p[2], { opacity: .16, stroke: p[2] + '44' })}
        ${txt(x + 147, y + 135, 10, p[2], '+ إضافة', { a: 'middle', w: 600 })}`;
    }).join('')}
    ${rect(880, 154, 296, 552, 18, 'url(#glass)', { stroke: '#ffffff12' })}
    ${txt(904, 188, 15, '#eef3ff', 'سلة البيع', { w: 700 })}
    ${txt(1152, 188, 10, '#7f8ca8', '3 ITEMS', { a: 'end' })}
    ${[['أرز مصري', '2 × 25.00', '50.00'], ['حليب كامل', '3 × 38.50', '115.50'], ['شاي عائلة', '1 × 74.00', '74.00']].map((it, i) => {
      const y = 218 + i * 64;
      return `${rect(904, y, 248, 54, 10, '#0c1424', { stroke: '#ffffff0d' })}
        ${circle(924, y + 27, 10, A, { opacity: .16 })}
        ${txt(924, y + 31, 10, A, '✓', { a: 'middle', w: 700 })}
        ${txt(942, y + 23, 11, '#e9eeff', it[0], { w: 600 })}
        ${txt(942, y + 39, 9, '#7f8ca8', it[1])}
        ${txt(1134, y + 30, 11, '#dbe4ff', it[2], { a: 'end', w: 700 })}`;
    }).join('')}
    ${rect(904, 432, 248, 84, 12, '#ffffff06', { stroke: '#ffffff0d' })}
    ${txt(918, 456, 10, '#8d9ab8', 'المجموع الفرعي')}${txt(1138, 456, 11, '#dbe4ff', '239.50', { a: 'end' })}
    ${txt(918, 478, 10, '#8d9ab8', 'الضريبة (14%)')}${txt(1138, 478, 11, '#dbe4ff', '33.53', { a: 'end' })}
    ${txt(918, 502, 12, '#eef3ff', 'الإجمالي', { w: 700 })}${txt(1138, 502, 16, A, '273.03', { a: 'end', w: 800 })}
    ${rect(904, 536, 248, 46, 12, 'url(#accent)')}
    ${txt(1028, 565, 13, '#05130e', 'إتمام عملية البيع  →', { a: 'middle', w: 800 })}
    ${rect(904, 598, 118, 40, 10, '#ffffff08', { stroke: '#ffffff12' })}
    ${txt(963, 623, 10, '#9aa6c2', 'تعليق الفاتورة', { a: 'middle' })}
    ${rect(1034, 598, 118, 40, 10, '#ffffff08', { stroke: '#ffffff12' })}
    ${txt(1093, 623, 10, '#9aa6c2', 'طباعة', { a: 'middle' })}
    ${rect(904, 656, 248, 30, 8, '#ffffff05')}
    ${txt(1028, 676, 9, '#66738f', 'الفاتورة #INV-2026-1042', { a: 'middle', mono: true })}
  </g></svg>`;
  return s;
}

/* ---------------------------------------------------------------- */
/* 2. PHARMACY                                                       */
/* ---------------------------------------------------------------- */
function pharmacy() {
  const A = '#22d3ee', A2 = '#818cf8';
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750">${defs(A, A2)}
  <g clip-path="url(#frame)">
    ${rect(0, 0, 1200, 750, 0, 'url(#bg)')}
    ${circle(1080, 620, 280, 'url(#glow)', { filter: 'url(#blur)' })}
    ${rect(0, 0, 1200, 750, 0, 'url(#grid)')}
    ${chrome('pharmacy.app/dashboard', A)}
    ${sidebar(1, ['لوحة التحكم', 'نقطة البيع', 'الأدوية', 'المخزون', 'المبيعات', 'التقارير'], A)}
    ${txt(268, 100, 22, '#f3f7ff', 'لوحة التحكم', { w: 700 })}
    ${txt(268, 120, 10, '#7f8ca8', 'PHARMACY OPERATIONS OVERVIEW')}
    ${rect(1000, 86, 152, 34, 10, A, { opacity: .14, stroke: A + '44' })}
    ${txt(1076, 107, 10, A, '+ إضافة دواء جديد', { a: 'middle', w: 700 })}
    ${statCard(268, 146, 206, 'إجمالي الأدوية', '1,248', A, '+12 هذا الشهر')}
    ${statCard(490, 146, 206, 'تنتهي قريباً', '18', '#fbbf24', 'تحتاج مراجعة')}
    ${statCard(712, 146, 206, 'مبيعات اليوم', '4,860', A2, 'ج.م')}
    ${statCard(934, 146, 218, 'الفواتير', '126', '#f472b6', '+8 اليوم')}
    ${rect(268, 250, 560, 250, 16, 'url(#glass)', { stroke: '#ffffff12' })}
    ${txt(290, 282, 14, '#eef3ff', 'تنبيهات انتهاء الصلاحية', { w: 700 })}
    ${txt(290, 300, 10, '#7f8ca8', 'EXPIRY MONITORING')}
    ${[['أموكسيسيلين 500mg', 'دفعة #A-204', '3 أيام', '#f87171'], ['باراسيتامول 500mg', 'دفعة #P-118', '12 يوم', '#fbbf24'], ['فيتامين D3', 'دفعة #V-072', '26 يوم', A]].map((r, i) => {
      const y = 326 + i * 54;
      return `${rect(290, y, 516, 44, 9, '#0b1322', { stroke: '#ffffff0d' })}
        ${circle(314, y + 22, 11, r[3], { opacity: .15 })}
        ${txt(314, y + 26, 10, r[3], '!', { a: 'middle', w: 800 })}
        ${txt(334, y + 18, 11, '#e9eeff', r[0], { w: 600 })}
        ${txt(334, y + 33, 9, '#7f8ca8', r[1])}
        ${rect(730, y + 10, 58, 24, 7, r[3], { opacity: .14 })}
        ${txt(759, y + 26, 9, r[3], r[2], { a: 'middle', w: 700 })}`;
    }).join('')}
    ${rect(848, 250, 304, 250, 16, 'url(#glass)', { stroke: '#ffffff12' })}
    ${txt(870, 282, 14, '#eef3ff', 'المبيعات الأسبوعية', { w: 700 })}
    ${txt(870, 300, 10, '#7f8ca8', 'SALES PERFORMANCE')}
    ${[55, 88, 64, 116, 94, 138, 110].map((h, i) => {
      const x = 876 + i * 36;
      return `${rect(x, 452 - h, 20, h, 6, i === 5 ? 'url(#accent)' : A, { opacity: i === 5 ? 1 : .22 })}
        ${txt(x + 10, 470, 8, '#66738f', ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'][i], { a: 'middle' })}`;
    }).join('')}
    ${txt(1130, 300, 10, '#7f8ca8', 'آخر ٧ أيام', { a: 'end' })}
    ${rect(268, 518, 884, 188, 16, 'url(#glass)', { stroke: '#ffffff12' })}
    ${txt(290, 550, 14, '#eef3ff', 'أحدث عمليات البيع', { w: 700 })}
    ${['رقم الفاتورة', 'العميل', 'الدواء', 'الإجمالي', 'الحالة'].map((h, i) => txt(290 + [0, 120, 300, 560, 720][i], 582, 9.5, '#66738f', h, { ls: .6 })).join('')}
    ${[['#INV-8841', 'أحمد م.', 'أموكسيسيلين', '145.00', 'مكتملة'], ['#INV-8840', 'سارة ع.', 'فيتامين D3', '98.50', 'مكتملة'], ['#INV-8839', 'محمود ح.', 'باراسيتامول', '62.00', 'مكتملة']].map((r, i) => {
      const y = 604 + i * 32;
      return `${rect(290, y - 16, 840, 27, 6, i % 2 ? '#ffffff04' : 'transparent')}
        ${txt(290, y, 10, A, r[0], { mono: true })}
        ${txt(410, y, 10, '#c7d1e8', r[1])}
        ${txt(590, y, 10, '#c7d1e8', r[2])}
        ${txt(850, y, 10, '#e9eeff', r[3] + ' ج.م', { w: 600 })}
        ${rect(1010, y - 12, 62, 18, 5, A, { opacity: .13 })}
        ${txt(1041, y, 8.5, A, r[4], { a: 'middle', w: 700 })}`;
    }).join('')}
  </g></svg>`;
  return s;
}

/* ---------------------------------------------------------------- */
/* 3. GYM                                                            */
/* ---------------------------------------------------------------- */
function gym() {
  const A = '#fb923c', A2 = '#c084fc';
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750">${defs(A, A2)}
  <g clip-path="url(#frame)">
    ${rect(0, 0, 1200, 750, 0, 'url(#bg)')}
    ${circle(1080, 100, 280, 'url(#glow)', { filter: 'url(#blur)' })}
    ${rect(0, 0, 1200, 750, 0, 'url(#grid)')}
    ${chrome('gym.app/dashboard', A)}
    ${sidebar(0, ['لوحة التحكم', 'الأعضاء', 'الاشتراكات', 'الحضور', 'المدفوعات', 'التقارير'], A)}
    ${txt(268, 100, 22, '#f3f7ff', 'لوحة تحكم الجيم', { w: 700 })}
    ${txt(268, 120, 10, '#7f8ca8', 'FITNESS CENTER MANAGEMENT')}
    ${rect(1032, 86, 120, 34, 10, A, { opacity: .14, stroke: A + '44' })}
    ${txt(1092, 107, 10, A, '+ عضو جديد', { a: 'middle', w: 700 })}
    ${statCard(268, 146, 206, 'إجمالي الأعضاء', '342', A, '+18 هذا الشهر')}
    ${statCard(490, 146, 206, 'اشتراكات نشطة', '287', A2, '83.9%')}
    ${statCard(712, 146, 206, 'حضور اليوم', '96', '#34d399', '+11 اليوم')}
    ${statCard(934, 146, 218, 'إيرادات الشهر', '42,600', '#f472b6', 'ج.م')}
    ${rect(268, 250, 560, 250, 16, 'url(#glass)', { stroke: '#ffffff12' })}
    ${txt(290, 282, 14, '#eef3ff', 'حضور الأعضاء', { w: 700 })}
    ${txt(290, 300, 10, '#7f8ca8', 'WEEKLY ATTENDANCE')}
    ${[42, 66, 54, 92, 78, 120, 88].map((h, i) => {
      const x = 300 + i * 48;
      return `${rect(x, 448 - h, 26, h, 7, i === 5 ? 'url(#accent)' : A, { opacity: i === 5 ? 1 : .2 })}
        ${txt(x + 13, 468, 9, '#66738f', ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'][i], { a: 'middle' })}`;
    }).join('')}
    ${rect(740, 448, 74, 18, 5, A, { opacity: .16 })}
    ${txt(777, 461, 8.5, A, 'الأعضاء', { a: 'middle' })}
    ${rect(848, 250, 304, 250, 16, 'url(#glass)', { stroke: '#ffffff12' })}
    ${txt(870, 282, 14, '#eef3ff', 'الاشتراكات', { w: 700 })}
    ${txt(870, 300, 10, '#7f8ca8', 'MEMBERSHIP STATUS')}
    ${[['ذهبي', '72%', '#fbbf24'], ['فضي', '54%', '#cbd5e1'], ['برونزي', '38%', '#fb923c']].map((r, i) => {
      const y = 330 + i * 52;
      return `${txt(870, y, 10, '#c7d1e8', r[0], { w: 600 })}
        ${txt(1130, y, 10, r[2], r[1], { a: 'end', w: 700 })}
        ${rect(870, y + 10, 260, 7, 4, '#ffffff0d')}
        ${rect(870, y + 10, 260 * parseInt(r[1]) / 100, 7, 4, r[2])}`;
    }).join('')}
    ${rect(870, 466, 260, 22, 6, '#ffffff06')}
    ${txt(1000, 481, 9, '#66738f', 'آخر تحديث: اليوم ٩:٤١ ص', { a: 'middle' })}
    ${rect(268, 518, 884, 188, 16, 'url(#glass)', { stroke: '#ffffff12' })}
    ${txt(290, 550, 14, '#eef3ff', 'أعضاء قريبون من الانتهاء', { w: 700 })}
    ${['العضو', 'الاشتراك', 'تاريخ الانتهاء', 'المدفوع', 'الحالة'].map((h, i) => txt(290 + [0, 180, 380, 620, 760][i], 582, 9.5, '#66738f', h, { ls: .6 })).join('')}
    ${[['كريم س.', 'ذهبي', '12 نوفمبر 2026', '1,200', '3 أيام'], ['نورا م.', 'فضي', '18 نوفمبر 2026', '750', '9 أيام'], ['حسن ع.', 'برونزي', '24 نوفمبر 2026', '500', '15 يوم']].map((r, i) => {
      const y = 604 + i * 32;
      return `${rect(290, y - 16, 840, 27, 6, i % 2 ? '#ffffff04' : 'transparent')}
        ${txt(290, y, 10, '#e9eeff', r[0], { w: 600 })}
        ${txt(470, y, 10, '#c7d1e8', r[1])}
        ${txt(670, y, 10, '#c7d1e8', r[2])}
        ${txt(910, y, 10, '#e9eeff', r[3] + ' ج.م')}
        ${rect(1040, y - 12, 72, 18, 5, A, { opacity: .14 })}
        ${txt(1076, y, 8.5, A, r[4], { a: 'middle', w: 700 })}`;
    }).join('')}
  </g></svg>`;
  return s;
}

/* ---------------------------------------------------------------- */
/* 4. STUDENT REGISTRATION                                           */
/* ---------------------------------------------------------------- */
function student() {
  const A = '#60a5fa', A2 = '#a78bfa';
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750">${defs(A, A2)}
  <g clip-path="url(#frame)">
    ${rect(0, 0, 1200, 750, 0, 'url(#bg)')}
    ${circle(950, 640, 300, 'url(#glow)', { filter: 'url(#blur)' })}
    ${rect(0, 0, 1200, 750, 0, 'url(#grid)')}
    ${chrome('camp-registration.app', A)}
    ${rect(24, 64, 1152, 78, 16, 'url(#glass)', { stroke: '#ffffff12' })}
    ${circle(60, 103, 21, 'url(#accent)')}
    ${txt(60, 109, 16, '#07101f', '🎓', { a: 'middle' })}
    ${txt(94, 98, 17, '#f3f7ff', 'تسجيل الطلاب في المعسكر', { w: 700 })}
    ${txt(94, 117, 10, '#7f8ca8', 'STUDENT REGISTRATION PLATFORM  ·  RTL')}
    ${rect(926, 88, 108, 30, 8, A, { opacity: .14, stroke: A + '44' })}
    ${txt(980, 107, 10, A, 'استمارة التسجيل', { a: 'middle', w: 600 })}
    ${rect(1044, 88, 108, 30, 8, '#ffffff07', { stroke: '#ffffff10' })}
    ${txt(1098, 107, 10, '#9aa6c2', 'لوحة الإدارة', { a: 'middle' })}
    ${rect(24, 158, 560, 548, 18, 'url(#glass)', { stroke: '#ffffff12' })}
    ${txt(48, 194, 16, '#eef3ff', 'بيانات الطالب', { w: 700 })}
    ${txt(48, 213, 10, '#7f8ca8', 'STUDENT INFORMATION')}
    ${['الاسم الكامل', 'رقم الهاتف', 'المرحلة الدراسية', 'المكان'].map((label, i) => {
      const y = 244 + i * 82;
      return `${txt(48, y, 10, '#9aa6c2', label)}
        ${rect(48, y + 14, 512, 46, 10, '#0b1322', { stroke: '#ffffff12' })}
        ${txt(62, y + 43, 11, i === 0 ? '#e9eeff' : '#66738f', ['محمد أحمد علي', '01X XXXX XXXX', 'الصف الثالث الثانوي', 'المنيا — أضف المكان'][i])}
        ${i === 2 ? rect(444, y + 28, 16, 16, 4, A, { opacity: .2 }) + txt(452, y + 40, 9, A, '✓', { a: 'middle', w: 800 }) : ''}`;
    }).join('')}
    ${rect(48, 586, 512, 48, 11, 'url(#accent)')}
    ${txt(304, 616, 13, '#06111f', 'تسجيل الطالب  →', { a: 'middle', w: 800 })}
    ${txt(304, 690, 9, '#66738f', 'يتم إنشاء ملف PDF وإرسال إشعار واتساب بعد التسجيل', { a: 'middle' })}
    ${rect(608, 158, 544, 250, 18, 'url(#glass)', { stroke: '#ffffff12' })}
    ${circle(646, 206, 22, '#34d399', { opacity: .16 })}
    ${txt(646, 213, 14, '#34d399', '✓', { a: 'middle', w: 800 })}
    ${txt(680, 202, 17, '#eef3ff', 'تم تسجيل الطالب بنجاح', { w: 700 })}
    ${txt(680, 222, 10, '#7f8ca8', 'REGISTRATION CONFIRMED')}
    ${rect(632, 248, 492, 66, 12, '#0b1322', { stroke: '#ffffff10' })}
    ${rect(650, 266, 40, 34, 8, '#ef4444', { opacity: .16 })}
    ${txt(670, 289, 12, '#f87171', 'PDF', { a: 'middle', w: 800 })}
    ${txt(706, 276, 12, '#e9eeff', 'ملف الطالب — PDF', { w: 600 })}
    ${txt(706, 294, 9, '#7f8ca8', 'تحميل أو إرسال عبر واتساب')}
    ${rect(1010, 266, 92, 30, 8, '#34d399', { opacity: .14 })}
    ${txt(1056, 285, 9, '#34d399', 'تحميل', { a: 'middle', w: 700 })}
    ${rect(632, 330, 492, 54, 12, '#ffffff05', { stroke: '#ffffff0b' })}
    ${txt(650, 352, 11, '#c7d1e8', 'إجمالي التسجيلات')}
    ${txt(650, 371, 9, '#66738f', 'TOTAL REGISTRATIONS')}
    ${txt(1108, 365, 24, A, '128', { a: 'end', w: 800 })}
    ${rect(608, 424, 544, 282, 18, 'url(#glass)', { stroke: '#ffffff12' })}
    ${txt(632, 458, 14, '#eef3ff', 'أحدث التسجيلات', { w: 700 })}
    ${['الاسم', 'الهاتف', 'المرحلة', 'PDF'].map((h, i) => txt(632 + [0, 150, 300, 430][i], 490, 9.5, '#66738f', h, { ls: .6 })).join('')}
    ${[['محمد أحمد', '0100 123 4567', 'ثالثة ثانوي'], ['سارة محمود', '0111 987 6543', 'ثانية ثانوي'], ['يوسف علي', '0122 555 7788', 'أولى ثانوي']].map((r, i) => {
      const y = 522 + i * 40;
      return `${rect(632, y - 17, 496, 33, 7, i % 2 ? '#ffffff04' : 'transparent')}
        ${txt(632, y, 10, '#e9eeff', r[0], { w: 600 })}
        ${txt(782, y, 10, '#c7d1e8', r[1], { mono: true })}
        ${txt(932, y, 10, '#c7d1e8', r[2])}
        ${rect(1040, y - 13, 60, 20, 6, A, { opacity: .13 })}
        ${txt(1070, y, 8.5, A, 'تحميل', { a: 'middle', w: 700 })}`;
    }).join('')}
    ${txt(632, 680, 9, '#66738f', 'البيانات محفوظة ومزامنة — نسخة احتياطية تلقائية')}
  </g></svg>`;
  return s;
}

/* ---------------------------------------------------------------- */
/* 5. SCOUTS                                                         */
/* ---------------------------------------------------------------- */
function scouts() {
  const A = '#34d399', A2 = '#fbbf24';
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750">${defs(A, A2)}
  <g clip-path="url(#frame)">
    ${rect(0, 0, 1200, 750, 0, 'url(#bg)')}
    ${circle(1080, 650, 300, 'url(#glow)', { filter: 'url(#blur)' })}
    ${rect(0, 0, 1200, 750, 0, 'url(#grid)')}
    ${chrome('minya-air-scouts.app', A)}
    ${rect(24, 64, 1152, 82, 16, 'url(#glass)', { stroke: '#ffffff12' })}
    ${circle(62, 105, 23, 'url(#accent)')}
    ${txt(62, 111, 17, '#062018', '🧭', { a: 'middle' })}
    ${txt(98, 99, 18, '#f3f7ff', 'جمعية الكشافة الجوية', { w: 700 })}
    ${txt(98, 119, 10, '#7f8ca8', 'MINYA AIR SCOUTS  ·  MANAGEMENT PLATFORM', { ls: .8 })}
    ${['لوحة التحكم', 'الأعضاء', 'الاجتماعات', 'الحضور', 'التقارير'].map((t, i) => {
      const x = 640 + i * 100;
      return txt(x, 108, 10.5, i === 0 ? A : '#8c99b8', t, { a: 'middle', w: i === 0 ? 700 : 400 });
    }).join('')}
    ${statCard(24, 166, 270, 'إجمالي الأعضاء', '186', A, '+12')}
    ${statCard(310, 166, 270, 'الحضور اليوم', '142', A2, '76%')}
    ${statCard(596, 166, 270, 'الاجتماعات', '24', '#60a5fa', 'هذا الموسم')}
    ${statCard(882, 166, 294, 'الأنشطة القادمة', '6', '#f472b6', 'قيد التجهيز')}
    ${rect(24, 272, 700, 432, 18, 'url(#glass)', { stroke: '#ffffff12' })}
    ${txt(48, 306, 15, '#eef3ff', 'نسبة الحضور الشهرية', { w: 700 })}
    ${txt(48, 325, 10, '#7f8ca8', 'MONTHLY ATTENDANCE RATE')}
    ${rect(620, 292, 80, 26, 7, A, { opacity: .14 })}
    ${txt(660, 309, 9, A, '76%', { a: 'middle', w: 700 })}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
      const x = 60 + i * 82, h = [70, 110, 84, 140, 118, 162, 130, 176][i];
      return `${rect(x, 520 - h, 40, h, 8, i === 7 ? 'url(#accent)' : A, { opacity: i === 7 ? 1 : .18 })}
        ${txt(x + 20, 542, 9, '#66738f', ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس'][i], { a: 'middle' })}`;
    }).join('')}
    ${rect(24, 620, 700, 84, 14, '#ffffff05', { stroke: '#ffffff0b' })}
    ${txt(48, 648, 11, '#8d9ab8', 'النشاط القادم')}
    ${txt(48, 676, 15, '#eef3ff', 'اجتماع مجلس القادة — السبت ٧:٠٠ م', { w: 600 })}
    ${rect(610, 640, 90, 34, 9, A, { opacity: .15, stroke: A + '44' })}
    ${txt(655, 662, 10, A, 'التفاصيل', { a: 'middle', w: 700 })}
    ${rect(744, 272, 432, 432, 18, 'url(#glass)', { stroke: '#ffffff12' })}
    ${txt(768, 306, 15, '#eef3ff', 'أعضاء مميزون', { w: 700 })}
    ${txt(768, 325, 10, '#7f8ca8', 'TOP MEMBERS')}
    ${[['أحمد س.', 'قائد', A], ['محمود ع.', 'نائب القائد', A2], ['سارة م.', 'عضو نشط', '#60a5fa'], ['يوسف ح.', 'عضو نشط', '#f472b6']].map((r, i) => {
      const y = 358 + i * 72;
      return `${rect(768, y, 384, 58, 10, '#0b1322', { stroke: '#ffffff0d' })}
        ${circle(794, y + 29, 16, r[2], { opacity: .16 })}
        ${txt(794, y + 35, 12, r[2], r[0][0], { a: 'middle', w: 800 })}
        ${txt(822, y + 25, 12, '#e9eeff', r[0], { w: 600 })}
        ${txt(822, y + 42, 9, '#7f8ca8', r[1])}
        ${txt(1130, y + 33, 10, r[2], 'ممتاز', { a: 'end', w: 600 })}`;
    }).join('')}
    ${rect(768, 656, 384, 30, 8, '#ffffff05')}
    ${txt(960, 676, 9, '#66738f', 'موسم ٢٠٢٦ — لوحة إدارة جمعية الكشافة الجوية', { a: 'middle' })}
  </g></svg>`;
  return s;
}

/* ---------------------------------------------------------------- */
/* PROFILE PLACEHOLDER                                               */
/* ---------------------------------------------------------------- */
function profile() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900">
  <defs>
    <linearGradient id="pbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#070b16"/><stop offset=".55" stop-color="#0b1024"/><stop offset="1" stop-color="#140b2c"/>
    </linearGradient>
    <linearGradient id="pa" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#60a5fa"/><stop offset=".55" stop-color="#8b5cf6"/><stop offset="1" stop-color="#e879f9"/>
    </linearGradient>
    <radialGradient id="pglow" cx=".5" cy=".35" r=".55">
      <stop offset="0" stop-color="#6366f1" stop-opacity=".55"/><stop offset="1" stop-color="#6366f1" stop-opacity="0"/>
    </radialGradient>
    <pattern id="pgrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#8aa4ff" stroke-opacity=".07"/>
    </pattern>
    <filter id="pb"><feGaussianBlur stdDeviation="40"/></filter>
    <clipPath id="pclip"><rect width="800" height="900" rx="0"/></clipPath>
  </defs>
  <g clip-path="url(#pclip)">
    <rect width="800" height="900" fill="url(#pbg)"/>
    <rect width="800" height="900" fill="url(#pgrid)"/>
    <circle cx="400" cy="330" r="320" fill="url(#pglow)"/>
    <circle cx="120" cy="780" r="220" fill="#8b5cf6" opacity=".12" filter="url(#pb)"/>
    <circle cx="700" cy="120" r="180" fill="#06b6d4" opacity=".12" filter="url(#pb)"/>
    <circle cx="400" cy="440" r="250" fill="none" stroke="url(#pa)" stroke-opacity=".18" stroke-width="1.5"/>
    <circle cx="400" cy="440" r="330" fill="none" stroke="url(#pa)" stroke-opacity=".1" stroke-width="1"/>
    <circle cx="400" cy="440" r="410" fill="none" stroke="url(#pa)" stroke-opacity=".05" stroke-width="1"/>
    <text x="400" y="520" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="250" font-weight="800" fill="url(#pa)" opacity=".13" text-anchor="middle">MB</text>
    <g opacity=".92">
      <circle cx="400" cy="390" r="112" fill="url(#pa)" opacity=".22"/>
      <circle cx="400" cy="370" r="78" fill="url(#pa)" opacity=".75"/>
      <path d="M250 690c0-86 67-156 150-156s150 70 150 156v210H250z" fill="url(#pa)" opacity=".5"/>
      <path d="M286 690c0-70 51-126 114-126s114 56 114 126v180H286z" fill="#0b1024" opacity=".55"/>
    </g>
    <rect x="250" y="742" width="300" height="42" rx="21" fill="#0b1024" opacity=".65" stroke="#ffffff1a"/>
    <text x="400" y="768" font-family="Consolas, monospace" font-size="13" fill="#cfd9ff" text-anchor="middle" letter-spacing="2">MOHAMED BASSEM</text>
    <text x="400" y="820" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="11" fill="#8492b4" text-anchor="middle" letter-spacing="4">PROFILE PHOTO PLACEHOLDER</text>
    <circle cx="70" cy="70" r="7" fill="#60a5fa"/><circle cx="94" cy="70" r="7" fill="#8b5cf6" opacity=".7"/><circle cx="118" cy="70" r="7" fill="#e879f9" opacity=".45"/>
    <text x="70" y="106" font-family="Consolas, monospace" font-size="11" fill="#7f8ca8" letter-spacing="2">ABO / BASSEM</text>
  </g></svg>`;
}

/* ---------------------------------------------------------------- */
/* CERTIFICATE THUMBNAILS                                            */
/* ---------------------------------------------------------------- */
function certThumb(opts) {
  const { accent, accent2, category, title, date, meta, icon } = opts;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560">
  <defs>
    <linearGradient id="cbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#070b16"/><stop offset="1" stop-color="#10162b"/></linearGradient>
    <linearGradient id="ca" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${accent}"/><stop offset="1" stop-color="${accent2}"/></linearGradient>
    <pattern id="cgrid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#8aa4ff" stroke-opacity=".06"/></pattern>
    <filter id="cb"><feGaussianBlur stdDeviation="50"/></filter>
  </defs>
  <rect width="800" height="560" fill="url(#cbg)"/>
  <rect width="800" height="560" fill="url(#cgrid)"/>
  <circle cx="700" cy="70" r="180" fill="${accent}" opacity=".14" filter="url(#cb)"/>
  <circle cx="80" cy="520" r="180" fill="${accent2}" opacity=".12" filter="url(#cb)"/>
  <rect x="30" y="30" width="740" height="500" rx="22" fill="#ffffff06" stroke="#ffffff14"/>
  <rect x="30" y="30" width="740" height="6" rx="3" fill="url(#ca)"/>
  <circle cx="92" cy="112" r="30" fill="url(#ca)" opacity=".18"/>
  <text x="92" y="121" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="26" text-anchor="middle">${icon}</text>
  <text x="140" y="106" font-family="Consolas, monospace" font-size="11" fill="${accent}" letter-spacing="3">${category}</text>
  <text x="140" y="130" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="10" fill="#7f8ca8" letter-spacing="2">CERTIFICATE OF COMPLETION</text>
  <text x="70" y="220" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="34" font-weight="700" fill="#f2f5ff">${title}</text>
  <rect x="70" y="252" width="64" height="3" rx="1.5" fill="url(#ca)"/>
  <text x="70" y="296" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="13" fill="#9aa6c2">${meta}</text>
  <text x="70" y="350" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="11" fill="#66738f" letter-spacing="2">PRESENTED TO</text>
  <text x="70" y="386" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="26" font-weight="700" fill="#e9eeff">Mohamed Bassem Saleh</text>
  <text x="70" y="414" font-family="Consolas, monospace" font-size="11" fill="#7f8ca8" letter-spacing="2">ABO BASSEM</text>
  <rect x="70" y="452" width="270" height="46" rx="12" fill="#ffffff07" stroke="#ffffff12"/>
  <text x="86" y="471" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="9" fill="#66738f" letter-spacing="1.5">COMPLETION DATE</text>
  <text x="86" y="489" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="13" fill="#e9eeff" font-weight="600">${date}</text>
  <circle cx="660" cy="430" r="64" fill="none" stroke="url(#ca)" stroke-opacity=".4" stroke-width="1.5"/>
  <circle cx="660" cy="430" r="50" fill="none" stroke="url(#ca)" stroke-opacity=".22" stroke-width="1"/>
  <text x="660" y="436" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="12" fill="${accent}" text-anchor="middle" letter-spacing="2">VERIFIED</text>
  <text x="660" y="456" font-family="Consolas, monospace" font-size="9" fill="#66738f" text-anchor="middle">PDF / ORIGINAL</text>
  <text x="70" y="515" font-family="Consolas, monospace" font-size="9" fill="#4d5875" letter-spacing="1.5">TRAINING PROVIDER — ADD IN assets/js/data.js</text>
</svg>`;
}

/* ---------------------------------------------------------------- */
/* FAVICON / ICONS / OG                                              */
/* ---------------------------------------------------------------- */
function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#60a5fa"/><stop offset="%50" stop-color="#8b5cf6"/><stop offset="1" stop-color="#e879f9"/></linearGradient></defs>
  <rect width="64" height="64" rx="16" fill="#070b16"/>
  <rect x="2" y="2" width="60" height="60" rx="15" fill="none" stroke="url(#f)" stroke-opacity=".55"/>
  <text x="32" y="42" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="25" font-weight="800" fill="url(#f)" text-anchor="middle">AB</text>
  <circle cx="49" cy="15" r="3" fill="#e879f9"/>
</svg>`;
}

function og() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="ogbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#05070f"/><stop offset=".55" stop-color="#0a1024"/><stop offset="1" stop-color="#170b2b"/></linearGradient>
    <linearGradient id="oga" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#60a5fa"/><stop offset=".55" stop-color="#8b5cf6"/><stop offset="1" stop-color="#e879f9"/></linearGradient>
    <pattern id="oggrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#8aa4ff" stroke-opacity=".06"/></pattern>
    <filter id="ogb"><feGaussianBlur stdDeviation="70"/></filter>
  </defs>
  <rect width="1200" height="630" fill="url(#ogbg)"/>
  <rect width="1200" height="630" fill="url(#oggrid)"/>
  <circle cx="1050" cy="90" r="300" fill="#8b5cf6" opacity=".2" filter="url(#ogb)"/>
  <circle cx="150" cy="580" r="260" fill="#06b6d4" opacity=".16" filter="url(#ogb)"/>
  <g stroke="#60a5fa" stroke-opacity=".16"><path d="M760 100L980 60M980 60L1090 220M980 60L900 300M900 300L1100 380M760 100L900 300M760 100L650 250"/></g>
  <g fill="#8b5cf6"><circle cx="760" cy="100" r="4"/><circle cx="980" cy="60" r="5"/><circle cx="1090" cy="220" r="4"/><circle cx="900" cy="300" r="6"/><circle cx="1100" cy="380" r="4"/><circle cx="650" cy="250" r="4"/></g>
  <rect x="80" y="76" width="54" height="54" rx="15" fill="#0b1226" stroke="#8b5cf655"/>
  <text x="107" y="113" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="23" font-weight="800" fill="url(#oga)" text-anchor="middle">AB</text>
  <text x="150" y="99" font-family="Consolas, monospace" font-size="13" fill="#9aa6c2" letter-spacing="4">ABO BASSEM</text>
  <text x="150" y="120" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="10" fill="#66738f" letter-spacing="2">PERSONAL PORTFOLIO</text>
  <text x="80" y="260" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="62" font-weight="800" fill="#f2f5ff">Mohamed Bassem</text>
  <text x="80" y="328" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="62" font-weight="800" fill="url(#oga)">Saleh</text>
  <text x="84" y="380" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="20" fill="#c7d1e8">Software Developer  ·  IT Specialist  ·  Network Security Trainee</text>
  <text x="84" y="420" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="17" fill="#8c99b8">Building smart digital solutions and exploring IT and cybersecurity.</text>
  ${['Management Systems', 'Networking', 'Cybersecurity', '5 Real Projects'].map((t, i) => {
    const x = 84 + i * 210;
    return `<rect x="${x}" y="472" width="${i === 3 ? 176 : 190}" height="40" rx="20" fill="#ffffff08" stroke="#ffffff14"/>
      <text x="${x + (i === 3 ? 88 : 95)}" y="497" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="13" fill="#c7d1e8" text-anchor="middle">${t}</text>`;
  })}
  <text x="84" y="565" font-family="Consolas, monospace" font-size="12" fill="#66738f" letter-spacing="2">github.com/basm32817-dotcom</text>
  <text x="1120" y="565" font-family="Segoe UI, Tahoma, Arial, sans-serif" font-size="12" fill="#8c99b8" text-anchor="end">DEVELOPER PORTFOLIO  /  2026</text>
  <rect x="0" y="618" width="1200" height="12" fill="url(#oga)" opacity=".7"/>
</svg>`;
}

/* ---------------------------------------------------------------- */
/* WRITE                                                             */
/* ---------------------------------------------------------------- */
const write = (p, s) => { fs.writeFileSync(p, s.trim() + '\n', 'utf8'); console.log('wrote', path.relative(ROOT, p)); };

write(path.join(PROJ, 'supermarket.svg'), supermarket());
write(path.join(PROJ, 'pharmacy.svg'), pharmacy());
write(path.join(PROJ, 'gym.svg'), gym());
write(path.join(PROJ, 'student-registration.svg'), student());
write(path.join(PROJ, 'scouts.svg'), scouts());
write(path.join(IMG, 'profile.svg'), profile());
write(path.join(CERT, 'computer-network-fundamentals.svg'), certThumb({
  accent: '#60a5fa', accent2: '#22d3ee', category: 'COMPUTER NETWORKING',
  title: 'Computer Network Fundamentals', date: '20 October 2026',
  meta: '1 hour  ·  Certificate of course completion', icon: '🌐'
}));
write(path.join(CERT, 'introduction-to-network-security.svg'), certThumb({
  accent: '#a78bfa', accent2: '#e879f9', category: 'NETWORK SECURITY',
  title: 'Introduction to Network Security', date: '23 October 2026',
  meta: '1 hour 15 minutes  ·  Course + attendance certificate', icon: '🛡'
}));
write(path.join(IMG, 'favicon.svg'), favicon());
write(path.join(IMG, 'og-image.svg'), og());

(async () => {
  try {
    const sharp = require('sharp');
    await sharp(Buffer.from(og())).png().toFile(path.join(IMG, 'og-image.png'));
    console.log('wrote assets/images/og-image.png');
    await sharp(Buffer.from(favicon())).resize(192, 192).png().toFile(path.join(IMG, 'icon-192.png'));
    await sharp(Buffer.from(favicon())).resize(512, 512).png().toFile(path.join(IMG, 'icon-512.png'));
    console.log('wrote assets/images/icon-192.png and icon-512.png');
  } catch (err) {
    console.warn('PNG export skipped (sharp not available):', err.message);
  }
})();
