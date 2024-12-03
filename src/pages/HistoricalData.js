// src/pages/HistoricalData.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import {
  Container,
  Typography,
  ButtonGroup,
  Button,
  CircularProgress,
} from '@mui/material';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function HistoricalData() {
  const [chartData, setChartData] = useState(null);
  const [timeframe, setTimeframe] = useState('30'); // Default to 30 days
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);

    axios
      .get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
        params: {
          vs_currency: 'usd',
          days: timeframe,
        },
      })
      .then((response) => {
        if (isMounted) {
          const prices = response.data.prices;
          const data = {
            labels: prices.map((entry) => new Date(entry[0])),
            datasets: [
              {
                label: 'Bitcoin Price (USD)',
                data: prices.map((entry) => entry[1]),
                borderColor: '#1976d2',
                backgroundColor: 'rgba(25, 118, 210, 0.2)',
                tension: 0.1,
              },
            ],
          };
          setChartData(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching historical data:', error);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [timeframe]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeframe === '7' ? 'day' : 'month',
          displayFormats: {
            day: 'MMM dd',
            month: 'MMM yyyy',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price in USD',
        },
      },
    },
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Bitcoin Price Over Time
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Explore Bitcoin's historical price trends.
      </Typography>
      <ButtonGroup variant="outlined" sx={{ mb: 4 }}>
        <Button
          variant={timeframe === '7' ? 'contained' : 'outlined'}
          onClick={() => handleTimeframeChange('7')}
        >
          7D
        </Button>
        <Button
          variant={timeframe === '30' ? 'contained' : 'outlined'}
          onClick={() => handleTimeframeChange('30')}
        >
          1M
        </Button>
        <Button
          variant={timeframe === '365' ? 'contained' : 'outlined'}
          onClick={() => handleTimeframeChange('365')}
        >
          1Y
        </Button>
        <Button
          variant={timeframe === 'max' ? 'contained' : 'outlined'}
          onClick={() => handleTimeframeChange('max')}
        >
          All
        </Button>
      </ButtonGroup>
      {isLoading ? (
        <CircularProgress />
      ) : chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <Typography color="error">Error loading chart data.</Typography>
      )}
    </Container>
  );
}

export default HistoricalData;
