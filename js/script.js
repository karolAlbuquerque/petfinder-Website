/* ============================================================
   PetFinder – Main Script
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    toggleBackToTop();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- FAQ Accordion ---------- */
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    const btn    = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(
    '.sobre__card, .recurso-card, .step, .phone-mockup, .faq__item, .section-header'
  );

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.hidden = false;
    } else {
      backToTop.hidden = true;
    }
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Waitlist form ---------- */
  const waitlistForm    = document.getElementById('waitlistForm');
  const waitlistSuccess = document.getElementById('waitlistSuccess');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name  = waitlistForm.querySelector('[name="name"]');
      const email = waitlistForm.querySelector('[name="email"]');

      if (!name.value.trim() || !email.value.trim()) {
        shakeForm(waitlistForm);
        return;
      }

      if (!isValidEmail(email.value)) {
        email.focus();
        email.style.borderColor = '#FF5722';
        setTimeout(function () { email.style.borderColor = ''; }, 2000);
        return;
      }

      // Simulate success (static site – no backend)
      waitlistForm.hidden = true;
      if (waitlistSuccess) waitlistSuccess.hidden = false;

      // In production, replace with fetch() to a form service like Formspree or EmailJS
    });
  }

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = contactForm.querySelector('[name="name"]');
      const email   = contactForm.querySelector('[name="email"]');
      const message = contactForm.querySelector('[name="message"]');

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        shakeForm(contactForm);
        return;
      }

      if (!isValidEmail(email.value)) {
        email.focus();
        highlightError(email);
        return;
      }

      const submitBtn = contactForm.querySelector('[type="submit"]');
      const original  = submitBtn.textContent;
      submitBtn.textContent = 'Mensagem enviada!';
      submitBtn.disabled    = true;
      submitBtn.style.background = '#4CAF50';

      setTimeout(function () {
        submitBtn.textContent  = original;
        submitBtn.disabled     = false;
        submitBtn.style.background = '';
        contactForm.reset();
      }, 3500);

      // In production, replace with fetch() to Formspree / EmailJS / Netlify Forms
    });
  }

  /* ---------- Helpers ---------- */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function highlightError(input) {
    input.style.borderColor = '#FF5722';
    input.style.boxShadow   = '0 0 0 3px rgba(255,87,34,0.15)';
    setTimeout(function () {
      input.style.borderColor = '';
      input.style.boxShadow   = '';
    }, 2500);
  }

  function shakeForm(form) {
    form.style.animation = 'none';
    form.offsetHeight; // reflow
    form.style.animation = 'shake 0.4s ease';
    setTimeout(function () { form.style.animation = ''; }, 400);
  }

  /* ---------- Add shake keyframes dynamically ---------- */
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-6px); }
      40%      { transform: translateX(6px); }
      60%      { transform: translateX(-4px); }
      80%      { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(shakeStyle);

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight : 0;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.navbar__links a[href^="#"]');

  function updateActiveNav() {
    const scrollY = window.scrollY + (navbar ? navbar.offsetHeight : 0) + 40;
    let current = '';

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollY) {
        current = '#' + section.id;
      }
    });

    navAnchors.forEach(function (a) {
      a.style.color = a.getAttribute('href') === current ? 'var(--orange)' : '';
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ---------- Init ---------- */
  onScroll();
  updateActiveNav();

})();
