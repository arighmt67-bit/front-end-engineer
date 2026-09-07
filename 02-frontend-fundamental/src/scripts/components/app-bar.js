/**
 * <app-bar brand="..." tagline="...">
 * Custom element untuk header aplikasi.
 * Custom attribute: brand, tagline (keduanya diobservasi & reaktif).
 */
class AppBar extends HTMLElement {
  static observedAttributes = ['brand', 'tagline'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get brand() {
    return this.getAttribute('brand') || 'Notes App';
  }

  get tagline() {
    return this.getAttribute('tagline') || '';
  }

  render() {
    this.classList.add('app-bar');
    this.setAttribute('role', 'banner');

    const initial = this.brand.trim().charAt(0).toUpperCase() || 'N';
    const tagline = this.tagline
      ? `<p class="app-bar__tagline">${this.tagline}</p>`
      : '';

    this.innerHTML = `
      <div class="app-bar__logo" aria-hidden="true">${initial}</div>
      <div>
        <h1 class="app-bar__brand">${this.brand}</h1>
        ${tagline}
      </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
