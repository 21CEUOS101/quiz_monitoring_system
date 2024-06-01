import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import { Button } from '../components/ui/button';
import { shuffleQuestions } from '../utils';

const QuestionList = ({handleSubmit}) => {
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
    },
    {
      question: 'What is the capital of Germany?',
      options: ['Vienna', 'Berlin', 'Hamburg', 'Munich'],
    },
    {
      question: 'What is the capital of Spain?',
      options: ['Barcelona', 'Madrid', 'Valencia', 'Seville'],
    },
  ];

  const shuffledQuestions = shuffleQuestions(questions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionSelect = (option) => {
    console.log(`Selected option: ${option}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        <QuestionCard
          question={shuffledQuestions[currentQuestionIndex].question}
          options={shuffledQuestions[currentQuestionIndex].options}
          onOptionSelect={handleOptionSelect}
        />
        <div className="flex justify-between mt-4">
          <Button
            onClick={handlePrevious}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          {currentQuestionIndex < shuffledQuestions.length - 1 ? (
            <Button
              onClick={handleNext}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
