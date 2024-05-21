import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../components/ui/card';
import { Button } from '../components/ui/button';

const QuestionCard = ({ question, options, onOptionSelect }) => {
  return (
    <Card className="max-w-md mx-auto mt-10 border border-gray-300 shadow-lg rounded-lg">
      <CardHeader className="bg-black text-white text-lg font-semibold p-4 rounded-t-lg">
        Quiz Question
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-black text-md mb-4">{question}</p>
        <div className="flex flex-col space-y-2">
          {options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onOptionSelect(option)}
              className="bg-white text-black border border-gray-300 rounded-md p-2 hover:bg-gray-100"
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-100 text-right p-4 rounded-b-lg">
        {/* Remove the Submit button from here */}
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
