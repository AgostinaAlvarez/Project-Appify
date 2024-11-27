import React from 'react'
import EmptyField from './EmptyField'
import { getPropertyValue } from '../../utils/controllers/controllers'

const TotalValue = ({selectedItem,loading}) => {
  return (
    <>
      {
        loading === true || selectedItem === null?
        <EmptyField/>
        :
        <div 
          style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8}}
        >
          {getPropertyValue(selectedItem,'bruto')}
        </div>
      }
    </>
  )
}

export default TotalValue