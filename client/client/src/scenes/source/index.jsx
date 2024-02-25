import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useGetSourceQuery } from 'state/api';
import Footer from 'components/Footer';

const Source = () => {
  const chartRef = useRef(null);
  const { data, isLoading } = useGetSourceQuery();
  console.log('data', data);

  useEffect(() => {
    if (chartRef && chartRef.current && Array.isArray(data) && data.length > 0) {
      const labels = data.map(item => item.id || '');
      const values = data.map(item => item.value || 0);

      // Override canvas styles
      const canvasElement = chartRef.current;
      canvasElement.style.width = '6000px';
      canvasElement.style.height = '100%';

      const chartInstance = new Chart(canvasElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Sector Count',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
            x: {
              ticks: {
                maxRotation: 90,
              },
            },
          },
        },
      });

      return () => chartInstance.destroy();
    }
  }, [chartRef, data]);

  if (isLoading) {
    return <p>Loading...</p>; // or render a loading spinner
  }

  return <div style={{ width: '100%', height: '100%' }}><canvas ref={chartRef} style={{ width: '100000px' }} /><Footer /></div>;
};

export default Source;
