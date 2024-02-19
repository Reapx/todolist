import { createContext } from "react";
import { TodoContextType } from "../types/todo.ts";

export const TodoContext = createContext<TodoContextType>({
  todos: JSON.parse(localStorage.getItem("todoItems") || "[]"),
  updateTodos: () => {
    console.warn("updateTodos function not initialized");
  },
});
