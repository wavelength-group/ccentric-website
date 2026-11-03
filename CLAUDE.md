# Ccentric website — house rules for Claude

Read this before making any change. README.md explains how the site is built.

## Workflow

- Run `npm run build` before every commit. Do not push if it fails.
- For anything visual (layout, sizes, colours, spacing, images), take Playwright screenshots at desktop (1280–1440px) and mobile (390px) widths and check them before pushing.
- Commit with a clear message and push to `main`. Netlify deploys automatically.
- For large changes (new pages, redesigns, navigation changes), ask whether to use a separate branch and pull request so John can review first.
- After pushing, tell the user what changed, the commit hash, and anything you could not verify.

## Site structure gotchas

- **The homepage exists twice:** `src/static/index.html` and `src/static/ccentric-stacked-impact-final.html` (the logo links to the second one). Any homepage change must be made in both files.
- Marketing pages in `src/static/` are hand-coded HTML. Each one has its own copy of the header and footer, so footer and navigation changes must be made in every file, plus `src/_includes/page.njk`, `src/_includes/job.njk` and `src/opportunities.njk`. Use grep to find every occurrence.
- Pages in `src/pages/` use `page.njk`. `title` sets the browser tab; the optional `heading` overrides the on-page H1.
- **The live domain has not been switched yet.** ccentric.com.au still serves the old site. The new site is at ccentric-website.netlify.app. Do not tell users a change is "live on ccentric.com.au".

## Jobs (`src/jobs/`)

- Copy the frontmatter format of an existing job. References run in sequence (CC-1050 was the last used). Consultants must match a file in `src/consultants/`.
- Do NOT add a "How to Apply" section: it is generated from the consultant.
- When a role is filled, set `published: false`. Do not delete the file unless asked.
- Ask for the location and consultant if the ad does not state them. Do not guess.
- Fix obvious typos in pasted ads and tell the user what you changed.

## Brand facts (keep consistent everywhere)

- Legal name: Ccentric International Pty Ltd (ABN 89 629 975 775), wholly owned by Wavelength International Pty Ltd ("part of the Wavelength Group"). In the footer, "Wavelength Group" links to https://www.wavepeople.com.
- Years in business: **26+ years**. The site also says "Since 2001" (this conflict is unresolved, so flag it rather than change it).
- Stats row: 26+ YEARS · 55% ♀ APPOINTMENTS · 800+ PLACEMENTS · 10 COUNTRIES.
- Sector list, always in full and in this order: healthcare, academia, digital health, life sciences, aged care, not-for-profit and private equity.
- Main phone line: +61 2 8422 5300 (Sydney). It is used for all offices.
- Offices: Sydney (67-77 Flinders St, Surry Hills NSW 2010), Melbourne (Level 3, 11-19 Bank Place, Melbourne VIC 3000), Brisbane (76-84 Brunswick St, Fortitude Valley QLD 4006), Gold Coast (Level 2, Robina Town Centre, 19 Robina Town Centre Drive, Robina QLD 4226).
- Contact page email shows enquiries@ccentricsearch.com but links to john@ccentricsearch.com until an enquiries@ alias exists.
- Privacy contact: privacy@ccentric.com.au.

## Writing style

- Australian spelling (organisation, specialising, licence).
- Plain, confident and specific. No hype, no exclamation marks.
- The Wavelength Group statement on the About page (more than 25 years, group offices) is about Wavelength, not Ccentric. Do not change it when updating Ccentric figures.

## Ask John before changing

- The Privacy Policy or Website Terms of Use (`src/pages/privacy.md`). These are legal text.
- `netlify.toml`, `admin/`, `post-job/`, `.eleventy.js` or `package.json`.
- Brand facts above, unless the user gives the new figure.
- Deleting pages or jobs.
