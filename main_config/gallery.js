import { loadArtworks } from "./artworks.js";
import { openArtworkModal } from "./modal.js";

function createArtworkCard(artwork, allArtworks) {
  const card = document.createElement("div");
  card.className =
    "artwork-card bg-white rounded-lg shadow-md cursor-pointer overflow-hidden";
  card.innerHTML = `
    <img src="components/${artwork.image}" alt="${artwork.title}" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-1">${artwork.title}</h3>
      <p class="text-gray-600 text-sm">by ${artwork.artist}</p>
      <p class="text-gray-500 text-xs mt-1"> ${artwork.year}</p>
    </div>
  `;
  // ✅ Pass both artwork and the full array
  card.addEventListener("click", () => openArtworkModal(artwork, allArtworks));
  return card;
}

async function  renderArtworks() {
  const galleryEl = document.getElementById("gallery");
  if (!galleryEl) return;
  
  galleryEl.innerHTML = "";
  const artworks = await loadArtworks();
  console.log(artworks);
  
  artworks.forEach((artwork) => {
    galleryEl.appendChild(createArtworkCard(artwork, artworks));
  });
}

export default function renderGallery() {
  const artworks = loadArtworks();
  const galleryHTML = `
    <section class="py-12">
      <div class="max-w-7xl mx-auto responsive-padding">
        <div id="gallery" class="gallery-grid"></div>
      </div>
    </section>
  `;

  // Render cards after section mounts
  setTimeout(() => {
    renderArtworks();
  }, 0);

  return galleryHTML;
}