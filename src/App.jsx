import React, { useState, useEffect } from 'react';
import { Camera, Smartphone } from 'lucide-react';
import { Device } from '@capacitor/device';
import { MapWrapper } from './components/MapWrapper';
import { CameraOverlay } from './components/CameraOverlay';
import { useGeolocation } from './hooks/useGeolocation';

function App() {
  const { location, error: locationError } = useGeolocation();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [notification, setNotification] = useState(null);
  
  const isInitialLoad = React.useRef(true);
  const prevPhotoCount = React.useRef(0);
  
  const API_URL = "http://192.168.1.133:3000/api/photos";

  // Fetch photos from the server periodically
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(API_URL);
        if (res.ok) {
          const data = await res.json();
          
          if (!isInitialLoad.current && data.length > prevPhotoCount.current) {
            setNotification("Yeni bir fotoğraf eklendi! 📸");
            setTimeout(() => setNotification(null), 4000);
          }
          
          isInitialLoad.current = false;
          prevPhotoCount.current = data.length;
          setPhotos(data);
        }
      } catch (err) {
        // Silently fail if server is unreachable
      }
    };
    
    fetchPhotos();
    const intervalId = setInterval(fetchPhotos, 3000); // Poll every 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const info = await Device.getInfo();
        const battery = await Device.getBatteryInfo().catch(() => ({ batteryLevel: 0 }));
        setDeviceInfo({
          model: info.model,
          os: info.operatingSystem,
          osVersion: info.osVersion,
          battery: Math.round((battery.batteryLevel || 0) * 100)
        });
      } catch (e) {
        console.error("Device info fetch failed", e);
      }
    };
    fetchDeviceInfo();
  }, []);

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
      batteryLevel: deviceInfo?.battery // Fotoğraf çekildiği andaki şarjı kaydediyoruz
    };

    // Update locally immediately for better UX
    setPhotos((prev) => {
      prevPhotoCount.current = prev.length + 1; // Prevent self-notification
      return [...prev, newPhoto];
    });
    setIsCameraOpen(false);

    // Send to local server
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPhoto),
    }).catch(err => console.error("Failed to sync photo to server", err));
  };

  return (
    <>
      <MapWrapper location={location} photos={photos} />

      {notification && (
        <div className="toast-notification glass-panel">
          {notification}
        </div>
      )}

      <div className="ui-layer">
        <header className="main-header glass-panel">
          <h1>Capacitor Demo</h1>
          <div className="header-status">
            <div className={`status-indicator ${location && !locationError ? 'active' : ''}`} />
            <span>{location ? 'GPS Online' : 'Searching GPS...'}</span>
          </div>
        </header>

        {deviceInfo && (
          <div className="glass-panel device-info">
            <Smartphone size={14} />
            <span>{deviceInfo.model} • %{deviceInfo.battery}</span>
          </div>
        )}

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
