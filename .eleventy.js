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
  eleventyConfig.addFilter("srcset", function (url, format) {
    const sizes = [500, 1000, 1500, 2000];
    let file = url.split(".");
    let output = [];
    sizes.forEach((s) => {
      let filename = `${file[0]}@${s}w.${format}`;
      try {
        fs.accessSync(`./_site/${filename}`, fs.constants.R_OK);
        output.push(`${filename} ${s}w`);
      } catch (err) {
        // console.log(`Media file ${filename} does not exist, skipping.`);
      }
    });
    return output.join(",");
  });

  eleventyConfig.addCollection("featuredProjects", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob(["./projects/*.md"])
      .filter(function (item) {
        return siteSettings.featured_projects.indexOf(item.data.title) > -1;
      });
  });

  eleventyConfig.addFilter("size", function (url, size) {
    let file = url.split(".");
    let filename = `${file[0]}@${size}w.jpg`;
    let output = "";
    try {
      fs.accessSync(`./_site/${filename}`, fs.constants.R_OK);
      output = `${filename}`;
    } catch (err) {
      console.log(`Media file ${filename} does not exist, skipping.`);
    }
    return output;
  });

  eleventyConfig.addPassthroughCopy("./assets");
  eleventyConfig.addPassthroughCopy("./admin");
  eleventyConfig.addPassthroughCopy("./dist");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("/*.xml");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addWatchTarget("./dist/main.js");

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSass, {});
};
