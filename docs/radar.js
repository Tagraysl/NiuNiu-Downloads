(() => {
  'use strict';
  const repo = 'https://github.com/franklai-rise/NiuNiu-Radar-Downloads';
  const status = document.querySelector('#radar-status');
  const download = document.querySelector('#radar-download');
  let release;
  const zh = () => document.documentElement.lang.startsWith('zh');
  function render() {
    const asset = release?.assets?.find(a => /^NiuNiu-Radar-[\d.]+-Windows-x64-Setup\.exe$/i.test(a.name) &&
      a.browser_download_url?.startsWith(repo + '/releases/download/'));
    download.href = asset ? asset.browser_download_url : repo + '/releases/latest';
    download.textContent = asset ? (zh() ? '下载雷达版 ↗' : 'Download Radar ↗') : (zh() ? '查看最新发布 ↗' : 'View latest release ↗');
    status.textContent = asset ? `${release.tag_name} · Windows x64 · ${(asset.size / 1e6).toFixed(1)} MB` :
      (zh() ? '独立发布与更新 · 在 GitHub 查看最新安装包' : 'Independent releases and updates · Get the latest installer on GitHub');
  }
  render();
  new MutationObserver(render).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  fetch('https://api.github.com/repos/franklai-rise/NiuNiu-Radar-Downloads/releases/latest', {
    signal:controller.signal, credentials:'omit', headers:{Accept:'application/vnd.github+json'}
  }).then(r => {if (!r.ok) throw new Error('Release unavailable'); return r.json();})
    .then(data => {if (!data.draft && !data.prerelease) release=data; render();})
    .catch(() => {}).finally(() => clearTimeout(timeout));
})();
