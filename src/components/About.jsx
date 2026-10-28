import { Portrait } from './Hero';
import Icon from './Icon';
export default function About({t}) {
 return <section className="about-section section" id="about" aria-labelledby="about-title"><div className="about-image"><Portrait t={t}/><div className="about-image-label"><span>{t.name}</span><Icon name="sun"/></div></div><div className="about-copy"><p className="eyebrow"><span className="orange-dash"/>{t.aboutKicker}</p><h2 id="about-title">{t.aboutTitle}</h2>{t.about.map(p=><p key={p}>{p}</p>)}<p className="placeholder-copy">{t.story}</p><div className="featured"><span className="eyebrow">{t.featured}</span><div dir="ltr"><span className="tolo">TOLO<span>TV</span></span><span className="arezo">AREZO <small>TV</small></span></div></div></div></section>;
}
