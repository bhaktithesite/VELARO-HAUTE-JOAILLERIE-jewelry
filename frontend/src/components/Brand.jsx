import { motion, useReducedMotion } from 'framer-motion';

export const Crest = ({ className = '' }) => <svg className={`crest ${className}`} viewBox="0 0 52 52" fill="none" aria-hidden="true"><path d="M26 3 47 17 26 47 5 17 26 3Z" stroke="currentColor" strokeWidth="1.3"/><path d="m5 17 21 11 21-11M15 10l11 18 11-18M26 3v44M5 17h42M15 17l11 30 11-30" stroke="currentColor" strokeWidth=".8"/></svg>;

export const Brand = ({ footer = false }) => <a href="#home" className={`brand ${footer ? 'brand-footer' : ''}`} data-testid={footer ? 'footer-brand-link' : 'header-brand-link'} aria-label="VELARO home"><Crest/><span>VELARO<small>HAUTE JOAILLERIE</small></span></a>;

export const Reveal = ({ children, className = '', delay = 0, ...props }) => {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: .8, delay, ease: [.22, 1, .36, 1] }} {...props}>{children}</motion.div>;
};

export const Chapter = ({ number, children }) => <div className="chapter"><span>{number}</span><i/>{children}</div>;