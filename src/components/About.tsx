import { motion } from 'motion/react';
import { SKILLS } from '../data';

export default function About() {
  return (
    <section id="about" className="py-24 bg-surface-container overflow-hidden scroll-mt-[110px]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Beautiful Designer Portrait */}
        <div className="relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-white shadow-2xl overflow-hidden relative z-10"
          >
            <img
              className="w-full h-full object-cover grayscale contrast-[115%] hover:grayscale-0 transition-all duration-300"
              alt="Portrait of M.Teresa Rogani - Facilissimo Web"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8EFj_RiG0Ti-3DFb8yfU67PqeCHwxxG9MXiYEPtaXyWZHvQaKNbEI9PjlL45SxLvhzoH0j2a5jiKWuE7IJimy5HcouumXPZS1PLaauCG0LBQoU4CHR0c7UH6i1hFu-z2kl3h2z2afLzDw_68DR2EqQBN0dLg8zanboa14Rpx3cDWk96l2ZKKlVJMJAD6qgk_lFxfmCybGoxF0pGNBYOFkdjEag2rVJE5oNg0o2rkfTuxTqRNU4CIe6lLz-8gWGtRDXITSw4P_N_E"
            />
          </motion.div>
          {/* Decorative glowing ambient shapes */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-container/40 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary-container/40 rounded-full blur-2xl animate-pulse"></div>
        </div>

        {/* Right: Bio & Skills */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary mb-6">
            La Mia Formazione, I Vostri Risultati
          </h2>
          <div className="font-sans text-base text-on-surface-variant mb-8 space-y-4 leading-relaxed">
            <p className="font-medium text-lg text-primary">
              Sono M. Teresa Rogani.
            </p>
            <p>
              Diplomata in <strong>grafica pubblicitaria</strong>, laureata in <strong>comunicazione visiva</strong> e certificata come <strong>Social Lead's Manager (200 ore)</strong>. Aiuto microimprese e liberi professionisti a strutturare una presenza online d'eccellenza, unendo design strategico e canali di acquisizione clienti concreti.
            </p>
          </div>

          {/* Interactive Skill Progress Bars */}
          <div className="space-y-6">
            {SKILLS.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between mb-2 font-sans text-sm font-semibold tracking-wide text-primary">
                  <span>{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="h-3 w-full bg-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.8,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className={`skill-bar h-full ${skill.colorClass} wave-fill rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
