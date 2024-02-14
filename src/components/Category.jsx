import { useState, useEffect } from "react";
import { InputCategory } from "./InputCategory";

export const Category = ({ inputValue }) => {
  const [categoria, setCategoria] = useState([]);
  const [editandoId, setEditandoId] = useState(null); // Guarda el ID de la categoría que se está editando
  const [editandoValor, setEditandoValor] = useState(""); // Guarda el valor editado temporalmente

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
  }, [categoria]);

  const handleUpdate = async (id) => {
    try {
      // Guarda el ID de la categoría que se está editando
      setEditandoId(id);

      // Busca la categoría correspondiente al ID y guarda su valor para editar
      const categoriaEditar = categoria.find(cat => cat.id === id);
      setEditandoValor(categoriaEditar.name);
    } catch (error) {
      console.error("Error al editar la categoría:", error);
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setEditandoValor("");
  };

  const guardarEdicion = async (id) => {
    try {
      // Realiza una solicitud PATCH a la API para actualizar la categoría
      await fetch(
        `https://testapisystemadministration.up.railway.app/category`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name: editandoValor }), // Envía el valor editado
        }
      );

      // Actualiza el estado para reflejar el cambio
      setCategoria(categoria.map(cat => {
        if (cat.id === id) {
          return { ...cat, name: editandoValor }; // Actualiza el nombre de la categoría
        }
        return cat;
      }));

      // Limpia el estado de edición
      cancelarEdicion();
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
          method: "DELETE",
        }
      );

      // Actualiza el estado para reflejar el cambio eliminando la categoría de la lista
      setCategoria(categoria.filter(cat => cat.id !== id));
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <>

    <InputCategory/>
    <div>
      {categoria.map((category, index) => (
        <div key={index}>
          {editandoId === category.id ? (
            <div>
              <input
                type="text"
                value={editandoValor}
                onChange={(e) => setEditandoValor(e.target.value)}
              />
              <button onClick={() => guardarEdicion(category.id)}>Guardar</button>
              <button onClick={cancelarEdicion}>Cancelar</button>
            </div>
          ) : (
            <div>
              <h3>{category.name}</h3>
              <button onClick={() => handleUpdate(category.id)}>Editar</button>
              <button onClick={() => handleDelete(category.id)}>Eliminar</button>
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
};
