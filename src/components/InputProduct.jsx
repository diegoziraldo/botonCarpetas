import { useEffect, useState } from "react";

export const InputProduct = ({ onInputChange, obtenerProductos }) => {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);

/* useEffect(() => {
  obtenerProductos();
}, [count]); */

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };



  const guardarInput = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://testapisystemadministration.up.railway.app/product",
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
        <h3>Ingreso de Producto</h3>
        <input
          type="text"
          className="input-product"
          value={inputValue}
          onChange={handleChange}
          placeholder="Agregar producto"
        />
        <select></select>
        <button type="submit" className="button">
          Guardar
        </button>
      </form>
    </>
  );
};
