# Protokuda
 > A Star Trek-ish stylesheet.

[Protokuda Example](https://dennisdunn.github.io/protokuda/index.html)
### Usage

Load the Antonio font, the stylesheet, and optionally a theme. `@2` picks up any 2.x release; pin an exact version (e.g. `@2.0.0`) if you never want your layout to change unexpectedly.
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&display=swap" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/protokuda@2/dist/protokuda.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/protokuda@2/dist/themes/atomictangerine.min.css" />
```

Or install it from npm:
```
npm install protokuda
```
and import `protokuda/dist/protokuda.css` and a theme from `protokuda/dist/themes/`.

Without a theme, Protokuda uses the Grey Smoke colors. Other themes include:
- Atomic Tangerine (atomictangerine.css)
- Grey Smoke (greysmoke.css)
- Red Alert (redalert.css)

## Playing Nicely With Your Own CSS
- **Prefix.** Every class and custom property starts with `pk-` / `--pk-`, so it won't collide with names from your app or other libraries.
- **Cascade layers.** All Protokuda rules live in `@layer protokuda.base` and themes in `@layer protokuda.theme`. Any of your own CSS that isn't in a layer beats Protokuda regardless of selector specificity, so overrides never need `!important`.
- **Scoped controls.** Form controls are only styled inside a `.pk-screen`.

## Protokuda CSS Classes
### Top-level Container
The top level Protokuda container is the ```pk-screen``` class. It is a CSS grid; lay out your frames with your own
`grid-template-areas` (see `docs/layout.css`).

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
- ```pk-title``` Text displayed in the upper-right of the frame. When the frame has a top edge, the title sits in a gap cut into it.
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
a unit, and can be set on the screen or on individual frames.

Titles, labels, status text, and buttons are uppercase with `--pk-letter-spacing` (default `0.06em`).

## Dynamic Theme Selection
The ```index.html``` file in the repository illustrates two techniques for
dynamically changing themes and theme components.

The first is to change the ```href=``` attribute of the of the stylesheet link in
the documents header. See the ```changeTheme()``` handler.

The second technique is to toggle a class on part of the page; see the ```toggleAlert()``` handler, which toggles `pk-alert`.
More generally, overriding `--pk-primary` (or any token) on an element, via a class or a `data-` attribute selector,
recolors every frame inside it, titles included.

## Migrating From 1.x
- 2.x is distributed from npm (`cdn.jsdelivr.net/npm/protokuda@...`). Existing 1.x links
  (`cdn.jsdelivr.net/gh/dennisdunn/protokuda@1.x.x/...`) keep working.
- Add `pk-` to every class name (`frame std sidebar` → `pk-frame pk-std pk-sidebar`, `screen` → `pk-screen`, `vertical` → `pk-vertical`).
- Add `--pk-` to every custom property (`--primary` → `--pk-primary`); `--danub` is now `--pk-danube`.
- The stylesheet no longer imports the Antonio font; add the `<link>` shown above.
- `--sans-font-family` / `--mono-font-family` are now `--pk-sans-font-family` / `--pk-mono-font-family`.

## Releasing
Releases are published to npm by GitHub Actions (`.github/workflows/publish.yml`) when a `vX.Y.Z` tag is pushed:
```
npm version patch   # or minor / major
```
This bumps `package.json`, commits, tags, and pushes. The workflow builds and publishes; jsDelivr and unpkg pick the new version up automatically.
