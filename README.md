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

## Site Configuration

```yaml
# config/_default/params.yaml
home:
  contentOrder:
    - intro                    # renders content/_index.md (optional)
    - extraordinary-highlights # 3-star places and areas

map:
  center: [44.8125, 20.4612]   # initial view before markers load; map then fits to markers
  zoom: 13
```

## Image Captions And Credits

Hero and gallery images show a caption from page resource metadata
(`layouts/_partials/content/image-caption.html`):

```yaml
resources:
  - src: hero.jpg
    title: "Caption"
    params:
      alt: "Alt text"
      credit: "Foto: Name, CC BY-SA 4.0"
      credit_url: "https://commons.wikimedia.org/wiki/File:..."
```

The hero is excluded from the gallery. Area pages show a hero image as well; basics pages show a gallery.

## Map Legend

Marker colors exist for `area`, `sightseeing`, `viewpoint`, `museum`, `park`, `food` and
`restaurant` (first category of a place). The legend only lists categories in use.

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
