import { motion } from 'framer-motion';
import { ArrowRight, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

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

      {/* Coming Soon Section */}
      <section className="section-padding bg-background min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            variants={fadeUpVariants}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/30 mb-6">
              <Truck className="w-10 h-10 text-accent" />
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="font-display text-4xl md:text-5xl text-cream mb-6 text-center"
          >
            RV Sites Coming Soon
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-muted-foreground text-lg mb-10 leading-relaxed text-center"
          >
            We're developing premium RV camping sites in the heart of the Ozark Mountains. Experience the perfect blend of nature and modern comfort with our upcoming RV accommodations.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="bg-card border border-accent/20 rounded-xl p-8 mb-10"
          >
            <h3 className="font-display text-2xl text-cream mb-6 text-center">RV Site Options Coming Soon</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-cream font-semibold">Standard RV Sites</p>
                  <p className="text-muted-foreground text-sm">Master bedroom + living area setup</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-cream font-semibold">Deluxe RV Sites</p>
                  <p className="text-muted-foreground text-sm">Master bedroom + bunk room + living area</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-background/50 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-cream font-semibold">Premium RV Suites</p>
                  <p className="text-muted-foreground text-sm">All amenities + premium furnishings</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 border border-accent/30 mb-10 w-full justify-center"
          >
            <span className="text-accent font-medium">Launching Late Spring 2026</span>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/" className="btn-primary inline-flex items-center gap-3">
              Back to Home
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/gallery" className="btn-outline inline-flex items-center gap-3">
              View Gallery
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
