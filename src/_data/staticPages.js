// Hand-coded pages in src/static, for the sitemap (sitemap.njk).
// 404.html, ccentric-thank-you.html and Google Search Console verification files (google*.html) are left out.
// Each entry is the page's address without ".html"; index.html is the homepage ("").
const fs = require("fs");
const path = require("path");

module.exports = () =>
  fs
    .readdirSync(path.join(__dirname, "..", "static"))
    .filter((f) => f.endsWith(".html") && f !== "404.html" && f !== "ccentric-thank-you.html" && !/^google[0-9a-f]+\.html$/.test(f))
    .map((f) => (f === "index.html" ? "" : f.replace(/\.html$/, "")))
    .sort();
