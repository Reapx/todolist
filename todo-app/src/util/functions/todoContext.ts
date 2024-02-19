import { createContext } from "react";
import { TodoContextType } from "../types/category.ts";

export const TodoContext = createContext<TodoContextType>({
  categories: JSON.parse(localStorage.getItem("categories") || "[]"),
  updateTodos: () => {
    console.warn("updateTodos function not initialized");
  },
});
