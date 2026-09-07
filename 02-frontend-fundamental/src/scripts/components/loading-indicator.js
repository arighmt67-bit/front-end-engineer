/**
 * <loading-indicator message="..." active>
 * Custom element indikator loading untuk setiap proses request HTTP.
 * Custom attribute: message (teks), active (tampil/tidak).
 */
class LoadingIndicator extends HTMLElement {
  static observedAttributes = ['message', 'active'];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  get message() {
    return this.getAttribute('message') || 'Memuat...';
  }

  get active() {
    return this.hasAttribute('active');
  }

  show(message) {
    if (message) this.setAttribute('message', message);
    this.setAttribute('active', '');
  }

  hide() {
    this.removeAttribute('active');
  }

  render() {
    this.classList.add('loading-indicator');
    this.setAttribute('role', 'status');
    this.setAttribute('aria-live', 'polite');
    this.hidden = !this.active;
    this.innerHTML = '';

    if (!this.active) return;

    const spinner = document.createElement('div');
    spinner.classList.add('loading-indicator__spinner');
    spinner.setAttribute('aria-hidden', 'true');

    const text = document.createElement('p');
    text.classList.add('loading-indicator__text');
    text.textContent = this.message;

    this.append(spinner, text);
  }
}

customElements.define('loading-indicator', LoadingIndicator);
