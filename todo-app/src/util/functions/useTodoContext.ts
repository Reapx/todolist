import { useContext } from "react";
import { TodoContext } from "./todoContext.ts";

export const useTodoContext = () => useContext(TodoContext);
