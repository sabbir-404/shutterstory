// js/gallery.js
// Handles album list, single album view, subsections (auto-loading image sequences), and lightbox.
//
// - Use data-path + data-count (+ optional data-pattern using {i}) on .gallery-grid containers.
// - Tries multiple filename candidates or an explicit pattern.
// - Uses IntersectionObserver to start loading when images are near viewport.
// - Ensures sectionImages keep display order, so lightbox indexes work correctly.

document.addEventListener("DOMContentLoaded", () => {
  const albums = window.ALBUMS || {};
  const params = new URLSearchParams(window.location.search);
  const albumKey = params.get("album");

  const albumsList = document.getElementById("albumsList");
  const galleryGrid = document.getElementById("galleryGrid");
  const albumTitle = document.getElementById("albumTitle");
  const albumDesc = document.getElementById("albumDesc");

  /* Lightbox elements */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbCaption = document.getElementById("lightboxCaption");
  const lbClose = document.querySelector(".lb-close");
  const lbPrev = document.querySelector(".lb-prev");
  const lbNext = document.querySelector(".lb-next");

  let currentAlbum = null;
  let currentIndex = 0;
  let currentImages = [];

  // IntersectionObserver to start loading images only when visible (reduces bandwidth)
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // mark as observed so we only kick once
        io.unobserve(img);
        if (img.dataset && img.dataset.start === '0') {
          // the data-start attribute is used to prevent multiple starts
        }
        // call the loader stored on the element
        if (typeof img._startLoading === 'function') img._startLoading();
      }
    });
  }, { rootMargin: '300px' }) : null;

  /* Helper: create an <img> element that tries candidates in order.
     It will only begin trying candidates when startLoading() is invoked.
     startLoading is triggered immediately if no IntersectionObserver available.
  */
  function makeSmartImage(candidates, alt, onReady) {
    const img = document.createElement('img');
    img.alt = alt || '';
    img.className = 'gallery-thumb placeholder';
    img.loading = 'lazy';
    img.decoding = 'async';

    let idx = 0;
    let started = false;
    let removed = false;

    function tryNext() {
      if (idx >= candidates.length) {
        // all failed — remove broken placeholder
        removed = true;
        img.remove();
        return;
      }
      // set src to next candidate
      img.src = encodeURI(candidates[idx]);
      idx++;
    }

    // start loading when IntersectionObserver calls _startLoading or immediately
    img._startLoading = function () {
      if (started || removed) return;
      started = true;
      tryNext();
    };

    // when the image loads, decode it for smoother paint then reveal
    img.addEventListener('load', () => {
      if (removed) return;
      if (img.decode) {
        img.decode().then(() => {
          img.classList.remove('placeholder');
          img.classList.add('loaded'); // triggers CSS transition
          if (typeof onReady === 'function') onReady(img);
        }).catch(() => {
          img.classList.remove('placeholder');
          img.classList.add('loaded');
          if (typeof onReady === 'function') onReady(img);
        });
      } else {
        img.classList.remove('placeholder');
        img.classList.add('loaded');
        if (typeof onReady === 'function') onReady(img);
      }
    });

    img.addEventListener('error', () => {
      // try next candidate on error
      tryNext();
    });

    // attach to observer or start right away
    if (io) {
      // initial mark and observe
      img.dataset.start = '0';
      io.observe(img);
    } else {
      // no IO support -> start immediately
      img._startLoading();
    }

    return img;
  }

  /* Build candidate filename list when no explicit pattern is provided */
  function buildCandidates(path, i, pattern) {
    const p = path.endsWith('/') ? path : path + '/';
    const candidates = [];

    if (pattern) {
      candidates.push(p + pattern.replace(/{i}/g, i));
    } else {
      // common variant list (order matters)
      const baseCandidates = [
        `${i}.jpg`,
        `${i}.jpeg`,
        `${i}.JPG`,
        `${i}.png`,
        `photo-${i}.jpg`,
        `photo ${i}.jpg`,
        `Photo-${i}.jpg`,
        `Photo ${i}.jpg`,
        `img-${i}.jpg`,
        `img${i}.jpg`,
        `image-${i}.jpg`,
        `image ${i}.jpg`,
        `holud-${i}.jpg`,
        `holud ${i}.jpg`,
        `Holud Photo-${i}.jpg`,
        `Holud Photo ${i}.jpg`,
        `Holud-${i}.jpg`,
        `${i}.webp`
      ];
      baseCandidates.forEach(c => candidates.push(p + c));
    }

    return candidates;
  }

  /* Render all albums (list view) */
  function renderAlbumList() {
    if (!albumsList) return;
    albumsList.innerHTML = '';
    Object.entries(albums).forEach(([key, data]) => {
      const card = document.createElement('article');
      card.className = 'album-card';
      card.innerHTML = `
        <div class="thumb" style="background-image:url('${encodeURI(data.thumb)}')"></div>
        <h3>${data.title}</h3>
        <p class="short">${data.desc || ''}</p>
        <a class="btn" href="index.html?album=${encodeURIComponent(key)}">View Album</a>
      `;
      albumsList.appendChild(card);
    });
  }

  /* Render album defined in window.ALBUMS (unchanged behavior) */
  function renderGalleryFromAlbumsJS(key) {
    const data = albums[key];
    if (!data || !galleryGrid) return;

    albumTitle.textContent = data.title || key;
    albumDesc.textContent = data.desc || '';
    if (albumsList) albumsList.style.display = 'none';

    galleryGrid.innerHTML = '';
    currentImages = [];

    data.images.forEach((src, i) => {
      const fullSrc = src;
      const img = document.createElement('img');
      img.src = fullSrc;
      img.alt = `${data.title || key} photo ${i + 1}`;
      img.className = 'gallery-thumb loaded'; // already loaded from provided list
      img.tabIndex = 0;
      img.addEventListener('click', () => {
        currentImages = data.images.slice();
        openLightbox(i);
      });
      galleryGrid.appendChild(img);
      currentImages.push(fullSrc);
    });

    currentAlbum = key;
  }

  /* Render dynamic sections that have data-path & data-count */
  function renderDynamicSections() {
    const sections = document.querySelectorAll('.gallery-grid[data-path][data-count]');
    sections.forEach(section => {
      const path = section.dataset.path.trim();
      const count = parseInt(section.dataset.count, 10) || 0;
      const pattern = section.dataset.pattern ? section.dataset.pattern.trim() : null;
      section.innerHTML = '';

      // pre-size array so order is preserved
      const sectionImages = new Array(count);

      for (let i = 1; i <= count; i++) {
        const pos = i - 1; // target index in arrays
        const candidates = buildCandidates(path, i, pattern);

        // create smart image which will attempt candidates (only when near viewport)
        const img = makeSmartImage(candidates, `Photo ${i}`, (imgElement) => {
          // set resolved src at correct position so order is preserved
          sectionImages[pos] = imgElement.src;

          // attach click handler referencing correct index
          imgElement.addEventListener('click', () => {
            // set currentImages to a filtered array of existing image URLs (preserve order)
            currentImages = sectionImages.filter(Boolean);
            // find the index in currentImages that corresponds to this pos
            const idxInCurrent = currentImages.indexOf(imgElement.src);
            if (idxInCurrent !== -1) {
              openLightbox(idxInCurrent);
            } else {
              // fallback: open at pos relative to filled items
              const fallbackIndex = sectionImages.slice(0, pos+1).filter(Boolean).length - 1;
              openLightbox(fallbackIndex >= 0 ? fallbackIndex : 0);
            }
          });
        });

        // append placeholder image immediately
        section.appendChild(img);
      }
    });
  }

  /* Lightbox controls */
  function openLightbox(i) {
    if (!currentImages || currentImages.length === 0) return;
    currentIndex = i;
    // set image src and wait for load to add loaded class for smooth reveal
    if (lbImg) {
      // remove previous loaded class
      lbImg.classList.remove('loaded');
      lbImg.src = currentImages[i];
      lbCaption.textContent = `Photo ${i + 1} of ${currentImages.length}`;
      lightbox.setAttribute("aria-hidden", "false");
      // focus for accessibility
      try { lightbox.focus(); } catch (e) {}
    }
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    if (lbImg) {
      lbImg.src = '';
      lbImg.classList.remove('loaded');
      lbCaption.textContent = '';
    }
  }

  function showNext(offset) {
    if (!currentImages || currentImages.length === 0) return;
    currentIndex = (currentIndex + offset + currentImages.length) % currentImages.length;
    if (lbImg) {
      lbImg.classList.remove('loaded');
      lbImg.src = currentImages[currentIndex];
      lbCaption.textContent = `Photo ${currentIndex + 1} of ${currentImages.length}`;
    }
  }

  // Lightbox img load handler => add .loaded for transition
  if (lbImg) {
    lbImg.addEventListener('load', () => {
      // decode then show
      if (lbImg.decode) {
        lbImg.decode().then(() => {
          lbImg.classList.add('loaded');
        }).catch(() => lbImg.classList.add('loaded'));
      } else {
        lbImg.classList.add('loaded');
      }
    });
  }

  // Attach lightbox handlers (if controls exist)
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => showNext(-1));
  if (lbNext) lbNext.addEventListener('click', () => showNext(1));

  document.addEventListener('keydown', e => {
    if (!lightbox) return;
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showNext(-1);
      if (e.key === 'ArrowRight') showNext(1);
    }
  });

  // Initialization logic:
  if (albumKey && albums[albumKey]) {
    renderGalleryFromAlbumsJS(albumKey);
  } else {
    renderAlbumList();
    renderDynamicSections();
  }
});
