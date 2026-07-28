const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');
const Fa = require('react-icons/fa');
const Md = require('react-icons/md');

const cache = new Map();

function resolve(name) {
  if (Fa[name]) return Fa[name];
  if (Md[name]) return Md[name];
  throw new Error('Ikon tidak ditemukan: ' + name);
}

/** Render ikon react-icons menjadi PNG base64 siap pakai pptxgenjs. */
async function icon(name, color = '#FFFFFF', px = 320) {
  const key = `${name}|${color}|${px}`;
  if (cache.has(key)) return cache.get(key);
  const Comp = resolve(name);
  let svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { size: px }));
  svg = svg.replace(/currentColor/g, color);
  if (!/xmlns=/.test(svg)) svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  const buf = await sharp(Buffer.from(svg), { density: 384 }).resize(px, px, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const data = 'image/png;base64,' + buf.toString('base64');
  cache.set(key, data);
  return data;
}

module.exports = { icon, resolve };
