import React from 'react'
import { Table } from '../../components'

export default function AviationArrival() {
  return (
    <div className='container'>
      <h1 className='text-white'>Vuelos de llegadas</h1>
      <Table iataCode='LIM' type='arrival'/>
    </div>
  )
}
