import React, { useState } from 'react';
import { InputCategory } from './InputCategory';
import { Category } from './Category';


export const PadreDeComponentes = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <InputCategory onInputChange={setInputValue} /> {/* Aquí pasamos setInputValue como onInputChange */}
      <Category inputValue={inputValue} />
    </div>
  );
}
