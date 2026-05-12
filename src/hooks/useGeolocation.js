import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let watcherId;

    const startWatch = async () => {
      try {
        if (Capacitor.isNativePlatform()) {
          const perm = await Geolocation.requestPermissions();
          if (perm.location === 'denied') {
            setError('Konum izni reddedildi');
            return;
          }
        }

        watcherId = await Geolocation.watchPosition(
          { enableHighAccuracy: true },
          (position, err) => {
            if (err) {
              setError(err.message);
              return;
            }
            if (position) {
              setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: position.coords.accuracy,
              });
              setError(null);
            }
          }
        );
      } catch (e) {
        setError(e.message);
      }
    };

    startWatch();

    return () => {
      if (watcherId) {
        Geolocation.clearWatch({ id: watcherId });
      }
    };
  }, []);

  return { location, error };
}
