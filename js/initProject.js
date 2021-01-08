function initProject() {
  let paragraphs = document.querySelectorAll(
    ".project--body p"
  );
  for (let i = 0; i < paragraphs.length; i++) {
    let image = paragraphs[i].querySelector("img, video, iframe");
    if (image) {
      paragraphs[i].classList.add("hasimage");
    }
  }

}

export { initProject };
