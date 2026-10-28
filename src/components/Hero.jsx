import Icon from './Icon';
export function Portrait({t, className='', priority=false}) {
 return <img className={className} src="/images/jamshid-hero-960.webp" srcSet="/images/jamshid-hero-480.webp 480w, /images/jamshid-hero-960.webp 960w, /images/jamshid-hero-1440.webp 1440w" sizes="(max-width: 700px) 100vw, 48vw" width="1024" height="1280" alt={t.portraitAlt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async"/>;
}
export default function Hero({t}) {
 return <section className="hero" id="home" aria-labelledby="hero-title">
  <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
  <div className="hero-copy"><span className="eyebrow hero-eyebrow"><span className="status-dot"/>{t.hope}</span><p className="hero-name">{t.name}</p><h1 id="hero-title">{t.heroTitle.map(line=><span key={line}>{line}</span>)}</h1><p className="hero-roles">{t.roles}</p><p className="hero-body">{t.heroBody}</p><div className="hero-buttons"><a className="button button-cream" href="#consultation">{t.bookLong}<Icon name="diagonal" className="directional"/></a><a className="hero-video-link" href="#videos"><span className="small-play"><Icon name="play"/></span>{t.watch}</a></div><div className="hero-bottom-note"><Icon name="sun"/><span>{t.heroNote}</span></div></div>
  <div className="hero-portrait"><Portrait t={t} priority/><span className="portrait-caption">{t.portraitLabel}</span></div>
  <aside className="hero-aside"><div className="aside-top"><span className="tiny-pill">{t.hello}</span><h2>{t.helloTitle}</h2><p>{t.helloBody}</p><a className="round-link" href="#videos" aria-label={t.watch}><Icon name="diagonal" className="directional"/></a></div><div className="hope-note"><Icon name="sun"/><span className="eyebrow">{t.quoteLabel}</span><p>{t.quote}</p><div className="note-rule"/><span>{t.explore}</span></div></aside>
 </section>;
}
