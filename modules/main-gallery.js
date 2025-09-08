import { openModal } from './Artwork.js';

const artworks = [
    // Your list of artworks
];

export function renderGallery() {
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'gallery';
    artworks.forEach(art => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${art.image}" alt="${art.Title}">
            <div class="info">
                <h3>${art.Title}</h3>
                <p>By ${art.Artist}</p>
                <p>(${art.Year})</p>
            </div>
        `;
        // Add the click listener to each card
        card.addEventListener('click', () => {
            openModal(art); // Open the modal with the clicked artwork's data
        });
        galleryContainer.appendChild(card);
    });
    return galleryContainer;
}