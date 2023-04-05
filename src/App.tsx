import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TaskType, ToDoList } from "./components/ToDoList/Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "css", isDone: true },
    { id: v1(), title: "js", isDone: true },
    { id: v1(), title: "react", isDone: false },
  ]);
  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTasks(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodolist = tasks;

  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <ToDoList
        title="What to learn"
        tasks={tasksForTodolist}
        removeTasks={removeTasks}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
