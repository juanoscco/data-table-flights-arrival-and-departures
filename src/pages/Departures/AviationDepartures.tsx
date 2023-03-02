import React from 'react'
import { Table } from '../../components'

export default function AviationDepartures() {
  return (
    <div className='container'>
      <h1 className='text-white'>Vuelos de salidas</h1>
      <Table iataCode='LIM' type='departure'/>
    </div>
  )
}
