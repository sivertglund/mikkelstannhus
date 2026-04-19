// ===== Mobile Navigation =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ===== Scroll Fade-in with Stagger =====
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const parent = entry.target.parentElement;
      const siblings = Array.from(parent.querySelectorAll(':scope > .fade-in'));
      const index = siblings.indexOf(entry.target);
      const delay = index >= 0 ? index * 120 : 0;

      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -60px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ===== Header: shrink + shadow on scroll =====
const header = document.querySelector('.header');

if (header) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 10) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = '';
    }
    lastScroll = scrollY;
  }, { passive: true });
}

// ===== Team Profile Expand/Collapse =====
document.querySelectorAll('.expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const bio = btn.previousElementSibling;
    const isOpen = bio.classList.contains('open');

    bio.classList.toggle('open');
    btn.setAttribute('aria-expanded', !isOpen);
    btn.firstChild.textContent = isOpen ? 'Les mer ' : 'Lukk ';
  });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Parallax-lite on hero image =====
const heroImg = document.querySelector('.hero-image img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < 800) {
      heroImg.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
  }, { passive: true });
}

// ===== Animate trust card numbers =====
const trustCards = document.querySelectorAll('.trust-card');
const trustObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      trustObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

trustCards.forEach(card => trustObserver.observe(card));

// ===== Service card icon bounce on scroll =====
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

serviceCards.forEach(card => serviceObserver.observe(card));

// ===== Parallax floating teeth on scroll =====
const floatingTeeth = document.querySelectorAll('.floating-tooth');
if (floatingTeeth.length > 0) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < 800) {
      floatingTeeth.forEach((tooth, i) => {
        const speed = 0.03 + (i * 0.01);
        const rotation = Math.sin(scrollY * 0.005 + i) * 5;
        tooth.style.transform = `translateY(${scrollY * speed}px) rotate(${rotation}deg)`;
      });
    }
  }, { passive: true });
}

// ===== Sparkle effect on service card hover =====
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const icon = card.querySelector('.service-icon');
    if (icon) {
      icon.style.animation = 'none';
      icon.offsetHeight; // trigger reflow
      icon.style.animation = '';
    }
  });
});
