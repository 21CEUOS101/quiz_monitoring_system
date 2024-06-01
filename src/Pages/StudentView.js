import React from 'react';
import FaceRegistration from '../Custom_Components/FaceRegistration';
import QuizConfirmation from '../Custom_Components/QuizConfirmation';

const StudentView = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <FaceRegistration />
            <hr className=" w-full my-4 border-gray-300" />
            <QuizConfirmation />
        </div>
    );
}

export default StudentView;
