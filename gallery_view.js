import renderNavbar from "./main_config/navbar.js";
import renderHero from "./main_config/hero.js";
import renderGallery from "./main_config/gallery.js";
import renderModals from "./main_config/modals.js";
import { closeModals, nextArtwork, prevArtwork, initAddArtworkForm } from "./main_config/modal.js";

window.onload = function () {
    const root = document.getElementById("root");
  
    // Append components to the root
    root.appendChild(renderNavbar());
    root.insertAdjacentHTML("beforeend", renderHero());
    root.insertAdjacentHTML("beforeend", renderGallery());
    root.insertAdjacentHTML("beforeend", renderModals());
  
    // Modal controls
    document.getElementById("closeModalBtn").addEventListener("click", closeModals);
    document.getElementById("nextArtworkBtn").addEventListener("click", nextArtwork);
    document.getElementById("prevArtworkBtn").addEventListener("click", prevArtwork);
  
    // Click outside closes
    document.getElementById("artworkModal").addEventListener("click", (e) => {
      if (e.target.id === "artworkModal") closeModals();
    });
  
    // Add event listener to the Add Artwork button after it's rendered
    const addArtworkBtn = document.getElementById("addArtworkBtn");
    if (addArtworkBtn) {
      addArtworkBtn.addEventListener("click", () => {
        document.getElementById("formModal").classList.remove("hidden");
      });
    }
  
    // Initialize Add Artwork form logic
    initAddArtworkForm();
};