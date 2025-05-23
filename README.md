# @milandadhaniya/local-storage-hook

A simple and typed utility for interacting with `localStorage` in the browser using TypeScript. Built-in support for structured key-value storage, nested field manipulation, custom event dispatching, and optional logging using [`@milandadhaniya/tiny-logger-js`](https://www.npmjs.com/package/@milandadhaniya/tiny-logger-js).

---

## 📦 Installation

```bash
npm install @milandadhaniya/local-storage-hook
```

---

## 📚 API

```ts
import {
  setItem,
  getItem,
  removeItem,
  clearStorage
} from '@milandadhaniya/local-storage-hook';
```

---

## 🧪 Usage Examples

### ✅ `setItem`

Sets a value in localStorage. Returns `true` if successful, `false` otherwise.

```ts
// Set a raw value
setItem('AppSettings', null, {
  themeOptions: ['dark', 'light'],
  language: 'en',
  notifications: {
    enabled: true,
    sound: true,
    vibration: false
  },
  font: {
    family: 'Arial'
  }
});

// Set an object field
setItem('AppSettings', 'font', {
  size: '16px',
  family: 'Arial'
});

// Enable logging (Default: false)
setItem('SelectedTheme', null, 'dark', true);
```

### 📥 `getItem`

Retrieves a value from localStorage. Returns the requested value or `undefined` if not found.

```ts
// Get the raw value
const raw = getItem('AppSettings');

// Get nested field from object
const notifications = getItem('AppSettings', 'notifications');
```

### 🗑️ `removeItem`

Removes an item from localStorage. Returns `true` if successful, `false` otherwise.

```ts
// Remove specific field from an object (Enable logging)
removeItem('AppSettings', 'font', true);

// Remove the full key
removeItem('AppSettings');
```

### 🧹 `clearStorage`

Clears all items from localStorage. Returns `true` if successful, `false` otherwise.

```ts
// Clear everything
clearStorage();

// With logging
clearStorage(true);
```

### 🎧 Listen for Changes

```ts
const handler = (e: CustomEvent) => {
  console.log('Storage event fired:', e.detail);
};

window.addEventListener('local-storage-change', handler);

// Later, to clean up
window.removeEventListener('local-storage-change', handler);
```

---

## 📄 License

MIT License — © 2025 Milan Dadhaniya
