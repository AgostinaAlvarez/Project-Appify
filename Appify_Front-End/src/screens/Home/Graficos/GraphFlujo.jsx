import { Bar } from 'react-chartjs-2';

export const GraficoFlujo = () => {
  const data = {
    labels: ['Diciembre', 'Enero', 'Febrero', 'Marzo'],
    datasets: [
      {
        label: 'Ingresos',
        data: [130000, 98000, 140000, 50000],
        backgroundColor: 'rgba(0, 182, 155, 1)',
        barPercentaje: 0.3,
        categoryPercentage: 0.3,
        borderRadius:100,
      },
      {
        label: 'Egresos',
        data: [98000, 50000, 50000, 140000],
        backgroundColor: 'rgba(253, 115, 16, 1)',
        barPercentaje:  0.3,
        categoryPercentage: 0.3,
        borderRadius:100,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: false,
        text: 'Flujo de caja',
      },
    },
    scales: {
      x: {
        barThickness: 15, // Establece el ancho de la barra en 15px
        grid: {
          display: false, // Desactiva las líneas de fondo en el eje Y
        },
      },
      y: {
        min:0,
        max:150000,
        ticks: {
          stepSize: 50000, 
          callback: (value) => `$${value}`,
        },
        grid: {
          display: false, // Desactiva las líneas de fondo en el eje Y
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};
