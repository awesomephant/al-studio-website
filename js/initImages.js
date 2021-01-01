function initImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
      img.classList.add("cached");
    }
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });
  });
}

export { initImages };
