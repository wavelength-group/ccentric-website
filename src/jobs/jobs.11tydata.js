module.exports = {
  layout: "job.njk",
  tags: "jobs",
  eleventyComputed: {
    // Unpublished jobs produce no page
    permalink: (data) =>
      data.published === false
        ? false
        : `ccentric-opportunity-${data.page.fileSlug}.html`,
  },
};
