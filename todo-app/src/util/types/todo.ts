export type TodoItemType = {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  required_at: string;
  finished_at: string | null;
  orderIndex: number;
};

export type TodoContextType = {
  todos: TodoItemType[];
  updateTodos: (newTodoItemList: TodoItemType[]) => void;
};
