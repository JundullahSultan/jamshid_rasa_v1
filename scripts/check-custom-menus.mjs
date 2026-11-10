import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:1000}});page.setDefaultTimeout(10000);
const base=process.env.PREVIEW_URL||'http://127.0.0.1:5173/';
try {
 await page.goto(base+'#/admin');
 const language=page.getByRole('combobox',{name:'Language / ژبه / زبان'});
 await language.click(); await page.locator('[role=option][data-value="en"]').click();
 const status=page.getByRole('combobox',{name:'Status',exact:true});
 await status.focus();await page.keyboard.press('ArrowDown');await page.keyboard.press('End');await page.keyboard.press('Enter');
 assert.equal(await page.locator('.portal-registrations article').count(),2);
 assert.equal(await status.getAttribute('aria-expanded'),'false');
 await status.click();await page.keyboard.press('Escape');assert.equal(await page.getByRole('listbox').count(),0);
 assert.equal(await status.evaluate(e=>e===document.activeElement),true);
 await status.click();await page.locator('h1').click();assert.equal(await page.getByRole('listbox').count(),0);
 await status.focus();await page.keyboard.press('ArrowDown');await page.keyboard.press('Home');await page.keyboard.press('Enter');
 assert.equal(await page.locator('.portal-registrations article').count(),24);
 await status.focus();await page.keyboard.press('w');await page.keyboard.press('Enter');
 assert.equal(await page.locator('.portal-registrations article').count(),10);
 await page.goto(base+'/#/contact');
 const form=page.locator('.contact-form');
 await form.locator('[name=name]').fill('Demo Visitor');await form.locator('[name=phone]').fill('+93 700 123 456');
 const topic=form.getByRole('combobox');await topic.click();
 const topicText=await page.getByRole('option').nth(1).innerText();await page.getByRole('option').nth(1).click();
 assert.equal(await form.evaluate(f=>new FormData(f).get('topic')),topicText);
 await form.getByRole('button',{name:'Send message'}).click();
 assert.match(await form.locator('[role=status]').textContent(),/No message was sent/);
 assert.equal(await form.locator('[name=topic]').inputValue(),'');
 assert.equal(await topic.getAttribute('aria-expanded'),'false');
 for(const width of [360,768,1440]) {
  await page.setViewportSize({width,height:900});
  await page.goto(base+'#/admin');
  for(const lang of ['ps','prs','en']) {
   const control=page.getByRole('combobox',{name:'Language / ژبه / زبان'});
   await control.click();await page.locator(`[role=option][data-value="${lang}"]`).click();
   await control.click();
   const box=await page.getByRole('listbox').boundingBox();
   assert.ok(box.x>=0&&box.x+box.width<=width+1&&box.y>=0&&box.y+box.height<=900,`menu bounds ${width} ${lang}`);
   assert.equal(await page.getByRole('listbox').evaluate(e=>getComputedStyle(e).direction),lang==='en'?'ltr':'rtl');
   await page.keyboard.press('Escape');
  }
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'#/admin');
 await page.getByRole('combobox',{name:'Status',exact:true}).click();
 await page.screenshot({path:'test-results/custom-dropdown.png'});
 console.log('PASS: custom dropdown keyboard navigation, typeahead, Escape/outside close, filtering, form submission/reset, and menu bounds in 3 languages at 3 widths.');
}finally{await browser.close();}
