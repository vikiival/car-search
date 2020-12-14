import React from 'react';
import { Chart } from 'react-charts';

const BarChart = ({ data }) => {
  const series = React.useMemo(
    () => ({
      type: 'bar',
    }),
    []
  );

  const items = React.useMemo(
    () => [
      {
        // individual series
        label: 'Purchases',
        // datum array
        data: [
          {
            // individual datum
            primary: 'Apples', // primary value
            secondary: 20, // secondary value
          },
        ],
      },
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { position: 'left', type: 'linear', stacked: false, show: false },
    ],
    []
  );

  return (
    <div
      style={{
        width: '400px',
        height: '300px',
      }}
    >
      <Chart data={items} series={series} axes={axes} tooltip />
    </div>
  );
};

export default BarChart;
