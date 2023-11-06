import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { useState } from "react";
import {nanoid} from "nanoid";



const FILTER_MAP={
  All:()=>true,
  Active:(task)=>!task.completed,
  Completed:(task)=>task.completed,
}

const FILTER_NAMES = Object.keys(FILTER_MAP)


function App(props) {
  // console.info(props);
  // console.log(typeof props);
  const [tasks,setTasks]=useState(props.tasks);
  const [filter,setFilter]=useState("All");

  function addTask(name){
    // alert(name);
    const newTask={id:`todo-${nanoid()}`,name,completed:false};
    setTasks([...tasks,newTask])
  }

  function toggleTaskCompleted(id){
    const upatedTasks=tasks.map((task) =>{
      if(id===task.id){
        return { ...task, completed:!task.completed};
      }
      return task;
    })
    setTasks(upatedTasks)
    // console.log(tasks[0])
  }

  function deleteTask(id){
    // console.log(id)
    const remainingTasks=tasks.filter((task)=> id != task.id);
    setTasks()
  }

  function editTask(id,newName){
    const editedTaskList=tasks.map((task)=>{
      if(id===task.id){
        return { ...task, name: newName};
      }
      return task;
    });
    setTasks(editedTaskList)
  }
  
  const taskList=tasks
  .filter(FILTER_MAP[filter])
  .map((task)=> (
    <Todo id={task.id} 
    name={task.name} 
    completed={task.completed} 
    key={task.id} 
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
    />
  ));

  const filterList=FILTER_NAMES.map((name)=> (
    <FilterButton 
    key={name} 
    name={name} 
    isPressed={name === filter}
    setFilter={setFilter}
    />
  ));

  const headingText= `${taskList.length} tasks remaining`;
  const tasksNoun=taskList.length !== 1 ? 'tasks' : 'task';

  

  return(
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
