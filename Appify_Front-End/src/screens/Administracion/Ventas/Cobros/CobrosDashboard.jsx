import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../../../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { updateCobrosDash } from '../../../../utils/helpers';
import SearchBtn from '../../../../components/Buttons/SearchBtn';
import { Button, ConfigProvider, DatePicker, Table, Tooltip, Select } from 'antd';
import { IoFolder } from 'react-icons/io5';
import AddMoreBtn from '../../../../components/Buttons/AddMoreBtn';
import { MdAttachMoney } from 'react-icons/md';
import Filter from '../../../../components/Filter/Filter';
import SelectComp from '../../../../components/Select/SelectComp';
import { TableReusable } from '../../../../components/Table/TableReusable';
const { Option } = Select;

const CobrosDashboard = () => {
  const { setMenuOptions } = useContext(AppContext);
  const navigate = useNavigate();


  useEffect(() => {
    const updateData = updateCobrosDash()
    setMenuOptions(updateData)
  }, [])
  


  function newDispachDocument (){
    navigate('/dispach_documents/new')

  }


  return (
    <>
      <div className='principal-container-column'>

        <div className='row-space-btw'>
          <h1>Cobros</h1>
          <div className='row'>
            <SearchBtn/>
            {/**Nuevo componente */}
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `#00B69B`,
                    colorPrimaryHover: `#00B69B`,
                    colorPrimaryActive: `#00B69B`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button onClick={()=>{}} type="primary" size="large" style={{display:"flex",alignItems:"center",gap:15}}>
                <MdAttachMoney style={{color:"#fffff"}}/>
                <span>Transacción masiva</span>
              </Button>
            </ConfigProvider>
            {/*-------------------*/}
            <AddMoreBtn label={'Agregar'} HanldeClick={()=>{navigate('/sale_payment/new')}}/>
          </div>
        </div>
        
        <Filter>
            <div className='filter-menu-item'>
              <SelectComp
                placeholder={'Pendiente'}
                options={[
                  {
                    value: 'Aprobado',
                    label: 'Aprobado',
                  },
                  {
                    value: 'Pendiente',
                    label: 'Pendiente',
                  },
                  {
                    value: 'En proceso',
                    label: 'En proceso',
                  },
                ]}
              />
            </div>
            <div className='filter-menu-item'>
              <SelectComp
                placeholder={'Tipo'}
                options={[
                  {
                    value: 'Aprobado',
                    label: 'Aprobado',
                  },
                  {
                    value: 'Pendiente',
                    label: 'Pendiente',
                  },
                  {
                    value: 'En proceso',
                    label: 'En proceso',
                  },
                ]}
              />
            </div>
            <div className='filter-menu-item'>
              <DatePicker picker='week'/>
            </div>
            <div className='filter-menu-item'>
              <SelectComp
                placeholder={'Ver cobros'}
                options={[
                  {
                    value: 'Aprobado',
                    label: 'Aprobado',
                  },
                  {
                    value: 'Pendiente',
                    label: 'Pendiente',
                  },
                  {
                    value: 'En proceso',
                    label: 'En proceso',
                  },
                ]}
              />
            </div>
        </Filter>
        
        <TableReusable
          dataSource={
            [ 
              {
                key:1,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
                mensaje:true,
              },
              {
                key:2,
                id: 2297,
                proveedor: 'Proveedor',
                cliente:'Cliente 1',
                vencimiento:'15/04',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
                montoPendiente: 400,
                mensaje:false,
                
              },
              {
                key:3,
                id: 2297,
                proveedor: 'Proveedor',
                date:'26/03',
                documento: 'N° doc',
                neto: 233,
                bruto: 200,
              },
            ]
          }
          columns={
            [
              {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: 'Cliente',
                dataIndex: 'cliente',
                key: 'cliente',
              },
              {
                title: 'Vencimiento',
                dataIndex: 'vencimiento',
                key: 'vencimiento',
              },
              {
                title: 'Condición',
                dataIndex: 'condicion',
                key: 'condicion',
                render: () => (
                  <Select
                    defaultValue="15 días"
                    style={{ width: 120 }}
                    onChange={(value) => console.log(`Seleccionado: ${value}`)}
                  >
                    <Option value="15">15 días</Option>
                    <Option value="20">20 días</Option>
                    {/* ... otras opciones */}
                  </Select>
                ),
              },
              {
                title: 'Mensaje',
                dataIndex: 'mensaje',
                key: 'mensaje',
                render: (mensaje) => (
                  mensaje ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <g clipPath="url(#clip0_375_3260)">
                        <path d="M17.9655 4.15625L11.652 10.4698C10.948 11.1719 9.99431 11.5663 9 11.5663C8.00569 11.5663 7.05197 11.1719 6.348 10.4698L0.0345 4.15625C0.024 4.27475 0 4.382 0 4.49975V13.4998C0.00119089 14.4939 0.396661 15.4471 1.09966 16.1501C1.80267 16.8531 2.7558 17.2486 3.75 17.2498H14.25C15.2442 17.2486 16.1973 16.8531 16.9003 16.1501C17.6033 15.4471 17.9988 14.4939 18 13.4998V4.49975C18 4.382 17.976 4.27475 17.9655 4.15625Z" fill="#006F76"/>
                        <path d="M10.5916 9.4095L17.4421 2.55825C17.1103 2.00799 16.6422 1.55253 16.0831 1.2358C15.524 0.919067 14.8927 0.751755 14.2501 0.75H3.75011C3.10752 0.751755 2.47623 0.919067 1.91713 1.2358C1.35802 1.55253 0.889964 2.00799 0.558105 2.55825L7.40861 9.4095C7.83129 9.83048 8.40355 10.0669 9.00011 10.0669C9.59667 10.0669 10.1689 9.83048 10.5916 9.4095Z" fill="#006F76"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_375_3260">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M7.4085 10.9095L0.558 4.05825C0.889859 3.50799 1.35791 3.05253 1.91702 2.7358C2.47613 2.41907 3.10742 2.25176 3.75 2.25H9.2205C8.83112 3.58014 8.9806 5.01007 9.63664 6.23094C10.2927 7.4518 11.4026 8.36561 12.7267 8.775L10.5915 10.911C10.1686 11.3318 9.59625 11.5679 8.99969 11.5676C8.40313 11.5673 7.83098 11.3307 7.4085 10.9095ZM11.652 11.97C10.9479 12.672 9.99425 13.0662 9 13.0662C8.00575 13.0662 7.05207 12.672 6.348 11.97L0.0345 5.6565C0.024 5.775 0 5.88225 0 6V14.25C0.00119089 15.2442 0.396661 16.1973 1.09966 16.9003C1.80267 17.6033 2.7558 17.9988 3.75 18H14.25C15.2442 17.9988 16.1973 17.6033 16.9003 16.9003C17.6033 16.1973 17.9988 15.2442 18 14.25V7.4205C17.1083 8.33277 15.9138 8.88759 14.6415 8.9805L11.652 11.97ZM11.25 4.5H13.5V6.75C13.5 6.94891 13.579 7.13968 13.7197 7.28033C13.8603 7.42098 14.0511 7.5 14.25 7.5C14.4489 7.5 14.6397 7.42098 14.7803 7.28033C14.921 7.13968 15 6.94891 15 6.75V4.5H17.25C17.4489 4.5 17.6397 4.42098 17.7803 4.28033C17.921 4.13968 18 3.94891 18 3.75C18 3.55109 17.921 3.36032 17.7803 3.21967C17.6397 3.07902 17.4489 3 17.25 3H15V0.75C15 0.551088 14.921 0.360322 14.7803 0.21967C14.6397 0.0790176 14.4489 0 14.25 0C14.0511 0 13.8603 0.0790176 13.7197 0.21967C13.579 0.360322 13.5 0.551088 13.5 0.75V3H11.25C11.0511 3 10.8603 3.07902 10.7197 3.21967C10.579 3.36032 10.5 3.55109 10.5 3.75C10.5 3.94891 10.579 4.13968 10.7197 4.28033C10.8603 4.42098 11.0511 4.5 11.25 4.5Z" fill="#979797"/>
                    </svg>
                ),
            
              },
              {
                title: 'Bruto',
                dataIndex: 'bruto',
                key: 'bruto',
              },
              {
                title: 'Monto pendiente',
                dataIndex: 'montoPendiente',
                key: 'montoPendiente',
              },
              {
                title: 'Pago',
                dataIndex: 'pago',
                key: 'pago',
                render: () => (
                  <>
                  <Tooltip title='Agregar pago'>
                  <div onClick={() => console.log('Agregar pago')}>
                  <svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_375_3395)">
                    <path d="M15.1316 14.1667C14.5554 14.1661 14.003 13.937 13.5955 13.5295C13.1881 13.1221 12.959 12.5697 12.9584 11.9935C12.9584 11.8056 12.8838 11.6255 12.7509 11.4926C12.6181 11.3598 12.4379 11.2852 12.2501 11.2852C12.0622 11.2852 11.8821 11.3598 11.7492 11.4926C11.6164 11.6255 11.5417 11.8056 11.5417 11.9935V12.0417C11.5417 12.0551 11.5417 12.0672 11.5417 12.0806C11.5654 13.0172 11.9539 13.9076 12.6245 14.5619C13.2951 15.2162 14.1947 15.5827 15.1316 15.5833H15.7917V16.2917C15.7917 16.4795 15.8664 16.6597 15.9992 16.7925C16.1321 16.9254 16.3122 17 16.5001 17C16.6879 17 16.8681 16.9254 17.0009 16.7925C17.1338 16.6597 17.2084 16.4795 17.2084 16.2917V15.5833H17.8686C18.7205 15.5824 19.5443 15.2786 20.1928 14.7261C20.8412 14.1737 21.2721 13.4086 21.4084 12.5677C21.5446 11.7267 21.3774 10.8647 20.9365 10.1358C20.4957 9.40682 19.8099 8.8584 19.0019 8.58854L17.2084 7.99V2.83333H17.8686C18.4448 2.8339 18.9972 3.06303 19.4046 3.47046C19.812 3.87789 20.0412 4.43031 20.0417 5.0065C20.0417 5.19436 20.1164 5.37453 20.2492 5.50737C20.3821 5.64021 20.5622 5.71483 20.7501 5.71483C20.9379 5.71483 21.1181 5.64021 21.2509 5.50737C21.3838 5.37453 21.4584 5.19436 21.4584 5.0065V4.95833C21.4584 4.94487 21.4584 4.93283 21.4584 4.91937C21.4348 3.98277 21.0463 3.09243 20.3757 2.43812C19.7051 1.78382 18.8055 1.41729 17.8686 1.41667H17.2084V0.708333C17.2084 0.520472 17.1338 0.340304 17.0009 0.207466C16.8681 0.0746278 16.6879 0 16.5001 0C16.3122 0 16.1321 0.0746278 15.9992 0.207466C15.8664 0.340304 15.7917 0.520472 15.7917 0.708333V1.41667H15.1316C14.2797 1.41758 13.4559 1.72142 12.8074 2.27388C12.1589 2.82634 11.728 3.59141 11.5918 4.43234C11.4555 5.27327 11.6228 6.13526 12.0636 6.86422C12.5045 7.59318 13.1902 8.1416 13.9982 8.41146L15.7917 9.01V14.1667H15.1316ZM17.2084 9.48246L18.5542 9.93154C19.0439 10.0945 19.4596 10.4264 19.7269 10.8678C19.9942 11.3093 20.0957 11.8314 20.0132 12.3408C19.9307 12.8502 19.6697 13.3137 19.2767 13.6482C18.8838 13.9827 18.3846 14.1665 17.8686 14.1667H17.2084V9.48246ZM14.4459 7.06846C13.9563 6.90549 13.5406 6.5736 13.2733 6.13217C13.006 5.69075 12.9045 5.1686 12.987 4.65919C13.0694 4.14977 13.3305 3.68632 13.7234 3.35179C14.1164 3.01726 14.6155 2.83348 15.1316 2.83333H15.7917V7.51754L14.4459 7.06846Z" fill="#979797"/>
                    </g>
                    <path d="M8.5 8.17667H6.5V6.29432C6.5 6.16951 6.44732 6.04982 6.35355 5.96156C6.25979 5.87331 6.13261 5.82373 6 5.82373C5.86739 5.82373 5.74021 5.87331 5.64645 5.96156C5.55268 6.04982 5.5 6.16951 5.5 6.29432V8.17667H3.5C3.36739 8.17667 3.24021 8.22625 3.14645 8.3145C3.05268 8.40276 3 8.52245 3 8.64726C3 8.77207 3.05268 8.89176 3.14645 8.98002C3.24021 9.06827 3.36739 9.11785 3.5 9.11785H5.5V11.0002C5.5 11.125 5.55268 11.2447 5.64645 11.333C5.74021 11.4212 5.86739 11.4708 6 11.4708C6.13261 11.4708 6.25979 11.4212 6.35355 11.333C6.44732 11.2447 6.5 11.125 6.5 11.0002V9.11785H8.5C8.63261 9.11785 8.75979 9.06827 8.85355 8.98002C8.94732 8.89176 9 8.77207 9 8.64726C9 8.52245 8.94732 8.40276 8.85355 8.3145C8.75979 8.22625 8.63261 8.17667 8.5 8.17667Z" fill="#979797"/>
                    <defs>
                    <clipPath id="clip0_375_3395">
                    <rect width="17" height="17" fill="white" transform="translate(8)"/>
                    </clipPath>
                    </defs>
                    </svg>
                  </div>
                  </Tooltip>
                  </>
                )
              },
            ]
          }
        />
      </div>
    </>
  )
}

export default CobrosDashboard