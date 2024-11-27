import React, { useContext } from 'react'
import { FaUserPlus } from 'react-icons/fa6';
import SelectComp from '../Select/SelectComp';
import { getPropertyValue } from '../../utils/controllers/controllers';
import { AppContext } from '../../context/AppContext';

const ProviderItem = ({ setProveedorModal,proveedoresRestructured,selectedProveedor,setSelectedProveedor }) => {


  const { proveedores } = useContext(AppContext);
  return (
    <div className='column' style={{gap:5}}>
      <div className='row-space-btw'>
        <span className='form-label' style={proveedores.length === 0 ? {color:"#b9b9b9c4"} : {}}>Proveedor </span>
        <div style={proveedores.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} className='row' onClick={()=>{
            setProveedorModal(true)
          }} >
          <FaUserPlus/>
          <span>Agregar nuevo proveedor</span>
        </div>
      </div>
      {
        proveedores.length === 0 ?
        <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
          <span>No hay proveedores registrados</span>
        </div>
        :
        <SelectComp 
          placeholder={'seleccionar proveedor'}
          options={proveedoresRestructured(proveedores)}
          value={
            getPropertyValue(selectedProveedor, 'value')
          }
          HandleChange={(value,record)=>{
            setSelectedProveedor(record)
          }}
        />
      }
    </div>
  )
}

export default ProviderItem