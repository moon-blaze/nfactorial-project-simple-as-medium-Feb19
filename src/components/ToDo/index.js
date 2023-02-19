import "./index.css";
import AddTaskModal from "./AddTaskModal";
import {useState, React} from "react";
import { v4 as uuid } from "uuid";
import ActionsInTasks from "./ActionsInTasks";

const taskStatuses = [
    {
        name : "todo",
        title: "To Do",
        isActive: true,
    },
    {
        name: "done",
        title: "Done",
        isActive: false,
    },
    {
        name: "trash",
        title: "Trash",
        isActive: false,
    }
];

export default function ToDo() {
    const [isAddModalShown, setIsAddModalShown] = useState(false);
    const [tasks, setTasks] = useState([
        {
            id: uuid(),
            title: 'Draw a picture',
            isDone: false, 
            inTrash: false,
            // isTrashModalShown: false,
        },
        {
            id: uuid(),
            title: 'Buy  Tomatoies',
            isDone: false, 
            inTrash: false,
            // isTrashModalShown: false,
        },
        {
            id: uuid(),
            title: 'Go to the Gym',
            isDone: false, 
            inTrash: false,
            // isTrashModalShown: false,
        },
        {
            id: uuid(),
            title: 'Submit Project',
            isDone: true, 
            inTrash: false,
            // isTrashModalShown: false,
        }
    ]);
    const [filterByStatys, setFilterByStatys] = useState(taskStatuses);
    const [selectedStatus, setSelectedStatus] = useState(taskStatuses[0]);
    
    const  openAddModal = ()=> {
        setIsAddModalShown(!isAddModalShown);
    };

    const addTask = (item) => {
        const newTask = {
            key: uuid(),
            title: item,
            isDone: false,
            // isTrashModalShown: false,
            inTrash: false
        };
        setTasks([...tasks, newTask]);
        setIsAddModalShown(!isAddModalShown);
    };

    const openTrashModal = (item)=> {
        const updatedTask = {
            key: uuid(),
            title: item.title,
            isDone: item.isDone,
            isTrashModalShown: (item.isTrashModalShown) ? false : true,
            inTrash: item.inTrash
        };
        const index = tasks.indexOf(item);
        const leftSide = tasks.slice(0, index);
        const rightSide = tasks.slice(index+1, tasks.leght);
        setTasks([...leftSide, updatedTask, ...rightSide]);
    };

    const moveToTrash = (item) => {
        const updatedTask = {
            key: uuid(),
            title: item.title,
            isDone: item.isDone,
            isTrashModalShown: false,
            inTrash: !item.inTrash
        };
        const index = tasks.indexOf(item);
        const leftSide = tasks.slice(0, index);
        const rightSide = tasks.slice(index+1, tasks.leght);
        setTasks([...leftSide, updatedTask, ...rightSide]);
    };

    const deleteForever = (item) => {
        const index = tasks.indexOf(item);
        const leftSide = tasks.slice(0, index);
        const rightSide = tasks.slice(index+1, tasks.leght);
        setTasks([...leftSide, ...rightSide]);
    };

    const markAsDone = (item) => {
        const updatedTask = {
            key: uuid(),
            title: item.title,
            isDone: !item.isDone,
            isTrashModalShown: false,
            inTrash: item.inTrash
        };
        const index = tasks.indexOf(item);
        const leftSide = tasks.slice(0, index);
        const rightSide = tasks.slice(index+1, tasks.leght);
        (updatedTask.isDone) ? setTasks([...leftSide, ...rightSide, updatedTask]) : setTasks([updatedTask, ...leftSide, ...rightSide]);
    };

    const openSelectedStatus = (item) => {
        const newActive = {
            title: item.title,
            isActive: true,
            name : item.name
        };
        setFilterByStatys(
            filterByStatys.map((item) => {
                item.isActive = false;
                return true;
            })
        );
        // console.log(filterByStatys);
        const index = filterByStatys.indexOf(item);
        const leftSide = filterByStatys.slice(0, index);
        const rightSide = filterByStatys.slice(index+1, filterByStatys.leght);
        setFilterByStatys([...leftSide, newActive, ...rightSide]);
        setSelectedStatus(filterByStatys[index]);
    };

    const filteredTasks = tasks.filter((item) => 
    filterByStatys[0].isActive ? !item.inTrash
    : filterByStatys[1].isActive ? (item.isDone && !item.inTrash)
    : item.inTrash);

    return(
        <div>
            <div className="allButtons">
                <div className="buttonsStatus">
                    {filterByStatys && filterByStatys.map((item, index) => (
                        <button key = {index} onClick={()=> {openSelectedStatus(item)}} className = {`${item.isActive ? "active" : "notActive"}`}>{item.title}</button>
                    ))}
                </div>
                <div className="AddModalButton">
                    {isAddModalShown && <AddTaskModal addTask = {addTask}/>} 
                    <button className="addTaskButton" onClick={openAddModal}>+</button>
                </div>
            </div>
            <div>
                <p className="selectedStatus">{selectedStatus.title}</p>
                <div className="line"></div>
                {tasks && filteredTasks.map((item, index) => (
                        <ActionsInTasks openTrashModal = {openTrashModal} 
                        markAsDone = {markAsDone} moveToTrash = {moveToTrash}
                        selectedStatus = {selectedStatus} deleteForever = {deleteForever} item = {item} index = {index}/>
                    ))
                }
            </div>
        </div>
    );
}