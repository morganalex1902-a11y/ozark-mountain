import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Truck, Mountain, Droplets, TreePine, Sunrise } from 'lucide-react';
import LocationMap from '@/components/LocationMap';
import heroImage from '@/assets/hero-mountains.jpg';
const cabinImage = 'https://cdn.builder.io/api/v1/image/assets%2Fac74af0e91684e859253068842865ac0%2Fd119848df086487990a319d28703f56f?format=webp&width=800&height=1200';
import rvImage from '@/assets/rv-camping.jpg';
import utvImage from '@/assets/activity-utv.jpg';
import waterfallImage from '@/assets/activity-waterfall.jpg';
import kayakingImage from '@/assets/activity-kayaking.jpg';
import hikingImage from '@/assets/activity-hiking.jpg';
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
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const activities = [
  { name: 'SXS / UTV Riding', image: utvImage, icon: Truck },
  { name: 'Hiking', image: hikingImage, icon: TreePine },
  { name: 'Kayaking & Canoeing', image: kayakingImage, icon: Droplets },
  { name: 'Waterfalls', image: waterfallImage, icon: Mountain },
  { name: 'Scenic Overlooks', image: overlookImage, icon: Sunrise },
];

export default function HomePage() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="image-overlay" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-cream mb-6 leading-tight"
          >
            Escape Into
            <span className="block text-gradient-sunset">Nature</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-cream/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Find peace and serenity in Ozark Mountains
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/contact" className="btn-primary inline-flex items-center gap-3">
              Contact Us for Availability
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-accent rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.span 
              variants={fadeUpVariants}
              className="text-accent uppercase tracking-widest text-sm font-medium"
            >
              The Experience
            </motion.span>
            <motion.h2 
              variants={fadeUpVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mt-4 mb-6"
            >
              Your Mountain Retreat Awaits
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Discover the tranquility of the Ozarks. Nestled among rolling hills and pristine forests,
              our retreat offers the perfect escape from the everyday. Whether you prefer the comfort of
              a cabin or the freedom of RV camping, peace and adventure await.
            </motion.p>
            <motion.div
              variants={fadeUpVariants}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/10 border border-accent/30"
            >
              <span className="text-accent font-medium">Projected Opening: Late Spring 2026</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="section-padding bg-card overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeUpVariants}
              className="text-accent uppercase tracking-widest text-sm font-medium"
            >
              Stay With Us
            </motion.span>
            <motion.h2 
              variants={fadeUpVariants}
              className="font-display text-4xl md:text-5xl text-cream mt-4"
            >
              Choose Your Escape
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cabins Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={scaleUpVariants}
              className="card-nature group cursor-pointer"
            >
              <Link to="/cabins">
                <div className="relative h-80 overflow-hidden bg-gradient-to-b from-green-900 via-green-800 to-green-900">
                  <img
                    src={cabinImage}
                    alt="Cozy cabin in the Ozarks"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-12 right-3 md:bottom-14 md:right-4 relative z-20">
                    <p className="text-xs md:text-sm text-gray-300 italic">Image shown is for inspiration only. Not the actual cabin.</p>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <Home className="w-6 h-6 text-accent" />
                      <h3 className="font-display text-2xl md:text-3xl text-white font-bold">Cabins</h3>
                    </div>
                    <p className="text-white/90 text-sm md:text-base">Cozy retreats sleeping up to 6 guests</p>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <span className="text-muted-foreground">Explore our cabins</span>
                  <ArrowRight className="w-5 h-5 text-accent transition-transform group-hover:translate-x-2" />
                </div>
              </Link>
            </motion.div>

            {/* RV Stays Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={scaleUpVariants}
              className="card-nature group cursor-pointer"
            >
              <Link to="/rv-stays">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={rvImage} 
                    alt="RV camping in the Ozarks" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Truck className="w-6 h-6 text-accent" />
                      <h3 className="font-display text-3xl text-cream">RV Stays</h3>
                    </div>
                    <p className="text-cream/70">Spacious sites in pristine nature</p>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <span className="text-muted-foreground">Learn more</span>
                  <ArrowRight className="w-5 h-5 text-accent transition-transform group-hover:translate-x-2" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recreation Opportunities Section */}
      <section className="section-padding bg-card overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.span
              variants={fadeUpVariants}
              className="text-accent uppercase tracking-widest text-sm font-medium"
            >
              Recreation Opportunities
            </motion.span>
            <motion.h2
              variants={fadeUpVariants}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mt-4 mb-8"
            >
              Explore the Ozark–St. Francis National Forests
            </motion.h2>
            <motion.div
              variants={fadeUpVariants}
              className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-3xl"
            >
              <p>
                The 1.2-million acre Ozark–St. Francis National Forests near Dover, AR 72837 offer endless opportunities for outdoor adventure and natural beauty. This region showcases some of the most scenic and picturesque landscapes in Arkansas, delivering the true spirit of the Natural State through world-class recreation areas and pristine wilderness.
              </p>
              <p>
                Visitors can enjoy a wide range of developed and dispersed recreation opportunities tailored to every outdoor enthusiast. Whether you're seeking adrenaline-pumping adventures or peaceful natural escapes, the National Forests provide the perfect setting for your next getaway.
              </p>
              <div className="bg-background/50 border border-accent/20 rounded-lg p-6 mt-8">
                <h3 className="font-display text-2xl text-cream mb-6">Popular Activities & Experiences</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-accent font-semibold mb-3">Water Recreation</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Kayaking & canoeing on scenic rivers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Floating down pristine waterways</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Boating on designated areas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Swimming at recreation areas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Fishing opportunities year-round</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-accent font-semibold mb-3">Land Adventures</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Hiking on established and wilderness trails</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Mountain biking on diverse terrain</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Four-wheeler and SXS/UTV riding</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Horseback riding through scenic routes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Nature photography at scenic overlooks</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-accent font-semibold mb-3">Outdoor Camping</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Developed campgrounds with amenities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Dispersed camping in wilderness areas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Picnicking at scenic areas</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-accent font-semibold mb-3">Hunting & Exploration</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Seasonal black bear hunting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>White-tail deer hunting opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>Cavern and cave tours</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="mt-6">
                From recreation areas and trail systems to wilderness zones and wild & scenic rivers, every location provides a unique way to connect with nature. Each destination offers something special—whether you're exploring stunning caverns, enjoying peaceful river views, or participating in seasonal hunting activities, there's something here for everyone.
              </p>
              <p>
                Conveniently located near Dover, AR 72837, the Ozark–St. Francis National Forests are easily accessible to visitors traveling across Arkansas, making them an ideal destination for weekend getaways or extended outdoor adventures.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeUpVariants}
              className="text-accent uppercase tracking-widest text-sm font-medium"
            >
              Adventures Await
            </motion.span>
            <motion.h2 
              variants={fadeUpVariants}
              className="font-display text-4xl md:text-5xl text-cream mt-4 mb-6"
            >
              Popular Activities to Discover
            </motion.h2>
            <motion.p 
              variants={fadeUpVariants}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              From thrilling UTV trails to peaceful paddling, discover endless adventures.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {activities.map((activity) => (
              <motion.div
                key={activity.name}
                variants={scaleUpVariants}
                className="card-nature group overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <activity.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                    <h3 className="font-display text-lg text-cream">{activity.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/activities" className="btn-outline inline-flex items-center gap-2">
              View All Activities
              <ArrowRight className="w-4 h-4" />
            </Link>
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

      {/* Final CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${overlookImage})` }}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto text-center px-6"
        >
          <motion.h2 
            variants={fadeUpVariants}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6"
          >
            Ready to Escape?
          </motion.h2>
          <motion.p 
            variants={fadeUpVariants}
            className="text-cream/70 text-lg mb-10 max-w-xl mx-auto"
          >
            Contact us today to check availability and begin planning your mountain retreat.
          </motion.p>
          <motion.div variants={fadeUpVariants}>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-3">
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
