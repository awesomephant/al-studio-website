function initLightbox() {
  const mediaItems = document.querySelectorAll(".project--body img");
  const lightbox = document.querySelector(".lightbox-container");
  const mediaContainer = lightbox.querySelector(".media-container");
  const captionEl = lightbox.querySelector(".lightbox-caption");
  console.log("hi")

  function closeLightbox() {
    document.body.classList.remove("lightbox-active");
    window.setTimeout(function () {
      mediaContainer.innerHTML = "";
      captionEl.innerText = "";
    }, 300);
  }

  lightbox.addEventListener("click", (e) => {
    closeLightbox();0
  });

  mediaItems.forEach((item) => {
    item.classList.add("has-lightbox")
    item.addEventListener("click", (e) => {
      captionEl.innerText = item.getAttribute("data-caption");

      const newMediaEl = document.createElement("img");
      if (item.getAttribute("data-full-src")){
        newMediaEl.setAttribute("src", item.getAttribute("data-full-src"));
      } else {
        newMediaEl.setAttribute("src", item.getAttribute("src"));
      }
      newMediaEl.classList.add("lightbox-media");
      mediaContainer.appendChild(newMediaEl);
      window.setTimeout(()=>{
        document.body.classList.add("lightbox-active");
      }, 50)

    });
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
}

export { initLightbox };
