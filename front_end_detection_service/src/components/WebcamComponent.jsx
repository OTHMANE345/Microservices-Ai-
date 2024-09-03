import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const WebcamComponent = () => {
  const videoRef = useRef(null);
  const [snekDetected, setSnekDetected] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const constraints = { video: true };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing webcam:", error);
        setError("Error accessing webcam");
      }
    };

    startVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      captureFrame();
    }, 1000); // Capture a frame every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  const captureFrame = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frameBlob = new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      });

      frameBlob.then((blob) => {
        setSelectedFile(blob);
        processFrame(blob);
      });
    }
  };

  const processFrame = async (frameBlob) => {
    setLoading(true); // Set loading state while processing image

    try {
      const formData = new FormData();
      formData.append("image", frameBlob);

      const response = await axios.post("http://localhost:5000/detect_snek", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.result === "Snek detected") {
        setSnekDetected(true);
      } else {
        setSnekDetected(false);
      }
      setError(null); 
    } catch (error) {
      console.error("Error detecting snek:", error);
      setError("Error detecting snek"); 
    }

    setLoading(false); 
  };

  return (
    <div >
      <video ref={videoRef} autoPlay playsInline className="detect" />
      {loading && <p className="detect">Loading...</p>}
      {error && <p className="detect">Error: {error}</p>}
      {snekDetected && <p className="detect">Snek detected!</p>}
    </div>
  );
};

export default WebcamComponent;