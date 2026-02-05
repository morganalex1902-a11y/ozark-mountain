import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Wifi, Flame, Coffee, MapPin } from 'lucide-react';
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

const features = [
  { icon: Users, title: 'Accommodates 6 People', description: '392 sq ft - Queen Bed, Bunk Bed, and Sleeper Sofa' },
  { icon: Flame, title: 'Fireplaces', description: 'Cozy Electric Fireplace for Ambience' },
  { icon: Coffee, title: 'Fully Equipped Kitchen', description: 'Microwave, Refrigerator, Keurig, Electric Skillet, Crockpot, Hot Plate (no Stove)' },
  { icon: Wifi, title: 'Modern Comfort', description: 'Walk-in Shower and Essential Amenities' },
];

export default function CabinsPage() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-background">
        <div className="image-overlay" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-accent uppercase tracking-widest text-sm font-medium">Stay With Us</span>
          <h1 className="font-display text-5xl md:text-7xl text-cream mt-4">
            Our Cabins
          </h1>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeUpVariants}
              className="font-display text-3xl md:text-4xl text-cream mb-6"
            >
              Comfort Meets Wilderness
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Our thoughtfully designed cabins offer the perfect blend of rustic charm and modern comfort.
              Nestled among the trees in a secluded Ozark setting, each cabin provides a peaceful sanctuary
              where you can truly disconnect and recharge. Whether you're seeking a romantic getaway or a
              family adventure, our cabins are your home in the heart of the Ozarks.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="section-padding bg-card overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-3xl md:text-4xl text-cream mb-4"
            >
              Our Cabin
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariants}
            className="group relative h-96 md:h-[500px] rounded-2xl overflow-hidden border border-border cursor-pointer"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fac74af0e91684e859253068842865ac0%2Fd119848df086487990a319d28703f56f?format=webp&width=800&height=1200"
              alt="Cozy cabin in wooded Ozark setting"
              className="w-full h-full object-cover transition-all duration-300 blur-sm group-hover:blur-none"
            />
            <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
              <p className="text-white text-lg md:text-2xl italic text-center px-6 font-bold">
                Image shown is for inspiration only. Not the actual cabin.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeUpVariants}
              className="text-accent uppercase tracking-widest text-sm font-medium"
            >
              Amenities
            </motion.span>
            <motion.h2 
              variants={fadeUpVariants}
              className="font-display text-3xl md:text-4xl text-cream mt-4"
            >
              Everything You Need
            </motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUpVariants}
                className="text-center p-6"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl text-cream mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
            <LocationMap />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden bg-background">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 max-w-3xl mx-auto text-center px-6"
        >
          <motion.h2 
            variants={fadeUpVariants}
            className="font-display text-3xl md:text-4xl text-cream mb-6"
          >
            Ready to Book Your Stay?
          </motion.h2>
          <motion.p 
            variants={fadeUpVariants}
            className="text-cream/70 mb-8"
          >
            Contact us to check availability and learn more about our cabins.
          </motion.p>
          <motion.div variants={fadeUpVariants}>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-3">
              Contact Us for Availability
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
