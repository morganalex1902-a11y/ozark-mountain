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
      <div className="rounded-2xl border border-border shadow-lg h-96 md:h-[500px] relative z-10 overflow-hidden">
        <iframe
          title="Google Map - Dover AR"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.2532508522667!2d-93.11434!3d35.40147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c8a9b3d9b3d9b3%3A0x1234567890!2s21454%20SR%207%20N%2C%20Dover%2C%20AR%2072837!5e0!3m2!1sen!2sus!4v1234567890`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
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
