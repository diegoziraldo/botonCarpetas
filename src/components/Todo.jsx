import React from 'react'
import { useState } from 'react';
import '../styles/todosButton.css'

/* Este componente lo que hace mostrarnos un componente segun el boton que apretemos */

export const Todo = ({item, onUpdate, onDelete}) => {

  const [isEdit, setIsEdit] = useState(false); /* 'isEdit' va a guardar un valor booleano */


  /* -------------------------------------------------------------- */

  const FormEdit = ()=>{
    const [newValue, setNewValue] = useState(item.title)
  
    const handleSubmit = (e)=>{
      e.preventDefault();
    }
  
    const handleChange = (e)=>{
      const value = e.target.value
      setNewValue(value)
    }
  
    const handleClickUpdateTodo = ()=>{
      onUpdate(item.id, newValue)
      setIsEdit(false)
    }

    /* Aca vamos a estar retornando el input con el boton para actualizar el valor */
    return(
      <form className='todoUpdateForm' onSubmit={handleSubmit}>
        <input type='text' className='todoInput' onChange={handleChange} value={newValue} />
        <button className='button' onClick={handleClickUpdateTodo}>Update</button>
      </form>
    );
  }
  /* -------------------------------------------------------------- */


  const TodoElement = ()=>{
    return(
      <div className='todoInfo'>
      <button className='todosButton'>caca</button>
      <button className=''>caca</button>
      <button className='button' onClick={()=>{setIsEdit(true)}}>Edit</button>
      <button className='buttonDelete' onClick={(e)=>onDelete(item.id)}>Delete</button>
    </div>
    )
  }

  /* -------------------------------------------------------------- */


  return (
      /* Aca vamos a mostrar el componente que seleccionemos con el boton */
      <div className='todo'>
        {isEdit ? <FormEdit/> : <TodoElement/>}   
      </div>

  );
}
