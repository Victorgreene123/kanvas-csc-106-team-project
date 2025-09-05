import renderHero from "./modules/hero.js"
import renderNavbar from "./modules/navbar.js";

window.addEventListener('DOMContentLoaded',() => {


    const content = renderHero();
    console.log(content);

        document.getElementById("root").innerHTML
    = content;

    document.getElementById("show-nav").addEventListener("click" , ()=> {

     document.getElementById("navbar").innerHTML=  renderNavbar();


})

})


// =================== CLASSES ===================
class Artist {
    constructor(firstName, lastName, email, bio) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.bio = bio;
    }
  }
  
  class Artwork {
    constructor(image, title, description, medium, style, originality, date, notes) {
      this.image = image;
      this.title = title;
      this.description = description;
      this.medium = medium;
      this.style = style;
      this.originality = originality;
      this.date = date;
      this.notes = notes;
    }
  }
  
  // =================== PREVIEW HANDLING ===================
  const previewImg = document.getElementById("previewImg");
  const previewTitle = document.getElementById("previewTitle");
  const previewDesc = document.getElementById("previewDesc");
  const previewArtist = document.getElementById("previewArtist");
  const previewMedium = document.getElementById("previewMedium");
  const previewStyle = document.getElementById("previewStyle");
  const previewDate = document.getElementById("previewDate");
  
  // Form fields
  const form = document.getElementById("kanvasForm");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const bio = document.getElementById("bio");
  const artworkFile = document.getElementById("artwork");
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const medium = document.getElementById("medium");
  const style = document.getElementById("style");
  const originality = document.getElementById("originality");
  const creationDate = document.getElementById("creationDate");
  const notes = document.getElementById("notes");
  
  // Live preview updates
  title.addEventListener("input", () => previewTitle.textContent = title.value);
  description.addEventListener("input", () => previewDesc.textContent = description.value);
  firstName.addEventListener("input", () => previewArtist.textContent = `${firstName.value} ${lastName.value}`);
  lastName.addEventListener("input", () => previewArtist.textContent = `${firstName.value} ${lastName.value}`);
  medium.addEventListener("change", () => previewMedium.textContent = medium.value);
  style.addEventListener("change", () => previewStyle.textContent = style.value);
  creationDate.addEventListener("change", () => previewDate.textContent = creationDate.value);
  
  // Preview image on upload
  artworkFile.addEventListener("change", () => {
    const file = artworkFile.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => { previewImg.src = e.target.result; };
      reader.readAsDataURL(file);
    }
  });
  
  // =================== CONTINUE / BACK FLOW ===================
  const continueBtn = document.getElementById("continueBtn");
  const confirmActions = document.getElementById("confirmActions");
  const backBtn = document.getElementById("backBtn");
  
  continueBtn.addEventListener("click", () => {
    confirmActions.classList.remove("hidden");
    continueBtn.parentElement.classList.add("hidden"); // hide step 1 buttons
  });
  
  backBtn.addEventListener("click", () => {
    confirmActions.classList.add("hidden");
    continueBtn.parentElement.classList.remove("hidden");
  });
  
  // =================== LOCAL STORAGE ===================
  function saveData(artist, artwork) {
    let data = JSON.parse(localStorage.getItem("kanvasSubmissions")) || [];
    data.push({ artist, artwork });
    localStorage.setItem("kanvasSubmissions", JSON.stringify(data));
  }
  
  // On form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // Create objects
    const artist = new Artist(
      firstName.value,
      lastName.value,
      email.value,
      bio.value
    );
  
    const imageData = previewImg.src; // base64 string from FileReader
    const artwork = new Artwork(
      imageData,
      title.value,
      description.value,
      medium.value,
      style.value,
      originality.value,
      creationDate.value,
      notes.value
    );
  
    // Save to localStorage
    saveData(artist, artwork);
  
    alert("Artwork submitted successfully ✅");
    form.reset();
    location.reload(); // reload to reset preview (optional)
  });
  