import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Camera } from 'lucide-react';
import ProjectWizard from './ProjectWizard';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-surface-container-highest scroll-mt-[110px]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Centered Header from Photo */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-5 py-1.5 rounded-full bg-primary/10 border border-[#DDF247]/30 text-[#DDF247] font-mono text-[10px] font-bold tracking-widest uppercase mb-4"
          >
            Inizia Ora
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-headline text-3xl md:text-5xl font-black text-primary tracking-tight uppercase leading-tight mb-4"
          >
            Parliamo del Vostro Progetto
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed"
          >
            Compilate il modulo qui sotto. Riceveremo i vostri dati e vi ricontatteremo per fissare una breve chiamata gratuita.
          </motion.p>
        </div>

        {/* Form & Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contacts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex flex-col justify-center h-full"
          >
            <h3 className="font-headline text-xl md:text-2xl font-bold text-primary mb-6">
              Contatti Diretti
            </h3>
            <p className="font-sans text-xs md:text-sm text-on-surface-variant mb-8 leading-relaxed">
              Preferite un contatto immediato? Sentitevi liberi di scriverci direttamente o di seguirci sui canali social ufficiali.
            </p>

            <div className="space-y-4">
              {/* Email contact */}
              <a
                href="mailto:facilissimoweb.mc@gmail.com"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 bg-white dark:bg-[#1C122C]/50 rounded-full shadow-sm border border-outline-variant/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary-container/30 transition-all duration-300">
                  <Mail size={16} />
                </div>
                <span className="font-sans text-xs md:text-sm font-semibold text-on-surface group-hover:text-secondary transition-colors">
                  facilissimoweb.mc@gmail.com
                </span>
              </a>

              {/* Phone contact */}
              <a
                href="tel:+393793603321"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 bg-white dark:bg-[#1C122C]/50 rounded-full shadow-sm border border-outline-variant/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary-container/30 transition-all duration-300">
                  <Phone size={16} />
                </div>
                <span className="font-sans text-xs md:text-sm font-semibold text-on-surface group-hover:text-secondary transition-colors">
                  +39 379 360 3321
                </span>
              </a>

              {/* Instagram contact */}
              <a
                href="https://instagram.com/facilissimoweb"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 bg-white dark:bg-[#1C122C]/50 rounded-full shadow-sm border border-outline-variant/10 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary-container/30 transition-all duration-300">
                  <Camera size={16} />
                </div>
                <span className="font-sans text-xs md:text-sm font-semibold text-on-surface group-hover:text-secondary transition-colors">
                  @facilissimoweb
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3-step Interactive ProjectWizard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 w-full"
          >
            <ProjectWizard />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
