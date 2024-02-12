import { useState, useEffect } from "react";

export const ListaItems = ({ inputValue }) => {
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    const mostrarCategorias = async () => {
      try {
        const respuesta = await fetch(
          `https://testapisystemadministration.up.railway.app/category`
        );
        const categoria = await respuesta.json();
        setCategoria(categoria);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    mostrarCategorias();
  }, [categoria]); // Agregamos inputValue como dependencia

  const handleUpdate = async (id) => {
    try {
      // Realiza una solicitud PATCH a la API para actualizar la categoría
      await fetch(
        `https://testapisystemadministration.up.railway.app/category/${id}`,
        {
          method: "PATCH"
        }
      );

      // Actualiza el estado para reflejar el cambio eliminando el producto de la lista
      setCategoria(categoria.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Realiza una solicitud DELETE a la API para eliminar la categoría
      await fetch(
        `https://testapisystemadministration.up.railway.app/category/${id}`,
        {
          method: "DELETE"
        }
      );

      // Actualiza el estado para reflejar el cambio eliminando la categoría de la lista
      setCategoria(categoria.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <div>
      {categoria.map((category, index) => (
        <div key={index}>
          <h3>{category.name}</h3>
          <button onClick={() => handleUpdate(category.id)}>Editar</button>
          <button onClick={() => handleDelete(category.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};
