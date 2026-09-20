import { Search, ShoppingBag, MessageCircle, MapPin, Heart, Menu, ArrowUpRight, Gem } from 'lucide-react';
import { Brand } from './Brand';
import { consultationLink } from '../lib/atelier';

export const Header = ({ count, wishlistCount, onSearch, onBag, onWishlist, onMenu, onCategory }) => <>
  <div className="announcement" data-testid="delivery-announcement"><span>COMPLIMENTARY INSURED WORLDWIDE DELIVERY</span><span className="announcement-diamond">◆</span><span>CERTIFIED TO BE CHERISHED. CRAFTED TO LAST.</span></div>
  <header className="site-header">
    <div className="header-main page-width">
      <div className="header-location" data-testid="boutique-locations"><MapPin size={14}/><span>NEW YORK <b>·</b> MUMBAI <b>·</b> DUBAI</span></div>
      <button className="icon-button mobile-menu" onClick={onMenu} aria-label="Open menu" data-testid="mobile-menu-button"><Menu size={21}/></button>
      <Brand/>
      <div className="header-actions">
        <button className="icon-button" onClick={onSearch} aria-label="Search collection" data-testid="header-search-button"><Search size={20}/></button>
        <button className="icon-button desktop-wishlist" onClick={onWishlist} aria-label={`Wishlist, ${wishlistCount} saved pieces`} data-testid="header-wishlist-button"><Heart size={20}/>{wishlistCount > 0 && <span className="tiny-count">{wishlistCount}</span>}</button>
        <span className="action-divider"/>
        <a className="header-concierge" href={consultationLink} target="_blank" rel="noopener noreferrer" data-testid="header-concierge-link"><span className="online-dot"/>Your concierge<ArrowUpRight size={13}/></a>
        <button className="icon-button bag-button" onClick={onBag} aria-label={`Shopping bag, ${count} pieces`} data-testid="header-bag-button"><ShoppingBag size={20}/><span className="bag-count" data-testid="header-bag-count" key={count}>{count}</span></button>
      </div>
    </div>
    <nav className="desktop-nav" aria-label="Collection navigation">
      <a href="#collection" data-testid="nav-all-creations" onClick={() => onCategory('All')}>All creations</a>
      <a href="#collection" data-testid="nav-rings" onClick={() => onCategory('Rings')}>Rings</a>
      <a href="#collection" data-testid="nav-pendants" onClick={() => onCategory('Pendants')}>Necklaces & pendants</a>
      <a href="#collection" data-testid="nav-earrings" onClick={() => onCategory('Earrings')}>Earrings</a>
      <a href="#collection" data-testid="nav-bracelets" onClick={() => onCategory('Bracelets')}>Bracelets</a>
      <a href="#collection" className="ruby-link" data-testid="nav-bridal" onClick={() => onCategory('Bridal')}>The royal bridal suite <span>◆</span></a>
      <a href="#maison" data-testid="nav-maison">The Maison</a>
    </nav>
  </header>
  <nav className="mobile-bottom-nav" aria-label="Quick actions">
    <a href="#collection" data-testid="mobile-collection-link"><Gem size={19}/><span>Discover</span></a>
    <button onClick={onSearch} data-testid="mobile-search-button"><Search size={19}/><span>Search</span></button>
    <button onClick={onWishlist} data-testid="mobile-wishlist-button"><Heart size={19}/><span>Saved {wishlistCount > 0 ? `(${wishlistCount})` : ''}</span></button>
    <button onClick={onBag} data-testid="mobile-bag-button"><ShoppingBag size={19}/><span>Bag ({count})</span></button>
    <a href={consultationLink} target="_blank" rel="noopener noreferrer" data-testid="mobile-concierge-link"><MessageCircle size={19}/><span>Concierge</span></a>
  </nav>
</>;