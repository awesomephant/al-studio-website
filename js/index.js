const { initSlider } = require("./initSlider");
const { initFilters } = require("./initFilters");
const { initImages } = require("./initImages");
const { initProject } = require("./initProject");

window.addEventListener("DOMContentLoaded", () => {
  let homeSlider = document.querySelector(".home-projects");
  if (homeSlider) {
    initSlider(homeSlider);
  }
  initFilters();
  initProject();
});
initImages();
window.addEventListener("scroll", (e) => {
  document.body.style.setProperty("--y", window.scrollY);
});
