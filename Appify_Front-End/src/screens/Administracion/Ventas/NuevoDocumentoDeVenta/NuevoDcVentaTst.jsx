import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../../components/Loader/Loader'
import ModalError from '../../../../components/Modal/ModalError'
import Success from '../../../../components/Modals/Success'
import PrincipalCard from '../../../../components/Card/PrincipalCard'
import PrincipalContainerForm from '../../../../components/Form/PrincipalContainerForm'
import FormGrid from '../../../../components/Form/FormGrid'
import ColumnComp from '../../../../components/Form/ColumnComp'
import SelectComp from '../../../../components/Select/SelectComp'
import { centro_de_beneficio, columnas_ncd_anula_documento, columnas_ncd_corrige_montos, tipo_de_nota_de_credito, tipo_de_nota_de_debito, tipos_de_documento_de_venta } from '../../../../utils/data/Data'
import FieldComp from '../../../../components/Form/FieldComp'
import InputBasic from '../../../../components/Form/InputBasic'
import { DatePicker, Table } from 'antd'
import RenderDestinatarioModal from '../../../../components/Form/RenderDestinatarioModal'
import DestinatarioItem from '../../../../components/Form/DestinatarioItem'
import { AppContext } from '../../../../context/AppContext'
import { options_condicion_de_pago } from '../../../../utils/data/CondicionDePago'
import BtnsFooterContainer from '../../../../components/Form/BtnsFooterContainer'
import FollowingBtn from '../../../../components/Buttons/FollowingBtn'
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn'
import { restructuredFV, restructuredFVE, restructuredNC, restructuredND } from '../../../../utils/controllers/Ventas/VentasControllers'
import axios from 'axios'

