import { Children, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import './CustomSelect.css';

// Keep a native form control for FormData, validation, and form.reset().
// The visible control and listbox provide the same styled menu on every device.
export default function CustomSelect({ children, value, defaultValue, onChange, disabled, id, ...props }) {
 const options = Children.toArray(children).filter(child => child?.type === 'option').map(child => ({
  value: String(child.props.value ?? child.props.children),
  label: child.props.children, disabled: !!child.props.disabled,
 }));
 const initial = String(defaultValue ?? options[0]?.value ?? '');
 const [localValue, setLocalValue] = useState(initial);
 const selectedValue = String(value ?? localValue);
 const selectedIndex = options.findIndex(option => option.value === selectedValue);
 const [open, setOpen] = useState(false);
 const [active, setActive] = useState(0);
 const [position, setPosition] = useState(null);
 const trigger = useRef(null), native = useRef(null), menu = useRef(null), typeahead = useRef({text:'', time:0});
 const generated = useId();
 const controlId = id || generated;
 const listId = `${controlId}-options`;
 const selected = options[selectedIndex];
 const enabled = options.map((option,index) => !option.disabled ? index : -1).filter(index => index >= 0);
 function show() { if(disabled || !enabled.length) return; setActive(enabled.includes(selectedIndex) ? selectedIndex : enabled[0]); setOpen(true); }
 function choose(index) {
  const option = options[index]; if(!option || option.disabled) return;
  if(value === undefined) setLocalValue(option.value);
  native.current.value = option.value;
  onChange?.({target:native.current,currentTarget:native.current,type:'change'});
  setOpen(false); trigger.current?.focus();
 }
 useEffect(() => {
  const form = native.current?.form;
  const reset = () => {setLocalValue(initial);setOpen(false);};
  form?.addEventListener('reset', reset);
  return () => form?.removeEventListener('reset', reset);
 }, [initial]);
 useEffect(() => {
  if(!open) return;
  const outside = event => {if(!trigger.current?.contains(event.target) && !menu.current?.contains(event.target)) setOpen(false);};
  document.addEventListener('pointerdown',outside);
  return () => document.removeEventListener('pointerdown',outside);
 }, [open]);
 useLayoutEffect(() => {
  if(!open) return;
  const update = () => {
   const rect = trigger.current.getBoundingClientRect();
   const width = Math.min(Math.max(rect.width,220),window.innerWidth-24);
   const below = window.innerHeight-rect.bottom-12;
   const above = rect.top-12;
   const flip = below<180 && above>below;
   const maxHeight = Math.max(60,Math.min(320,flip?above-8:below-8));
   const direction = getComputedStyle(trigger.current).direction;
   const left = Math.max(12,Math.min(direction==='rtl'?rect.right-width:rect.left,window.innerWidth-width-12));
   setPosition({position:'fixed',left,width,maxHeight,top:flip?undefined:rect.bottom+8,bottom:flip?window.innerHeight-rect.top+8:undefined,direction});
  };
  update(); window.addEventListener('resize',update);window.addEventListener('scroll',update,true);
  return () => {window.removeEventListener('resize',update);window.removeEventListener('scroll',update,true);};
 }, [open]);
 useEffect(() => { if(open) menu.current?.querySelector(`[id="${listId}-${active}"]`)?.scrollIntoView({block:'nearest'}); }, [open,active,listId]);
 function keyDown(event) {
  if(event.key==='Escape' && open) {event.preventDefault();event.stopPropagation();setOpen(false);return;}
  if(event.key==='Tab') {setOpen(false);return;}
  if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)) {
   event.preventDefault();
   if(!open) {show();return;}
   const at = enabled.indexOf(active);
   setActive(event.key==='Home'?enabled[0]:event.key==='End'?enabled.at(-1):enabled[(at+(event.key==='ArrowDown'?1:-1)+enabled.length)%enabled.length]);
  } else if(event.key==='Enter'||event.key===' ') {
   event.preventDefault(); if(open) choose(active);else show();
  } else if(event.key.length===1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
   const now=Date.now();typeahead.current.text=(now-typeahead.current.time>700?'':typeahead.current.text)+event.key.toLowerCase();typeahead.current.time=now;
   const match=enabled.find(index=>String(options[index].label).toLowerCase().startsWith(typeahead.current.text));
   if(match!==undefined) {event.preventDefault();setActive(match);setOpen(true);}
  }
 }
 return <span className="custom-select">
  <select {...props} ref={native} className="custom-select-native" disabled={disabled} value={selectedValue} aria-hidden="true" tabIndex={-1} onFocus={()=>trigger.current?.focus()} onInvalid={()=>trigger.current?.focus()} onChange={event=>{if(value===undefined)setLocalValue(event.target.value);onChange?.(event);}}>{children}</select>
  <button ref={trigger} id={controlId} type="button" role="combobox" className="custom-select-trigger" aria-label={props['aria-label']} aria-labelledby={props['aria-labelledby']} aria-haspopup="listbox" aria-controls={open?listId:undefined} aria-expanded={open} aria-activedescendant={open?`${listId}-${active}`:undefined} aria-required={props.required||undefined} disabled={disabled} onClick={()=>open?setOpen(false):show()} onKeyDown={keyDown}>
   <span className="custom-select-value">{selected?.label ?? options[0]?.label}</span><Icon name="chevron"/>
  </button>
  {open && position && createPortal(<div ref={menu} id={listId} role="listbox" aria-label={props['aria-label']} className="custom-select-menu" style={position} onMouseDown={event=>event.preventDefault()}>
   {options.map((option,index)=><div key={option.value} id={`${listId}-${index}`} role="option" data-value={option.value} aria-selected={selectedValue===option.value} aria-disabled={option.disabled||undefined} className={`custom-select-option ${index===active?'is-active':''}`} onPointerMove={()=>{if(!option.disabled)setActive(index);}} onClick={()=>choose(index)}><span className="custom-select-option-icon"><Icon name={selectedValue===option.value?'check':'chevron'}/></span><span>{option.label}</span></div>)}
  </div>,document.body)}
 </span>;
}
