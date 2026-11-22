// ==========================================
// Taral Modi Portfolio - Interactive Features
// 1. Dynamic Copyright Year
// 2. Dark / Light Mode Toggle with Persistence
// 3. Mobile Hamburger Navigation Menu
// 4. Client-side Contact Form Validation
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dynamic Copyright Year ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- 2. Dark / Light Theme Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme');

  // Check saved theme or system preference
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    });
  }

  // --- 3. Mobile Navigation Menu Toggle ---
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggleBtn && mainNav) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggleBtn.classList.toggle('active', isOpen);
      menuToggleBtn.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close mobile nav when clicking any nav link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          menuToggleBtn.classList.remove('active');
          menuToggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // --- 4. Interactive Contact Form Validation ---
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form field values
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const subjectError = document.getElementById('subject-error');
      const messageError = document.getElementById('message-error');

      // Clear previous error messages & styles
      [nameError, emailError, subjectError, messageError].forEach(el => {
        if (el) el.textContent = '';
      });
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        if (input) input.classList.remove('input-error');
      });

      let isValid = true;

      // Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        if (nameError) nameError.textContent = 'Please enter your name (at least 2 characters).';
        if (nameInput) nameInput.classList.add('input-error');
        isValid = false;
      }

      // Validate Email with regex
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailPattern.test(emailVal)) {
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        if (emailInput) emailInput.classList.add('input-error');
        isValid = false;
      }

      // Validate Subject
      const subjectVal = subjectInput ? subjectInput.value.trim() : '';
      if (!subjectVal) {
        if (subjectError) subjectError.textContent = 'Please enter a subject.';
        if (subjectInput) subjectInput.classList.add('input-error');
        isValid = false;
      }

      // Validate Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal || messageVal.length < 10) {
        if (messageError) messageError.textContent = 'Message should be at least 10 characters long.';
        if (messageInput) messageInput.classList.add('input-error');
        isValid = false;
      }

      // Feedback display
      if (!isValid) {
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please correct the errors highlighted above before submitting.';
        }
        return;
      }

      // If valid, show success message and reset form
      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = `Thank you, ${nameVal}! Your message has been received. I will get back to you shortly.`;
      }

      contactForm.reset();

      // Automatically hide success notification after 6 seconds
      setTimeout(() => {
        if (formFeedback) {
          formFeedback.style.display = 'none';
        }
      }, 6000);
    });
  }
});
