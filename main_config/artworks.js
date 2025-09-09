// artworks.js

// Load artworks from both JSON (static) + localStorage (user-added)
export async function loadArtworks() {
  try {
    // 1. Fetch static sample artworks (100)
    const response = await fetch("./components/artworks.json");
    const jsonArtworks = await response.json();

    // 2. Load user-added artworks from localStorage
    const localArtworks = JSON.parse(localStorage.getItem("kanvasArtworks") || "[]");

    // 3. Merge (user artworks first so they show up on top)
    return [...localArtworks, ...jsonArtworks];
  } catch (err) {
    console.error("Error loading artworks:", err);
    return [];
  }
}

// Save a single artwork to localStorage
export function saveArtwork(artwork) {
  const artworks = JSON.parse(localStorage.getItem("kanvasArtworks") || "[]");
  artworks.push(artwork);
  localStorage.setItem("kanvasArtworks", JSON.stringify(artworks));
}
