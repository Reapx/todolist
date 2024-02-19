import { TodoItemType } from "../util/types/todo.ts";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem.tsx";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import Modal from "./Modal.tsx";
import TodoForm from "./TodoForm.tsx";
import { Category } from "../util/types/category.ts";
import { isColorDark } from "../util/functions/color.ts";
import { useTodoContext } from "../util/functions/useTodoContext.ts";

export default function TodoList({ category }: { category: Category }) {
  const { categories, updateTodos } = useTodoContext();
  const [todoItems, setTodoItems] = useState<TodoItemType[]>(
    categories.find((c) => c.id === category.id)?.items || [],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTodoItems(categories.find((c) => c.id === category.id)?.items || []);
  }, [categories]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const items = Array.from(todoItems);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    category.items = category.items = items.map((item, index) => ({
      ...item,
      orderIndex: index,
    }));
    const updatedCategories: Category[] = categories.map((c) => {
      let newCategory = { ...c };

      if (c.id === category.id) {
        newCategory = category;
      }

      return newCategory;
    });

    updateTodos(updatedCategories);
  };

  const handleDelete = () => {
    updateTodos(categories.filter((i) => i.id !== category.id));
  };

  return (
    <>
      <div className="min-w-96 max-h-screen overflow-y-scroll">
        <div
          className={`p-6 rounded shadow flex gap-2 text-gray-600 select-none h-20`}
          style={{ backgroundColor: category.color }}
        >
          <h1
            className={`text-xl font-bold ${isColorDark(category.color) ? "text-gray-200" : "text-gray-800"} w-full`}
          >
            {category.name}
          </h1>
          <button onClick={handleDelete}>
            <svg
              className={`w-5 h-5 ${isColorDark(category.color) ? "text-gray-200" : "text-gray-800"}`}
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
        <div className={`${todoItems.length > 0 && "mt-2"}`}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={category.id}>
              {(provided) => (
                <div
                  className="grid gap-y-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {todoItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TodoItem item={item} categoryId={category.id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div
          className="p-6 rounded shadow bg-gray-200 flex gap-2 text-gray-600 select-none cursor-pointer h-16 items-center mt-2"
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
          <p>Create a new Todo Entry</p>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={"New Todo"}>
        <TodoForm item={null} onClose={closeModal} categoryId={category.id} />
      </Modal>
    </>
  );
}
