import { useEffect, useState } from "react";

export const InputCategory = ({ onInputChange, obtenerCategorias }) => {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);
  /* const [nuevaCategoria, setNuevaCategoria] = useState(""); */


/* useEffect(() => {
  obtenerCategorias();
}, [count]); */


  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onInputChange(newValue);
  };



  const guardarInput = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://testapisystemadministration.up.railway.app/category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: inputValue }),
        }
      );
      if (response.ok) {
        setCount(count+1);
        console.log("Input guardado correctamente");
        setInputValue(""); // Limpiar el input después de guardar


      } else {
        console.error("Error al guardar el input");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  return (
    <>
      <form onSubmit={guardarInput}>
        <input
          type="text"
          className="input-category"
          value={inputValue}
          onChange={handleChange}
          placeholder="Agregar categoria"
        />
        <button type="submit" className="button">
          Guardar
        </button>
      </form>
    </>
  );
};
