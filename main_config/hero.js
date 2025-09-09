// In main_config/hero.js
import { loadArtworks } from "./artworks.js";
import { renderFilteredArtworks } from "./gallery.js";

function renderGalleryHero() {
    return `
        <section class="pt-24 pb-12 bg-[#0A0F1C] ">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
                    Discover & Share
                    <span class="text-blue-600">Amazing Art</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    A platform where artists can showcase their creativity and art lovers can explore beautiful artworks from around the world.
                </p>
            </div>

            <div class="flex justify-center mt-8">
                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search by year (e.g., 1942)..."
                    class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    id="search"
                    class="ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </div>
        </section>
    `;
}

// Search functionality
async function performSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        // If search is empty, show all artworks
        await renderFilteredArtworks(null);
        return;
    }

    const year = parseInt(searchTerm);
    if (isNaN(year)) {
        alert("Please enter a valid year (numbers only)");
        return;
    }

    const allArtworks = await loadArtworks();
    const filteredArtworks = allArtworks.filter(artwork => artwork.year === year);

    await renderFilteredArtworks(filteredArtworks);
}

// Clear search functionality
async function clearSearch() {
    const searchInput = document.getElementById("searchInput");
    searchInput.value = "";
    await renderFilteredArtworks(null);
}

// Initialize search functionality
function initSearch() {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");

    if (searchBtn) {
        searchBtn.addEventListener("click", performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                performSearch();
            }
        });
    }

    // Handle clear search button (added dynamically in gallery)
    document.addEventListener("click", (e) => {
        if (e.target.id === "clearSearchBtn") {
            clearSearch();
        }
    });
}

// Export search functions for external initialization
export { performSearch, clearSearch, initSearch };

export default renderGalleryHero; // Make sure this is exported as default
