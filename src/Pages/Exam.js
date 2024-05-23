import React, { useState, useEffect } from 'react';
import WebcamMonitor from '../Custom_Components/WebcamMonitor';
import QuestionList from "../Custom_Components/QuestionList";
import axios from 'axios';
import html2canvas from 'html2canvas';

const Exam = ({ questions }) => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [userData, setUserData] = useState({});

    const captureScreenshot = async ({ reason }) => {
        const element = document.getElementById('screenshotTarget'); // Element to capture

        html2canvas(element).then(async (canvas) => {
            const imgData = canvas.toDataURL('image/png');

            // store the image data in a variable or send it to the server
            console.log(imgData);
            const data = { studentID: "6tbxgjt0o", screenshot: imgData, event: reason };
            await axios.post('http://localhost:8000/event', data).then(() => {
                console.log('Screenshot captured and sent to server');
            }).catch((error) => {
                console.error('Error capturing and sending screenshot:', error);
            });
        });
    };

    useEffect(() => {
        if (quizStarted) {
            const handleContextMenu = (event) => event.preventDefault();
            document.addEventListener('contextmenu', handleContextMenu);

            const blockedKeys = ['F12', 'Escape', 'PrintScreen', 'Insert', 'Delete', 'End', 'Home', 'PageUp', 'PageDown'];
            const handleBlockedKeys = (event) => {
                if (blockedKeys.includes(event.key) || (event.ctrlKey && (event.key === 'c' || event.key === 'v'))) {
                    event.preventDefault();
                    captureScreenshot({ reason: 'Blocked key pressed' });
                    alert('This action is not allowed.');
                }
            }
            document.addEventListener('keydown', handleBlockedKeys);

            const handleVisibilityChange = () => {
                if (document.hidden) {
                    captureScreenshot({ reason: 'Tab switched or browser minimized' });
                    alert('You have switched tabs or minimized the browser. This will be reported.');
                }
            };
            document.addEventListener('visibilitychange', handleVisibilityChange);

            const handleFullscreenChange = () => {
                if (!document.fullscreenElement) {
                    setIsFullscreen(false);
                } else {
                    setIsFullscreen(true);
                }
            };
            document.addEventListener('fullscreenchange', handleFullscreenChange);

            const handleDevToolsChange = () => {
                captureScreenshot({ reason: 'DevTools opened' });
                alert('DevTools detected! Please refrain from opening DevTools during the quiz.');
                // Optionally, you can take further action such as disabling the quiz or logging the event.
            };
            window.addEventListener('devtoolschange', handleDevToolsChange);

            // Adding keypress event listener to capture screenshot
            const handleKeyPress = (event) => {
                captureScreenshot({ reason: 'Key pressed' });
                alert('A key has been pressed. This action will be reported.');
            };
            document.addEventListener('keypress', handleKeyPress);

            return () => {
                document.removeEventListener('contextmenu', handleContextMenu);
                document.removeEventListener('keydown', handleBlockedKeys);
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                document.removeEventListener('fullscreenchange', handleFullscreenChange);
                window.removeEventListener('devtoolschange', handleDevToolsChange);
                document.removeEventListener('keypress', handleKeyPress);
            };
        }
    }, [quizStarted]);

    const enterFullscreen = () => {
        const elem = document.documentElement;
        elem.requestFullscreen?.() ||
            elem.mozRequestFullScreen?.() ||
            elem.webkitRequestFullscreen?.() ||
            elem.msRequestFullscreen?.();
    };

    const exitFullscreen = () => {
        document.exitFullscreen?.() ||
            document.mozCancelFullScreen?.() ||
            document.webkitExitFullscreen?.() ||
            document.msExitFullscreen?.();
    };

    const generateRandomID = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const fetchAndStoreIP = () => {
        axios.get('https://ipinfo.io/json')
            .then(response => {
                const ipData = response.data;
                console.log(ipData);
                const user = {
                    studentID: generateRandomID(),
                    ip: ipData.ip,
                    city: ipData.city,
                    region: ipData.region,
                    country: ipData.country,
                    location: ipData.loc,
                    postal: ipData.postal,
                };
                setUserData(user);
                axios.post('http://localhost:8000/', user);
            })
            .then(() => {
                console.log("Data stored successfully");
            })
            .catch(error => {
                console.error('Error fetching and storing data:', error);
            });
    };

    const startQuiz = () => {
        setQuizStarted(true);
        fetchAndStoreIP();
        enterFullscreen();
    };

    const submitQuiz = () => {
        setQuizStarted(false);
        exitFullscreen();
        alert('Quiz submitted');
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
                <>
                    <div className="quiz-content">
                        <div className="flex flex-col gap-4">
                            <QuestionList questions={questions} handleSubmit={submitQuiz} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Exam;
