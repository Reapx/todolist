import { useState } from "react";
import { Category } from "../util/types/category.ts";
import { v4 as uuIdV4 } from "uuid";
import { useTodoContext } from "../util/functions/useTodoContext.ts";

export default function CategoryForm({
  category,
  onClose,
}: {
  category: Category | null;
  onClose: () => void;
}) {
  const [name, setName] = useState(category?.name || "");
  const [color, setColor] = useState("#e5e7eb");
  const { categories, updateTodos } = useTodoContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name && name.length > 0) return;

    const newCategory: Category = {
      id: uuIdV4(),
      name: name,
      items: [],
      color: color,
    };
    updateTodos([...categories, newCategory]);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="flex gap-2">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Category Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Category Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="color"
          >
            Category Color
          </label>
          <input
            type="color"
            id="color"
            className="shadow appearance-none border rounded w-full h-10 focus:outline-none focus:shadow-outline"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Save Category
        </button>
      </div>
    </form>
  );
}
