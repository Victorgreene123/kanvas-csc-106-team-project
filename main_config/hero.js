// In main_config/hero.js
function renderGalleryHero() {
    return `
        <section class="pt-24 pb-12 bg-[#0A0F1C] ">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
                    Discover & Share
                    <span class="text-blue-600">Amazing Art</span>
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    A platform where artists can showcase their creativity and art lovers can explore beautiful artworks from around the world.
                </p>
            </div>

            <div class="flex justify-center mt-8">
                <input 
                    type="text" 
                    placeholder="Search artworks..." 
                    class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    class="ml-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Search
                </button>
            </div>
        </section>
    `;
}

export default renderGalleryHero; // Make sure this is exported as default