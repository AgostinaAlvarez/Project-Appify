//CLIENTES
export function clientesRestructured ( arrayClientes ) {
    const results = arrayClientes.map((item)=>{
        return{
            ...item,
            value: item.cliente.id,
            label: item.cliente.razon_social
        }
    })
    return results
}

//CONTACTOS
export function contactosRestructured ( arrayContactos ) {
    const results = arrayContactos.map((item)=>{
        return {
            ...item,
            value: item.id,
            label: item.nombre
        }
    })
    return results
}

//VENDEDORES ACTIVOS
export function vendedoresActivosRestructured ( arrayVendedores ) {
    const filterData = arrayVendedores.filter((item)=>item.estado === "Activo")

    const results = filterData.map((item)=>{
        return {
            ...item,
            value: item.id,
            label: item.nombre
        }
    })
    return results
}


//VENDEDORES
export function vendedoresRestructured ( arrayVendedores ) {
    const results = arrayVendedores.map((item)=>{
        return {
            ...item,
            value: item.id,
            label: item.nombre
        }
    })
    return results
}

//PROVEEDORES


//RESULTADOS


//estandarizadas

export function getPropertyValue(obj, property) {
    return obj ? obj[property] : null;
}
