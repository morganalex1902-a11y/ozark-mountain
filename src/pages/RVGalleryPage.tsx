import { motion } from 'framer-motion';
import { PhotoGallery } from '@/components/PhotoGallery';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fdd39744a57194dc596387163b8ef2460%2F36a8f4d5e2cb4d65aedf4d20f087f8ed?format=webp&width=800&height=1200',
    alt: 'RV Living Room',
    title: 'Living Area'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fdd39744a57194dc596387163b8ef2460%2Fd920f4eb64f24146b0475018eea97679?format=webp&width=800&height=1200',
    alt: 'RV Bedroom',
    title: 'Master Bedroom'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fdd39744a57194dc596387163b8ef2460%2F59c5f34ee9434e87bb264b0fb9c7d235?format=webp&width=800&height=1200',
    alt: 'RV Bathroom',
    title: 'Bathroom'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fdd39744a57194dc596387163b8ef2460%2F178766e16ede41ea94660ab0911b2268?format=webp&width=800&height=1200',
    alt: 'RV Bunk Beds',
    title: 'Bunk Room'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fdd39744a57194dc596387163b8ef2460%2F2febc49720844b16960d87484404192b?format=webp&width=800&height=1200',
    alt: 'RV Kitchen',
    title: 'Kitchen Area'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fdd39744a57194dc596387163b8ef2460%2F38b9e09bd8504b3d892131ab71ab1f0c?format=webp&width=800&height=1200',
    alt: 'RV Exterior',
    title: 'Exterior View'
  }
];

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

export default function RVGalleryPage() {
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
            RV Gallery
          </h1>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Explore our premium RV accommodations with modern amenities and comfortable living spaces
          </p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-12"
          >
            <motion.div variants={fadeUpVariants} className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl text-cream mb-4">
                Your Home Away from Home
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our RV accommodations feature fully equipped kitchens, comfortable bedrooms, and modern bathrooms for your comfort.
              </p>
            </motion.div>
          </motion.div>

          <PhotoGallery images={galleryImages} />
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-card">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUpVariants} className="font-display text-4xl text-cream mb-12">
              What's Included
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: 'Full Kitchen', desc: 'Equipped with stove, fridge, and cookware' },
                { title: 'Modern Bathroom', desc: 'Shower, toilet, and full bathroom amenities' },
                { title: 'Comfortable Beds', desc: 'Queen and bunk bed options for larger groups' },
                { title: 'Living Area', desc: 'Dining space and entertainment options' }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUpVariants}
                  className="bg-background/50 p-6 rounded-lg border border-accent/20"
                >
                  <h3 className="font-display text-xl text-cream mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl text-cream mb-6">Ready to Book?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Start your booking process today and reserve your perfect RV getaway in the Ozark Mountains.
          </p>
          <Link to="/rv-booking" className="btn-primary inline-flex items-center gap-3">
            Book Your Stay
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
