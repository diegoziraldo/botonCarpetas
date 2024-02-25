import { useState, useEffect } from "react";
import { InputProduct } from "./InputProduct";

export const Product = ({ inputValue }) => {
  const [producto, setProducto] = useState([]);
  const [editandoId, setEditandoId] = useState(null); // Guarda el ID de la categoría que se está editando
  const [editandoValor, setEditandoValor] = useState(""); // Guarda el valor editado temporalmente

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch(
        `https://testapisystemadministration.up.railway.app/product`
      );
      const producto = await respuesta.json();
      setProducto(producto);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  /* Agregar los campos de la tabla */
  const agregarProducto = async (nuevoProducto) => {
    try {
      const respuesta = await fetch(
        `https://testapisystemadministration.up.railway.app/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: nuevoProducto }),
        }
      );

      if (respuesta.ok) {
        const nuevoProductoAgregado = await respuesta.json();
        // Actualiza el estado local inmediatamente
        setCategoria((prevProductos) => [...prevProductos, nuevoProductoAgregado]);
      } else {
        console.error("Error al agregar el producto:", respuesta.status);
      }
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };


  const handleUpdate = async (id) => {
    try {
      // Guarda el ID de la categoría que se está editando
      setEditandoId(id);

      // Busca la categoría correspondiente al ID y guarda su valor para editar
      const productoEditar = producto.find(prod => prod.id === id);
      setEditandoValor(productoEditar.name);
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setEditandoValor("");
  };

  const guardarEdicion = async (id) => {
    try {
      // Realiza una solicitud PUT a la API para actualizar la categoría
      await fetch(
        `https://testapisystemadministration.up.railway.app/product`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id, name: editandoValor }), // Envía el valor editado
        }
      );

      // Actualiza el estado para reflejar el cambio
      setProducto(producto.map(prod => {
        if (prod.id === id) {
          return { ...prod, name: editandoValor }; // Actualiza el nombre de la categoría
        }
        return prod;
      }));

      // Limpia el estado de edición
      cancelarEdicion();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://testapisystemadministration.up.railway.app/product/${id}`,
        {
          method: "DELETE",
        }
      );

      // Actualiza el estado para reflejar el cambio eliminando la categoría de la lista
      setProducto(categoria.filter(prod => prod.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch(
        `https://testapisystemadministration.up.railway.app/category`
      );
      const {data} = await respuesta.json();
      setCategoria(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };



  return (
    <>
    <InputProduct agregarProducto={agregarProducto} obtenerProductos={obtenerProductos} />
    <div>
    <h3>Productos</h3>
    <table className="table">
      {producto.map((product, index) => (
        <div key={index}>
          {editandoId === product.id ? (
            <div>
              <input
                type="text"
                value={editandoValor}
                onChange={(e) => setEditandoValor(e.target.value)}
              />
              <button onClick={() => guardarEdicion(product.id)}>Guardar</button>
              <button onClick={cancelarEdicion}>Cancelar</button>
            </div>
          ) : (
            <div>
              <h3>{product.name}</h3>
              <button onClick={() => handleUpdate(product.id)}>Editar</button>
              <button onClick={() => handleDelete(product.id)}>Eliminar</button>
            </div>
          )}
        </div>
      ))}
      </table>
    </div>
    </>
  );
};
