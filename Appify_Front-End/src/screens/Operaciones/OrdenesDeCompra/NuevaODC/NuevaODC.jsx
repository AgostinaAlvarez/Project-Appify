import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../context/AppContext';
import { updateSubMenuAsideOptions } from '../../../../utils/helpers';
import { FaArrowLeftLong, FaUserPlus } from 'react-icons/fa6';
import Success from '../../../../components/Modals/Success';
import PrincipalCard from '../../../../components/Card/PrincipalCard';
import { DatePicker, Table } from 'antd';
import FollowingBtn from '../../../../components/Buttons/FollowingBtn';
import { FiDownload } from 'react-icons/fi';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import FormerBtn from '../../../../components/Buttons/FormerBtn';
import CreateBtn from '../../../../components/Buttons/CreateBtn';
import SelectComp from '../../../../components/Select/SelectComp';
import { Loader } from '../../../../components/Loader/Loader';
import ModalError from '../../../../components/Modal/ModalError';
import CancelBtn from '../../../../components/Buttons/CancelBtn';
import { productos_restructured_ODC,item_neto_ODC,item_unit_price_ODC, increase_quantity_item_ODC, decrease_quantity_item_ODC, remove_item_ODC, save_changes_ODC, get_total_ODC, get_subtotal_ODC, add_item_ODC } from '../../../../utils/controllers/Ordenes/OrdenesControllers';
import { getPropertyValue } from '../../../../utils/controllers/controllers';
import ColumnComp from '../../../../components/Form/ColumnComp';
import FieldComp from '../../../../components/Form/FieldComp';
import UnitPrice from '../../../../components/Form/UnitPrice';
import NetoValue from '../../../../components/Form/NetoValue';
import TotalValue from '../../../../components/Form/TotalValue';
import QuantityValue from '../../../../components/Form/QuantityValue';
import FormGrid from '../../../../components/Form/FormGrid';
import ResultsRow from '../../../../components/Form/ResultsRow';
import RetencionValue from '../../../../components/Form/RetencionValue';
import RadioGroupComponent from '../../../../components/Form/RadioGroupComponent';
import BtnsFooterContainer from '../../../../components/Form/BtnsFooterContainer';
import RenderProductModal from '../../../../components/Form/RenderProductModal';
import ItemField from '../../../../components/Form/ItemField';
import { columns_product_table_ODC } from '../../../../utils/data/ODC';
import { options_condicion_de_pago } from '../../../../utils/data/CondicionDePago';
import InputBasic from '../../../../components/Form/InputBasic';
import ProviderItem from '../../../../components/Form/ProviderItem';
import PrincipalContainerForm from '../../../../components/Form/PrincipalContainerForm';
import RenderProviderModal from '../../../../components/Form/RenderProviderModal';
import axios from 'axios';



const FirstStep = ({setStep,selectedProveedor,setSelectedProveedor,ordenDeCompraData,setOrdenDeCompraData,fecha,setFecha}) =>{
  const { proveedores } = useContext(AppContext);
  const [ proveedorModal,setProveedorModal ] = useState(false)


  function proveedoresRestructured (proveedoresArray) {
    const updateData = proveedoresArray.map((item)=>{
      return {
        ...item, label: item.razon_social, value: item.id
      }
    })
    return updateData
  }

  
  const onChange = (date, dateString) => {
    const fecha = new Date(dateString);
    setFecha(date)
    const fechaMod = fecha.toISOString()
    setOrdenDeCompraData({
      ...ordenDeCompraData,fecha: fechaMod
    })
  };
  
  return(
    <>
    <PrincipalContainerForm>
      <h2 style={{fontSize:20}}>Datos principales</h2>
      <FormGrid>
        {/*Numero de documento*/}
        <ColumnComp>
          <FieldComp text={'N° documento'}/>
          <InputBasic
            value={ordenDeCompraData.numero_documento}
            HandleChange={ (e)=> setOrdenDeCompraData({...ordenDeCompraData, numero_documento: e.target.value}) }
          />
        </ColumnComp>
        {/*Fecha*/}
        <ColumnComp>
          <FieldComp text={'Fecha'} required={true}/>
          <DatePicker picker="date" onChange={onChange} value={fecha}/>
        </ColumnComp>
        {/*Proveedor*/}
        <ProviderItem
          setProveedorModal={setProveedorModal}
          proveedoresRestructured={proveedoresRestructured}
          selectedProveedor={selectedProveedor}
          setSelectedProveedor={setSelectedProveedor}
        />
        {/*Condicion de pago */}
        <ColumnComp>
          <FieldComp text={'Condición de pago'}/>
          <SelectComp
                placeholder={'Seleccionar condición de pago'}
                value={ordenDeCompraData.condicion_de_pago}
                options={options_condicion_de_pago}
                HandleChange={(value,record)=>{
                  setOrdenDeCompraData({...ordenDeCompraData,condicion_de_pago:value})
                }}
            />
        </ColumnComp>
        {/*Notas*/}
        <ColumnComp>
          <FieldComp text={'Notas'}/>
          <textarea style={{height:150}} value={ordenDeCompraData.notas} onChange={(e)=>{setOrdenDeCompraData({...ordenDeCompraData, notas: e.target.value})}}/>
        </ColumnComp>
        {/**/}
      </FormGrid>
      <BtnsFooterContainer>
        <div></div>
        <FollowingBtn setStep={setStep} value={2}/>
      </BtnsFooterContainer>
    </PrincipalContainerForm>
    <RenderProviderModal 
      proveedorModal={proveedorModal}
      setProveedorModal={setProveedorModal}
    />
    </>
  )
}

