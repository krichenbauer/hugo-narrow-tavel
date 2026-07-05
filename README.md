# Hugo Narrow Tavel (Travel Guide Edition)

This theme is tailored for responsive travel-guide sites built with Hugo.

It is intended for content models centered around places, routes, map overviews,
and practical trip information, while keeping Markdown content portable for
future exports (for example EPUB or PDF workflows).

## Base Theme Origin

This repository is based on the original Hugo Narrow theme:

- Upstream project: https://github.com/tom2almighty/hugo-narrow
- Upstream documentation: https://tom2almighty.github.io/hugo-narrow-docs

The current variant extends that base toward travel-guide use cases.

## Travel-Guide Focus

- Place-oriented content structure with page bundles
- Card-based list views for places and taxonomies
- Metadata blocks for district, address, opening hours, and links
- Hero image and bundle gallery support
- Map overview via Leaflet with OpenStreetMap attribution
- Responsive layout and keyboard-accessible interactions
- Portable Markdown-first authoring approach

## Development

Run the local example site:

```bash
hugo server --source exampleSite
```

Format theme templates and assets (if pnpm is installed):

```bash
pnpm install
pnpm run format:write
```

## License

This project is open source under the [MIT License](LICENSE).
