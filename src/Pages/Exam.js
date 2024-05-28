import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import WebcamMonitor from '../Custom_Components/WebcamMonitor';
import QuestionList from "../Custom_Components/QuestionList";
import axios from 'axios';
const { captureScreenshot, fetchAndStoreIP, enterFullscreen, exitFullscreen } = require('../utils/index');

const Exam = ({ questions }) => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [screenshotInterval, setScreenshotInterval] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);

    const handleCaptureScreenshot = async ({ reason }) => {
    console.log(`Event occurred: ${reason}`);
    await captureScreenshot({ reason });

    // Create a local interval for each event trigger
    const intervalId = setInterval(() => {
        setScreenshotInterval(intervalId);
        captureScreenshot({ reason: 'Regular interval screenshot' });
    }, 5000);

    // Clear this interval after 1 minute
    setTimeout(() => {
        clearInterval(intervalId);
    }, 60000);

    // Assuming you want to start audio recording with the first event and stop it after 1 minute
    if (!mediaRecorder) {
        startAudioRecording();
        
        // Stop the recorder after 1 minute
        setTimeout(() => {
            if (mediaRecorder) {
                mediaRecorder.stop();  // This will trigger sending the audio data in the onstop handler
                setMediaRecorder(null);  // Reset recorder state
            }
        }, 60000);
    }
};


    const startAudioRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                recorder.ondataavailable = event => {
                    setAudioChunks(prev => [...prev, event.data]);
                };
                recorder.start();
                setMediaRecorder(recorder);
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
            });
    };

    useEffect(() => {
        if (mediaRecorder) {
            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const formData = new FormData();
                formData.append('studentID', "6tbxgjt0o"); // Assuming studentID is available in your component
                formData.append('audio', audioBlob, `audio_${new Date().toISOString().replace(/[:.-]/g, '_')}.wav`);
                console.log('Audio recorded:', audioChunks.length, 'chunks');
                console.log('Sending audio to server...');
                try {
                    await axios.post('http://localhost:8000/audio', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    console.log('Audio recorded and sent to server');
                } catch (error) {
                    console.error('Error sending audio to server:', error);
                } finally {
                    setAudioChunks([]);
                }
            };
        }
    }, [mediaRecorder]);
    

    useEffect(() => {
        if (quizStarted) {
            const handleContextMenu = (event) => event.preventDefault();
            const blockedKeys = ['F12', 'Escape', 'PrintScreen', 'Insert', 'Delete', 'End', 'Home', 'PageUp', 'PageDown'];
            const handleBlockedKeys = (event) => {
                if (blockedKeys.includes(event.key) || (event.ctrlKey && (event.key === 'c' || event.key === 'v'))) {
                    event.preventDefault();
                    handleCaptureScreenshot({ reason: 'Blocked key pressed' });
                    Swal.fire('This action is not allowed.');
                }
            };
            const handleVisibilityChange = () => {
                if (document.hidden) {
                    handleCaptureScreenshot({ reason: 'Tab switched or browser minimized' });
                    Swal.fire('You have switched tabs or minimized the browser. This will be reported.');
                }
            };
            const handleFullscreenChange = () => {
                setIsFullscreen(!!document.fullscreenElement);
            };

            // Add event listeners
            document.addEventListener('contextmenu', handleContextMenu);
            document.addEventListener('keydown', handleBlockedKeys);
            document.addEventListener('visibilitychange', handleVisibilityChange);
            document.addEventListener('fullscreenchange', handleFullscreenChange);

            // Cleanup event listeners on unmount or quiz end
            return () => {
                document.removeEventListener('contextmenu', handleContextMenu);
                document.removeEventListener('keydown', handleBlockedKeys);
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                document.removeEventListener('fullscreenchange', handleFullscreenChange);
                if (screenshotInterval) {
                    clearInterval(screenshotInterval);
                }
                if (mediaRecorder) {
                    mediaRecorder.stream.getTracks().forEach(track => track.stop());
                }
            };
        }
    }, [quizStarted, screenshotInterval, mediaRecorder]);

    // Start the quiz
    const startQuiz = () => {
        setQuizStarted(true);
        fetchAndStoreIP();
        enterFullscreen();
    };

    // Submit the quiz
    const submitQuiz = () => {
        setQuizStarted(false);
        exitFullscreen();
        Swal.fire('Quiz submitted');
    };

    return (
        <div className="exam-container">
            <WebcamMonitor isQuizStarted={quizStarted} />
            {!quizStarted ? (
                <button onClick={startQuiz} className="start-button">
                    Start
                </button>
            ) : !isFullscreen ? (
                <div>
                    <p>Please click on the button below to re-enter fullscreen and continue the quiz.</p>
                    <button onClick={enterFullscreen}>Re-enter Fullscreen</button>
                </div>
            ) : (
                <div className="quiz-content">
                    <div className="flex flex-col gap-4">
                        <QuestionList questions={questions} handleSubmit={submitQuiz} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Exam;
