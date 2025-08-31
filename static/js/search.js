// ===================================================
// === SEARCH FUNCTIONALITY FOR BLOG ===
// === Dodaj ten plik jako static/js/search.js ===
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    // === DESKTOP SEARCH ELEMENTS ===
    const searchToggle = document.getElementById('searchToggle');
    const searchContainer = document.getElementById('searchContainer');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');

    // === MOBILE SEARCH ELEMENTS ===
    const mobileSearchModal = document.getElementById('mobileSearchModal');
    const mobileSearchInput = document.getElementById('mobileSearchInput');

    // === DESKTOP SEARCH EVENT LISTENERS ===
    if (searchToggle) {
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSearch();
        });
    }

    if (searchOverlay) {
        searchOverlay.addEventListener('click', closeSearch);
    }

    if (searchContainer) {
        searchContainer.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // === KEYBOARD EVENTS ===
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSearch();
            closeMobileSearch();
        }
        
        // Otwórz wyszukiwarkę klawiszem "/" (jak GitHub)
        if (e.key === '/' && !isInputFocused()) {
            e.preventDefault();
            if (window.innerWidth > 768) {
                openSearch();
            } else {
                openMobileSearch();
            }
        }
    });

    // === DESKTOP SEARCH FUNCTIONS ===
    function toggleSearch() {
        if (!searchContainer) return;
        
        const isActive = searchContainer.classList.contains('active');
        
        if (isActive) {
            closeSearch();
        } else {
            openSearch();
        }
    }

    function openSearch() {
        if (!searchContainer || !searchToggle || !searchOverlay) return;
        
        searchContainer.classList.add('active');
        searchToggle.classList.add('active');
        searchOverlay.classList.add('active');
        
        setTimeout(() => {
            if (searchInput) searchInput.focus();
        }, 100);
    }

    function closeSearch() {
        if (!searchContainer || !searchToggle || !searchOverlay) return;
        
        searchContainer.classList.remove('active');
        searchToggle.classList.remove('active');
        searchOverlay.classList.remove('active');
    }

    // === MOBILE SEARCH FUNCTIONS ===
    window.openMobileSearch = function() {
        if (!mobileSearchModal) return;
        
        mobileSearchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            if (mobileSearchInput) mobileSearchInput.focus();
        }, 100);
    }

    window.closeMobileSearch = function() {
        if (!mobileSearchModal) return;
        
        mobileSearchModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // === SEARCH HANDLERS ===
    window.handleSearch = function(e) {
        e.preventDefault();
        const query = searchInput ? searchInput.value.trim() : '';
        
        if (query) {
            performSearch(query);
            closeSearch();
            if (searchInput) searchInput.value = '';
        }
    }

    window.handleMobileSearch = function(e) {
        e.preventDefault();
        const query = mobileSearchInput ? mobileSearchInput.value.trim() : '';
        
        if (query) {
            performSearch(query);
            closeMobileSearch();
            if (mobileSearchInput) mobileSearchInput.value = '';
        }
    }

    window.searchSuggestion = function(suggestion) {
        performSearch(suggestion);
        closeSearch();
        closeMobileSearch();
    }

    // === MAIN SEARCH FUNCTION ===
    function performSearch(query) {
        console.log('Wyszukiwanie:', query);
        
        // === WYBIERZ JEDNĄ Z OPCJI PONIŻEJ ===
        
        // OPCJA 1: Hugo z wbudowaną wyszukiwarką
        window.location.href = `/search/?q=${encodeURIComponent(query)}`;
        
        // OPCJA 2: WordPress
        // window.location.href = `/?s=${encodeURIComponent(query)}`;
        
        // OPCJA 3: Jekyll z plugin Jekyll-search
        // window.location.href = `/search/?query=${encodeURIComponent(query)}`;
        
        // OPCJA 4: Google Custom Search
        // window.location.href = `https://www.google.com/search?q=site:twojastrona.pl ${encodeURIComponent(query)}`;
        
        // OPCJA 5: Algolia Search (jeśli używasz)
        // algoliaSearch(query);
        
        // TYMCZASOWO - usuń to po konfiguracji:
        alert(`Wyszukuję: "${query}"\n\nZamień funkcję performSearch() na właściwą logikę wyszukiwania dla Twojej platformy!`);
    }

    // === HELPER FUNCTIONS ===
    function isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' || 
            activeElement.tagName === 'TEXTAREA' || 
            activeElement.contentEditable === 'true'
        );
    }

    // === AUTOFOCUS NA WPISYWANIE ===
    document.addEventListener('keypress', function(e) {
        // Jeśli użytkownik zaczyna pisać (nie w input) - otwórz wyszukiwarkę
        if (!isInputFocused() && e.key.match(/[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/)) {
            if (window.innerWidth > 768) {
                openSearch();
                setTimeout(() => {
                    if (searchInput) {
                        searchInput.value = e.key;
                        searchInput.focus();
                    }
                }, 100);
            }
        }
    });
});

// === DODATKOWE FUNKCJE DLA INTEGRACJI ===

// Funkcja do wyszukiwania live (opcjonalna)
function setupLiveSearch() {
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const query = e.target.value.trim();
            if (query.length > 2) {
                // Tutaj możesz dodać live search suggestions
                console.log('Live search:', query);
            }
        }, 300));
    }
    
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', debounce(function(e) {
            const query = e.target.value.trim();
            if (query.length > 2) {
                console.log('Mobile live search:', query);
            }
        }, 300));
    }
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Inicjalizuj live search jeśli chcesz
// setupLiveSearch();