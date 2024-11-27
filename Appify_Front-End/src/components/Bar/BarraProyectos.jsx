import React from 'react';
const GraficoBarra = ({ aceptado, enProceso, pendiente }) => {
  const total = aceptado + enProceso + pendiente;
  const porcentajeAceptado = Math.round((aceptado / total) * 100);
  const porcentajeEnProceso = Math.round((enProceso / total) * 100);
  const porcentajePendiente = Math.round((pendiente / total) * 100);

  return (
    <div className="containerBarraProyectos">
      <div className="labelsBProyectos">
        <h3 className='titleFacturado'>Aceptado (<span className="facturadoPorcent">{porcentajeAceptado}%</span>)</h3>
        <h3 className='titleProduccion'>En proceso (<span className="produccionPorcent">{porcentajeEnProceso}%</span>)</h3>
        <h3 className='titleNoFacturado'>Pendiente (<span className="noFacturadoPorcent">{porcentajePendiente}%</span>)</h3>
      </div>
      <div className="barBProyectos">
        <div style={{ width: `${porcentajeAceptado}%` }} className="barSection facturado"></div>
        <div style={{ width: `${porcentajeEnProceso}%` }} className="barSection produccion"></div>
        <div style={{ width: `${porcentajePendiente}%` }} className="barSection noFacturado"></div>
      </div>
    </div>
  );
};

export default GraficoBarra;
