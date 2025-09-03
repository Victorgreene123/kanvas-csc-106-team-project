// Real artworks with proper info
const artworks = [
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
        title: 'The Starry Night',
        artist: 'Vincent van Gogh',
        year: '1889',
        medium: 'Oil on canvas',
        info: 'Painted during van Gogh\'s stay at an asylum in Saint-Rémy-de-Provence. This masterpiece depicts a swirling night sky over a quiet town, representing the artist\'s emotional state and his unique post-impressionist style.'
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mona_Lisa.jpg/687px-Mona_Lisa.jpg',
        title: 'Mona Lisa',
        artist: 'Leonardo da Vinci',
        year: '1503-1519',
        medium: 'Oil on poplar panel',
        info: 'Perhaps the world\'s most famous painting, known for the subject\'s enigmatic smile and da Vinci\'s revolutionary painting techniques. The portrait demonstrates the Renaissance ideals of beauty and artistic innovation.'
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/757px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg',
        title: 'Self-Portrait',
        artist: 'Vincent van Gogh',
        year: '1889',
        medium: 'Oil on canvas',
        info: 'One of van Gogh\'s many self-portraits, painted during his time in Saint-Rémy. The intense brushstrokes and vivid colors reflect his psychological state and his innovative approach to portraiture.'
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/1024px-The_Great_Wave_off_Kanagawa.jpg',
        title: 'The Great Wave off Kanagawa',
        artist: 'Katsushika Hokusai',
        year: '1831',
        medium: 'Woodblock print',
        info: 'The most famous work from Hokusai\'s series "Thirty-six Views of Mount Fuji." This iconic Japanese artwork captures the power of nature and has influenced artists worldwide, becoming a symbol of Japanese art.'
    },
    {
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/738px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg',
        title: 'Wanderer above the Sea of Fog',
        artist: 'Caspar David Friedrich',
        year: '1818',
        medium: 'Oil on canvas',
        info: 'A masterpiece of German Romantic painting. The lone figure contemplating the sublime landscape represents humanity\'s relationship with nature and the spiritual experience of the natural world.'
    }
];

let currentIndex = 0;

// Create thumbnail images
function createThumbnails() {
    const container = document.getElementById('thumbnails');
    container.innerHTML = '';
    
    artworks.forEach((art, index) => {
        const thumb = document.createElement('div');
        thumb.className = `thumbnail ${index === currentIndex ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${art.image}" alt="${art.title}">`;
        thumb.onclick = () => goToArt(index);
        container.appendChild(thumb);
    });
}

// Update the active thumbnail
function updateThumbnails() {
    const thumbs = document.querySelectorAll('.thumbnail');
    thumbs.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentIndex);
    });
}

// Show specific artwork
function goToArt(index) {
    currentIndex = index;
    updateDisplay();
    updateThumbnails();
}

// Update the modal display
function updateDisplay() {
    const art = artworks[currentIndex];
    
    document.getElementById('modalImage').src = art.image;
    document.getElementById('modalImage').alt = art.title;
    document.getElementById('artworkTitle').textContent = art.title;
    document.getElementById('artworkArtist').textContent = `by ${art.artist} (${art.year})`;
    document.getElementById('artworkInfo').textContent = `${art.medium}. ${art.info}`;
}

// Open the modal
function openModal() {
    createThumbnails();
    updateDisplay();
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close the modal
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigate to previous artwork
function previousArt() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : artworks.length - 1;
    updateDisplay();
    updateThumbnails();
}

// Navigate to next artwork
function nextArt() {
    currentIndex = currentIndex < artworks.length - 1 ? currentIndex + 1 : 0;
    updateDisplay();
    updateThumbnails();
}

// Close modal when clicking outside
document.getElementById('modalOverlay').onclick = function(e) {
    if (e.target === this) {
        closeModal();
    }
}

// Keyboard navigation
document.onkeydown = function(e) {
    if (!document.getElementById('modalOverlay').classList.contains('active')) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') previousArt();
    if (e.key === 'ArrowRight') nextArt();
}

// Click on main image for subtle effect
document.getElementById('modalImage').onclick = function() {
    this.style.transform = 'scale(1.05)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
      }
