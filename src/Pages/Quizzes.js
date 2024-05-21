import { LuAlarmClock } from 'react-icons/lu'
import CompletedQuizzes from '../Custom_Components/CompletedQuizzes'
import UpcomingQuizzes from '../Custom_Components/UpcomingQuizzes'
import React from 'react'
import { BiSolidBank } from 'react-icons/bi'
import CustomButton from '../Custom_Components/CustomButton'

const Quizzes = ({user}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {user.type === 'student' ? (
                <>
                    <div className="flex flex-col gap-4">
                        <UpcomingQuizzes />
                    </div>
                    <div className="flex flex-col gap-4">
                        <CompletedQuizzes />
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-row md:flex-col gap-4">
                        <CustomButton data={{
                            buttonText: "Set up a new Quiz",
                            buttonIcon: (<LuAlarmClock size={80} />)
                        }} />
                        <CustomButton data={{
                            buttonText: "Set up a new Quiz",
                            buttonIcon: (<BiSolidBank size={80} />)
                        }} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <UpcomingQuizzes />
                        <CompletedQuizzes />
                    </div>
                </>
            )}
        </div>
  )
}

export default Quizzes