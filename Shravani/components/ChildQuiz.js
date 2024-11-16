import React, { useState } from 'react';
import './ChildQuiz.css'; // Import the CSS file

function ChildQuiz() {
  const [subject, setSubject] = useState(null); // Track the selected subject

  // Dummy subjects list
  const subjects = ["Maths", "Science", "Social", "English"];

  const handleSubjectClick = (subject) => {
    setSubject(subject);
  };

  return (
    <div className="child-quiz-container">
      {/* Navigation bar with child's name and subjects */}
      <div className="child-quiz-navbar">
        <div className="child-name">Child's Name</div>
        <div className="subjects">
          {subjects.map((subject, index) => (
            <button 
              key={index} 
              className="subject-button"
              onClick={() => handleSubjectClick(subject)}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Show the selected subject and an option to take the test */}
      {subject && (
        <div className="subject-details">
          <h2>{subject} Test</h2>
          <button className="take-test-button">Take Test</button>
        </div>
      )}
    </div>
  );
}

export default ChildQuiz;
