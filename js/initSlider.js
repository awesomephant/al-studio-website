function initSlider(container) {
  const slides = container.querySelectorAll(".slide");
  let state = {
    currentSlide: 0,
    nextSlide: 0,
    prevSlide: 0,
  };
  function advance(increment) {
    slides[state.currentSlide].classList.remove("active");

    state.currentSlide += increment;
    if (state.currentSlide > slides.length - 1) {
      state.currentSlide = 0;
    }
    if (state.currentSlide < 0) {
      state.currentSlide = slides.length - 1;
    }
    slides[state.currentSlide].classList.add("active");
  }

  slides.forEach((slide) => {
    const media = slide.querySelector(".media-item-media");
    slide.addEventListener("click", (e) => {
      advance(1);
    });
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") {
      advance(1);
    }
    if (e.key === "ArrowLeft") {
      advance(-1);
    }
  });
  slides[state.currentSlide].classList.add("active");
  window.setInterval(function () {
    advance(1);
  }, 6000);
}

export { initSlider };
