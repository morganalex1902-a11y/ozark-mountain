import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah & Mike Johnson',
    location: 'Dallas, TX',
    quote: "The most peaceful getaway we've ever experienced. Waking up to the mountain views and complete silence was exactly what we needed. The cabin was spotless and had everything we could want.",
    rating: 5,
  },
  {
    name: 'The Thompson Family',
    location: 'Little Rock, AR',
    quote: "Our kids still talk about the hiking trails and the fire pit nights. Ozark Mountain Escape gave us quality family time without any distractions. We're already planning our next visit!",
    rating: 5,
  },
  {
    name: 'David Chen',
    location: 'Austin, TX',
    quote: "Perfect spot for a solo retreat. I spent three days writing, hiking, and reconnecting with nature. The UTV trails nearby were an unexpected bonus. Highly recommend!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-card">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent uppercase tracking-widest text-sm font-medium">
            Guest Stories
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-cream mt-4">
            What Our Guests Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative p-8 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors group"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Quote className="w-4 h-4 text-background" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 pt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-cream/80 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div>
                <p className="font-display text-lg text-cream">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}