const SecondStep = ({setStep,productsList,setProductsList,ordenDeCompraData,setOrdenDeCompraData,selectedProveedor,retencion,setRetencion,montoExento,setMontoExento, exencion, setExencion}) => {

  const { products,categoriaCtas } = useContext(AppContext);
  const [ selectedProduct,setSelectedProduct ] = useState(null)
  const [ selectedCta,setSelectedCta ] = useState(null)
  const [ loading,setLoading ] = useState(false)
  const [ productModal,setProductModal ] = useState(false);

  const select_product = (text,record)  =>{
    setSelectedProduct(null)
    setTimeout(() => {
      setSelectedProduct({...record, bonificacion: null,edit: false})                  
    }, 90);
  }

  function loading_changes () {
    setLoading(true)
    setTimeout(() => {
      setSelectedProduct(null)
      setLoading(false)
    }, 90);
  }

  function addProducto (){
    const updateData = add_item_ODC(selectedProduct,productsList,selectedCta)
    if(updateData){
      setProductsList(updateData)
      setSelectedProduct(null)
      loading_changes()
    }else{
      setSelectedProduct(null)
      alert('Debe seleccionar al menos un producto')
      loading_changes()
    }
  }
  
  const onChange = (e) => {
    setExencion(e.target.value)
  };

  function changeUnitPrice (e) {
    const unitarioValue = parseFloat(e.target.value)
    setSelectedProduct(item_unit_price_ODC(unitarioValue,selectedProduct))
  }

  function changeNeto (e) {
    const netoValue = e.target.value
    setSelectedProduct(item_neto_ODC(selectedProduct,netoValue))
  }

  function increase () {
    setSelectedProduct(increase_quantity_item_ODC(selectedProduct))
  }

  function decrease () {
    setSelectedProduct(decrease_quantity_item_ODC(selectedProduct))
  }

  function deleteItem (id) {
    setProductsList(remove_item_ODC(id, productsList))
  }

  function changeItem (record) {
    const updateData = productsList.map((item)=>{
      if(item.value === record.value){
        return {...item,edit:true}
      }
      return {...item,edit:false}
    })
    
    setProductsList(updateData)
    setSelectedCta(record.cuenta_selected)
    setSelectedProduct({...record,edit:true})
  }

  function getTotal () {
    let total = 0;
    productsList.forEach(element => {
      total = total +element.bruto
    });
    return total
  }

  function saveChanges () {
    setProductsList(save_changes_ODC(productsList,selectedProduct,selectedCta))
    loading_changes()
  }

  function cancelChanges () {
    const updateData = productsList.map((element)=>{
      return {...element,edit:false}
    })

    setProductsList(updateData)
    setLoading(true)

    setTimeout(() => {
      setSelectedProduct(null)
      setLoading(false)
    }, 90);
  }
  
  function items_products_data (productList) {

    /*
     "cantidad": 1,
      "cuenta": "34",
      "idProducto": "product-312e3329-ff47-4d8b-ba0b-767285d44d96",
      "iva": true,
      "subtotal": 2380,
      "total": 2380,
      "unitario": 2380
    */
      
    const data = productList.map((item)=>{
      return {
        cantidad: item.cantidad,
        cuenta: item.cuenta_selected.value,
        idProducto: item.id,
        IVA: item.iva ? (item.bruto - item.neto) : 0,
        subtotal: item.neto,
        total: item.bruto,
        unitario: item.unitario,
        neto: item.neto
      }
    })
    return data
  }


  /*
  {
    "item_producto": [
      {
        "cantidad": 1,
        "cuenta": "34",
        "idProducto": "product-21ee2f2a-9c47-461e-9c5f-777625e79936",
        "iva": false,
        "subtotal": 4000
        // otros campos del producto si los hay
      }
    ],
    "item_servicio": [],
    "orden_compra": {
      "IVA": true,
      "condicion_de_pago": "2",
      "fecha": "2024-06-13T00:00:00.000Z",
      "notas": "nn",
      "numero_documento": "222",
      "subtotal": 4000,
      "total": 4760,
      "neto":4000,
      "user": "super-user-b33cd8b7-7e92-41d0-959c-0a77dd785024",
      "idProvedor": "prov-d7474d16-a25f-41b9-acac-6f0a882fe54f"
      }
  }
  
  */
  function createOrder () {
    if(productsList.length === 0){
      alert('no hay productos seleccionados')
    }else{
    
      console.log(items_products_data(productsList))
      console.log(productsList)

      const objData = {
        orden_compra: {
          ...ordenDeCompraData,
          subtotal: get_subtotal_ODC(productsList),
          total: value_Total(retencion),
          IVA: 1,
          idProvedor: selectedProveedor.value
        },
        item_producto: items_products_data(productsList),
        item_servicio: []
      }
      console.log(objData)
      sendData(objData)
    }
  }

  async function sendData (data) {
    try{
      console.log('enviando')
      const response = await axios.post('https://appify-black-side.vercel.app/ordenCompra/ordenCompra',data)
      console.log(response)
    }catch(err){
      console.log(err)
    }
  }

  function value_IVA (productsList) {
    const result = get_total_ODC(productsList) - get_subtotal_ODC(productsList)
    return result
  }

  function value_Total (retencion){
    const result = retencion ? getTotal() + parseFloat(retencion) : getTotal()
    return result
  }

  const change_monto_exento = (e) => {
    if(e.target.value === ""){
      setMontoExento(null)
    }else{
      setMontoExento(e.target.value)
    }
  }

  const change_retencion = (e) => {
    if(e.target.value === ""){
      setRetencion(null)
    }else{
      setRetencion(e.target.value)
    }
  }

  return(
    <>
      <PrincipalContainerForm>      
        <div className='row-space-btw'>
          <div className='row'>
            <h2 style={{fontSize:20}}>Ítems</h2>
            <div className='rounded-item' style={{height:30,width:30,color:"black",backgroundColor:"#b9b9b98d",fontSize:15}}>
              <FiDownload />
            </div>
          </div>
          <AddMoreBtn label={'Agregar otro producto/servicio'} HanldeClick={addProducto}/>
        </div>
        {/*Tabla productos*/}
        {
            productsList.length === 0 ?
            <></>
            :
            <div style={{width:"100%",alignItems:"center"}}>
              <Table
                dataSource={productsList}
                columns={ columns_product_table_ODC({deleteItem,changeItem})}
              />
            </div>
        }
        <FormGrid>
          {/*Item*/}
          <ItemField
              itemList ={productsList}
              items={products}
              setProductModal={setProductModal}
              selectedItem={selectedProduct}
              options={productos_restructured_ODC(products)}
              select_product={select_product}
          />
          {/*Cantidad*/}
          <ColumnComp>
            <FieldComp text={'cantidad'}/>
            <QuantityValue
              selectedItem={selectedProduct}
              loading={loading}
              increase={increase}
              decrease={decrease}
            />
          </ColumnComp>
          {/*Precio unitario*/}
          <ColumnComp>
            <FieldComp required={true} text={'Precio unitario'} />
            <UnitPrice
              loading={loading}
              HandleChange={changeUnitPrice}
              selectedItem={selectedProduct}
            />
          </ColumnComp>
          {/*Neto*/}
          <ColumnComp>
            <FieldComp text={'Neto'}/>
            <NetoValue
              loading={loading}
              HandleChange={changeNeto}
              selectedItem={selectedProduct}
            />
          </ColumnComp>
          {/*Total*/}
          <ColumnComp>
            <FieldComp text={'Total'}/>
            <TotalValue
              selectedItem={selectedProduct}
              loading={loading}
            />
          </ColumnComp>
          {/*Cuenta*/}
          <ColumnComp>
            <FieldComp text={'Cuenta'}/>
            <SelectComp 
              placeholder={'Seleccionar la cuenta'}
              options={categoriaCtas}
              value={getPropertyValue(selectedCta, 'value')}
              HandleChange={(value,record)=>{
                setSelectedCta(record)
              }}
            />
          </ColumnComp>
          {
            productsList.length === 0  || productsList.find((item)=>item.edit == true) ?
            <></>
            :
            <>
              <div></div>
              <ColumnComp prop={{gap:15}}>
                <ResultsRow text={'Subtotaal'} amount_deducted={get_subtotal_ODC(productsList)}/>
                <ResultsRow text={'IVA (19%)'} amount_deducted={value_IVA(productsList)}/> 
                <FieldComp text={'Agregar exención'}/>
                <RadioGroupComponent
                  HandleChange={onChange}
                  value={exencion}
                  opt1={'Si'}
                  opt2={'No'}
                />
                {
                  exencion === true ?
                  <>
                  <FormGrid>
                    <ColumnComp>
                      <FieldComp text={'Monto exento'}/>
                      <RetencionValue
                        value={montoExento}
                        HandleChange={change_monto_exento}
                        placeholder={'Agregue el monto'}
                      />
                    </ColumnComp>

                    <ColumnComp>
                      <FieldComp text={'Retención'}/>
                      <RetencionValue
                        value={retencion}
                        HandleChange={change_retencion}
                        placeholder={'Agregue el monto'}
                      />
                    </ColumnComp>
                  </FormGrid>
                  </>
                  :
                  <></>
                }
                <ResultsRow text={'Totaal'} amount_deducted={value_Total(retencion)}/>
              </ColumnComp>
            </>
          }
        </FormGrid>

        <BtnsFooterContainer>
          {
            productsList.find((item)=>item.edit == true) ? 
            <>
              <CancelBtn label={'Cancelar'} HanldeClick={cancelChanges}/>
              <CreateBtn label={'Guardar cambios'} HanldeClick={saveChanges}/>
            </>
            :
            <>
              <FormerBtn setStep={setStep} value={1}/>
              <CreateBtn label={'Crear orden'} HanldeClick={createOrder}/>
            </>
          }
        </BtnsFooterContainer>
      </PrincipalContainerForm>
      <RenderProductModal
        productModal={productModal}
        setProductModal={setProductModal}
      />
    </>
  )
}

