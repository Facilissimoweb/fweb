# Custom Src Assets Images Folder

Upload images here if you prefer to import them dynamically via TypeScript/Vite.

## How to use them in React:
If you upload an image called `logo.png` into this folder, you can import and use it in your React files:

```tsx
import myLogo from '../assets/images/logo.png';

export default function MyComponent() {
  return (
    <img 
      src={myLogo} 
      alt="Logo" 
      referrerPolicy="no-referrer"
    />
  );
}
```
