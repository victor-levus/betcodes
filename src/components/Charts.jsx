import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Charts = ({ success, inProgress, lost, teamName }) => {
  const ref = useRef();
  useEffect(() => {
    newChart();
  }, [teamName]);

  const data = [
    { label: "Success", value: success, color: "green" },
    { label: "In Progress", value: inProgress, color: "gray" },
    { label: "Lost", value: lost, color: "rgb(239,68,68)" },
  ];

  const newChart = async () => {
    var chartArea = Chart.getChart("myChart");

    if (chartArea) chartArea.destroy();

    if (data)
      new Chart(ref.current, {
        type: "doughnut",
        data: {
          labels: data.map((row, i) => row.label),
          datasets: [
            {
              label: "Total",
              data: data.map((row) => row.value),
              backgroundColor: data.map((row) => row.color),
              borderColor: "none",
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
  };

  return (
    <div>
      {/* <h1>Pie Chart</h1> */}
      <canvas id="myChart" ref={ref}></canvas>
    </div>
  );
};

export default Charts;
