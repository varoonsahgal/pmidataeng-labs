Student lab guides for the PMI Data Engineer Future Skills class (Project HORIZON, fictional and training-only): static HTML built from `_template.html` with `assets/site.css` and `assets/site.js`.
Live at https://varoonsahgal.github.io/pmidataeng-labs/ (GitHub Pages serves this folder as-is; `.nojekyll` keeps it from being processed by Jekyll).
To view locally, run `python3 -m http.server 8000` in this folder and open http://localhost:8000/ (opening the .html files directly also works).

The four lab pages (`hour1.html`–`hour4.html`) also load `assets/lab.css` and `assets/lab.js`, the illustrated lab layer: a hero with `images/labN-hero.svg`, a mission-brief ticket, a route map of the steps, `.stage` step banners with inline art, `.tally` before/after numbers, an `.earned` badge and next-lab cards. Each page sets its accent with `<body class="lab lab-N">`. Link-preview images for sharing live in `images/og/` (1200×630).

`instructor-hour1.html` is the Hour 1 instructor guide (tables in plain words, every number, a timed script, rescue SQL). It is deliberately not linked from the student pages and carries `noindex`, but like everything here it is public to anyone with the URL.
