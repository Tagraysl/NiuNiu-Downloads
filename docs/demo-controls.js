(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const panel=$('#hardware-panel'), app=$('.demo-app'), stage=$('.demo-stage');
  const tr=(a,b)=>document.documentElement.lang.startsWith('zh')?a:b;
  const defaults=()=>({width:1,main:true,chart:true,parameters:[true,true,true]});
  const settings={full:Array.from({length:4},defaults),compact:Array.from({length:4},defaults)};
  const mode=()=>stage.dataset.mode==='compact'?'compact':'full';
  let editing=-1, editingMode, baseline, thresholdBefore;
  const dialog=document.createElement('dialog');dialog.className='demo-dialog';document.body.append(dialog);
  const copy=x=>JSON.parse(JSON.stringify(x));
  const toolbar=document.createElement('div');toolbar.className='demo-layout-tools';
  toolbar.innerHTML='<label><span data-zh="演示窗口宽度" data-en="Demo window width">演示窗口宽度</span><input type="range" min="280" max="980" value="850" aria-label="Demo window width"></label><button type="button" data-zh="恢复演示" data-en="Reset demo">恢复演示</button>';
  $('.demo-toolbar').after(toolbar);
  const slider=toolbar.querySelector('input');
  slider.addEventListener('input',()=>app.style.width=slider.value+'px');
  toolbar.querySelector('button').onclick=()=>{
    settings.full=Array.from({length:4},defaults);settings.compact=Array.from({length:4},defaults);
    app.style.width='';slider.value=mode()==='compact'?350:850;
    $('#process-search').value='';$('#process-search').dispatchEvent(new Event('input'));apply();
  };
  document.querySelectorAll('button[data-mode]').forEach(b=>b.addEventListener('click',()=>{
    app.style.width='';slider.value=mode()==='compact'?350:850;toolbar.hidden=stage.dataset.mode==='taskbar';apply();
  }));
  function apply(){
    [...panel.children].forEach((card,i)=>{
      const s=settings[mode()][i];if(!s)return;
      card.style.gridColumn=mode()==='full'&&s.width>1?'1 / -1':'';
      card.querySelector('.metric-value').hidden=!s.main;
      card.querySelector('.metric-bar').hidden=!s.main;
      card.querySelectorAll('.metric-detail').forEach((el,n)=>el.hidden=!s.parameters[n]);
      card.querySelectorAll('.spark,.chart-label').forEach(el=>el.hidden=!s.chart);
      card.classList.toggle('demo-show-chart',s.chart);
      const old=card.querySelector('.metric-menu');
      if(old && old.tagName!=='BUTTON'){
        const b=document.createElement('button');b.type='button';b.className='metric-menu';b.textContent='⋯';
        b.setAttribute('aria-label',tr('模块设置：','Module settings: ')+card.querySelector('.metric-label b').textContent);
        b.onclick=()=>open(i);old.replaceWith(b);
      }
    });
    const widget=$('.task-widget');
    widget.title=[...widget.querySelectorAll('.task-reading')].map(x=>x.innerText.replace(/\n/g,' ')).join(' · ')+'\n'+tr('双击展开完整窗口','Double-click to open the full window');
  }
  function collect(){
    settings[editingMode][editing]={width:Number(dialog.querySelector('[name=width]').value),
      main:dialog.querySelector('[name=main]').checked,chart:dialog.querySelector('[name=chart]').checked,
      parameters:[0,1,2].map(i=>dialog.querySelector('[name=p'+i+']').checked)};
    const t=dialog.querySelector('[name=temperature]');
    if(t){$('#threshold').value=t.value;$('#threshold').dispatchEvent(new Event('input'));}
    apply();
  }
  function open(i){
    editing=i;editingMode=mode();baseline=copy(settings[editingMode][i]);thresholdBefore=$('#threshold').value;
    const s=baseline,card=panel.children[i];
    dialog.replaceChildren();
    const title=document.createElement('h3');title.textContent=tr('模块设置 · ','Module settings · ')+card.querySelector('.metric-label b').textContent;
    dialog.append(title);
    const note=document.createElement('p');note.textContent=tr('网页示例 · 应用预览，保存后关闭；取消恢复原设置。','Web demo · Apply to preview, save to close, or cancel to restore.');dialog.append(note);
    const width=document.createElement('label');width.textContent=tr('模块宽度 ','Module width ');
    const select=document.createElement('select');select.name='width';
    [tr('标准','Standard'),tr('铺满当前行','Fill current row')].forEach((text,n)=>{const o=document.createElement('option');o.value=n+1;o.textContent=text;select.append(o)});
    select.value=s.width;select.disabled=editingMode==='compact';width.append(select);dialog.append(width);
    function check(name,text,value){const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.name=name;input.checked=value;label.append(input,document.createTextNode(' '+text));dialog.append(label)}
    check('main',tr('显示大号主指标','Show primary reading'),s.main);
    const heading=document.createElement('h4');heading.textContent=tr('模块参数','Module parameters');dialog.append(heading);
    [...card.querySelectorAll('.metric-detail')].forEach((line,n)=>check('p'+n,line.textContent,s.parameters[n]));
    if(i===0){const label=document.createElement('label');label.textContent=tr('CPU 温度预警值 ','CPU temperature limit ');const input=document.createElement('input');input.name='temperature';input.type='range';input.min=45;input.max=95;input.step=5;input.value=thresholdBefore;const output=document.createElement('output');output.textContent=input.value+'°C';input.oninput=()=>output.textContent=input.value+'°C';label.append(input,output);dialog.append(label)}
    const curves=document.createElement('h4');curves.textContent=tr('模块曲线','Module charts');dialog.append(curves);
    check('chart',tr('显示趋势曲线','Show trend chart'),s.chart);
    const actions=document.createElement('div');actions.className='demo-dialog-actions';
    for(const [label,action] of [[tr('取消','Cancel'),()=>dialog.close()],[tr('应用设置','Apply'),collect],[tr('保存','Save'),()=>{collect();baseline=null;dialog.close()}]]){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=action;actions.append(b)}
    dialog.append(actions);dialog.showModal();
  }
  dialog.addEventListener('close',()=>{if(baseline){settings[editingMode][editing]=baseline;$('#threshold').value=thresholdBefore;$('#threshold').dispatchEvent(new Event('input'));apply()}baseline=null});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
  $('.task-widget').addEventListener('dblclick',()=>document.querySelector('button[data-mode=full]').click());
  document.addEventListener('niuniu-demo-render',apply);
  apply();
})();
