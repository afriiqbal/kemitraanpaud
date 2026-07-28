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

## Gambar

**Seluruh gambar diambil dari dua berkas referensi Direktorat PAUD** yang disediakan, bukan
ilustrasi buatan baru:

- **A** — `2. Kebijakan Program PAUDHI Tahun 2026.pptx`
- **B** — `Kebijakan Program PAUD HI di Kemendikdasmen.pptx`

Aset hasil ekstraksi tersimpan di [`assets/`](assets) beserta
[`assets/MANIFEST.json`](assets/MANIFEST.json) yang mencatat berkas sumber, area potongan,
ukuran, dan keterangan setiap gambar. Sebagian aset dipotong dari slide sumber agar hanya
memuat ilustrasinya (tanpa teks bawaan slide), lalu dikecilkan ke sisi terpanjang 1200 px —
foto disimpan sebagai JPEG, ilustrasi sebagai PNG.

Ikon antarmuka (lingkaran berwarna pada kartu) dirender dari `react-icons`; ini elemen tata
letak, bukan ilustrasi tokoh.

## Sumber data

Angka capaian pada slide 6 dan 16 mengacu pada Dapodik, *cut off* 31 Desember 2025
(206.708 satuan PAUD) sebagaimana dipaparkan Direktorat Pendidikan Anak Usia Dini.
Rujukan regulasi: UU No. 20/2003, Perpres No. 60/2013, Permenko PMK No. 1/2019,
Perpres No. 72/2021, dan RAN PAUD HI Bidang Pendidikan.

## Desain

- Palet biru (`1E76C8`) sebagai warna dominan, didukung hijau (`2FA36B`), oranye (`F5871F`), dan putih.
- Motif berulang: kartu sudut membulat dengan bayangan lembut, ikon di dalam lingkaran berwarna,
  dan bingkai putih pada setiap gambar.
- Tata letak bervariasi antar slide: kartu bertingkat, linimasa, diagram roda pemangku kepentingan,
  kolom banding mitos–fakta, lembar cek, kartu studi kasus, dan satu grafik batang bawaan PowerPoint.

## Membangun ulang

```bash
cd generator
npm install

# 1) siapkan aset gambar dari kedua berkas referensi (sekali saja)
node extract_assets.js /path/refA.pptx /path/refB.pptx ../assets

# 2) bangun deck
npm run build      # menghasilkan ../Kemitraan_Strategis_PAUD_HI.pptx
```

`build.js` memuat isi dan tata letak setiap slide, `extract_assets.js` memuat daftar aset beserta
area potongannya, dan `lib/icons.js` merender ikon. Ubah teks, warna, atau pemetaan gambar di
berkas tersebut lalu jalankan ulang `npm run build`.