const FirstStep = ({setStep ,tipoDeDocumento,setTipoDeDocumento,dataFactura,setDataFactura,dataFacturaInitialState,tipoDeNota,setTipoDeNota, date,setDate, dataNotaCD,setDataNotaCD, selectedCliente,setSelectedCliente, selectedVendedor,setSelectedVendedor, condicionDePago,setCondicionDePago, dataNotaCDInitialState, centroDeBeneficio,setCentroDeBeneficio, setReferenciasNCD}) =>{

  const { clientes,subusuarios } = useContext(AppContext);
  const [ clienteModal,setClienteModal ] = useState(false)
  const [ vendedorModal,setVendedorModal ] = useState(false)

  const selectTipoDeDocumento = (value,record) =>{
    setTipoDeDocumento(value)
    setDataFactura(dataFacturaInitialState)
    setDataNotaCD(dataNotaCDInitialState)
    setTipoDeNota(null)
    setDate(null)
    setSelectedCliente(null)
    setSelectedVendedor(null)
    setCondicionDePago(null)
    setCentroDeBeneficio(null)
    setReferenciasNCD([])
  }

  const selectTipoDeNota = (value,record) =>{
    setReferenciasNCD([])
    setTipoDeNota(value)
  }

  function clientesRestructured (arrayClientes) {
    const updateData = arrayClientes.map((item)=>{
      return {
        ...item, value: item.cliente.id, label: item.cliente.razon_social
      }
    })
    return updateData
  }

  function vendedoresRestructured(subusuarios) {
    const vendedores = subusuarios.map((item)=>{
      return {
        ...item, value: item.id, label: item.nombre
      }
    })
    return vendedores
  }

  function HandleClick(){
    tipoDeDocumento === 3 || tipoDeDocumento === 4 ? ( tipoDeNota ? setStep(3) : alert('debes rellenar el tipo de nota') ) : setStep(2)
  }

  return (
    <>
    <PrincipalContainerForm>
      <h2 style={{fontSize:20}}>Información de documento</h2>
      <FormGrid>
        {/*Tipo de documento*/}
        <ColumnComp>
          <FieldComp text={'Tipo de documento'} required={true}/>
          <SelectComp
            placeholder={'Seleccionar el tipo de documento'}
            value={tipoDeDocumento}
            options={tipos_de_documento_de_venta}
            HandleChange={selectTipoDeDocumento}
          />
        </ColumnComp>
        {
          tipoDeDocumento === 1 || tipoDeDocumento === 2?
          <>
            {/*FORMULARIO FACTURA Y FACTURA DE VENTA EXENTA*/}
            {/*Nmro de documento*/}
            <ColumnComp>
              <FieldComp text={'N° de documento'}/>
              <InputBasic
                placeholder={'Ingrese el número del documento'} 
                value={dataFactura.numero_documento}
                HandleChange={(e)=>{setDataFactura({...dataFactura,numero_documento: e.target.value})}}
              />
            </ColumnComp>
            <ColumnComp>
              <FieldComp text={'Fecha'} required={true}/>
              <DatePicker picker='date' value={date} 
                onChange={(date,dateString)=>{
                  setDate(date)
                  setDataFactura({...dataFactura,fecha:dateString+'T00:00:00.000Z'})
                }}
              />
            </ColumnComp>
            <DestinatarioItem
              setClienteModal={setClienteModal}
              clientesRestructured={clientesRestructured(clientes)}
              selectedCliente={selectedCliente}
              setSelectedCliente={setSelectedCliente}
            />
            <ColumnComp>
              <FieldComp text={'Vendedor'} required={true}/>
              <SelectComp
                placeholder={'Seleccionar vendedor'}
                value={selectedVendedor}
                options={vendedoresRestructured(subusuarios)}
                HandleChange={(value,record)=>{
                  setSelectedVendedor(record)
                }}
              
              />
            </ColumnComp>
            <ColumnComp>
              <FieldComp text={'Condición de pago'}/>
              <SelectComp
                placeholder={'Seleccionar condición de pago'}
                options={options_condicion_de_pago}
                value={condicionDePago}
                HandleChange={(value,record)=>{
                  setCondicionDePago(record)
                }}
              />
            </ColumnComp>
            <ColumnComp>
              <FieldComp text={'Centro de beneficio'}/>
              <SelectComp
                placeholder={'Seleccionar el centro de beneficio'} 
                options={centro_de_beneficio}
                value={centroDeBeneficio}
                HandleChange={(value,record)=>{
                  setCentroDeBeneficio(record)
                }}
              />
            </ColumnComp>
          </>
          :
          <>
            {/*FORMULARIO NOTA DE CREDITO O DEBITO*/}
            {/*Tipo de nota*/}
            <ColumnComp>
              <FieldComp text={'Tipo de nota'}/>
              <SelectComp
                placeholder={'Seleccionar el tipo de nota'}
                options={ tipoDeDocumento == 3 ? tipo_de_nota_de_credito : tipo_de_nota_de_debito}
                value={tipoDeNota}
                HandleChange={selectTipoDeNota}
              />
            </ColumnComp>
            <ColumnComp>
              <FieldComp text={'Motivo de referencia'}/>
              <InputBasic 
                placeholder={'Infese el motivo del documento'}
                value={dataNotaCD.motivo}
                HandleChange={(e)=>{setDataNotaCD({...dataNotaCD,numero_documento: e.target.value})}}
              />
            </ColumnComp>
            <ColumnComp>
              <FieldComp text={'Fecha'} required={true}/>
              <DatePicker picker='date' value={date} 
                onChange={(date,dateString)=>{
                  setDate(date)
                  setDataNotaCD({...dataNotaCD,fecha:dateString+'T00:00:00.000Z'})
                }}
              />
            </ColumnComp>
            <ColumnComp>
              <FieldComp text={'Centro de beneficio'}/>
              <SelectComp
                placeholder={'Seleccionar el centro de beneficio'} 
                options={centro_de_beneficio}
                value={centroDeBeneficio}
                HandleChange={(value,record)=>{
                  setCentroDeBeneficio(record)
                }}
              />
            </ColumnComp>
            <ColumnComp>
              <FieldComp text={'Vendedor'} required={true}/>
              <SelectComp
                placeholder={'Seleccionar vendedor'}
                value={selectedVendedor}
                options={vendedoresRestructured(subusuarios)}
                HandleChange={(value,record)=>{
                  setSelectedVendedor(record)
                }}
              
              />
            </ColumnComp>
            
          </>
        }
      </FormGrid>
    </PrincipalContainerForm>
    <BtnsFooterContainer>
      <div></div>
      <FollowingBtn 
        handleClick={HandleClick}
        //setStep={setStep} 
        value={2}
      />
    </BtnsFooterContainer>
    <RenderDestinatarioModal
      clienteModal={clienteModal}
      setClienteModal={setClienteModal}
    />
    </>
  )
}

