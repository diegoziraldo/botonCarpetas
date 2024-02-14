import React from 'react'
import { BotonCategoria }  from './categoriasLink/BotonCategoria'
import { BotonProductos } from './categoriasLink/BotonProductos'
import { BotonInicio } from './categoriasLink/BotonInicio'
import { BotonClient } from './categoriasLink/BotonClient'
import { BotonSale } from './categoriasLink/BotonVentas'
import { BotonProveedor } from './categoriasLink/BotonProveedor'

export const Navigator = ()=>{
  return (
    <>
        <BotonInicio/>
        <BotonCategoria/>
        <BotonProductos/>
        <BotonClient/>
        <BotonSale/>
        <BotonProveedor/>
    </>
  )
}
