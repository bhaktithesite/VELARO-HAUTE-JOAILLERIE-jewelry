import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MessageCircle, ShieldCheck, Truck, RotateCcw, Gem, Star } from 'lucide-react';
import { HERO_IMAGE, consultationLink } from '../lib/atelier';
import { Crest } from './Brand';

export const Hero = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 95]);
  return <>
    <section className="hero page-width" id="home" ref={ref} data-testid="hero-section">
      <div className="hero-copy">
        <motion.div className="eyebrow hero-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .15, duration: 1 }}><span className="fine-line"/>NOT JUST JEWELRY. YOUR LEGACY.</motion.div>
        <h1 data-testid="hero-heading">{['Timeless Beauty,', 'Crafted for', 'Eternity.'].map((line, i) => <span className={`hero-line ${i === 2 ? 'hero-italic' : ''}`} key={line}><motion.span initial={reduced ? false : { y: '115%', rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 1.15, delay: .15 + i * .15, ease: [.22, 1, .36, 1] }}>{line}</motion.span></span>)}</h1>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .75, duration: .8 }}>
          <p className="hero-description" data-testid="hero-description">Rare diamonds. Extraordinary craftsmanship.<br/>Heirlooms for the moments that become your story.</p>
          <a className="button button-dark hero-primary" href="#collection" data-testid="hero-explore-button">Explore the signature collection <ArrowDown size={17}/></a>
          <a className="hero-consult" href={consultationLink} target="_blank" rel="noopener noreferrer" data-testid="hero-consultation-link"><MessageCircle size={16}/><span>A personal conversation. An exceptional creation.</span><ArrowUpRight size={14}/></a>
          <div className="hero-proof" data-testid="hero-social-proof"><div className="proof-stars">{[1,2,3,4,5].map(i => <Star key={i} size={11} fill="currentColor"/>)}</div><b>4.9/5</b><span>Beloved by 2,400+ connoisseurs</span></div>
        </motion.div>
      </div>
      <motion.div className="hero-visual" initial={reduced ? false : { opacity: 0, clipPath: 'inset(5% 0 5% 8%)' }} animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }} transition={{ duration: 1.6, ease: [.22, 1, .36, 1] }}>
        <motion.img style={{ y: reduced ? 0 : y }} src={HERO_IMAGE} alt="A floral gold and diamond pendant nestled in sculptural champagne silk" fetchPriority="high" width="1264" height="848"/>
        <div className="hero-image-wash"/>
        <div className="hero-top-note"><span>THE ART OF ETERNAL</span><span>VOL. 01 — SIGNATURE COLLECTION</span></div>
        <div className="round-seal"><span>EXCEPTIONALLY</span><Crest/><span>YOURS, FOREVER</span></div>
        <div className="hero-image-caption"><div><span>THE SIGNATURE EDIT</span><p>Nature’s poetry, cast in gold.</p></div><a href="#collection" className="round-link" aria-label="Discover the signature edit" data-testid="hero-signature-link"><ArrowUpRight size={23}/></a></div>
        <div className="image-pagination" aria-hidden="true"><i/><span/><span/></div>
      </motion.div>
      <div className="hero-bottom"><span>EXCEPTIONAL BY NATURE. ETERNAL BY DESIGN.</span><a href="#collection" data-testid="hero-scroll-link">SCROLL TO DISCOVER <ArrowDown size={12}/></a></div>
    </section>
    <div className="trust-bar page-width" data-testid="trust-bar">
      {[[Truck,'Complimentary delivery','Insured, wherever you call home'],[ShieldCheck,'Certified authenticity','GIA / IGI diamonds. BIS hallmarked.'],[RotateCcw,'30-day peace of mind','Discreet, effortless returns'],[Gem,'Made personally yours','Bespoke design & lifetime care']].map(([Icon, title, text], i) => <div className="trust-item" key={title} data-testid={`trust-promise-${i}`}><Icon size={24} strokeWidth={1.15}/><div><strong>{title}</strong><span>{text}</span></div></div>)}
    </div>
  </>;
};