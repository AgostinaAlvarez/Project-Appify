import React from 'react'
import { BsBoxSeam } from 'react-icons/bs'
import SelectComp from '../Select/SelectComp'
import { getPropertyValue } from '../../utils/controllers/controllers'

const ItemField = ({ itemList, items, setProductModal, selectedItem, options,select_product }) => {

  //itemList = {productsList}
  //items = {products}
  //setProductModal={setProductModal}
  //selectedItem = {selectedProduct}
  //options={productos_restructured_ODC(products)}
  //select_product = select_product
  
  return (
    <div className='column' style={{gap:5}}>
      <div className='row-space-btw form-header-step'>
        <span className='form-label' style={items.length === 0 ? {color:"#b9b9b9c4"} : {}}>Producto/Servicio <span style={items.length === 0 ? {color:"#b9b9b9c4"} : {color:"red"}}>*</span></span>
          {
            itemList.find((item)=>item.edit == true) ? 
            <div></div>
            :
            <div className='row' style={items.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} onClick={()=>{setProductModal(true)}}>
              <BsBoxSeam/>
              <span>Agregar nuevo producto/servicio</span>
            </div>
          }
      </div>
      {
        items.length === 0 ?
        <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
          <span>No hay productos registrados</span>
        </div>
        :
        <>
          {
            itemList.find((item)=>item.edit == true) ? 
            <div style={{border:"1px solid grey",width:"100%",boxSizing:"border-box",padding:8}}>{selectedItem.label}</div>
            :
            <SelectComp
              placeholder={'Seleccionar producto/servicio '}
              value={getPropertyValue(selectedItem,'value')}
              options={options}
              HandleChange={select_product}
            />

          }

        </>
      }
    </div>
  )
}

export default ItemField