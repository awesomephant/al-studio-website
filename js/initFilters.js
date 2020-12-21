function initFilters() {
  const filters = document.querySelectorAll(".project-filters button");
  const cards = document.querySelectorAll(".projects-list .project-card");
  let activeFilters = [];

  function applyFilters() {
    cards.forEach((c) => {
      if (activeFilters.length === 0) {
        c.classList.remove("hidden");
      } else {
        let tags = c.getAttribute("data-tags").split(",");
        for (let i = 0; i < tags.length; i++) {
          if (activeFilters.includes(tags[i])) {
            c.classList.remove("hidden");
            break;
          }
          c.classList.add("hidden");
        }
      }
    });
  }

  filters.forEach((f) => {
    f.addEventListener("click", (e) => {
      console.log(f);
      let slug = f.getAttribute("data-filter");
      if (slug === "all") {
        activeFilters = [];
        filters.forEach((fi) => {
          fi.classList.remove("active");
        });
        f.classList.add("active");
      } else {
        filters[0].classList.remove("active");
        if (activeFilters.includes(slug)) {
          activeFilters.splice(activeFilters.indexOf(slug), 1);
          f.classList.remove("active");
        } else {
          activeFilters.push(slug);
          f.classList.add("active");
        }
      }
      if (activeFilters.length === 0) {
        filters[0].classList.add("active");
      }
      applyFilters();
    });
  });
}

export { initFilters };
