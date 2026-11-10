import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage(); page.setDefaultTimeout(10000);
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
const base=process.env.PREVIEW_URL||'http://127.0.0.1:5173/';
async function choose(control,value) {
 await control.click();
 await page.locator(`[role=option][data-value="${value}"]`).click();
}
const switcher=()=>page.getByRole('combobox',{name:'Language / ژبه / زبان'});
try {
 await page.goto(base+'#/admin'); await choose(switcher(),'en');
 await page.locator('.portal-notification').first().waitFor();
 assert.equal(await page.locator('.portal-registrations article').count(),24);
 assert.equal(await page.locator('.portal-badge').filter({hasText:'Waiting'}).count(),10);
 const firstCard=page.locator('.portal-notification').first();
 await firstCard.focus(); await page.keyboard.press('Enter'); await page.getByRole('dialog').waitFor();
 assert.match(await page.getByRole('dialog').textContent(),/Ahmad Safi/);
 assert.match(await page.getByRole('dialog').textContent(),/Demo Kabul University/);
 assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');
 await page.keyboard.press('Escape'); await page.getByRole('dialog').waitFor({state:'detached'});
 assert.equal(await firstCard.evaluate(e=>e===document.activeElement),true);
 await firstCard.click(); await page.getByRole('button',{name:'Close attendee details'}).click();
 await firstCard.click(); await page.mouse.click(5,5); await page.getByRole('dialog').waitFor({state:'detached'});
 await page.reload(); await page.locator('.portal-notification').first().waitFor();
 assert.equal(await page.locator('.portal-registrations article').count(),24);
 await page.goto(base+'#/admin/students'); await page.locator('.portal-students article').first().waitFor();
 assert.equal(await page.locator('.portal-students article').count(),10);
 await page.goto(base+'#/admin/videos'); await page.locator('.portal-series').first().waitFor();
 assert.equal(await page.locator('.portal-series').count(),10); assert.equal(await page.locator('.portal-lesson').count(),20);
 await page.getByRole('button',{name:'Sample info'}).first().click();
 await page.getByRole('status').filter({hasText:'fictional sample lesson'}).waitFor();
 await page.goto(base+'#/seminars');
 await page.getByLabel('Full name',{exact:true}).fill('Demo Student');
 await page.getByLabel('Email address').fill('student@example.com');
 await page.getByLabel('Phone / WhatsApp').fill('+93 700 123 456');
 await page.getByLabel('City / address').fill('Kabul');
 await page.getByLabel('Occupation / student status').fill('Student');
 await page.getByRole('checkbox').check();
 await page.getByRole('button',{name:'Continue to demo payment'}).click();
 assert.equal(await page.locator('.portal-payment-options img').evaluate(image=>image.complete&&image.naturalWidth>0),true,'HesabPay icon loads');
 await page.getByRole('button',{name:'VISA Demo card checkout'}).click();
 await choose(page.getByRole('combobox',{name:'Simulate payment result'}),'failed');
 await page.getByRole('button',{name:'Simulate payment ·'}).click();
 await page.getByText('Demo payment declined.',{exact:false}).waitFor();
 await page.getByRole('button',{name:'HesabPay Demo wallet checkout'}).click();
 assert.equal(await page.locator('.portal-buy-hesabpay').count(),1);
 await choose(page.getByRole('combobox',{name:'Simulate payment result'}),'success');
 await page.getByRole('button',{name:'Simulate payment ·'}).click();
 await page.getByRole('heading',{name:'You’re on the waiting list.'}).waitFor();
 assert.match(await page.locator('.portal-receipt').textContent(),/HesabPay/);
 await page.getByRole('link',{name:'View reservation in admin'}).click();
 await page.locator('.portal-notification').first().waitFor(); assert.equal(await page.locator('.portal-registrations article').count(),26);
 await page.locator('.portal-notification').first().click();
 await page.getByRole('button',{name:'Confirm seat'}).click();
 assert.match(await page.getByRole('dialog').textContent(),/Confirmed/);
 await page.getByRole('button',{name:'Close attendee details'}).click();
 await page.getByRole('navigation',{name:'Admin navigation'}).getByRole('link',{name:'Students',exact:false}).click();
 await page.locator('.portal-stat>strong').waitFor(); assert.equal(await page.locator('.portal-stat>strong').textContent(),'11');
 await page.reload(); await page.locator('.portal-students article').first().waitFor(); assert.equal(await page.locator('.portal-students article').count(),11);
 await page.getByRole('navigation',{name:'Admin navigation'}).getByRole('link',{name:'Video series',exact:false}).click();
 await page.getByLabel('Series name').fill('New test series'); await page.getByLabel('Description',{exact:true}).fill('Learn to focus');
 await page.getByRole('button',{name:'Create series +'}).click();
 await page.getByLabel('Lesson title').fill('First lesson'); await page.getByRole('combobox',{name:'Series',exact:true}).click(); await page.getByRole('option',{name:'New test series',exact:true}).click();
 await page.getByLabel('Video file').setInputFiles({name:'test.webm',mimeType:'video/webm',buffer:Buffer.from('test video storage')});
 await page.getByRole('button',{name:'Upload video'}).click(); await page.getByRole('heading',{name:'First lesson'}).waitFor();
 await page.reload(); await page.getByRole('button',{name:'Play ▷'}).click(); await page.locator('video').waitFor();
 assert.ok(await page.locator('video').getAttribute('src'));
 for(const width of [360,768,1440]) {
  await page.setViewportSize({width,height:900});
  for(const route of ['#/seminars','#/admin','#/admin/students','#/admin/videos']) {
   await page.goto(base+route); await page.locator('.portal').waitFor();
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`overflow ${width} ${route}`);
   if(route==='#/admin'||route==='#/admin/students') {
    await page.locator('.portal-notification').first().click(); await page.getByRole('dialog').waitFor();
    assert.ok(await page.getByRole('dialog').evaluate(e=>e.scrollWidth<=e.clientWidth+1));
    await page.keyboard.press('Escape');
   }
  }
 }
 for(const language of ['ps','prs','en']) {
  await choose(switcher(),language);
  assert.equal(await page.locator('html').getAttribute('dir'),language==='en'?'ltr':'rtl');
  assert.equal(await page.locator('.portal').getAttribute('lang'),language==='prs'?'fa-AF':language);
  for(const route of ['#/admin','#/admin/students','#/admin/videos','#/seminars']) {
   await page.goto(base+route); await page.locator('.portal').waitFor();
   assert.equal(await page.locator('.portal-language select').inputValue(),language);
   for(const width of [360,1440]) {
    await page.setViewportSize({width,height:900});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`translation overflow ${language} ${width} ${route}`);
   }
   if(route==='#/admin') {
    const headings={ps:'تر هر څه مخکې، خلک.',prs:'پیش از هر چیز، آدم‌ها.',en:'People, before everything.'};
    assert.equal(await page.locator('h1').textContent(),headings[language]);
    await page.locator('.portal-notification').first().click();
    const modal=page.getByRole('dialog'); await modal.waitFor();
    assert.match(await modal.textContent(),language==='ps'?/د ګډونوال معلومات/:language==='prs'?/اطلاعات شرکت‌کننده/:/ATTENDEE INFORMATION/);
    await page.keyboard.press('Escape');
   }
   if(route==='#/admin/videos') assert.equal(await page.locator('.portal-video-forms h2').first().textContent(),language==='ps'?'یوه لړۍ جوړه کړئ':language==='prs'?'ایجاد مجموعه':'Create a series');
  }
  await page.reload(); assert.equal(await page.locator('.portal-language select').inputValue(),language);
 }
 assert.deepEqual(errors,[]);
 console.log('PASS: seeded records; card popups and keyboard/focus behavior; payments; confirmations; students; persistent video uploads; 12 responsive layouts; Pashto/Dari/English switching, persistence, translated popups/forms and 24 translated layouts.');
} finally {await browser.close();}
