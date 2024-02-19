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
import { useTodoContext } from "../util/functions/useTodoContext.ts";

export default function TodoList() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { todos, updateTodos } = useTodoContext();

  useEffect(() => {
    setTodoItems(todos);
  }, [todos]);
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

    updateTodos(items.map((item, index) => ({ ...item, orderIndex: index })));
  };

  return (
    <>
      <div className="w-96 grid gap-y-2">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <div
                className="grid gap-y-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {todoItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem item={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div
          className="p-6 rounded shadow bg-gray-200 flex gap-2 text-gray-600 select-none cursor-pointer"
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={"New Todo"}
        item={null}
      />
    </>
  );
}
