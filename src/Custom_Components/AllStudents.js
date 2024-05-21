import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { FaArrowRight } from "react-icons/fa";

const AllStudents = () => {
    
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Students List</CardTitle>
        <CardDescription>Top Performers of your batch : </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 w-full">
          {data.map((e, index) => (
            <div key={index} className="border p-2 rounded-md w-full">
              <div className="flex items-center space-x-5 w-full">
                <Avatar className="flex h-9 w-9 items-center justify-center border">
                  <AvatarImage src={e?.avatar} alt="Avatar" />
                  <AvatarFallback>{e?.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium leading-none">{e?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Rank : {e?.classRank} | Avg. Marks : {e?.avgMarks}
                  </p>
                </div>
                <Button className="ml-auto font-medium px-3 w-full md:w-auto">
                  <FaArrowRight />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllStudents;
