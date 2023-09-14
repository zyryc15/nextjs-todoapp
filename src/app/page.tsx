import Link from "next/link";
import { prisma } from "@/db";
import { TodoItem } from "@/components/TodoItem";

const getTodos = () => {
  return prisma.todo.findMany();
};

const toggleTodo = async (id: string, complete: boolean) => {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
};

const deleteTodo = async (id: string) => {
  "use server";
  await prisma.todo.delete({ where: { id } });
  // try {
  //   await prisma.todo.delete({ where: { id } });
  //   alert(`Todo with ID ${id} has been deleted successfully.`);
  // } catch (error) {
  //   console.error(`Error deleting todo with ID ${id}: ${error}`);
  // }
};

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </>
  );
}
