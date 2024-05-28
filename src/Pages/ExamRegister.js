import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const ExamRegister = () => {
    const [studentID, setStudentID] = useState('');
    const [capture, setCapture] = useState(null);

    const captureAndVerify = async () => {
        if (!studentID || !capture) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            // Simulate image comparison (replace this with actual comparison logic)
            // For demo purposes, always assume the verification is successful
            const response = await axios.post('/verify', { studentID, capture });
            if (response.data.success) {
                if (window.confirm('Verified! Enter Test?')) {
                    enterTest();
                }
            } else {
                alert('Verification failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while verifying.');
        }
    };

    const enterTest = () => {
        // Redirect to /exams (replace this with actual redirection logic)
        window.location.href = '/exams';
    };

    const videoConstraints = {
        facingMode: 'user'
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Student ID"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
                required
            /><br />
            <Webcam
                audio={false}
                videoConstraints={videoConstraints}
                screenshotFormat="image/jpeg"
                width={320}
                height={240}
                ref={(webcamRef) => setCapture(webcamRef)}
            /><br />
            <button onClick={captureAndVerify}>Verify</button>
        </div>
    );
};

export default ExamRegister;
