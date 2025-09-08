function renderHero(){
    return (
        `
       
  <div class="hero-bg">
    <h1 class="logo-text">
        🎨<span>k</span><span>a</span><span>n</span><span>v</span><span>a</span><span>s</span>
      </h1>
      
    <div class="hero-frames">
      <div class="frame frame1">
        <img src="../assets/frame2.jpg" alt="">
      </div>
      <div class="frame frame2">
        <img src="../assets/frame1.jpg" alt="">
      </div>
      <div class="frame frame3">
        <img src="../assets/frame3.jpg" alt="">
      </div>
      <div class="frame frame4">
        <img src="../assets/frame4.jpg" alt="">
      </div>

    </div>
    <div class="hero-text">
      <h1 class="hero-text-big">Where <span class="text-styled">Art 🖌️</span> Lives Online </h1>
      <p class="hero-text-small">Discover. Experience. Collect. — Art, Reimagined.</p>
      <button class="cta-btn" id="toGallery" >Explore Now</button>
    </div>
  </div>

        `
    )
}




export default renderHero;