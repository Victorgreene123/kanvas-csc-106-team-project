// Sample artworks data
// import data from "../components/artworks.json" assert { type: "json"};

  
  // const sampleArtworks = data;
  // Load artworks from localStorage
  export async function loadArtworks() {
    const response = await fetch('../components/artworks.json');
    const sampleArtworks = await response.json();
    console.log(sampleArtworks);
    console.log(Array.isArray(sampleArtworks));
    const savedArtworks = JSON.parse(localStorage.getItem("kanvasArtworks") || "[]");
    return [...sampleArtworks, ...savedArtworks];
  }
  
  // Save artwork to localStorage
  export function saveArtwork(artwork) {
    const savedArtworks = JSON.parse(localStorage.getItem("kanvasArtworks") || "[]");
  
    if (savedArtworks.length >= 10) {
      savedArtworks.shift(); // keep last 10
    }
  
    savedArtworks.push(artwork);
    localStorage.setItem("kanvasArtworks", JSON.stringify(savedArtworks));
  }
  