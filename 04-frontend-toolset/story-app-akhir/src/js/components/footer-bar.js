import { LitElement, html, css } from 'lit';

export class FooterBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: #0f172a;
      color: #94a3b8;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 3.5rem 1rem 2rem 1rem;
      margin-top: auto;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    .footer-container {
      max-width: 1140px;
      margin: 0 auto;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 2.5rem;
      margin-bottom: 2.5rem;
    }
    .brand-title {
      font-size: 1.5rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 0.75rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .brand-title span {
      background: linear-gradient(135deg, #4361ee, #4cc9f0);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .tagline {
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0;
      color: #cbd5e1;
    }
    .heading {
      color: #ffffff;
      font-size: 1.05rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
    }
    .tech-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .badge {
      background-color: rgba(255, 255, 255, 0.08);
      color: #38bdf8;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
      border: 1px solid rgba(56, 189, 248, 0.2);
    }
    .bottom-bar {
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      font-size: 0.85rem;
    }
    .author-link {
      color: #38bdf8;
      text-decoration: none;
      font-weight: 600;
    }
    .author-link:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <div class="footer-container">
        <div class="footer-grid">
          <div>
            <div class="brand-title">
              <span>📖 Story App</span>
            </div>
            <p class="tagline">
              Aplikasi media berbagi cerita visual modern yang dibangun dengan arsitektur Lit Web Components, Sass modular, dan Bootstrap 5 responsif.
            </p>
          </div>

          <div>
            <div class="heading">Teknologi Inti</div>
            <div class="tech-badges">
              <span class="badge">Lit v3</span>
              <span class="badge">Shadow DOM</span>
              <span class="badge">Sass @use</span>
              <span class="badge">Bootstrap 5</span>
              <span class="badge">Webpack 5</span>
              <span class="badge">i18n Ready</span>
            </div>
          </div>

          <div>
            <div class="heading">Pengembang</div>
            <p class="tagline">
              Dikerjakan oleh <a href="profile.html" class="author-link">Ari Rahmat Romadhon</a>. Kunjungi <a href="profile.html" class="author-link">Halaman Profil</a> untuk detail pengembang dan visi perusahaan.
            </p>
          </div>
        </div>

        <div class="bottom-bar">
          <div>&copy; ${new Date().getFullYear()} Story App. Seluruh hak cipta dilindungi.</div>
          <div>Koleksi Proyek Front-End Engineering</div>
        </div>
      </div>
    `;
  }
}
customElements.define('footer-bar', FooterBar);