{/*para facturas*/}
const SecondStep = () =>{
  return (
    <>
    <PrincipalContainerForm>

    </PrincipalContainerForm>

    </>
  )
}

{/*para notas*/}
const ThirdStep = ({tipoDeNota,referenciasNCD,setReferenciasNCD,setStep }) =>{

  const { ventas } = useContext(AppContext);

  const [ tipoDeDocumentoNCD,setTipoDeDocumentoNCD ] = useState(null)
  const [ documentList, setDocumentList ] = useState([])
  const [ selectedDocument,setSelectedDocument ] = useState(null)

  useEffect(() => {
    //console.log(tipoDeNota)
    //console.log(ventas)
  }, [])


  const HandleChangeDocumentType = (value,record) => {
    setTipoDeDocumentoNCD(value);
    setSelectedDocument(null);
    setReferenciasNCD([]);
    switch (value) {
      case 1:
        
        return setDocumentList(restructuredFV(ventas.factura_venta))
      case 2:
        return setDocumentList(restructuredFVE(ventas.factura_venta_excenta))            
      case 3:
        const notasCredito = ventas.notas.filter((item)=>item.tipo_credito === 1)
        return setDocumentList(restructuredNC(notasCredito))
      case 4:
        const notasDebito = ventas.notas.filter((item)=>item.tipo_debito === 1)
        return setDocumentList(restructuredND(notasDebito))
    }
  }

  const AddItem = () => {
    selectedDocument ? setReferenciasNCD([...referenciasNCD,selectedDocument]) : alert('debes seleccionar algo')
  }

  function goBack (){
    setStep(1)
  }


  function itemsAnulaDoc () {

  }

  function itemsCorrigeMontos (arrayDocuments) {
    let items = [];
    arrayDocuments.forEach(element => {
      let productos = element.productos_servicios.productos;
      items = [...items, ...productos]
    });
    return items
  }
  
  return(
    <>
    <PrincipalContainerForm>
      <div className='row-space-btw'>
        <h2 style={{fontSize:20}}>Documentos relacionados</h2>
        <AddMoreBtn 
          label={'Nueva referencia'} 
          HanldeClick={AddItem}
        />
      </div>
      {
        tipoDeNota === 1 ?
        <div>Anula documento</div>
        :
        <div>Corrige montos</div>
      }
      {
        referenciasNCD.length == 0 ?
        <div>No hay nada</div>
        :
        <Table
        
          dataSource={ tipoDeNota === 1 ? referenciasNCD : itemsCorrigeMontos(referenciasNCD)}
          columns={tipoDeNota === 1 ? columnas_ncd_anula_documento() : columnas_ncd_corrige_montos() }
        />
      }
      <FormGrid>
        <ColumnComp>
          <FieldComp text={'Tipo de documento'} required={true}/>
          <SelectComp
            placeholder={'Seleccionar el tipo de documento'}
            value={tipoDeDocumentoNCD}
            options={tipos_de_documento_de_venta}
            HandleChange={HandleChangeDocumentType}
          />
        </ColumnComp>
        <ColumnComp>
          <FieldComp text={'Documento'} required={true}/>
          {
            documentList.length === 0 ?
            <div style={{border:"1px solid #b9b9b9c4",color:"#b9b9b9c4",boxSizing:"border-box",padding:"8px 10px", borderRadius:5}}>
              <span>Debe seleccionar el tipo de documento</span>
            </div>
            :
            <SelectComp 
              placeholder={'Seleccionar documento'}
              options={documentList}
              value={selectedDocument ? selectedDocument.value : null}
              HandleChange={(value,record)=>{
                console.log(record)
                setSelectedDocument(record)
              }}
            />
          }
        </ColumnComp>
      </FormGrid>
    </PrincipalContainerForm>
    <button onClick={goBack}>Atras</button>
    </>
  )
}

