const pluginSass = require("eleventy-plugin-sass");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const md = new markdownIt();
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
  eleventyConfig.addFilter("slug", function (text) {
    return text.toLowerCase().replace(/\W+/g, "-");
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
    let gallery = JSON.parse(data);
    items = gallery.map((item) => {
      let caption = ""
      if (item.caption) {
        caption = item.caption
      }
      return `<figure class="gallery--item">
      <img src="${item.image}?nf_resize=fit&w=1400" alt="${item.alt}">
      <figcaption>${caption}</figcaption>
      </figure>`;
    });

    return `<div class="gallery" data-count="">${items.join("\n")}</div>`;
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
  eleventyConfig.addPlugin(pluginSass, {});
};
