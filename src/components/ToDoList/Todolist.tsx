import {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "../../App";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTasks: (id: string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeStatus: (taskId: string, todolistId: string, isDone: boolean) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
};

export function ToDoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.code === "Enter") {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle("");
        }
    };

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle("");
        } else {
            setError("Title is required");
        }
    };
    const onAllTasksFilter = () => props.changeFilter("all", props.id);
    const onActiveTasksFilter = () => props.changeFilter("active", props.id);
    const onCompletedTasksFilter = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-massage">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onRemoveTasks = () => props.removeTasks(t.id, props.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, props.id, e.currentTarget.checked);
                    };
                    return (
                        <li key={t.id}>
                            <input
                                type="checkbox"
                                onChange={onChangeHandler}
                                checked={t.isDone}
                            />
                            <span>{t.title}</span>
                            <button onClick={onRemoveTasks}>x</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllTasksFilter}
                >
                    all
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveTasksFilter}
                >
                    active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedTasksFilter}
                >
                    completed
                </button>
            </div>
        </div>
    );
}