const NuevaODC = () => {

  const {menuOptions,setMenuOptions,userLoggedData} = useContext(AppContext);
  const navigate = useNavigate();
  const ordenDeCompraInitialState = {
    user: userLoggedData.data.user,
    numero_documento: null,
    fecha: null,
    condicion_de_pago: null,
    notas: null
  }
  const [ step,setStep ] = useState(1);
  const [ loadingScreen,setLoadingScreen ] = useState(false);
  const [ errorScreen,setErrorScreen ] = useState(false);
  const [ ordenDeCompraData,setOrdenDeCompraData ] = useState(ordenDeCompraInitialState)
  const [ selectedProveedor,setSelectedProveedor ] = useState(null)
  const [ productsList,setProductsList ] = useState([]);
  const [ fecha,setFecha ] = useState(null)
  const [ exencion,setExencion ] = useState(false)
  const [ retencion,setRetencion ] = useState(null)
  const [ montoExento,setMontoExento ] = useState(null)

  useEffect(() => {
    const updateData = updateSubMenuAsideOptions(menuOptions,'Órdenes','/purchases')
    setMenuOptions(updateData)
  }, [])

  function formSetupSteps (){
    switch (step) {
      case 1:
        return <FirstStep 
          setStep={setStep}
          selectedProveedor={selectedProveedor}
          setSelectedProveedor={setSelectedProveedor}
          ordenDeCompraData={ordenDeCompraData}
          setOrdenDeCompraData={setOrdenDeCompraData}
          fecha={fecha}
          setFecha={setFecha}
        />
      
      case 2:
        return <SecondStep 
          setStep={setStep}
          productsList={productsList}
          setProductsList={setProductsList}
          ordenDeCompraData={ordenDeCompraData}
          setOrdenDeCompraData={setOrdenDeCompraData}
          selectedProveedor={selectedProveedor}
          retencion={retencion}
          setRetencion={setRetencion}
          montoExento={montoExento}
          setMontoExento={setMontoExento}
          exencion={exencion}
          setExencion={setExencion}
        />
    }
  }

  return (
    <>
      <div className='row' onClick={()=>{navigate('/purchases')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a  órdenes de compra</span>
      </div>
      <h1>Agregar orden de compra</h1>
      {
        loadingScreen === true ?
        <Loader label={'Creando Orden de compra'} />
        :
        <>
          {
            errorScreen === true ?
            <ModalError 
              onCancel={()=>{console.log('redireccionar al principal')}}
              onRetry={()=>{console.log('volver a intentar')}}
              errorMessage={'Error al crear el cliente'}
            />              
            :
            <>
            {
              step === 3 ?
              <Success message={'Orden de compra creada con éxito!'}/>
              :
              <PrincipalCard>
                <div className='step-container step-container-2-steps' >
                  <div className='step-container-item'>
                    <div className={ step >= 2 ? 'step-item-bar-cta' : 'step-item-bar' }></div>
                    <div className='step-item-dot-cta' style={{left:-20}}>1</div>
                    <div className={step >= 2 ? 'step-item-dot-cta' : 'step-item-dot'} style={{right:-20}}>2</div>
                  </div>
                </div>
                <form className='step-form'>
                  {formSetupSteps()}
                </form>
              </PrincipalCard>
            }
            </>
          }
        </>
      }
    
    </>
  )
}

export default NuevaODC