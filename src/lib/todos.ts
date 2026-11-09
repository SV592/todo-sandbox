export type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};

export type Filter = "all" | "active" | "done";

const STORAGE_KEY = "todo-sandbox:todos";

export function loadTodos(): Todo[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function createTodo(title: string): Todo {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    done: false,
    createdAt: Date.now(),
  };
}

export function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  if (filter === "active") return todos.filter((t) => !t.done);
  if (filter === "done") return todos.filter((t) => t.done);
  return todos;
}
