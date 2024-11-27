export const tipos_de_documento_de_venta = [
    {
      label:'Factura',
      value:1
    },
    {
      label:'Factura exenta',
      value:2
    },
    {
      label:'Nota de credito',
      value:3
    },
    {
      label:'Nota de debito',
      value:4
    },
    
]


export const tipo_de_nota_de_credito = [
    {
      label: 'Anula documento de referencia',
      value:1
    },
    {
      label: 'Corrige montos en documentos de referencia',
      value:2
    },
]

export const tipo_de_nota_de_debito = [
    {
      label: 'Anula documento de referencia',
      value:1
    },
    {
      label: 'Corrige montos en documentos de referencia',
      value:3
    },
]


export const centro_de_beneficio = [
    { label: "Ajustes de centralizacion", value: 1 },
    { label: "Arriendos y leasing", value: 2 },
    { label: "Cargos e interes bancarios", value: 3 },
    { label: "Comidas y entretenimiento", value: 4 },
    { label: "Contratistas", value: 5 },
    { label: "Costo insumos, materiales y productos", value: 6 },
    { label: "Cuentas servicios basicos", value: 7 },
    { label: "Diferencias tipo cambio", value: 8 },
    { label: "Gasto sin documento tributario", value: 9 },
    { label: "Gastos reembolsables", value: 10 },
    { label: "Gastos sin clasificar", value: 11 },
    { label: "Impuestos y patentes", value: 12 },
    { label: "Intereses y gastos financieros", value: 13 },
    { label: "Iva no recuperable", value: 14 },
    { label: "Otros gastos de negocio", value: 15 },
    { label: "Otros gastos misceláneos", value: 16 },
    { label: "Otros ingresos no operacionales", value: 17 },
    { label: "Preguntar a mi contador", value: 18 },
    { label: "Remuneraciones socios", value: 19 },
    { label: "Seguros", value: 20 },
    { label: "Servicios Legales y Profesionales", value: 21 },
    { label: "Sueldos y remuneraciones personal", value: 22 },
    { label: "Suministros de oficina y software", value: 23 },
    { label: "Vehiculos y gastos asociados", value: 24 },
    { label: "Ventas", value: 25 },
    { label: "Ventas sin documentos tributarios", value: 26 },
    { label: "Viajes", value: 27 }
];



export const columnas_ncd_corrige_montos = () =>{
    return ([
      {
        title: 'Producto/Servicio',
        dataIndex: 'nombre',
        key: 'nombre',
      },
      {
        title: 'Cantidad',
        dataIndex: 'cantidad',
        key: 'cantidad',
      },
      {
        title: 'Precio unitario',
        dataIndex: 'unitario',
        key: 'unitario',
        render: (text,record)=>(
          <>
            {
              record.unitario ? record.unitario : record.precio
            }
          </>
        )
      },
        
      {
        title: 'Neto',
        dataIndex: 'neto',
        key: 'neto'
      },
      {
        title: 'Bruto',
        dataIndex: 'bruto',
        key: 'bruto',
      },
      {
        title: '%',
        dataIndex: 'bonificacion',
        key: 'bonificacion',
      },
    ])
} 


export const columnas_ncd_corrige_montos_FVE = () =>{
  return ([
    {
      title: 'Producto/Servicio',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Cantidad',
      dataIndex: 'cantidad',
      key: 'cantidad',
    },
    {
      title: 'Precio unitario',
      dataIndex: 'precio',
      key: 'precio'
    },
      
    {
      title: 'Neto',
      dataIndex: 'neto',
      key: 'neto'
    },
    {
      title: 'Bruto',
      dataIndex: 'bruto',
      key: 'bruto',
    },
    {
      title: '%',
      dataIndex: 'bonificacion',
      key: 'bonificacion',
    },
  ])
}


export const columnas_ncd_anula_documento = () =>{
  return ([
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (text) => text.split("T")[0]
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
    },
    {
      title: 'Bruto',
      dataIndex: 'Bruto',
      key: 'Bruto',
      render: (text) => text.toFixed(2)
    },
    {
      title: 'Neto',
      dataIndex: 'Neto',
      key: 'Neto',
      render: (text) => text.toFixed(2)
    },
    {
      title: 'Total',
      dataIndex: 'Neto',
      key: 'Neto',
      render: (text) => text.toFixed(2)
    },
  ])
} 

