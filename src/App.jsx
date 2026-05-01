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

    setPhotos((prev) => [...prev, newPhoto]);
    setIsCameraOpen(false);
  };

  return (
    <>
      <MapWrapper location={location} photos={photos} />

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
