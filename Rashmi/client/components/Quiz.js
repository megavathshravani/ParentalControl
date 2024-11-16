// import React, { useState } from 'react';
// import axios from 'axios';

// function Quiz() {
//   const [questions, setQuestions] = useState([]);
//   const [newQuestion, setNewQuestion] = useState({ question: '', answer: '' });

//   const handleAddQuestion = () => {
//     setQuestions([...questions, newQuestion]);
//     setNewQuestion({ question: '', answer: '' });
//   };

//   const handleSubmitQuiz = async () => {
//     try {
//       await axios.post('http://localhost:5000/create-quiz', {
//         parentEmail: 'parent@example.com',
//         childEmail: 'child@example.com',
//         questions,
//       });
//       alert('Quiz created successfully');
//     } catch (error) {
//       console.error('Error creating quiz:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Create Quiz</h2>
//       <input
//         type="text"
//         placeholder="Question"
//         value={newQuestion.question}
//         onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Answer"
//         value={newQuestion.answer}
//         onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
//       />
//       <button onClick={handleAddQuestion}>Add Question</button>
//       <button onClick={handleSubmitQuiz}>Submit Quiz</button>
//     </div>
//   );
// }

// export default Quiz;

import React, { useState } from 'react';
import axios from 'axios';
import './Quiz.css'; // Importing the CSS file for styling

function Quiz() {
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ question: '', answer: '' });
  const [showQuestions, setShowQuestions] = useState(false);

  const handleSelectSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleConfirmSubject = () => {
    if (subject) {
      setShowQuestions(true);
    } else {
      alert('Please select a subject');
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({ question: '', answer: '' });
  };

  // const handleSubmitQuiz = async () => {
  //   try {
  //     await axios.post('http://localhost:5000/create-quiz', {
  //       parentEmail: 'parent@example.com',
  //       childEmail: 'child@example.com',
  //       subject,
  //       questions,
  //     });
  //     alert('Quiz created successfully');
  //   } catch (error) {
  //     console.error('Error creating quiz:', error);
  //   }
  // };

  const handleSubmitQuiz = async () => {
    if (questions.length === 0) {
      alert('Please add at least one question before submitting.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:5000/create-quiz',
        {
          parentEmail: 'parent@example.com',
          childEmail: 'child@example.com',
          subject,
          questions,
        },
        {
          headers: {
            Authorization: 'Bearer placeholder_token', // Replace with a real token if required
          },
        }
      );
  
      alert(response.data.message); // Show success message
      setSubject('');
      setQuestions([]);
      setShowQuestions(false);
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert(`Failed to create quiz: ${error.response?.data?.message || error.message}`);
    }
  };
  

  return (
    <div className='container'>
    <div className="quiz-container">
      <h2>Create Quiz</h2>

      {/* Subject Selection */}
      {!showQuestions && (
        <div className="subject-selection">
          <label>Select Subject: </label>
          <select value={subject} onChange={handleSelectSubject}>
            <option value="">--Choose Subject--</option>
            <option value="English">English</option>
            <option value="Maths">Maths</option>
            <option value="Social">Social</option>
            <option value="Science">Science</option>
            <option value="GK">GK</option>
          </select>
          <button onClick={handleConfirmSubject}>Confirm Subject</button>
        </div>
      )}

      {/* Question Input Section */}
      {showQuestions && (
        <div className="question-section">
          <input
            type="text"
            placeholder="Question"
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
          />
          <input
            type="text"
            placeholder="Answer"
            value={newQuestion.answer}
            onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
          />
          <button onClick={handleAddQuestion}>Add Question</button>
          <button onClick={handleSubmitQuiz}>Submit Quiz</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default Quiz;

