// Sample artworks data
const sampleArtworks = [
    {
        id: 1,
        title: "The Starry Night",
        artist: "Vincent van Gogh",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/400px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        description: "A swirling night sky over a quiet town, painted during van Gogh's stay at an asylum.",
        medium: "Oil on Canvas",
        style: "Post-Impressionism",
        year: "1889",
        originality: 10,
        bio: "Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art."
    },
    {
        id: 2,
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mona_Lisa.jpg/300px-Mona_Lisa.jpg",
        description: "The world's most famous painting, known for the subject's enigmatic smile.",
        medium: "Oil on Panel",
        style: "Renaissance",
        year: "1503",
        originality: 9,
        bio: "Italian polymath of the High Renaissance who was active as a painter, draughtsman, engineer, scientist, theorist, sculptor and architect."
    },
    {
        id: 3,
        title: "The Great Wave",
        artist: "Katsushika Hokusai",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/400px-The_Great_Wave_off_Kanagawa.jpg",
        description: "Iconic Japanese woodblock print depicting a dramatic wave about to crash down on boats.",
        medium: "Woodblock Print",
        style: "Ukiyo-e",
        year: "1831",
        originality: 8,
        bio: "Japanese artist, ukiyo-e painter and printmaker of the Edo period, best known for the woodblock print series Thirty-six Views of Mount Fuji."
    }
];

// DOM Elements
const gallery = document.getElementById('gallery');
const artworkModal = document.getElementById('artworkModal');
const formModal = document.getElementById('formModal');
const messageModal = document.getElementById('messageModal');
const addArtworkBtn = document.getElementById('addArtworkBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeFormModalBtn = document.getElementById('closeFormModalBtn');
const messageBtn = document.getElementById('messageBtn');
const artworkForm = document.getElementById('artworkForm');
const artworkInput = document.getElementById("artworkImage");
const dropzoneContent = document.getElementById("dropzoneContent");
const artworkImage = document.getElementById('artworkImage');
const originality = document.getElementById('originality');
const originalityValue = document.getElementById('originalityValue');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const progressBar = document.getElementById('progressBar');
const currentStep = document.getElementById('currentStep');
const stepLabel = document.getElementById('stepLabel');

let currentFormStep = 1;
let selectedImage = null;

// Initialize app
function init() {
    loadArtworks();
    setupEventListeners();
}

// Load artworks from localStorage and display
function loadArtworks() {
    const savedArtworks = JSON.parse(localStorage.getItem('kanvasArtworks') || '[]');
    const allArtworks = [...sampleArtworks, ...savedArtworks];
    displayArtworks(allArtworks);
}

// Display artworks in gallery
function displayArtworks(artworks) {
    gallery.innerHTML = '';
    artworks.forEach(artwork => {
        const card = createArtworkCard(artwork);
        gallery.appendChild(card);
    });
}

// Create artwork card
function createArtworkCard(artwork) {
    const card = document.createElement('div');
    card.className = 'artwork-card bg-white rounded-lg overflow-hidden shadow-md cursor-pointer';
    card.innerHTML = `
        <img src="${artwork.image}" alt="${artwork.title}" class="w-full h-48 object-cover">
        <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">${artwork.title}</h3>
            <p class="text-gray-600 text-sm">by ${artwork.artist}</p>
            <p class="text-gray-500 text-xs mt-1">${artwork.medium} • ${artwork.year}</p>
        </div>
    `;
    card.addEventListener('click', () => openArtworkModal(artwork));
    return card;
}

artworkInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      dropzoneContent.innerHTML = `<img src="${e.target.result}" alt="Artwork Preview">`;
    };
    reader.readAsDataURL(file);
  });
  

// Open artwork modal
function openArtworkModal(artwork) {
    document.getElementById('modalImage').src = artwork.image;
    document.getElementById('modalTitle').textContent = artwork.title;
    document.getElementById('modalArtist').textContent = `by ${artwork.artist}`;
    document.getElementById('modalMedium').textContent = artwork.medium;
    document.getElementById('modalDescription').textContent = artwork.description;
    document.getElementById('modalStyle').textContent = artwork.style;
    document.getElementById('modalYear').textContent = artwork.year;
    document.getElementById('modalOriginality').textContent = artwork.originality;
    artworkModal.classList.remove('hidden');
}

// Open form modal
function openFormModal() {
    formModal.classList.remove('hidden');
    currentFormStep = 1;
    updateFormStep();
}

// Close modals
function closeModals() {
    artworkModal.classList.add('hidden');
    formModal.classList.add('hidden');
    messageModal.classList.add('hidden');
    resetForm();
}

