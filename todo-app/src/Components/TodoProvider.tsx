import { ReactNode, useState } from "react";
import { TodoItemType } from "../util/types/todo";
import { TodoContext } from "../util/functions/todoContext";

export default function TodoProvider({ children }: { children: ReactNode }) {
  const initialTodos = JSON.parse(localStorage.getItem("todoItems") || "[]");
  const [todos, setTodos] = useState<TodoItemType[]>(initialTodos);

  const updateTodos = (newTodoItemList: TodoItemType[]) => {
    setTodos(newTodoItemList);
    localStorage.setItem("todoItems", JSON.stringify(newTodoItemList));
  };

  return (
    <TodoContext.Provider value={{ todos, updateTodos }}>
      {children}
    </TodoContext.Provider>
  );
}
