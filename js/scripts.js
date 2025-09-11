// js/scripts.js
// Shared site features: loader, nav, theme toggle, hero slider.

document.addEventListener("DOMContentLoaded", () => {
  /* Loader fade out */
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("hidden"), 600);
    });
  }

  /* Year in footer */
  const y1 = document.getElementById("year");
  const y2 = document.getElementById("year2");
  const year = new Date().getFullYear();
  if (y1) y1.textContent = year;
  if (y2) y2.textContent = year;

  /* Hamburger toggle */
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.querySelector(".main-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", !expanded);
      nav.style.display = expanded ? "none" : "flex";
    });
  }

  /* Theme toggle */
  const themeBtn = document.getElementById("themeToggle");
  const body = document.body;
  if (themeBtn) {
    // load saved theme or default dark
    const savedTheme = localStorage.getItem("theme") || "dark";
    body.setAttribute("data-theme", savedTheme);
    themeBtn.textContent = savedTheme === "light" ? "☀️" : "🌙";

    themeBtn.addEventListener("click", () => {
      const current = body.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      body.setAttribute("data-theme", next);
      themeBtn.textContent = next === "light" ? "☀️" : "🌙";
      localStorage.setItem("theme", next);
    });
  }

  /* Hero slider (home page only) */
  const slides = document.querySelectorAll(".slide");
  const dots = document.getElementById("heroDots");
  if (slides.length > 0 && dots) {
    let index = 0;

    function showSlide(i) {
      slides.forEach((s, idx) =>
        s.classList.toggle("active", idx === i)
      );
      dots.querySelectorAll("button").forEach((d, idx) =>
        d.classList.toggle("active", idx === i)
      );
      index = i;
    }

    // build dots
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.addEventListener("click", () => showSlide(i));
      dots.appendChild(b);
    });

    // buttons
    document.querySelectorAll(".slider-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.dataset.action === "prev") {
          showSlide((index - 1 + slides.length) % slides.length);
        } else {
          showSlide((index + 1) % slides.length);
        }
      });
    });

    // autoplay
    setInterval(() => {
      showSlide((index + 1) % slides.length);
    }, 6000);

    showSlide(0);
  }
});

// add to js/scripts.js (or include after it)
document.addEventListener('DOMContentLoaded', () => {
  // mobile nav toggle: toggles body.nav-open for CSS to show the menu
  const menuBtn = document.getElementById('menuBtn');
  const body = document.body;
  const mainNav = document.getElementById('mainNav');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const isOpen = body.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // optional: prevent body scroll when menu open
      if (isOpen) document.documentElement.style.overflow = 'hidden';
      else document.documentElement.style.overflow = '';
    });
  }

  // simple lightbox swipe support (works with your current #lightbox and lb-prev/lb-next)
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    let startX = 0;
    let startY = 0;
    let tracking = false;

    lightbox.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        tracking = true;
      }
    }, { passive: true });

    lightbox.addEventListener('touchmove', (e) => {
      // prevent page scroll when swiping horizontally significantly
      if (!tracking) return;
      const dx = Math.abs(e.touches[0].clientX - startX);
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (dx > 10 && dx > dy) e.preventDefault();
    }, { passive: false });

    lightbox.addEventListener('touchend', (e) => {
      if (!tracking) return;
      tracking = false;
      const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
      const dx = endX - startX;
      const threshold = 40; // px
      if (dx > threshold) {
        // swipe right -> previous
        const prev = document.querySelector('.lb-prev');
        if (prev) prev.click();
      } else if (dx < -threshold) {
        // swipe left -> next
        const next = document.querySelector('.lb-next');
        if (next) next.click();
      }
    }, { passive: true });
  }
});

// Featured album rotator – add to js/scripts.js (append or inside DOMContentLoaded)
(function initAlbumRotator(){
  const albums = window.ALBUMS || {};
  const keys = Object.keys(albums);
  if (!keys.length) return;

  const thumbEl = document.getElementById('rotorThumb');
  const titleEl = document.getElementById('rotorTitle');
  const descEl  = document.getElementById('rotorDesc');
  const viewEl  = document.getElementById('rotorView');
  const cardEl  = document.getElementById('albumCard');
  const rotator = document.getElementById('albumRotator');
  const prevBtn = document.getElementById('featPrev');
  const nextBtn = document.getElementById('featNext');

  let idx = 0;
  let autoplayTimer = null;
  const INTERVAL = 5000; // 5s

  function show(i) {
    idx = (i + keys.length) % keys.length;
    const k = keys[idx];
    const data = albums[k];
    if (!data) return;

    // set background image (thumbnail)
    if (thumbEl) thumbEl.style.backgroundImage = `url("${encodeURI(data.thumb)}")`;

    if (titleEl) titleEl.textContent = data.title || k;
    if (descEl) descEl.textContent = data.desc || '';
    if (viewEl) {
      // link to gallery page with album param (assumes gallery/index.html accepts ?album=KEY)
      viewEl.setAttribute('href', `gallery/index.html?album=${encodeURIComponent(k)}`);
    }

    // animate the card
    if (cardEl) {
      cardEl.classList.remove('fade-in');
      // force reflow
      // eslint-disable-next-line no-unused-expressions
      cardEl.offsetHeight;
      cardEl.classList.add('fade-in');
      cardEl.setAttribute('aria-hidden', 'false');
    }
  }

  function next() { show(idx + 1); }
  function prev() { show(idx - 1); }

  if (nextBtn) nextBtn.addEventListener('click', () => {
    next();
    resetAutoplay();
  });
  if (prevBtn) prevBtn.addEventListener('click', () => {
    prev();
    resetAutoplay();
  });

  // pause on hover or focus
  function pauseAutoplay() { if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; } }
  function startAutoplay() { if (!autoplayTimer) autoplayTimer = setInterval(() => next(), INTERVAL); }
  function resetAutoplay(){ pauseAutoplay(); startAutoplay(); }

  if (rotator) {
    rotator.addEventListener('mouseenter', pauseAutoplay);
    rotator.addEventListener('mouseleave', startAutoplay);
    rotator.addEventListener('focusin', pauseAutoplay);
    rotator.addEventListener('focusout', startAutoplay);
  }

  // keyboard navigation for accessibility
  if (rotator) {
    rotator.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
      if (e.key === 'ArrowLeft') { prev(); resetAutoplay(); }
    });
  }

  // initial show + autoplay
  show(0);
  startAutoplay();
})();
