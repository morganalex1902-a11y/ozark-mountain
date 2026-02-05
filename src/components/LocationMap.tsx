import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import './LocationMap.css';

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
      <div className="rounded-2xl overflow-hidden border border-border shadow-lg h-96 md:h-[500px]">
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
          <Marker position={propertyLocation} icon={mainPropertyIcon}>
            <Popup>
              <div className="p-2">
                <h4 className="font-display font-bold text-sm">Ozark Mountain Escape</h4>
                <p className="text-xs text-gray-600">21454 SR 7 North</p>
              </div>
            </Popup>
          </Marker>

          {/* Landmark Markers */}
          {landmarks.map((landmark) => (
            <Marker
              key={landmark.name}
              position={[landmark.lat, landmark.lng]}
              icon={landmarkIcon}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-display font-bold text-sm">{landmark.name}</h4>
                  <p className="text-xs text-gray-600">{landmark.distance}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
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
