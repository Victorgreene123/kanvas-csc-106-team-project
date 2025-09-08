import renderHero from './modules/hero.js';
import renderNavbar from './modules/navbar.js';
import { renderGallery } from './modules/main-gallery.js';
import { renderUploadForm } from './modules/kanvasform.js';
import { openModal } from './modules/Artwork.js';

// The previoud one you did, This is a new one:
// import renderHero from "./modules/hero.js" 
// import renderNavbar from "./modules/navbar.js"; 

// window.addEventListener('DOMContentLoaded',() => { 
//     const content = renderHero(); 
//     console.log(content); 
//     document.getElementById("root").innerHTML = content; 
//     document.getElementById("show-nav").addEventListener("click" , ()=> {
//         document.getElementById("navbar").innerHTML= renderNavbar(); 
//     }) 
// })

// Function to handle route changes
function navigateTo(view) {
    const root = document.getElementById('root');
    root.innerHTML = ''; // Clear previous view
    switch (view) {
        case 'home':
            root.appendChild(renderHero());
            root.appendChild(renderGallery());
            break;
        case 'addArtwork':
            root.appendChild(renderUploadForm());
            break;
        // Add more cases for other views if needed
    }
}

// Initial rendering of the app
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('navbar').innerHTML = renderNavbar();
    navigateTo('home');

    // Attach event listener to the "Add Artwork" button on the navbar
    document.getElementById('add-artwork-btn').addEventListener('click', () => {
        navigateTo('addArtwork');
    });

    // You'll need to update the gallery rendering to support clicking on images.
    // This part will be handled within main-gallery.js and Artwork.js
});