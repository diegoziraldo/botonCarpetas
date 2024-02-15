import { useState, useEffect } from "react";
import { InputCategory } from "./InputCategory";

export const Category = () => {
  const [categoria, setCategoria] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [editandoValor, setEditandoValor] = useState("");

  const obtenerCategorias = async () => {
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

  const agregarCategoria = async (nuevaCategoria) => {
    try {
      const respuesta = await fetch(
        `https://testapisystemadministration.up.railway.app/category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: nuevaCategoria }),
        }
      );

      if (respuesta.ok) {
        const nuevaCategoriaAgregada = await respuesta.json();
        // Actualiza el estado local inmediatamente
        setCategoria((prevCategorias) => [...prevCategorias, nuevaCategoriaAgregada]);
        // Después de agregar la categoría, obtén la lista actualizada de categorías
        obtenerCategorias();
      } else {
        console.error("Error al agregar la categoría:", respuesta.status);
      }
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
    }
  };
  useEffect(() => {
    obtenerCategorias(); // Obtener la lista de categorías al montar el componente
  }, []); // Se ejecuta solo una vez al montar el componente
  const handleUpdate = async (id) => {
    try {
      setEditandoId(id);
      const categoriaEditar = categoria.find((cat) => cat.id === id);
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
      await fetch(`https://testapisystemadministration.up.railway.app/category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name: editandoValor }),
      });

      setCategoria((categorias) =>
        categorias.map((cat) => {
          if (cat.id === id) {
            return { ...cat, name: editandoValor };
          }
          return cat;
        })
      );

      cancelarEdicion();
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://testapisystemadministration.up.railway.app/category/${id}`,
        {
          method: "DELETE",
        }
      );

      setCategoria((categorias) => categorias.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <>
      <InputCategory agregarCategoria={agregarCategoria} obtenerCategorias={obtenerCategorias} />
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