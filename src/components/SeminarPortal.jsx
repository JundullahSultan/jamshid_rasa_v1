import CustomSelect from './CustomSelect';
import { useEffect, useRef, useState } from 'react';
import './SeminarPortal.css';
import { withDemoRecords } from '../data/portalDemo';
import Icon from './Icon';
import hesabPayIcon from '../../assets/icons/images.jpg';
import { languages, translations } from '../data/i18n';
import { PortalLanguageContext, portalTranslator, usePortalTranslation } from '../data/portalI18n';

const KEY = 'rasa-seminar-v1';
const seminar = { title: 'Build a more intentional life', date: 'December 12, 2026 · 10:00–13:00', venue: 'Kabul · In-person seminar', price: 1500, capacity: 60 };
const initial = { reservations: [], series: [{ id: 'personal-growth', name: 'Personal growth', description: 'Small steps toward a more meaningful life.' }], videos: [] };
function readData() {
 let current;
 try { current = JSON.parse(localStorage.getItem(KEY)) || initial; } catch { current = initial; }
 const seeded = withDemoRecords(current);
 if (seeded !== current) { try { localStorage.setItem(KEY, JSON.stringify(seeded)); } catch { /* Keep the preview usable when storage is unavailable. */ } }
 return seeded;
}
function videoStore(mode, action) { return new Promise((resolve, reject) => { const request = indexedDB.open('rasa-video-library', 1); request.onupgradeneeded = () => request.result.createObjectStore('videos'); request.onerror = () => reject(request.error); request.onsuccess = () => { const db = request.result; const tx = db.transaction('videos', mode); const result = action(tx.objectStore('videos')); tx.oncomplete = () => { resolve(result.result); db.close(); }; tx.onerror = () => { reject(tx.error); db.close(); }; }; }); }
function Field({ label, ...props }) { const tr = usePortalTranslation(); return <label className="portal-field"><span>{tr(label)}</span><input {...props} dir={['email','tel'].includes(props.type) ? 'ltr' : undefined}/></label>; }

function PersonCard({ person, student, onOpen }) {
 const tr = usePortalTranslation();
 return <article className={student ? 'portal-card portal-notification-record' : 'portal-person portal-notification-record'}>
  <button className="portal-notification" onClick={onOpen} aria-label={tr(`View full information for ${person.name}`)} aria-haspopup="dialog">
   <span className="portal-notification-top"><span className="portal-message-icon" aria-hidden="true"/><span>{student ? tr("STUDENT") : tr("SEMINAR REGISTRATION")}</span><span className={`portal-badge ${person.status === 'Confirmed' ? 'good' : ''}`}>{tr(person.status)}</span></span>
   <span className="portal-notification-body"><strong>{person.name}</strong><span>{person.occupation} · {person.city}</span><span className="portal-notification-preview">{person.method} · {tr(person.payment)} {tr("· AFN")} {person.amount.toLocaleString()}</span></span>
   <span className="portal-notification-footer">{tr("View full information")} <span aria-hidden="true">↗</span></span>
  </button>
 </article>;
}

