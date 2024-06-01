import axios from 'axios';

// Function to capture and send a screenshot
export const captureScreenshot = async ({ reason }) => {
    const data = { studentID: "6tbxgjt0o", event: reason };
    console.log('Capturing screenshot and sending to server...');
    try {
        await axios.post('http://localhost:8000/event', data);
        console.log('Screenshot captured and sent to server');
    } catch (error) {
        console.error('Error capturing and sending screenshot:', error);
    }
};

// Function to enter fullscreen mode
export const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
};

// Function to exit fullscreen mode
export const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

// Function to generate a random student ID
export const generateRandomID = () => {
    return Math.random().toString(36).substr(2, 9);
};

// Fetch and store user's IP information
export const fetchAndStoreIP = () => {
    axios.get('https://ipinfo.io/json')
        .then(response => {
            const ipData = response.data;
            const user = {
                studentID: generateRandomID(),
                ip: ipData.ip,
                city: ipData.city,
                region: ipData.region,
                country: ipData.country,
                location: ipData.loc,
                postal: ipData.postal,
            };
            return axios.post('http://localhost:8000/', user);
        })
        .then(() => {
            console.log("Data stored successfully");
        })
        .catch(error => {
            console.error('Error fetching and storing data:', error);
        });
};

// Function to shuffle questions and options in a quiz
export const shuffleQuestions = (questions) => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    shuffledQuestions.forEach(question => {
        question.options.sort(() => Math.random() - 0.5);
    });
    return shuffledQuestions;
};

// Function to validate a quiz
export const validateQuiz = (questions, answers) => {
    let score = 0;
    questions.forEach((question, index) => {
        if (question.answer === answers[index]) {
            score++;
        }
    });
    return score;
};

// Function to start a timer
export const startTimer = (duration, onTick, onTimeout) => {
    let timeLeft = duration;
    const timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            onTimeout();
        } else {
            onTick(timeLeft);
        }
    }, 1000);
    return timer;
};

// what is onTick and onTimeout?
// onTick is a function that will be called every second to update the timer display.

// How should I use above function startTimer?
// You can use it like this:
// const timer = startTimer(60, setTimeLeft, handleTimeout);
// where setTimeLeft is a function to update the timer display and handleTimeout is a function to handle the timer timeout.

// do timer automatically stops after 60 seconds?
// Yes, the timer will automatically stop after 60 seconds.

// If Student submits the quiz before 60 seconds, how to stop the timer?
// You can clear the timer using clearInterval(timer) when the student submits the quiz.

// But clearInterval(timer) will stop the timer , how to get timer value?
// You can store the timer value in a state variable and use it to clear the timer when needed.
