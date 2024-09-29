import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({ history }) => {
  const [attemptsNumberArray, setAttemptsNumbersArray] = useState([]);
  const [attemptsRatings, setAttemptsRatings] = useState([]);

  useEffect(() => {
    if (history) {
      const attemptsArray = Array.from({ length: history.length }, (_, i) => i + 1);
      setAttemptsNumbersArray(attemptsArray);

      const ratingsArray = history.map(attempt => attempt.ratings);
      setAttemptsRatings(ratingsArray);
    }
  }, [history]);

  const lineChartData = {
    labels: attemptsNumberArray, 
    datasets: [
      {
        label: "Rating",
        data: attemptsRatings, 
        backgroundColor: "rgba(225, 225, 225, 0.7)",
        borderColor: "rgba(225, 225, 225, 0.7)",
        pointBackgroundColor: "rgba(225, 225, 225, 1)",
        pointBorderColor: "rgba(225, 225, 225, 1)", 
        pointRadius: 7,
      }
    ]
  };

  const options = {
    responsive: true, 
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Rating progression",
        font: {
          size: 18, 
        },
        color: "white", 
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 1, 
        max: 10,
        title: {
          display: true,
          text: "Rating",
          color: "white", 
          font: {
            size: 16, 
          }
        },
        grid: {
          color: "rgba(51, 51, 51, 0.4)", 
        },
        ticks: {
          color: "white", 
        },
      },
      x: {
        title: {
          display: true,
          text: "Attempt Number",
          color: "white", 
          font: {
            size: 16, 
          }
        },
        grid: {
          color: "rgba(51, 51, 51, 0.4)", 
        },
        ticks: {
          color: "white", 
        },
      }
    },
    layout: {
      backgroundColor: "grey",
    }
  };

  return (
    <div>
      <Line options={options} data={lineChartData} />
    </div>
  );
};

export default LineGraph;
