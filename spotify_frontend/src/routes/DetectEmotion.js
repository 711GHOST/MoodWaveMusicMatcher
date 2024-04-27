import { useState, useRef } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import Webcam from "react-webcam";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers"; 

const DetectEmotion = () => {
  const [openCamera, setOpenCamera] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 

  const webCamRef = useRef(null);

  const handleDetectEmotion = async () => {
    setIsLoading(true);
    setError(null); 

    try {
      // Capture image from Webcam (resize for efficiency)
      const imageSrc = webCamRef.current.getScreenshot({ width: 640, height: 480, quality: 0.8 });

      // Encode image as base64 
      const parts = imageSrc.split(";base64,");
      const imageData = parts[1]; 

      // Send image to backend API using makeAuthenticatedGETRequest
      const response = await makeAuthenticatedGETRequest(
        '/detect-emotion', 
        { imageData } 
      );
      setDetectedEmotion(response.data.emotion);

    } catch (error) {
      console.error(error);
      setError("Error processing image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LoggedInContainer>
      {
        openCamera ? (
          <Webcam
            audio={false}
            height={600}
            width={760}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            ref={webCamRef}
          />
        ) : (
          <div className="py-3 bg-white w-1/4 px-5 flex items-center justify-center rounded-full font-semibold cursor-pointer" onClick={() => setOpenCamera(true)}>Start Camera</div>
        )
      }
      <div 
        onClick={handleDetectEmotion}
        className="py-3 bg-white w-2/3 px-5 flex items-center justify-center rounded-full font-semibold cursor-pointer mt-10"
      >
        {isLoading ? "Detecting..." : error ? error : "Check your mood and get song recommendations"}
      </div>

      {detectedEmotion && (
        <div>Detected Emotion: {detectedEmotion}</div>
      )} 
    </LoggedInContainer>
  );
};

export default DetectEmotion;
