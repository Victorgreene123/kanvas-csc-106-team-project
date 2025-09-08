import { getHtml } from './utils.js'; // A utility to fetch HTML snippets

export default function renderNavbar() {
    // You would fetch and return the content of navbar.html
    // For simplicity, let's return a string here
    return `
        <nav>
            <a href="#" id="home-link">Home</a>
            <a href="#" id="gallery-link">Gallery</a>
            <button id="add-artwork-btn">Add Artwork</button>
        </nav>
    `;
}