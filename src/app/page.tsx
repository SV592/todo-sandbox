import { TodoApp } from "@/components/TodoApp";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center gap-6 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Todos</h1>
      <TodoApp />
    </main>
  );
}
