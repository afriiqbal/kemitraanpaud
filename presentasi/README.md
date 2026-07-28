# Deck: Penguatan Kemitraan Strategis dan PAUD Holistik Integratif (PAUD HI)

Presentasi 30 slide bertema **“Penguatan Kemitraan Strategis dan PAUD Holistik Integratif (PAUD HI)
dalam Meningkatkan Mutu Layanan PAUD.”**

File siap pakai: [`Kemitraan_Strategis_PAUD_HI.pptx`](Kemitraan_Strategis_PAUD_HI.pptx) (16:9, 13,33" × 7,5").

## Struktur

| Bagian | Slide | Isi |
|---|---|---|
| Pembuka | 1–4 | Sampul, peta perjalanan, tujuan sesi, refleksi pembuka |
| 01 | 5–8 | Potret nasional layanan PAUD, urgensi usia dini, empat tantangan |
| 02 | 9–16 | Definisi PAUD HI, lima layanan esensial, empat prinsip, kerangka regulasi, miskonsepsi vs fakta, delapan indikator, capaian nasional |
| 03 | 17–23 | Konsep kemitraan strategis, peta pemangku kepentingan, peran mitra, trisentra, lima tahap membangun kemitraan, instrumen & pembiayaan |
| 04 | 24–30 | Praktik baik, enam strategi mutu, rencana 30–60–90 hari, lembar cek aksi, monitoring & evaluasi, penutup |

Setiap slide dilengkapi catatan pembicara (speaker notes).

## Sumber data

Angka capaian pada slide 6 dan 16 mengacu pada Dapodik, *cut off* 31 Desember 2025
(206.708 satuan PAUD) sebagaimana dipaparkan Direktorat Pendidikan Anak Usia Dini.
Rujukan regulasi: UU No. 20/2003, Perpres No. 60/2013, Permenko PMK No. 1/2019,
Perpres No. 72/2021, dan RAN PAUD HI Bidang Pendidikan.

## Desain

- Palet biru (`1E76C8`) sebagai warna dominan, didukung hijau (`2FA36B`), oranye (`F5871F`), dan putih.
- Motif berulang: kartu sudut membulat dengan bayangan lembut dan ikon di dalam lingkaran berwarna.
- Seluruh ilustrasi dibangun sebagai vektor flat modern di `generator/lib/illus.js` — anak PAUD,
  guru, orang tua, kader posyandu, tenaga kesehatan, Bunda PAUD, rapat kemitraan, gotong royong,
  makan bergizi, parenting, dan lingkungan sekolah ramah anak. Tidak ada foto.
- Ikon flat berasal dari `react-icons` yang dirender menjadi PNG pada warna palet.

## Membangun ulang

```bash
cd generator
npm install
npm run build      # menghasilkan Kemitraan_Strategis_PAUD_HI.pptx
npm run preview    # merender seluruh ilustrasi ke out/ untuk pemeriksaan visual
```

`build.js` memuat isi dan tata letak setiap slide; `lib/illus.js` memuat pustaka ilustrasi;
`lib/icons.js` merender ikon. Ubah teks atau warna di berkas tersebut lalu jalankan ulang `npm run build`.
