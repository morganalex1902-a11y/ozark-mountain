import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LocationMap.css";

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
        L.marker([location.lat, location.lng])
          .bindPopup(`<strong>${location.name}</strong><br/>Our Service Area`)
          .addTo(map.current!);
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
          We serve multiple locations across Michigan. Click the markers to see more details.
        </p>
      </div>

      {/* Map Container */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-lg h-96 md:h-[500px]">
        <div ref={mapContainer} className="w-full h-full" />
      </div>
    </div>
  );
};

export default LocationMap;
