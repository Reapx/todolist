import { ReactNode, useState } from "react";
import { TodoContext } from "../util/functions/todoContext";
import { Category } from "../util/types/category.ts";

export default function TodoProvider({ children }: { children: ReactNode }) {
  const initialCategories = JSON.parse(
    localStorage.getItem("categories") || "[]",
  );
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const updateTodos = (data: Category[]) => {
    setCategories(data);
    localStorage.setItem("categories", JSON.stringify(data));
  };

  return (
    <TodoContext.Provider value={{ categories: categories, updateTodos }}>
      {children}
    </TodoContext.Provider>
  );
}
