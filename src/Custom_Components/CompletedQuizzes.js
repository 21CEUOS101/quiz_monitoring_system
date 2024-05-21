import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import QuizList from "./QuizList";

const CompletedQuizzes = () => {
  const data = [
    {
      avatar: "/avatars/01.png",
      quizName: "Introduction to Programming",
      quizDate: "25th July 2021",
      quizTime: "10:00 AM",
      quizDuration: "1 Hour",
      quizMarks: 100,
      courseId: 1,
      noOfStudents: 100,
    },
    {
      avatar: "/avatars/01.png",
      quizName: "Introduction to Programming",
      quizDate: "25th July 2021",
      quizTime: "10:00 AM",
      quizDuration: "1 Hour",
      quizMarks: 100,
      courseId: 1,
      students: [1, 2, 3, 4],
    },
    {
      avatar: "/avatars/01.png",
      quizName: "Introduction to Programming",
      quizDate: "25th July 2021",
      quizTime: "10:00 AM",
      quizDuration: "1 Hour",
      quizMarks: 100,
      courseId: 1,
      students: [1, 2, 3, 4],
    },
  ];

  // we have to modify data according to our needs
  const modifiedData = data.map((e) => {
    return {
      quizName: "Introduction to Programming",
      quizDate: "25th July 2021",
      quizTime: "10:00 AM",
      quizDuration: "1 Hour",
      quizMarks: 100,
      courseId: 1,
      noOfStudents: e.students?.length,
    };
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between text-center">
        <CardTitle>Completed Quizzes</CardTitle>
        <CardDescription>
          <Button>All Quizzes</Button>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <QuizList data={modifiedData} />
      </CardContent>
    </Card>
  );
};

export default CompletedQuizzes;
