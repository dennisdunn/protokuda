# Protokuda
 > A Star Trek-ish stylesheet.


### Usage

Grab the stylesheet from the repository at ```dist/protocuda.css``` or use
```https://cdn.jsdelivr.net/gh/dennisdunn/protokuda@0.4.0/dist/protokuda.min.css```

## Protokuda CSS Classes
### Top-level Container
The top level Protokuda container is the ```screen``` class. All of your framed components will be contained 
in the screen.

### Frames
Frames provide a place for content to live. There are 6 base frames and one modifier.

#### Frame Types
- Empty frame ```frame```
- Standard frame ```frame std```
- Partial frame ```frame partial```
- Mirror frame ```frame mirror```
- Vertical mirror frame ```frame vmirror```
- Brackedted frame ```frame bracket```

#### Frame modifiers
- Frame button bar ```frame std buttons```

#### Frame Contents
Each frame can have content identified by the following classes:
- ```title```
- ```label```
- ```content```
- ```button-bar```