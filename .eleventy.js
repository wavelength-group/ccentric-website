module.exports = function (eleventyConfig) {
  // Copy the hand-coded static pages to the site root, and the CMS admin folder
  eleventyConfig.addPassthroughCopy({ "src/static": "." });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "post-job": "post-job" });

  // Only treat Nunjucks and Markdown as templates; .html in src/static is copied verbatim
  eleventyConfig.setTemplateFormats(["njk", "md"]);

  // Jobs collection: published only, newest first
  eleventyConfig.addCollection("jobs", (api) =>
    api
      .getFilteredByTag("jobs")
      .filter((item) => item.data.published !== false)
      .sort((a, b) => new Date(b.data.postedDate) - new Date(a.data.postedDate))
  );

  // Up to 5 other roles for a job page, excluding the current one
  eleventyConfig.addFilter("otherJobs", (jobs, currentUrl) =>
    (jobs || [])
      .filter((j) => j.url !== currentUrl)
      .slice(0, 5)
      .map((j) => ({
        title: j.data.title,
        location: j.data.location,
        type: j.data.type,
        href: "ccentric-opportunity-" + j.fileSlug + ".html",
      }))
  );

  // Look up a consultant (folder collection item) by its file slug
  eleventyConfig.addFilter("consultantBySlug", (list, slug) => {
    if (!slug || !list) return null;
    const m = (list || []).find((c) => c.fileSlug === slug);
    return m ? m.data : null;
  });

  // Strip spaces for tel: links
  eleventyConfig.addFilter("noSpace", (s) => (s || "").replace(/\s+/g, ""));

  // Listing card CSS class from the job type
  eleventyConfig.addFilter("typeClass", (t) =>
    /interim|locum/i.test(t || "") ? "interim" : "permanent"
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
};
