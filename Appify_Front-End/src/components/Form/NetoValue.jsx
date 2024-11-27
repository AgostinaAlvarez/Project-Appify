import React from 'react'
import { getPropertyValue } from '../../utils/controllers/controllers'
import EmptyField from './EmptyField'

const NetoValue = ({ HandleChange, selectedItem, loading }) => {
  return (
    <>
    {
      loading === true || selectedItem === null?
      <EmptyField/>
      :
      <input
        className='form-input-unit-price'
        style={{padding:8}}
        type='number'
        onChange={HandleChange}
        value={getPropertyValue(selectedItem,'neto')}
        data-iva={getPropertyValue(selectedItem,'iva')}
      />
    }
    </>
  )
}

export default NetoValue