import { useEffect, useState } from 'react';
import { translations } from './data/i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import VideoHub from './components/VideoHub';
import Pillars from './components/Pillars';
import Consultation from './components/Consultation';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Icon from './components/Icon';
export default function App(){
 const [language,setLanguage]=useState(()=>{try{return translations[localStorage.getItem('rasa-language')]?localStorage.getItem('rasa-language'):'ps';}catch{return 'ps';}});
 const [contactPage,setContactPage]=useState(location.hash==='#/contact');const t=translations[language];
 useEffect(()=>{document.documentElement.lang=t.lang;document.documentElement.dir=t.dir;document.title=(contactPage?t.contact+' | ':'')+t.pageTitle;document.querySelector('meta[name="description"]').content=t.heroBody;try{localStorage.setItem('rasa-language',language);}catch{}},[language,t,contactPage]);
 useEffect(()=>{const onHash=()=>{const contact=location.hash==='#/contact';setContactPage(contact);requestAnimationFrame(()=>{if(contact)window.scrollTo(0,0);else{const id=location.hash.slice(1)||'home';document.getElementById(id)?.scrollIntoView();}});};window.addEventListener('hashchange',onHash);return()=>window.removeEventListener('hashchange',onHash);},[]);
 return <><a href="#main" className="skip-link">{t.skip}</a><Header {...{t,language,setLanguage,contactPage}}/>{contactPage?<Contact t={t} page/>:<main id="main"><div className="page-shell"><Hero t={t}/><div className="under-hero"><span>{t.roles}</span><a href="#videos">{t.scroll}<Icon name="arrow" className="scroll-arrow"/></a><span dir="ltr">KABUL, AFGHANISTAN</span></div><VideoHub t={t}/><Pillars t={t}/><Consultation t={t}/><About t={t}/><Contact t={t}/></div></main>}<Footer t={t}/><a className="mobile-booking button button-dark" href="#consultation"><Icon name="chat"/>{t.bookLong}<Icon name="diagonal" className="directional"/></a></>;
}
