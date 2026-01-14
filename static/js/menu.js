document.addEventListener("DOMContentLoaded", function () {
  // --- ISTNIEJĄCY KOD DLA MENU HAMBURGEROWEGO (BEZ ZMIAN) ---
  const burgerButton = document.getElementById("burger-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const burgerIcon = burgerButton ? burgerButton.querySelector("i") : null;
  const body = document.body;

  if (burgerButton && mobileMenu && burgerIcon && body) {
    burgerButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("is-active");
      body.classList.toggle("menu-open");

      if (mobileMenu.classList.contains("is-active")) {
        burgerIcon.classList.remove("fa-bars");
        burgerIcon.classList.add("fa-times");
        burgerButton.setAttribute("aria-label", "Close Menu");
      } else {
        burgerIcon.classList.remove("fa-times");
        burgerIcon.classList.add("fa-bars");
        burgerButton.setAttribute("aria-label", "Open Menu");
      }
    });
  }

  // --- OBSŁUGA KLIKNIĘĆ LINKÓW JĘZYKOWYCH (REPLACE STATE) ---
  // Cel: gdy użytkownik kliknie link zmiany języka będąc na stronie posta,
  // zastąpimy bieżący wpis historii rootem aktualnego języka tak, aby
  // kliknięcie "Wstecz" prowadziło do strony głównej/kategorii w nowym języku
  function handleLangLinks() {
    // Szukaj linków, które najczęściej są generowane jako: /, /en/, /pl/ lub z atrybutem data-lang
    const langLinks = Array.from(document.querySelectorAll('a[href*="/en/"]'))
      .concat(Array.from(document.querySelectorAll('a[href$="/en"]')))
      .concat(Array.from(document.querySelectorAll('a[href^="/en"]')))
      .concat(Array.from(document.querySelectorAll('a[data-lang]')));

    // Deduplicate
    const unique = Array.from(new Set(langLinks));

    unique.forEach(link => {
      link.addEventListener('click', function(e) {
        try {
          // Znajdź docelowy URL języka — jeśli link ma data-lang, zbuduj root
          let target = link.getAttribute('href') || '';
          const dataLang = link.getAttribute('data-lang');

          if (dataLang) {
            // Zakładamy format '/en/' lub '/pl/'
            target = '/' + dataLang + '/';
          } else {
            // Uproszczona normalizacja: weź tylko path root (np. '/en/some/post' -> '/en/')
            try {
              const u = new URL(target, window.location.origin);
              const parts = u.pathname.split('/').filter(Boolean);
              if (parts.length > 0 && parts[0].length === 2) {
                target = '/' + parts[0] + '/';
              } else {
                // jeżeli nie wykryto kodu języka, ustaw na '/' (domyślny)
                target = '/';
              }
            } catch (err) {
              target = '/';
            }
          }

          // Zastąp bieżący wpis historią rootem wybranego języka
          if (window.history && window.history.replaceState) {
            window.history.replaceState({}, '', target);
          }
        } catch (err) {
          console.warn('Language link handler error:', err);
        }
        // Pozwól normalnemu przeładowaniu/nawigacji kontynuować
      }, { passive: true });
    });
  }

  // Uruchom po załadowaniu DOM
  try {
    handleLangLinks();
  } catch (err) {
    console.warn('Nie udało się zainicjalizować obsługi linków językowych:', err);
  }

  // Delegowany listener — złapie kliknięcia także na dynamicznie dodawane linki
  (function delegatedLangHandler() {
    const supported = new Set(['en', 'pl']);

    document.addEventListener('click', function (e) {
      const a = e.target.closest && e.target.closest('a');
      if (!a) return;

      // Ignoruj linki otwierane w nowej karcie lub pliki do pobrania
      if (a.target === '_blank' || a.hasAttribute('download')) return;

      const href = a.getAttribute('href');
      if (!href) return;

      let url;
      try {
        url = new URL(href, window.location.origin);
      } catch (err) {
        return; // Nieprawidłowy URL
      }

      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length === 0) return; // root

      const first = parts[0].toLowerCase();
      if (supported.has(first)) {
        // Zastąp bieżący wpis historii rootem wybranego języka
        const targetRoot = '/' + first + '/';
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, '', targetRoot);
        }
        // Pozwól normalnej nawigacji kontynuować
      }
    }, { passive: true });
  })();

  // --- NOWA LOGIKA DLA EKRANU WYSZUKIWANIA (OVERLAY) ---
  const searchIcon = document.getElementById("search-icon");
  const searchOverlay = document.getElementById("search-overlay");
  const closeSearchButton = document.getElementById("close-search");
  const searchInput = document.getElementById("overlay-search-input");
  const searchResults = document.getElementById("overlay-search-results");
  const searchContent = document.querySelector(".search-overlay-content");

  let searchData = null; // Zmienna do przechowywania danych z JSON

  // Funkcja do pobierania danych (tylko raz)
  async function loadSearchData() {
    if (!searchData) {
      try {
        const response = await fetch("/index.json");
        searchData = await response.json();
      } catch (error) {
        console.error(
          "Nie udało się załadować danych do wyszukiwarki:",
          error
        );
        searchData = [];
      }
    }
  }

  // Funkcja do wykonywania wyszukiwania
  function executeSearch(query) {
    if (!query || query.length < 2 || !searchData) {
      searchResults.innerHTML = ""; // Wyczyść wyniki, jeśli zapytanie jest za krótkie
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const results = searchData.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowerCaseQuery);
      const contentMatch = item.content
        .toLowerCase()
        .includes(lowerCaseQuery);
      return titleMatch || contentMatch;
    });

    displayResults(results);
  }

  // Funkcja do wyświetlania wyników
  function displayResults(results) {
    searchResults.innerHTML = ""; // Wyczyść poprzednie wyniki

    if (results.length === 0) {
      searchResults.innerHTML =
        '<div class="no-results">Brak wyników</div>';
    } else {
      results.slice(0, 15).forEach((item) => {
        // Pokaż max 15 wyników
        const a = document.createElement("a");
        a.href = item.permalink;
        a.textContent = item.title;
        searchResults.appendChild(a);
      });
    }
  }

  // Funkcje otwierania i zamykania overlay'a
  function openSearch() {
    if (searchOverlay) {
      searchOverlay.classList.add("is-visible");
      body.style.overflow = "hidden"; // Zablokuj przewijanie tła
      searchInput.focus(); // Ustaw fokus na polu do wpisywania
      loadSearchData(); // Zacznij ładować dane
    }
  }

  function closeSearch() {
    if (searchOverlay) {
      searchOverlay.classList.remove("is-visible");
      body.style.overflow = ""; // Odblokuj przewijanie tła
    }
  }

  if (searchIcon && searchOverlay && closeSearchButton && searchInput) {
    // Otwórz wyszukiwarkę po kliknięciu ikony
    searchIcon.addEventListener("click", openSearch);

    // Zamknij wyszukiwarkę po kliknięciu przycisku 'X'
    closeSearchButton.addEventListener("click", closeSearch);

    // Zamknij wyszukiwarkę po kliknięciu w tło (ale nie w okno)
    searchOverlay.addEventListener("click", function (e) {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });

    // Zamknij wyszukiwarkę klawiszem 'Escape'
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && searchOverlay.classList.contains("is-visible")) {
        closeSearch();
      }
    });

    // Wyszukuj podczas pisania
    searchInput.addEventListener("input", function () {
      executeSearch(this.value);
    });
  }
});