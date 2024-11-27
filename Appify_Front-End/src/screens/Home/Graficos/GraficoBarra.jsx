import React from "react";

const GraficoBarra = () => {
  const facturado = 13;
  const noFacturado = 15;
  const produccion = 15;

  const facturadoNum = parseFloat(facturado);
  const noFacturadoNum = parseFloat(noFacturado);
  const produccionNum = parseFloat(produccion);
  const total = facturadoNum + noFacturadoNum + produccionNum;

  const porcentajeFacturado = Math.round((facturadoNum / total) * 100);
  const porcentajeNoFacturado = Math.round((noFacturadoNum / total) * 100);
  const porcentajeProduccion = Math.round((produccionNum / total) * 100);

  const barStyles = {
    display: "flex",
    height: "30px",
    borderRadius: "15px",
    overflow: "hidden",
  };

  const barSectionStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  };

  return (
    <div style={{ width: "1440px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }} >
        <h3>
          Facturado (
          <span style={{ color: "#2ecc71", fontWeight: "bold" }}>
            {porcentajeFacturado}%
          </span> ) 
        </h3>
        <h3>
          En producción (
          <span style={{ color: "#3498db", fontWeight: "bold" }}>
            {porcentajeProduccion}%
          </span>)
        </h3>
        <h3>
          No facturado (
          <span style={{ color: "#e74c3c", fontWeight: "bold" }}>
            {porcentajeNoFacturado}%
          </span>
          )
        </h3>
      </div>
      <div style={{ ...barStyles }}>
        <div
          style={{
            ...barSectionStyles,
            width: `${porcentajeFacturado}%`,
            backgroundColor: "#2ecc71",
          }}
        ></div>
        <div
          style={{
            ...barSectionStyles,
            width: `${porcentajeProduccion}%`,
            backgroundColor: "#3498db",
          }}
        ></div>
        <div
          style={{
            ...barSectionStyles,
            width: `${porcentajeNoFacturado}%`,
            backgroundColor: "#e74c3c",
          }}
        ></div>
      </div>
    </div>
  );
};

export default GraficoBarra;
