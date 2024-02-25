import { useEffect, useState } from "react";

import "../styles/InputProduct.css";

export const InputProduct = () => {
  const [categoria, setCategoria] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState();
  const [precio, setPrecio] = useState();
  const [code, setCode] = useState();
  const [proveedor, setProveedor] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch(
        `https://testapisystemadministration.up.railway.app/category`
      );
      const { data } = await respuesta.json();
      setCategoria(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
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
        setCount(count + 1);
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
      <div className="container">
        <form method="post" onSubmit={guardarInput}>
          <div className="card text-center">
            <div className="card-header">Ingreso de Producto</div>
            <div className="card-body">
              <div className="input-group mb-3">
                <label className="input-group-text" id="basic-addon1">
                  Categoria:
                  <select>
                    {categoria.map((category, index) => (
                      <option key={index}>{category.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" id="basic-addon1">
                  Nombre de producto:
                  <input
                    type="text"
                    className=""
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                    placeholder="Agregar producto"
                  />
                </label>
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" id="basic-addon1">
                  Descripcion:
                  <input
                    type="text"
                    className=""
                    value={descripcion}
                    onChange={(e) => {
                      setDescripcion(e.target.value);
                    }}
                    placeholder="Descripcion"
                  />
                </label>
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" id="basic-addon1">
                  Cantidad:
                  <input
                    type="number"
                    className=""
                    value={cantidad}
                    onChange={(e) => {
                      setCantidad(e.target.value);
                    }}
                    placeholder="Cantidad"
                  />
                </label>
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" id="basic-addon1">
                  Precio:
                  <input
                    type="number"
                    className=""
                    value={precio}
                    onChange={(e) => {
                      setPrecio(e.target.value);
                    }}
                    placeholder="Precio"
                  />
                </label>
              </div>

              <div className="input-group mb-3">
                <label className="input-group-text" id="basic-addon1">
                  Codigo:
                  <input
                    type="number"
                    className=""
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                    placeholder="Codigo"
                  />
                </label>
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text" id="basic-addon1">
                  Proveedor:
                  <input
                    type="text"
                    className=""
                    value={proveedor}
                    onChange={(e) => {
                      setProveedor(e.target.value);
                    }}
                    placeholder="Proveedor"
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
