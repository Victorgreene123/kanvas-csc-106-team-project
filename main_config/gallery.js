import { loadArtworks } from "./artworks.js";
import { openArtworkModal } from "./modal.js";

export function createArtworkCard(artwork, allArtworks) {
  const card = document.createElement("div");
  card.className =
    "artwork-card bg-white rounded-lg shadow-md cursor-pointer overflow-hidden";
  card.innerHTML = `
    <img src="${artwork.image}" alt="${artwork.title}" class="w-full h-48 object-cover">
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-1">${artwork.title}</h3>
      <p class="text-gray-600 text-sm">by ${artwork.artist}</p>
      <p class="text-gray-500 text-xs mt-1">${artwork.medium} • ${artwork.year}</p>
    </div>
  `;
  card.addEventListener("click", () => openArtworkModal(artwork, allArtworks));
  return card;
}

async function renderArtworks(filteredArtworks = null) {
  const galleryEl = document.getElementById("gallery");
  if (!galleryEl) return;

  galleryEl.innerHTML = "";
  const allArtworks = await loadArtworks(); // ✅ now async
  const artworksToRender = filteredArtworks || allArtworks;

  if (artworksToRender.length === 0) {
    galleryEl.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-gray-500 text-lg">No artworks found matching your search.</p>
        <button id="clearSearchBtn" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Clear Search
        </button>
      </div>
    `;
    return;
  }

  artworksToRender.forEach((artwork) => {
    galleryEl.appendChild(createArtworkCard(artwork, allArtworks));
  });
}

export async function renderFilteredArtworks(filteredArtworks) {
  await renderArtworks(filteredArtworks);
}

export default function renderGallery() {
  const galleryHTML = `
    <section class="py-12">
      <div class="max-w-7xl mx-auto responsive-padding">
        <div id="gallery" class="gallery-grid"></div>
      </div>
    </section>
  `;

  setTimeout(() => {
    renderArtworks();
  }, 0);

  return galleryHTML;
}
