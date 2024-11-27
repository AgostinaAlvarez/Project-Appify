import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
// Función para aplicar estilos a la hoja de cálculo
const applyStyles = (workbook, sheet) => {
  // Aplicar bordes a todas las celdas
  sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  });

  // Estilo para los encabezados de las columnas
  sheet.getRow(1).eachCell((cell, colNumber) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCCCCC' }, // Fondo gris
    };
    cell.font = {
      bold: true,
    };
  });
};
const exportToExcel = (data, fileName, columns) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(`${fileName}`);

  sheet.columns = columns;

  data.forEach(item=>{
    const row = sheet.addRow(item);
    if(item.estado) {
      const estadoCell = row.getCell('estado');
        if (item.estado === 'Aceptado') {
          estadoCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC6EFCE' } }; // Verde
        } else if (item.estado === 'En proceso') {
          estadoCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEB9C' } }; // Amarillo
        } else {
          estadoCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC7CE' } }; // Rojo
        }
    }
  })
  applyStyles(workbook, sheet);
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer]), `${fileName}.xlsx`);
  });

};

export default exportToExcel;
