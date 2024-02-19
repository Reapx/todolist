import { TodoItemType } from "../util/types/todo.ts";
import TodoForm from "./TodoForm.tsx";

export default function Modal({
  isOpen,
  onClose,
  title,
  item,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  item: TodoItemType | null;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-gray-50 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-lg font-semibold">
            <svg
              className="w-6 h-6 text-gray-800"
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
                d="M6 18 18 6m0 12L6 6"
              />
            </svg>
          </button>
        </div>
        <div>
          <TodoForm item={item} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
