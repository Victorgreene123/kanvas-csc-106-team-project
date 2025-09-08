function renderNavbar() {
    const nav = document.createElement('nav');
    nav.className = 'fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200';
    nav.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-center items-center h-16">
                <h1 class="text-2xl font-bold text-gray-900 mr-8">KANVAS</h1>
                <button id="addArtworkBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200">
                    Add Artwork
                </button>
            </div>
        </div>
    `;
    return nav;
}

export default renderNavbar;