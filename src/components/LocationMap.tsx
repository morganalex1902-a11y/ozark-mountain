import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LocationMap.css";

const locations = [
  { name: "Dover", lat: 35.40147, lng: -93.11434 }
];

const LocationMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Create map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([35.40147, -93.11434], 10);

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

      {/* Get Directions Button */}
      <div className="mt-8 flex justify-center">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${locations[0].lat},${locations[0].lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Get Directions
        </a>
      </div>
    </div>
  );
};

export default LocationMap;
