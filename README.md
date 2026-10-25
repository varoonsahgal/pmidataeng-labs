Student lab guides for the PMI Data Engineer Future Skills class (Project HORIZON, fictional and training-only): static HTML built from `_template.html` with `assets/site.css` and `assets/site.js`.
Live at https://varoonsahgal.github.io/pmidataeng-labs/ (GitHub Pages serves this folder as-is; `.nojekyll` keeps it from being processed by Jekyll).
To view locally, run `python3 -m http.server 8000` in this folder and open http://localhost:8000/ (opening the .html files directly also works).

The four lab pages (`hour1.html`–`hour4.html`) also load `assets/lab.css` and `assets/lab.js`, the illustrated lab layer: a hero with `images/labN-hero.svg`, a mission-brief ticket, a route map of the steps, `.stage` step banners with inline art, `.tally` before/after numbers, an `.earned` badge and next-lab cards. Each page sets its accent with `<body class="lab lab-N">`. Link-preview images for sharing live in `images/og/` (1200×630).

`instructor-hour1.html` to `instructor-hour4.html` are the instructor guides (tables in plain words, every number, a timed script, rescue SQL, and the full challenge solutions). They are deliberately not linked from the student pages and carry `noindex`, but like everything here they are public to anyone with the URL.

Each lab page follows the same clarity format: a "mission in 60 seconds", the data shown with real rows, a "where you are" trail, query cards (question, why, SQL, line by line, every possible result, what it means), "done when" checklists, and four challenges with hints and expected answers. The components (`.trail`, `.qcard`, `.lines`, `.results`, `.sample`, `.sqlcard`, `.bignum`, `.termout`, `details.fold`, `.challenge`) are defined in `assets/lab.css`.
