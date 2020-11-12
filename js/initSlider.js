function initSlider(container) {
  const slides = container.querySelectorAll(".slide");
  let state = {
    currentSlide: 0,
    nextSlide: 0,
    prevSlide: 0,
  };
  function advance(increment) {
    state.currentSlide += increment;
    if (state.currentSlide > slides.length - 1) {
      state.currentSlide = 0;
    }
    if (state.currentSlide < 0) {
      state.currentSlide = slides.length - 1;
    }
    container.setAttribute("data-slide", state.currentSlide);
  }

  container.addEventListener("click", (e) => {
    if (e.clientX > window.innerWidth / 2){
      advance(1);
    } else {
      advance(-1);
    }
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
  slides[state.currentSlide + 1].classList.add("next");
  window.setInterval(function () {
    //    advance(1);
  }, 4000);
}

export { initSlider };
