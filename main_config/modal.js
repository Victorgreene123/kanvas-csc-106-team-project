import { createArtworkCard } from "./gallery.js"; 
import { saveArtwork, loadArtworks } from "./artworks.js";

let artworksList = [];   // store artworks
let currentArtworkIndex = 0;

export function openArtworkModal(artwork, allArtworks) {
  artworksList = allArtworks;
  currentArtworkIndex = artworksList.findIndex(a => a.id === artwork.id);

  if (currentArtworkIndex === -1) currentArtworkIndex = 0;

  updateModalContent(artworksList[currentArtworkIndex]);
  document.getElementById("artworkModal").classList.remove("hidden");
}

function updateModalContent(artwork) {
  const modalImage = document.getElementById("modalImage");

  if (!artwork.image) {
    modalImage.src = ""; // fallback if no image
  } 
  // ✅ If it's a base64 uploaded image, keep it as is
  else if (artwork.image.startsWith("data:image")) {
    modalImage.src = artwork.image;
  } 
  // ✅ If it’s one of your default artworks, stored in /images/
  else {
    modalImage.src = `/${artwork.image}`;
  }

  document.getElementById("modalTitle").textContent = artwork.title;
  document.getElementById("modalArtist").textContent = `by ${artwork.artist}`;
  document.getElementById("modalMedium").textContent = artwork.medium;
  document.getElementById("modalDescription").textContent = artwork.description;
  document.getElementById("modalStyle").textContent = artwork.style;
  document.getElementById("modalYear").textContent = artwork.year;
  document.getElementById("modalOriginality").textContent = artwork.originality;
}


// Navigation
export function nextArtwork() {
  //check if the input values in that particular step are empty using the  current artwork index , if they are prompt a message.
  
  if (artworksList.length === 0) return;
  currentArtworkIndex = (currentArtworkIndex + 1) % artworksList.length;
  updateModalContent(artworksList[currentArtworkIndex]);
}

export function prevArtwork() {
  if (artworksList.length === 0) return;
  currentArtworkIndex =
    (currentArtworkIndex - 1 + artworksList.length) % artworksList.length;
  updateModalContent(artworksList[currentArtworkIndex]);
}

// Close modals
export function closeModals() {
  document.getElementById("artworkModal").classList.add("hidden");
  document.getElementById("formModal").classList.add("hidden");
  document.getElementById("messageModal").classList.add("hidden");
}

// Show message function
function showMessage(title, text, type = "info") {
  const messageModal = document.getElementById("messageModal");
  const messageTitle = document.getElementById("messageTitle");
  const messageText = document.getElementById("messageText");
  const messageIcon = document.getElementById("messageIcon");
  const messageBtn = document.getElementById("messageBtn");

  messageTitle.textContent = title;
  messageText.textContent = text;

  // Set icon based on message type
  if (type === "success") {
    messageIcon.innerHTML = '<svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
  } else if (type === "error") {
    messageIcon.innerHTML = '<svg class="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
  } else {
    messageIcon.innerHTML = '<svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  }

  // Show modal
  messageModal.classList.remove("hidden");

  // Close modal when OK button is clicked
  messageBtn.onclick = () => {
    messageModal.classList.add("hidden");
  };
}

// ✅ Attach button listeners after DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("closeModalBtn")?.addEventListener("click", closeModals);
  document.getElementById("prevArtworkBtn")?.addEventListener("click", prevArtwork);
  document.getElementById("nextArtworkBtn")?.addEventListener("click", nextArtwork);
});


// ===============================
// Add Artwork Modal Controller
// ===============================
let currentStep = 1;
const totalSteps = 3;

