import React, { useState } from 'react'

function ToDo() {
    const[task,setTask]=useState([]);
    const[inputValue,setInputValue]=useState("");

    const handleAddItem=()=>{
     const Id=Math.random().toFixed(2);
     setTask([...task,{
        id:Id,
        title:inputValue
     }])
    }

    const handleDeleteItem=(Id)=>{
       const data=task.filter((item)=>{
        return item.id!==Id
       })
       setTask(data);
    }

    const handleEditItem=(Id)=>{
        const data=task.filter((item)=>{
            return item.id === Id
           })
           setInputValue(data.title);
        
    }

    
  return (
    <div>
        <input
        placeholder='Add Item ...'
        type='text'
        value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
        />
        <button onClick={()=>handleAddItem()} >Add</button>

        {task && task.map((item)=>{
            return(
                <div key={item.id}>
                <p>{item.title}</p>
                <button onClick={()=>handleDeleteItem(item.id)}>Delete</button>
                <button onClick={()=>handleEditItem(item.id)}>Edit</button>
                </div>
            )
        })}
    </div>
  )
}

export default ToDo