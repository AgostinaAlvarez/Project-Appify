import React, { useContext } from 'react'
import { FaUserPlus } from 'react-icons/fa6';
import SelectComp from '../Select/SelectComp';
import { getPropertyValue } from '../../utils/controllers/controllers';
import { AppContext } from '../../context/AppContext';

const DestinatarioItem = ({ setClienteModal,clientesRestructured,selectedCliente,setSelectedCliente }) => {

  const { clientes } = useContext(AppContext);

  return (
    <div className='column' style={{gap:5}}>
      <div className='row-space-btw'>
        <span className='form-label' style={clientes.length === 0 ? {color:"#b9b9b9c4"} : {}}>Destinatario</span>
        <div style={clientes.length === 0 ? {color:"green",fontWeight:600,cursor:"pointer"} : {cursor:"pointer"}} className='row' onClick={()=>{
            setClienteModal(true)
          }} >
          <FaUserPlus/>
          <span>Agregar nuevo destinatario</span>
        </div>
      </div>
      {
        clientes.length === 0 ?
        <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
          <span>No hay destinatarios registrados</span>
        </div>
        :
        <SelectComp 
          placeholder={'seleccionar proveedor'}
          options={clientesRestructured}
          value={
            getPropertyValue(selectedCliente, 'value')
          }
          HandleChange={(value,record)=>{
            setSelectedCliente(record)
          }}
        />
      }
    </div>
  )
}

export default DestinatarioItem