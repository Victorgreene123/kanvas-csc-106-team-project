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
  
  // Load artworks from localStorage
  export function loadArtworks() {
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
  