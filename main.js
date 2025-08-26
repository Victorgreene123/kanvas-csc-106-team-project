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

