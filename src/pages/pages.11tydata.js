module.exports = {
  layout: "page.njk",
  eleventyComputed: {
    permalink: (data) => `ccentric-${data.page.fileSlug}.html`,
  },
};
