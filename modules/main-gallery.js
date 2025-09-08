import { openModal } from './Artwork.js';

const artworks = [
    // Your list of artworks
];

// export function renderGallery() {
//     const galleryContainer = document.createElement('div');
//     galleryContainer.className = 'gallery';
//     artworks.forEach(art => {
//         const card = document.createElement('div');
//         card.className = 'card';
//         card.innerHTML = `
//             <img src="${art.image}" alt="${art.Title}">
//             <div class="info">
//                 <h3>${art.Title}</h3>
//                 <p>By ${art.Artist}</p>
//                 <p>(${art.Year})</p>
//             </div>
//         `;
//         // Add the click listener to each card
//         card.addEventListener('click', () => {
//             openModal(art); // Open the modal with the clicked artwork's data
//         });
//         galleryContainer.appendChild(card);
//     });
//     return galleryContainer;
// }

export default function renderGallery() {

    return (
        `
        <div>
           <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-center items-center h-16">
                <h1 class="text-2xl font-bold text-gray-900 mr-8">KANVAS</h1>
                <button id="addArtworkBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200">
                    Add Artwork
                </button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Discover & Share
                <span class="text-blue-600">Amazing Art</span>
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                A platform where artists can showcase their creativity and art lovers can explore beautiful artworks from around the world.
            </p>
        </div>
    </section>

    <!-- Gallery -->
    <section class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="gallery" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Artworks will be dynamically added here -->
            </div>
        </div>
    </section>
    <div>
        `
    )

}


