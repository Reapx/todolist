import { TodoItemType } from "../util/types/todo.ts";
import { useState } from "react";
import { v4 as uuIdV4 } from "uuid";
import { useTodoContext } from "../util/functions/useTodoContext.ts";

export default function TodoForm({
  item,
  onClose,
}: {
  item: TodoItemType | null;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [requiredAt, setRequiredAt] = useState(
    (item?.created_at &&
      new Date(item.required_at).toISOString().slice(0, 16)) ||
      "",
  );
  const { todos, updateTodos } = useTodoContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if ((!title && title.length > 0) || (!requiredAt && requiredAt.length > 0))
      return;

    const isUpdating = item && todos.some((todo) => todo.id === item.id);

    let updatedTodos = [];
    if (isUpdating) {
      // Update the existing item
      updatedTodos = todos.map((todo) =>
        todo.id === item!.id
          ? {
              ...todo,
              title: title,
              description: description.length === 0 ? null : description,
              required_at: new Date(requiredAt).toISOString(),
            }
          : todo,
      );
    } else {
      const newItem: TodoItemType = {
        id: uuIdV4(),
        title: title,
        description: description.length === 0 ? null : description,
        created_at: new Date().toISOString(),
        required_at: new Date(requiredAt).toISOString(),
        finished_at: null,
        orderIndex:
          todos.reduce((max, todo) => Math.max(max, todo.orderIndex), 0) + 1,
      };

      updatedTodos = [...todos, newItem];
    }

    updateTodos(updatedTodos);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="flex gap-2">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="required_at"
          >
            Required At
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="required_at"
            required
            type="datetime-local"
            value={requiredAt}
            onChange={(e) => setRequiredAt(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Save Todo
        </button>
      </div>
    </form>
  );
}
