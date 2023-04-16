import React, {useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import {TaskType, ToDoList} from "./components/ToDoList/Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

function App() {


    function removeTasks(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter((t) => t.id !== id);
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasksObj({...tasksObj});
    }

    function changeStatus(taskId: string,todolistId: string, isDone: boolean) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find((t) => t.id === taskId);

        if (task) task.isDone = isDone;
        setTasksObj({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"},
    ]);

    let removeTodolist = (todolistId:string) => {
        let filteredTodolist = todolists.filter(tl=>tl.id !== todolistId)
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasksObj({...tasksObj})
    }
    let [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: "css", isDone: true},
            {id: v1(), title: "js", isDone: true},
            {id: v1(), title: "react", isDone: false},],
        [todolistId2]: [
            {id: v1(), title: "book", isDone: false},
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "react", isDone: false},
        ]
    })

    return (
        <div className="App">
            {todolists.map((i) => {
                let tasksForTodolist = tasksObj[i.id];

                if (i.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
                }
                if (i.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
                }

                return (
                    <ToDoList
                        key={i.id}
                        id={i.id}
                        title={i.title}
                        tasks={tasksForTodolist}
                        removeTasks={removeTasks}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        addTask={addTask}
                        filter={i.filter}
                        removeTodolist={removeTodolist}
                    />
                );
            })}
        </div>
    );
}

export default App;
