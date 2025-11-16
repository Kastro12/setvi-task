# SETVI -- Senior React Engineer Task

This is a React 19 + TypeScript application implementing a virtualized,
infinite-scroll product table with search, category filtering, item detail drawer,
and an AI-style summary generator rendered with a typewriter effect.

---

# Tech Stack

- **React 19**
- **TypeScript**
- **React Query (TanStack Query)** for async state
- **React Window** for virtualization
- **MUI + Emotion** for consistent UI styling
- **Axios** for API communication\
- **React Router v7** for routing
- **Vite** for build & development

---

# Setup & Run Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Kastro12/setvi-task.git
cd setvi-task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Create production build

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

---

# Project Architecture Overview

The project follows a **feature‑based architecture**, ensuring
separation of concerns, scalability, and clarity.

    src/
    │
    ├─ api/                # API modules (axios wrappers)
    │   ├─ api.ts
    │   ├─ productsApi.ts
    │   ├─ categoriesApi.ts
    │   └─ quotesApi.ts
    │
    ├─ components/         # Reusable UI components
    │   ├─ alerts/
    │   │   └─ ErrorAlert.tsx
    │   ├─ formFields/
    │   │   ├─ index.ts
    │   │   ├─ SearchBar.tsx
    │   │   └─ SelectField.tsx
    │   ├─ navbar/
    │   │   └─ Navbar.tsx
    │   └─ table/
    │       ├─ LoaderRow.tsx
    │       ├─ TableHeader.tsx
    │       ├─ Table.tsx
    │       └─ types.ts
    │
    ├─ hooks/              # Data logic (React Query hooks)
    │   ├─ products.ts
    │   ├─ categories.ts
    │   └─ useTypewriterSummary.ts
    │
    ├─ pages/
    │   └─ products/
    │       ├─ components/
    │       │   ├─ CategoriesField.tsx
    │       │   └─ ProductDrawer.tsx
    │       ├─ index.ts
    │       └─ ProductsListPage.tsx
    │
    ├─ router/
    │   └─ index.tsx       # App routes
    │
    ├─ styles/
    │   └─ global.css
    │
    ├─ types/              # Global TypeScript models
    │   ├─ categories.ts
    │   └─ products.ts
    │
    ├─ App.tsx
    └─ main.tsx

---

# Data Flow Summary

### **Products List Page**

1.  `useProductsList` handles:
    - pagination using `limit + skip`
    - infinite scrolling
    - debounced search
    - category filtering
    - URL search params sync
2.  `Table.tsx` (React Window):
    - renders virtualized rows
    - includes loader row at the bottom
    - triggers `fetchNextPage()` when loader becomes visible
3.  Clicking a product row ➝ opens **ProductDrawer**

---

### **Product Drawer**

Fetches: - product details (`/products/{id}`) - cached quotes (fetched
once)

Contains: - product info - tags - AI Summary section

---

### **AI Summary (Typewriter)**

Implemented via:

    useTypewriterSummary.ts

Features: - fetches all quotes once - merges all quotes into large
text - saves summary in **localStorage per product ID** - includes
blinking caret + per‑character animation

---

# Trade‑offs & What I Would Do With More Time

### Trade-offs

- Used **React Window** over React Virtualized (lighter, simpler for
  this use case).
- Used **MUI** for faster development instead of building custom
  components.
- Search & categories share the same infinite query for simplicity.

### With more time, I would:

- Add unit tests (React Testing Library + Vitest).
- Split some components further for better readability.
- I would centralize all Material UI styling by moving repeated sx objects into a global theme, defining custom variants and overrides (e.g., for buttons, drawers, tags, and layout boxes) to unify colors, spacing, typography...

---