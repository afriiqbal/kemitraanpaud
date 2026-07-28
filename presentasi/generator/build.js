/* Pembangun deck: "Penguatan Kemitraan Strategis dan PAUD Holistik Integratif (PAUD HI)" */
const fs = require('fs');
const sharp = require('sharp');
const PptxGenJS = require('pptxgenjs');
const { S } = require('./lib/illus');
const { icon } = require('./lib/icons');

/* ------------------------------------------------------------ PALET & TIPO */
const C = {
  blue: '1E76C8', blueD: '0F4C88', blueXD: '0B355F', blueL: 'DCEDFB', blueM: 'B9DBF6',
  green: '2FA36B', greenD: '176B44', greenL: 'E3F6EC', greenM: 'BCE8D1',
  orange: 'F5871F', orangeD: 'C2620A', orangeL: 'FFF1E0', orangeM: 'FFD9B3',
  red: 'E0574B', redL: 'FDECEA', purple: '7A66B8', purpleL: 'F0EBFA',
  teal: '1F9C9C', tealL: 'E2F5F5', yellow: 'F6B93B',
  ink: '173753', body: '3E5C77', mute: '7A93A8',
  white: 'FFFFFF', bg: 'F7FAFD', line: 'E1EBF3'
};
const F = 'Calibri';
const SW = 13.333, SH = 7.5, M = 0.62;
const sh = (o = {}) => Object.assign({ type: 'outer', color: '0F3352', blur: 14, offset: 3, angle: 90, opacity: 0.10 }, o);

/* -------------------------------------------------------------- UTILITAS */
const IMG = {};
async function art(name) {
  if (IMG[name]) return IMG[name];
  const buf = await sharp(Buffer.from(S[name]())).png({ compressionLevel: 9 }).toBuffer();
  IMG[name] = 'image/png;base64,' + buf.toString('base64');
  return IMG[name];
}
const ART_RATIO = {};
async function ratio(name) {
  if (!ART_RATIO[name]) {
    const m = /width="(\d+)" height="(\d+)"/.exec(S[name]());
    ART_RATIO[name] = Number(m[1]) / Number(m[2]);
  }
  return ART_RATIO[name];
}

let PAGE = 0;
function baseSlide(pres, opt = {}) {
  const s = pres.addSlide();
  s.background = { color: opt.bg || C.white };
  return s;
}
/* dekor lembut sudut — motif berulang di seluruh dek */
function decor(s, tone = C.blueL) {
  s.addShape('ellipse', { x: -1.5, y: -1.6, w: 3.6, h: 3.6, fill: { color: tone, transparency: 45 } });
  s.addShape('ellipse', { x: SW - 1.5, y: SH - 1.7, w: 3.2, h: 3.2, fill: { color: tone, transparency: 55 } });
}
function heading(s, kicker, title, kickerColor = C.orange) {
  s.addText(kicker.toUpperCase(), {
    x: M, y: 0.40, w: 11.6, h: 0.30, fontFace: F, fontSize: 12, bold: true,
    color: kickerColor, charSpacing: 2, margin: 0
  });
  s.addText(title, {
    x: M, y: 0.70, w: 11.9, h: 0.72, fontFace: F, fontSize: 32, bold: true, color: C.ink, margin: 0
  });
}
function footer(s, label = 'Kemitraan Strategis & PAUD Holistik Integratif') {
  PAGE++;
  s.addText(label, { x: M, y: SH - 0.48, w: 8, h: 0.3, fontFace: F, fontSize: 9, color: C.mute, margin: 0 });
  s.addText(String(PAGE), { x: SW - 1.1, y: SH - 0.48, w: 0.5, h: 0.3, fontFace: F, fontSize: 10, bold: true, color: C.mute, align: 'right', margin: 0 });
}
function card(s, o) {
  s.addShape('roundRect', {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: o.r || 0.14,
    fill: { color: o.fill || C.white }, line: { color: o.line || C.line, width: o.lw === undefined ? 1 : o.lw },
    shadow: o.noShadow ? undefined : sh()
  });
}
async function iconBadge(s, o) {
  const d = o.d || 0.62;
  s.addShape(o.square ? 'roundRect' : 'ellipse', {
    x: o.x, y: o.y, w: d, h: d, rectRadius: 0.12,
    fill: { color: o.bg }, line: { width: 0 }
  });
  s.addImage({ data: await icon(o.icon, '#' + (o.fg || C.white)), x: o.x + d * 0.24, y: o.y + d * 0.24, w: d * 0.52, h: d * 0.52 });
}
function bullet(s, items, o) {
  s.addText(items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1 } })), {
    x: o.x, y: o.y, w: o.w, h: o.h, fontFace: F, fontSize: o.size || 13, color: o.color || C.body,
    paraSpaceAfter: 7, margin: 0, valign: 'top'
  });
}
async function sectionSlide(pres, num, title, sub, scene, tone) {
  const s = baseSlide(pres, { bg: tone.bg });
  const rr = await ratio(scene);
  const imgH = 3.1, imgW = imgH * rr;
  s.addImage({ data: await art(scene), x: (SW - imgW) / 2, y: SH - imgH, w: imgW, h: imgH });
  s.addShape('ellipse', { x: -1.2, y: -1.4, w: 4.2, h: 4.2, fill: { color: C.white, transparency: 88 } });
  s.addText(num, { x: M + 0.02, y: 0.52, w: 2.6, h: 1.15, fontFace: F, fontSize: 72, bold: true, color: C.white, transparency: 34, margin: 0 });
  s.addText(title, { x: M, y: 1.72, w: 10.9, h: 1.15, fontFace: F, fontSize: 36, bold: true, color: C.white, margin: 0, valign: 'top' });
  s.addText(sub, { x: M, y: 2.96, w: 9.6, h: 0.9, fontFace: F, fontSize: 15, color: C.white, transparency: 12, margin: 0, valign: 'top' });
  footer(s);
  return s;
}

