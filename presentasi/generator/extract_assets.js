/* Menyiapkan aset gambar deck dari dua berkas referensi Direktorat PAUD.
   A = "2. Kebijakan Program PAUDHI Tahun 2026"
   B = "Kebijakan Program PAUD HI di Kemendikdasmen"
   Jalankan: node extract_assets.js <refA.pptx> <refB.pptx> <folder-tujuan> */
const fs = require('fs');
const path = require('path');

const sharp = require('sharp');
const { execFileSync } = require('child_process');

const [, , refA, refB, outDir] = process.argv;
if (!refA || !refB || !outDir) { console.error('usage: node extract_assets.js refA.pptx refB.pptx outDir'); process.exit(1); }

const tmp = fs.mkdtempSync('/tmp/paudhi-assets-');
function unpack(pptx, tag) {
  const dir = path.join(tmp, tag);
  fs.mkdirSync(dir, { recursive: true });
  execFileSync('python3', ['-c', `
import zipfile,sys,os
z=zipfile.ZipFile(sys.argv[1])
for n in z.namelist():
    if n.startswith('ppt/media'):
        open(os.path.join(sys.argv[2], n.split('/')[-1]),'wb').write(z.read(n))
`, pptx, dir]);
  return dir;
}
const A = unpack(refA, 'a'), B = unpack(refB, 'b');

/* nama → [sumber, berkas, crop {left,top,width,height} | null, catatan] */
const PLAN = [
  ['cover_guru_anak', B, 'image33.png', { left: 40, top: 250, width: 1500, height: 1150 }, 'Guru dan anak PAUD dengan bendera'],
  ['halaman_paud', B, 'image27.png', null, 'Halaman satuan PAUD inklusif'],
  ['terima_kasih', B, 'image32.png', { left: 300, top: 150, width: 1380, height: 880 }, 'Anak membaca buku — penutup'],
  ['roda_8indikator', B, 'image25.png', null, 'Roda 8 indikator PAUD HI'],
  ['roda_puzzle', B, 'image9.png', null, 'Roda puzzle 8 segmen'],
  ['badge_pembelajaran', B, 'image5.png', null, 'Elemen: pembelajaran yang berkualitas'],
  ['badge_kemitraan', B, 'image3.png', null, 'Elemen: kemitraan orang tua'],
  ['badge_esensial', B, 'image6.png', null, 'Elemen: dukungan kebutuhan esensial AUD'],
  ['badge_kepemimpinan', B, 'image18.png', null, 'Elemen: kepemimpinan & perbaikan berkelanjutan'],
  ['seri_panduan', B, 'image29.png', null, 'Seri panduan PAUD berkualitas'],
  ['buku_panduan', B, 'image28.png', null, 'Panduan penyelenggaraan PAUD berkualitas'],

  ['roda_lintas_kl', A, 'image19.png', null, 'Roda puzzle lintas kementerian/lembaga'],
  ['guru_mengajar', A, 'image26.png', { left: 180, top: 388, width: 395, height: 357 }, 'Guru mendampingi anak belajar'],
  ['anak_bermain', A, 'image26.png', { left: 730, top: 548, width: 470, height: 197 }, 'Anak bermain balok dan roket'],
  ['guru_membaca', A, 'image23.png', { left: 645, top: 30, width: 605, height: 235 }, 'Guru membacakan buku'],
  ['simbol_regulasi', A, 'image23.png', { left: 20, top: 508, width: 375, height: 252 }, 'Buku, palu sidang, dan timbangan'],
  ['anak_balok', A, 'image25.png', { left: 10, top: 655, width: 375, height: 285 }, 'Anak menyusun balok'],
  ['anak_melambai', A, 'image42.png', { left: 1155, top: 495, width: 440, height: 440 }, 'Dua anak melambai'],
  ['gedung_paud', A, 'image42.png', { left: 0, top: 540, width: 340, height: 400 }, 'Gedung PAUD dan balok'],
  ['anak_tas', A, 'image36.png', { left: 0, top: 392, width: 250, height: 376 }, 'Anak dengan tas sekolah'],
  ['roda_paudhi', A, 'image36.png', { left: 598, top: 20, width: 612, height: 620 }, 'Roda PAUD HI: holistik integratif'],
  ['anak_buku', A, 'image36.png', { left: 1148, top: 368, width: 217, height: 392 }, 'Anak membawa buku'],
  ['tabel_capaian', A, 'image43.jpg', { left: 40, top: 65, width: 1970, height: 1030 }, 'Tabel capaian indikator baseline vs 2025'],
  ['grafik_indikator', A, 'image34.png', null, 'Grafik batang pemenuhan indikator'],
  ['bubble_refleksi', A, 'image11.png', null, 'Balon pertanyaan refleksi'],
  ['strategi_direktorat', A, 'image41.jpg', null, 'Strategi percepatan pemenuhan indikator'],
  ['foto_anak_kelas', A, 'image45.jpg', null, 'Anak bermain balok di kelas'],
  ['foto_anak_kebun', A, 'image39.jpg', null, 'Anak PAUD di luar ruang'],
  ['foto_layanan', A, 'image22.png', null, 'Dokumentasi layanan kesehatan dan posyandu']
];

/* Foto disimpan sebagai JPEG, ilustrasi sebagai PNG terkuantisasi.
   Sisi terpanjang dibatasi agar berkas deck tetap ringan. */
const FOTO = new Set(['foto_anak_kelas', 'foto_anak_kebun', 'foto_layanan', 'tabel_capaian', 'strategi_direktorat']);
const MAX_SIDE = 1200;

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const manifest = [];
  let total = 0;
  for (const [name, dir, file, crop, note] of PLAN) {
    const src = path.join(dir, file);
    if (!fs.existsSync(src)) { console.warn('LEWAT (tidak ada):', file); continue; }
    let img = sharp(src);
    const meta = await img.metadata();
    if (crop) {
      const c = {
        left: Math.max(0, crop.left), top: Math.max(0, crop.top),
        width: Math.min(crop.width, meta.width - crop.left),
        height: Math.min(crop.height, meta.height - crop.top)
      };
      img = img.extract(c);
    }
    if (name.startsWith('badge_')) img = img.trim({ threshold: 12 });
    img = img.resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true });
    const isFoto = FOTO.has(name);
    const out = path.join(outDir, name + (isFoto ? '.jpg' : '.png'));
    if (isFoto) await img.flatten({ background: '#ffffff' }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
    else await img.png({ compressionLevel: 9, palette: true, quality: 88 }).toFile(out);
    const m2 = await sharp(out).metadata();
    const kb = Math.round(fs.statSync(out).size / 1024); total += kb;
    manifest.push({ name, sumber: dir === A ? 'A' : 'B', berkas: file, ukuran: `${m2.width}x${m2.height}`, berkas_keluaran: path.basename(out), kb, catatan: note });
    console.log(name.padEnd(22), `${m2.width}x${m2.height}`.padEnd(11), `${kb}KB`.padStart(7), note);
  }
  fs.writeFileSync(path.join(outDir, 'MANIFEST.json'), JSON.stringify(manifest, null, 2));
  console.log('TOTAL', Math.round(total / 1024 * 10) / 10, 'MB');
})();
