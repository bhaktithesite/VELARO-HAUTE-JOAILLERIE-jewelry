import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, MessageCircle, ShoppingBag, Ruler, Heart, ArrowUpRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Modal } from './Modal';
import { money, priceFor, itemMessage, whatsappLink } from '../lib/atelier';

export const ProductDialog = ({ product: p, onClose, onAdd, saved, onSave, onGuide }) => {
  const [metal, setMetal] = useState(p.metals[0]);
  const [size, setSize] = useState(p.sizes.includes('7') ? '7' : p.sizes[0]);
  const [view, setView] = useState(0);
  const [startX, setStartX] = useState(null);
  const price = priceFor(p, metal);
  return <Modal open onClose={onClose} title={p.name} className="product-modal" testId="product-modal">
    <div className="modal-gallery" onTouchStart={e => setStartX(e.touches[0].clientX)} onTouchEnd={e => {if (startX !== null && Math.abs(e.changedTouches[0].clientX-startX)>40) setView(v => 1-v);setStartX(null);}}>
      <span className="gallery-label eyebrow">THE VELARO COLLECTION</span>
      <AnimatePresence mode="wait"><motion.img key={`${metal}-${view}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.25}} src={p.image} alt={`${p.name} — ${view ? 'magnified detail' : 'full view'}`} className={`${view ? 'zoomed-image' : ''} ${/platinum/i.test(metal) ? 'metal-white' : /rose/i.test(metal) ? 'metal-rose' : ''}`} width="700" height="800"/></AnimatePresence>
      <button className={`wishlist-button modal-wishlist ${saved ? 'is-saved' : ''}`} onClick={() => onSave(p.id)} data-testid="modal-wishlist-button" aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'} aria-pressed={saved}><Heart size={19} fill={saved ? 'currentColor' : 'none'}/></button>
      <div className="gallery-controls"><button className="icon-button" onClick={() => setView(v => 1-v)} aria-label="Previous image view" data-testid="gallery-previous"><ChevronLeft size={16}/></button>{['Full view','Detail'].map((name,i) => <button className={view === i ? 'active' : ''} key={name} onClick={() => setView(i)} data-testid={`gallery-view-${i}`}>{name}</button>)}<button className="icon-button" onClick={() => setView(v => 1-v)} aria-label="Next image view" data-testid="gallery-next"><ChevronRight size={16}/></button></div>
      <p className="image-disclaimer" data-testid="product-photography-note">Illustrative photography. Metal tones are a preview.</p>
    </div>
    <div className="product-details">
      <span className="eyebrow" data-testid="modal-product-category">{p.category} / {p.subCategory}</span>
      <h2 data-testid="modal-product-title">{p.name}</h2>
      <div className="modal-rating" data-testid="modal-product-rating"><span>★★★★★</span> {p.rating.toFixed(1)} <small>({p.reviewCount} connoisseur reviews)</small></div>
      <div className="modal-price" data-testid="modal-product-price">{money(price)} <small>USD</small><span>Insured delivery included</span></div>
      <p className="product-description" data-testid="modal-product-description">{p.description}</p>
      <div className="certification" data-testid="product-certification"><ShieldCheck size={17}/><span>{p.specs}</span></div>
      <fieldset className="option-group"><legend>01 <span>Your metal</span></legend><div className="metal-options">{p.metals.map((m,i) => <button key={m} className={`metal-option ${metal===m?'selected':''}`} data-testid={`metal-option-${i}`} aria-pressed={metal===m} onClick={() => setMetal(m)}><i className={/platinum/i.test(m)?'swatch-white':/rose/i.test(m)?'swatch-rose':'swatch-gold'}/><span>{m}</span>{metal===m && <Check size={12}/>}</button>)}</div></fieldset>
      <fieldset className="option-group"><legend>02 <span>{p.category==='Rings' ? 'Your ring size' : 'Your fit'}</span></legend>{p.category==='Rings' && <button className="size-guide-link" onClick={onGuide} data-testid="product-size-guide"><Ruler size={13}/>Find your size</button>}<div className="size-options">{p.sizes.map(s => <button key={s} className={size===s?'selected':''} onClick={() => setSize(s)} aria-pressed={size===s} data-testid={`size-option-${s.replaceAll(' ','-')}`}>{s}</button>)}</div></fieldset>
      <div className="stock-note" data-testid="product-stock"><i/>Limited handcrafted edition · availability confirmed by concierge</div>
      <a className="button button-dark full-width" href={whatsappLink(itemMessage(p,metal,size))} target="_blank" rel="noopener noreferrer" data-testid="product-buy-whatsapp"><MessageCircle size={17}/>Buy now via WhatsApp<ArrowUpRight size={16}/></a>
      <button className="button button-outline full-width" onClick={() => onAdd(p,metal,size)} data-testid="product-add-to-bag"><ShoppingBag size={17}/>Add to your private bag</button>
      <p className="modal-reassurance" data-testid="product-reassurance">No payment now. Just a personal conversation.</p>
      <span className="sku-label" data-testid="product-sku">ATELIER REFERENCE / {p.id}</span>
    </div>
  </Modal>;
};