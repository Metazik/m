const { chromium, devices } = require('playwright');
const B=process.env.BASE_URL||'http://localhost:3000', OUT=process.env.SHOTS;
const pages=['/','/solutions','/solutions/automatisation-ia','/solutions/sites-web','/solutions/marketing-digital','/solutions/solutions-metier','/a-propos','/contact','/devis','/mentions-legales','/confidentialite'];
(async()=>{
  const browser=await chromium.launch();
  let fails=0; const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m); if(!c) fails++;};
  for (const [name,ctxOpts] of [['desktop',{viewport:{width:1440,height:900}}],['mobile',{...devices['iPhone 13']}]]) {
    const ctx=await browser.newContext(ctxOpts); const page=await ctx.newPage();
    const errs=[]; page.on('pageerror',e=>errs.push(e.message)); page.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
    for (const p of pages) {
      await page.goto(B+p,{waitUntil:'networkidle'});
      const ov=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
      ok(ov<=0,`${name} ${p} no horizontal overflow (${ov})`);
      const wide=await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(e=>{if(e.closest('[aria-hidden]'))return false;const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.right>window.innerWidth+1||r.left<-1)&&getComputedStyle(e).position!=='absolute'}).slice(0,3).map(e=>e.tagName+'.'+(e.className.baseVal??e.className).slice(0,60)));
      ok(wide.length===0,`${name} ${p} no element past viewport ${wide.join(' | ')}`);
      const h1=await page.locator('h1').count(); ok(h1===1,`${name} ${p} exactly one h1 (${h1})`);
      if (OUT && ['/','/devis','/solutions/automatisation-ia'].includes(p)) await page.screenshot({path:`${OUT}/${name}${p.replace(/\//g,'_')||'_home'}.png`,fullPage:true});
    }
    ok(errs.length===0,`${name} no console errors ${errs.join(' | ')}`);
    await ctx.close();
  }
  // Mobile menu
  { const ctx=await browser.newContext({...devices['iPhone 13']}); const page=await ctx.newPage();
    await page.goto(B+'/'); await page.getByRole('button',{name:'Ouvrir le menu'}).click();
    await page.locator('#menu-mobile').getByRole('link',{name:'À propos'}).click();
    await page.waitForURL('**/a-propos'); ok(await page.locator('#menu-mobile').count()===0,'mobile menu navigates and closes'); await ctx.close(); }
  // Quote form
  const ctx=await browser.newContext({viewport:{width:1280,height:900}}); const page=await ctx.newPage();
  await page.goto(B+'/devis?service=site-web',{waitUntil:'networkidle'});
  ok(await page.locator('input[name=services][value=site-web]').isChecked(),'devis: service prefilled from URL');
  await page.waitForTimeout(2700);
  await page.fill('#name','Test Robot'); await page.fill('#email','pas-un-email');
  await page.getByRole('button',{name:/Envoyer ma demande/}).click();
  await page.getByText('Certains champs sont à corriger.').waitFor();
  ok(await page.getByText('Adresse e-mail invalide.').isVisible(),'devis: email error shown');
  ok(await page.getByText('Indiquez le nom de votre entreprise.').isVisible(),'devis: company error shown');
  ok(await page.locator('#name').inputValue()==='Test Robot','devis: values kept after error');
  ok(await page.locator('input[name=services][value=site-web]').isChecked(),'devis: services kept after error');
  await page.fill('#email','test@exemple.fr'); await page.fill('#company','Plomberie Test (essai)');
  await page.selectOption('#sector','plomberie'); await page.selectOption('#budget','1000-3000'); await page.selectOption('#timeline','1-mois');
  await page.fill('#message','Ceci est une demande de test automatisée pour vérifier le formulaire.');
  await page.locator('input[name=consent]').check();
  await page.getByRole('button',{name:/Envoyer ma demande/}).click();
  await page.getByText('Merci, votre demande est bien reçue.').waitFor({timeout:10000});
  ok(true,'devis: success message');
  // Contact form on home
  await page.goto(B+'/contact',{waitUntil:'networkidle'}); await page.waitForTimeout(2700);
  await page.fill('#name','Test Contact'); await page.fill('#email','contact@exemple.fr');
  await page.fill('#message','Bonjour, ceci est un message de test.'); await page.locator('input[name=consent]').check();
  await page.getByRole('button',{name:'Envoyer le message'}).click();
  await page.getByText('Message envoyé').waitFor({timeout:10000}); ok(true,'contact: success');
  await browser.close();
  console.log(fails?`${fails} FAILURES`:'ALL PASSED'); process.exit(fails?1:0);
})();
