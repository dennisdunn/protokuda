# Protokuda
 > A Star Trek-ish stylesheet.


### Usage

Grab the stylesheet from the repository at ```dist/protocuda.css``` or use
```https://cdn.jsdelivr.net/gh/dennisdunn/protokuda/dist/protokuda.min.css```

An example theme is available at 
```https://cdn.jsdelivr.net/gh/dennisdunn/protokuda/dist/themes/atomictangerine.min.css```

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
