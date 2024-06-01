import React from 'react'
import RankingCard from './RankingCard'
import UpcomingQuizzes from './UpcomingQuizzes'
import CompletedQuizzes from './CompletedQuizzes'
import CustomButton from './CustomButton'
import { LuAlarmClock } from "react-icons/lu";
import { BiSolidBank } from "react-icons/bi";
import FaceRegistration from './FaceRegistration'
import QuizConfirmation from './QuizConfirmation'

const Home = ({ user }) => {
    // return (
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    //         {user.type === 'student' ? (
    //             <>
    //                 <div className="flex flex-col gap-4">
    //                     <UpcomingQuizzes />
    //                     <CompletedQuizzes />
    //                 </div>
    //                 <div className="flex flex-col gap-4">
    //                     <RankingCard />
    //                 </div>
    //             </>
    //         ) : (
    //             <>
    //                 <div className="flex flex-row md:flex-col gap-4">
    //                     <CustomButton data={{
    //                         buttonText: "Set up a new Quiz",
    //                         buttonIcon: (<LuAlarmClock size={80} />)
    //                     }} />
    //                     <CustomButton data={{
    //                         buttonText: "Set up a new Quiz",
    //                         buttonIcon: (<BiSolidBank size={80} />)
    //                     }} />
    //                 </div>
    //                 <div className="flex flex-col gap-4">
    //                     <UpcomingQuizzes />
    //                     <RankingCard />
    //                 </div>
    //             </>
    //         )}
    //     </div>
    // );
    return (<>
    
        <FaceRegistration />

        <QuizConfirmation />
    
    </>);
};

export default Home