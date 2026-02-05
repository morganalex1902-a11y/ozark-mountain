import "./LocationMap.css";

const locations = [
  { name: "Dover", lat: 35.40147, lng: -93.11434, address: "21454 SR 7 North, Dover AR 72837" }
];

const LocationMap = () => {

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
