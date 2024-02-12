import { useState } from 'react'
import { Todo } from './Todo';



export const TodoApp = () => {

  const [titleInput, setTitleInput] = useState('');
  const [todos, setTodos] = useState([]) /* Con este Hook vamos a cargar el array con los ob */

  const handleClick = (e)=>{
    e.preventDefault();
  }

  const handleChange = (e)=>{
    setTitleInput(e.target.value);
    
  }


  /* -------------------------------------------------------------- */

  const handleSubmit = (e)=>{
    e.preventDefault();
    /* Aca estamos creando un objeto 'newTodo' con tres propiedades */
    const newTodo = {
      id: crypto.randomUUID(), /* Aca estamos creando un numero aleatorio para ponerlo como 'id' */
      title: titleInput,  /* La variable titleInput es la que viene del Hook useState */
      completed: false
    }
    /* Aca estamos guardando en la variable 'temp' la copia del array 'todos' */
    const temp = [... todos];
    /* con el metodo 'unshft', vamos a agregar adelante de los elementos del array el ultimo objeto que se ingrese desde el input */
    temp.unshift(newTodo)
    /* Aca le estamos pasando el array actualizado al metodo setTodos con el array actualizado */
    setTodos(temp);
    setTitleInput('');
  }
  /* -------------------------------------------------------------- */

  const handleUpdate = (id, value)=>{
    const temp = [... todos];
    const item = temp.find(item => item.id === id);
    item.title = value
    setTodos(temp)
  }


  /* -------------------------------------------------------------- */

  //esta funcion va a eliminar el elemento cuyo id coincida con el id del array 'todos'
  const handleDelete = (id)=>{
    const temp = todos.filter(item => item.id !== id); //Con filter guardaremos en una variable el nuevo array que devuelva el metodo filter, este metodo esta condicionado por un buleano que guardara todos los elementos que den como valor 'true'

    setTodos(temp)

  }

  /* -------------------------------------------------------------- */

  return(

    <>
      <div className='todoContainer'>
        <form className='todoCreateForm' onSubmit={handleSubmit}> {/* Cuando se envie el formulario se va a ejecutar la funcion 'handleSubmit', que es la que crea el objeto con el valor del input */}
          <input className='todoInput' value={titleInput} onChange={handleChange} /> {/* En este input cada ves que haya una modificacion en el input este va a ejecutar la funcion 'handleChange' */}
          <input type='submit' value='Crear Boton' className='buttonCreate'/>
        </form>
        {/* Este div contiene un array del componente Todo, se va a mostrar cuando haya algo en el array */}
          {
            todos.map(item => (
              <Todo key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}/>  //Aca estamos usando un componente en donde pasaremos las props desde el componente
            ))
          }
      </div>
    </>
    
  ) 
}
