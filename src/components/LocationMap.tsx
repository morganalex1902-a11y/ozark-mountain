import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LocationMap.css";

const locations = [
  { name: "Dover, AR", lat: 35.40147, lng: -93.11434 },
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

const LocationMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Create map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([42.5, -83.1], 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(map.current);

      // Add markers for each location
      locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng], {
          icon: L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        });

        marker.bindPopup(`<strong>${location.name}</strong><br/>Our Service Area`);
        marker.addTo(map.current!);
      });

      // Fit bounds to all markers
      const bounds = L.latLngBounds(locations.map(l => [l.lat, l.lng]));
      map.current.fitBounds(bounds, { padding: [50, 50] });
    }

    // Resize map when container is visible
    setTimeout(() => {
      map.current?.invalidateSize();
    }, 100);
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <h3 className="font-display text-2xl md:text-3xl text-cream">
          Our Service Areas
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We serve multiple locations across Arkansas. Click the markers to see more details.
        </p>
      </div>

      {/* Map Container */}
      <div className="rounded-2xl border border-border shadow-lg h-96 md:h-[500px] relative z-10">
        <div ref={mapContainer} className="w-full h-full rounded-2xl" style={{ position: 'relative' }} />
      </div>

      {/* Service Areas Buttons */}
      <div className="mt-10 pt-10 border-t border-border/30">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {locations.map((location) => (
            <button
              key={location.name}
              className="group relative px-4 py-3 rounded-full bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:bg-primary/10 text-cream text-sm font-medium"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent group-hover:bg-accent/80 transition-all duration-300"></span>
                {location.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
