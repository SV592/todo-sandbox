"use client";

import type { Todo } from "@/lib/todos";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-3 rounded-md border border-zinc-200 px-3 py-2 dark:border-zinc-800">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4"
        aria-label={`Mark "${todo.title}" as ${todo.done ? "not done" : "done"}`}
      />
      <span className={`flex-1 ${todo.done ? "text-zinc-400 line-through" : ""}`}>
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-sm text-zinc-500 hover:text-red-600"
        aria-label={`Delete "${todo.title}"`}
      >
        Delete
      </button>
    </li>
  );
}
