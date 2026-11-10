import './PrototypeNav.css';

const links = [
 ['#home', ['Home', 'کور', 'خانه']],
 ['#videos', ['Videos', 'ویډیوګانې', 'ویدیوها']],
 ['#consultation', ['Consultation', 'مشوره', 'مشاوره']],
 ['#about', ['About', 'زموږ په اړه', 'درباره']],
 ['#/contact', ['Contact', 'اړیکه', 'تماس']],
 ['#/seminars', ['Reserve a seat', 'څوکۍ رزرو', 'رزرو صندلی']],
 ['#/admin', ['Registrations', 'نوملیکنې', 'ثبت‌نام‌ها']],
 ['#/admin/students', ['Students', 'زده کوونکي', 'دانشجویان']],
 ['#/admin/videos', ['Video series', 'د ویډیوګانو لړۍ', 'مجموعه‌های ویدیویی']],
];

export default function PrototypeNav({language, route}) {
 const index = language === 'ps' ? 1 : language === 'prs' ? 2 : 0;
 const title = ['PROTOTYPE', 'ازمایښتي بڼه', 'نسخه آزمایشی'][index];
 return <nav className="prototype-nav" aria-label={['Prototype pages', 'ازمایښتي پاڼې', 'صفحات آزمایشی'][index]}>
  <span className="prototype-nav-label"><span aria-hidden="true"/>{title}</span>
  <div className="prototype-nav-links">{links.map(([href, labels]) => <a key={href} href={href} aria-current={(route || 'home') === href.slice(1) ? 'page' : undefined}>{labels[index]}</a>)}</div>
 </nav>;
}
