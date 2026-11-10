const paths = {
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></>,
  youtube: <><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/></>,
  facebook: <path d="M14 22V13h3l.5-4H14V6.5c0-1 .5-1.5 1.5-1.5H18V1h-3c-4 0-5 2.5-5 5v3H7v4h3v9"/>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  diagonal: <><path d="M6 18 18 6M6 6h12v12" /></>,
  play: <path d="m9 5 11 7-11 7z" />,
  book: <><path d="m3 5 9 4 9-4v15l-9 3-9-3zM12 9v14M12 1v3M5 1l2 3M19 1l-2 3" /></>,
  heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></>,
  chat: <><path d="M21 11a8 8 0 0 1-8 8H7l-5 3 2-6a8 8 0 1 1 17-5Z"/><path d="M8 10h8M8 14h5"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2"/></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
  pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>, close:<path d="m6 6 12 12M6 18 18 6"/>,
  globe:<><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></>,
  chevron:<path d="m6 9 6 6 6-6"/>, check:<path d="m5 12 4 4L19 6"/>,
  whatsapp:<path d="M17.5 14.4c-.3-.15-1.7-.84-1.96-.94s-.46-.15-.65.15-.74.94-.91 1.13-.34.22-.62.07a7.8 7.8 0 0 1-2.3-1.42 8.6 8.6 0 0 1-1.59-1.98c-.17-.29 0-.44.13-.58s.29-.34.43-.51.2-.29.29-.48a.53.53 0 0 0-.02-.51c-.07-.15-.65-1.57-.9-2.15-.23-.56-.47-.48-.65-.49h-.55a1.06 1.06 0 0 0-.77.36A3.23 3.23 0 0 0 6.5 9.5a5.6 5.6 0 0 0 1.18 2.98A12.8 12.8 0 0 0 12.6 17c.7.3 1.24.48 1.66.62a4 4 0 0 0 1.83.12c.56-.08 1.7-.7 1.94-1.37s.24-1.25.17-1.37-.26-.2-.55-.34ZM12.05 21.5A9.5 9.5 0 0 1 6.6 19.7l-.39-.23-4.05 1.06 1.08-3.95-.26-.4a9.51 9.51 0 1 1 9.07 5.32ZM12.05 2A10.5 10.5 0 0 0 3.2 17.78L1 23l5.34-1.4A10.5 10.5 0 1 0 12.05 2Z" stroke="none" fill="currentColor"/>
};
export default function Icon({name, className='', ...props}) {
 return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`icon ${className}`} {...props}>{paths[name] || paths.sun}</svg>;
}
