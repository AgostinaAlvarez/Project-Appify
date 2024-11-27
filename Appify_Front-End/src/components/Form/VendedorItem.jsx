import React, { useContext } from 'react'
import { FaUserPlus } from 'react-icons/fa6';
import SelectComp from '../Select/SelectComp';
import { getPropertyValue } from '../../utils/controllers/controllers';
import { AppContext } from '../../context/AppContext';

const VendedorItem = ({ setVendedorModal,vendedoresRestructured,selectedVendedor,setSelectedVendedor }) => {

  const { subusuarios } = useContext(AppContext);

  return (
    <div className='column' style={{gap:5}}>
      <div className='row-space-btw'>
        <span className='form-label' style={subusuarios.length === 0 ? {color:"#b9b9b9c4"} : {}}>Vendedor</span>
        <div style={subusuarios.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} className='row' onClick={()=>{
            setVendedorModal(true)
          }} >
          <FaUserPlus/>
          <span>Agregar nuevo vendedor</span>
        </div>
      </div>
      {
        subusuarios.length === 0 ?
        <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
          <span>No hay vendedores registrados</span>
        </div>
        :
        <SelectComp 
          placeholder={'seleccionar proveedor'}
          options={vendedoresRestructured}
          value={
            getPropertyValue(selectedVendedor, 'value')
          }
          HandleChange={(value,record)=>{
            setSelectedVendedor(record)
          }}
        />
      }
    </div>
  )
}

export default VendedorItem