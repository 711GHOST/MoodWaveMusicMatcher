import React, { useState, useEffect, useRef, useContext } from 'react';
import Webcam from 'react-webcam';
import LoggedInContainer from '../containers/LoggedInContainer';
// ... other imports

const CheckMood = () => {
  const [emotion, setEmotion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cameraGranted, setCameraGranted] = useState(false); // State for camera permission
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 480,
    height: 360, 
    facingMode: 'user' // Front-facing camera
  };

  const detectEmotion = async () => {
    setIsLoading(true);
    try {
      // Capture image from webcam
      const imageSrc = webcamRef.current.getScreenshot();

      // Send image to your Node.js API (you'll need to build the image handling part on the server)
      const response = await fetch('http://localhost:3001/detect-emotion', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          'Content-Type': 'application/json' // Indicate image data 
        },
        body: JSON.stringify({ image: imageSrc }) 
      });

      if (!response.ok) {
        throw new Error('Emotion detection failed');
      }

      const data = await response.json();
      setEmotion(data.emotion);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Request camera access on component mount
  useEffect(() => {
    const requestCameraAccess = async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraGranted(true); 
    };

    requestCameraAccess().catch((err) => {
      console.error('Error accessing camera:', err);
      setError('Camera access denied or error occurred');
    });
  }, []);

  return (
    <LoggedInContainer>
      {isLoading && <div>Detecting emotion...</div>}
      {error && <div className="text-red-600">Error: {error}</div>}

      {cameraGranted ? (
        <>
          <Webcam
            ref={webcamRef}
            audio={false} // No need for audio in this case
            videoConstraints={videoConstraints}
          />
          <button 
            onClick={detectEmotion}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Check Mood
          </button>
        </>
      ) : (
        <div>Please grant camera access to continue</div>
      )}
    </LoggedInContainer>
  );
};

export default CheckMood;
