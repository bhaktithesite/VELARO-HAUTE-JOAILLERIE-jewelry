export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
export const HERO_IMAGE = '/images/velaro-editorial.jpg';
export const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
export const priceFor = (product, metal) => Math.round(product.price * (metal === product.metals[0] ? 1 : /platinum/i.test(metal) ? 1.18 : /rose/i.test(metal) ? 1.04 : 1));
export const sizeLabel = (p, size) => p.category === 'Rings' ? `US ${size}` : size;
export const productLink = (p) => `${process.env.REACT_APP_BACKEND_URL}/#product-${p.id}`;
export const whatsappLink = (message) => {
  const phone = process.env.REACT_APP_WHATSAPP_PHONE_NUMBER?.replace(/\D/g, '');
  if (!phone || !/^[1-9]\d{7,14}$/.test(phone)) throw new Error('The concierge contact is not configured.');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
export const consultationLink = whatsappLink('Hello VELARO, I would like to consult with a bespoke jewelry specialist.');
export const bespokeLink = whatsappLink('Hi VELARO Atelier, I am interested in commissioning a bespoke custom piece. Here is what I have in mind:');
export const itemMessage = (product, metal, size) => `✨ *EXCLUSIVE INQUIRY — VELARO HAUTE JOAILLERIE* ✨
━━━━━━━━━━━━━━━━━━━━
💍 *Piece:* ${product.name}
🏷️ *SKU:* ${product.id}
🪙 *Selected Metal:* ${metal}
📏 *Selected Size:* ${sizeLabel(product, size)}
💎 *Gemstone Spec:* ${product.specs}
💰 *Price:* ${money(priceFor(product, metal))} USD (Inclusive of Insured Delivery & Certificate)

📦 *Service Requested:* Immediate Purchase / Atelier Consultation
🔗 *Product Reference:* ${productLink(product)}
🖼️ *Image Reference:* ${product.image}

💬 *Client Note:* "Hello VELARO Concierge, I would like to confirm availability and proceed with this piece. Please share invoice and payment arrangements."
━━━━━━━━━━━━━━━━━━━━`;
export const bagMessage = (items, name, city) => `✨ *BESPOKE ORDER BAG — VELARO HAUTE JOAILLERIE* ✨
━━━━━━━━━━━━━━━━━━━━
Dear Concierge Atelier, I wish to place an order for the following curated pieces:
${items.map((item, i) => `
${i + 1}. *${item.product.name}* (×${item.quantity})
   • SKU: ${item.product.id}
   • Specs: ${item.metal} | Size: ${sizeLabel(item.product, item.size)}
   • Gemstones: ${item.product.specs}
   • Unit price: ${money(priceFor(item.product, item.metal))} USD
   • Line total: ${money(priceFor(item.product, item.metal) * item.quantity)} USD
   • Product: ${productLink(item.product)}
   • Image: ${item.product.image}`).join('\n')}
━━━━━━━━━━━━━━━━━━━━
📊 *Order Summary:*
• Total Items: ${items.reduce((n, i) => n + i.quantity, 0)} Masterpieces
• Estimated Subtotal: ${money(items.reduce((n, i) => n + priceFor(i.product, i.metal) * i.quantity, 0))} USD
• Insured Armored Delivery: COMPLIMENTARY
• Authenticity Certificates: Included (GIA / IGI / BIS)
${name ? `\n👤 *Client Name:* ${name}` : ''}${city ? `\n📍 *Delivery City / Country:* ${city}` : ''}
━━━━━━━━━━━━━━━━━━━━
"Kindly confirm availability, delivery timeline, and provide payment details."`;

export function readSaved(key, validate = () => true) {
  try { const parsed = JSON.parse(localStorage.getItem(key)); return Array.isArray(parsed) ? parsed.filter(validate) : []; }
  catch { return []; }
}
export function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Private browsing can disable storage. */ }
}