function PersonDetails({ person, onClose, onStatus }) {
 const tr = usePortalTranslation();
 const dialog = useRef(null);
 useEffect(() => {
  const element = dialog.current;
  const previousFocus = document.activeElement;
  element.showModal();
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  return () => { element.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
 }, []);
 return <dialog ref={dialog} className="portal-person-dialog" aria-labelledby="attendee-dialog-title" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) { const rect = e.currentTarget.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) onClose(); } }}>
  <div className="portal-dialog-toolbar"><span className="portal-kicker">{tr("ATTENDEE INFORMATION")}</span><button type="button" className="portal-dialog-close" aria-label={tr("Close attendee details")} onClick={onClose} autoFocus>×</button></div>
  <div className="portal-person portal-person-detail"><div className="portal-person-title"><span className="portal-avatar">{person.name.slice(0, 1)}</span><div><h2 id="attendee-dialog-title">{person.name}</h2><a href={`mailto:${person.email}`} dir="ltr">{person.email}</a></div><span className={`portal-badge ${person.status === 'Confirmed' ? 'good' : ''}`}>{tr(person.status)}</span></div>
  <dl>{[['Phone', person.phone], ['City / address', person.city], ['Occupation', person.occupation], ['Organization', person.organization || '—'], ['Accessibility / notes', person.notes || 'None'], ['Payment', `${person.method} · ${tr(person.payment)} · ${tr("AFN")} ${person.amount.toLocaleString()}`], ['Reference', person.id.slice(0, 8).toUpperCase()], ['Registered', new Date(person.createdAt).toLocaleString()], ['Seminar', seminar.title], ['Date & time', seminar.date], ['Venue', seminar.venue]].map(([label, value]) => <div key={label}><dt>{tr(label)}</dt><dd>{tr(value)}</dd></div>)}</dl>
  <div className="portal-person-actions">{person.status === 'Waiting' && <button className="portal-primary" onClick={() => onStatus(person.id, 'Confirmed')}>{tr("Confirm seat")}</button>}{['Waiting', 'Confirmed'].includes(person.status) && <button className="portal-secondary" onClick={() => onStatus(person.id, 'Cancelled')}>{tr("Cancel registration")}</button>}</div></div>
 </dialog>;
}

