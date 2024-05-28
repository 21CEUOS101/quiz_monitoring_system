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