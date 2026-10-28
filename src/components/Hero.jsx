import Icon from './Icon';
import { socials } from '../data/contact';
import './Hero.css';
export function Portrait({t, className='', priority=false}) {
 return <img className={className} src="/images/jamshid-hero-960.webp" srcSet="/images/jamshid-hero-480.webp 480w, /images/jamshid-hero-960.webp 960w, /images/jamshid-hero-1440.webp 1440w" sizes="(max-width: 700px) 100vw, 48vw" width="1024" height="1280" alt={t.portraitAlt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async"/>;
}
export default function Hero({t}) {
 return <section className="reference-hero" id="home" aria-labelledby="hero-title">
  <div className="reference-orbit reference-orbit-top" aria-hidden="true"/>
  <div className="reference-orbit reference-orbit-bottom" aria-hidden="true"/>
  <div className="reference-white-panel" aria-hidden="true"/>
  <div className="reference-copy" dir={t.dir}>
   <span className="reference-badge">{t.hope}</span>
   <h1 id="hero-title" className="reference-title">{t.name.split(' ').map((word,i)=><span key={i}>{word}{' '}</span>)}</h1>
   <a className="reference-cta" href="#consultation">{t.bookLong}</a>
  </div>
  <div className="reference-portrait"><img src="/images/jamshid-cutout-960.webp" srcSet="/images/jamshid-cutout-480.webp 480w, /images/jamshid-cutout-960.webp 960w, /images/jamshid-cutout-1440.webp 1440w" sizes="(max-width: 700px) 100vw, 70vw" width="1122" height="1402" alt={t.portraitAlt} fetchPriority="high" decoding="async"/></div>
  <div className="reference-mini-cards" dir={t.dir}>
   <a href="#videos" className="reference-mini-card"><span>{t.nav[1]}<i aria-hidden="true"/></span><strong>{t.watchOne}<Icon name="play"/></strong></a>
   <a href="#consultation" className="reference-mini-card"><span>{t.nav[2]}<i aria-hidden="true"/></span><strong>{t.book}<Icon name="chat"/></strong></a>
  </div>
  <div className="reference-socials" dir="ltr">{[socials[2],socials[0],socials[1]].map((s,i)=><a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}><Icon name={['instagram','youtube','facebook'][i]}/></a>)}</div>
  <aside className="reference-aside" dir={t.dir}>
   <div className="reference-welcome"><span className="reference-small-badge">{t.hello}</span><h2>{t.helloTitle}</h2><p>{t.roles}</p></div>
   <div className="reference-note"><div className="reference-note-person"><img src="/images/jamshid-hero-480.webp" width="52" height="64" loading="lazy" alt=""/><div><strong>{t.name}</strong><span>{t.hope}</span></div></div><p>{t.tagline}</p></div>
  </aside>
 </section>;
}
