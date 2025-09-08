const artworks = [
    // Your original artworks data
];

function renderModal(artwork) {
    const modalHtml = `
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal">
                <button class="close-btn" id="close-modal-btn">&times;</button>
                <div class="modal-image-container">
                    <img src="${artwork.image}" alt="${artwork.title}" class="modal-image" id="modalImage">
                </div>
                <div class="modal-content">
                    <h2 class="artwork-title" id="artworkTitle">${artwork.title}</h2>
                    <p class="artwork-artist" id="artworkArtist">by ${artwork.artist} (${artwork.year})</p>
                    <p class="artwork-info" id="artworkInfo">${artwork.medium}. ${artwork.info}</p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Attach event listeners
    document.getElementById('close-modal-btn').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'modalOverlay') {
            closeModal();
        }
    });
}

export function openModal(artworkData) {
    renderModal(artworkData);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}