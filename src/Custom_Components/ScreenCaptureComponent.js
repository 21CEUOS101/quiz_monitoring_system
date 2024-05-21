import React, { useRef } from 'react';

const ScreenCaptureComponent = () => {
  const videoRef = useRef(null);

  const captureScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always"
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };

        // Optionally, you can capture a screenshot from the video stream
        const track = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        const bitmap = await imageCapture.grabFrame();

        // Create a canvas to draw the bitmap
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const context = canvas.getContext('2d');
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL (base64 string)
        const imgData = canvas.toDataURL('image/png');

        // Optional: Download the image
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'screenshot.png';
        link.click();
      }
    } catch (err) {
      console.error("Error capturing screen:", err);
    }
  };

  return (
    <div>
      <button onClick={captureScreen}>Capture Screen</button>
      <video ref={videoRef} style={{ display: 'none' }}></video>
    </div>
  );
};

export default ScreenCaptureComponent;
