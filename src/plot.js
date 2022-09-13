const plot = (equation, interval, n) => {
  const canvas = document.getElementById("graph-line");
  const chartStatus = Chart.getChart("graph-line");
  if (chartStatus != undefined) chartStatus.destroy();

  const canvas2 = document.getElementById("graph-bar");
  const chartStatus2 = Chart.getChart("graph-bar");
  if (chartStatus2 != undefined) chartStatus2.destroy();

  const eqParsed = math.parse(equation);
  const eq = (x) => eqParsed.evaluate({ x });

  const labels = Array.from({ length: interval[1] - interval[0] + 1 }, (_, i) => i + interval[0]);

  const values = labels.map((x) => eq(x));
  const minorThanZero = values.some((x) => x < 0);

  const data = {
    labels: labels,
    datasets: [
      {
        label: `f(x) = ${equation}`,
        borderColor: "rgba(75, 192, 192, 1)",
        data: values,
        fill: false,
        yAxisID: "y",
        xAxisID: "x",
        type: "line",
      },
    ],
  };

  const fitBars = {
    id: "fitBars",
    afterDatasetsDraw: (chart) => {
      const { ctx, data } = chart;
      ctx.save();

      const datasetMeta = chart.getDatasetMeta(0);
      const chartWidth = datasetMeta.xScale.right - datasetMeta.xScale.paddingLeft;
      const chartHeight = datasetMeta.yScale.bottom - datasetMeta.yScale.paddingTop;

      canvas2.style.width = `${chartWidth}px`;
      canvas2.style.height = `${chartHeight}px`;
      canvas2.style.opacity = 1;
    },
  };

  const graph = new Chart(canvas, {
    type: "line",
    data: data,
    options: {
      elements: {
        line: {
          tension: 0.3,
        },
      },
      scales: {
        x: {
          display: true,
          beginAtZero: true,
          ticks: {
            beginAtZero: true,
          },
          position: !minorThanZero
            ? "bottom"
            : {
                y: 0,
              },
        },
        y: {
          display: true,
          beginAtZero: true,
          ticks: {
            beginAtZero: true,
          },
          position:
            interval[0] > 0
              ? "left"
              : interval[1] < 0
              ? "right"
              : {
                  x: interval[0] * -1,
                },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
    plugins: [fitBars],
  });

  const labels2 = Array.from({ length: n }, (_, i) => i);
  const values2 = labels2.map((x) => {
    const distance = interval[1] - interval[0];
    const width = distance / n;
    const value = labels[0] + width * (x + 1);
    console.log(value, eq(value));
    return eq(value);
  });

  const data2 = {
    labels: labels2,
    datasets: [
      {
        borderColor: "rgba(75, 192, 192, 1)",
        data: values2,
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
    ],
  };

  const graph2 = new Chart(canvas2, {
    type: "bar",
    data: data2,
    options: {
      scales: {
        x: {
          display: false,
          grid: {
            display: false,
          },
        },

        y: {
          display: false,
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
};

export default plot;
