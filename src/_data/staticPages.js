// Hand-coded pages in src/static, for the sitemap (sitemap.njk).
// Each entry is the page's address without ".html"; index.html is the homepage ("").
const fs = require("fs");
const path = require("path");

module.exports = () =>
  fs
    .readdirSync(path.join(__dirname, "..", "static"))
    .filter((f) => f.endsWith(".html") && f !== "404.html")
    .map((f) => (f === "index.html" ? "" : f.replace(/\.html$/, "")))
    .sort();
