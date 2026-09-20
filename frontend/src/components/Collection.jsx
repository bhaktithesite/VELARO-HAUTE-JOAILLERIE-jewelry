import { useMemo, useState } from 'react';
import { Heart, ArrowUpRight, SlidersHorizontal, X, MessageCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal, Chapter } from './Brand';
import { money, itemMessage, whatsappLink } from '../lib/atelier';

const categories = [['All', 'All creations'], ['Rings', 'Rings'], ['Pendants', 'Necklaces & pendants'], ['Earrings', 'Earrings'], ['Bracelets', 'Bracelets'], ['Bridal', 'Royal bridal'], ['Men', 'For him']];
const tabs = ['Best Sellers', 'New Arrivals', 'Royal Heritage', 'Solitaire Specials', 'All Creations'];

export const ProductCard = ({ product: p, saved, onSave, onOpen }) => <motion.article layout="position" whileHover={{ y: -6 }} transition={{ duration: .3 }} className="product-card" data-testid={`product-card-${p.id}`}>
  <div className="product-image-wrap">
    <button className="product-image-button" onClick={() => onOpen(p)} data-testid={`product-open-${p.id}`} aria-label={`Discover ${p.name}`}><img src={p.image} alt={p.name} loading="lazy" width="600" height="600"/></button>
    <span className={`product-tag ${p.edition === 'Royal Heritage' ? 'ruby-tag' : ''}`} data-testid={`product-tag-${p.id}`}>{p.edition === 'New Arrivals' ? 'NEW CREATION' : p.edition === 'Royal Heritage' ? 'ROYAL HERITAGE' : p.isBestSeller ? 'MOST LOVED' : 'THE SIGNATURE EDIT'}</span>
    <motion.button whileTap={{ scale: .8 }} className={`wishlist-button ${saved ? 'is-saved' : ''}`} onClick={() => onSave(p.id)} aria-label={`${saved ? 'Remove' : 'Save'} ${p.name} ${saved ? 'from' : 'to'} wishlist`} aria-pressed={saved} data-testid={`wishlist-toggle-${p.id}`}><Heart size={17} fill={saved ? 'currentColor' : 'none'} strokeWidth={1.4}/></motion.button>
    <button className="product-quick-view" onClick={() => onOpen(p)} data-testid={`quick-view-${p.id}`}>Discover this creation <ArrowUpRight size={15}/></button>
  </div>
  <div className="product-info">
    <span className="product-category" data-testid={`product-category-${p.id}`}>{p.metals[0]} <i/> {p.category}</span>
    <button className="product-title-button" onClick={() => onOpen(p)} data-testid={`product-title-${p.id}`}><h3>{p.name}</h3></button>
    <div className="product-rating" data-testid={`product-rating-${p.id}`}><span>★★★★★</span> {p.rating.toFixed(1)} <i>({p.reviewCount})</i></div>
    <div className="product-bottom"><div className="product-price" data-testid={`product-price-${p.id}`}>{money(p.price)} <small>USD</small></div><a href={whatsappLink(itemMessage(p,p.metals[0],p.sizes.includes('7') ? '7' : p.sizes[0]))} className="product-inquire" target="_blank" rel="noopener noreferrer" aria-label={`Inquire about ${p.name} on WhatsApp`} data-testid={`product-whatsapp-${p.id}`}><MessageCircle size={16}/><span>Inquire</span><ArrowUpRight size={12}/></a></div>
  </div>
</motion.article>;

