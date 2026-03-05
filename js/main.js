/**
 * IVY SPA STUDIO - Main JavaScript
 * Vanilla JS - works on all pages without jQuery
 */

document.addEventListener('DOMContentLoaded', function() {
  initNav();
  initScrollAnimations();
  initGalleryFilter();
  initLightbox();
  initSmoothScroll();
  initLandingEffects();
});

// Sticky Nav & Mobile Menu
function initNav() {
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('active');
      toggle.classList.toggle('active');
      document.body.classList.toggle('nav-open', links.classList.contains('active'));
    });

    document.querySelectorAll('.nav__link').forEach(function(link) {
      link.addEventListener('click', function() {
        links.classList.remove('active');
        toggle.classList.remove('active');
        document.body.classList.remove('nav-open');
      });
    });
  }

  window.addEventListener('scroll', function() {
    if (nav) {
      nav.style.boxShadow = window.scrollY > 50
        ? '0 4px 30px rgba(0, 0, 0, 0.4)'
        : '0 2px 30px rgba(0, 0, 0, 0.3)';
    }
  });
}

// Scroll-triggered fade-in animations
function initScrollAnimations() {
  var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        el.classList.add('visible');
        if (el.hasAttribute('data-stagger') && el.parentElement) {
          var siblings = Array.from(el.parentElement.querySelectorAll('[data-stagger]'));
          var index = siblings.indexOf(el);
          el.style.animationDelay = (index * 80) + 'ms';
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(function(el) { observer.observe(el); });
}

// Landing page effects (parallax, button pulse)
function initLandingEffects() {
  window.addEventListener('scroll', function() {
    var hero = document.querySelector('.hero');
    var bgPattern = document.querySelector('.hero__bg-pattern');
    if (hero && bgPattern) {
      var scrolled = window.scrollY || document.documentElement.scrollTop;
      var heroHeight = hero.offsetHeight;
      if (scrolled < heroHeight) {
        bgPattern.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
      }
    }
  });

  var ctaBtn = document.querySelector('.cta-banner .btn--primary');
  if (ctaBtn) {
    ctaBtn.addEventListener('mouseenter', function() { this.classList.add('btn--pulse'); });
    ctaBtn.addEventListener('mouseleave', function() { this.classList.remove('btn--pulse'); });
  }
}

// Gallery category filter
function initGalleryFilter() {
  var filterBtns = document.querySelectorAll('.gallery-filter__btn');
  var items = document.querySelectorAll('.gallery-item[data-category]');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var category = btn.getAttribute('data-filter') || 'all';

      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      items.forEach(function(item) {
        var cat = item.getAttribute('data-category') || '';
        var itemCategories = cat.split(' ').filter(Boolean);
        var match = category === 'all' || itemCategories.indexOf(category) >= 0;
        item.style.display = match ? '' : 'none';
      });
    });
  });
}

// Lightbox for gallery images
function initLightbox() {
  var items = document.querySelectorAll('.gallery-item');
  var lightbox = document.querySelector('.lightbox');

  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <img class="lightbox__img" src="" alt="Gallery image">
      <button class="lightbox__close" aria-label="Close">&times;</button>
    `;
    document.body.appendChild(lightbox);

    lightbox.querySelector('.lightbox__close').addEventListener('click', function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  var img = lightbox.querySelector('.lightbox__img');
  var closeBtn = lightbox.querySelector('.lightbox__close');

  items.forEach(function(item) {
    item.addEventListener('click', function(ev) {
      ev.preventDefault();
      var itemImg = item.querySelector('img');
      var src = item.getAttribute('data-src') || (itemImg && itemImg.getAttribute('src'));
      if (src) {
        img.src = src;
        img.alt = item.getAttribute('data-title') || 'Gallery image';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(ev) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        ev.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
