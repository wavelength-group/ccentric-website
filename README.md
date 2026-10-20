# Ccentric Executive Search - website

Static website for Ccentric, built with [Eleventy](https://www.11ty.dev/) and
edited through [Sveltia CMS](https://sveltiacms.app/). Hosted on Netlify, owned
by the `wavelength-group` GitHub organisation.

## How it works

- **Marketing pages** (homepage, industries, consulting, resources, contact, team,
  track record) are hand-coded HTML in `src/static/` and copied to the site as-is.
- **Job opportunities** are content files in `src/jobs/` (one Markdown file per role).
  Eleventy renders each one into an individual job page and rebuilds the
  `Opportunities` listing automatically. Add, edit or remove a job by changing these
  files - never by editing HTML.
- **Consultants** (`src/consultants/`) are the contacts that can be attached to a role.
  A role with a consultant shows that person's phone and email in "How to Apply";
  a role without one shows the generic Ccentric wording.
- `netlify.toml` tells Netlify to run `npm run build` (Eleventy) and publish `_site/`.

## Editing content

- **Full admin** (marketing): `/admin` - all roles plus the consultant list.
- **Post a job** (Ccentric team): `/post-job` - jobs only.

Both sign in with GitHub. Editors need a GitHub account added to the
`wavelength-group` organisation with write access to this repository.

## Local development

```bash
npm install
npm run build      # outputs to _site/
npm run serve      # local preview at http://localhost:8080
```

## Notes

- No build step touches the marketing pages; they pass through unchanged.
- Images are inlined in the HTML, so there are no external asset files to manage.
- "How to Apply" is generated automatically from the role's consultant - do not
  write it into the role detail.
