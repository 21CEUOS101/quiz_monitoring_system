import React, { useEffect, useRef } from "react";

const WebcamMonitor = ({ isQuizStarted }) => {
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    if (isQuizStarted) {
      let recordedChunks = [];

      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          mediaStreamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;

          const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              recordedChunks.push(event.data);
            }
          };

          recordedChunks = [];
          mediaRecorder.start();
        })
        .catch((error) => console.error("Error accessing camera:", error));
    } else {
      stopMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [isQuizStarted]);

  const stopMonitoring = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-32 h-32 bg-black rounded-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};

export default WebcamMonitor;
