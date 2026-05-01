import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Image as ImageIcon } from 'lucide-react';
import { renderToString } from 'react-dom/server';

// Custom pulsing blue dot for User Location
const userIconHtml = `
  <div class="user-location-marker">
    <div class="pulse"></div>
    <div class="dot"></div>
  </div>
`;

const userIcon = L.divIcon({
  html: userIconHtml,
  className: 'custom-leaflet-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// Function to generate dynamic photo icons
const createPhotoIcon = (dataUrl) => {
  return L.divIcon({
    html: `
      <div class="photo-marker">
        <div class="photo-marker-pin has-image">
          <img src="${dataUrl}" alt="Thumbnail" class="marker-thumbnail" />
        </div>
        <div class="photo-marker-pointer"></div>
      </div>
    `,
    className: 'custom-leaflet-icon',
    iconSize: [48, 56],
    iconAnchor: [24, 56],
    popupAnchor: [0, -56],
  });
};

// Component to dynamically update map center
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

export function MapWrapper({ location, photos }) {
  const defaultCenter = [41.0082, 28.9784]; // Istanbul default
  const center = location ? [location.lat, location.lng] : defaultCenter;

  return (
    <div className="map-container">
      <MapContainer 
        center={center} 
        zoom={15} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false} // Disable default zoom control for cleaner UI
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <ChangeView center={location ? [location.lat, location.lng] : null} />

        {location && (
          <Marker position={[location.lat, location.lng]} icon={userIcon}>
            <Popup>
              <div style={{ padding: '8px', textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold' }}>You are here</div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                  Accuracy: {Math.round(location.accuracy)}m
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {photos.map((photo) => (
          <Marker key={photo.id} position={[photo.lat, photo.lng]} icon={createPhotoIcon(photo.dataUrl)}>
            <Popup>
              <div className="popup-content-layout">
                <img src={photo.dataUrl} alt="Captured" className="popup-thumbnail" />
                <div className="popup-details">
                  <div className="popup-time">
                    {new Date(photo.timestamp).toLocaleTimeString()}
                  </div>
                  {photo.batteryLevel !== undefined && (
                    <div className="popup-battery">🔋 Battery: %{photo.batteryLevel}</div>
                  )}
                  <div className="popup-coords">Lat: {photo.lat.toFixed(4)}, Lng: {photo.lng.toFixed(4)}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
