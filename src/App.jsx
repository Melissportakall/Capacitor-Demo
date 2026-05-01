import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { MapWrapper } from './components/MapWrapper';
import { CameraOverlay } from './components/CameraOverlay';
import { useGeolocation } from './hooks/useGeolocation';

function App() {
  const { location, error: locationError } = useGeolocation();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleCapture = (imageDataUrl) => {
    if (!location) {
      alert("Waiting for location... Please try again in a moment.");
      return;
    }

    const newPhoto = {
      id: Date.now().toString(),
      dataUrl: imageDataUrl,
      lat: location.lat,
      lng: location.lng,
      timestamp: Date.now(),
    };

    setPhotos((prev) => [...prev, newPhoto]);
    setIsCameraOpen(false);
  };

  return (
    <>
      <MapWrapper location={location} photos={photos} />

      <div className="ui-layer">
        <div className="glass-panel status-bar">
          <div className={`status-indicator ${location && !locationError ? 'active' : ''}`} />
          {locationError ? (
            <span style={{ color: '#ef4444' }}>Location Error</span>
          ) : location ? (
            <span>GPS Active</span>
          ) : (
            <span>Locating...</span>
          )}
        </div>

        <button 
          className="fab" 
          onClick={() => setIsCameraOpen(true)}
          aria-label="Open Camera"
        >
          <Camera size={28} />
        </button>
      </div>

      {isCameraOpen && (
        <CameraOverlay 
          onClose={() => setIsCameraOpen(false)} 
          onCapture={handleCapture} 
        />
      )}
    </>
  );
}

export default App;
