import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ListaItems } from './components/ListaItems'
/* import ItemDetalle from './components/ItemDetalle';
import NuevoItem from './components/NuevoItem';
import EditarItem from './components/EditarItem'; */

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <ListaItems/> } />
        {/* <Route path="/item/:id" component={ItemDetalle} />
        <Route path="/agregar" component={NuevoItem} />
        <Route path="/editar/:id" component={EditarItem} />  */}
        {/* Redireccionamiento a la lista de items si la ruta no existe/* */}
        <Route path="*" component={() => <Redirect to="/" />} />
      </Routes>
    </Router>
  );
};


