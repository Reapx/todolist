import { TodoItemType } from "../util/types/todo.ts";
import Modal from "./Modal.tsx";
import { useState } from "react";
import { useTodoContext } from "../util/functions/useTodoContext.ts";

export default function TodoItem({ item }: { item: TodoItemType }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { todos, updateTodos } = useTodoContext();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    const newTodoList = todos.filter((i) => i.id !== item.id);
    updateTodos(newTodoList);
  };

  return (
    <>
      <div
        className={`p-6 rounded shadow ${item.finished_at ? "bg-gray-100" : "bg-gray-200"} flex select-none gap-x-4`}
      >
        <div className="flex items-center">
          <input
            id={`checkbox-${item.id}`}
            type="checkbox"
            checked={!!item.finished_at || undefined}
            disabled={!!item.finished_at}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col flex-grow gap-y-1">
          <h1
            className={`text-xl font-bold text-gray-800 ${item.description && "border-b border-gray-300"} w-full`}
          >
            {item.title}
          </h1>
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
        item={item}
      />
    </>
  );
}
