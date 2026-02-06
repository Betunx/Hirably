const fs = require('fs');
const data = JSON.parse(fs.readFileSync('figma_data.json', 'utf8'));

const colors = new Set();
const fonts = new Set();
const texts = [];

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
}

function extract(node) {
    if (!node || typeof node !== 'object') return;

    if (Array.isArray(node)) {
        node.forEach(extract);
        return;
    }

    // Colores
    if (node.fills) {
        node.fills.forEach(fill => {
            if (fill.type === 'SOLID' && fill.color) {
                colors.add(rgbToHex(fill.color.r, fill.color.g, fill.color.b));
            }
            if (fill.type === 'GRADIENT_LINEAR' && fill.gradientStops) {
                fill.gradientStops.forEach(stop => {
                    colors.add(rgbToHex(stop.color.r, stop.color.g, stop.color.b));
                });
            }
        });
    }

    // Tipografías
    if (node.style && node.style.fontFamily) {
        fonts.add(node.style.fontFamily + ' ' + (node.style.fontWeight || '') + ' ' + (node.style.fontSize || '') + 'px');
    }

    // Textos
    if (node.type === 'TEXT' && node.characters) {
        texts.push({text: node.characters.substring(0,80), font: node.style?.fontFamily, size: node.style?.fontSize, weight: node.style?.fontWeight});
    }

    Object.values(node).forEach(extract);
}

extract(data);

console.log('=== COLORES ===');
[...colors].sort().forEach(c => console.log(c));

console.log('\n=== TIPOGRAFÍAS ===');
[...fonts].sort().forEach(f => console.log(f));

console.log('\n=== TEXTOS CLAVE ===');
texts.slice(0, 30).forEach(t => console.log(`${t.font} ${t.weight} ${t.size}px: "${t.text}"`));
