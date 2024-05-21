import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { FaArrowRight } from "react-icons/fa";

export default function QuizList({ data }) {

  return (
    <div className="space-y-2 w-full">
    {data.map((e, index) => (
        <div key={index} className="border p-2 rounded-md w-full">
            <div className="flex items-center space-x-4 w-full">
                {e.avatar && (
                    <Avatar className="flex h-20 w-20 items-center justify-center border">
                        <AvatarImage src={e?.avatar} alt="Avatar" />
                        <AvatarFallback>{e?.quizName[0]}</AvatarFallback>
                    </Avatar>
                )}
                <div className="ml-4 flex-1">
                    <p className="text-sm font-medium leading-none">
                        {e?.quizName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {e?.quizDate} | Marks : {e?.quizMarks}
                    </p>
                </div>
                <Button className="ml-auto font-medium px-3 w-full md:w-auto">
                    <FaArrowRight />
                </Button>
            </div>
        </div>
    ))}
</div>
  );
}