// Update form step
function updateFormStep() {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    
    // Show current step
    document.getElementById(`step${currentFormStep}`).classList.add('active');
    
    // Update progress
    const progress = (currentFormStep / 3) * 100;
    progressBar.style.width = `${progress}%`;
    currentStep.textContent = currentFormStep;
    
    // Update step label
    const labels = ['Artist Information', 'Artwork Details', 'Additional Details'];
    stepLabel.textContent = labels[currentFormStep - 1];
    
    // Update buttons
    prevBtn.classList.toggle('hidden', currentFormStep === 1);
    nextBtn.classList.toggle('hidden', currentFormStep === 3);
    submitBtn.classList.toggle('hidden', currentFormStep !== 3);
}

// Next step
function nextStep() {
    if (currentFormStep < 3) {
        currentFormStep++;
        updateFormStep();
    }
}

// Previous step
function prevStep() {
    if (currentFormStep > 1) {
        currentFormStep--;
        updateFormStep();
    }
}

// Reset form
function resetForm() {
    artworkForm.reset();
    currentFormStep = 1;
    selectedImage = null;
    updateFormStep();
}

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();

    if (!selectedImage) {
        showMessage('Error', 'Please select an artwork image.', 'error');
        return;
    }

    const formData = new FormData(artworkForm);
    const artwork = {
        id: Date.now(),
        title: formData.get('title'),
        artist: `${formData.get('firstName')} ${formData.get('lastName')}`,
        image: selectedImage,
        description: formData.get('description'),
        medium: formData.get('medium'),
        style: formData.get('style'),
        year: formData.get('creationDate'),
        originality: parseInt(formData.get('originality')),
        bio: formData.get('bio'),
        email: formData.get('email'),
        notes: formData.get('notes')
    };

    try {
        // Save to localStorage
        const savedArtworks = JSON.parse(localStorage.getItem('kanvasArtworks') || '[]');

        // Limit to 10 artworks to prevent quota exceeded
        if (savedArtworks.length >= 10) {
            savedArtworks.shift(); // Remove oldest artwork
        }

        savedArtworks.push(artwork);
        localStorage.setItem('kanvasArtworks', JSON.stringify(savedArtworks));

        // Reload gallery
        loadArtworks();

        // Show success message
        showMessage('Success!', 'Your artwork has been submitted successfully.', 'success');
        closeModals();
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            showMessage('Storage Full', 'Your browser storage is full. Please clear some space or use smaller images.', 'error');
        } else {
            showMessage('Error', 'Failed to save artwork. Please try again.', 'error');
        }
    }
}

// Show custom message
function showMessage(title, text, type = 'info') {
    const icon = document.getElementById('messageIcon');
    const titleEl = document.getElementById('messageTitle');
    const textEl = document.getElementById('messageText');
    
    titleEl.textContent = title;
    textEl.textContent = text;
    
    if (type === 'success') {
        icon.innerHTML = '<svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
    } else if (type === 'error') {
        icon.innerHTML = '<svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
    } else {
        icon.innerHTML = '<svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    }
    
    messageModal.classList.remove('hidden');
}

// Setup event listeners
function setupEventListeners() {
    // Modal controls
    addArtworkBtn.addEventListener('click', openFormModal);
    closeModalBtn.addEventListener('click', closeModals);
    closeFormModalBtn.addEventListener('click', closeModals);
    messageBtn.addEventListener('click', () => messageModal.classList.add('hidden'));
    
    // Form navigation
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    artworkForm.addEventListener('submit', handleSubmit);
    
    // File upload
    dropzone.addEventListener('click', () => artworkImage.click());
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('border-blue-500');
    });
    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('border-blue-500');
    });
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-blue-500');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });
    artworkImage.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });
    
    // Originality slider
    originality.addEventListener('input', () => {
        originalityValue.textContent = originality.value;
    });
    
    // Close modals on overlay click
    artworkModal.addEventListener('click', (e) => {
        if (e.target === artworkModal) closeModals();
    });
    formModal.addEventListener('click', (e) => {
        if (e.target === formModal) closeModals();
    });
    messageModal.addEventListener('click', (e) => {
        if (e.target === messageModal) messageModal.classList.add('hidden');
    });
}

// Handle file selection
function handleFileSelect(file) {
    if (file.type.startsWith('image/')) {
        // Check file size (limit to 2MB to prevent quota issues)
        if (file.size > 2 * 1024 * 1024) {
            showMessage('File Too Large', 'Please select an image smaller than 2MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage = e.target.result;
            dropzone.innerHTML = `
                <img src="${selectedImage}" alt="Selected artwork" class="max-h-32 mx-auto mb-4 rounded">
                <p class="text-green-600 font-medium">Image selected successfully!</p>
                <p class="text-xs text-gray-500">Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            `;
        };
        reader.readAsDataURL(file);
    } else {
        showMessage('Error', 'Please select a valid image file.', 'error');
    }
}

// Initialize the app
init();