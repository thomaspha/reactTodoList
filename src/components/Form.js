import React from "react";  
import {useState} from "react";


export default function Form(props){
  // console.log(props);
  const [name,setName]=useState(' ');

  function handleChange(e){
    // console.log(e.target.value);
    setName(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    // alert('Hello , world!');
    props.addTask(name);
    setName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          what needs to be done?
        </label>
      </h2>
      <input 
        type="text"
        id="new-todo-input"
        className="input input--lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}