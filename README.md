# todo-sandbox

A deliberately small Next.js todo app used as a test repo for testing. Todos live in `localStorage`; there is no backend.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Layout

- `src/lib/todos.ts` — `Todo` type, storage, and filter helpers
- `src/components/TodoApp.tsx` — state and the main UI
- `src/components/TodoItem.tsx` — a single row
- `src/app/page.tsx` — the page
