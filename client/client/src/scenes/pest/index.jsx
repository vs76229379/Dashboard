import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useGetPestQuery } from 'state/api';
import Footer from 'components/Footer';

const Pest = () => {
  const chartRef = useRef(null);
  const { data, isLoading } = useGetPestQuery();

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      const labels = data.map(item => item.value.sector);

      const likelihoodData = data.map(item => item.likelihood);
      const intensityData = data.map(item => item.intensity);
      const titleData = data.map(item => item.value.title);
      const insightData = data.map(item => item.value.insight);

      const canvasElement = chartRef.current;
      canvasElement.style.width = '100%';
      canvasElement.style.height = '100%';

      const chartInstance = new Chart(canvasElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Likelihood',
              data: likelihoodData,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'Intensity',
              data: intensityData,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  const datasetLabel = context.dataset.label || '';
                  const index = context.dataIndex;
                  const insight = insightData[index];
                  const title = titleData[index];
                  return ` ${datasetLabel}: ${context.parsed.y} - Title: ${title} - Insight: ${insight}`;
                },
              },
            },
          },
        },
      });

      return () => chartInstance.destroy();
    }
  }, [chartRef, data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <div style={{ width: '100%', height: '100%' }}><canvas ref={chartRef} /><Footer /></div>;
};

export default Pest;
