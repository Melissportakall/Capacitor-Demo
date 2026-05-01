import React, { useRef, useEffect, useState } from 'react';
import { X, Camera } from 'lucide-react';

export function CameraOverlay({ onClose, onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }, // Prefer back camera
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError('Could not access camera: ' + err.message);
      }
    }

    setupCamera();

    return () => {
      // Cleanup stream when component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video source
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get base64 image data
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      onCapture(imageData);
    }
  };

  return (
    <div className="camera-overlay">
      <button className="btn-close" onClick={onClose} aria-label="Close Camera">
        <X size={24} />
      </button>
      
      <div className="camera-container">
        {error ? (
          <div style={{ padding: 20, color: '#ef4444', textAlign: 'center', marginTop: '50%' }}>
            {error}
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        {!error && (
          <div className="camera-controls">
            <button className="btn-capture" onClick={handleCapture} aria-label="Take Photo" />
          </div>
        )}
      </div>
    </div>
  );
}
