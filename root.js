import renderHero from "./modules/hero.js";
import renderNavbar from "../main_config/navbar.js";
import renderGalleryHero from "../main_config/hero.js"; // Gallery-specific hero
import renderGallery from "../main_config/gallery.js";
import renderModals from "../main_config/modals.js";
import { closeModals, nextArtwork, prevArtwork, initAddArtworkForm } from "../main_config/modal.js";
import { clearSearch, performSearch } from "./main_config/hero.js";

window.onload = function() {
    const root = document.getElementById('root');
    const search = document.getElementById('search')
    
    root.innerHTML = renderHero();

    document.getElementById('toGallery').addEventListener('click', () => {
        // Clear the root and render the gallery view components
        const hero = document.getElementById("hero");
        setTimeout(() =>  {
        hero.style.opacity = 0;
        root.innerHTML = '';
        root.appendChild(renderNavbar());
        root.insertAdjacentHTML("beforeend", renderGalleryHero());
        root.insertAdjacentHTML("beforeend", renderGallery());
        root.insertAdjacentHTML("beforeend", renderModals());
        
        // Set up event listeners for the gallery
        setupGalleryEvents();
        document.getElementById("search").addEventListener('click' , () => {
            performSearch();
        }
        
        );

        document.addEventListener("click", (e) => {
                if (e.target.id === "clearSearchBtn") {
                    clearSearch();
                }
            });
        
            const searchInput = document.getElementById("searchInput");

        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                performSearch();
            }
        });
        },500)
    
        
});
        
        // Append gallery components (navbar + gallery hero + gallery grid + modals)
        
    

};

function setupGalleryEvents() {
    // Modal controls
    document.getElementById("closeModalBtn").addEventListener("click", closeModals);
    document.getElementById("nextArtworkBtn").addEventListener("click", nextArtwork);
    document.getElementById("prevArtworkBtn").addEventListener("click", prevArtwork);
  
    // Click outside closes
    document.getElementById("artworkModal").addEventListener("click", (e) => {
        if (e.target.id === "artworkModal") closeModals();
    });
  
    // Add event listener to the Add Artwork button
    const addArtworkBtn = document.getElementById("addArtworkBtn");
    if (addArtworkBtn) {
        addArtworkBtn.addEventListener("click", () => {
            document.getElementById("formModal").classList.remove("hidden");
        });
    }
  
    // Initialize Add Artwork form logic
    initAddArtworkForm();
}

