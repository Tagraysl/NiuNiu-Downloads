(() => {
  'use strict';
  const $=s=>document.querySelector(s),app=$('.demo-app'),stage=$('.demo-stage'),panel=$('#hardware-panel'),widget=$('.task-widget');
  const tr=(a,b)=>document.documentElement.lang.startsWith('zh')?a:b;
  const dimensions={full:{width:850,height:440},compact:{width:350,height:480}};
  const mode=()=>stage.dataset.mode==='compact'?'compact':'full';
  const widthSlider=$('.demo-layout-tools input');
  const widthOutput=document.createElement('output');widthOutput.className='demo-width-value';widthSlider.after(widthOutput);
  let resizing=null,raf=0,inView=false,hover=false,page=0,rotation=true,lastWheel=0;
  app.classList.add('resizable-demo');
  function measure(){
    raf=0;
    const columns=Math.max(1,Math.min(4,Math.floor((panel.clientWidth+10)/(mode()==='compact'?250:190))));
    panel.style.gridTemplateColumns=`repeat(${columns},minmax(0,1fr))`;
    panel.dataset.columns=columns;
    widthOutput.textContent=Math.round(app.getBoundingClientRect().width)+' px';
    document.dispatchEvent(new Event('niuniu-demo-layout'));
    panel.querySelectorAll('.metric-detail').forEach(line=>{
      let text=line.firstElementChild;
      if(!text){text=document.createElement('span');text.textContent=line.textContent;line.replaceChildren(text)}
      const excess=text.scrollWidth-line.clientWidth;
      line.classList.toggle('rolling-detail',!line.hidden&&excess>2);
      line.style.setProperty('--roll-distance',`${-Math.max(0,excess)}px`);
    });
  }
  function schedule(){if(!raf)raf=requestAnimationFrame(measure)}
  function size(width,height){
    const available=Math.max(160,stage.clientWidth-parseFloat(getComputedStyle(stage).paddingLeft)-parseFloat(getComputedStyle(stage).paddingRight));
    const current=dimensions[mode()];
    current.width=Math.round(Math.max(Math.min(280,available),Math.min(width,available)));
    current.height=Math.round(Math.max(250,Math.min(height,640)));
    app.style.width=current.width+'px';app.style.height=current.height+'px';
    widthSlider.max=Math.floor(available);widthSlider.min=Math.min(280,Math.floor(available));widthSlider.value=current.width;
    schedule();
  }
  for(const direction of ['e','s','se']){
    const grip=document.createElement('button');grip.type='button';grip.className='demo-resize demo-resize-'+direction;
    const label=direction==='e'?['拖动右边缘调整宽度','Drag right edge to resize width']:direction==='s'?['拖动下边缘调整高度','Drag bottom edge to resize height']:['拖动右下角调整大小；方向键微调','Drag corner to resize; use arrow keys for small adjustments'];
    grip.dataset.zh=label[0];grip.dataset.en=label[1];grip.textContent=tr(...label);grip.title=tr(...label);
    grip.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();resizing={id:e.pointerId,x:e.clientX,y:e.clientY,w:app.offsetWidth,h:app.offsetHeight};grip.setPointerCapture(e.pointerId);app.classList.add('is-resizing')});
    grip.addEventListener('pointermove',e=>{if(!resizing||e.pointerId!==resizing.id)return;size(resizing.w+(direction.includes('e')?e.clientX-resizing.x:0),resizing.h+(direction.includes('s')?e.clientY-resizing.y:0))});
    for(const event of ['pointerup','pointercancel','lostpointercapture'])grip.addEventListener(event,()=>{resizing=null;app.classList.remove('is-resizing')});
    grip.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();size(app.offsetWidth+(e.key==='ArrowLeft'?-8:e.key==='ArrowRight'?8:0),app.offsetHeight+(e.key==='ArrowUp'?-8:e.key==='ArrowDown'?8:0))});
    app.append(grip);
  }
  widthSlider.addEventListener('input',()=>size(Number(widthSlider.value),app.offsetHeight));
  $('.demo-layout-tools button').addEventListener('click',()=>{dimensions.full={width:850,height:440};dimensions.compact={width:350,height:480};size(dimensions[mode()].width,dimensions[mode()].height)});
  const extras=[['SSD','0.8%'],[tr('下载','Down'),'6.8 MB/s'],[tr('上传','Up'),'0.4 MB/s']].map(([label,value],i)=>{
    const cell=document.createElement('span');cell.className='task-reading task-extra';
    const name=document.createElement('span');name.textContent=label;if(i){name.dataset.zh=i===1?'下载':'上传';name.dataset.en=i===1?'Down':'Up'}
    const reading=document.createElement('b');reading.textContent=value;cell.append(name,reading);widget.append(cell);return cell;
  });
  const originals=[...widget.querySelectorAll('.task-reading:not(.task-extra)')];
  const controls=document.createElement('div');controls.className='demo-task-controls';
  controls.innerHTML='<button type="button" data-zh="上一组" data-en="Previous">上一组</button><span class="task-page" aria-live="polite"></span><button type="button" data-zh="下一组" data-en="Next">下一组</button><label><input type="checkbox" checked><span data-zh="每 5 秒轮播" data-en="Rotate every 5 seconds">每 5 秒轮播</span></label><span data-zh="悬停或键盘聚焦时暂停 · 滚轮翻页 · 双击展开" data-en="Pauses on hover or focus · Scroll to switch · Double-click to expand">悬停或键盘聚焦时暂停 · 滚轮翻页 · 双击展开</span>';
  $('.demo-settings').before(controls);
  function showPage(next){page=(next+2)%2;originals.forEach(el=>el.hidden=page!==0);extras.forEach(el=>el.hidden=page!==1);controls.querySelector('.task-page').textContent=`${page+1} / 2`;widget.title=[...originals,...extras].map(el=>el.textContent).join(' · ')+'\n'+tr('双击展开完整窗口','Double-click to open full window')}
  controls.querySelectorAll('button')[0].onclick=()=>showPage(page-1);controls.querySelectorAll('button')[1].onclick=()=>showPage(page+1);
  controls.querySelector('input').onchange=e=>rotation=e.target.checked;
  widget.addEventListener('pointerenter',()=>hover=true);widget.addEventListener('pointerleave',()=>hover=false);
  widget.addEventListener('wheel',e=>{e.preventDefault();if(performance.now()-lastWheel<250||!e.deltaY)return;lastWheel=performance.now();showPage(page+(e.deltaY>0?1:-1))},{passive:false});
  widget.addEventListener('keydown',e=>{if(!['PageUp','PageDown'].includes(e.key))return;e.preventDefault();showPage(page+(e.key==='PageDown'?1:-1))});
  function modeChanged(){controls.hidden=stage.dataset.mode!=='taskbar';if(!controls.hidden)showPage(page);else size(dimensions[mode()].width,dimensions[mode()].height)}
  document.querySelectorAll('button[data-mode]').forEach(b=>b.addEventListener('click',modeChanged));
  function animationState(){stage.classList.toggle('demo-motion-paused',!inView||document.hidden||$('#motion').getAttribute('aria-pressed')==='true')}
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;animationState()}).observe(stage);
  $('#motion').addEventListener('click',animationState);document.addEventListener('visibilitychange',animationState);
  setInterval(()=>{if(stage.dataset.mode!=='taskbar'||!rotation||hover||!inView||document.hidden||widget===document.activeElement||controls.contains(document.activeElement)||$('#motion').getAttribute('aria-pressed')==='true'||matchMedia('(prefers-reduced-motion: reduce)').matches)return;showPage(page+1)},5000);
  new ResizeObserver(schedule).observe(panel);
  new ResizeObserver(()=>{if(stage.dataset.mode!=='taskbar')size(dimensions[mode()].width,dimensions[mode()].height)}).observe(stage);
  document.addEventListener('niuniu-demo-render',()=>{schedule();showPage(page)});
  new MutationObserver(()=>{schedule();showPage(page)}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  modeChanged();showPage(0);
})();
