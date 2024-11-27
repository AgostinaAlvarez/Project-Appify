export function restructuredFV (arrayFV) {
    const result = arrayFV.map((item)=>{
        return {
            ...item,
            value: item.idFactura,
            label: `FV-${item.idFactura.slice(-4)} | ${item.cliente}`
        }
    })
    return result
}


export function restructuredFVE (arrayFVE) {
    const result = arrayFVE.map((item)=>{
        return {
            ...item,
            value: item.idFactura,
            label: `FVE-${item.idFactura.slice(-4)} | ${item.cliente}`
        }
    })
    return result
}


export function restructuredNC (arrayNC) {
    const result = arrayNC.map((item)=>{
        return {
            ...item,
            value: item.idNota,
            label: `NC-${item.idNota.slice(-4)} | ${item.cliente}`
        }
    })
    return result
}

export function restructuredND (arrayND) {
    const result = arrayND.map((item)=>{
        return {
            ...item,
            value: item.idNota,
            label: `ND-${item.idNota.slice(-4)} | ${item.cliente}`
        }
    })
    return result
}