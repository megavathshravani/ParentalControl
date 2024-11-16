import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './DashboardCardQuiz.css';


// Register Chart.js components
Chart.register(...registerables);

const DashboardCardQuiz = () => {
  // Sample data for the pie charts
  const subjects = [
    { name: 'English', score: 85 },
    { name: 'Maths', score: 70 },
    { name: 'General Knowledge', score: 95 },
  ];

  // Function to determine grade based on percentage
  const getGrade = (score) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    return 'D';
  };

  return (
    <div className="dashboard__cardquiz">
      <h3>Quiz Results</h3>
      {subjects.map((subject, index) => {
        const data = {
          labels: ['Score', 'Remaining'],
          datasets: [
            {
              data: [subject.score, 100 - subject.score],
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)', // Color for score
                'rgba(201, 203, 207, 0.6)', // Color for remaining
              ],
              borderWidth: 1,
            },
          ],
        };

        return (
          <div className="pie-chart" key={index}>
            <h4>{subject.name}</h4>
            <Pie data={data} options={{ responsive: true }} />
            <p>Grade: {getGrade(subject.score)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCardQuiz;



