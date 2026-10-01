# Protokuda
 > A Star Trek-ish stylesheet.

[Protokuda Example](https://dennisdunn.github.io/protokuda/index.html)
### Usage

Load the Antonio font, the stylesheet, and optionally a theme. Pin the version so a new release can't change your layout unexpectedly.
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&display=swap" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dennisdunn/protokuda@2.0.0/dist/protokuda.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dennisdunn/protokuda@2.0.0/dist/themes/atomictangerine.min.css" />
```

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
- ```pk-title``` Text displayed in the upper-right of the frame.
- ```pk-label``` Content displayed in the lower-right of the frame.
- ```pk-content``` The frames main content.
- ```pk-items``` The items to be rendered in the sidebar.
- ```pk-status``` The text for the status line.

### Controls
- ```pk-button``` A sidebar-style button.
- ```pk-vertical``` On an `<input type="range">`, makes it vertical.

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

## Dynamic Theme Selection
The ```index.html``` file in the repository illustrates two techniques for
dynamically changing themes and theme components.

The first is to change the ```href=``` attribute of the of the stylesheet link in
the documents header. See the ```changeTheme()``` handler.

The second technique is to use ```data-``` attributes along with CSS attribute selectors. See the ```toggleAlert()``` handler.
Overriding `--pk-primary` on any element recolors every frame inside it, titles included.

## Migrating From 1.x
- Add `pk-` to every class name (`frame std sidebar` → `pk-frame pk-std pk-sidebar`, `screen` → `pk-screen`, `vertical` → `pk-vertical`).
- Add `--pk-` to every custom property (`--primary` → `--pk-primary`); `--danub` is now `--pk-danube`.
- The stylesheet no longer imports the Antonio font; add the `<link>` shown above.
- `--sans-font-family` / `--mono-font-family` are now `--pk-sans-font-family` / `--pk-mono-font-family`.
