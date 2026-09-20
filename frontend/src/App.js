import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import { Toaster, toast } from './components/ui/sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { ProductDialog } from './components/ProductDialog';
import { BagDrawer } from './components/BagDrawer';
import { SearchDialog } from './components/SearchDialog';
import { Guide, SizeGuideModal } from './components/Guide';
import { Editorial, Reviews, Concierge } from './components/Editorial';
import { Footer } from './components/Footer';
import { InfoDialog, MenuDialog } from './components/InfoDialog';
import { API, readSaved, save } from './lib/atelier';
import './App.css';
import './refinements.css';

const validBagItem = item => item?.key && item?.product?.id
  && Array.isArray(item?.product?.metals) && item.product.metals.includes(item.metal)
  && Array.isArray(item?.product?.sizes) && item.product.sizes.includes(item.size)
  && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 20;

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState('All');
  const [wishlist, setWishlist] = useState(() => readSaved('velaro-wishlist', x => typeof x === 'string'));
  const [bag, setBag] = useState(() => readSaved('velaro-bag', validBagItem));
  const [product, setProduct] = useState(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [search, setSearch] = useState(null);
  const [guide, setGuide] = useState(false);
  const [info, setInfo] = useState(null);
  const [menu, setMenu] = useState(false);
  const lenisRef = useRef(null);
  const overlayOpen = Boolean(product || bagOpen || search || guide || info || menu);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${API}/products`);
      if (!response.ok) throw new Error('Catalog unavailable');
      const data = await response.json();
      setProducts(data);
      setBag(items => items.flatMap(item => {
        const current = data.find(p => p.id === item.product.id);
        return current?.metals.includes(item.metal) && current.sizes.includes(item.size)
          ? [{ ...item, product: current }] : [];
      }));
    } catch { setError(true); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);
  useEffect(() => { save('velaro-bag', bag); }, [bag]);
  useEffect(() => { save('velaro-wishlist', wishlist); }, [wishlist]);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.12, smoothWheel: true, anchors: true, autoRaf: true,
      prevent: node => node.hasAttribute('data-lenis-prevent') });
    lenisRef.current = lenis;
    return () => { lenis.destroy(); lenisRef.current = null; };
  }, []);
  useEffect(() => {
    if (overlayOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [overlayOpen]);
  useEffect(() => {
    const followHash = () => {
      const id = window.location.hash.replace('#product-', '');
      const found = products.find(p => p.id === id);
      if (found) setProduct(found);
    };
    followHash();
    window.addEventListener('hashchange', followHash);
    return () => window.removeEventListener('hashchange', followHash);
  }, [products]);

  const toggleSave = id => setWishlist(list => list.includes(id) ? list.filter(x => x !== id) : [...list, id]);
  const openProduct = p => { setSearch(null); setProduct(p); };
  const closeProduct = () => {
    setProduct(null);
    if (window.location.hash.startsWith('#product-')) {
      window.history.replaceState({}, '', window.location.pathname + window.location.search + '#collection');
    }
  };
  const addToBag = (p, metal, size) => {
    const key = `${p.id}-${p.metals.indexOf(metal)}-${p.sizes.indexOf(size)}`;
    if (bag.some(item => item.key === key && item.quantity >= 20)) {
      toast.info('For larger commissions, please contact your concierge.');
      return;
    }
    setBag(items => items.some(i => i.key === key)
      ? items.map(i => i.key === key ? { ...i, quantity: i.quantity + 1 } : i)
      : [...items, { key, product: p, metal, size, quantity: 1 }]);
    toast.success('Added to your private collection', { description: `${p.name} · ${metal}` });
    closeProduct();
    setBagOpen(true);
  };
  const changeQuantity = (key, delta) => setBag(items => items.map(item => item.key === key
    ? { ...item, quantity: Math.max(1, Math.min(20, item.quantity + delta)) } : item));
  const removeItem = key => setBag(items => items.filter(item => item.key !== key));

  return <MotionConfig reducedMotion="user">
    <a className="skip-link" href="#collection" data-testid="skip-to-collection">Skip to collection</a>
    <Header count={bag.reduce((n, i) => n + i.quantity, 0)} wishlistCount={wishlist.length}
      onSearch={() => setSearch('search')} onBag={() => setBagOpen(true)}
      onWishlist={() => setSearch('wishlist')} onMenu={() => setMenu(true)} onCategory={setCategory}/>
    <main>
      <Hero/>
      <Collection products={products} category={category} setCategory={setCategory} wishlist={wishlist}
        onSave={toggleSave} onOpen={openProduct} loading={loading} error={error} retry={loadProducts}/>
      <Editorial/><Guide/><Reviews/><Concierge/>
    </main>
    <Footer onCategory={setCategory} onInfo={setInfo}/>
    {product && <ProductDialog key={product.id} product={product} onClose={closeProduct} onAdd={addToBag}
      saved={wishlist.includes(product.id)} onSave={toggleSave} onGuide={() => setGuide(true)}/>}
    <BagDrawer open={bagOpen} onClose={() => setBagOpen(false)} items={bag} onQuantity={changeQuantity} onRemove={removeItem}/>
    {search && <SearchDialog key={search} mode={search} onClose={() => setSearch(null)}
      products={products} wishlist={wishlist} onOpen={openProduct} onSave={toggleSave}/>}
    <SizeGuideModal open={guide} onClose={() => setGuide(false)}/>
    {info && <InfoDialog type={info} onClose={() => setInfo(null)}/>}
    {menu && <MenuDialog onClose={() => setMenu(false)} onCategory={setCategory}/>}
    <Toaster position="top-center" theme="light" closeButton duration={2400}
      toastOptions={{ style: { fontFamily: 'Plus Jakarta Sans', border: '1px solid #dec9a2', background: '#fbf9f5' } }}/>
  </MotionConfig>;
}