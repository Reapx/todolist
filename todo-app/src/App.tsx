import "./App.css";
import TodoList from "./Components/TodoList.tsx";
import { useState } from "react";
import Modal from "./Components/Modal.tsx";
import CategoryForm from "./Components/CategoryForm.tsx";
import { useTodoContext } from "./util/functions/useTodoContext.ts";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { categories } = useTodoContext();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className="flex p-8 gap-x-4">
        {categories.map((category) => (
          <TodoList category={category} key={category.id} />
        ))}
        <div
          className="p-6 rounded shadow bg-gray-200 flex gap-2 text-gray-600 select-none h-fit min-w-96 cursor-pointer"
          onClick={openModal}
        >
          <svg
            className="w-6 h-6"
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
              d="M14 17h6m-3 3v-6M4.9 4H9c.5 0 .9.4.9.9V9c0 .5-.4.9-.9.9H5a.9.9 0 0 1-.9-.9V5c0-.5.4-.9.9-.9Zm10 0H19c.5 0 .9.4.9.9V9c0 .5-.4.9-.9.9h-4a.9.9 0 0 1-.9-.9V5c0-.5.4-.9.9-.9Zm-10 10H9c.5 0 .9.4.9.9V19c0 .5-.4.9-.9.9H5a.9.9 0 0 1-.9-.9v-4c0-.5.4-.9.9-.9Z"
            />
          </svg>
          <p>Create a new Category Entry</p>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={"New Category"}>
        <CategoryForm category={null} onClose={closeModal} />
      </Modal>
    </>
  );
}
