import { Bar } from "react-chartjs-2";

const Elementobar = () => {
  const optionsBar = {
    responsive: true,

    scales: {
      x: {
        stacked: false,
        grid: {
          display: true,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          display: true,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const optionsBarTwo = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return "$" + value;
          },
        },
      },
    },
  };
  const labelsBar = ["Facturación"];

  const dataBar = {
    labels: labelsBar,
    datasets: [
      {
        label: "Conciliado",
        data: [25],
        backgroundColor: "rgba(0, 182, 155, 1)",
        borderRadius: 20,
        barThickness: 40,
      },
      {
        label: "nulo",
        data: [0],
        backgroundColor: "rgba(0, 182, 155, 1)",
        barThickness: 0,
      },
      {
        label: "Pendiente",
        data: [75], // Añade otro dato aquí para coincidir con 'Día 2'
        backgroundColor: "rgba(253, 115, 16, 1)",
        borderRadius: 20,
        barThickness: 40,
      },
    ],
  };
  const labelsBardTwo = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];

  const dataBarTwo = {
    labels: labelsBardTwo,
    datasets: [
      {
        label: "Ingresos",
        data: [7451698, 2896570, 3158946, 6234540, 4234567, 4654321],
        backgroundColor: "rgba(0, 182, 155, 1)",
        borderRadius: 80,
        barSpacing: 5,
      },
      {
        label: "Egresos",
        data: [5651140, 2654610, 5989801, 4656540, 4987654, 4321798],
        borderRadius: 80,
        barSpacing: 5,
        backgroundColor: "rgba(253, 115, 16, 1)",
      },
    ],
  };

  return (
    <>
      <div style={{ width: "55rem" }}>
        <Bar options={optionsBar} data={dataBar} />
      </div>
      {/* ---------------- */}
      <div style={{ width: "55rem" }}>
        <Bar options={optionsBarTwo} data={dataBarTwo} />
      </div>
    </>
  );
};

export default Elementobar;
