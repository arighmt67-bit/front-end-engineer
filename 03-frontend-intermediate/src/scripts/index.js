// CSS imports
import '../styles/styles.css';

import App from './pages/app';
import { initAutoSync } from './utils/sync';

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker tidak didukung browser ini.');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register(
      `${import.meta.env.BASE_URL}sw.js`,
      { scope: import.meta.env.BASE_URL },
    );
    console.log('Service Worker terdaftar:', registration.scope);
  } catch (error) {
    console.error('Gagal mendaftarkan Service Worker:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });

  await registerServiceWorker();
  initAutoSync();
});
