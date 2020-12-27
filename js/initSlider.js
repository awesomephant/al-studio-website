function initSlider(container) {
  const slides = container.querySelectorAll(".slide");
  let state = {
    currentSlide: 0,
    nextSlide: 0,
    prevSlide: 0,
    autoAdvance: true,
    autoAdvanceInterval: 5000,
  };
  window.idleTime = 0;
  function advance(increment) {
    slides[state.currentSlide].classList.remove("active");
    state.currentSlide += increment;
    if (state.currentSlide > slides.length - 1) {
      state.currentSlide = 0;
    }
    if (state.currentSlide < 0) {
      state.currentSlide = slides.length - 1;
    }
    container.setAttribute("data-slide", state.currentSlide);
    if (slides[state.currentSlide].getAttribute("data-light") === "true") {
      document.body.classList.add("is-light");
    } else {
      document.body.classList.remove("is-light");
    }
    slides[state.currentSlide].classList.add("active");
  }

  container.addEventListener("click", (e) => {
    window.idleTime = 0;
    if (e.clientX > window.innerWidth / 2) {
      advance(1);
    } else {
      advance(-1);
    }
  });

  window.addEventListener("keyup", (e) => {
    window.idleTime = 0;
    if (e.key === "ArrowRight") {
      advance(1);
    }
    if (e.key === "ArrowLeft") {
      advance(-1);
    }
  });
  window.setInterval(function () {
    window.idleTime += 1;
  }, 1000);

  window.setInterval(function () {
    if (window.idleTime > 5) {
      advance(1);
    }
  }, state.autoAdvanceInterval);

  slides[state.currentSlide].classList.add("active");
  slides[state.currentSlide + 1].classList.add("next");
}

export { initSlider };
