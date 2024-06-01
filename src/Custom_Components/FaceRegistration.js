import React, { useEffect, useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Button } from '../components/ui/button';

const FaceRegistration = () => {
    const videoRef = useRef(null);
    const [photoData, setPhotoData] = useState(null);
    const [cameraOn, setCameraOn] = useState(false);

    const startCamera = async () => {
        console.log('Starting camera...');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setCameraOn(true);
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            setCameraOn(false);
        }
    };

    const takePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/png');
            setPhotoData(dataURL);
            stopCamera(); // Stop camera after taking photo
        }
    };

    const savePhoto = () => {
        if (photoData) {
            // Extract the pure base64 data without the prefix
            const base64Response = photoData.split(';base64,').pop();
    
            // Convert base64 to a Uint8Array
            const byteCharacters = atob(base64Response);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
    
            // Create a Blob from the Uint8Array
            const imageBlob = new Blob([byteArray], {type: 'image/png'});
    
            // Use window.URL.createObjectURL to create a download link
            const element = document.createElement("a");
            element.href = URL.createObjectURL(imageBlob);
            element.download = `face_photo_${Date.now()}.png`;
            document.body.appendChild(element);
            element.click();
    
            // Clean up and remove the element from the body
            document.body.removeChild(element);
            setPhotoData(null); // Clear photo data after saving
            console.log('Photo downloaded');
        }
    };
    

    useEffect(() => {
        console.log("Camera is on:", cameraOn);
    }, [cameraOn]);

    return (
        <Dialog>
            <DialogTrigger className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>Verify Face</DialogTrigger>
            <DialogContent>
                <DialogHeader className="flex justify-center w-full">
                    <DialogTitle className="text-center">Face Registration</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <div className="flex flex-row gap-5 w-full h-full">
                        <Card className="flex-1 shadow-md">
                            <CardHeader>
                                <CardTitle>Camera</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Always render the video element, but use CSS to hide/show */}
                                <video ref={videoRef} autoPlay playsInline muted className={`${!cameraOn && 'hidden'}`}></video>
                            </CardContent>
                            <CardFooter>
                                {!cameraOn && !photoData && (
                                    <Button onClick={startCamera}>
                                        Start Camera
                                    </Button>
                                )}
                                {cameraOn && (
                                    <Button onClick={takePhoto} >
                                        Take Photo
                                    </Button>
                                )}
                                {photoData && (
                                    <Button onClick={savePhoto}>
                                        Save
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                        <Card className="flex-1 shadow-md">
                            <CardHeader>
                                <CardTitle>Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {photoData && <img src={photoData} alt="Captured" className="max-w-full" />}
                            </CardContent>
                            <CardFooter>
                                {photoData ? <p>Click 'Save' to verify photo.</p> : <p>No photo captured yet.</p>}
                            </CardFooter>
                        </Card>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default FaceRegistration;
