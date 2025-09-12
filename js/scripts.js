// js/scripts.js
// Consolidated site script — theme, loader, nav, hero slider, album rotator, lightbox swipe (if used).

document.addEventListener("DOMContentLoaded", () => {
  /* Loader fade out */
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("hidden"), 500);
    });
  }

  /* Year */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* NAV: hamburger toggles body.nav-open (CSS shows nav when nav-open) */
  const menuBtn = document.getElementById("menuBtn");
  const bodyEl = document.body;
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = bodyEl.classList.toggle("nav-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      // prevent background scroll when menu open
      document.documentElement.style.overflow = open ? "hidden" : "";
    });
  }

  /* THEME: toggle, persist */
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    const saved = localStorage.getItem("theme") || bodyEl.getAttribute("data-theme") || "dark";
    bodyEl.setAttribute("data-theme", saved);
    themeBtn.textContent = saved === "light" ? "☀️" : "🌙";

    themeBtn.addEventListener("click", () => {
      const current = bodyEl.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      bodyEl.setAttribute("data-theme", next);
      themeBtn.textContent = next === "light" ? "☀️" : "🌙";
      localStorage.setItem("theme", next);
    });
  }

  /* HERO SLIDER: reveal after decode, dots, autoplay */
  (function hero() {
    const slides = Array.from(document.querySelectorAll(".slide"));
    const dotsWrap = document.getElementById("heroDots");
    if (!slides.length || !dotsWrap) return;

    let idx = 0;
    const INTERVAL = 6000;
    let timer = null;

    // build dots
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.addEventListener("click", () => show(i));
      dotsWrap.appendChild(b);
    });

    async function reveal(el) {
      const img = el.querySelector("img.slide-img");
      if (!img) { el.classList.add("active"); return; }
      if (img.complete && img.naturalWidth) { el.classList.add("active"); return; }

      await new Promise(res => {
        if (img.complete) return res();
        img.addEventListener("load", res, { once: true });
        img.addEventListener("error", res, { once: true });
      });
      if (img.decode) {
        try { await img.decode(); } catch(e) {}
      }
      el.classList.add("active");
    }

    function hideAll() {
      slides.forEach(s => s.classList.remove("active"));
      dotsWrap.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    }

    function show(i) {
      i = (i + slides.length) % slides.length;
      hideAll();
      reveal(slides[i]);
      const btn = dotsWrap.querySelectorAll("button")[i];
      if (btn) btn.classList.add("active");
      idx = i;
    }

    // wired buttons
    document.querySelectorAll(".slider-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.dataset.action === "prev") show(idx - 1);
        else show(idx + 1);
        reset();
      });
    });

    function start() { if (!timer) timer = setInterval(() => show(idx + 1), INTERVAL); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function reset() { stop(); start(); }

    const sliderEl = document.getElementById("heroSlider");
    if (sliderEl) {
      sliderEl.addEventListener("mouseenter", stop);
      sliderEl.addEventListener("mouseleave", start);
      sliderEl.addEventListener("touchstart", stop, { passive: true });
      sliderEl.addEventListener("touchend", start, { passive: true });
    }

    show(0);
    start();
  })();

  /* FEATURED ALBUM ROTATOR: animated transitions + autoplay + prev/next */
  (function rotator() {
    const albums = window.ALBUMS || {};
    const keys = Object.keys(albums);
    if (!keys.length) return;

    const thumb = document.getElementById("rotorThumb");
    const title = document.getElementById("rotorTitle");
    const desc  = document.getElementById("rotorDesc");
    const view  = document.getElementById("rotorView");
    const card  = document.getElementById("albumCard");
    const prev  = document.getElementById("featPrev");
    const next  = document.getElementById("featNext");
    const rotatorWrap = document.getElementById("albumRotator");

    let idx = 0;
    let timer = null;
    const INTERVAL = 5000;

    function render(i, direction = 'right') {
      const k = keys[(i + keys.length) % keys.length];
      const data = albums[k];
      if (!data) return;

      // play slide-out animation
      if (card) {
        card.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');
        // decide exit direction
        card.classList.add(direction === 'left' ? 'slide-out-left' : 'slide-out-right');
      }

      // after short timeout swap content then slide-in
      setTimeout(() => {
        if (thumb) thumb.style.backgroundImage = `url("${encodeURI(data.thumb)}")`;
        if (title) title.textContent = data.title || k;
        if (desc) desc.textContent = data.desc || '';
        if (view) view.setAttribute('href', `gallery/index.html?album=${encodeURIComponent(k)}`);

        if (card) {
          // force reflow to restart animation
          card.offsetHeight;
          card.classList.remove('slide-out-left', 'slide-out-right');
          card.classList.add('slide-in');
        }
      }, 240); // match transition in CSS
      idx = (i + keys.length) % keys.length;
    }

    function nextAlbum() { render(idx + 1, 'right'); reset(); }
    function prevAlbum() { render(idx - 1, 'left'); reset(); }

    if (next) next.addEventListener('click', () => nextAlbum());
    if (prev) prev.addEventListener('click', () => prevAlbum());

    function start() { if (!timer) timer = setInterval(() => nextAlbum(), INTERVAL); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function reset() { stop(); start(); }

    if (rotatorWrap) {
      rotatorWrap.addEventListener('mouseenter', stop);
      rotatorWrap.addEventListener('mouseleave', start);
      rotatorWrap.addEventListener('focusin', stop);
      rotatorWrap.addEventListener('focusout', start);
    }

    // keyboard accessibility
    if (rotatorWrap) {
      rotatorWrap.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevAlbum();
        if (e.key === 'ArrowRight') nextAlbum();
      });
    }

    render(0);
    start();
  })();

  /* optional: simple lightbox swipe support (requires existing #lightbox + controls) */
  (function lightboxSwipe(){
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    let startX = 0, startY = 0, tracking = false;
    lightbox.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        tracking = true;
      }
    }, { passive: true });

    lightbox.addEventListener('touchmove', (e) => {
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
      const threshold = 40;
      if (dx > threshold) { const prev = document.querySelector('.lb-prev'); if (prev) prev.click(); }
      else if (dx < -threshold) { const next = document.querySelector('.lb-next'); if (next) next.click(); }
    }, { passive: true });
  })();

}); // DOMContentLoaded
