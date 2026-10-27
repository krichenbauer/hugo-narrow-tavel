# Hugo Narrow Tavel (Travel Guide Edition)

This theme is tailored for responsive travel-guide sites built with Hugo.

It is intended for content models centered around areas, places, day trips, map overviews,
and practical trip information, while keeping Markdown content portable for
future exports (for example EPUB or PDF workflows).

## Base Theme Origin

This repository is based on the original Hugo Narrow theme:

- Upstream project: https://github.com/tom2almighty/hugo-narrow
- Upstream documentation: https://tom2almighty.github.io/hugo-narrow-docs

The current variant extends that base toward travel-guide use cases.

## Travel-Guide Focus

- Place-oriented content structure with page bundles (areas, places, day trips)
- Card-based list views for places, day trips, and taxonomies
- Area pages list all places of the area (`area` slug), `highlight_places` first
- Place and day trip pages: hero, title, rating, a collapsible „Praktische Infos“ box
  (area, `name_ja`, categories, Google/Apple/OpenStreetMap links, website, taxi view),
  body, gallery, and on places „In der Nähe“ (up to 3 places within 1.5 km)
- Taxi view: full-screen `name_ja`/`address_ja` (`static/js/taxi-view.js`); without
  JavaScript the address is shown as text instead
- Hero image and bundle gallery support; only resized derivatives of raster images are
  linked (`_partials/content/image-derivative.html`)
- Map overview via Leaflet with OpenStreetMap attribution
- Responsive layout and keyboard-accessible interactions
- Portable Markdown-first authoring approach

## Site Configuration

```yaml
# config/_default/params.yaml
home:
  contentOrder:
    - intro                    # page title as heading, then content/_index.md
    - extraordinary-highlights # 3-star places and areas

map:
  center: [44.8125, 20.4612]   # initial view of the map
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

Areas and places are circles, day trips are squares. Marker colors exist for `area`,
`daytrip`, `sightseeing`, `viewpoint`, `museum`, `park`, and `food` (first category of a
place). The legend only lists categories in use, and day trips only when there are any.

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
