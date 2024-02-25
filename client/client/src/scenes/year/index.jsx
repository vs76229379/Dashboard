import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useGetYearQuery } from "state/api";


const Year = () => {
  const chartRef = useRef(null);
  const { data, isLoading } = useGetYearQuery();

  useEffect(() => {
    if (
      chartRef &&
      chartRef.current &&
      Array.isArray(data) &&
      data.length > 0
    ) {
      const filteredData = data.filter(
        (item) =>
          item.start_year.some((year) => year !== null) &&
          item.end_year.some((year) => year !== null)
      );

      const labels = filteredData.map((item) => item.topic || "");
      const startYears = filteredData.map((item) =>
        Math.min(
          ...item.start_year
            .filter((date) => date !== null)
            .map((date) => new Date(date).getFullYear())
        )
      );
      const endYears = filteredData.map((item) =>
        Math.max(
          ...item.end_year
            .filter((date) => date !== null)
            .map((date) => new Date(date).getFullYear())
        )
      );

      const canvasElement = chartRef.current;
      canvasElement.style.width = "2000px";
      canvasElement.style.height = "100%";

      const chartInstance = new Chart(canvasElement, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Start Year",
              data: startYears,
              backgroundColor: "rgba(75, 192, 192, 1)",
            },
            {
              label: "End Year",
              data: endYears,
              backgroundColor: "rgba(255, 99, 132, 1)",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Start and End Years",
            },
            tooltip: {
              mode: "index",
              intersect: false,
              callbacks: {
                label: function (context) {
                  var label = context.dataset.label || "";

                  if (label) {
                    label += ": ";
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat("en-US", {
                      maximumFractionDigits: 2,
                    }).format(context.parsed.y);
                  }
                  return label;
                },
              },
            },
          },
          interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
          },
          stacked: true,
        },
      });

      return () => chartInstance.destroy();
    }
  }, [chartRef, data]);

  if (isLoading) {
    return <p>Loading...</p>; // or render a loading spinner
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={chartRef} />
      
    </div>
  );
};

export default Year;
