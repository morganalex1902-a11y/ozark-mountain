import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhotoGallery } from '@/components/PhotoGallery';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';

const allImages = [
  // Cabins
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2F65f7149b6e744edf9d649d7a825379d9%2Fcb95dcceafdc4cfe8752f048df08a87d?format=webp&width=800&height=1200',
    alt: 'Cabin Interior',
    title: 'Cabin Living',
    category: 'cabins'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fac5252b1c42047769d1ddf86d1c46ede%2Fa2fdee234e234bba9006927fb2b09470?format=webp&width=800&height=1200',
    alt: 'Cozy Cabin Exterior',
    title: 'Cabin Exterior at Night',
    category: 'cabins'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fac5252b1c42047769d1ddf86d1c46ede%2Fe768d719ca2741628d2de3c013f471e9?format=webp&width=800&height=1200',
    alt: 'Cabin Forest Setting',
    title: 'Woodland Setting',
    category: 'cabins'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fac5252b1c42047769d1ddf86d1c46ede%2F0f4adb417c804f79ad7a02814c2740d6?format=webp&width=800&height=1200',
    alt: 'Cabin Master Bedroom',
    title: 'Master Bedroom',
    category: 'cabins'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fac5252b1c42047769d1ddf86d1c46ede%2F4ce61d9928fe418a87b59658b8e63f24?format=webp&width=800&height=1200',
    alt: 'Cabin Secondary Bedroom',
    title: 'Guest Bedroom',
    category: 'cabins'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fac5252b1c42047769d1ddf86d1c46ede%2F9a7eefcc4d5b4ef0907117769fbc0918?format=webp&width=800&height=1200',
    alt: 'Cabin Living Room',
    title: 'Living Room Space',
    category: 'cabins'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fac5252b1c42047769d1ddf86d1c46ede%2F37b4b6b25f5b416bae4780e39cf69955?format=webp&width=800&height=1200',
    alt: 'Cabin Kitchen and Dining',
    title: 'Kitchen & Dining Area',
    category: 'cabins'
  },
  // RVs
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fdd39744a57194dc596387163b8ef2460%2F36a8f4d5e2cb4d65aedf4d20f087f8ed?format=webp&width=800&height=1200',
    alt: 'RV Living Room',
    title: 'RV Living Area',
    category: 'rv'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fdd39744a57194dc596387163b8ef2460%2Fd920f4eb64f24146b0475018eea97679?format=webp&width=800&height=1200',
    alt: 'RV Bedroom',
    title: 'RV Master Bedroom',
    category: 'rv'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fdd39744a57194dc596387163b8ef2460%2F59c5f34ee9434e87bb264b0fb9c7d235?format=webp&width=800&height=1200',
    alt: 'RV Bathroom',
    title: 'RV Bathroom',
    category: 'rv'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fdd39744a57194dc596387163b8ef2460%2F178766e16ede41ea94660ab0911b2268?format=webp&width=800&height=1200',
    alt: 'RV Bunk Beds',
    title: 'RV Bunk Room',
    category: 'rv'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fdd39744a57194dc596387163b8ef2460%2F2febc49720844b16960d87484404192b?format=webp&width=800&height=1200',
    alt: 'RV Kitchen',
    title: 'RV Kitchen Area',
    category: 'rv'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets%2Fdd39744a57194dc596387163b8ef2460%2F38b9e09bd8504b3d892131ab71ab1f0c?format=webp&width=800&height=1200',
    alt: 'RV Exterior',
    title: 'RV Exterior',
    category: 'rv'
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

type FilterCategory = 'all' | 'cabins' | 'rv';

export default function GalleryPage() {
  const [filter, setFilter] = useState<FilterCategory>('all');

  const filteredImages = filter === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === filter);

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
            Accommodations Gallery
          </h1>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Explore all our premium accommodations - from cozy cabins to fully-equipped RVs
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
              <h2 className="font-display text-4xl md:text-5xl text-cream mb-6">
                Explore Our Properties
              </h2>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                {[
                  { id: 'all' as FilterCategory, label: 'All Properties' },
                  { id: 'cabins' as FilterCategory, label: 'Cabins' },
                  { id: 'rv' as FilterCategory, label: 'RV Stays' }
                ].map(btn => (
                  <button
                    key={btn.id}
                    onClick={() => setFilter(btn.id)}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                      filter === btn.id
                        ? 'bg-accent text-background'
                        : 'bg-card border border-accent/30 text-cream hover:border-accent/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      {btn.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={filter}
          >
            <PhotoGallery images={filteredImages} />
          </motion.div>
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
            <motion.h2 variants={fadeUpVariants} className="font-display text-4xl text-cream mb-12 text-center">
              Choose Your Perfect Stay
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Our Cabins',
                  features: [
                    'Cozy & intimate atmosphere',
                    'Sleeps up to 6 people',
                    'Fully equipped kitchen',
                    'High-Speed Wi-Fi (Fiber Optic)',
                    'Modern amenities',
                    'Picnic table & charcoal grill',
                    'Fire pit for gatherings'
                  ],
                  cta: '/cabins'
                },
                {
                  title: 'RV Stays',
                  features: [
                    'Modern RV accommodations',
                    'Multiple room options',
                    'Full kitchen & bathroom',
                    'Comfortable sleeping areas',
                    'Premium amenities'
                  ],
                  cta: '/rv-stays'
                }
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUpVariants}
                  className="bg-background/50 p-8 rounded-lg border border-accent/20"
                >
                  <h3 className="font-display text-2xl text-cream mb-4">{section.title}</h3>
                  <ul className="space-y-3 mb-6">
                    {section.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={section.cta} className="btn-outline inline-flex items-center gap-2 text-sm">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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
          <h2 className="font-display text-4xl text-cream mb-6">Ready to Book Your Stay?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Start planning your Ozark Mountain Escape adventure today.
          </p>
          <Link to="/booking" className="btn-primary inline-flex items-center gap-3">
            Book Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
