import "./App.css";
import TodoList from "./Components/TodoList.tsx";
import TodoProvider from "./Components/TodoProvider.tsx";

export default function App() {
  return (
    <>
      <TodoProvider>
        <div className="flex justify-center">
          <TodoList />
        </div>
      </TodoProvider>
    </>
  );
}
