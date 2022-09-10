const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const md = new markdownIt({ html: true });
const siteSettings = require("./_data/settings.json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("project", function (collectionApi) {
    return collectionApi.getFilteredByGlob(["./projects/*.md"]);
  });

  eleventyConfig.addFilter("renderMarkdown", function (value) {
    return md.render(value);
  });

  eleventyConfig.addCollection("featuredProjects", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob(["./projects/*.md"])
      .filter(function (item) {
        return siteSettings.featured_projects.indexOf(item.data.title) > -1;
      });
  });

  eleventyConfig.addTransform(
    "resolveImageTitles",
    function (content, outputPath) {
      if (outputPath.endsWith(".html")) {
        const dom = new JSDOM(content);
        let transformed = "";
        const images = dom.window.document.querySelectorAll(
          ".project--body > p > img"
        );
        images.forEach(img => {
          let src = img.getAttribute("src");
          img.setAttribute("data-full-src", src)
          src += "?nf_resize=fit&w=1500";
          img.setAttribute("src", src)
          if (img.getAttribute("title") !== "") {
            let caption = dom.window.document.createElement("span")
            let title = img.getAttribute("title")
            caption.innerHTML = title;
            caption.classList.add("caption")
            img.insertAdjacentElement("afterend", caption)
          }
        })
        transformed = dom.serialize();
        return transformed;
      }
      return content;
    }
  );

  eleventyConfig.addShortcode("gallery", function (data) {
    let gallery = JSON.parse(decodeURIComponent(data));
    items = gallery.map((item) => {
      let caption = ""
      if (item.caption) {
        caption = item.caption
      }
      return `<figure class="gallery--item">
      <img data-full-src="${item.image}" src="${item.image}?nf_resize=fit&w=1500" alt="${item.alt}">
      <figcaption>${caption}</figcaption>
      </figure>`;
    });

    return `<div class="gallery" data-count="">${items.join("\n")}</div>`;
  });
  eleventyConfig.addShortcode("embed", function (data) {
    let embed = JSON.parse(decodeURIComponent(data));
    return `<figure class="embed">
      ${embed.code}
      <figcaption>${embed.caption}</figcaption>
    </figure>`;
  });

  eleventyConfig.addPairedShortcode("note", function (content) {
    return `<aside class="note">${md.render(content)}</aside>`;
  });

  eleventyConfig.addPassthroughCopy("./admin");
  eleventyConfig.addPassthroughCopy({ "./admin/config.yml": "config.yml" });
  eleventyConfig.addPassthroughCopy("./dist");
  eleventyConfig.addPassthroughCopy("./assets/");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("/*.xml");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addWatchTarget("./dist/main.js");

  eleventyConfig.addPlugin(pluginRss);
};
