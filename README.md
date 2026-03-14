# Photo Gallery — Celebrare Frontend Internship Assignment

A responsive photo gallery built with **React + Vite + Tailwind CSS v4**, fetching photos from the Picsum Photos public API.

**Live Demo →** https://react-photo-gallery-assignment.vercel.app/
**Record video Demo →** https://drive.google.com/file/d/1yqZUlMPiV3j37qf8cKBLLqbdNeeh5ACg/view?usp=sharing

---

## What it does

- Fetches 30 photos from the Picsum Photos API on load
- Displays them in a responsive grid (1 col on mobile, 2 on tablet, 4 on desktop)
- Real-time search filter by author name — no extra API calls
- Heart button to mark photos as favourites — persists across page refreshes
- Loading spinner while fetching, error message if the API fails

---

## Tech Stack

| Tool | Version | Why |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool / dev server |
| Tailwind CSS | 4 | Styling (utility classes only) |

No component libraries used. No Bootstrap, no MUI, no Ant Design.

---

## Project Structure

```
src/
├── App.jsx                  # Root component — header + search bar
├── main.jsx                 # React entry point
├── index.css                # Tailwind v4 import + global styles
├── hooks/
│   └── useFetchPhotos.js    # Custom hook — fetch logic lives here
└── components/
    ├── Gallery.jsx          # Grid + useReducer + useCallback + useMemo
    └── PhotoCard.jsx        # Single photo card with heart toggle
```

---

## How to Run Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/photo-gallery.git
cd photo-gallery

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Key Implementation Details

### Custom Hook — `useFetchPhotos`

All the fetch logic is extracted into a custom hook so the Gallery component stays clean. The hook returns three values: `photos`, `loading`, and `error`. If the API request fails for any reason, the error is caught and stored in state — the Gallery then renders an error message instead of crashing.

```js
const { photos, loading, error } = useFetchPhotos();
```

### Favourites with `useReducer`

Favourites state is managed with `useReducer` instead of `useState`. There's one action — `TOGGLE` — that either adds or removes a photo ID from the favourites array. Every time the state changes, it's saved to `localStorage` so favourites survive a page refresh.

```js
function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      const updated = state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id];
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    default:
      return state;
  }
}
```

### `useCallback` and `useMemo`

`useCallback` wraps the toggle handler so its reference stays stable across renders. Without it, a new function would be created on every render.

`useMemo` computes the filtered photo list — it only re-runs when `photos` or `searchQuery` actually changes, not on every render.

```js
const handleToggle = useCallback((id) => {
  dispatch({ type: "TOGGLE", id });
}, []);

const filteredPhotos = useMemo(() => {
  if (!searchQuery.trim()) return photos;
  return photos.filter((p) =>
    p.author.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [photos, searchQuery]);
```

---

## Hardest Part

Getting `useReducer` to work correctly with `localStorage` was the trickiest bit. The initial state has to be loaded from `localStorage` using an initializer function — if you pass the parsed value directly, it only reads from storage once on the first render but doesn't handle the case where storage is empty or corrupted. Wrapping it in a function that catches errors made it reliable.

---

