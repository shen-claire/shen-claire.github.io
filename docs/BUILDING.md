# Local assets

The website remains a static site. Generated `css/utilities.css` and
`js/vendor/icons.js` are checked in, so GitHub Pages needs no build service.

After changing utility class names in HTML or JavaScript, run:

```sh
cd tooling
pnpm install --frozen-lockfile --ignore-scripts
pnpm build
pnpm test
```

Node.js 18 or newer is required for building. `npm install` and `npm run build`
also work, but the pinned pnpm lockfile provides repeatable dependency versions.
Only development uses these packages; visitors download the generated CSS and
the small icon bundle. Third-party licenses are in `licenses/`.

Build dependencies, configuration, CSS input, scripts, and tests live in `tooling/`.
The commands above run from that folder and write the generated assets back to
the site's `css/` and `js/vendor/` folders.

Keep icon imports in `tooling/scripts/icons.js` in sync when adding interface icons.
The artwork files and their resolution are unchanged. Google Fonts still serves
the existing typefaces with the original font-display behavior.
