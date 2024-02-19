import { TodoItemType } from "../util/types/todo.ts";
import Modal from "./Modal.tsx";
import { useState } from "react";
import { useTodoContext } from "../util/functions/useTodoContext.ts";
import TodoForm from "./TodoForm.tsx";
import { Category } from "../util/types/category.ts";
import { convertDate } from "../util/functions/date.ts";

export default function TodoItem({
  item,
  categoryId,
}: {
  item: TodoItemType;
  categoryId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories, updateTodos } = useTodoContext();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    const selectedCategory = categories.find(
      (category) => category.id === categoryId,
    );

    if (!selectedCategory) return;

    selectedCategory.items = selectedCategory.items.filter(
      (i) => i.id !== item.id,
    );

    const updatedCategories: Category[] = categories.map((c) => {
      let newCategory = { ...c };

      if (c.id === selectedCategory.id) {
        newCategory = selectedCategory;
      }

      return newCategory;
    });

    updateTodos(updatedCategories);
  };

  const handleCheckboxClick = () => {
    const selectedCategory = categories.find(
      (category) => category.id === categoryId,
    );

    let finished: string | null;
    if (item.finished_at !== null) {
      finished = null;
    } else {
      finished = new Date().toISOString();
    }

    if (!selectedCategory) return;
    const updatedItem = selectedCategory.items.map((todo) =>
      todo.id === item!.id
        ? {
            ...todo,
            finished_at: finished,
          }
        : todo,
    );

    const updatedCategories: Category[] = categories.map((c) => {
      const newCategory = { ...c };

      if (c.id === selectedCategory.id) {
        newCategory.items = updatedItem;
      }

      return newCategory;
    });

    updateTodos(updatedCategories);
  };

  return (
    <>
      <div
        className={`p-6 rounded shadow ${new Date(item.required_at) < new Date() ? "bg-red-100" : item.finished_at ? "bg-green-100" : "bg-gray-200"} flex select-none gap-x-4`}
      >
        <div className="flex items-center">
          <input
            id={`checkbox-${item.id}`}
            type="checkbox"
            checked={item.finished_at !== null}
            onChange={handleCheckboxClick}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col flex-grow gap-y-1">
          <div
            className={`flex justify-between ${item.description && "border-b border-gray-300"} w-full`}
          >
            <h1 className="text-xl font-bold text-gray-800">{item.title}</h1>
            <p className="text-gray-600 text-sm">
              {convertDate(item.required_at)}
            </p>
          </div>
          <p className="text-gray-600 text-sm">{item?.description}</p>
        </div>
        <div className="border-s border-gray-300 ps-2 flex flex-col items-center justify-center">
          <div className="mb-2">
            <button onClick={openModal}>
              <svg
                className="w-5 h-5 text-yellow-400 hover:text-yellow-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m14.3 4.8 2.9 2.9M7 7H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h11c.6 0 1-.4 1-1v-4.5m2.4-10a2 2 0 0 1 0 3l-6.8 6.8L8 14l.7-3.6 6.9-6.8a2 2 0 0 1 2.8 0Z"
                />
              </svg>
            </button>
          </div>
          <div>
            <button onClick={handleDelete}>
              <svg
                className="w-5 h-5 text-red-600 hover:text-red-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`Edit ${item.title}`}
      >
        <TodoForm item={item} onClose={closeModal} categoryId={categoryId} />
      </Modal>
    </>
  );
}
