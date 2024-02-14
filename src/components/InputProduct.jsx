import { useState } from "react";

export const InputProduct= ({ onInputChange }) => {
  const [inputValue, setInputValue] = useState("");

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
          className="input-product"
          value={inputValue}
          onChange={handleChange}
          placeholder="Agregar producto"
        />
        <button type="submit" className="button">
          Guardar
        </button>
      </form>
    </>
  );
};
