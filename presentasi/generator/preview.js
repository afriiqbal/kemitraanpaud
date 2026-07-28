const fs = require('fs');
const sharp = require('sharp');
const { S } = require('./lib/illus');

(async () => {
  fs.mkdirSync('out', { recursive: true });
  const names = Object.keys(S);
  const tiles = [];
  for (const n of names) {
    const svg = S[n]();
    fs.writeFileSync(`out/${n}.svg`, svg);
    const buf = await sharp(Buffer.from(svg)).png().toBuffer();
    fs.writeFileSync(`out/${n}.png`, buf);
    tiles.push(n);
    console.log('rendered', n, (buf.length / 1024).toFixed(0) + 'KB');
  }
  // contact sheet
  const cols = 3, tw = 620, th = 420;
  const rows = Math.ceil(tiles.length / cols);
  const comps = [];
  for (let i = 0; i < tiles.length; i++) {
    const img = await sharp(`out/${tiles[i]}.png`).resize(tw - 16, th - 40, { fit: 'contain', background: '#ffffff' }).png().toBuffer();
    comps.push({ input: img, left: (i % cols) * tw + 8, top: Math.floor(i / cols) * th + 32 });
    const label = Buffer.from(`<svg width="${tw}" height="28"><text x="10" y="20" font-family="Arial" font-size="20" fill="#000">${i + 1}. ${tiles[i]}</text></svg>`);
    comps.push({ input: label, left: (i % cols) * tw, top: Math.floor(i / cols) * th + 2 });
  }
  await sharp({ create: { width: cols * tw, height: rows * th, channels: 3, background: '#ffffff' } })
    .composite(comps).jpeg({ quality: 86 }).toFile('out/sheet.jpg');
  console.log('sheet done');
})();
