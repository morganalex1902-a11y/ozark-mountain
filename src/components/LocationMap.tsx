import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { X } from "lucide-react";

interface LocationMapProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation?: string;
}

const locations = [
  { name: "Traverse City", lat: 44.7629, lng: -85.6233 },
  { name: "Bloomfield Hills", lat: 42.5669, lng: -83.2475 },
  { name: "Birmingham", lat: 42.5486, lng: -83.2152 },
  { name: "Grosse Pointe", lat: 42.4425, lng: -82.9256 },
  { name: "Northville", lat: 42.2345, lng: -83.4791 },
  { name: "Novi", lat: 42.4761, lng: -83.4778 },
  { name: "Orchard Lake", lat: 42.5986, lng: -83.3633 },
  { name: "Rochester Hills", lat: 42.6606, lng: -83.1357 },
  { name: "Shelby Township", lat: 42.6199, lng: -83.0347 },
  { name: "Macomb", lat: 42.7074, lng: -82.8324 },
  { name: "Troy", lat: 42.5803, lng: -83.1479 },
  { name: "Sterling Heights", lat: 42.5681, lng: -83.0347 },
  { name: "Madison Heights", lat: 42.4967, lng: -83.0651 },
  { name: "Warren", lat: 42.4808, lng: -83.0259 }
];

const LocationMap = ({ isOpen, onClose, selectedLocation }: LocationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!isOpen || !mapContainer.current) return;

    // Create map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([42.5, -83.1], 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(map.current);

      // Add markers for each location
      locations.forEach(location => {
        L.marker([location.lat, location.lng])
          .bindPopup(`<strong>${location.name}</strong><br/>Our Service Area`)
          .addTo(map.current!)
          .openPopup();
      });

      // If a specific location is selected, center on it
      if (selectedLocation) {
        const location = locations.find(l => l.name === selectedLocation);
        if (location) {
          map.current.setView([location.lat, location.lng], 12);
          L.marker([location.lat, location.lng])
            .bindPopup(`<strong>${location.name}</strong><br/>Our Service Area`)
            .addTo(map.current)
            .openPopup();
        }
      } else {
        // Fit bounds to all markers
        const bounds = L.latLngBounds(locations.map(l => [l.lat, l.lng]));
        map.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }

    // Resize map when container is visible
    setTimeout(() => {
      map.current?.invalidateSize();
    }, 100);
  }, [isOpen, selectedLocation]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl h-[70vh] md:h-[80vh] rounded-xl overflow-hidden border border-border shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="absolute top-4 left-4 z-10 bg-card/80 backdrop-blur rounded-lg px-4 py-2 border border-border">
          <h3 className="font-display font-semibold text-foreground">
            Service Areas
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Click markers to see service locations
          </p>
        </div>

        <div ref={mapContainer} className="w-full h-full" />
      </div>
    </div>
  );
};

export default LocationMap;
