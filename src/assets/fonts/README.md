# Custom Fonts Folder

Upload your custom font files here. Recommended formats:
- **`.woff2`** (Strongly recommended: best compression and speed)
- **`.woff`** (Great compatibility)
- **`.ttf`** (TrueType, good compatibility)
- **`.otf`** (OpenType)

## How to use them in CSS:

After uploading your files (e.g., `MyFont-Regular.woff2`), you can define them in `/src/index.css` using the `@font-face` directive:

```css
@font-face {
  font-family: 'MyCustomFont';
  src: url('./assets/fonts/MyFont-Regular.woff2') format('woff2'),
       url('./assets/fonts/MyFont-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

And then add them to your Tailwind theme configuration inside the same `/src/index.css` file under `@theme`:

```css
@theme {
  --font-custom: "MyCustomFont", sans-serif;
}
```
