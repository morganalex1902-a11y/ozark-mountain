import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, ArrowRight } from 'lucide-react';
import './LocationMap.css';
import { useState } from 'react';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icon for the main property
const mainPropertyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon for landmarks
const landmarkIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Landmark {
  name: string;
  distance: string;
  lat: number;
  lng: number;
}

export default function LocationMap() {
  const [showCard, setShowCard] = useState(true);

  // Approximate coordinates for 21454 SR 7 North, Arkansas area
  const propertyLocation: [number, number] = [38.0542, -92.5958];

  const landmarks: Landmark[] = [
    {
      name: 'Mack Pines',
      distance: '~1 mile away',
      lat: 38.0442,
      lng: -92.5858
    },
    {
      name: 'Dollar General',
      distance: '~9 miles away',
      lat: 37.9742,
      lng: -92.5658
    }
  ];

  const handleGetDirections = () => {
    const mapsUrl = `https://www.google.com/maps/search/21454+SR+7+North,+Arkansas`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <MapPin className="w-6 h-6 text-accent" />
          <h3 className="font-display text-2xl md:text-3xl text-cream">
            Our Location
          </h3>
        </div>
        <p className="text-muted-foreground">
          21454 SR 7 North, Arkansas
        </p>
      </div>

      {/* Map Container */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-lg h-96 md:h-[500px] relative">
        <MapContainer
          center={propertyLocation}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Main Property Marker */}
          <Marker position={propertyLocation} icon={mainPropertyIcon} />

          {/* Landmark Markers */}
          {landmarks.map((landmark) => (
            <Marker
              key={landmark.name}
              position={[landmark.lat, landmark.lng]}
              icon={landmarkIcon}
            />
          ))}
        </MapContainer>

        {/* Location Card Overlay */}
        {showCard && (
          <div className="absolute bottom-6 left-6 z-[999] bg-gray-800 text-white rounded-xl shadow-xl p-4 w-72 border border-gray-700">
            <div className="flex items-start gap-4">
              {/* Icon Badge */}
              <div className="flex-shrink-0 bg-yellow-500 rounded-lg p-3 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gray-900" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1">
                <h4 className="font-display font-bold text-sm text-white">
                  Ozark Mountain Escape
                </h4>
                <p className="text-xs text-gray-300">
                  21454 SR 7 North, Arkansas
                </p>
                <button
                  onClick={handleGetDirections}
                  className="text-xs text-yellow-400 font-medium hover:text-yellow-300 transition-colors flex items-center gap-1 mt-2 group"
                >
                  Get Directions
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowCard(false)}
                className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Distance Information */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h4 className="font-display text-lg text-cream">Nearby Reference Points</h4>
        <div className="space-y-3">
          {landmarks.map((landmark) => (
            <div
              key={landmark.name}
              className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span className="text-cream font-medium">{landmark.name}</span>
              </div>
              <span className="text-accent text-sm font-semibold">{landmark.distance}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
