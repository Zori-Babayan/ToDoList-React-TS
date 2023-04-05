import { ChangeEvent, useState, KeyboardEvent } from "react";
import { FilterValuesType } from "../../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTasks: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export function ToDoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };
  const onAllTasksFilter = () => props.changeFilter("all");
  const onActiveTasksFilter = () => props.changeFilter("active");
  const onCompletedTasksFilter = () => props.changeFilter("completed");
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((t) => {
          const onRemoveTasks = () => props.removeTasks(t.id);
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={onRemoveTasks}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllTasksFilter}>all</button>
        <button onClick={onActiveTasksFilter}>active</button>
        <button onClick={onCompletedTasksFilter}>completed</button>
      </div>
    </div>
  );
}
