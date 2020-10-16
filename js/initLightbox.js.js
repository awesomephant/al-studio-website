function initLightbox() {
  const mediaItems = document.querySelectorAll(
    ".project-media-item .media-item-media"
  );
  const lightbox = document.querySelector(".lightbox-container");

  lightbox.addEventListener("click", (e) => {
    document.body.classList.remove("lightbox-active");
    window.setTimeout(function () {
      lightbox.innerHTML = "";
    }, 300);
  });

  mediaItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      document.body.classList.add("lightbox-active");
      const mediaEl = document.createElement("img");
      mediaEl.setAttribute("src", item.getAttribute("data-full"));
      mediaEl.classList.add('lightbox-media')
      lightbox.appendChild(mediaEl);
    });
  });
}

export { initLightbox };
