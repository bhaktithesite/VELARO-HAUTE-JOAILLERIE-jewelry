import { Content } from '@radix-ui/react-dialog';
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import { X } from 'lucide-react';
import { useRef } from 'react';

export const Modal = ({ open, onClose, title, description, className = '', children, testId = 'modal' }) => {
  const touchStart = useRef(0);
  const previousFocus = useRef(null);
  return <Dialog open={open} onOpenChange={value => !value && onClose()}><DialogPortal><DialogOverlay className="atelier-overlay" data-testid={`${testId}-backdrop`}/><Content className={`atelier-modal ${className}`} data-lenis-prevent data-testid={testId} onOpenAutoFocus={() => { previousFocus.current = document.activeElement; }} onCloseAutoFocus={event => { event.preventDefault(); if(previousFocus.current?.isConnected && previousFocus.current !== document.body) previousFocus.current.focus(); else document.querySelector('[data-testid="header-bag-button"]')?.focus(); }}>
    <div className="sheet-handle" onTouchStart={e => { touchStart.current = e.touches[0].clientY; }} onTouchEnd={e => { if (e.changedTouches[0].clientY - touchStart.current > 50) onClose(); }} aria-hidden="true"><i/></div>
    <DialogTitle className="sr-only" data-testid={`${testId}-accessible-title`}>{title}</DialogTitle><DialogDescription className="sr-only" data-testid={`${testId}-description`}>{description || 'Discover your next VELARO heirloom. Your concierge is here to help.'}</DialogDescription>
    <DialogClose className="modal-close icon-button" data-testid={`${testId}-close`} aria-label={`Close ${title}`}><X size={19}/></DialogClose>
    {children}
  </Content></DialogPortal></Dialog>;
};