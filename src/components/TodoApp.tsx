"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { TodoItem } from "@/components/TodoItem";
import {
  createTodo,
  filterTodos,
  loadTodos,
  saveTodos,
  type Filter,
  type Todo,
} from "@/lib/todos";

const FILTERS: Filter[] = ["all", "active", "done"];

const noopSubscribe = () => () => {};

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  // false during SSR and hydration, true afterwards - avoids a mismatch
  // between the server's empty list and the client's stored todos.
  const loaded = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setTodos((prev) => [createTodo(draft), ...prev]);
    setDraft("");
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearDone() {
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  const visible = filterTodos(todos, filter);
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="w-full max-w-md space-y-4">
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What needs doing?"
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
        >
          Add
        </button>
      </form>

      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded px-2 py-1 capitalize ${
                filter === f ? "bg-zinc-200 dark:bg-zinc-800" : ""
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-zinc-500">{loaded ? remaining : 0} left</span>
      </div>

      <ul className="space-y-2">
        {loaded && visible.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
        {loaded && visible.length === 0 && (
          <li className="py-6 text-center text-sm text-zinc-500">
            Nothing here.
          </li>
        )}
      </ul>

      {loaded && todos.some((t) => t.done) && (
        <button
          onClick={clearDone}
          className="text-sm text-zinc-500 hover:underline"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
