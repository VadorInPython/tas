document.addEventListener("DOMContentLoaded", function () {
  // --- ISTNIEJĄCY KOD DLA MENU HAMBURGEROWEGO ---
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

  // --- NOWY KOD DLA WYSZUKIWARKI ---
  const searchIcon = document.getElementById("search-icon");
  const searchContainer = document.getElementById("search-container");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  let searchData = null; // Zmienna do przechowywania danych z JSON

  // Funkcja do pobierania danych (tylko raz)
  async function loadSearchData() {
    if (!searchData) {
      try {
        const response = await fetch("/index.json");
        searchData = await response.json();
      } catch (error) {
        console.error("Nie udało się załadować danych do wyszukiwarki:", error);
        searchData = []; // Zapobiegaj ponownym próbom w razie błędu
      }
    }
  }

  // Funkcja do wykonywania wyszukiwania
  function executeSearch(query) {
    if (!query || query.length < 2 || !searchData) {
      searchResults.style.display = "none";
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const results = searchData.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowerCaseQuery);
      const contentMatch = item.content.toLowerCase().includes(lowerCaseQuery);
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
      results.slice(0, 10).forEach((item) => {
        // Pokaż max 10 wyników
        const a = document.createElement("a");
        a.href = item.permalink;
        a.textContent = item.title;
        searchResults.appendChild(a);
      });
    }
    searchResults.style.display = "block";
  }

  if (searchIcon && searchContainer && searchInput && searchResults) {
    // Kliknięcie ikony rozwija/zwija pole wyszukiwania
    searchIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      searchContainer.classList.toggle("is-active");
      if (searchContainer.classList.contains("is-active")) {
        searchInput.focus();
        loadSearchData(); // Zacznij ładować dane, gdy użytkownik aktywuje wyszukiwarkę
      } else {
        searchInput.value = "";
        searchResults.style.display = "none";
      }
    });

    // Wyszukuj podczas pisania
    searchInput.addEventListener("input", function () {
      executeSearch(this.value);
    });

    // Zapobiegaj zamykaniu wyników po kliknięciu w pole input
    searchInput.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    // Zamykanie wyników po kliknięciu gdziekolwiek indziej
    document.addEventListener("click", function () {
      if (searchContainer.classList.contains("is-active")) {
        searchContainer.classList.remove("is-active");
        searchInput.value = "";
        searchResults.style.display = "none";
      }
    });
  }
});