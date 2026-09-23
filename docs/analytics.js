(() => {
  'use strict';
  const key = 'umami.disabled';
  let excluded = false;
  let storageAvailable = true;
  let trackerReady = false;
  const config = window.NIUNIU_ANALYTICS || {};
  const configured = /^[a-f0-9-]{36}$/i.test(config.websiteId || '') &&
    config.scriptUrl === 'https://cloud.umami.is/script.js';
  const en = () => document.documentElement.lang === 'en';
  const tr = (zh, english) => en() ? english : zh;
  const doNotTrack = () => navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;
  try { excluded = localStorage.getItem(key) === '1'; }
  catch { storageAvailable = false; excluded = true; }
  // The exclusion bookmark runs before the first analytics request on this device.
  if (location.hash === '#exclude-stats') {
    excluded = true;
    try { localStorage.setItem(key, '1'); } catch { storageAvailable = false; }
    history.replaceState(null, '', location.pathname + location.search + '#analytics-preferences');
  }
  const allowed = () => !excluded && !doNotTrack() && location.hostname === 'tagraysl.github.io';
  function safePageUrl(raw) {
    const url = new URL(raw || location.href, location.origin);
    const query = new URLSearchParams();
    for (const name of ['utm_source', 'utm_medium', 'utm_campaign']) {
      const value = url.searchParams.get(name);
      if (value && /^[a-z0-9_-]{1,64}$/i.test(value)) query.set(name, value);
    }
    return url.pathname + (query.size ? '?' + query.toString() : '');
  }
  window.niuniuBeforeAnalytics = (_type, payload) => {
    if (!allowed()) return false;
    const result = { ...payload, url: safePageUrl(payload.url), title: 'NiuNiu website' };
    try { result.referrer = payload.referrer ? new URL(payload.referrer).origin : ''; }
    catch { result.referrer = ''; }
    return result;
  };
  function render() {
    const button = document.getElementById('analytics-toggle');
    const status = document.getElementById('analytics-status');
    if (!button || !status) return;
    button.textContent = excluded ? tr('允许此浏览器参与统计', 'Include this browser') : tr('排除此浏览器的访问', 'Exclude this browser');
    button.setAttribute('aria-pressed', String(excluded));
    button.disabled = !storageAvailable;
    status.textContent = !storageAvailable
      ? tr('浏览器无法保存偏好，本次访问不参与统计。', 'Preferences cannot be saved; this visit is excluded.')
      : excluded ? tr('此浏览器已排除。每台电脑、每个浏览器需分别设置。', 'This browser is excluded. Set this separately on each device and browser.')
      : doNotTrack() ? tr('已遵循浏览器的隐私偏好，停止统计。', 'Tracking is disabled by your browser privacy preference.')
      : !configured ? tr('访问统计尚未启用；可以提前排除此浏览器。', 'Analytics is not active yet; you can exclude this browser in advance.')
      : tr('统计访问与下载按钮点击，不采集你在演示中输入的内容。', 'Counts visits and download clicks, not text entered in the demo.');
  }
  function start() {
    if (!configured || !allowed() || document.getElementById('niuniu-tracker')) return;
    const script = document.createElement('script');
    script.id = 'niuniu-tracker'; script.src = config.scriptUrl; script.async = true;
    script.dataset.websiteId = config.websiteId;
    script.dataset.autoTrack = 'false';
    script.dataset.domains = 'tagraysl.github.io';
    script.dataset.beforeSend = 'niuniuBeforeAnalytics';
    script.dataset.doNotTrack = 'true';
    script.addEventListener('load', () => {
      trackerReady = typeof window.umami?.track === 'function';
      if (trackerReady && allowed()) window.umami.track();
    });
    document.head.append(script);
  }
  document.getElementById('analytics-toggle')?.addEventListener('click', () => {
    excluded = !excluded;
    try { if (excluded) localStorage.setItem(key, '1'); else localStorage.removeItem(key); }
    catch { excluded = true; storageAvailable = false; }
    render();
    // Reload only after explicitly opting back in, so one pageview is recorded.
    if (!excluded) location.reload();
  });
  addEventListener('storage', event => {
    if (event.key === key || event.key === null) {
      try { excluded = localStorage.getItem(key) === '1'; } catch { excluded = true; }
      render();
    }
  });
  addEventListener('hashchange', () => {
    if (location.hash !== '#exclude-stats') return;
    excluded = true;
    try { localStorage.setItem(key, '1'); } catch { storageAvailable = false; }
    history.replaceState(null, '', location.pathname + location.search + '#analytics-preferences');
    const panel = document.querySelector('#analytics-preferences details');
    if (panel) panel.open = true;
    render();
  });
  document.addEventListener('click', event => {
    if (!allowed() || !trackerReady) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.hostname !== 'github.com') return;
    const match = url.pathname.match(/^\/Tagraysl\/NiuNiu-Downloads\/releases\/download\/v([\d.]+)\/NiuNiu-[\d.]+-Windows-x64-Setup\.exe$/);
    if (!match) return;
    window.umami.track('download_click', { version: match[1], placement: link.closest('.hero') ? 'hero' : 'bottom' });
  }, { capture: true });
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  if (excluded && location.hash === '#analytics-preferences') {
    const panel = document.querySelector('#analytics-preferences details');
    if (panel) panel.open = true;
  }
  render(); start();
})();
