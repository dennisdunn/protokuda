# Protokuda
 > A Star Trek-ish stylesheet.

[Protokuda Example](https://dennisdunn.github.io/protokuda/index.html)
### Usage

Grab the stylesheet from 
```https://cdn.jsdelivr.net/gh/dennisdunn/protokuda/dist/protokuda.min.css```

An example theme is available at 
```https://cdn.jsdelivr.net/gh/dennisdunn/protokuda/dist/themes/atomictangerine.min.css```

Other themes include:
- Grey Smoke (greysmoke.css)
- Red Alert (redalert.css)

## Protokuda CSS Classes
### Top-level Container
The top level Protokuda container is the ```screen``` class. All of your framed components will be contained 
in the screen.

### Frames
Frames provide a place for content to live. 

#### Frame Types
- ```frame``` The default frame.
- ```frame std``` The standard frame with left, top, and bottom edges.
- ```frame partial``` A frame with left and bottom edges.
- ```frame bracket``` A frame with left and right edges.

#### Frame modifiers
- ```sidebar``` Provides space on the left edge for buttons.
- ```statusline``` Provides space on the bottom edge for text.
- ```mirror``` Horizontal mirroring.
- ```flip``` Vertical mirroring.

#### Frame Contents
Each frame can have content identified by the following classes:
- ```title``` Text displayed in the upper-right of the frame.
- ```label``` Content displayed in the lower-right of the frame.
- ```content``` The frames main content.
- ```items``` The items to be rendered in the sidebar.
- ```status``` The text for the status line.

## Dynamic Theme Selection
The ```index.html``` file in the repository illustrates two techniques for
dynamically changing themes and theme components.

The first is to change the ```href=``` attribute of the of the stylesheet link in
the documents header. See the ```changeTheme()``` handler.

The second technique is to use ```data-``` attributes along with CSS attribute selectors. See the ```toggleAlert()``` handler.
