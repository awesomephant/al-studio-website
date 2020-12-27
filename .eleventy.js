const pluginSass = require("eleventy-plugin-sass");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const md = new markdownIt();
const siteSettings = require("./_data/settings.json");
const fs = require("fs");

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

  eleventyConfig.addShortcode("gallery", function (data) {
    let gallery = JSON.parse(data);
    items = gallery.map((item) => {
      let caption = ""
      if (item.caption){
        caption = `<figcaption>${item.caption}</figcaption>`
      }
      return `<figure class="gallery--item">
      <img src="${item.image}?nf_resize=fit&w=1400" alt="${item.alt}">
      ${caption}
      </figure>`;
    });

    return `<div class="gallery">${items.join("\n")}</div>`;
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
