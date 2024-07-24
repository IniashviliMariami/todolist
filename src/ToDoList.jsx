import React,{useState} from "react";
import "./App.css";



const ToDoList=()=>{
const[tasks,setTasks]=useState([]);
const [newTask, setNewTask]=useState("");


const addTask = ()=>{
    if(newTask.trim()==="") return;
    setTasks([...tasks,{text:newTask,status:"todo"}]);
    setNewTask("");
};

const deleteTask = (index)=> {
    setTasks(tasks.filter((_,i) => i !== index));
}

const editTask = (index, newText)=>{
    const updateTasks=[...tasks];
    updateTasks[index].text=newText;
    setTasks(updateTasks);
}

const changeStatus = (index,newStatus)=>{
    const updatedTasks=[...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
};



    return(
        <div className="todo-list">
          <div className="new-task">
            <input 
            type="text" 
            value={newTask} 
            onChange={(e)=>setNewTask(e.target.value)} 
            placeholder="Add a new task"
            />
            <button onClick={addTask}>Add</button>
          </div>
          <div className="columns">
            {["todo","in-progress","done"].map((status)=>(
                <div key = {status}className ="column">
                    <h2>{status.replace("-"," ")}</h2>
                    {tasks
                    .filter((task)=>task.status===status)
                    .map((task,index)=>(
                        <Task
                        key={index}
                        task={task}
                        onDelete={()=>deleteTask(index)}
                        onEdit={(newTask)=>editTask(index,newTask)}
                        onChangeStatus={(newStatus)=>changeStatus(index,newStatus)}
                        />
                    ))}
                </div>
            ))}
          </div>
        </div>
    );
};

const Task=({task,onDelete,onEdit,onChangeStatus})=>{
    const[isEditing,setIsEditing]=useState(false);
    const[editText,setEditText]=useState(task.text);

    const saveEdit = ()=>{
        onEdit(editText);
        setIsEditing(false);
    };

    return(
        <div className="task">
            {isEditing?(
                <input
                type="text"
                value={editText}
                onChange={(e)=>setEditText(e.target.value)}
                onBlur={saveEdit}
                onKeyPress={(e)=> e.key==="enter" && saveEdit()}
                />
            ):(
                <span>{task.text}</span>
            )}
            <div className="task-action">
                <button onClick={()=> setIsEditing(true)}>Edit</button>
                <button onClick={onDelete}>Delet</button>
                <select
                value={task.status}
                onChange={(e)=>onChangeStatus(e.target.value)}
                >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>
        </div>
    );
};


export default ToDoList; 