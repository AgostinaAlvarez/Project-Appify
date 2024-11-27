export const newClientValidation = (step,data) =>{
    let errors = {};
    if(step===1){
        if(!data.razon_social.trim()){
            errors.razon_social='Debe ingresar la razón social';
        }
        if(!data.rut.trim()){
            errors.rut="Debe ingresar su Rut";
        }
        if (!data.giro.trim()) {
            errors.giro = 'Debe ingresar el giro comercial';
        }
        if(data.direccion === null){
            errors.direccion = 'Debe ingresar su dirección';
        }
        if(data.comuna === null){
            errors.comuna = 'Debe ingresar su comuna';
        }
        if(data.ciudad === null){
            errors.ciudad = 'Debe ingresar su ciudad';
        }
    }else if(step === 2){
        //Datos de contacto
        if((data.nombre === null ||data.nombre === '')){
            errors.nombre='Debe ingresar el nombre del contacto'
        }
        if(!/^\S+@\S+\.\S+$/.test(data.email)){
            errors.email ='Debe ingresar un email válido';
        }
        if(!data.celular.trim()){
            errors.celular="Debe ingresar un número de celular";
        }
        if(data.vendedor === null){
            errors.vendedor = "Debe seleccionar un vendedor"
        }
    }else if(step === 3){
        if(data.condicion_de_pago === null){
            errors.condicion_de_pago="Debe seleccionar una condición de pago"
        }
    }else if(step === 4){
        if(!data.direccion.trim()){
            errors.direccion = 'Debe ingresar su dirección';
        }
        if(!data.nombre_receptor.trim()){
            errors.nombre_receptor = 'Debe ingresar el nombre del recpetor';
        }
        if(!data.lugar.trim()){
            errors.lugar = 'Debe ingresar la dirección';
        }
        if(!data.comuna.trim()){
            errors.comuna = 'Debe ingresar la comuna';
        }
        if(!data.ciudad.trim()){
            errors.ciudad = 'Debe ingresar la ciudad';
        }
    }
    return errors;
} 