const NuevoDcVentaTst = () => {
  const navigate = useNavigate();
  const [ loadingScreen,setLoadingScreen ] = useState(false);
  const [ errorScreen,setErrorScreen ] = useState(false);
  const [ step,setStep ] = useState(1);
  const [ tipoDeDocumento,setTipoDeDocumento ] = useState(1)
  const [ date,setDate ] = useState(null)

  const dataFacturaInitialState = {
    numero_documento:null,
    fecha: null 
  }
  const [ dataFactura,setDataFactura ] = useState(dataFacturaInitialState)

  const [ tipoDeNota,setTipoDeNota ] = useState(null)

  const dataNotaCDInitialState = {
    motivo: null,
    fecha: null
  }

  const [ dataNotaCD,setDataNotaCD ] = useState(dataNotaCDInitialState)


  const [ selectedCliente,setSelectedCliente ] = useState(null)

  const [ selectedVendedor,setSelectedVendedor ] = useState(null)

  const [ condicionDePago,setCondicionDePago ] = useState(null)

  const [ centroDeBeneficio,setCentroDeBeneficio ] = useState(null)


  const [ referenciasNCD,setReferenciasNCD ] = useState([])



  function formSetupSteps () {
    switch (step) {
      case 1:
        return <FirstStep
        setStep={setStep}
        tipoDeDocumento={tipoDeDocumento}
        setTipoDeDocumento={setTipoDeDocumento}
        dataFactura={dataFactura}
        setDataFactura={setDataFactura}
        dataFacturaInitialState={dataFacturaInitialState}
        tipoDeNota={tipoDeNota}
        setTipoDeNota={setTipoDeNota}
        date={date}
        setDate={setDate}
        dataNotaCDInitialState={dataNotaCDInitialState}
        dataNotaCD={dataNotaCD}
        setDataNotaCD={setDataNotaCD}
        selectedCliente={selectedCliente}
        setSelectedCliente={setSelectedCliente}
        selectedVendedor={selectedVendedor}
        setSelectedVendedor={setSelectedVendedor}
        condicionDePago={condicionDePago}
        setCondicionDePago={setCondicionDePago}
        centroDeBeneficio={centroDeBeneficio}
        setCentroDeBeneficio={setCentroDeBeneficio}
        setReferenciasNCD={setReferenciasNCD}
        />
      case 2:
        return <SecondStep/>
      case 3:
        return <ThirdStep
          setStep={setStep}
          tipoDeNota={tipoDeNota}
          referenciasNCD={referenciasNCD}
          setReferenciasNCD={setReferenciasNCD}
        />
    }
  }

  return (
    <>
      <div className='row' onClick={()=>{navigate('/purchases')}} style={{fontSize:13,gap:5,color:"grey",cursor:"pointer"}}>
        <FaArrowLeftLong/>
        <span>Volver a  ventas</span>
      </div>
      <h1>Agregar documento de venta</h1>
      {
        loadingScreen === true ?
        <Loader label={'Creando documento de venta'} />
        :
        <>
          {
            errorScreen === true ?
            <ModalError
              onCancel={()=>{console.log('cancelar')}}
              onRetry={()=>{console.log('volver a intentar')}}
            />
            :
            <>
            {
              step === 4 ?
              <Success message={'Documento de venta creado con éxito!'}/>
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

export default NuevoDcVentaTst