/* ================================================================== BUILD */
(async () => {
  const pres = new PptxGenJS();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'Direktorat Pendidikan Anak Usia Dini';
  pres.title = 'Penguatan Kemitraan Strategis dan PAUD Holistik Integratif';

  /* --------------------------------------------------------- 1. SAMPUL */
  {
    const s = baseSlide(pres, { bg: C.blueXD });
    const rr = await ratio('hero'); const iw = SW, ih = iw / rr;
    s.addImage({ data: await art('hero'), x: 0, y: SH - ih, w: iw, h: ih });
    s.addShape('ellipse', { x: 9.4, y: -1.5, w: 5.6, h: 5.6, fill: { color: C.blue, transparency: 55 } });
    s.addShape('ellipse', { x: -1.6, y: 2.2, w: 3.4, h: 3.4, fill: { color: C.green, transparency: 65 } });
    s.addShape('roundRect', { x: M, y: 0.55, w: 3.5, h: 0.42, rectRadius: 0.21, fill: { color: C.orange } });
    s.addText('MATERI PENGUATAN PAUD HI', { x: M, y: 0.55, w: 3.5, h: 0.42, fontFace: F, fontSize: 11, bold: true, color: C.white, align: 'center', charSpacing: 1, margin: 0 });
    s.addText('Penguatan Kemitraan Strategis\ndan PAUD Holistik Integratif', {
      x: M, y: 1.06, w: 9.6, h: 1.5, fontFace: F, fontSize: 36, bold: true, color: C.white, lineSpacing: 40, margin: 0
    });
    s.addText('dalam Meningkatkan Mutu Layanan PAUD', {
      x: M, y: 2.52, w: 9.2, h: 0.42, fontFace: F, fontSize: 18, color: C.blueM, margin: 0
    });
    const chips = [['5 Bagian', C.orange], ['30 Slide', C.green], ['Berbasis 8 Indikator PAUD HI', C.teal]];
    let cx = M;
    chips.forEach(([t, col]) => {
      const w = 0.28 + t.length * 0.098;
      s.addShape('roundRect', { x: cx, y: 3.02, w, h: 0.40, rectRadius: 0.20, fill: { color: C.white, transparency: 82 }, line: { color: col, width: 1.25 } });
      s.addText(t, { x: cx, y: 3.02, w, h: 0.40, fontFace: F, fontSize: 11, bold: true, color: C.white, align: 'center', margin: 0 });
      cx += w + 0.16;
    });
    PAGE++;
    s.addNotes('Slide pembuka. Sampaikan judul, tujuan besar sesi, dan ajak peserta melihat PAUD HI sebagai kerja bersama — bukan program tambahan.');
  }

  /* ------------------------------------------------- 2. PETA PERJALANAN */
  {
    const s = baseSlide(pres); decor(s);
    heading(s, 'Peta Perjalanan', 'Alur Pembahasan Hari Ini');
    const items = [
      ['01', 'Mengapa Ini Mendesak', 'Potret layanan, urgensi usia dini, dan tantangan nyata di lapangan.', C.blue, 'FaExclamationTriangle'],
      ['02', 'Memahami PAUD HI', 'Definisi, lima layanan esensial, prinsip, regulasi, dan 8 indikator.', C.green, 'FaPuzzlePiece'],
      ['03', 'Kemitraan Strategis', 'Konsep, pemangku kepentingan, trisentra, dan tahapan membangun mitra.', C.orange, 'FaHandshake'],
      ['04', 'Praktik Baik', 'Pembelajaran nyata dari satuan PAUD dan faktor kunci keberhasilannya.', C.purple, 'FaStar'],
      ['05', 'Strategi & Aksi Nyata', 'Strategi mutu, rencana 30–60–90 hari, lembar aksi, dan monitoring.', C.teal, 'FaRocket']
    ];
    const cw = (SW - M * 2 - 0.24 * 4) / 5;
    for (let i = 0; i < items.length; i++) {
      const [no, t, d, col, ic] = items[i];
      const x = M + i * (cw + 0.24);
      card(s, { x, y: 1.62, w: cw, h: 2.62 });
      await iconBadge(s, { x: x + 0.28, y: 1.86, d: 0.66, bg: col, icon: ic });
      s.addText(no, { x: x + cw - 0.92, y: 1.84, w: 0.7, h: 0.5, fontFace: F, fontSize: 26, bold: true, color: col, transparency: 62, align: 'right', margin: 0 });
      s.addText(t, { x: x + 0.28, y: 2.66, w: cw - 0.56, h: 0.62, fontFace: F, fontSize: 15, bold: true, color: C.ink, margin: 0, valign: 'top' });
      s.addText(d, { x: x + 0.28, y: 3.26, w: cw - 0.56, h: 0.85, fontFace: F, fontSize: 11, color: C.body, margin: 0, valign: 'top' });
    }
    const rr = await ratio('roadmap'); const iw = 5.2, ih = iw / rr;
    s.addImage({ data: await art('roadmap'), x: SW - M - iw, y: 4.32, w: iw, h: ih });
    card(s, { x: M, y: 4.62, w: 6.1, h: 1.6, fill: C.blueL, line: C.blueM });
    s.addText('Satu benang merah', { x: M + 0.34, y: 4.82, w: 5.4, h: 0.32, fontFace: F, fontSize: 13, bold: true, color: C.blueD, margin: 0 });
    s.addText('Mutu layanan PAUD tidak dibangun sendirian. Setiap bagian sesi ini bergerak dari “memahami” menuju “melakukan bersama mitra”.',
      { x: M + 0.34, y: 5.16, w: 5.42, h: 0.9, fontFace: F, fontSize: 12, color: C.body, margin: 0, valign: 'top' });
    footer(s);
    s.addNotes('Jelaskan alur lima bagian. Tekankan bahwa sesi ditutup dengan aksi nyata yang bisa langsung dikerjakan satuan.');
  }

  /* -------------------------------------------------------- 3. TUJUAN */
  {
    const s = baseSlide(pres); decor(s, C.greenL);
    heading(s, 'Tujuan Sesi', 'Yang Akan Kita Capai Bersama', C.green);
    const goals = [
      ['Memahami urgensi kemitraan', 'Mengapa satuan PAUD tidak bisa bekerja sendirian.', C.blue, 'FaHandshake'],
      ['Menguasai konsep PAUD HI', 'Lima layanan esensial dan prinsip penyelenggaraannya.', C.green, 'FaPuzzlePiece'],
      ['Mengenali peran mitra', 'Siapa berbuat apa dalam ekosistem layanan anak usia dini.', C.orange, 'FaSitemap'],
      ['Belajar dari praktik baik', 'Pola yang terbukti berjalan di satuan PAUD.', C.purple, 'FaStar'],
      ['Menyusun strategi mutu', 'Langkah peningkatan layanan berbasis data.', C.teal, 'FaChartLine'],
      ['Merumuskan aksi nyata', 'Rencana 30–60–90 hari yang siap dijalankan.', C.red, 'FaRocket']
    ];
    const cw = 3.5, chh = 1.3;
    for (let i = 0; i < goals.length; i++) {
      const [t, d, col, ic] = goals[i];
      const x = M + (i % 2) * (cw + 0.28), y = 1.66 + Math.floor(i / 2) * (chh + 0.24);
      card(s, { x, y, w: cw, h: chh });
      await iconBadge(s, { x: x + 0.26, y: y + 0.34, d: 0.60, bg: col, icon: ic });
      s.addText(t, { x: x + 1.0, y: y + 0.16, w: cw - 1.22, h: 0.46, fontFace: F, fontSize: 14, bold: true, color: C.ink, margin: 0, valign: 'top' });
      s.addText(d, { x: x + 1.0, y: y + 0.64, w: cw - 1.22, h: 0.56, fontFace: F, fontSize: 11, color: C.body, margin: 0, valign: 'top' });
    }
    const rr = await ratio('bermain'); const iw = 4.5, ih = iw / rr;
    s.addImage({ data: await art('bermain'), x: 8.2, y: 3.2, w: iw, h: ih });
    s.addText('“Anak belajar paling baik ketika seluruh kebutuhannya terpenuhi — bukan hanya kebutuhan belajarnya.”',
      { x: 8.2, y: 1.8, w: iw, h: 1.2, fontFace: F, fontSize: 14, italic: true, color: C.greenD, margin: 0, valign: 'top' });
    footer(s);
    s.addNotes('Bacakan enam tujuan singkat. Minta peserta menandai satu tujuan yang paling mereka butuhkan.');
  }

  /* ----------------------------------------------------- 4. REFLEKSI */
  {
    const s = baseSlide(pres, { bg: C.bg }); decor(s);
    heading(s, 'Refleksi Pembuka', 'Mari Berhenti Sejenak dan Bertanya');
    const rr = await ratio('refleksi'); const ih = 4.3, iw = ih * rr;
    s.addImage({ data: await art('refleksi'), x: M, y: 1.75, w: iw, h: ih });
    const qs = [
      ['Kebutuhan anak', 'Sudahkah anak di satuan kita terpenuhi kebutuhan pendidikan, kesehatan, gizi, pengasuhan, dan perlindungannya?', C.blue],
      ['Peta mitra', 'Siapa mitra yang sudah bekerja bersama kita hari ini — dan siapa yang belum tersentuh sama sekali?', C.green],
      ['Langkah terdekat', 'Apa satu hal yang bisa kita perbaiki bulan depan tanpa menunggu anggaran baru?', C.orange]
    ];
    let y = 1.80;
    for (const [t, q, col] of qs) {
      card(s, { x: 5.5, y, w: SW - M - 5.5, h: 1.32 });
      s.addShape('ellipse', { x: 5.78, y: y + 0.34, w: 0.62, h: 0.62, fill: { color: col } });
      s.addText('?', { x: 5.78, y: y + 0.34, w: 0.62, h: 0.62, fontFace: F, fontSize: 26, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
      s.addText(t, { x: 6.6, y: y + 0.20, w: 5.6, h: 0.32, fontFace: F, fontSize: 13, bold: true, color: col, margin: 0 });
      s.addText(q, { x: 6.6, y: y + 0.54, w: 5.65, h: 0.68, fontFace: F, fontSize: 12.5, color: C.body, margin: 0, valign: 'top' });
      y += 1.52;
    }
    footer(s);
    s.addNotes('Beri jeda 2 menit. Minta 2–3 peserta menjawab lisan. Jawaban mereka menjadi jangkar sepanjang sesi.');
  }

  /* ------------------------------------------------------ 5. DIVIDER 1 */
  await sectionSlide(pres, '01', 'Mengapa Kemitraan dan PAUD HI Mendesak?',
    'Potret layanan PAUD Indonesia, urgensi periode usia dini, dan tantangan yang dihadapi satuan.',
    'sekolahramah', { bg: C.blueD });

  /* ------------------------------------------------ 6. POTRET LAYANAN */
  {
    const s = baseSlide(pres); decor(s);
    heading(s, 'Potret Nasional', 'Di Mana Posisi Layanan PAUD Kita?');
    const stats = [
      ['206.708', 'satuan PAUD di Indonesia', 'Basis layanan terbesar untuk anak usia dini.', C.blue],
      ['+18.819', 'satuan naik capaiannya', 'Memenuhi minimal 6 dari 8 indikator sepanjang 2025 (+9,84%).', C.green],
      ['8,95%', 'sanitasi & air bersih', 'Indikator dengan pemenuhan terendah secara nasional.', C.red],
      ['1,05%', 'belum memutakhirkan data', '2.175 satuan belum melaporkan capaian PAUD HI di Dapodik.', C.orange]
    ];
    const cw = 2.86;
    for (let i = 0; i < 4; i++) {
      const [big, lab, d, col] = stats[i];
      const x = M + i * (cw + 0.22);
      card(s, { x, y: 1.62, w: cw, h: 2.34 });
      s.addText(big, { x: x + 0.24, y: 1.80, w: cw - 0.48, h: 0.72, fontFace: F, fontSize: 34, bold: true, color: col, margin: 0 });
      s.addText(lab, { x: x + 0.24, y: 2.52, w: cw - 0.48, h: 0.34, fontFace: F, fontSize: 12.5, bold: true, color: C.ink, margin: 0 });
      s.addText(d, { x: x + 0.24, y: 2.88, w: cw - 0.48, h: 0.9, fontFace: F, fontSize: 11, color: C.body, margin: 0, valign: 'top' });
    }
    const rr = await ratio('data'); const ih = 2.85, iw = ih * rr;
    s.addImage({ data: await art('data'), x: SW - M - iw + 0.1, y: 4.15, w: iw, h: ih });
    card(s, { x: M, y: 4.25, w: 8.5, h: 2.2, fill: C.blueL, line: C.blueM });
    s.addText('Apa artinya bagi satuan PAUD?', { x: M + 0.36, y: 4.46, w: 7.8, h: 0.34, fontFace: F, fontSize: 15, bold: true, color: C.blueD, margin: 0 });
    bullet(s, [
      'Capaian nasional bergerak naik — momentum ini perlu dijaga dari tingkat satuan.',
      'Ketimpangan antarindikator sangat lebar: layanan “lunak” tinggi, sarana fisik tertinggal jauh.',
      'Sanitasi dan air bersih tidak bisa diselesaikan sekolah sendirian — di sinilah kemitraan bekerja.'
    ], { x: M + 0.36, y: 4.86, w: 7.7, h: 1.3, size: 12 });
    s.addText('Sumber: Dapodik, cut off 31 Desember 2025 — Direktorat Pendidikan Anak Usia Dini.',
      { x: M, y: SH - 0.78, w: 8.5, h: 0.26, fontFace: F, fontSize: 9, italic: true, color: C.mute, margin: 0 });
    footer(s);
    s.addNotes('Tekankan kontras: indikator berbasis kegiatan sudah di atas 85%, sementara sarana sanitasi baru 8,95%.');
  }

  /* --------------------------------------------------- 7. USIA DINI */
  {
    const s = baseSlide(pres, { bg: C.bg }); decor(s, C.greenL);
    heading(s, 'Urgensi', 'Usia Dini adalah Fondasi Kualitas SDM', C.green);
    const rr = await ratio('tumbuh'); const ih = 3.5, iw = ih * rr;
    s.addImage({ data: await art('tumbuh'), x: M, y: 1.66, w: iw, h: ih });
    const facts = [
      ['Periode yang tidak terulang', 'Perkembangan anak sejak janin sampai usia 6 tahun menentukan kualitas SDM di masa depan.', 'FaSeedling', C.green],
      ['Kebutuhan berjalan serentak', 'Gizi, kesehatan, pengasuhan, perlindungan, dan stimulasi harus dipenuhi secara simultan.', 'FaSyncAlt', C.blue],
      ['Mencegah lebih murah', 'Intervensi dini jauh lebih hemat dibanding memperbaiki keterlambatan di usia sekolah.', 'FaHandHoldingUsd', C.orange]
    ];
    let y = 1.70;
    for (const [t, d, ic, col] of facts) {
      card(s, { x: 5.9, y, w: SW - M - 5.9, h: 1.12 });
      await iconBadge(s, { x: 6.16, y: y + 0.26, d: 0.60, bg: col, icon: ic });
      s.addText(t, { x: 6.94, y: y + 0.18, w: 5.2, h: 0.32, fontFace: F, fontSize: 14, bold: true, color: C.ink, margin: 0 });
      s.addText(d, { x: 6.94, y: y + 0.52, w: 5.25, h: 0.52, fontFace: F, fontSize: 11.5, color: C.body, margin: 0, valign: 'top' });
      y += 1.28;
    }
    const phases = [['0–2 tahun', '1.000 Hari Pertama Kehidupan', C.blue], ['3–4 tahun', 'Perluasan stimulasi & sosialisasi', C.green], ['5–6 tahun', 'Prioritas layanan PAUD & kesiapan sekolah', C.orange]];
    const pw = (SW - M * 2 - 0.3 * 2) / 3;
    phases.forEach(([a, b, col], i) => {
      const x = M + i * (pw + 0.3);
      card(s, { x, y: 5.42, w: pw, h: 1.06, fill: C.white, line: col, lw: 1.5 });
      s.addText(a, { x: x + 0.26, y: 5.56, w: pw - 0.5, h: 0.32, fontFace: F, fontSize: 15, bold: true, color: col, margin: 0 });
      s.addText(b, { x: x + 0.26, y: 5.90, w: pw - 0.5, h: 0.42, fontFace: F, fontSize: 11.5, color: C.body, margin: 0, valign: 'top' });
    });
    s.addText('Rujukan: Perpres No. 60 Tahun 2013 tentang Pengembangan Anak Usia Dini Holistik Integratif.',
      { x: M, y: SH - 0.78, w: 9, h: 0.26, fontFace: F, fontSize: 9, italic: true, color: C.mute, margin: 0 });
    footer(s);
    s.addNotes('Hindari klaim angka yang tidak berdasar. Gunakan rumusan Perpres 60/2013: kualitas SDM ditentukan kualitas perkembangan anak usia dini.');
  }

  /* -------------------------------------------------- 8. TANTANGAN */
  {
    const s = baseSlide(pres); decor(s, C.orangeL);
    heading(s, 'Tantangan', 'Empat Hambatan yang Paling Sering Ditemui');
    const ch = [
      ['Layanan masih terfragmentasi', 'Pendidikan, kesehatan, dan gizi berjalan sendiri-sendiri; jadwal dan data tidak saling terhubung.', 'FaLayerGroup', C.blue],
      ['Sarana dasar belum terpenuhi', 'Sanitasi dan air bersih baru dipenuhi 8,95% satuan — kebutuhan yang melampaui kemampuan sekolah.', 'FaFaucet', C.red],
      ['Kapasitas pendidik terbatas', 'Guru diposisikan sebagai penghubung PAUD HI, namun belum semua memperoleh penguatan kapasitas.', 'FaChalkboardTeacher', C.orange],
      ['Koordinasi & data belum rutin', 'Koordinasi lintas sektor baru 75,46%; pemutakhiran data capaian belum menjadi kebiasaan.', 'FaClipboardCheck', C.purple]
    ];
    const cw = 3.86, chh = 1.54;
    for (let i = 0; i < 4; i++) {
      const [t, d, ic, col] = ch[i];
      const x = M + (i % 2) * (cw + 0.28), y = 1.66 + Math.floor(i / 2) * (chh + 0.26);
      card(s, { x, y, w: cw, h: chh });
      await iconBadge(s, { x: x + 0.26, y: y + 0.34, d: 0.66, bg: col, icon: ic });
      s.addText(t, { x: x + 1.02, y: y + 0.2, w: cw - 1.26, h: 0.5, fontFace: F, fontSize: 13.5, bold: true, color: C.ink, margin: 0, valign: 'top' });
      s.addText(d, { x: x + 1.02, y: y + 0.72, w: cw - 1.28, h: 0.74, fontFace: F, fontSize: 11, color: C.body, margin: 0, valign: 'top' });
    }
    const rr = await ratio('posyandu'); const ih = 2.9, iw = ih * rr;
    s.addImage({ data: await art('posyandu'), x: SW - M - iw, y: 1.72, w: iw, h: ih });
    card(s, { x: M, y: 5.02, w: SW - M * 2, h: 1.42, fill: C.orangeL, line: C.orangeM });
    s.addText('Benang merahnya sama', { x: M + 0.36, y: 5.18, w: 5, h: 0.32, fontFace: F, fontSize: 14, bold: true, color: C.orangeD, margin: 0 });
    s.addText('Keempat hambatan di atas tidak dapat diselesaikan oleh satuan PAUD sendirian. Semuanya bermuara pada satu kebutuhan yang sama: kemitraan yang terencana, tercatat, dan berkelanjutan dengan pihak di luar sekolah.',
      { x: M + 0.36, y: 5.52, w: SW - M * 2 - 0.72, h: 0.8, fontFace: F, fontSize: 12.5, color: C.body, margin: 0, valign: 'top' });
    footer(s);
    s.addNotes('Ajak peserta menandai hambatan mana yang paling terasa di satuan mereka.');
  }

  /* ------------------------------------------------------ 9. DIVIDER 2 */
  await sectionSlide(pres, '02', 'Memahami PAUD Holistik Integratif',
    'Definisi, lima layanan esensial, prinsip penyelenggaraan, kerangka regulasi, dan delapan indikator di satuan PAUD.',
    'kelas', { bg: C.greenD });

  /* --------------------------------------------------- 10. DEFINISI */
  {
    const s = baseSlide(pres); decor(s, C.greenL);
    heading(s, 'Definisi', 'Apa Itu PAUD Holistik Integratif?', C.green);
    card(s, { x: M, y: 1.66, w: 7.3, h: 2.34, fill: C.greenL, line: C.greenM });
    s.addImage({ data: await icon('FaQuoteLeft', '#' + C.green), x: M + 0.36, y: 1.92, w: 0.42, h: 0.42 });
    s.addText('Upaya pengembangan anak usia dini yang dilakukan untuk memenuhi kebutuhan esensial anak yang beragam dan saling terkait secara simultan, sistematis, dan terintegrasi.',
      { x: M + 0.98, y: 1.9, w: 6.0, h: 1.4, fontFace: F, fontSize: 16, color: C.ink, margin: 0, valign: 'top' });
    s.addText('Perpres No. 60 Tahun 2013', { x: M + 0.98, y: 3.34, w: 6.0, h: 0.3, fontFace: F, fontSize: 12, bold: true, color: C.greenD, margin: 0 });
    const keys = [
      ['Simultan', 'Kebutuhan anak dipenuhi pada waktu yang bersamaan, tidak bergiliran.', C.blue, 'FaSyncAlt'],
      ['Sistematis', 'Ada perencanaan, penanggung jawab, jadwal, dan pencatatan yang jelas.', C.orange, 'FaTasks'],
      ['Terintegrasi', 'Layanan pendidikan menyatu dengan layanan kesehatan, gizi, dan perlindungan.', C.purple, 'FaPuzzlePiece']
    ];
    let y = 4.2;
    for (const [t, d, col, ic] of keys) {
      card(s, { x: M, y, w: 7.3, h: 0.86 });
      await iconBadge(s, { x: M + 0.26, y: y + 0.16, d: 0.54, bg: col, icon: ic });
      s.addText(t, { x: M + 0.98, y: y + 0.12, w: 1.6, h: 0.3, fontFace: F, fontSize: 13.5, bold: true, color: col, margin: 0 });
      s.addText(d, { x: M + 2.5, y: y + 0.12, w: 4.66, h: 0.62, fontFace: F, fontSize: 11.5, color: C.body, margin: 0, valign: 'top' });
      y += 0.98;
    }
    const rr = await ratio('kelas'); const iw = 4.72, ih = iw / rr;
    s.addImage({ data: await art('kelas'), x: SW - M - iw, y: 1.9, w: iw, h: ih });
    s.addText('PAUD HI bukan program tambahan, melainkan cara satuan PAUD memandang dan melayani anak secara utuh.',
      { x: SW - M - iw, y: 5.35, w: iw, h: 0.8, fontFace: F, fontSize: 12.5, italic: true, color: C.greenD, margin: 0, valign: 'top' });
    footer(s);
    s.addNotes('Tekankan tiga kata kunci: simultan, sistematis, terintegrasi. Ini yang membedakan PAUD HI dari kegiatan insidental.');
  }

  /* ------------------------------------------- 11. LAYANAN ESENSIAL */
  {
    const s = baseSlide(pres, { bg: C.bg }); decor(s);
    heading(s, 'Ruang Lingkup', 'Lima Layanan Esensial untuk Setiap Anak', C.green);
    const svc = [
      ['Pendidikan', 'Stimulasi dan pembelajaran bermakna melalui bermain.', C.blue, 'FaGraduationCap'],
      ['Kesehatan & Gizi', 'Pemantauan tumbuh kembang, PHBS, dan makanan bergizi.', C.green, 'FaHeartbeat'],
      ['Pengasuhan', 'Penguatan peran orang tua dan pengasuhan positif di rumah.', C.orange, 'FaHandHoldingHeart'],
      ['Perlindungan', 'Lingkungan aman, bebas kekerasan, dan ramah anak.', C.purple, 'FaShieldAlt'],
      ['Kesejahteraan', 'Kepemilikan identitas dan akses bantuan bagi anak rentan.', C.teal, 'FaIdCard']
    ];
    const cw = (SW - M * 2 - 0.24 * 4) / 5;
    for (let i = 0; i < 5; i++) {
      const [t, d, col, ic] = svc[i];
      const x = M + i * (cw + 0.24);
      card(s, { x, y: 1.66, w: cw, h: 2.72 });
      s.addShape('ellipse', { x: x + cw / 2 - 0.44, y: 1.94, w: 0.88, h: 0.88, fill: { color: col } });
      s.addImage({ data: await icon(ic, '#FFFFFF'), x: x + cw / 2 - 0.23, y: 2.15, w: 0.46, h: 0.46 });
      s.addText(t, { x: x + 0.16, y: 3.0, w: cw - 0.32, h: 0.36, fontFace: F, fontSize: 14.5, bold: true, color: C.ink, align: 'center', margin: 0 });
      s.addText(d, { x: x + 0.2, y: 3.38, w: cw - 0.4, h: 0.86, fontFace: F, fontSize: 11, color: C.body, align: 'center', margin: 0, valign: 'top' });
    }
    card(s, { x: M, y: 4.66, w: 7.4, h: 1.6, fill: C.blueL, line: C.blueM });
    s.addText('Semua anak, tanpa terkecuali', { x: M + 0.36, y: 4.86, w: 6.6, h: 0.32, fontFace: F, fontSize: 14, bold: true, color: C.blueD, margin: 0 });
    s.addText('Kelima layanan ini melekat pada setiap anak usia dini — termasuk anak dengan disabilitas, anak dari keluarga rentan, dan anak yang belum memiliki dokumen kependudukan. Satuan PAUD memastikan tidak ada anak yang terlewat.',
      { x: M + 0.36, y: 5.2, w: 6.66, h: 0.92, fontFace: F, fontSize: 12, color: C.body, margin: 0, valign: 'top' });
    const rr = await ratio('perlindungan'); const ih = 1.66, iw = ih * rr;
    s.addImage({ data: await art('perlindungan'), x: 8.22, y: 4.62, w: iw, h: ih });
    s.addText('Sektor pendidikan menjadi rumah kedua bagi anak — tempat layanan esensial lainnya ikut didorong pemenuhannya melalui koordinasi lintas sektor.',
      { x: 10.05, y: 4.84, w: 2.66, h: 1.4, fontFace: F, fontSize: 11, color: C.body, margin: 0, valign: 'top' });
    footer(s);
    s.addNotes('Lima layanan esensial: pendidikan; kesehatan dan gizi; pengasuhan; perlindungan; kesejahteraan.');
  }

  /* ------------------------------------------------------ 12. PRINSIP */
  {
    const s = baseSlide(pres); decor(s, C.purpleL);
    heading(s, 'Prinsip', 'Empat Prinsip Penyelenggaraan PAUD HI', C.purple);
    const pr = [
      ['Holistik', 'Memperhatikan seluruh kebutuhan anak — fisik, kognitif, sosial, emosional, dan spiritual.', C.blue, 'FaLayerGroup'],
      ['Integratif', 'Terpadu antar layanan dan antar sektor, bukan kegiatan yang berdiri sendiri.', C.green, 'FaPuzzlePiece'],
      ['Kolaboratif', 'Bersama orang tua, masyarakat, pemerintah daerah, dan mitra pembangunan.', C.orange, 'FaHandsHelping'],
      ['Berkualitas', 'Layanan terbaik dan berkesinambungan, bukan sekadar memenuhi administrasi.', C.purple, 'FaMedal']
    ];
    const cw = 3.6, chh = 1.5;
    for (let i = 0; i < 4; i++) {
      const [t, d, col, ic] = pr[i];
      const x = M + (i % 2) * (cw + 0.3), y = 1.72 + Math.floor(i / 2) * (chh + 0.3);
      card(s, { x, y, w: cw, h: chh });
      await iconBadge(s, { x: x + 0.28, y: y + 0.3, d: 0.68, bg: col, icon: ic });
      s.addText(t, { x: x + 1.1, y: y + 0.26, w: cw - 1.3, h: 0.36, fontFace: F, fontSize: 16, bold: true, color: col, margin: 0 });
      s.addText(d, { x: x + 1.1, y: y + 0.64, w: cw - 1.34, h: 0.74, fontFace: F, fontSize: 11.5, color: C.body, margin: 0, valign: 'top' });
    }
    const rr = await ratio('kolaborasi'); const ih = 3.4, iw = ih * rr;
    s.addImage({ data: await art('kolaborasi'), x: SW - M - iw - 0.5, y: 1.7, w: iw, h: ih });
    card(s, { x: M, y: 5.06, w: SW - M * 2, h: 1.16, fill: C.purpleL, line: 'DED4F2' });
    s.addText('Keempat prinsip ini menjadi ukuran sederhana: bila satu layanan berjalan tanpa yang lain, atau berjalan tanpa mitra, penyelenggaraan kita belum benar-benar holistik integratif.',
      { x: M + 0.36, y: 5.32, w: SW - M * 2 - 0.72, h: 0.7, fontFace: F, fontSize: 13, color: C.ink, margin: 0, valign: 'top' });
    footer(s);
    s.addNotes('Gunakan empat prinsip ini sebagai alat cek cepat saat menilai kegiatan di satuan.');
  }

  /* ----------------------------------------------------- 13. REGULASI */
  {
    const s = baseSlide(pres, { bg: C.bg }); decor(s);
    heading(s, 'Landasan Hukum', 'Kerangka Regulasi yang Mendasari PAUD HI');
    const tl = [
      ['UU No. 20/2003', 'Sistem Pendidikan Nasional', 'PAUD sebagai bagian utuh sistem pendidikan nasional.', C.blue, 'FaBalanceScale'],
      ['Perpres No. 60/2013', 'PAUD Holistik Integratif', 'Payung utama: kebutuhan esensial anak dipenuhi secara simultan dan terintegrasi.', C.green, 'FaGavel'],
      ['Permenko PMK No. 1/2019', 'Gugus Tugas PAUD HI', 'Kemendikdasmen sebagai sub gugus tugas bidang pendidikan.', C.orange, 'FaSitemap'],
      ['Perpres No. 72/2021', 'Percepatan Penurunan Stunting', 'Sektor pendidikan berkontribusi melalui intervensi sensitif.', C.red, 'FaHeartbeat'],
      ['RAN PAUD HI', 'Bidang Pendidikan', 'Akses, kualitas layanan, dan kompetensi pendidik sebagai penghubung.', C.purple, 'FaRoad']
    ];
    const cw = (SW - M * 2 - 0.2 * 4) / 5;
    s.addShape('line', { x: M + cw / 2, y: 2.42, w: (cw + 0.2) * 4, h: 0, line: { color: C.line, width: 2.5, dashType: 'dash' } });
    for (let i = 0; i < 5; i++) {
      const [a, b, d, col, ic] = tl[i];
      const x = M + i * (cw + 0.2);
      s.addShape('ellipse', { x: x + cw / 2 - 0.42, y: 2.0, w: 0.84, h: 0.84, fill: { color: col }, line: { color: C.white, width: 3 } });
      s.addImage({ data: await icon(ic, '#FFFFFF'), x: x + cw / 2 - 0.22, y: 2.2, w: 0.44, h: 0.44 });
      card(s, { x, y: 3.06, w: cw, h: 2.5 });
      s.addText(a, { x: x + 0.2, y: 3.22, w: cw - 0.4, h: 0.36, fontFace: F, fontSize: 13.5, bold: true, color: col, align: 'center', margin: 0 });
      s.addText(b, { x: x + 0.18, y: 3.58, w: cw - 0.36, h: 0.6, fontFace: F, fontSize: 12, bold: true, color: C.ink, align: 'center', margin: 0, valign: 'top' });
      s.addText(d, { x: x + 0.2, y: 4.2, w: cw - 0.4, h: 1.2, fontFace: F, fontSize: 10.5, color: C.body, align: 'center', margin: 0, valign: 'top' });
    }
    s.addText('Regulasi menegaskan satu hal: PAUD HI adalah kerja bersama lintas sektor, bukan tugas satu instansi.',
      { x: M, y: 5.76, w: SW - M * 2, h: 0.4, fontFace: F, fontSize: 13, bold: true, color: C.ink, align: 'center', margin: 0 });
    footer(s);
    s.addNotes('Tidak perlu menghafal pasal. Cukup pahami: ada payung hukum yang mewajibkan koordinasi lintas sektor.');
  }

  /* ------------------------------------------------- 14. MISKONSEPSI */
  {
    const s = baseSlide(pres); decor(s, C.redL);
    heading(s, 'Luruskan Dulu', 'Miskonsepsi yang Sering Terjadi', C.red);
    s.addText('MITOS', { x: M + 0.1, y: 1.6, w: 5.2, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: C.red, charSpacing: 2, margin: 0 });
    s.addText('FAKTA', { x: 6.6, y: 1.6, w: 6, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: C.green, charSpacing: 2, margin: 0 });
    const rows = [
      ['PAUD HI adalah salah satu jenis lembaga PAUD.', 'PAUD HI adalah pendekatan layanan yang dijalankan semua satuan PAUD — bukan jenis lembaga baru.'],
      ['PAUD HI adalah label atau predikat sekolah.', 'PAUD HI bukan label; ia terlihat dari praktik pemenuhan kebutuhan esensial anak sehari-hari.'],
      ['PAUD HI hanya tugas dinas pendidikan.', 'PAUD HI dijalankan lintas sektor: kesehatan, sosial, dukcapil, desa, dan masyarakat.'],
      ['PAUD HI menjadi tugas utama guru.', 'Guru berperan sebagai penghubung layanan, bukan pelaksana tunggal seluruh layanan.']
    ];
    let y = 1.94;
    for (const [m, f] of rows) {
      card(s, { x: M, y, w: 5.5, h: 0.98, fill: C.redL, line: 'F6D6D2' });
      s.addImage({ data: await icon('FaTimesCircle', '#' + C.red), x: M + 0.24, y: y + 0.3, w: 0.38, h: 0.38 });
      s.addText(m, { x: M + 0.76, y: y + 0.14, w: 4.6, h: 0.72, fontFace: F, fontSize: 12, color: C.ink, margin: 0, valign: 'middle' });
      s.addShape('rightArrow', { x: 6.24, y: y + 0.34, w: 0.3, h: 0.3, fill: { color: C.mute } });
      card(s, { x: 6.6, y, w: SW - M - 6.6, h: 0.98, fill: C.greenL, line: C.greenM });
      s.addImage({ data: await icon('FaCheckCircle', '#' + C.green), x: 6.84, y: y + 0.3, w: 0.38, h: 0.38 });
      s.addText(f, { x: 7.36, y: y + 0.12, w: SW - M - 7.56, h: 0.76, fontFace: F, fontSize: 12, color: C.ink, margin: 0, valign: 'middle' });
      y += 1.12;
    }
    s.addText('Kesimpulannya: PAUD HI adalah cara kerja bersama, bukan status, bukan beban satu orang.',
      { x: M, y: 6.36, w: SW - M * 2, h: 0.4, fontFace: F, fontSize: 13, bold: true, color: C.ink, align: 'center', margin: 0 });
    footer(s);
    s.addNotes('Bisa dijadikan kuis benar/salah interaktif: minta peserta angkat tangan sebelum jawaban dibuka.');
  }

  /* -------------------------------------------------- 15. 8 INDIKATOR */
  {
    const s = baseSlide(pres, { bg: C.bg }); decor(s, C.greenL);
    heading(s, 'Ukuran di Satuan', 'Delapan Indikator PAUD HI di Satuan PAUD', C.green);
    const ind = [
      ['Kelas Orang Tua', 'Wadah berbagi informasi kebutuhan esensial anak.', C.blue, 'FaUserFriends'],
      ['Pemantauan Pertumbuhan', 'Berat badan, tinggi badan, dan lingkar kepala.', C.green, 'FaWeight'],
      ['Pemantauan Perkembangan', 'DDTK/KPSP/KMS/KIA/KKA secara berkala.', C.orange, 'FaChild'],
      ['Koordinasi Lintas Sektor', 'Bersama unit lain terkait kesehatan dan gizi.', C.purple, 'FaSitemap'],
      ['Penerapan PHBS', 'Perilaku hidup bersih dan sehat melalui pembiasaan.', C.teal, 'FaSoap'],
      ['PMT & Makanan Bergizi', 'Diberikan secara berkala, minimal tiga bulan sekali.', C.red, 'FaUtensils'],
      ['Kepemilikan NIK', 'Memastikan setiap peserta didik memiliki identitas.', C.blueD, 'FaIdCard'],
      ['Sanitasi & Air Bersih', 'Fasilitas sederhana dengan air mengalir tersedia.', C.greenD, 'FaFaucet']
    ];
    const cw = 2.84, chh = 1.86;
    for (let i = 0; i < 8; i++) {
      const [t, d, col, ic] = ind[i];
      const x = M + (i % 4) * (cw + 0.24), y = 1.62 + Math.floor(i / 4) * (chh + 0.24);
      card(s, { x, y, w: cw, h: chh });
      await iconBadge(s, { x: x + 0.24, y: y + 0.24, d: 0.62, bg: col, icon: ic });
      s.addText(String(i + 1).padStart(2, '0'), { x: x + cw - 0.86, y: y + 0.2, w: 0.62, h: 0.4, fontFace: F, fontSize: 20, bold: true, color: col, transparency: 65, align: 'right', margin: 0 });
      s.addText(t, { x: x + 0.24, y: y + 0.94, w: cw - 0.48, h: 0.48, fontFace: F, fontSize: 12.5, bold: true, color: C.ink, margin: 0, valign: 'top' });
      s.addText(d, { x: x + 0.24, y: y + 1.42, w: cw - 0.48, h: 0.4, fontFace: F, fontSize: 10, color: C.body, margin: 0, valign: 'top' });
    }
    card(s, { x: M, y: 5.68, w: SW - M * 2, h: 0.86, fill: C.greenL, line: C.greenM });
    s.addText('Delapan indikator ini dilaporkan melalui Dapodik. Memutakhirkannya bukan pekerjaan administratif semata — ia menjadi dasar perencanaan dan dukungan yang diterima satuan.',
      { x: M + 0.36, y: 5.8, w: SW - M * 2 - 0.72, h: 0.6, fontFace: F, fontSize: 12.5, color: C.ink, margin: 0, valign: 'middle' });
    footer(s);
    s.addNotes('Minta peserta mencentang indikator yang sudah dan belum dipenuhi satuannya.');
  }

  /* ------------------------------------------------- 16. CAPAIAN DATA */
  {
    const s = baseSlide(pres); decor(s);
    heading(s, 'Capaian Nasional', 'Pemenuhan Delapan Indikator PAUD HI');
    const labels = ['Kelas orang tua', 'Pemantauan NIK', 'Penerapan PHBS', 'Pemantauan pertumbuhan', 'Pemantauan perkembangan', 'PMT & makanan bergizi', 'Koordinasi lintas sektor', 'Sanitasi & air bersih'];
    const vals = [98.59, 95.86, 94.75, 90.84, 89.12, 86.94, 75.46, 8.95];
    card(s, { x: M, y: 1.62, w: 7.9, h: 4.5, noShadow: false });
    s.addChart(pres.ChartType.bar, [{ name: 'Persentase satuan PAUD', labels, values: vals }], {
      x: M + 0.12, y: 1.74, w: 7.66, h: 4.26,
      barDir: 'bar', barGapWidthPct: 42,
      chartColors: [C.green, C.green, C.green, C.blue, C.blue, C.blue, C.orange, C.red],
      varyColors: true,
      showLegend: false, showTitle: false,
      showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.00"%"',
      dataLabelFontSize: 10, dataLabelFontFace: F, dataLabelColor: C.ink,
      catAxisLabelFontFace: F, catAxisLabelFontSize: 10.5, catAxisLabelColor: C.body,
      valAxisLabelFontFace: F, valAxisLabelFontSize: 9, valAxisLabelColor: C.mute,
      valAxisMaxVal: 100, valAxisMajorUnit: 25,
      valGridLine: { color: C.line, size: 1 }, catGridLine: { style: 'none' },
      catAxisLineShow: false, valAxisLineShow: false
    });
    const ins = [
      ['Tertinggi', 'Kelas orang tua 98,59% — budaya melibatkan orang tua sudah terbangun.', C.green, 'FaThumbsUp'],
      ['Terendah', 'Sanitasi & air bersih 8,95% — 167.872 satuan belum memiliki fasilitas memadai.', C.red, 'FaExclamationTriangle'],
      ['Titik ungkit', 'Koordinasi lintas sektor 75,46% — kunci menuju perbaikan indikator lain.', C.orange, 'FaBullseye']
    ];
    let y = 1.62;
    for (const [t, d, col, ic] of ins) {
      card(s, { x: 8.78, y, w: SW - M - 8.78, h: 1.42 });
      await iconBadge(s, { x: 9.02, y: y + 0.26, d: 0.56, bg: col, icon: ic });
      s.addText(t, { x: 9.72, y: y + 0.22, w: 2.6, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: col, margin: 0 });
      s.addText(d, { x: 9.72, y: y + 0.54, w: 2.72, h: 0.76, fontFace: F, fontSize: 11, color: C.body, margin: 0, valign: 'top' });
      y += 1.54;
    }
    s.addText('Sumber: Dapodik, cut off 31 Desember 2025 (206.708 satuan PAUD).',
      { x: M, y: SH - 0.78, w: 8, h: 0.26, fontFace: F, fontSize: 9, italic: true, color: C.mute, margin: 0 });
    footer(s);
    s.addNotes('Fokuskan diskusi pada jurang antara indikator kegiatan dan indikator sarana fisik.');
  }

  /* ----------------------------------------------------- 17. DIVIDER 3 */
  await sectionSlide(pres, '03', 'Kemitraan Strategis: Kunci Layanan Holistik',
    'Konsep kemitraan, peta pemangku kepentingan, trisentra pendidikan, tahapan membangun, dan instrumen pendukungnya.',
    'rapat', { bg: C.orangeD });

  /* ------------------------------------------------ 18. KONSEP MITRA */
  {
    const s = baseSlide(pres); decor(s, C.orangeL);
    heading(s, 'Konsep', 'Ciri Kemitraan yang Benar-benar Strategis', C.orange);
    const rr = await ratio('kolaborasi'); const ih = 3.5, iw = ih * rr;
    s.addImage({ data: await art('kolaborasi'), x: M - 0.15, y: 2.5, w: iw, h: ih });
    card(s, { x: M, y: 1.64, w: 4.5, h: 0.94, fill: C.orangeL, line: C.orangeM });
    s.addText('Kemitraan strategis adalah kerja sama terencana antara satuan PAUD dan pihak lain untuk memenuhi kebutuhan esensial anak secara berkelanjutan.',
      { x: M + 0.24, y: 1.72, w: 4.02, h: 0.8, fontFace: F, fontSize: 11.5, color: C.ink, margin: 0, valign: 'middle' });
    const pr = [
      ['Kesetaraan', 'Semua pihak duduk sebagai mitra, bukan atasan dan bawahan.', C.blue, 'FaBalanceScale'],
      ['Kepercayaan', 'Dibangun melalui komunikasi rutin dan komitmen yang ditepati.', C.green, 'FaHandshake'],
      ['Saling menguntungkan', 'Setiap pihak memperoleh manfaat sesuai tugas dan fungsinya.', C.orange, 'FaSyncAlt'],
      ['Transparan & akuntabel', 'Kegiatan, sumber daya, dan hasilnya dicatat serta dilaporkan.', C.purple, 'FaEye'],
      ['Berkelanjutan', 'Diikat kesepakatan tertulis agar tidak berhenti saat orangnya berganti.', C.teal, 'FaSeedling']
    ];
    let y = 1.64;
    for (const [t, d, col, ic] of pr) {
      card(s, { x: 5.5, y, w: SW - M - 5.5, h: 0.9 });
      await iconBadge(s, { x: 5.74, y: y + 0.16, d: 0.58, bg: col, icon: ic });
      s.addText(t, { x: 6.48, y: y + 0.14, w: 2.2, h: 0.32, fontFace: F, fontSize: 13, bold: true, color: col, margin: 0 });
      s.addText(d, { x: 8.6, y: y + 0.14, w: 3.5, h: 0.66, fontFace: F, fontSize: 11, color: C.body, margin: 0, valign: 'middle' });
      y += 0.99;
    }
    footer(s);
    s.addNotes('Bedakan kemitraan strategis dari bantuan insidental: ada rencana, kesepakatan, dan keberlanjutan.');
  }

  /* -------------------------------------------- 19. PETA STAKEHOLDER */
  {
    const s = baseSlide(pres, { bg: C.bg }); decor(s);
    heading(s, 'Ekosistem', 'Peta Pemangku Kepentingan Satuan PAUD');
    const cx = 7.2, cy = 4.15;
    s.addShape('ellipse', { x: cx - 2.5, y: cy - 2.5, w: 5.0, h: 5.0, fill: { color: C.blueL, transparency: 55 }, line: { width: 0 } });
    s.addShape('ellipse', { x: cx - 1.02, y: cy - 1.02, w: 2.04, h: 2.04, fill: { color: C.blue }, line: { color: C.white, width: 4 }, shadow: sh({ blur: 18, opacity: 0.18 }) });
    s.addText('SATUAN\nPAUD', { x: cx - 1.0, y: cy - 0.42, w: 2.0, h: 0.9, fontFace: F, fontSize: 17, bold: true, color: C.white, align: 'center', margin: 0 });
    const nodes = [
      ['Dinas Pendidikan', C.blueD, 'FaLandmark', -90],
      ['Puskesmas & Dinkes', C.green, 'FaHospital', -45],
      ['Posyandu & Kader', C.teal, 'FaUserNurse', 0],
      ['Dukcapil, Dinsos & DP3A', C.purple, 'FaIdCard', 45],
      ['Orang Tua & Komite', C.orange, 'FaUserFriends', 90],
      ['Bunda PAUD & TP PKK', C.red, 'FaMedal', 135],
      ['Pemerintah Desa', C.greenD, 'FaCity', 180],
      ['Dunia Usaha & Mitra', C.blue, 'FaBriefcase', 225]
    ];
    const rx = 3.9, ry = 2.2, bw = 2.34, bh = 0.62;
    s.addShape('ellipse', {
      x: cx - rx, y: cy - ry, w: rx * 2, h: ry * 2,
      fill: { type: 'none' }, line: { color: C.blueM, width: 1.75, dashType: 'sysDash' }
    });
    for (const [t, col, ic, ang] of nodes) {
      const a = ang * Math.PI / 180;
      const nx = cx + Math.cos(a) * rx - bw / 2, ny = cy + Math.sin(a) * ry - bh / 2;
      card(s, { x: nx, y: ny, w: bw, h: bh, r: 0.3, line: col, lw: 1.4 });
      s.addShape('ellipse', { x: nx + 0.08, y: ny + 0.08, w: 0.46, h: 0.46, fill: { color: col } });
      s.addImage({ data: await icon(ic, '#FFFFFF'), x: nx + 0.19, y: ny + 0.19, w: 0.24, h: 0.24 });
      s.addText(t, { x: nx + 0.6, y: ny + 0.04, w: bw - 0.68, h: bh - 0.08, fontFace: F, fontSize: 10.5, bold: true, color: C.ink, margin: 0, valign: 'middle' });
    }
    card(s, { x: M, y: 2.0, w: 2.4, h: 1.7, fill: C.blueL, line: C.blueM });
    s.addText('Satuan PAUD berada di titik temu. Tugasnya bukan mengerjakan semua layanan, melainkan menghubungkan anak dengan layanan yang tersedia.',
      { x: M + 0.2, y: 2.14, w: 2.0, h: 1.44, fontFace: F, fontSize: 11, color: C.blueD, margin: 0, valign: 'middle' });
    footer(s);
    s.addNotes('Ajak peserta menyebut mitra yang sudah aktif dan mitra yang belum pernah dihubungi.');
  }

  /* ------------------------------------------------- 20. PERAN MITRA */
  {
    const s = baseSlide(pres); decor(s, C.greenL);
    heading(s, 'Pembagian Peran', 'Siapa Berbuat Apa dalam Layanan PAUD HI', C.green);
    const roles = [
      ['Dinas Pendidikan', 'Regulasi daerah, pembinaan, penganggaran, dan pendampingan satuan.', C.blueD, 'FaLandmark'],
      ['Puskesmas & Dinkes', 'Pemeriksaan berkala, imunisasi, penyuluhan gizi, dan rujukan kesehatan.', C.green, 'FaHospital'],
      ['Posyandu & Kader', 'Penimbangan rutin, pemantauan tumbuh kembang, dan pencatatan KMS/KIA.', C.teal, 'FaUserNurse'],
      ['Dukcapil, Dinsos & DP3A', 'Pemenuhan NIK, bantuan sosial, dan penanganan kasus perlindungan anak.', C.purple, 'FaIdCard'],
      ['Pemerintah Desa', 'Dana desa untuk sanitasi, air bersih, ruang bermain, dan insentif kader.', C.greenD, 'FaCity'],
      ['Bunda PAUD & TP PKK', 'Advokasi, penggerak masyarakat, dan kampanye pengasuhan positif.', C.red, 'FaMedal'],
      ['Orang Tua & Komite', 'Kelas orang tua, kesinambungan stimulasi di rumah, dan swadaya.', C.orange, 'FaUserFriends'],
      ['Dunia Usaha & Mitra', 'CSR untuk sarana, buku, alat main, dan pelatihan pendidik.', C.blue, 'FaBriefcase']
    ];
    const cw = 2.84, chh = 1.86;
    for (let i = 0; i < 8; i++) {
      const [t, d, col, ic] = roles[i];
      const x = M + (i % 4) * (cw + 0.24), y = 1.66 + Math.floor(i / 4) * (chh + 0.26);
      card(s, { x, y, w: cw, h: chh });
      await iconBadge(s, { x: x + 0.24, y: y + 0.26, d: 0.64, bg: col, icon: ic });
      s.addText(t, { x: x + 0.24, y: y + 1.0, w: cw - 0.48, h: 0.5, fontFace: F, fontSize: 12.5, bold: true, color: C.ink, margin: 0, valign: 'top' });
      s.addText(d, { x: x + 0.24, y: y + 1.42, w: cw - 0.48, h: 0.4, fontFace: F, fontSize: 10, color: C.body, margin: 0, valign: 'top' });
    }
    card(s, { x: M, y: 5.72, w: SW - M * 2, h: 0.82, fill: C.greenL, line: C.greenM });
    s.addText('Tips: tuliskan nama dan nomor kontak penanggung jawab dari setiap mitra pada satu lembar. Kemitraan gagal paling sering bukan karena menolak, melainkan karena tidak pernah dihubungi.',
      { x: M + 0.36, y: 5.84, w: SW - M * 2 - 0.72, h: 0.58, fontFace: F, fontSize: 12, color: C.ink, margin: 0, valign: 'middle' });
    footer(s);
    s.addNotes('Delapan mitra ini bisa disesuaikan dengan konteks daerah masing-masing.');
  }

  /* -------------------------------------------------- 21. TRISENTRA */
  {
    const s = baseSlide(pres, { bg: C.bg }); decor(s);
    heading(s, 'Ekosistem Pendidikan', 'Trisentra: Tiga Pusat yang Harus Sejalan');
    const tri = [
      ['Keluarga', 'Pengasuhan positif, gizi seimbang di rumah, dan kesinambungan stimulasi setelah jam sekolah.', C.orange, 'FaHome'],
      ['Satuan PAUD', 'Pembelajaran bermakna, pemantauan tumbuh kembang, dan penghubung seluruh layanan esensial.', C.blue, 'FaSchool'],
      ['Masyarakat', 'Posyandu, puskesmas, desa, dan dunia usaha yang menopang kebutuhan anak di luar sekolah.', C.green, 'FaUsers']
    ];
    const cw = (SW - M * 2 - 0.3 * 2) / 3;
    for (let i = 0; i < 3; i++) {
      const [t, d, col, ic] = tri[i];
      const x = M + i * (cw + 0.3);
      card(s, { x, y: 1.64, w: cw, h: 2.06 });
      await iconBadge(s, { x: x + 0.28, y: y0(), d: 0.7, bg: col, icon: ic });
      function y0() { return 1.88; }
      s.addText(t, { x: x + 1.12, y: 1.86, w: cw - 1.3, h: 0.4, fontFace: F, fontSize: 17, bold: true, color: col, margin: 0 });
      s.addText(d, { x: x + 0.3, y: 2.7, w: cw - 0.6, h: 0.9, fontFace: F, fontSize: 11.5, color: C.body, margin: 0, valign: 'top' });
    }
    const rr = await ratio('trisentra'); const iw = 9.2, ih = iw / rr;
    s.addImage({ data: await art('trisentra'), x: (SW - iw) / 2, y: 3.8, w: iw, h: ih });
    s.addText('Iklim partisipatif tumbuh saat ketiganya bergerak dengan informasi dan tujuan yang sama.',
      { x: M, y: 6.62, w: 9, h: 0.3, fontFace: F, fontSize: 11.5, italic: true, color: C.body, margin: 0 });
    footer(s);
    s.addNotes('Trisentra: keluarga, satuan pendidikan, masyarakat. Semuanya perlu informasi yang sama.');
  }

  /* --------------------------------------------- 22. TAHAP KEMITRAAN */
  {
    const s = baseSlide(pres); decor(s, C.orangeL);
    heading(s, 'Langkah Praktis', 'Lima Tahap Membangun Kemitraan', C.orange);
    const steps = [
      ['Identifikasi & Pemetaan', 'Petakan kebutuhan anak dari data 8 indikator, lalu daftar calon mitra yang relevan.', C.blue, 'FaSearch'],
      ['Inisiasi & Komunikasi', 'Audiensi ke puskesmas, desa, dan dinas. Bawa data, bukan sekadar permohonan.', C.green, 'FaComments'],
      ['Kesepakatan', 'Tuangkan dalam PKS/MoU sederhana: siapa, melakukan apa, kapan, dan dengan sumber daya apa.', C.orange, 'FaFileSignature'],
      ['Pelaksanaan', 'Jalankan lewat kalender kegiatan terpadu agar tidak bertabrakan dengan agenda belajar.', C.purple, 'FaCogs'],
      ['Evaluasi & Keberlanjutan', 'Refleksi bersama, laporkan hasil, apresiasi mitra, lalu perluas cakupan.', C.teal, 'FaSyncAlt']
    ];
    const cw = (SW - M * 2 - 0.22 * 4) / 5;
    for (let i = 0; i < 5; i++) {
      const [t, d, col, ic] = steps[i];
      const x = M + i * (cw + 0.22);
      card(s, { x, y: 1.9, w: cw, h: 3.0 });
      s.addShape('ellipse', { x: x + cw / 2 - 0.4, y: 1.58, w: 0.8, h: 0.8, fill: { color: col }, line: { color: C.white, width: 3 } });
      s.addText(String(i + 1), { x: x + cw / 2 - 0.4, y: 1.58, w: 0.8, h: 0.8, fontFace: F, fontSize: 24, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
      s.addImage({ data: await icon(ic, '#' + col), x: x + cw / 2 - 0.28, y: 2.6, w: 0.56, h: 0.56 });
      s.addText(t, { x: x + 0.18, y: 3.3, w: cw - 0.36, h: 0.6, fontFace: F, fontSize: 13, bold: true, color: C.ink, align: 'center', margin: 0, valign: 'top' });
      s.addText(d, { x: x + 0.2, y: 3.92, w: cw - 0.4, h: 0.94, fontFace: F, fontSize: 10.5, color: C.body, align: 'center', margin: 0, valign: 'top' });
      if (i < 4) s.addShape('rightArrow', { x: x + cw + 0.02, y: 3.24, w: 0.18, h: 0.22, fill: { color: C.blueM } });
    }
    card(s, { x: M, y: 5.16, w: SW - M * 2, h: 1.06, fill: C.orangeL, line: C.orangeM });
    s.addText('Kunci tahap 3: kesepakatan tertulis. Satu lembar PKS membuat kemitraan tetap berjalan meski kepala satuan, kepala puskesmas, atau kepala desa berganti.',
      { x: M + 0.36, y: 5.34, w: SW - M * 2 - 0.72, h: 0.72, fontFace: F, fontSize: 12.5, color: C.ink, margin: 0, valign: 'middle' });
    footer(s);
    s.addNotes('Tekankan: datang membawa data membuat mitra lebih mudah menyetujui kerja sama.');
  }

  /* ------------------------------------------------- 23. INSTRUMEN */
  {
    const s = baseSlide(pres, { bg: C.bg }); decor(s);
    heading(s, 'Perangkat', 'Instrumen dan Sumber Daya Kemitraan');
    s.addText('INSTRUMEN KERJA SAMA', { x: M + 0.02, y: 1.6, w: 5.6, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: C.blue, charSpacing: 1.5, margin: 0 });
    const instr = [
      ['Perjanjian Kerja Sama / MoU', 'Cukup satu halaman: ruang lingkup, peran, jadwal, dan penanggung jawab.', 'FaFileSignature'],
      ['Forum Koordinasi PAUD HI', 'Pertemuan rutin tingkat desa atau kecamatan bersama seluruh mitra.', 'FaUsersCog'],
      ['Kalender Kegiatan Terpadu', 'Satu kalender bersama: posyandu, kelas orang tua, pemeriksaan, dan PMT.', 'FaCalendarAlt'],
      ['Data & Pelaporan Bersama', 'Dapodik dan catatan tumbuh kembang sebagai rujukan yang sama bagi semua pihak.', 'FaClipboardCheck']
    ];
    let y = 1.94;
    for (const [t, d, ic] of instr) {
      card(s, { x: M, y, w: 5.9, h: 1.0 });
      await iconBadge(s, { x: M + 0.24, y: y + 0.2, d: 0.6, bg: C.blue, icon: ic });
      s.addText(t, { x: M + 0.98, y: y + 0.14, w: 4.7, h: 0.32, fontFace: F, fontSize: 13, bold: true, color: C.ink, margin: 0 });
      s.addText(d, { x: M + 0.98, y: y + 0.46, w: 4.74, h: 0.48, fontFace: F, fontSize: 11, color: C.body, margin: 0, valign: 'top' });
      y += 1.1;
    }
    s.addText('SUMBER PEMBIAYAAN', { x: 6.94, y: 1.6, w: 5.6, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: C.green, charSpacing: 1.5, margin: 0 });
    const dana = [
      ['BOP PAUD', 'Pembelian bahan PMT, alat kebersihan, dan penguatan kapasitas pendidik.', 'FaMoneyBillWave'],
      ['Dana Desa / ADD', 'Pembangunan sarana sanitasi, air bersih, dan ruang bermain ramah anak.', 'FaCity'],
      ['CSR & Mitra Pembangunan', 'Buku, alat main edukatif, wastafel, dan pelatihan bagi pendidik.', 'FaBriefcase'],
      ['Swadaya & Gotong Royong', 'Tenaga, bahan lokal, dan kebun gizi yang dikelola bersama orang tua.', 'FaHandsHelping']
    ];
    y = 1.94;
    for (const [t, d, ic] of dana) {
      card(s, { x: 6.94, y, w: SW - M - 6.94, h: 1.0 });
      await iconBadge(s, { x: 7.18, y: y + 0.2, d: 0.6, bg: C.green, icon: ic });
      s.addText(t, { x: 7.92, y: y + 0.14, w: 4.5, h: 0.32, fontFace: F, fontSize: 13, bold: true, color: C.ink, margin: 0 });
      s.addText(d, { x: 7.92, y: y + 0.46, w: 4.5, h: 0.48, fontFace: F, fontSize: 11, color: C.body, margin: 0, valign: 'top' });
      y += 1.1;
    }
    s.addText('Prinsipnya: mulai dari yang tersedia. Banyak perbaikan layanan tidak memerlukan anggaran baru, melainkan koordinasi yang lebih baik.',
      { x: M, y: 6.34, w: SW - M * 2, h: 0.4, fontFace: F, fontSize: 12.5, bold: true, color: C.ink, align: 'center', margin: 0 });
    footer(s);
    s.addNotes('Ingatkan aturan penggunaan setiap sumber dana tetap mengikuti juknis yang berlaku.');
  }

  /* ----------------------------------------------------- 24. DIVIDER 4 */
  await sectionSlide(pres, '04', 'Praktik Baik dan Aksi Nyata',
    'Pembelajaran dari satuan PAUD, strategi peningkatan mutu, rencana 30–60–90 hari, serta monitoring dan evaluasi.',
    'gotongroyong', { bg: C.purple });

  /* ---------------------------------------------- 25. PRAKTIK BAIK */
  {
    const s = baseSlide(pres); decor(s, C.purpleL);
    heading(s, 'Belajar dari Lapangan', 'Empat Pola Praktik Baik yang Bisa Ditiru', C.purple);
    const cases = [
      ['Posyandu Masuk Satuan PAUD', 'Jadwal bulanan bersama kader: penimbangan, pengukuran, dan pencatatan dilakukan di sekolah sehingga tidak ada anak yang terlewat.', 'posyandu', C.teal],
      ['Kelas Orang Tua Rutin', 'Parenting bulanan bersama bidan atau petugas puskesmas membuat stimulasi di rumah berjalan sejalan dengan di sekolah.', 'parenting', C.purple],
      ['Gotong Royong Sanitasi', 'Dana desa dipadukan dengan swadaya wali murid untuk membangun wastafel dan sumber air bersih sederhana.', 'gotongroyong', C.blue],
      ['Makan Bergizi Bersama', 'Menu bahan lokal disiapkan bergilir oleh orang tua, dilengkapi kebun gizi sekolah dan pembiasaan PHBS.', 'gizi', C.green]
    ];
    const cw = 2.84;
    for (let i = 0; i < 4; i++) {
      const [t, d, scene, col] = cases[i];
      const x = M + i * (cw + 0.24);
      card(s, { x, y: 1.62, w: cw, h: 3.62 });
      const rr = await ratio(scene);
      let ih = 1.4, iw = ih * rr;
      if (iw > cw - 0.3) { iw = cw - 0.3; ih = iw / rr; }
      s.addImage({ data: await art(scene), x: x + (cw - iw) / 2, y: 1.76, w: iw, h: ih });
      s.addShape('roundRect', { x: x + 0.15, y: 3.2, w: 0.62, h: 0.28, rectRadius: 0.14, fill: { color: col } });
      s.addText(String(i + 1).padStart(2, '0'), { x: x + 0.15, y: 3.2, w: 0.62, h: 0.28, fontFace: F, fontSize: 11, bold: true, color: C.white, align: 'center', margin: 0 });
      s.addText(t, { x: x + 0.2, y: 3.54, w: cw - 0.4, h: 0.56, fontFace: F, fontSize: 13, bold: true, color: C.ink, margin: 0, valign: 'top' });
      s.addText(d, { x: x + 0.2, y: 4.12, w: cw - 0.4, h: 1.06, fontFace: F, fontSize: 10.5, color: C.body, margin: 0, valign: 'top' });
    }
    card(s, { x: M, y: 5.42, w: SW - M * 2, h: 1.22, fill: C.purpleL, line: 'DED4F2' });
    s.addText('FAKTOR KUNCI KEBERHASILAN', { x: M + 0.34, y: 5.54, w: 4, h: 0.28, fontFace: F, fontSize: 10.5, bold: true, color: C.purple, charSpacing: 1.4, margin: 0 });
    const keys = [['Komitmen pimpinan satuan', 'FaMedal'], ['Data sebagai dasar ajakan', 'FaChartBar'], ['Komunikasi rutin dengan mitra', 'FaComments'], ['Dokumentasi & apresiasi', 'FaTrophy']];
    const kwid = (SW - M * 2 - 0.68) / 4;
    for (let i = 0; i < keys.length; i++) {
      const kx = M + 0.34 + i * kwid;
      s.addImage({ data: await icon(keys[i][1], '#' + C.purple), x: kx, y: 5.94, w: 0.26, h: 0.26 });
      s.addText(keys[i][0], { x: kx + 0.34, y: 5.88, w: kwid - 0.42, h: 0.4, fontFace: F, fontSize: 11, color: C.ink, margin: 0, valign: 'middle' });
    }
    footer(s);
    s.addNotes('Minta peserta memilih satu pola yang paling mungkin dijalankan di satuannya bulan ini.');
  }

  /* ------------------------------------------------- 26. STRATEGI */
  {
    const s = baseSlide(pres, { bg: C.bg }); decor(s);
    heading(s, 'Strategi', 'Enam Strategi Peningkatan Mutu Layanan');
    const st = [
      ['Perkuat kepemimpinan & tata kelola', 'Kepala satuan memimpin perencanaan berbasis data dan refleksi berkala bersama pendidik.', C.blue, 'FaMedal'],
      ['Jadikan data sebagai dasar', 'Gunakan Dapodik dan capaian 8 indikator untuk menentukan prioritas perbaikan.', C.green, 'FaChartLine'],
      ['Bangun kemitraan berbasis kebutuhan', 'Pilih mitra sesuai indikator yang paling tertinggal, bukan sekadar yang mudah dihubungi.', C.orange, 'FaHandshake'],
      ['Kuatkan kapasitas pendidik', 'Pendidik sebagai penghubung PAUD HI perlu pelatihan, pendampingan, dan kesejahteraan.', C.purple, 'FaChalkboardTeacher'],
      ['Lengkapi layanan & sarana esensial', 'Prioritaskan sanitasi, air bersih, dan lingkungan bermain yang aman serta inklusif.', C.teal, 'FaFaucet'],
      ['Libatkan orang tua sebagai mitra', 'Kelas orang tua yang konsisten menjaga kesinambungan stimulasi di rumah.', C.red, 'FaUserFriends']
    ];
    const cw = 3.83, chh = 1.42;
    for (let i = 0; i < 6; i++) {
      const [t, d, col, ic] = st[i];
      const x = M + (i % 3) * (cw + 0.3), y = 1.66 + Math.floor(i / 3) * (chh + 0.3);
      card(s, { x, y, w: cw, h: chh });
      await iconBadge(s, { x: x + 0.26, y: y + 0.3, d: 0.64, bg: col, icon: ic });
      s.addText(t, { x: x + 1.02, y: y + 0.22, w: cw - 1.24, h: 0.4, fontFace: F, fontSize: 13, bold: true, color: C.ink, margin: 0, valign: 'top' });
      s.addText(d, { x: x + 1.02, y: y + 0.64, w: cw - 1.26, h: 0.66, fontFace: F, fontSize: 11, color: C.body, margin: 0, valign: 'top' });
      s.addText(String(i + 1).padStart(2, '0'), { x: x + cw - 0.72, y: y + chh - 0.5, w: 0.5, h: 0.36, fontFace: F, fontSize: 16, bold: true, color: col, transparency: 70, align: 'right', margin: 0 });
    }
    const rr = await ratio('sekolahband'); const iw = 9.8, ih = iw / rr;
    s.addImage({ data: await art('sekolahband'), x: (SW - iw) / 2, y: 4.86, w: iw, h: ih });
    footer(s);
    s.addNotes('Enam strategi ini saling menopang; mulai dari yang paling mungkin dikerjakan lebih dulu.');
  }

  /* ---------------------------------------------- 27. RENCANA AKSI */
  {
    const s = baseSlide(pres); decor(s, C.blueL);
    heading(s, 'Rencana Aksi', 'Peta 30 – 60 – 90 Hari untuk Satuan PAUD');
    const phases = [
      ['30 HARI', 'Menyiapkan', [
        'Bentuk tim kecil PAUD HI di satuan.',
        'Verifikasi capaian 8 indikator pada Dapodik.',
        'Petakan kebutuhan anak dan calon mitra.',
        'Susun daftar kontak penanggung jawab mitra.'
      ], C.blue, 'FaSearch'],
      ['60 HARI', 'Menyepakati', [
        'Audiensi ke puskesmas, desa, dan dinas terkait.',
        'Tandatangani PKS/MoU sederhana dengan mitra.',
        'Susun kalender kegiatan terpadu satu semester.',
        'Selenggarakan kelas orang tua perdana.'
      ], C.orange, 'FaFileSignature'],
      ['90 HARI', 'Menjalankan & Menilai', [
        'Jalankan posyandu dan pemeriksaan terjadwal.',
        'Dokumentasikan kegiatan dan perbarui data.',
        'Refleksi bersama mitra dan orang tua.',
        'Perluas kemitraan ke indikator yang tertinggal.'
      ], C.green, 'FaFlagCheckered']
    ];
    const cw = (SW - M * 2 - 0.34 * 2) / 3;
    for (let i = 0; i < 3; i++) {
      const [ph, sub, items, col, ic] = phases[i];
      const x = M + i * (cw + 0.34);
      card(s, { x, y: 1.72, w: cw, h: 4.4 });
      s.addShape('roundRect', { x, y: 1.72, w: cw, h: 0.94, rectRadius: 0.14, fill: { color: col }, line: { width: 0 } });
      s.addShape('rect', { x, y: 2.36, w: cw, h: 0.3, fill: { color: col }, line: { width: 0 } });
      s.addImage({ data: await icon(ic, '#FFFFFF'), x: x + 0.28, y: 1.98, w: 0.42, h: 0.42 });
      s.addText(ph, { x: x + 0.86, y: 1.9, w: cw - 1.1, h: 0.34, fontFace: F, fontSize: 18, bold: true, color: C.white, margin: 0 });
      s.addText(sub, { x: x + 0.86, y: 2.24, w: cw - 1.1, h: 0.3, fontFace: F, fontSize: 11.5, color: C.white, transparency: 15, margin: 0 });
      bullet(s, items, { x: x + 0.3, y: 2.88, w: cw - 0.6, h: 3.0, size: 11.5 });
    }
    s.addText('Tempelkan lembar ini di ruang guru. Rencana yang terlihat setiap hari jauh lebih mungkin dijalankan.',
      { x: M, y: 6.32, w: SW - M * 2, h: 0.4, fontFace: F, fontSize: 12.5, bold: true, color: C.ink, align: 'center', margin: 0 });
    footer(s);
    s.addNotes('Dorong setiap satuan menetapkan tanggal dan nama penanggung jawab untuk setiap butir.');
  }

  /* ------------------------------------------------ 28. AKSI NYATA */
  {
    const s = baseSlide(pres, { bg: C.bg }); decor(s, C.greenL);
    heading(s, 'Aksi Nyata', 'Lembar Cek Aksi di Satuan PAUD', C.green);
    const acts = [
      'Menyelenggarakan kelas orang tua minimal satu kali per semester.',
      'Memantau pertumbuhan anak: berat badan, tinggi badan, dan lingkar kepala.',
      'Memantau perkembangan anak dengan DDTK/KPSP/KMS/KIA/KKA.',
      'Berkoordinasi dengan puskesmas dan posyandu secara terjadwal.',
      'Membiasakan PHBS: cuci tangan, sikat gigi, dan kebersihan diri.',
      'Memberikan PMT atau makanan bergizi minimal tiga bulan sekali.',
      'Memastikan seluruh peserta didik memiliki NIK.',
      'Menyediakan fasilitas sanitasi dan air bersih yang mengalir.'
    ];
    const cw = 5.9, chh = 0.72;
    for (let i = 0; i < 8; i++) {
      const x = M + (i % 2) * (cw + 0.3), y = 1.66 + Math.floor(i / 2) * (chh + 0.18);
      card(s, { x, y, w: cw, h: chh, fill: i % 2 === 0 ? C.white : C.white });
      s.addShape('roundRect', { x: x + 0.24, y: y + 0.18, w: 0.36, h: 0.36, rectRadius: 0.08, fill: { color: C.greenL }, line: { color: C.green, width: 1.4 } });
      s.addImage({ data: await icon('FaCheck', '#' + C.green), x: x + 0.31, y: y + 0.25, w: 0.22, h: 0.22 });
      s.addText(acts[i], { x: x + 0.74, y: y + 0.06, w: cw - 0.96, h: chh - 0.12, fontFace: F, fontSize: 11.5, color: C.ink, margin: 0, valign: 'middle' });
    }
    card(s, { x: M, y: 5.32, w: 7.9, h: 1.16, fill: C.greenL, line: C.greenM });
    s.addText('Mulai dari satu', { x: M + 0.34, y: 5.46, w: 3, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: C.greenD, margin: 0 });
    s.addText('Pilih satu indikator yang paling tertinggal di satuan Anda, tetapkan penanggung jawabnya, dan tentukan tanggal pelaksanaannya sebelum meninggalkan ruangan ini.',
      { x: M + 0.34, y: 5.78, w: 7.24, h: 0.62, fontFace: F, fontSize: 12, color: C.body, margin: 0, valign: 'top' });
    const rr = await ratio('praktikbaik'); const ih = 1.46, iw = ih * rr;
    s.addImage({ data: await art('praktikbaik'), x: SW - M - iw, y: 5.36, w: iw, h: ih });
    footer(s);
    s.addNotes('Lembar ini sejajar dengan 8 indikator PAUD HI sehingga langsung terhubung ke pelaporan Dapodik.');
  }

  /* ------------------------------------------------------- 29. MONEV */
  {
    const s = baseSlide(pres); decor(s);
    heading(s, 'Menjaga Mutu', 'Monitoring, Evaluasi, dan Perbaikan');
    const cyc = [
      ['Rencanakan', 'Tetapkan target indikator dan mitra yang dilibatkan.', C.blue, 'FaTasks'],
      ['Laksanakan', 'Jalankan kegiatan sesuai kalender terpadu.', C.orange, 'FaPlay'],
      ['Pantau', 'Catat kehadiran, hasil pemeriksaan, dan hambatan.', C.green, 'FaEye'],
      ['Perbaiki', 'Refleksi bersama, sesuaikan rencana berikutnya.', C.purple, 'FaSyncAlt']
    ];
    const cw = 2.86;
    for (let i = 0; i < 4; i++) {
      const [t, d, col, ic] = cyc[i];
      const x = M + i * (cw + 0.22);
      card(s, { x, y: 1.66, w: cw, h: 1.94 });
      await iconBadge(s, { x: x + 0.24, y: 1.88, d: 0.6, bg: col, icon: ic });
      s.addText(t, { x: x + 0.98, y: 1.92, w: cw - 1.2, h: 0.34, fontFace: F, fontSize: 14, bold: true, color: col, margin: 0 });
      s.addText(d, { x: x + 0.24, y: 2.62, w: cw - 0.48, h: 0.84, fontFace: F, fontSize: 11, color: C.body, margin: 0, valign: 'top' });
      if (i < 3) s.addShape('rightArrow', { x: x + cw + 0.02, y: 2.5, w: 0.18, h: 0.22, fill: { color: C.blueM } });
    }
    s.addText('INDIKATOR KEBERHASILAN KEMITRAAN', { x: M + 0.02, y: 3.86, w: 8, h: 0.3, fontFace: F, fontSize: 11, bold: true, color: C.blue, charSpacing: 1.5, margin: 0 });
    const kpi = [
      ['Jumlah indikator PAUD HI terpenuhi', 'Target minimal 6 dari 8 indikator, menuju 8 dari 8.', C.green],
      ['Jumlah mitra aktif dengan kesepakatan', 'Minimal tiga mitra memiliki PKS/MoU yang berjalan.', C.blue],
      ['Keterlibatan orang tua', 'Kehadiran kelas orang tua meningkat setiap semester.', C.orange],
      ['Ketepatan data Dapodik', 'Capaian PAUD HI diperbarui tepat waktu setiap semester.', C.purple]
    ];
    const kw = 2.86;
    for (let i = 0; i < 4; i++) {
      const [t, d, col] = kpi[i];
      const x = M + i * (kw + 0.22);
      card(s, { x, y: 4.2, w: kw, h: 1.66, fill: C.bg, line: C.line });
      s.addShape('ellipse', { x: x + 0.24, y: 4.4, w: 0.34, h: 0.34, fill: { color: col } });
      s.addText(String(i + 1), { x: x + 0.24, y: 4.4, w: 0.34, h: 0.34, fontFace: F, fontSize: 12, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
      s.addText(t, { x: x + 0.24, y: 4.84, w: kw - 0.48, h: 0.5, fontFace: F, fontSize: 12, bold: true, color: C.ink, margin: 0, valign: 'top' });
      s.addText(d, { x: x + 0.24, y: 5.32, w: kw - 0.48, h: 0.5, fontFace: F, fontSize: 10.5, color: C.body, margin: 0, valign: 'top' });
    }
    card(s, { x: M, y: 6.0, w: SW - M * 2, h: 0.72, fill: C.blueL, line: C.blueM });
    s.addText('Monitoring bukan mencari kesalahan, melainkan menjaga agar layanan yang sudah baik tidak berhenti di tengah jalan.',
      { x: M + 0.34, y: 6.06, w: SW - M * 2 - 0.68, h: 0.6, fontFace: F, fontSize: 12.5, color: C.ink, align: 'center', margin: 0, valign: 'middle' });
    footer(s);
    s.addNotes('Sarankan satu format sederhana: satu halaman per semester berisi target, realisasi, dan tindak lanjut.');
  }

  /* ------------------------------------------------------ 30. PENUTUP */
  {
    const s = baseSlide(pres, { bg: C.blueXD });
    const rr = await ratio('perayaan'); const iw = SW, ih = iw / rr;
    s.addImage({ data: await art('perayaan'), x: 0, y: SH - ih, w: iw, h: ih });
    s.addShape('ellipse', { x: 9.0, y: -1.8, w: 6.0, h: 6.0, fill: { color: C.green, transparency: 62 } });
    s.addShape('ellipse', { x: -1.8, y: 1.6, w: 3.6, h: 3.6, fill: { color: C.orange, transparency: 68 } });
    s.addText('Mari Wujudkan Bersama', { x: M, y: 0.6, w: 9, h: 0.42, fontFace: F, fontSize: 14, bold: true, color: C.orangeM, charSpacing: 1, margin: 0 });
    s.addText('Anak Indonesia Tumbuh Utuh,\nLayanan PAUD Bermutu', {
      x: M, y: 1.02, w: 9.6, h: 1.44, fontFace: F, fontSize: 34, bold: true, color: C.white, lineSpacing: 40, margin: 0
    });
    s.addText('Kemitraan strategis bukan menambah pekerjaan satuan PAUD — ia membagi beban, memperluas dukungan, dan memastikan tidak ada satu pun kebutuhan anak yang terlewat.',
      { x: M, y: 2.5, w: 8.4, h: 0.72, fontFace: F, fontSize: 13.5, color: C.blueM, margin: 0, valign: 'top' });
    const cta = [['Petakan mitra minggu ini', C.orange], ['Mulai dari satu indikator', C.green], ['Catat, laporkan, apresiasi', C.teal]];
    let cx = M;
    for (const [t, col] of cta) {
      const w = 0.34 + t.length * 0.098;
      s.addShape('roundRect', { x: cx, y: 3.28, w, h: 0.44, rectRadius: 0.22, fill: { color: col } });
      s.addText(t, { x: cx, y: 3.28, w, h: 0.44, fontFace: F, fontSize: 11.5, bold: true, color: C.white, align: 'center', margin: 0 });
      cx += w + 0.18;
    }
    s.addText('Terima kasih', { x: M, y: 3.8, w: 6, h: 0.5, fontFace: F, fontSize: 24, bold: true, color: C.white, margin: 0 });
    PAGE++;
    s.addNotes('Tutup dengan ajakan konkret: satu indikator, satu mitra, satu tanggal.');
  }

  await pres.writeFile({ fileName: '../Kemitraan_Strategis_PAUD_HI.pptx' });
  console.log('Selesai — total slide:', PAGE);
})();
