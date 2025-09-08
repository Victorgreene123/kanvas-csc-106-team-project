import renderHero from "./modules/hero.js";
import renderNavbar from "../main_config/navbar.js";
import renderGalleryHero from "../main_config/hero.js"; // Gallery-specific hero
import renderGallery from "../main_config/gallery.js";
import renderModals from "../main_config/modals.js";
import { closeModals, nextArtwork, prevArtwork, initAddArtworkForm } from "../main_config/modal.js";

window.onload = function() {
    const root = document.getElementById('root');
    root.innerHTML = renderHero();

    document.getElementById('toGallery').addEventListener('click', () => {
        // Clear the root and render the gallery view components
        root.innerHTML = '';
        
        // Append gallery components (navbar + gallery hero + gallery grid + modals)
        root.appendChild(renderNavbar());
        root.insertAdjacentHTML("beforeend", renderGalleryHero());
        root.insertAdjacentHTML("beforeend", renderGallery());
        root.insertAdjacentHTML("beforeend", renderModals());
        
        // Set up event listeners for the gallery
        setupGalleryEvents();
    });
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