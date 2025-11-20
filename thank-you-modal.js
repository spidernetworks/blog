class ThankYouModal extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .modal-content {
          background-color: #1f2937;
          border-radius: 0.5rem;
          padding: 2rem;
          max-width: 400px;
          width: 90%;
          text-align: center;
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }
        .modal-overlay.active {
          opacity: 1;
          pointer-events: all;
        }
        .modal-overlay.active .modal-content {
          transform: translateY(0);
        }
        h2 {
          color: #8b5cf6;
          margin-bottom: 1rem;
          font-size: 1.5rem;
          font-weight: bold;
        }
        p {
          color: #e5e7eb;
          margin-bottom: 1.5rem;
        }
        button {
          background-color: #8b5cf6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-weight: medium;
          transition: background-color 0.2s;
        }
        button:hover {
          background-color: #7c3aed;
        }
        .icon {
          color: #8b5cf6;
          width: 3rem;
          height: 3rem;
          margin: 0 auto 1rem;
        }
      </style>
      <div class="modal-overlay">
        <div class="modal-content">
          <i data-feather="check-circle" class="icon"></i>
          <h2>Thank You, <span id="subscriberName"></span>!</h2>
          <p>We appreciate you joining our web. You'll receive our next newsletter soon.</p>
<button id="closeButton">Close</button>
        </div>
      </div>
    `;

    const overlay = this.shadowRoot.querySelector('.modal-overlay');
    const closeButton = this.shadowRoot.getElementById('closeButton');
    const overlay = this.shadowRoot.querySelector('.modal-overlay');

    closeButton.addEventListener('click', () => {
overlay.classList.remove('active');
    });

    // Initialize feather icons
    setTimeout(() => {
      if (window.feather) {
        window.feather.replace();
      }
    }, 100);
  }
  show(name = '') {
    const overlay = this.shadowRoot.querySelector('.modal-overlay');
    const nameSpan = this.shadowRoot.getElementById('subscriberName');
    nameSpan.textContent = name;
    overlay.classList.add('active');
}
}

customElements.define('thank-you-modal', ThankYouModal);