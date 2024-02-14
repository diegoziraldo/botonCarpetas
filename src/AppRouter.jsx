import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Category } from './components/Category'
import { Product } from './components/Product'
import { Navigator } from './components/Navigator';
/* import ItemDetalle from './components/ItemDetalle';
import NuevoItem from './components/NuevoItem';
import EditarItem from './components/EditarItem'; */

export const AppRouter = () => {
  return (
    <>

    <Router>
      <Navigator/>
      <Routes>
        <Route path="/"/>
        <Route path="/category" element={ <Category /> } />
        <Route path="/product" element={ <Product /> } />
        {/* Redireccionamiento a la lista de items si la ruta no existe/* */}
        <Route path="*" component={() => <Redirect to="/" />} />
      </Routes>
    </Router>
    </>
  );
};


