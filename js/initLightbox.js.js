function initLightbox() {
  const mediaItems = document.querySelectorAll(".project-media-item button");
  const lightbox = document.querySelector(".lightbox-container");

  function closeLightbox() {
    document.body.classList.remove("lightbox-active");
    window.setTimeout(function () {
      lightbox.innerHTML = "";
    }, 300);
  }

  lightbox.addEventListener("click", (e) => {
    closeLightbox();
  });

  mediaItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      document.body.classList.add("lightbox-active");
      const mediaEl = item.querySelector("picture");
      const newMediaEl = document.createElement("img");
      newMediaEl.setAttribute("src", mediaEl.getAttribute("data-full"));
      newMediaEl.classList.add("lightbox-media");
      lightbox.appendChild(newMediaEl);
    });
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
}

export { initLightbox };
