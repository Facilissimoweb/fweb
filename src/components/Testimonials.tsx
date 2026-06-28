import { useState } from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary">
            Cosa dicono del mio balzo
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {TESTIMONIALS.map((t, index) => {
            const isFlipped = !!flippedCards[t.id];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                onClick={() => toggleFlip(t.id)}
                className={`flip-card h-[300px] cursor-pointer group ${
                  isFlipped ? 'flipped' : ''
                }`}
              >
                <div className="flip-card-inner relative w-full h-full shadow-lg rounded-[40px]">
                  {/* Front Side */}
                  <div className="flip-card-front absolute inset-0 bg-white/75 dark:bg-[#1C122C]/75 backdrop-blur-lg p-10 flex flex-col justify-center items-center rounded-[40px] text-center border-2 border-[#DDF247] shadow-[0_0_20px_rgba(221,242,71,0.15)] group-hover:shadow-[0_0_30px_rgba(221,242,71,0.35)] transition-all duration-300">
                    <Quote className="text-secondary-fixed-dim w-12 h-12 mb-4 rotate-180" />
                    <p className="font-sans italic text-on-surface-variant text-sm md:text-base leading-relaxed">
                      {t.quote}
                    </p>
                    <span className="text-xs text-outline/40 uppercase tracking-widest mt-4 block md:hidden font-semibold">
                      Tocca per girare
                    </span>
                  </div>

                  {/* Back Side */}
                  <div
                    className={`flip-card-back absolute inset-0 ${t.colorClass} bg-opacity-85 dark:bg-opacity-85 backdrop-blur-lg p-10 flex flex-col justify-center items-center rounded-[40px] text-center border-2 border-[#DDF247] shadow-[0_0_20px_rgba(221,242,71,0.15)]`}
                  >
                    <h4 className="font-headline text-xl md:text-2xl font-bold mb-2">
                      {t.author}
                    </h4>
                    <p className="font-sans text-xs md:text-sm font-medium tracking-wide opacity-90">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
