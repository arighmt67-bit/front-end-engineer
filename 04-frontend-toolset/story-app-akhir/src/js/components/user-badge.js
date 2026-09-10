import { LitElement, html, css } from 'lit';

export class UserBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .badge-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4361ee, #4cc9f0);
      color: #ffffff;
      font-weight: 700;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      box-shadow: 0 4px 10px rgba(67, 97, 238, 0.25);
      border: 2px solid #ffffff;
      transition: transform 0.2s ease;
      cursor: default;
      user-select: none;
    }
    .badge-avatar:hover {
      transform: scale(1.1);
    }
  `;

  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = 'User';
  }

  get initials() {
    if (!this.name) return 'U';
    const parts = this.name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  }

  render() {
    return html`
      <div class="badge-avatar" title="${this.name}">
        ${this.initials}
      </div>
    `;
  }
}
customElements.define('user-badge', UserBadge);
