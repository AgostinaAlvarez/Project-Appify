import { v4 as uuidv4 } from 'uuid';


export const HandleChangeClient = (record,setSelectedClient,setContactSelected,setContactList) => {
    setSelectedClient(record)
    setContactSelected(null)
    setContactList(record.contactos)
}

export function restructuredProductsProject (arrayProductos) {
    const filterProducts = arrayProductos.filter((item)=>item.activo === true) 
    const results = filterProducts.map((item)=>{
        return {
          ...item, 
          value: item.id, 
          label: item.nombre, 
          cantidad: 1,
          total: item.precio,
          precio: item.iva === true ? ((item.precio) - (item.precio*0.19) ).toFixed(2) : item.precio,
          neto: item.iva === true ? ((item.precio) - (item.precio*0.19) ).toFixed(2) : item.precio,
          iva_value :  item.iva === true ? ( item.precio * 0.19 ).toFixed(2) : "0",
          
        }
    })
    return results
}

export function subtotal_proyecto (selectedProduct,productsList) {
    let subtotal = 0
    if(selectedProduct){
      subtotal = subtotal + parseFloat(selectedProduct.total)
    }
    if(productsList.length !== 0){
      productsList.forEach(element => {
        subtotal = subtotal += parseFloat(element.total)
      });
    }
    return subtotal
}


export function tota_iva_proyecto (selectedProduct,productsList) {
    let iva = 0
    if(selectedProduct){
        iva = iva + parseFloat(selectedProduct.iva_value)
    }
    if(productsList.length !== 0){
        productsList.forEach(element => {
            iva = iva += parseFloat(element.iva_value)
        });
    }
    return iva
} 


export function precio_total_proyecto (selectedProduct,productsList){
    let total = 0
    if(selectedProduct){
        total = total + parseFloat(selectedProduct.precio)
    }
    if(productsList.length !== 0){
        productsList.forEach(element => {
        total = total += parseFloat(element.precio)
        });
    }
    return total
}


export function cantidad_total_proyecto (selectedProduct,productsList) {
    let total = 0
    if(selectedProduct){
        total = total + parseInt(selectedProduct.cantidad)
    }
    if(productsList.length !== 0){
        productsList.forEach(element => {
            total = total += parseInt(element.cantidad)
        });
    }
    return total
}


///FUNCIONES PARA LA LOGICA DE ITEM

function intValue (value){
    return Math.ceil(value)
}


export function item_unit_price (unitarioValue, selectedItem) {
    const cantidad = selectedItem.cantidad
    const porcentaje = (selectedItem.bonificacion/100)*(unitarioValue)
    const netoValue = (unitarioValue*cantidad) - (porcentaje)
    
    const result = {
        ...selectedItem,
        unitario: unitarioValue,
        neto: netoValue,
        bruto: intValue(netoValue * 1.19)
    }
    return result
}



export function item_neto (netoValue,selectedItem) {
    const result = {
        ...selectedItem,
        neto: netoValue,
        bruto: intValue(netoValue * 1.19)
    }
    return result
}


export function item_percent ( percent,selectedItem ) {
    if(percent === ""){
        const unitarioValue = selectedItem.unitario
        const cantidad = selectedItem.cantidad
        const netoValue = (unitarioValue * cantidad)
        const result = {
            ...selectedItem,
            bonificacion: null,
            neto: intValue(netoValue),
            bruto: intValue(netoValue * 1.19)
        }
        return result
      }else{
        const percentValue = parseFloat(percent)
        const unitarioValue = selectedItem.unitario
        const cantidad = selectedItem.cantidad
        const porcentaje = (percentValue/100) * (unitarioValue * cantidad)
    
        const netoValue = (unitarioValue * cantidad) - (porcentaje)
    
        const result = {
            ...selectedItem,
            bonificacion: percentValue,
            neto: intValue(netoValue),
            bruto: intValue(netoValue * 1.19)
        }
        return result
      }
}


export function increase_quantity (selectedItem) {

    const cantidad = selectedItem.cantidad + 1
    const unitarioValue = selectedItem.unitario
    const descuento = (selectedItem.bonificacion/100) * unitarioValue
    const netoValue = (unitarioValue - descuento) * cantidad
    const brutoValue = intValue(netoValue * 1.19)

    const result = {
        ...selectedItem,
        cantidad: cantidad,
        neto: intValue(netoValue),
        bruto: brutoValue
    }
    return result
}


export function decrease_quantity (selectedItem) {
    const cantidad = selectedItem.cantidad === 1 ? 1 : selectedItem.cantidad - 1
    const unitarioValue = selectedItem.unitario
    const descuento = (selectedItem.bonificacion/100) * unitarioValue
    const netoValue = (unitarioValue - descuento) * cantidad
    const brutoValue = intValue(netoValue * 1.19)

    const result = {
        ...selectedItem,
        cantidad: cantidad,
        neto: intValue(netoValue),
        bruto: brutoValue
    }
    return result
}



export function remove_item (id, itemsList) {
    const updateList = itemsList.filter((item)=>item.value !== id)
    return updateList
}

export function save_changes (itemsList, selectedItem) {

    const updateList =  itemsList.map((element)=>{
        if(element.id === selectedItem.id){
          return {...selectedItem,edit:false}
        }else{
          return element
        }
    })

    return updateList
}


export function cancel_changes (itemsList) {

    const updateList = itemsList.map((element)=>{
        return {...element,edit:false}
    })

    return updateList

}


export function get_subtotal_proyecto (itemsList) {
    let subTotal = 0;
    itemsList.forEach(element => {
      subTotal = subTotal +element.neto
    });
    return subTotal
}


export function get_total_proyecto (itemsList) {
    let total = 0;
    itemsList.forEach(element => {
      total = total +element.bruto
    });
    return total
}


export function productos_restructured_proyecto (arrayProductos) {
    const filterProducts = arrayProductos.filter((item)=>item.activo === true) 
    const updateData = filterProducts.map((item)=>{
      return {
        ...item, 
        value: item.id, 
        label: item.nombre, 
        cantidad: 1,
        unitario: item.iva === true ? intValue(parseFloat(item.precio/1.19)) : intValue(parseFloat(item.precio)),
        bruto: item.iva === true ? intValue(parseFloat(item.precio)) : intValue(parseFloat(item.precio*1.19)),
        neto:  item.iva === true ? intValue(parseFloat(item.precio/1.19)) : intValue(parseFloat(item.precio)),
        bonificacion: null,
        notas: null,
      }
    })
    
    return updateData
}


export function add_item_proyecto (selectedItem, itemsList) {

  if(selectedItem){
    const findProducto = itemsList.find((item)=>item.id === selectedItem.id)
    if(findProducto){
      const updateData = itemsList.map((item)=>{
        if(item.id === selectedItem.id){
            return {...item, cantidad: item.cantidad +1}
        }
        return item
      })
      return updateData
    }else{
      const updateData = [...itemsList, {...selectedItem, list_id:uuidv4()}]
      return updateData
    }
  }else{
    return null
  }
}
