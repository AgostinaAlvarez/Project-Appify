import React from "react";
import { Table , ConfigProvider} from "antd";
import { useNavigate } from "react-router-dom";

const customTokens = {
    borderRadius:10,
};
const customLocale={
  Pagination: {
    items_per_page: '/ por página',
  }
}


export const TableReusable = ({ dataSource, columns, onRowClick, getRowClickPath}) => {
  const navigate = useNavigate();
  const paginationConfig = {
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30"],
    
  };

  const handleRowClick = (record) => {
    if (onRowClick && getRowClickPath) {
      console.log("Fila seleccionada:", record);
      const path = getRowClickPath(record);  // Obtener la ruta dinámica basada en el registro
      navigate(path);
  }
};

  return (
    <div style={{ marginBottom: 10 }}>
     <ConfigProvider theme={{ token: customTokens }} locale={customLocale}>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={paginationConfig}
        scroll={{ x: 800 }} 
        className="custom-table"
        onRow={onRowClick ? (record) => ({
          onClick: () => handleRowClick(record),
      }) : undefined}
      />
      </ConfigProvider>
    </div>
  );
};

// Si en la tabla no se debe hacer click en una fila para que rediriga el componente debe llamarse asi:
// <TableReusable
//   dataSource={dataSource}
//   columns={columns}
//   onRowClick={false}
//   // No se necesita rowClickPath si onRowClick es false
// />

