import { AiFillEdit } from "react-icons/ai"
import { FaTrashAlt } from "react-icons/fa"
import { MdOutlineRemoveRedEye } from "react-icons/md"


export const columns_product_table_ODC = ({ deleteItem,changeItem }) =>{
    
    const data = [
        {
          title: 'Producto/Servicio',
          dataIndex: 'label',
          key: 'label',
        },
        {
          title: 'Cantidad',
          dataIndex: 'cantidad',
          key: 'cantidad',
        },
        {
          title: 'Unitario',
          dataIndex: 'neto',
          key: 'neto',
        },
        {
          title: 'Neto',
          dataIndex: 'neto',
          key: 'neto',
        },
        {
          title: 'Total',
          dataIndex: 'bruto',
          key: 'bruto',
        },
        {
          title: 'Cuenta',
          dataIndex: 'cuenta',
          key: 'cuenta',
          render: (text,record) => record.cuenta_selected.label
          
        },
        {
          title: 'Acciones',
          key: 'actions',
          render: (text, record) => {
            return (
                <div style={{display:"flex",alignItems:"center",gap:15}}>
                {
                    record.edit === true ? 
                    <>
                    <MdOutlineRemoveRedEye/>
                    </>
                    :
                    <>
                    <AiFillEdit style={{cursor:"pointer"}} onClick={()=>{changeItem(record)}}/>
                    <FaTrashAlt style={{cursor:"pointer"}} onClick={()=>{deleteItem(record.value)}}/>
                    </>
                }
                </div>
            )
          },
        },
    ]
    
    return data
}
