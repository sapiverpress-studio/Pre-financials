(async()=>{
  const bodyParts=["/parts/body-01.html", "/parts/body-02.html", "/parts/body-03.html", "/parts/body-04.html", "/parts/body-05.html", "/parts/body-06.html", "/parts/body-07.html", "/parts/body-08.html"];
  const bodyTexts=await Promise.all(bodyParts.map(async p=>{const r=await fetch(p); if(!r.ok) throw new Error(`Failed to load ${p}`); return r.text();}));
  document.getElementById('app').innerHTML=bodyTexts.join('');
  const jsParts=["/js/app-01.txt", "/js/app-02.txt", "/js/app-03.txt", "/js/app-04.txt", "/js/app-05.txt", "/js/app-06.txt"];
  const jsTexts=await Promise.all(jsParts.map(async p=>{const r=await fetch(p); if(!r.ok) throw new Error(`Failed to load ${p}`); return r.text();}));
  const blob=new Blob([jsTexts.join('')],{type:'text/javascript'});
  const url=URL.createObjectURL(blob);
  const script=document.createElement('script');
  script.src=url;
  script.onload=()=>URL.revokeObjectURL(url);
  document.body.appendChild(script);
})().catch(err=>{document.getElementById('app').innerHTML='<main style="font-family:system-ui;padding:2rem"><h1>Unable to load questionnaire</h1><p>Please refresh the page.</p></main>'; console.error(err);});
