import './index.css'

export default function ActionsInTasks({item, index, openTrashModal, markAsDone, moveToTrash, selectedStatus, deleteForever}){
    return(
        <div className="toDoTask" key={index}>
            <button onClick={() => {openTrashModal(item)}} className="verticalEllipsis"></button>
            <input type="checkbox" onChange={() => {markAsDone(item)}} checked={item.isDone}/>
            <p className={`${item.isDone ? "done" : "unDo"}`}>{item.title}</p>
            {selectedStatus.name !== "trash" && item.isTrashModalShown && 
            <div className="openedTrashModal">
                <button onClick= {() => {moveToTrash(item)}}>Move to Trash</button>
            </div>
            }                 
            {selectedStatus.name === "trash" && item.isTrashModalShown && 
            <div className="openedTrashModalInTrashSection">
                <button className="delete-forever" onClick= {()=>{deleteForever(item)}}>Delete Forever</button>
                <button className="move-back" onClick= {()=>{moveToTrash(item)}}>Move Back To To Do</button>
            </div>
            } 
        </div>
    );
}