export default function SeminarPortal({ route, language = 'en', setLanguage }) {
 const tr = portalTranslator(language);
 const locale = translations[language];
 const [selectedId, setSelectedId] = useState(null);
 const [data, setData] = useState(readData);
 const [notice, setNotice] = useState('');
 const [search, setSearch] = useState('');
 const [filter, setFilter] = useState('all');
 const [step, setStep] = useState(1);
 const [person, setPerson] = useState({});
 const [method, setMethod] = useState('HesabPay');
 const [outcome, setOutcome] = useState('success');
 const [busy, setBusy] = useState(false);
 const [receipt, setReceipt] = useState(null);
 const [playing, setPlaying] = useState(null);
 const isAdmin = route.startsWith('/admin');
 const page = route === '/admin/students' ? 'students' : route === '/admin/videos' ? 'videos' : 'registrations';
 useEffect(() => { setSelectedId(null); setNotice(''); setSearch(''); setFilter('all'); window.scrollTo(0, 0); }, [route]);
 useEffect(() => () => { if (playing) URL.revokeObjectURL(playing.url); }, [playing]);
 useEffect(() => { const sync = e => { if (e.key === KEY) setData(readData()); }; window.addEventListener('storage', sync); return () => window.removeEventListener('storage', sync); }, []);
 function save(next) { try { localStorage.setItem(KEY, JSON.stringify(next)); setData(next); return true; } catch { setNotice('Your browser could not save this change. Please free up storage and try again.'); return false; } }
 const confirmed = data.reservations.filter(r => r.status === 'Confirmed');
 const seats = seminar.capacity - confirmed.length;
 const students = [...new Map(confirmed.map(r => [r.email.toLowerCase(), r])).values()];
 function updateStatus(id, status) { const latest = readData(); if (status === 'Confirmed' && latest.reservations.filter(r => r.status === 'Confirmed').length >= seminar.capacity) { setNotice('This seminar is full.'); return; } save({ ...latest, reservations: latest.reservations.map(r => r.id === id ? { ...r, status } : r) }); }
 async function pay(e) {
  e.preventDefault(); setBusy(true); setNotice('');
  await new Promise(resolve => setTimeout(resolve, 1400));
  const latest = readData();
  if (latest.reservations.filter(r => r.status === 'Confirmed').length >= seminar.capacity) { setNotice('This seminar is full. Please contact the organizer.'); setBusy(false); return; }
  const payment = outcome === 'success' ? 'Paid (demo)' : 'Failed (demo)';
  const item = { ...person, id: crypto.randomUUID(), createdAt: new Date().toISOString(), method, payment, amount: seminar.price, status: outcome === 'success' ? 'Waiting' : 'Payment failed' };
  if (latest.reservations.some(r => r.email.toLowerCase() === person.email.toLowerCase() && !['Cancelled', 'Payment failed'].includes(r.status))) { setNotice('This email already has an active reservation. The administrator can review it.'); setBusy(false); return; }
  if (save({ ...latest, reservations: [item, ...latest.reservations] })) { if (outcome === 'success') { setReceipt(item); setStep(3); } else { setNotice('Demo payment declined. Your failed attempt is visible to the administrator. Choose success to retry.'); } }
  setBusy(false);
 }
 async function upload(e) {
  e.preventDefault(); const form = e.currentTarget; const fields = new FormData(form); const file = fields.get('video');
  if (!file?.size || !file.type.startsWith('video/')) { setNotice('Choose a valid video file.'); return; }
  if (file.size > 250 * 1024 * 1024) { setNotice('Please choose a video smaller than 250 MB.'); return; }
  setBusy(true);
  try { const id = crypto.randomUUID(); await videoStore('readwrite', store => store.put(file, id)); if (save({ ...readData(), videos: [...readData().videos, { id, title: fields.get('title').trim(), series: fields.get('series'), filename: file.name, size: file.size }] })) { form.reset(); setNotice('Video uploaded to this browser’s series library.'); } }
  catch { setNotice('Video could not be stored. Check your browser storage and try again.'); } finally { setBusy(false); }
 }
 async function play(video) { if (video.sample) { setNotice(`“${video.title}” is a fictional sample lesson. Upload a video to this series to preview real content.`); window.scrollTo(0, 0); return; } try { const file = await videoStore('readonly', store => store.get(video.id)); if (!file) throw new Error(); setPlaying({ title: video.title, url: URL.createObjectURL(file) }); } catch { setNotice('This video file is unavailable in this browser.'); } }
 const matches = r => `${r.name} ${r.email} ${r.phone}`.toLowerCase().includes(search.toLowerCase());
 return <PortalLanguageContext.Provider value={language}><main id="main" className="portal" dir={locale.dir} lang={locale.lang}>
  <div className="portal-top"><a href="#home" className="portal-brand">{tr("JR")}<span>{tr("JAMSHID RASA")}<small>{tr("Learning & personal growth")}</small></span></a><div className="portal-top-actions"><label className="portal-language"><Icon name="globe"/><span className="portal-language-label">{tr("Language")}</span><CustomSelect aria-label="Language / ژبه / زبان" value={language} onChange={e => setLanguage(e.target.value)}>{Object.entries(languages).map(([code,label]) => <option key={code} value={code}>{label}</option>)}</CustomSelect></label><a href="#/seminars">{tr("Reserve a seat ↗")}</a><a href="#/admin">{tr("Admin demo ↗")}</a></div></div>
  <div className="portal-demo">{tr("INTERACTIVE DEMO")} <span>{tr("Data stays in this browser. Payments are simulated; no money is transferred. Admin access is open for preview. Seeded attendees and lessons are fictional.")}</span></div>
  <div className={isAdmin ? 'portal-layout' : 'portal-public'}>
   {isAdmin && <nav className="portal-tabbar" aria-label={tr("Admin navigation")}>
    {[
     ['registrations', '/admin', 'book', 'Seminar registrations'],
     ['students', '/admin/students', 'people', 'Students'],
     ['videos', '/admin/videos', 'play', 'Video series'],
    ].map(([key, path, icon, label]) => <a key={key} href={`#${path}`} aria-current={page === key ? 'page' : undefined}>
     {icon === 'people' ? <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M21 20v-2a6 6 0 0 0-3-5"/></svg> : <Icon name={icon}/>}
     <span>{tr(label)}</span>
    </a>)}
   </nav>}
   <div className="portal-content">
    {notice && <div className="portal-notice" role="status">{tr(notice)}</div>}
    {isAdmin ? <>
     <p className="portal-kicker">{tr("YOUR COMMUNITY /")} {tr(page.toUpperCase())}</p><div className="portal-heading"><div><h1>{page === 'registrations' ? tr("People, before everything.") : page === 'students' ? tr("Your growing community.") : tr("Knowledge worth sharing.")}</h1><p>{page === 'registrations' ? tr("Review seminar sign-ups, payment attempts, and the people waiting for a seat.") : page === 'students' ? tr("Confirmed seminar attendees, brought together in one place.") : tr("Organize your lessons into series and upload videos for each one.")}</p></div><span className="portal-seal">{tr("JR")}<br/><small>{tr("ADMIN SPACE")}</small></span></div>
     {page === 'registrations' && <><div className="portal-event"><div><p className="portal-kicker">{tr("UPCOMING SEMINAR · DEMO EVENT")}</p><h2>{tr(seminar.title)}</h2><p>{tr(seminar.date)} · {tr(seminar.venue)}</p></div><div><strong>{data.reservations.filter(r => r.status === 'Waiting').length}</strong><span>{tr("people waiting")}</span></div><div><strong>{seats}<small> / {seminar.capacity}</small></strong><span>{tr("seats available")}</span></div></div><div className="portal-toolbar"><Field label={tr("Search attendees")} type="search" placeholder={tr("Name, email or phone…")} value={search} onChange={e => setSearch(e.target.value)}/><label className="portal-field">{tr("Status")}<CustomSelect aria-label={tr("Status")} value={filter} onChange={e => setFilter(e.target.value)}>{['all', 'Waiting', 'Confirmed', 'Payment failed', 'Cancelled'].map(s => <option key={s} value={s}>{tr(s === 'all' ? 'All registrations' : s)}</option>)}</CustomSelect></label></div><div className="portal-registrations">{data.reservations.filter(matches).filter(r => filter === 'all' || r.status === filter).map(r => <PersonCard key={r.id} person={r} onOpen={() => setSelectedId(r.id)}/>)}{!data.reservations.filter(matches).filter(r => filter === 'all' || r.status === filter).length && <div className="portal-empty"><span>↗</span><h2>{data.reservations.length ? tr("No matching registrations") : tr("Your next chapter starts with a seat.")}</h2><p>{data.reservations.length ? tr("Try another search or status.") : tr("New reservations and payment attempts will appear here.")}</p><a className="portal-primary" href="#/seminars">{tr("Try a seminar reservation")}</a></div>}</div></>}
     {page === 'students' && <><div className="portal-stat"><strong>{students.length}</strong><div><h2>{tr("Total students")}</h2><p>{tr("Unique attendees with a confirmed seat ·")} {confirmed.length} {tr("confirmed reservations")}</p></div></div><Field label={tr("Find a student")} type="search" placeholder={tr("Search name, email or phone…")} value={search} onChange={e => setSearch(e.target.value)}/><div className="portal-students">{students.filter(matches).map(r => <PersonCard key={r.id} person={r} student onOpen={() => setSelectedId(r.id)}/>)}</div>{!students.filter(matches).length && <div className="portal-empty"><h2>{students.length ? tr("No matching students") : tr("Welcome your first student.")}</h2><p>{tr("Confirm a paid reservation in Seminar registrations to add an attendee here.")}</p></div>}</>}
     {page === 'videos' && <><div className="portal-video-forms"><form className="portal-card" onSubmit={e => { e.preventDefault(); const form = e.currentTarget; const fields = new FormData(form); if (save({ ...data, series: [...data.series, { id: crypto.randomUUID(), name: fields.get('name').trim(), description: fields.get('description').trim() }] })) { form.reset(); setNotice('Series created. You can now upload its first lesson.'); } }}><p className="portal-kicker">{tr("01 / ORGANIZE")}</p><h2>{tr("Create a series")}</h2><Field label={tr("Series name")} name="name" required maxLength={100}/><Field label={tr("Description")} name="description" required maxLength={300}/><button className="portal-secondary">{tr("Create series +")}</button></form><form className="portal-card" onSubmit={upload}><p className="portal-kicker">{tr("02 / SHARE")}</p><h2>{tr("Upload a lesson")}</h2><Field label={tr("Lesson title")} name="title" required maxLength={120}/><label className="portal-field">{tr("Series")}<CustomSelect name="series" aria-label={tr("Series")}>{data.series.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</CustomSelect></label><Field label={tr("Video file · up to 250 MB")} type="file" name="video" accept="video/*" required/><button className="portal-primary" disabled={busy}>{busy ? tr("Saving video…") : tr("Upload video ↑")}</button></form></div>{data.series.map(s => <section className="portal-series" key={s.id}><div><h2>{s.name}</h2><p>{s.description}</p><span className="portal-kicker">{data.videos.filter(v => v.series === s.id).length} {tr("LESSONS")}</span></div>{data.videos.filter(v => v.series === s.id).map((v, index) => <div className="portal-lesson" key={v.id}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{v.title}</h3><small>{tr(v.filename)} · {v.sample ? tr("Demo record") : `${(v.size / 1024 / 1024).toFixed(1)} MB`}</small></div><button className="portal-secondary" onClick={() => play(v)}>{v.sample ? tr("Sample info") : tr("Play ▷")}</button></div>)}</section>)}{playing && <section className="portal-card"><div className="portal-heading"><h2>{playing.title}</h2><button className="portal-secondary" onClick={() => setPlaying(null)}>{tr("Close player")}</button></div><video key={playing.url} src={playing.url} controls autoPlay className="portal-player"/></section>}</>}
    </> : <><p className="portal-kicker">{tr("MAKE ROOM FOR GROWTH / SEMINARS")}</p><div className="portal-heading"><div><h1>{tr("A seat today.")}<br/>{tr("A new perspective tomorrow.")}</h1><p>{tr("Join Jamshid Rasa for an afternoon of reflection, learning, and meaningful connection.")}</p></div></div><div className="portal-reserve-grid"><aside className="portal-seminar"><span className="portal-kicker">{tr("DEMO SEMINAR · IN PERSON")}</span><div className="portal-art">✳</div><h2>{tr(seminar.title)}</h2><p>{tr(seminar.date)}</p><p>{tr(seminar.venue)}</p><hr/><div className="portal-price">{tr("AFN")} {seminar.price.toLocaleString()}<small>{tr("per person")}</small></div><p>{seats} {tr("seats available ·")} {seminar.capacity} {tr("total")}</p><p className="portal-fine">{tr("Reservation requests are reviewed by the administrator. Successful demo payment places you in the waiting queue; your seat is confirmed after review.")}</p></aside><section className="portal-card"><ol className="portal-steps">{['Your details', 'Demo payment', 'Reservation'].map((s, i) => <li key={s} aria-current={step === i + 1 ? 'step' : undefined}>{i + 1}. {tr(s)}</li>)}</ol>{step === 1 && <form className="portal-form" onSubmit={e => { e.preventDefault(); const fields = Object.fromEntries([...new FormData(e.currentTarget)].map(([key,value]) => [key, typeof value === 'string' ? value.trim() : value])); if (['name','email','phone','city','occupation'].some(key => !fields[key])) { setNotice('Please complete all required attendee details.'); return; } setPerson(fields); setStep(2); setNotice(''); }}><h2>{tr("Let’s save your place.")}</h2><p>{tr("Enter the attendee’s information. Use fictional details for this demo.")}</p><div className="portal-form-grid"><Field label={tr("Full name")} name="name" required maxLength={100} defaultValue={person.name}/><Field label={tr("Email address")} name="email" type="email" required maxLength={150} defaultValue={person.email}/><Field label={tr("Phone / WhatsApp")} name="phone" type="tel" placeholder="+93 700 000 000" pattern="[+0-9 ()-]{7,20}" required defaultValue={person.phone}/><Field label={tr("City / address")} name="city" required maxLength={180} defaultValue={person.city}/><Field label={tr("Occupation / student status")} name="occupation" required maxLength={100} defaultValue={person.occupation}/><Field label={tr("Organization / university (optional)")} name="organization" maxLength={120} defaultValue={person.organization}/></div><label className="portal-field">{tr("Accessibility needs or notes (optional)")}<textarea name="notes" maxLength={500} defaultValue={person.notes}/></label><label className="portal-consent"><input type="checkbox" required/>{tr("I agree to share these details with the seminar organizer for registration and contact.")}</label><button className="portal-primary" disabled={seats <= 0}>{seats <= 0 ? tr("Seminar full") : tr("Continue to demo payment →")}</button></form>}{step === 2 && <form className="portal-form" onSubmit={pay}><h2>{tr("A preview of your payment.")}</h2><p>{tr("For")} {person.name} · {person.email}</p><div className="portal-payment-options">{['HesabPay', 'Visa'].map(m => <button type="button" key={m} aria-pressed={method === m} disabled={busy} onClick={() => setMethod(m)}><span className="portal-payment-brand">{m === 'HesabPay' && <img src={hesabPayIcon} alt="" className="portal-hesabpay-icon"/>}{m === 'Visa' ? tr("VISA") : tr("HesabPay")}</span><small>{m === 'Visa' ? tr("Demo card checkout") : tr("Demo wallet checkout")}</small></button>)}</div><div className="portal-notice">{tr("Test payment only. No real card, wallet PIN, or payment details are needed.")}</div><div className="portal-test-account">{method === 'Visa' ? tr("Demo card · 4242 4242 4242 4242 · 12/30") : tr("Demo HesabPay wallet · +93 700 000 000")}</div><label className="portal-field">{tr("Simulate payment result")}<CustomSelect aria-label={tr("Simulate payment result")} value={outcome} onChange={e => setOutcome(e.target.value)}><option value="success">{tr("Successful payment")}</option><option value="failed">{tr("Declined payment")}</option></CustomSelect></label><div className="portal-total"><span>{tr("1 seminar seat")}</span><strong>{tr("AFN")} {seminar.price.toLocaleString()}</strong></div><button type="submit" className={`portal-primary portal-buy-button ${method === 'HesabPay' ? 'portal-buy-hesabpay' : ''}`} disabled={busy} aria-busy={busy}>{method === 'HesabPay' && <><img src={hesabPayIcon} alt="" className="portal-hesabpay-icon"/><span className="portal-buy-provider">HesabPay</span></>}<span>{busy ? tr("Processing demo payment…") : tr(`Simulate payment · AFN ${seminar.price.toLocaleString()}`)}</span></button><button type="button" className="portal-secondary" disabled={busy} onClick={() => setStep(1)}>{tr("← Edit attendee details")}</button></form>}{step === 3 && receipt && <div className="portal-receipt" role="status"><span className="portal-receipt-mark">✓</span><p className="portal-kicker">{tr("RESERVATION REQUEST RECEIVED")}</p><h2>{tr("You’re on the waiting list.")}</h2><p>{tr("Thank you,")} {receipt.name}{tr(". Your simulated payment succeeded. The administrator can now review and confirm your seat.")}</p><div className="portal-total"><span>{tr("Reference")}</span><strong>{receipt.id.slice(0, 8).toUpperCase()}</strong></div><p>{tr(seminar.title)}<br/>{tr(seminar.date)}<br/>{receipt.method} {tr("· AFN")} {receipt.amount} {tr("· Paid (demo)")}</p><a className="portal-primary" href="#/admin">{tr("View reservation in admin →")}</a><button className="portal-secondary" onClick={() => { setPerson({}); setStep(1); setReceipt(null); }}>{tr("Make another reservation")}</button></div>}</section></div></>}
   </div>
  </div>{selectedId && data.reservations.find(r => r.id === selectedId) && <PersonDetails person={data.reservations.find(r => r.id === selectedId)} onClose={() => setSelectedId(null)} onStatus={updateStatus}/>}<div className="portal-bottom">{tr("JAMSHID RASA")} <span>{tr("A space to learn. A reason to grow.")}</span></div>
 </main></PortalLanguageContext.Provider>;
}