export function initAddArtworkForm() {
    const formModal = document.getElementById("formModal");
    const closeBtn = document.getElementById("closeFormModalBtn");
    const form = document.getElementById("artworkForm");
  
    const prevBtn = document.getElementById("prevStepBtn");
    const nextBtn = document.getElementById("nextStepBtn");
    const submitBtn = document.getElementById("submitArtworkBtn");
    const progressBar = document.getElementById("progressBar");
    const currentStepEl = document.getElementById("currentStep");
    const stepLabel = document.getElementById("stepLabel");
  
    const imageInput = document.getElementById("artworkImage");
    const dropzone = document.getElementById("dropzone");
    const dropzoneContent = document.getElementById("dropzoneContent");
  
    const originalitySlider = document.getElementById("originality");
    const originalityValue = document.getElementById("originalityValue");
  
    let currentStep = 1;
    const totalSteps = 3;
    const stepLabels = ["Artist Information", "Artwork Details", "Additional Details"];
  
    function showStep(step) {
      // Hide all steps
      document.querySelectorAll(".form-step").forEach((el) => {
        el.classList.add("hidden");
      });
      
      // Show current step
      const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
      if (currentStepElement) {
        currentStepElement.classList.remove("hidden");
      }
  
      // Update buttons
      prevBtn.classList.toggle("hidden", step === 1);
      nextBtn.classList.toggle("hidden", step === totalSteps);
      submitBtn.classList.toggle("hidden", step !== totalSteps);
  
      // Update progress and labels
      if (progressBar) {
        progressBar.style.width = `${(step / totalSteps) * 100}%`;
      }
      if (currentStepEl) {
        currentStepEl.textContent = step;
      }
      if (stepLabel) {
        stepLabel.textContent = stepLabels[step - 1];
      }
    }
  
    // Initialize the form with step 1
    showStep(currentStep);
  
    // Events
    closeBtn.addEventListener("click", () => {
      formModal.classList.add("hidden");
      form.reset();
      currentStep = 1;
      showStep(currentStep);
      if (dropzoneContent) {
        dropzone.innerHTML = dropzoneContent.outerHTML;
      }
    });
  
    prevBtn.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });
  
    nextBtn.addEventListener("click", () => {
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      }
    });
  
    if (imageInput && dropzone) {
      dropzone.addEventListener("click", () => imageInput.click());
      
      imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            dropzone.innerHTML = `
              <img src="${ev.target.result}" alt="Preview" class="max-h-32 mx-auto mb-4 rounded">
              <p class="text-green-600 font-medium">Image selected successfully!</p>
              <p class="text-xs text-gray-500">Size: ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
            `;
          };
          reader.readAsDataURL(file);
        }
      });
    }
  
    if (originalitySlider && originalityValue) {
      originalitySlider.addEventListener("input", (e) => {
        originalityValue.textContent = e.target.value;
      });
    }
  
    // Make the form submission handler async
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    
      const newArtwork = {
        id: Date.now(),
        title: document.getElementById("title").value,
        artist: `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`,
        email: document.getElementById("email").value,
        bio: document.getElementById("bio").value,
        image: dropzone.querySelector("img") ? dropzone.querySelector("img").src : "",
        description: document.getElementById("description").value,
        medium: document.getElementById("medium").value,
        style: document.getElementById("style").value,
        year: document.getElementById("creationDate").value.split("-")[0],
        originality: parseInt(document.getElementById("originality").value),
        notes: document.getElementById("notes").value,
      };
    
      try {
        saveArtwork(newArtwork);
    
        formModal.classList.add("hidden");
        form.reset();
        currentStep = 1;
        showStep(currentStep);
    
        if (dropzoneContent) {
          dropzone.innerHTML = dropzoneContent.outerHTML;
        }
    
        showMessage("Success!", "Your artwork has been added to the gallery.", "success");
    
        // ✅ re-render the gallery dynamically
        loadArtworks().then((artworks) => {
          const galleryEl = document.getElementById("gallery");
          galleryEl.innerHTML = "";
          artworks.forEach((art) => {
            galleryEl.appendChild(createArtworkCard(art, artworks));
          });
        });
      } catch (error) {
        console.error("Error saving artwork:", error);
        showMessage("Error", "Failed to save artwork. Please try again.", "error");
      }
    });        
}