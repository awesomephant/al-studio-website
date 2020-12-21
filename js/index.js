const { initLightbox } = require("./initLightbox");
const { initSlider } = require("./initSlider");
const { initFilters } = require("./initFilters");

window.addEventListener("DOMContentLoaded", () => {
  initLightbox();
  let homeSlider = document.querySelector(".home-projects");
  if (homeSlider) {
    initSlider(homeSlider);
  }
  initFilters()
});
window.addEventListener("scroll", (e) => {
  document.body.style.setProperty("--y", window.scrollY);
});
