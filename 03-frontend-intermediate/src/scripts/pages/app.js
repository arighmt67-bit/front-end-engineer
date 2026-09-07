import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { isLoggedIn, getUserName, removeAccessToken } from '../utils/auth';
import { startViewTransition } from '../utils';
import { isPushSupported, isSubscribed, subscribe, unsubscribe } from '../utils/push';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
    this.#setupSkipToContent();
    this.#setupOfflineBanner();
  }

  /** Indikator status koneksi untuk fitur sinkronisasi offline. */
  #setupOfflineBanner() {
    const banner = document.getElementById('offline-banner');
    if (!banner) return;

    const update = () => {
      banner.hidden = navigator.onLine;
    };

    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
  }

  /** Tombol toggle langganan push notification. */
  async #setupPushToggle() {
    const button = document.getElementById('push-toggle');
    if (!button) return;

    if (!isPushSupported()) {
      button.hidden = true;
      return;
    }

    const paint = (subscribed) => {
      button.textContent = subscribed ? 'Matikan Notifikasi' : 'Aktifkan Notifikasi';
      button.setAttribute('aria-pressed', String(subscribed));
    };

    let subscribed = false;
    try {
      subscribed = await isSubscribed();
    } catch {
      subscribed = false;
    }
    paint(subscribed);

    button.addEventListener('click', async () => {
      button.disabled = true;
      const previous = button.textContent;
      button.textContent = 'Memproses...';

      try {
        if (await isSubscribed()) {
          await unsubscribe();
          paint(false);
        } else {
          await subscribe();
          paint(true);
        }
      } catch (error) {
        button.textContent = previous;
        window.alert(error.message);
      } finally {
        button.disabled = false;
      }
    });
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      const isOpen = this.#navigationDrawer.classList.toggle('open');
      this.#drawerButton.setAttribute('aria-expanded', String(isOpen));
    });

    document.body.addEventListener('click', (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove('open');
        this.#drawerButton.setAttribute('aria-expanded', 'false');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
          this.#drawerButton.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /** Skip to content - kriteria 4 (Advance). */
  #setupSkipToContent() {
    const skipLink = document.getElementById('skip-link');
    if (!skipLink) return;

    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      this.#content.setAttribute('tabindex', '-1');
      this.#content.focus();
      this.#content.scrollIntoView({ behavior: 'smooth' });
    });
  }

  #renderAuthNav() {
    const authNav = document.getElementById('auth-nav');
    if (!authNav) return;

    if (isLoggedIn()) {
      const name = getUserName();
      authNav.innerHTML = `
        <li class="nav-user">Halo, ${name || 'Pengguna'}</li>
        <li><a href="#/add">Tambah Cerita</a></li>
        <li>
          <button type="button" id="push-toggle" class="btn-push" aria-pressed="false">
            Aktifkan Notifikasi
          </button>
        </li>
        <li><button type="button" id="logout-button" class="btn-logout">Keluar</button></li>
      `;

      this.#setupPushToggle();

      const logoutButton = document.getElementById('logout-button');
      logoutButton.addEventListener('click', () => {
        removeAccessToken();
        location.hash = '#/login';
        this.#renderAuthNav();
      });
    } else {
      authNav.innerHTML = `
        <li><a href="#/login">Masuk</a></li>
        <li><a href="#/register">Daftar</a></li>
      `;
    }
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url] || routes['/'];

    // View Transition API: transisi halaman kustom (kriteria 1 - Advance).
    await startViewTransition(async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    });

    this.#renderAuthNav();
    this.#updateActiveNav();
  }

  #updateActiveNav() {
    const current = location.hash || '#/';
    document.querySelectorAll('.nav-list a').forEach((link) => {
      if (link.getAttribute('href') === current) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }
}

export default App;
