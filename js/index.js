const { initLightbox } = require("./initLightbox.js");
const { initSlider } = require("./initSlider.js");

window.addEventListener("DOMContentLoaded", () => {
  initLightbox();
  let homeSlider = document.querySelector(".home-projects");
  if (homeSlider) {
    initSlider(homeSlider);
  }
});
