import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Briefcase, Send } from 'lucide-react';

export default function Panorama() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    azienda: '',
    messaggio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Nuova Compilazione Panorama*%0A%0A*Nome:* ${formData.nome}%0A*Cognome:* ${formData.cognome}%0A*Email:* ${formData.email}%0A*Telefono:* ${formData.telefono}%0A*Azienda:* ${formData.azienda}%0A*Messaggio:* ${formData.messaggio}`;
    window.open(`https://wa.me/393793603321?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background dark:bg-surface-dim pt-40 pb-24 pl-[59px] pr-[15px] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1800px] w-full"
      >
        <div className="text-center mb-12">
          <div className="flex flex-col gap-1 mb-4">
            <h2 className="font-headline text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-primary leading-tight">
              STRUMENTO DI ANALISI
            </h2>
            <p className="font-sans text-[8px] sm:text-[9px] md:text-xs text-on-surface-variant font-medium tracking-wider uppercase leading-snug">
              CONSULENZA PERSONALIZZATA SULLA TUA PRESENZA ONLINE
            </p>
          </div>
          <h1 className="text-4xl md:text-7xl font-headline font-black text-on-surface mb-8 tracking-tight leading-[0.9]">
            Compila il Tuo <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Panorama</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-[1800px] mx-auto leading-relaxed font-medium">
            Ottieni una visione chiara del tuo business digitale. Inserisci i tuoi dati per ricevere una strategia su misura.
          </p>
        </div>

        <div className="bg-surface/40 dark:bg-surface-dim/40 backdrop-blur-2xl border border-outline-variant/30 rounded-[40px] p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden group">
          {/* Decorative gradients */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-colors" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full group-hover:bg-secondary/30 transition-colors" />

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-6">
              <div className="relative">
                <label className="text-xs font-black uppercase tracking-widest text-primary ml-4 mb-2 block">Nome</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
                  <input
                    type="text" name="nome" value={formData.nome} onChange={handleChange} required
                    placeholder="Il tuo nome"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-xs font-black uppercase tracking-widest text-primary ml-4 mb-2 block">Cognome</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
                  <input
                    type="text" name="cognome" value={formData.cognome} onChange={handleChange} required
                    placeholder="Il tuo cognome"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-xs font-black uppercase tracking-widest text-primary ml-4 mb-2 block">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    placeholder="la-tua@email.com"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <label className="text-xs font-black uppercase tracking-widest text-primary ml-4 mb-2 block">Telefono</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
                  <input
                    type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required
                    placeholder="+39 000 000 0000"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-xs font-black uppercase tracking-widest text-primary ml-4 mb-2 block">Azienda / Progetto</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50" size={18} />
                  <input
                    type="text" name="azienda" value={formData.azienda} onChange={handleChange}
                    placeholder="Nome attività"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-xs font-black uppercase tracking-widest text-primary ml-4 mb-2 block">Messaggio / Obiettivi</label>
                <div className="relative">
                  <textarea
                    name="messaggio" value={formData.messaggio} onChange={handleChange}
                    placeholder="Descrivi brevemente cosa vorresti analizzare..."
                    rows={1}
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-2xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none min-h-[58px]"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 pt-6">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -12px rgba(113,83,129,0.4)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-headline font-black uppercase tracking-[0.2em] py-6 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all"
              >
                Invia su WhatsApp
                <Send size={20} />
              </motion.button>
              <p className="text-center text-[10px] text-on-surface-variant mt-4 opacity-60 uppercase font-bold tracking-widest">
                I dati verranno inviati direttamente per avviare la conversazione
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
