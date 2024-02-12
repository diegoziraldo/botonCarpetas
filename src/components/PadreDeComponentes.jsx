import React, { useState } from 'react';
import { InputCategory } from './InputCategory';
import { ListaItems } from './ListaItems';


export const PadreDeComponentes = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <InputCategory onInputChange={setInputValue} /> {/* Aquí pasamos setInputValue como onInputChange */}
      <ListaItems inputValue={inputValue} />
    </div>
  );
}
