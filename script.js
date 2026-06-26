/* ================================================
   QUACKENIO — script.js
   ================================================ */

// ── Hamburger menu toggle ──────────────────────
(function () {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
})();


// ── Mark active nav link ───────────────────────
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();


// ── Navbar scroll shadow ───────────────────────
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 4px 20px rgba(62, 31, 0, 0.3)'
      : '0 2px 12px rgba(62, 31, 0, 0.15)';
  }, { passive: true });
})();


// ── Contact form validation & submission ───────
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const msgEl = document.getElementById('form-message');

  function showMessage(text, type) {
    msgEl.textContent = text;
    msgEl.className   = 'form-message ' + type;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    if (!name) {
      showMessage('Por favor, ingresa tu nombre.', 'error');
      form.name.focus();
      return;
    }
    if (!validateEmail(email)) {
      showMessage('Por favor, ingresa un correo electrónico válido.', 'error');
      form.email.focus();
      return;
    }
    if (message.length < 10) {
      showMessage('El mensaje debe tener al menos 10 caracteres.', 'error');
      form.message.focus();
      return;
    }

    // Simulate successful submission
    const submitBtn = form.querySelector('.form-submit');
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Enviando…';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Enviar cuack-mensaje';
      showMessage('¡Gracias, ' + name + '! Tu mensaje fue enviado. ¡El pato está en camino! 🦆', 'success');
    }, 1200);
  });
})();


// ── Scroll-reveal animation ────────────────────
(function () {
  if (!('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll('.card, .menu-item, .info-block, .about-grid');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
