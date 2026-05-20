import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
      <section className="section-padding bg-background min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            variants={fadeUpVariants}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/30 mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-accent"
              />
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="font-display text-4xl md:text-5xl text-cream mb-6"
          >
            Coming Soon
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-muted-foreground text-lg mb-8 leading-relaxed"
          >
            RV accommodations are currently in development. Check back soon for an exciting new way to experience the Ozark Mountains. We're working hard to bring you premium RV stays that combine comfort with nature.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 border border-accent/30 mb-10"
          >
            <span className="text-accent font-medium">Launching Soon</span>
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
