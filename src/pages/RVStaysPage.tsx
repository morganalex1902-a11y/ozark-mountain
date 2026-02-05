import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LocationMap from '@/components/LocationMap';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export default function RVStaysPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="font-display text-5xl md:text-7xl text-cream mt-4">
            RV Stays
          </h1>
        </motion.div>
      </section>

      {/* Placeholder Section */}
      <section className="section-padding bg-background min-h-[400px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
            RV Stays
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            RV site information coming in Phase 2. For inquiries, please contact us.
          </p>
          <Link to="/contact" className="btn-outline inline-flex items-center gap-3">
            Contact Us for More Information
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Location Section */}
      <section className="section-padding bg-card overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <div className="text-center space-y-6">
              <div className="space-y-3">
                <h3 className="font-display text-2xl md:text-3xl text-cream">
                  Our Service Areas
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We serve multiple locations across Michigan
                </p>
              </div>

              <button
                onClick={() => setIsMapOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-colors"
              >
                <MapPin className="w-5 h-5" />
                View Service Areas on Map
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Map Modal */}
      <LocationMap isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </>
  );
}
