# Kyler — Developer Portfolio

Live: https://mrsufferer.github.io/

A responsive static portfolio featuring Oreka, Chakra, Kamui, FleetPay, and Haze API. No package installation or build step is required.

## Preview

Run `python3 -m http.server 4173` and open http://localhost:4173.

## Update

Edit `index.html` for content, `styles.css` for styling, and `script.js` for the screenshot viewer. `projects.json` records project content for future tooling; it is not loaded at runtime. Replace GitHub contact links in the contact section when an Upwork profile or email is supplied.

Push to `main` to deploy through GitHub Actions. The workflow publishes only HTML, CSS, JavaScript, and assets; research and documentation are excluded from the deployment.

See `docs/content-sources.md` for screenshot provenance and project descriptions.
