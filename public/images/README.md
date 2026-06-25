# Custom Public Images Folder (Recommended)

Upload your custom images here. Any image placed in this folder can be referenced directly with an absolute path starting from `/images/`.

## Formats Recommended:
- **`.webp`** (Strongly recommended for performance and small size)
- **`.svg`** (Vector graphics)
- **`.png`** (Transparent elements)
- **`.jpg` / `.jpeg`** (High-quality photos)

## How to use them in React:
If you upload an image called `my-hero.webp` into this folder, you can reference it in your React components using:

```tsx
<img 
  src="/images/my-hero.webp" 
  alt="My Hero Image" 
  referrerPolicy="no-referrer"
/>
```
