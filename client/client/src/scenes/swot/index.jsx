import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useGetSwotQuery } from 'state/api';


const Swot = (props) => {
  const chartRef = useRef(null);
  const { data, isLoading } = useGetSwotQuery();
  console.log('data', data);

  useEffect(() => {
    if (chartRef && chartRef.current && Array.isArray(data) && data.length > 0) {
      // Define the labels and values for each quadrant of the SWOT matrix
      const strengths = data.filter((item) => item.impact > 0 && item.likelihood > 0);
      const weaknesses = data.filter((item) => item.impact < 0 && item.likelihood > 0);
      const opportunities = data.filter((item) => item.impact > 0 && item.likelihood < 0);
      const threats = data.filter((item) => item.impact < 0 && item.likelihood < 0);

      const strengthLabels = strengths.map((item) => item.title || '');
      const strengthValues = strengths.map((item) => item.intensity || 0);
      const weaknessLabels = weaknesses.map((item) => item.title || '');
      const weaknessValues = weaknesses.map((item) => item.intensity || 0);
      const opportunityLabels = opportunities.map((item) => item.title || '');
      const opportunityValues = opportunities.map((item) => item.intensity || 0);
      const threatLabels = threats.map((item) => item.title || '');
      const threatValues = threats.map((item) => item.intensity || 0);

      // Override canvas styles
      const canvasElement = chartRef.current;
      canvasElement.style.width = '2000px';
      canvasElement.style.height = '100%';

      const chartInstance = new Chart(canvasElement, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Strengths',
              data: strengthValues.map((value, index) => ({
                x: value,
                y: value,
              })),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              pointStyle: 'rect',
            },
            {
              label: 'Weaknesses',
              data: weaknessValues.map((value, index) => ({
                x: -value,
                y: value,
              })),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              pointStyle: 'triangle',
            },
            {
              label: 'Opportunities',
              data: opportunityValues.map((value, index) => ({
                x: value,
                y: -value,
              })),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              pointStyle: 'circle',
            },
            {
              label: 'Threats',
              data: threatValues.map((value, index) => ({
                x: -value,
                y: -value,
              })),
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              pointStyle: 'star',
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              ticks: {
                callback: (value) => Math.abs(value),
              },
              grid: {
                color: 'black',
                lineWidth: 2,
              },
            },
            y: {
              type: 'linear',
              ticks: {
                callback: (value) => Math.abs(value),
              },
              grid: {
                color: 'black',
                lineWidth: 2,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (context) => {
                  const index = context[0].dataIndex;
                  const dataset = context[0].dataset;
                  switch (dataset.label) {
                    case 'Strengths':
                      return strengthLabels[index];
                    case 'Weaknesses':
                      return weaknessLabels[index];
                    case 'Opportunities':
                      return opportunityLabels[index];
                    case 'Threats':
                      return threatLabels[index];
                    default:
                      return '';
                  }
                },
              },
            },
            legend: {
              position: 'right',
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

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={chartRef} />
      
    </div>
  );
};

export default Swot;
