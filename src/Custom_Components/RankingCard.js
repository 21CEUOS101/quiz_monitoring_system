import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../components/ui/card"
import StudentList from './StudentList'
import { Button } from '../components/ui/button'
  

const RankingCard = () => {

    const data = [
        {
          name: "Olivia Martin",
          classRank: 1,
          totalMarks: 999,
          avatar: "/avatars/01.png",
          avgMarks: 99.9,
          totalTests: 10,
          email: "olivia@gmail.com",
          role: "student",
          courses: [1, 2, 3],
          age: 20,
          gender: "Female",
          studentId: 1,
        },
        {
          name: "Olivia Martin",
          classRank: 1,
          totalMarks: 999,
          avatar: "/avatars/01.png",
          avgMarks: 99.9,
          totalTests: 10,
          email: "olivia@gmail.com",
          role: "student",
          courses: [1, 2, 3],
          age: 20,
          gender: "Female",
          studentId: 1,
        },
        {
          name: "Olivia Martin",
          classRank: 1,
          totalMarks: 999,
          avatar: "/avatars/01.png",
          avgMarks: 99.9,
          totalTests: 10,
          email: "olivia@gmail.com",
          role: "student",
          courses: [1, 2, 3],
          age: 20,
          gender: "Female",
          studentId: 1,
        },
    ];

    // we have to modify data according to our needs
    const modifiedData = data.map((e) => {
        return {
            avatar : e.avatar,
            name: e.name,
            classRank: e.classRank,
            avgMarks: e.avgMarks
        }
    });
    

  return (
    <Card>
        <CardHeader>
            <CardTitle>Students List</CardTitle>
            <CardDescription>Top Performers of your batch : </CardDescription>
        </CardHeader>
        <CardContent>
              <StudentList data={modifiedData} />
        </CardContent>
        <CardFooter>
            <Button className="w-full">View More</Button>
        </CardFooter>
    </Card>
  )
}

export default RankingCard