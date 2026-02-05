import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import LocationMap from '@/components/LocationMap';
import utvImage from '@/assets/activity-utv.jpg';
import hikingImage from '@/assets/activity-hiking.jpg';
import kayakingImage from '@/assets/activity-kayaking.jpg';
import waterfallImage from '@/assets/activity-waterfall.jpg';
import overlookImage from '@/assets/activity-overlook.jpg';

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

const activities = [
  {
    title: 'SXS / UTV Riding',
    description: 'Experience the thrill of off-road adventure on scenic mountain trails. The Ozarks offer some of the best UTV riding in the region with trails for all skill levels.',
    image: utvImage,
  },
  {
    title: 'Hiking',
    description: 'Explore miles of pristine hiking trails through ancient forests. From easy nature walks to challenging mountain treks, there\'s a trail for everyone.',
    image: hikingImage,
  },
  {
    title: 'Kayaking & Canoeing',
    description: 'Paddle along peaceful rivers and lakes surrounded by stunning scenery. The crystal-clear waters of the Ozarks are perfect for a relaxing day on the water. The Buffalo National River is a short drive away.',
    image: kayakingImage,
  },
  {
    title: 'Waterfalls',
    description: 'Discover hidden waterfalls cascading through lush forest landscapes. The Ozarks are home to numerous beautiful falls, each with its own unique character.',
    image: waterfallImage,
  },
  {
    title: 'Scenic Overlooks',
    description: 'Take in breathtaking panoramic views from mountaintop vistas. Watch the sunrise over misty valleys or enjoy spectacular sunsets over rolling hills.',
    image: overlookImage,
  },
];

export default function ActivitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${overlookImage})` }}
        />
        <div className="image-overlay" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-accent uppercase tracking-widest text-sm font-medium">Explore</span>
          <h1 className="font-display text-5xl md:text-7xl text-cream mt-4">
            Activities
          </h1>
        </motion.div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-6">
              Adventure Awaits in the Ozarks
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The Ozark Mountains offer endless opportunities for outdoor adventure and exploration. 
              Whether you seek the thrill of off-road trails or the tranquility of a peaceful paddle, 
              you'll find it here in our corner of Arkansas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="section-padding bg-card">
        <div className="max-w-6xl mx-auto space-y-16">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                <span className="text-accent uppercase tracking-widest text-sm font-medium">
                  Experience
                </span>
                <h3 className="font-display text-3xl md:text-4xl text-cream mt-2 mb-4">
                  {activity.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
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
      <section className="section-padding bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-6">
            Plan Your Adventure
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Ready to explore the Ozarks? Contact us to plan your stay and discover all the activities waiting for you.
          </p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-3">
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
