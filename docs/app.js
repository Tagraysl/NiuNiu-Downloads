(() => {
  let language = "zh";
  try { language = localStorage.getItem("niuniu-language") || (navigator.language.startsWith("zh") ? "zh" : "en"); } catch {}
  if (!['zh', 'en'].includes(language)) language = 'zh';
  const toggle = document.getElementById('language');
  const motion = document.getElementById('motion');
  const image = document.getElementById('carousel-image');
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function updateMotion() {
    image.src = paused ? 'images/carousel-1.png' : 'images/compact-carousel.gif';
    motion.textContent = language === 'zh' ? (paused ? '播放动图' : '暂停动图') : (paused ? 'Play animation' : 'Pause animation');
    motion.setAttribute('aria-pressed', String(paused));
  }
  function applyLanguage() {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-zh][data-en]').forEach(el => { el.innerHTML = el.dataset[language]; });
    document.title = language === 'zh' ? '牛牛 NiuNiu · 电脑状态与占用监控' : 'NiuNiu · Hardware & process monitoring';
    document.querySelector('meta[name="description"]').content = language === 'zh'
      ? '牛牛 NiuNiu：Windows 电脑状态与占用监控。查找高占用程序、查看硬件温度，在紧凑面板或任务栏持续看状态，并按需开启温度提醒。'
      : 'NiuNiu helps you find busy apps, watch hardware temperatures and keep useful readings in a compact panel or the Windows taskbar, with optional temperature alerts.';
    toggle.textContent = language === 'zh' ? 'English' : '中文';
    toggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
    document.getElementById('full-guide').href = 'https://github.com/Tagraysl/NiuNiu-Downloads/blob/main/README.' + (language === 'zh' ? 'zh-CN' : 'en') + '.md';
    const alts = language === 'zh' ? ['牛牛硬件仪表板，使用示例数据','紧凑模式双位置轮播，使用示例数据','自定义分组与子行编辑器','自选色盘'] : ['NiuNiu hardware dashboard with sample data','Compact two-slot carousel with sample data','Custom group and row editor','Custom color picker'];
    document.querySelectorAll('main img').forEach((img, i) => { img.alt = alts[i] || img.alt; });
    updateMotion();
  }
  toggle.addEventListener('click', () => { language = language === 'zh' ? 'en' : 'zh'; try { localStorage.setItem('niuniu-language', language); } catch {} applyLanguage(); });
  motion.addEventListener('click', () => { paused = !paused; updateMotion(); });
  applyLanguage();
})();

