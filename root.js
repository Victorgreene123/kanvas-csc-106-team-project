import renderHero from "./modules/hero.js";
import renderGallery from "./modules/main-gallery.js";

window.onload = function() {
    const root = document.getElementById('root');
    root.innerHTML = renderHero();

    document.getElementById('toGallery').addEventListener('click', () => {
        root.innerHTML = renderGallery();
    });
    
};



