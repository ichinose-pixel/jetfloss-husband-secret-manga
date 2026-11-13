// Silent GIF-like loops. Pause off-screen and respect reduced motion.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const videos=[...document.querySelectorAll('.motion-demo video')];
function label(v){const b=v.closest('.motion-demo').querySelector('button');if(b){b.textContent=v.paused?'▶':'Ⅱ';b.setAttribute('aria-label',v.paused?'動画を再生する':'動画を一時停止する');}}
for(const v of videos){v.muted=true;v.defaultMuted=true;v.autoplay=!reduced.matches;if(reduced.matches)v.pause();const b=v.closest('.motion-demo').querySelector('button');b?.addEventListener('click',()=>{v.dataset.manualPause=v.paused?'0':'1';if(v.paused)v.play().catch(()=>{});else v.pause()});v.addEventListener('play',()=>label(v));v.addEventListener('pause',()=>label(v));}
const observer=new IntersectionObserver(entries=>entries.forEach(({target:v,isIntersecting})=>{v.dataset.visible=isIntersecting?'1':'0';if(isIntersecting&&!reduced.matches&&v.dataset.manualPause!=='1')v.play().catch(()=>{});else v.pause()}),{threshold:.35});videos.forEach(v=>observer.observe(v));
reduced.addEventListener('change',()=>videos.forEach(v=>{if(reduced.matches)v.pause();else if(v.dataset.visible==='1'&&v.dataset.manualPause!=='1')v.play().catch(()=>{});}));
