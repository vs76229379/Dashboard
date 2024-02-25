import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useGetRegionQuery } from 'state/api';
import Footer from 'components/Footer';

const Region = () => {
  const chartRef = useRef(null);
  const { data, isLoading } = useGetRegionQuery();
  console.log('data', data);

  useEffect(() => {
    if (chartRef && chartRef.current && Array.isArray(data) && data.length > 0) {
      const labels = data.map(item => item.id || '');
      const values = data.map(item => item.value || 0);

      // Override canvas styles
      const canvasElement = chartRef.current;
      canvasElement.style.width = '100%';
      canvasElement.style.height = '100%';

      // Change the type from 'bubble' to 'radar'
      const chartInstance = new Chart(canvasElement, {
        type: 'radar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Region Count',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          elements: {
            line: {
              // Change the line color to red
              borderColor: 'rgba(255, 0, 0, 1)',
            },
          },
          scales: {
            r: {
              grid: {
                // Change the scale lines color to green
                color: 'rgba(0, 255, 0, 1)',
              },
              angleLines: {
                // Change the angle lines color to blue
                color: 'rgba(0, 0, 255, 1)',
              },
              beginAtZero: true,
            },
          },
          maintainAspectRatio: false,
          responsive: true,
        },
      });

      return () => chartInstance.destroy();
    }
  }, [chartRef, data]);

  if (isLoading) {
    return <p>Loading...</p>; // or render a loading spinner
  }

  return <div style={{ width: '100%', height: '100%' }}><canvas ref={chartRef} /><Footer /></div>;
};

export default Region;
