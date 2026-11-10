import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const baseUrl=process.env.PREVIEW_URL||'http://127.0.0.1:5173';
const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'chrome'});
const page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const results=[];
await mkdir('test-results',{recursive:true});
try {
 for(const lang of ['ps','prs','en']){
  await page.goto(baseUrl+'/');
  await page.locator('.language-picker [role=combobox]').click();
  await page.locator(`[role=option][data-value="${lang}"]`).click();
  for(const width of [360,390,430,768,1024,1440]){
   await page.setViewportSize({width,height:900});
   for(const route of ['#home','#/contact']){
    await page.goto(baseUrl+'/'+route);
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(100);
    const layout=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth,images:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src),font:document.fonts.check('16px "Noto Arabic"')}));
    assert.ok(layout.scroll<=width+1,`${lang} ${width} ${route}: overflow ${layout.scroll}`);
    assert.deepEqual(layout.images,[],`Broken images ${lang} ${width}`);
    if(lang!=='en')assert.equal(layout.font,true,`Arabic font failed: ${lang} ${width} ${route}`);
    results.push({lang,width,route,...layout});
    if(lang==='ps'&&[390,1440].includes(width))await page.screenshot({path:`test-results/${lang}-${width}-${route==='#home'?'home':'contact'}.png`,fullPage:true});
   }
  }
 }
 await page.setViewportSize({width:390,height:844});
 await page.goto(baseUrl+'/#home');
 await page.locator('.language-picker [role=combobox]').click();
 await page.locator('[role=option][data-value="en"]').click();
 await page.locator('.menu-toggle').click();
 assert.equal(await page.locator('#mobile-navigation').isVisible(),true);
 await page.locator('#mobile-navigation a[href="#videos"]').click();
 assert.equal(await page.locator('#mobile-navigation').count(),0);
 await page.getByRole('button',{name:'Mental Health',exact:true}).click();
 assert.equal(await page.locator('.video-card').count(),1);
 assert.equal(await page.locator('iframe').count(),0,'Embeds loaded before click');
 await page.locator('.video-cover').first().click();
 assert.equal(await page.locator('dialog').isVisible(),true);
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('dialog').isVisible(),false);
 await page.getByRole('button',{name:'All videos',exact:true}).click();
 assert.equal(await page.locator('.video-card').count(),4);
 const booking=page.locator('#consultation form');
 await booking.getByRole('button',{name:'Send message'}).click();
 await page.waitForTimeout(50);
 assert.match(await booking.locator('[role=status]').textContent(),/required/);
 await booking.locator('[name=name]').fill('Test Visitor');
 await booking.locator('[name=phone]').fill('abc');
 await booking.getByRole('combobox').click();
 await page.getByRole('option').nth(1).click();
 await booking.getByRole('button',{name:'Send message'}).click();
 assert.match(await booking.locator('[role=status]').textContent(),/required/);
 await booking.locator('[name=phone]').fill('+93 700 123 456');
 await booking.getByRole('button',{name:'Send message'}).click();
 assert.match(await booking.locator('[role=status]').textContent(),/No message was sent/);
 await page.locator('.whatsapp-link').first().click();
 assert.equal(await page.locator('.phone-pending').isVisible(),true);
 await page.locator('.pillar summary').first().click();
 assert.equal(await page.locator('.pillar details').first().getAttribute('open'),'');
 await page.goto(baseUrl+'/#/contact');
 await page.locator('.mobile-booking').click();
 await page.waitForTimeout(150);
 assert.equal(await page.locator('#consultation').count(),1,'Contact to consultation navigation failed');
 assert.deepEqual(errors,[],'Browser JavaScript errors');
 await writeFile('test-results/layout.json',JSON.stringify({layouts:results,interactionChecks:'passed',errors},null,2));
 console.log(`PASS: ${results.length} layouts, menu, filters, dialog, form validation, prototype submission, contact navigation, image and font checks.`);
} finally { await browser.close(); }
