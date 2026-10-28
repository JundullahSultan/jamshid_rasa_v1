import { useEffect, useState } from 'react';
import { languages } from '../data/i18n';
import Icon from './Icon';
const targets=['#home','#videos','#consultation','#about','#/contact'];
export default function Header({t, language, setLanguage, contactPage}) {
 const [open,setOpen]=useState(false);
 useEffect(()=>{ if(!open)return; const onKey=e=>{if(e.key==='Escape'){setOpen(false);document.querySelector('.menu-toggle')?.focus();}if(e.key==='Tab'){const items=[document.querySelector('.menu-toggle'),...document.querySelectorAll('#mobile-navigation a')];const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}}; document.addEventListener('keydown',onKey); const prev=document.body.style.overflow;document.body.style.overflow='hidden';document.querySelector('#mobile-navigation a')?.focus(); return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=prev;};},[open]);
 return <header className={`site-header ${contactPage?'':'reference-header'}`}>
  <div className="header-inner">
   <a href="#home" className="brand" onClick={()=>setOpen(false)} aria-label={`${t.name} ${t.englishName}`}><span className="brand-symbol"><Icon name="book"/></span><span><strong>{t.name}</strong><small dir="ltr">{t.englishName}</small></span></a>
   <nav className="desktop-nav" aria-label={t.lang==='en'?'Main navigation':t.openMenu}>{t.nav.map((label,i)=><a key={label} href={targets[i]} aria-current={contactPage&&i===4?'page':undefined}>{label}</a>)}</nav>
   <div className="header-actions"><div className="language-picker"><Icon name="globe"/><select aria-label="Language / ژبه / زبان" value={language} onChange={e=>setLanguage(e.target.value)}>{Object.entries(languages).map(([code,label])=><option key={code} value={code}>{label}</option>)}</select></div><a className="button button-dark header-book" href="#consultation">{t.book}<Icon name="diagonal" className="directional"/></a><button className="menu-toggle" aria-label={open?t.closeMenu:t.openMenu} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}><Icon name={open?'close':'menu'}/></button></div>
  </div>
  {open&&<nav id="mobile-navigation" className="mobile-nav" aria-label={t.openMenu}>{t.nav.map((label,i)=><a key={label} href={targets[i]} onClick={()=>setOpen(false)}><span className="nav-index" dir="ltr">0{i+1}</span>{label}<Icon name="diagonal" className="directional"/></a>)}<p>{t.tagline}</p><a className="button button-dark" href="#consultation" onClick={()=>setOpen(false)}>{t.bookLong}</a></nav>}
 </header>;
}
