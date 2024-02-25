import React, { useState } from 'react';
import { InputProduct } from './InputProduct'; 
/* import { InputCategory } from './InputCategory'; */
import { Category } from './Category';



export const PadreDeComponentes = () => {
  const [categoria, setCategoria] = useState([]);

  return (
    <div>
      {/* <InputCategory onInputChange={setInputValue} /> */} {/* Aquí pasamos setInputValue como onInputChange */}
      <Category categoria={categoria}/>
      <InputProduct categoria={categoria}/>
    </div>
  );
}
