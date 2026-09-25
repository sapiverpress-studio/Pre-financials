(async()=>{
  const parts=["/parts/body-01.html", "/parts/body-02.html", "/parts/body-03.html", "/parts/body-04.html"];
  const texts=await Promise.all(parts.map(async p=>{const r=await fetch(p); if(!r.ok) throw new Error(`Failed to load ${p}`); return r.text();}));
  document.getElementById('app').innerHTML=texts.join('');
  const script=document.createElement('script');
  script.src='/app.js';
  script.defer=true;
  document.body.appendChild(script);
})().catch(err=>{document.getElementById('app').innerHTML='<main style="font-family:system-ui;padding:2rem"><h1>Unable to load questionnaire</h1><p>Please refresh the page.</p></main>'; console.error(err);});
