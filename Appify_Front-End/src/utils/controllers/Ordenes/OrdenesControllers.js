import { v4 as uuidv4 } from 'uuid';


function intValue (value){
  return Math.ceil(value)
}


export function productos_restructured_ODC (arrayProductos) {

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


export function add_item_ODC (selectedItem,itemsList,selectedCta){
  if(selectedItem){
    const findProducto = itemsList.find((item)=>item.id === selectedItem.id)
    if(findProducto){ 
      const updateData = itemsList.map((item)=>{
        if(item.id === selectedItem.id){
          let cta = { value: '34', label: 'Pendiente por revisar' }
          if(selectedCta){
            cta = selectedCta
          }
          return {...item,cantidad:item.cantidad+1, cuenta_selected: cta}
        }
        return item
      })
      return updateData
    }else{
      let cta = { value: '34', label: 'Pendiente por revisar' }
      if(selectedCta){
        cta = selectedCta
      }
      const updateData = [...itemsList, {...selectedItem, list_id:uuidv4(), cuenta_selected: cta }]
      return updateData
    }
    
  }else{
    return null
  }
}




export function item_unit_price_ODC (unitarioValue,selectedItem) {
  const cantidad = selectedItem.cantidad
  const porcentaje = (selectedItem.bonificacion/100)*(unitarioValue)
  const netoValue = (unitarioValue*cantidad) - (porcentaje)
  
  return {
    ...selectedItem,
    unitario: unitarioValue,
    neto: netoValue,
    bruto: intValue(netoValue * 1.19)
  }
  
}

export function item_neto_ODC (selectedItem,netoValue) {
  return {
    ...selectedItem,
    neto: netoValue,
    bruto: intValue(netoValue*1.19)
  }
}




export function increase_quantity_item_ODC (selectedItem) {

  const cantidad = selectedItem.cantidad + 1
  const unitarioValue = selectedItem.unitario
  const descuento = (selectedItem.bonificacion/100) * unitarioValue
  const netoValue = (unitarioValue - descuento) * cantidad
  const brutoValue = intValue(netoValue * 1.19)

  return {
    ...selectedItem,
    cantidad: cantidad,
    neto: intValue(netoValue),
    bruto: brutoValue
  }

}


export function decrease_quantity_item_ODC (selectedItem) {

  const cantidad = selectedItem.cantidad === 1 ? 1 : selectedItem.cantidad - 1
  const unitarioValue = selectedItem.unitario
  const descuento = (selectedItem.bonificacion/100) * unitarioValue
  const netoValue = (unitarioValue - descuento) * cantidad
  const brutoValue = intValue(netoValue * 1.19)

  return {
    ...selectedItem,
    cantidad: cantidad,
    neto: intValue(netoValue),
    bruto: brutoValue
  }
}

export function get_subtotal_ODC (itemsList) {
  let subTotal = 0;
  itemsList.forEach(element => {
    subTotal = subTotal +element.neto
  });
  return subTotal
}

export function get_total_ODC (itemsList) {
  let total = 0;
  itemsList.forEach(element => {
    total = total +element.bruto
  });
  return total
}

export function save_changes_ODC (itemsList,selectedItem,selectedCta){

  const updateData = itemsList.map((element)=>{
    if(element.id === selectedItem.id){
      return {...selectedItem,edit:false,cuenta_selected: selectedCta}
    }else{
      return element
    }
  })
  return updateData
}


export function cancel_changes_ODC (itemsList){
  const updateData = itemsList.map((element)=>{
    return {...element,edit:false}
  })
  return updateData
}


export function remove_item_ODC (id,itemsList) {
  const updateData = itemsList.filter((item)=>item.value !== id)
  return updateData
}