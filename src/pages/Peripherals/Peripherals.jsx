import React from 'react';
import './Peripherals.css';
import { Card, Form, Row } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the necessary components for ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart options
const optionsSlurryComposition = {
  responsive: true,
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      title: {
        display: true,
        text: 'Time'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Percent Composition'
      },
      min: 0,
      max: 100
    }
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Slurry Composition',
      font: {
        size: 24,
        weight: 'normal',
      },
    },
  },
};


// Chart options for the second chart (Sequestration Levels)
const optionsSequestrationLevels = {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Time'
        }
      },
      y1: { // Y-axis for Carbon Dioxide
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Total CO2 Sequestration (Tons)'
        },
        grid: {
          drawOnChartArea: false, // Only draw grid for CO2 on left side
        },
      },
      y2: { // Y-axis for elevation
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Cumulative Elevation (Inches)'
        },
        grid: {
          drawOnChartArea: false, // Only draw grid for elevation on right side
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sequestration & Elevation',
        font: {
          size: 24,
          weight: 'normal',
        },
      },
    },
  };

// Static data for the chart
const dataSlurryComposition = {
  labels: [0, 1, 2], // Representing time in a simple numeric format
  datasets: [
    {
      label: 'Wood Chips',
      data: [30, 35, 33], // Example proportions
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.4
    },
    {
      label: 'Paper Pulp',
      data: [40, 45, 42], // Example proportions
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.4
    },
    {
      label: 'Water',
      data: [30, 20, 25], // Example proportions
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.4
    },
  ],
};

// Static data for the second chart (Sequestration Levels)
const dataSequestrationLevels = {
    labels: [0, 1, 2], // Time in a simple numeric format
    datasets: [
      {
        label: 'Carbon Dioxide',
        data: [100, 200, 300], // Example trend for Carbon Dioxide
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        yAxisID: 'y1', // Associate with the left Y-axis
        tension: 0.4
      },
      {
        label: 'Elevation',
        data: [1, 1.2, 2.3], // Example trend for elevation
        borderColor: 'rgb(0, 0, 255)',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        yAxisID: 'y2', // Associate with the right Y-axis
        tension: 0.4
      },
    ],
  };
  
  const Peripherals = () => {
    return (
        <Card className="card_container">
        <Form className="elevation" id="peripheralsSection">
            <Form.Group as={Row} className="mb-3 form_group_container" controlId="formPlaintextEmail">
            <div className='form_flex_container' style={{ display: 'flex', justifyContent: 'center' }}>
                {/* First chart with right margin */}
                <div className='form_chart_container' style={{ width: '48%', marginRight: '20px' }}>
                    <Line options={optionsSlurryComposition} data={dataSlurryComposition} />
                </div>

                {/* Second chart */}
                <div className='form_chart_container' style={{ width: '48%' }}>
                    <Line options={optionsSequestrationLevels} data={dataSequestrationLevels} />
                </div>
            </div>
            </Form.Group>
        </Form>
        </Card>
    );
}
  
export default Peripherals;
