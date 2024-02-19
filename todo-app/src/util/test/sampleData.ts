import { TodoItemType } from "../types/todo.ts";
import { v4 as uuIdV4 } from "uuid";

export const sampleTodos: TodoItemType[] = [
  {
    id: uuIdV4(),
    title: "Einkaufsliste erstellen",
    description: "Liste für den Wochenendeinkauf zusammenstellen",
    created_at: new Date("2024-02-18T09:00:00.000Z"),
    required_at: new Date("2024-02-19T17:00:00.000Z"),
    finished_at: null,
    orderIndex: 0,
  },
  {
    id: uuIdV4(),
    title: "React üben",
    description: null,
    created_at: new Date("2024-02-17T10:00:00.000Z"),
    required_at: new Date("2024-02-20T18:00:00.000Z"),
    finished_at: null,
    orderIndex: 1,
  },
  {
    id: uuIdV4(),
    title: "Workout",
    description: "Bein- und Armtraining, 45 Minuten",
    created_at: new Date("2024-02-18T11:30:00.000Z"),
    required_at: new Date("2024-02-18T20:00:00.000Z"),
    finished_at: null,
    orderIndex: 2,
  },
  {
    id: uuIdV4(),
    title: "Buch lesen",
    description: "Weiterlesen des aktuellen Romans",
    created_at: new Date("2024-02-16T15:00:00.000Z"),
    required_at: new Date("2024-02-22T22:00:00.000Z"),
    finished_at: new Date("2024-02-18T21:00:00.000Z"),
    orderIndex: 3,
  },
  {
    id: uuIdV4(),
    title: "Projektmeeting vorbereiten",
    description: "Präsentation für das wöchentliche Teammeeting erstellen",
    created_at: new Date("2024-02-19T08:00:00.000Z"),
    required_at: new Date("2024-02-19T10:00:00.000Z"),
    finished_at: null,
    orderIndex: 4,
  },
];
