import { TodoItemType } from "./todo.ts";

export type Category = {
  id: string;
  name: string;
  items: TodoItemType[];
  color: string;
};

export type TodoContextType = {
  categories: Category[];
  updateTodos: (newCategory: Category[]) => void;
};
