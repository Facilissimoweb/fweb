import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Camera, Loader2, Check } from 'lucide-react';

export default function Contact() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [messaggio, setMessaggio] = useState('');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !messaggio) return;

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setNome('');
      setEmail('');
      setMessaggio('');

      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-surface-container-highest scroll-mt-[110px] pl-[59px] pr-[15px]">
      <div className="max-w-[1800px] mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Column: Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary mb-6">
            Pronto a Partire?
          </h2>
          <p className="font-sans text-base md:text-lg text-on-surface-variant mb-12 leading-relaxed">
            Hai un progetto in mente o vuoi semplicemente fare un saluto? Scrivimi e semplifichiamo insieme la tua presenza sul web.
          </p>

          <div className="space-y-6">
            {/* Email contact */}
            <a
              href="mailto:facilissimoweb.mc@gmail.com"
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary-container/30 transition-all duration-300">
                <Mail size={20} />
              </div>
              <span className="font-sans text-sm md:text-base font-semibold text-on-surface group-hover:text-secondary transition-colors">
                facilissimoweb.mc@gmail.com
              </span>
            </a>

            {/* Phone contact */}
            <a
              href="tel:+393793603321"
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary-container/30 transition-all duration-300">
                <Phone size={20} />
              </div>
              <span className="font-sans text-sm md:text-base font-semibold text-on-surface group-hover:text-secondary transition-colors">
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
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-secondary group-hover:scale-110 group-hover:bg-secondary-container/30 transition-all duration-300">
                <Camera size={20} />
              </div>
              <span className="font-sans text-sm md:text-base font-semibold text-on-surface group-hover:text-secondary transition-colors">
                @facilissimoweb
              </span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Interactive Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-white p-8 md:p-10 rounded-[40px] shadow-xl"
            id="contact-form"
          >
            {/* Nome Field */}
            <div className="relative floating-label">
              <input
                id="name"
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder=" "
                className="w-full bg-surface-container border-none rounded-2xl py-4 font-sans text-base text-on-surface focus:ring-2 focus:ring-primary focus:bg-white transition-all peer outline-none"
              />
              <label
                htmlFor="name"
                className="absolute left-6 top-4 text-on-surface-variant transition-all pointer-events-none font-sans text-base peer-focus:translate-y-[-24px] peer-focus:scale-[0.85] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:translate-y-[-24px] peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:text-tertiary origin-top-left"
              >
                Nome
              </label>
            </div>

            {/* Email Field */}
            <div className="relative floating-label">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="w-full bg-surface-container border-none rounded-2xl py-4 font-sans text-base text-on-surface focus:ring-2 focus:ring-primary focus:bg-white transition-all peer outline-none"
              />
              <label
                htmlFor="email"
                className="absolute left-6 top-4 text-on-surface-variant transition-all pointer-events-none font-sans text-base peer-focus:translate-y-[-24px] peer-focus:scale-[0.85] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:translate-y-[-24px] peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:text-tertiary origin-top-left"
              >
                Email
              </label>
            </div>

            {/* Messaggio Field */}
            <div className="relative floating-label">
              <textarea
                id="message"
                required
                rows={4}
                value={messaggio}
                onChange={(e) => setMessaggio(e.target.value)}
                placeholder=" "
                className="w-full bg-surface-container border-none rounded-2xl py-4 font-sans text-base text-on-surface focus:ring-2 focus:ring-primary focus:bg-white transition-all peer outline-none resize-none"
              />
              <label
                htmlFor="message"
                className="absolute left-6 top-4 text-on-surface-variant transition-all pointer-events-none font-sans text-base peer-focus:translate-y-[-24px] peer-focus:scale-[0.85] peer-focus:text-tertiary peer-[:not(:placeholder-shown)]:translate-y-[-24px] peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:text-tertiary origin-top-left"
              >
                Messaggio
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary text-on-primary py-4 rounded-full font-headline text-lg font-semibold flex items-center justify-center gap-3 cat-pounce shadow-lg cursor-pointer disabled:opacity-80"
            >
              {status === 'idle' && <span>Invia Messaggio</span>}
              {status === 'loading' && (
                <>
                  <span>Invio in corso...</span>
                  <Loader2 className="animate-spin w-5 h-5" />
                </>
              )}
              {status === 'success' && (
                <>
                  <span>Messaggio Inviato!</span>
                  <Check className="w-5 h-5 text-emerald-300" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
