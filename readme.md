# Protokuda
 > A Star Trek-ish stylesheet.

[Protokuda Example](https://dennisdunn.github.io/protokuda/index.html)
### Usage

Load the Antonio font, the stylesheet, and optionally a theme. `@3` picks up any 3.x release; pin an exact version (e.g. `@3.0.0`) if you never want your layout to change unexpectedly.
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&display=swap" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/protokuda@3/dist/protokuda.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/protokuda@3/dist/themes/atomic.min.css" />
```

Or install it from npm:
```
npm install protokuda
```
and import `protokuda/dist/protokuda.css` and a theme from `protokuda/dist/themes/`.

Without a theme, Protokuda uses the Grey Smoke colors. The themes are:

| Theme | File | Class |
| --- | --- | --- |
| Anakiwa | `anakiwa.css` | `pk-theme-anakiwa` |
| Atomic | `atomic.css` | `pk-theme-atomic` |
| Golden Tanoi | `goldentanoi.css` | `pk-theme-goldentanoi` |
| Grey Smoke | `greysmoke.css` | `pk-theme-greysmoke` |
| Husk | `husk.css` | `pk-theme-husk` |
| Lilac | `lilac.css` | `pk-theme-lilac` |
| Navy | `navy.css` | `pk-theme-navy` |

Linking a theme file themes the whole page. Every theme is also built into `protokuda.css` as a class:
put it on `<html>` to theme the page, or on a frame (or any element) to theme just that part:
```html
<div class="pk-frame pk-std pk-theme-lilac">...</div>
```

## Playing Nicely With Your Own CSS
- **Prefix.** Every class and custom property starts with `pk-` / `--pk-`, so it won't collide with names from your app or other libraries.
- **Cascade layers.** Protokuda's rules live in `@layer protokuda.base`, themes in `@layer protokuda.theme`, and alerts in `@layer protokuda.state` (so an alert beats a frame's theme). Any of your own CSS that isn't in a layer beats Protokuda regardless of selector specificity, so overrides never need `!important`.
- **Scoped controls.** Form controls are only styled inside a `.pk-screen`.

## Protokuda CSS Classes
### Top-level Container
The top level Protokuda container is the ```pk-screen``` class. It is a CSS grid; lay out your frames with your own
`grid-template-areas` (see `demo/layout.css`).

### Frames
Frames provide a place for content to live.

#### Frame Types
- ```pk-frame``` The default frame, a thin box.
- ```pk-frame pk-std``` The standard frame with left, top, and bottom edges.
- ```pk-frame pk-partial``` A frame with left and bottom edges.
- ```pk-frame pk-bracket``` A frame with left and right edges.

#### Frame modifiers
- ```pk-sidebar``` Provides space on the left edge for buttons.
- ```pk-statusline``` Provides space on the bottom edge for text.
- ```pk-mirror``` Horizontal mirroring (the sidebar, title, and label move with it).
- ```pk-flip``` Vertical mirroring (the statusline moves with it).

#### Frame Contents
Each frame can have content identified by the following classes:
- ```pk-title``` Text displayed in the upper-right of the frame. When the frame has a top edge, the title becomes a nameplate on it, in the frame color with `--pk-on-primary` text.
- ```pk-label``` Content displayed in the lower-right of the frame.
- ```pk-content``` The frames main content.
- ```pk-items``` The items to be rendered in the sidebar.
- ```pk-status``` The text for the status line.

### Controls
- ```pk-button``` A sidebar-style button. Give it a `data-code` attribute (e.g. `data-code="47-1138"`) to show a code number in its lower-right corner.
- ```pk-vertical``` On an `<input type="range">`, makes it vertical.

### Alerts
- ```pk-alert``` On a frame (local alert) or the screen (global alert): switches primary to `--pk-error` and pulses it. The pulse is disabled for viewers who prefer reduced motion.

### Color Utilities
Each palette color has `pk-<name>-bg`, `pk-<name>-border`, and `pk-<name>-color` classes, e.g. `pk-neon-carrot-bg`.

## Tokens
Themes are just sets of custom properties. The main ones:

| Token | Purpose |
| --- | --- |
| `--pk-primary` / `--pk-on-primary` | Frame edges and text on them |
| `--pk-backdrop`, `--pk-backdrop-light` | Page and frame interior |
| `--pk-text` | Frame content text |
| `--pk-on-backdrop` | Titles and labels. Optional: when unset it follows `--pk-primary` |
| `--pk-secondary*`, `--pk-accent*` | Supporting colors; accent is used for inputs and focus rings |
| `--pk-button-bg`, `--pk-button-fg`, `--pk-button-hover-bg`, `--pk-button-hover-fg` | Buttons |
| `--pk-error` / `--pk-on-error` | Alerts |

Frame geometry is tokenized too: `--pk-frame-line`, `--pk-frame-bar`, `--pk-frame-side`,
`--pk-frame-radius`, `--pk-sidebar-width`, and `--pk-statusline-height`.

`--pk-inner-radius` controls how far along the road to LCARS you are. At its default of `0rem`
the inside of each elbow is square; around `1.5rem` it gets the familiar LCARS curve. It needs
a unit, and can be set on the screen or on individual frames. It applies to `pk-std` and `pk-partial`
frames; plain box frames keep thin, evenly rounded corners.

The outer corners follow `--pk-frame-radius`, and two optional tokens split it: `--pk-elbow-radius`
rounds the elbow corners (the sidebar side) and `--pk-end-radius` the far corners, where the top and
bottom bars end. Set `--pk-end-radius: 0rem` for square bar ends. Both follow `--pk-frame-radius`
when unset, and follow `pk-mirror` to whichever side the elbow is on.

Titles, labels, status text, and buttons are uppercase with `--pk-letter-spacing` (default `0.06em`).

## Dynamic Theme Selection
The ```demo/index.html``` file in the repository illustrates two techniques for
dynamically changing themes and theme components.

The first is to set a theme class: the ```setTheme()``` handler puts `pk-theme-<name>` on `<html>` for the
page theme, or on the Standard Frame for a frame theme. (If you link a theme file instead, changing that
`<link>`'s `href` switches the page theme.)

The second technique is to toggle a class on part of the page; see the ```toggleAlert()``` handler, which toggles `pk-alert`.
More generally, overriding `--pk-primary` (or any token) on an element, via a class or a `data-` attribute selector,
recolors every frame inside it, titles included.

## Migrating From 2.x
Existing `@2` links keep working; 2.x stays on npm. To move to 3.x:
- Change `@2` to `@3` in your CDN links.
- **Atomic Tangerine is now Atomic:** `themes/atomictangerine.css` → `themes/atomic.css`.
- **The Red Alert theme is gone.** For alerts, use the `pk-alert` class; for a color scheme, pick another theme.
- **A third cascade layer.** Alerts moved from `protokuda.base` into a new `protokuda.state` layer, after
  `protokuda.theme`, so an alert wins over a frame's theme. If your own CSS declares Protokuda's layer
  order, add it: `@layer protokuda.base, protokuda.theme, protokuda.state;`.

New in 3.0: the Anakiwa, Golden Tanoi, Husk, Lilac, and Navy themes, and theme classes
(`pk-theme-<name>`) for theming a single frame or section.

## Migrating From 1.x
- 2.x and later are distributed from npm (`cdn.jsdelivr.net/npm/protokuda@...`). Existing 1.x links
  (`cdn.jsdelivr.net/gh/dennisdunn/protokuda@1.x.x/...`) keep working.
- Add `pk-` to every class name (`frame std sidebar` → `pk-frame pk-std pk-sidebar`, `screen` → `pk-screen`, `vertical` → `pk-vertical`).
- Add `--pk-` to every custom property (`--primary` → `--pk-primary`); `--danub` is now `--pk-danube`.
- The stylesheet no longer imports the Antonio font; add the `<link>` shown above.
- `--sans-font-family` / `--mono-font-family` are now `--pk-sans-font-family` / `--pk-mono-font-family`.
- Then follow "Migrating From 2.x" above.

## Development
The library source is in `src/`: `protokuda.css` is the entry point and `@import`s the
other files into their cascade layers; themes are in `src/themes/`. The demo page is in `demo/`.

```
npm install
npm run dev
```
`npm run dev` serves the demo at http://localhost:3000 straight from `src/` (browsers understand
the layered `@import`s natively, so there is no build step). Edits to the CSS are injected
without reloading the page.

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server with live CSS injection (browser-sync) |
| `npm run build` | Bundles and minifies `src/` into `dist/` with Lightning CSS |
| `npm run build:site` | `build`, then assembles the demo site in `_site/` |

## Releasing
```
npm version patch   # or minor / major
```
This fetches tags first (so a version already tagged on GitHub fails before anything changes),
then bumps `package.json`, commits, tags, and pushes. The tag triggers `.github/workflows/publish.yml`,
which publishes to npm and deploys the demo to GitHub Pages. jsDelivr and unpkg pick the new
version up automatically. Running the workflow by hand from the Actions tab redeploys the site only.

## Acknowledgments
Protokuda wouldn't exist without the designers and developers who have spent countless hours
recreating LCARS for the web: the hand-built stylesheets, templates, frameworks, and fan sites
that taught the rest of us how those elbows, bars, and buttons fit together. Your attention to
detail and generosity in sharing your work made this project possible. Thank you.

And, of course, to Michael Okuda, whose designs started it all and gave this project its name.
