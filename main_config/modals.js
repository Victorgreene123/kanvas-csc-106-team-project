function renderModals() {
    return `
  <!-- Artwork Detail Modal -->
  <div id="artworkModal" class="modal-overlay fixed inset-0 z-50 hidden bg-black/50">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
        
        <div class="flex flex-col md:flex-row">
          <!-- Image -->
          <div class="md:w-2/3">
            <img id="modalImage" src="" alt="" class="w-full h-full object-cover block">
          </div>
  
          <!-- Text Content -->
          <div class="md:w-1/3 p-6 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start mb-4">
                <h3 id="modalTitle" class="text-2xl font-bold text-gray-900"></h3>
                <button id="closeModalBtn" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <p id="modalArtist" class="text-lg text-gray-600 mb-2"></p>
              <p id="modalMedium" class="text-sm text-gray-500 mb-4"></p>
              <p id="modalDescription" class="text-gray-700 mb-6"></p>
              <div class="space-y-2 text-sm text-gray-600">
                <p><span class="font-medium">Style:</span> <span id="modalStyle"></span></p>
                <p><span class="font-medium">Year:</span> <span id="modalYear"></span></p>
                <p><span class="font-medium">Originality:</span> <span id="modalOriginality"></span>/10</p>
              </div>
            </div>
  
            <!-- Improved Prev / Next Buttons -->
            <div class="artwork-nav-container">
              <button id="prevArtworkBtn" class="artwork-nav-btn artwork-nav-btn-prev">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Previous
              </button>
              <button id="nextArtworkBtn" class="artwork-nav-btn artwork-nav-btn-next">
                Next
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
<!-- Add Artwork Modal -->
<div id="formModal" class="modal-overlay fixed inset-0 z-50 hidden bg-black-50">
    <div class="flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-90vh overflow-y-auto">
            <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-900">Add New Artwork</h3>
                    <button id="closeFormModalBtn" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Progress Bar -->
                <div class="mb-8">
                    <div class="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Step <span id="currentStep">1</span> of 3</span>
                        <span id="stepLabel">Artist Information</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div id="progressBar" class="bg-blue-600 h-2 rounded-full progress-bar" style="width: 33%"></div>
                    </div>
                </div>

                <form id="artworkForm">
                    <!-- Step 1: Artist Information -->
                    <div class="form-step" data-step="1">
                        <h4 class="text-lg font-semibold mb-4">Artist Information</h4>
                        <div class="form-grid">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input type="text" id="firstName" name="firstName" required class="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input type="text" id="lastName" name="lastName" required class="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" id="email" name="email" required class="inputt w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Artist Bio</label>
                            <textarea id="bio" name="bio" rows="4" required class="inputt w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                    </div>

                    <!-- Step 2: Artwork Details -->
                    <div class="form-step hidden" data-step="2">
                        <h4 class="text-lg font-semibold mb-4">Artwork Details</h4>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Artwork Image</label>
                            <div id="dropzone" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                <div class="text-gray-600" id="dropzoneContent">
                                    <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                    <p class="text-lg font-medium">Drop your artwork here, or click to browse</p>
                                    <p class="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                                </div>
                                <input type="file" id="artworkImage" accept="image/*" class="hidden">
                            </div>
                        </div>
                        <div class="form-grid">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input type="text" id="title" name="title" required class="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Creation Date</label>
                                <input type="date" id="creationDate" name="creationDate" required class="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea id="description" name="description" rows="3" required class="inputt w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                    </div>

                    <!-- Step 3: Additional Details -->
                    <div class="form-step hidden" data-step="3">
                        <h4 class="text-lg font-semibold mb-4">Additional Details</h4>
                        <div class="form-grid">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Medium</label>
                                <select id="medium" name="medium" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select Medium</option>
                                    <option value="Oil on Canvas">Oil on Canvas</option>
                                    <option value="Acrylic">Acrylic</option>
                                    <option value="Watercolor">Watercolor</option>
                                    <option value="Digital">Digital</option>
                                    <option value="Photography">Photography</option>
                                    <option value="Mixed Media">Mixed Media</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Style</label>
                                <select id="style" name="style" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select Style</option>
                                    <option value="Abstract">Abstract</option>
                                    <option value="Realism">Realism</option>
                                    <option value="Impressionism">Impressionism</option>
                                    <option value="Surrealism">Surrealism</option>
                                    <option value="Pop Art">Pop Art</option>
                                    <option value="Minimalism">Minimalism</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Originality (1-10)</label>
                            <input type="range" id="originality" name="originality" min="1" max="10" value="7" class="w-full">
                            <div class="flex justify-between text-sm text-gray-600 mt-1">
                                <span>1</span>
                                <span id="originalityValue" class="font-medium">7</span>
                                <span>10</span>
                            </div>
                        </div>
                        <div class="mt-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                            <textarea id="notes" name="notes" rows="3" placeholder="Any additional information..." class="inputt w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                    </div>

                    <!-- Navigation Buttons -->
                    <div class="flex justify-between mt-8">
                        <button type="button" id="prevStepBtn" class="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors hidden">
                            Previous
                        </button>
                        <button type="button" id="nextStepBtn" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Next
                        </button>
                        <button type="submit" id="submitArtworkBtn" class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors hidden">
                            Submit Artwork
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

  
  <!-- Custom Message Modal -->
  <div id="messageModal" class="modal-overlay fixed inset-0 z-50 hidden bg-black/50">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-6">
        <div class="text-center">
          <div id="messageIcon" class="mx-auto mb-4"></div>
          <h3 id="messageTitle" class="text-xl font-semibold text-gray-900 mb-2"></h3>
          <p id="messageText" class="text-gray-600 mb-6"></p>
          <button id="messageBtn"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
  }
  
  export default renderModals;
  