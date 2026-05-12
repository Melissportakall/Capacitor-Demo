import React, { useState, useEffect } from 'react';
import { Camera as CameraIcon, Smartphone } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { LocalNotifications } from '@capacitor/local-notifications';
import { MapWrapper } from './components/MapWrapper';
import { useGeolocation } from './hooks/useGeolocation';

const NOTIFICATION_CHANNEL_ID = 'capacitor-demo';

function App() {
  const { location, error: locationError } = useGeolocation();
  const [photos, setPhotos] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [notification, setNotification] = useState(null);

  const isInitialLoad = React.useRef(true);
  const prevPhotoCount = React.useRef(0);

  const API_URL = "http://192.168.1.5:3000/api/photos";

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const perm = await LocalNotifications.requestPermissions();
        if (perm.display !== 'granted') {
          console.warn('Bildirim izni verilmedi:', perm.display);
          return;
        }
        if (Capacitor.getPlatform() === 'android') {
          await LocalNotifications.createChannel({
            id: NOTIFICATION_CHANNEL_ID,
            name: 'Capacitor Demo',
            description: 'Foto bildirimleri',
            importance: 5,
            visibility: 1,
            lights: true,
            vibration: true,
          });
        }
      } catch (e) {
        console.error('Notification setup failed', e);
      }
    };
    setupNotifications();
  }, []);

  const sendNativeNotification = (title, body) => {
    LocalNotifications.schedule({
      notifications: [{
        id: Date.now() % 2147483647,
        title,
        body,
        channelId: NOTIFICATION_CHANNEL_ID,
      }]
    }).catch(e => console.error('Notification failed', e));
  };

  const showToast = (msg, duration = 4000) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), duration);
  };

  useEffect(() => {
    let consecutiveErrors = 0;
    const fetchPhotos = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        consecutiveErrors = 0;

        if (!isInitialLoad.current && data.length > prevPhotoCount.current) {
          showToast("Yeni bir fotoğraf eklendi! 📸");
          Haptics.notification({ type: NotificationType.Success }).catch(() => {});
          sendNativeNotification('Yeni fotoğraf', 'Haritada yeni bir fotoğraf belirdi 📸');
        }

        isInitialLoad.current = false;
        prevPhotoCount.current = data.length;
        setPhotos(data);
      } catch (err) {
        consecutiveErrors++;
        if (consecutiveErrors === 1 || consecutiveErrors % 10 === 0) {
          showToast(`⚠️ Sunucuya ulaşılamıyor: ${err.message}`, 6000);
        }
      }
    };

    fetchPhotos();
    const intervalId = setInterval(fetchPhotos, 3000);
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

  const handleOpenCamera = async () => {
    if (!location) {
      alert("Konum bekleniyor... Lütfen birazdan tekrar deneyin.");
      return;
    }

    try {
      const photo = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});

      const newPhoto = {
        id: Date.now().toString(),
        dataUrl: photo.dataUrl,
        lat: location.lat,
        lng: location.lng,
        timestamp: Date.now(),
        batteryLevel: deviceInfo?.battery
      };

      setPhotos((prev) => {
        prevPhotoCount.current = prev.length + 1;
        return [...prev, newPhoto];
      });

      sendNativeNotification(
        'Fotoğraf eklendi 📸',
        `Konum: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
      );

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPhoto),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } catch (err) {
        showToast(`⚠️ Foto sunucuya gönderilemedi: ${err.message}`, 6000);
      }
    } catch (e) {
      // User cancelled the camera or permission denied — silent
    }
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
          onClick={handleOpenCamera}
          aria-label="Open Camera"
        >
          <CameraIcon size={28} />
        </button>
      </div>
    </>
  );
}

export default App;