export const Collection = ({ products, category, setCategory, wishlist, onSave, onOpen, loading, error, retry }) => {
  const [tab, setTab] = useState('Best Sellers');
  const [gender, setGender] = useState('All');
  const [filters, setFilters] = useState(false);
  const [sort, setSort] = useState('curated');
  const [budget, setBudget] = useState('all');
  const [visible, setVisible] = useState(8);
  const displayed = useMemo(() => {
    let list = products.filter(p => (category === 'All' || (category === 'Men' ? p.gender === 'Men' : p.category === category)) && (gender === 'All' || p.gender === gender) && (category !== 'All' || tab === 'All Creations' || (tab === 'Best Sellers' ? p.isBestSeller : p.edition === tab)) && (budget === 'all' || p.price <= Number(budget)));
    if (sort === 'low') list.sort((a,b) => a.price - b.price);
    if (sort === 'high') list.sort((a,b) => b.price - a.price);
    return list;
  }, [products, category, gender, tab, budget, sort]);
  const reset = () => {setCategory('All'); setGender('All'); setTab('All Creations'); setBudget('all'); setSort('curated'); setVisible(8);};
  return <section className="collection-section page-width section-space" id="collection" data-testid="collection-section">
    <Reveal><Chapter number="01">THE OBJECTS OF OUR AFFECTION</Chapter><div className="section-heading"><h2 data-testid="collection-heading">Some things are <em>forever.</em></h2><p>Chosen with intention. Crafted without compromise.<br/>Discover the pieces you’ll never want to take off.</p></div></Reveal>
    <div className="category-rail" data-testid="category-filters">{categories.map(([key,label]) => { const p = products.find(p => key === 'Men' ? p.gender === 'Men' : p.category === key); return <button className={`category-button ${category === key ? 'active' : ''}`} onClick={() => {setCategory(key); setVisible(8);}} key={key} data-testid={`category-${key.toLowerCase()}`} aria-pressed={category === key}>{p && <img src={p.image} alt="" loading="lazy"/>}{key === 'All' && <span className="all-category-mark">✧</span>}{label}</button>; })}</div>
    <div className="collection-toolbar"><div className="collection-tabs" role="group" aria-label="Collection edits">{tabs.map(t => <button className={tab === t && category === 'All' ? 'active' : ''} key={t} data-testid={`collection-tab-${t.toLowerCase().replaceAll(' ','-')}`} onClick={() => {setTab(t);setCategory('All');setVisible(8);}}>{t}</button>)}</div><button className={`filter-button ${filters ? 'active' : ''}`} onClick={() => setFilters(!filters)} aria-expanded={filters} data-testid="filter-toggle"><SlidersHorizontal size={14}/>Filter & sort{(budget !== 'all' || gender !== 'All') && <i/>}</button></div>
    {filters && <div className="filter-panel" data-testid="filter-panel"><label>For<select value={gender} onChange={e => setGender(e.target.value)} data-testid="gender-filter">{['All','Women','Men','Unisex'].map(g => <option key={g}>{g}</option>)}</select></label><label>Price range<select value={budget} onChange={e => setBudget(e.target.value)} data-testid="price-filter"><option value="all">All prices</option><option value="1000">Under $1,000</option><option value="2500">Up to $2,500</option><option value="5000">Up to $5,000</option></select></label><label>Sort by<select value={sort} onChange={e => setSort(e.target.value)} data-testid="sort-filter"><option value="curated">The curated edit</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label><button onClick={reset} className="text-link" data-testid="reset-filters">Reset filters <X size={13}/></button></div>}
    <p className="collection-results" aria-live="polite" data-testid="collection-result-count">{loading ? 'Curating your collection…' : `${displayed.length} exceptional creations`}</p>
    {error ? <div className="empty-state" role="alert" data-testid="catalog-error"><p>The collection is taking a little longer to arrive.</p><button className="button button-dark" onClick={retry} data-testid="catalog-retry">Try again</button></div> : loading ? <div className="product-grid">{[1,2,3,4].map(i=><div className="product-skeleton" key={i}/>)}</div> : displayed.length === 0 ? <div className="empty-state" data-testid="collection-empty"><Search size={28}/><h3>A different kind of rare.</h3><p>No pieces match this selection. Let’s discover something else.</p><button className="text-link" onClick={reset} data-testid="collection-reset">Explore all creations <ArrowUpRight size={15}/></button></div> : <motion.div layout className="product-grid">{displayed.slice(0,visible).map(p => <ProductCard key={p.id} product={p} saved={wishlist.includes(p.id)} onSave={onSave} onOpen={onOpen}/>)}</motion.div>}
    <div className="collection-footer"><span>Small details. Infinite meaning.</span>{displayed.length > visible ? <button className="button button-outline" onClick={() => setVisible(v => v + 8)} data-testid="load-more-products">Discover more creations <ArrowDownIcon/></button> : tab !== 'All Creations' || category !== 'All' ? <button className="button button-outline" onClick={reset} data-testid="view-all-products">View all 20 creations <ArrowUpRight size={16}/></button> : <span className="eyebrow" data-testid="all-products-shown">YOUR NEXT HEIRLOOM AWAITS.</span>}</div>
  </section>;
};
const ArrowDownIcon = () => <ArrowUpRight size={16} style={{transform:'rotate(45deg)'}}/>;