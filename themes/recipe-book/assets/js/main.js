/* ═══════════════════════════════════════════════════════
   RECIPE BOOK — main.js
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────
     THEME TOGGLE
     Cycles: auto → light → dark → auto
     Persists to localStorage, applies data-theme on <html>
     ───────────────────────────────────────────────────── */

  const THEMES = ['auto', 'light', 'dark'];
  const STORAGE_KEY = 'theme';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'auto';
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
    updateToggleLabel(theme);
  }

  function nextTheme(current) {
    const idx = THEMES.indexOf(current);
    return THEMES[(idx + 1) % THEMES.length];
  }

  function updateToggleLabel(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const labels = { auto: 'Auto color mode', light: 'Light mode', dark: 'Dark mode' };
    btn.setAttribute('aria-label', labels[theme] || 'Toggle theme');
    btn.setAttribute('title', labels[theme] || 'Toggle theme');
  }

  // Apply stored theme immediately (also done inline in <head> to prevent flash)
  setTheme(getTheme());

  document.addEventListener('DOMContentLoaded', function () {

    // Theme toggle button
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      updateToggleLabel(getTheme());
      toggleBtn.addEventListener('click', function () {
        const current = getTheme();
        setTheme(nextTheme(current));
      });
    }

    /* ───────────────────────────────────────────────────
       HEADER SCROLL SHADOW
       ─────────────────────────────────────────────────── */
    const header = document.querySelector('.site-header');
    if (header) {
      const onScroll = function () {
        header.classList.toggle('scrolled', window.scrollY > 8);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ───────────────────────────────────────────────────
       MOBILE NAV TOGGLE
       ─────────────────────────────────────────────────── */
    const navToggle = document.getElementById('nav-toggle');
    const siteNav = document.querySelector('.site-nav');
    if (navToggle && siteNav) {
      navToggle.addEventListener('click', function () {
        const open = siteNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (!navToggle.contains(e.target) && !siteNav.contains(e.target)) {
          siteNav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    /* ───────────────────────────────────────────────────
       ACTIVE NAV LINK
       ─────────────────────────────────────────────────── */
    const path = window.location.pathname;
    document.querySelectorAll('.site-nav__link').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href && path.startsWith(href) && href !== '/') {
        link.classList.add('active');
      }
    });

    /* ───────────────────────────────────────────────────
       SEARCH (Fuse.js)
       ─────────────────────────────────────────────────── */
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
      let searchIndex = null;
      let fuse = null;
      let searchTimeout = null;

      // Load Fuse.js dynamically, then fetch index
      function initSearch() {
        if (typeof Fuse !== 'undefined') {
          fetchIndex();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js';
        script.onload = fetchIndex;
        document.head.appendChild(script);
      }

      function fetchIndex() {
        fetch('/index.json')
          .then(function (r) { return r.json(); })
          .then(function (data) {
            searchIndex = data;
            fuse = new Fuse(data, {
              isCaseSensitive: false,
              shouldSort: true,
              includeScore: true,
              location: 0,
              distance: 1000,
              threshold: 0.4,
              minMatchCharLength: 2,
              keys: ['title', 'summary', 'content', 'tags']
            });
            // Re-run search if user already typed while index was loading
            if (searchInput.value.trim()) {
              performSearch();
            }
          })
          .catch(function () {
            searchResults.innerHTML = '<p class="search-empty">Could not load search index.</p>';
          });
      }

      // Start loading immediately (autofocus fires before JS listener is ready)
      initSearch();

      searchInput.addEventListener('input', function () {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 180);
      });

      function performSearch() {
        const query = searchInput.value.trim();

        if (!query) {
          searchResults.innerHTML = '';
          return;
        }

        if (!fuse) {
          searchResults.innerHTML = '<p class="search-empty">Loading…</p>';
          return;
        }

        const results = fuse.search(query, { limit: 20 });

        if (!results.length) {
          searchResults.innerHTML = '<p class="search-empty">No recipes found for "' + escapeHtml(query) + '"</p>';
          return;
        }

        searchResults.innerHTML = results.map(function (r) {
          const item = r.item;
          const section = item.section || '';
          return [
            '<a class="search-result" href="' + escapeHtml(item.permalink) + '">',
            '  <span class="search-result__section">' + escapeHtml(section) + '</span>',
            '  <span class="search-result__title">' + escapeHtml(item.title) + '</span>',
            item.summary ? '  <span class="search-result__excerpt">' + escapeHtml(stripHtml(item.summary).substring(0, 180)) + '…</span>' : '',
            '</a>'
          ].join('');
        }).join('');
      }

      function stripHtml(str) {
        if (!str) return '';
        return String(str).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      }

      function escapeHtml(str) {
        if (!str) return '';
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      }
    }

  }); // DOMContentLoaded

})();
