import "./index.css";
import { useState} from "react";
// import { useEffect } from "react";

export default function AddTaskModal({addTask}) {
    const [input, setInput] = useState("");

    // useEffect(()=> {
    //     console.log(input)
    // }, [input]);

    const handleChange = e => setInput(e.target.value);
    
    return(
        <div className="addToDoModal">
            <p>Add New To Do</p>
            <input placeholder="Your text" value = {input} onChange = {handleChange}/>
            <button onClick= {() => {
                if(input !== null && input !== "" && input !== " "){
                    addTask(input);
                    setInput("");
                }
                }} 
            >Add</button>
        </div>
    );
}
