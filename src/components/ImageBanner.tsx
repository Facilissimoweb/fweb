import { motion } from 'motion/react';

interface ImageBannerProps {
  images: string[];
  direction?: 'left' | 'right';
  speedClass?: string;
  overlayText?: string;
}

export default function ImageBanner({
  images,
  direction = 'left',
  overlayText,
}: ImageBannerProps) {
  // Duplicate the list of images to ensure the marquee has enough content to scroll seamlessly
  const doubledImages = [...images, ...images, ...images];

  return (
    <div className="w-full h-[300px] bg-surface-container-low dark:bg-surface-container-lowest py-2 relative overflow-hidden border-t border-b border-outline-variant/10 flex items-center select-none">
      {/* Soft gradient edge fade effect for premium visual finish */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-surface-container-low dark:from-surface-container-lowest to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-surface-container-low dark:from-surface-container-lowest to-transparent z-10 pointer-events-none" />

      {/* Scrolling Marquee Track */}
      <div
        className={`flex items-center gap-6 ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {doubledImages.map((imgUrl, index) => (
          <div
            key={`${imgUrl}-${index}`}
            className="w-[360px] h-[260px] flex-shrink-0 relative rounded-2xl overflow-hidden shadow-md group border border-outline-variant/10 bg-surface-container transition-all duration-300 hover:shadow-xl hover:border-primary/20"
          >
            <img
              src={imgUrl}
              alt="Galleria di Design e Comunicazione"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 grayscale contrast-[115%] group-hover:grayscale-0"
              loading="lazy"
            />
            {/* Elegant glassmorphism overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-sm font-semibold text-primary tracking-wide">
                Facilissimo Web Creative Studio
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating typography overlay if text is provided */}
      {overlayText && (
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none flex items-center justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-surface/80 dark:bg-surface-container-highest/80 backdrop-blur-md border border-outline-variant/15 px-6 py-3 rounded-full shadow-lg"
          >
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-primary">
              {overlayText}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
