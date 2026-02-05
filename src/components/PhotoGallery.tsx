import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

interface PhotoGalleryProps {
  images: GalleryImage[];
}

export function PhotoGallery({ images }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };
  
  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-center justify-center">
              <span className="text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-display text-lg">
                {image.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-cream/80 hover:text-cream transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 p-3 text-cream/80 hover:text-cream transition-colors bg-card/50 rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 p-3 text-cream/80 hover:text-cream transition-colors bg-card/50 rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="w-full h-full object-contain rounded-lg"
              />
              <p className="text-center text-cream mt-4 font-display text-xl">
                {images[selectedIndex].title}
              </p>
            </motion.div>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === selectedIndex ? 'bg-accent' : 'bg-cream/30 hover:bg-cream/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
