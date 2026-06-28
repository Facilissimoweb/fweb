import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, FileText, Send, Sparkles, PhoneCall } from 'lucide-react';

interface FormData {
  businessName: string;
  userName: string;
  sector: string;
  services: string[];
  mainGoal: string;
  budgetRange: string;
  email: string;
  phone: string;
  urgency: string;
}

const INITIAL_FORM_DATA: FormData = {
  businessName: '',
  userName: '',
  sector: '',
  services: [],
  mainGoal: '',
  budgetRange: '',
  email: '',
  phone: '',
  urgency: '',
};

export default function ProjectWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [report, setReport] = useState<any | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const current = prev.services;
      if (current.includes(service)) {
        return { ...prev, services: current.filter((s) => s !== service) };
      } else {
        return { ...prev, services: [...current, service] };
      }
    });
  };

  const validateStep = () => {
    if (step === 1) {
      return (
        formData.businessName.trim() !== '' &&
        formData.userName.trim() !== '' &&
        formData.sector.trim() !== ''
      );
    }
    if (step === 2) {
      return formData.services.length > 0 && formData.mainGoal !== '' && formData.budgetRange !== '';
    }
    if (step === 3) {
      return formData.email.trim() !== '' && formData.phone.trim() !== '' && formData.urgency !== '';
    }
    return false;
  };

  const handleNext = () => {
    if (validateStep() && step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const generateReport = (data: FormData) => {
    // Generate tailored, highly personalized professional advice based on inputs
    const { sector, services, mainGoal, budgetRange, userName, businessName } = data;

    let strategyTitle = '';
    let strategyDescription = '';
    let steps: string[] = [];
    let suitability = '';

    // Strategy mapping
    if (services.includes('Sviluppo Custom Code') || budgetRange === 'elite') {
      strategyTitle = 'Architettura Custom Jamstack / React d\'Élite';
      strategyDescription = `Per ${businessName}, la soluzione ottimale è un'infrastruttura web proprietaria sviluppata da zero. Escludiamo i CMS tradizionali a favore di React e Tailwind CSS per garantirvi prestazioni assolute (PageSpeed superiore al 95%), sicurezza blindata e un'estetica visiva personalizzata al millimetro.`;
      steps = [
        `Progettazione di un layout d'impatto d'élite ottimizzato per l'universo ${sector}.`,
        'Sviluppo in React + Vite per una fluidità di navigazione istantanea.',
        'Integrazione di animazioni d\'interfaccia eleganti ed asincrone.',
        'Configurazione SEO tecnica per posizionare le pagine chiave del vostro settore.'
      ];
    } else if (services.includes('Lead Generation Strategica')) {
      strategyTitle = 'Funnel di Conversione Rapido & Meta Ads';
      strategyDescription = `L'obiettivo primario di ${businessName} è l'acquisizione di nuovi clienti. Configureremo una landing page ad alta persuasione accoppiata a campagne Meta Ads (Instagram & Facebook). Sfrutteremo la mia certificazione come Social Lead's Manager per intercettare utenti profilati e convogliarli direttamente verso il vostro contatto WhatsApp.`;
      steps = [
        `Creazione di un "Lead Magnet" esclusivo specifico per la nicchia ${sector}.`,
        'Scrittura di testi persuasivi orientati all\'azione (Copywriting d\'Assalto).',
        'Configurazione del tracciamento (Pixel & Conversion API) per ottimizzare il budget.',
        'Integrazione con la vostra chat WhatsApp per risposte commerciali in tempo reale.'
      ];
    } else {
      strategyTitle = 'Piattaforma Editoriale / CMS Chiavi in Mano';
      strategyDescription = `Per consolidare la presenza di ${businessName}, proponiamo un sito su piattaforma CMS solida e ottimizzata. Questa scelta vi garantirà massima flessibilità e piena autonomia nell'aggiornamento autonomo di news, articoli e pagine, beneficiando al contempo di una stesura testi strategica e SEO On-Page curata nei minimi dettagli.`;
      steps = [
        'Configurazione di un pannello di gestione personalizzato e ultra-semplificato.',
        `Strutturazione dei contenuti e copywriting incentrato sui punti di forza del settore ${sector}.`,
        'Fornitura di una video-guida dedicata per rendervi autonomi al 100% nella gestione.',
        'Ottimizzazione della velocità e caching avanzato per caricamenti rapidi.'
      ];
    }

    // Goal adjustments
    if (mainGoal === 'brand') {
      steps.unshift('Studio di Brand Identity: logo vettoriale geometrico, palette di colori coordinati e linee guida.');
    } else if (mainGoal === 'automation') {
      steps.push('Configurazione di un sistema di prenotazione online automatizzato con sincronizzazione in tempo reale.');
    }

    // Budget check
    if (budgetRange === 'entry') {
      suitability = 'La soluzione prospettata è stata calibrata su un budget Entry-Level (Fino a 1.500 €). Ci concentreremo sugli elementi essenziali ad alto ritorno sull\'investimento.';
    } else if (budgetRange === 'standard') {
      suitability = 'Il budget Professionale (1.500 € - 3.500 €) ci permette di unire una Brand Identity curata ad un sito web completo e un\'ottimizzazione SEO di primo livello.';
    } else {
      suitability = 'La formula Elite (Oltre 3.500 €) sblocca la progettazione d\'avanguardia: codice custom, automazioni native integrate e campagne di lead generation ad alta scalabilità.';
    }

    return {
      title: 'PROGETTO: ' + businessName.toUpperCase(),
      clientName: userName,
      sector: sector,
      strategyTitle,
      strategyDescription,
      steps,
      suitability,
      date: new Date().toLocaleDateString('it-IT')
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);

    // Simulate sending data and analyzing
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedReport = generateReport(formData);
      setReport(generatedReport);
    }, 1800);
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setStep(1);
    setReport(null);
  };

  const getWhatsAppLink = () => {
    if (!report) return '';
    const text = `Buongiorno M.Teresa, ho appena compilato il modulo su FACILISSIMO WEB per il progetto "${formData.businessName}" (Settore: ${formData.sector}).\n\nLa mia relazione ha suggerito la strategia:\n👉 *${report.strategyTitle}*\n\nVorrei fissare la consulenza gratuita per parlarne!`;
    return `https://wa.me/393793603321?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="project-wizard-container" className="w-full">
      <AnimatePresence mode="wait">
        {!report ? (
          <motion.div
            key="wizard-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/75 dark:bg-[#1C122C]/75 backdrop-blur-lg p-6 md:p-10 rounded-[40px] shadow-[0_0_30px_-5px_rgba(221,242,71,0.25)] border-2 border-[#DDF247]"
          >
            {/* Step Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DDF247]">
                  Step {step} di 3
                </span>
                <span className="text-xs font-mono text-on-surface-variant/70">
                  {step === 1 && '1. Conoscenza'}
                  {step === 2 && '2. Esigenze'}
                  {step === 3 && '3. Contatti'}
                </span>
              </div>
              <div className="w-full bg-outline-variant/20 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-500 ease-out"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Conoscenza */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-primary mb-1 uppercase tracking-tight">
                      Step 1: Conoscenza
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-on-surface-variant/80 uppercase tracking-widest mb-6">
                      Raccontateci chi siete e di cosa vi occupate
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-on-surface mb-2">
                        Nome dell'attività *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        required
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Es. Officina del Gusto Verona"
                        className="w-full bg-surface-container border-none rounded-2xl py-4 px-6 font-sans text-base text-on-surface focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-container-high transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-on-surface mb-2">
                        Il vostro nome *
                      </label>
                      <input
                        type="text"
                        name="userName"
                        required
                        value={formData.userName}
                        onChange={handleInputChange}
                        placeholder="Come volete che vi chiamiamo?"
                        className="w-full bg-surface-container border-none rounded-2xl py-4 px-6 font-sans text-base text-on-surface focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-container-high transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-on-surface mb-2">
                        Nicchia / Settore *
                      </label>
                      <input
                        type="text"
                        name="sector"
                        required
                        value={formData.sector}
                        onChange={handleInputChange}
                        placeholder="Es. Ristorazione, Consulenza, Artigianato..."
                        className="w-full bg-surface-container border-none rounded-2xl py-4 px-6 font-sans text-base text-on-surface focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-container-high transition-all outline-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Esigenze */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-primary mb-1 uppercase tracking-tight">
                      Step 2: Esigenze
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-on-surface-variant/80 uppercase tracking-widest mb-6">
                      Definiamo insieme la direzione strategica
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-on-surface mb-3">
                        Servizi di vostro interesse * (Selezionate almeno uno)
                      </label>
                      <div className="grid grid-cols-1 gap-2.5">
                        {[
                          'Pacchetti CMS Chiavi in Mano',
                          'Identità di Marca d\'Élite',
                          'Sviluppo Custom Code',
                          'Soluzioni Native Integrate',
                          'Lead Generation Strategica',
                        ].map((srv) => {
                          const isSelected = formData.services.includes(srv);
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => handleServiceToggle(srv)}
                              className={`w-full py-3.5 px-5 rounded-2xl text-left font-sans text-sm font-semibold transition-all border flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-primary/10 border-primary text-primary shadow-sm'
                                  : 'bg-surface-container border-transparent text-on-surface hover:bg-surface-container-high'
                              }`}
                            >
                              <span>{srv}</span>
                              <div
                                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                  isSelected ? 'bg-primary border-primary' : 'border-outline/50'
                                }`}
                              >
                                {isSelected && <span className="text-[10px] text-on-primary">✓</span>}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-on-surface mb-2">
                        Obiettivo principale del progetto *
                      </label>
                      <select
                        name="mainGoal"
                        required
                        value={formData.mainGoal}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border-none rounded-2xl py-4 px-6 font-sans text-base text-on-surface focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-container-high transition-all outline-none cursor-pointer"
                      >
                        <option value="" disabled>Selezionate un obiettivo...</option>
                        <option value="leads">Acquisire contatti qualificati e nuovi clienti</option>
                        <option value="brand">Creare un brand forte ed un logo esclusivo</option>
                        <option value="performance">Avere un sito ultra-veloce ed elegante</option>
                        <option value="automation">Automatizzare processi (es. prenotazioni)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-on-surface mb-2">
                        Budget indicativo dell'investimento *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'entry', label: 'Fino a 1.500 €' },
                          { id: 'standard', label: '1.500 € - 3.500 €' },
                          { id: 'elite', label: 'Oltre 3.500 €' },
                        ].map((item) => {
                          const isSelected = formData.budgetRange === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, budgetRange: item.id }))}
                              className={`py-3 px-4 rounded-xl font-sans text-xs font-bold transition-all border text-center cursor-pointer ${
                                isSelected
                                  ? 'bg-[#DDF247] border-[#DDF247] text-black shadow-sm'
                                  : 'bg-surface-container border-transparent text-on-surface hover:bg-surface-container-high'
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contatti */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-primary mb-1 uppercase tracking-tight">
                      Step 3: Contatti
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-on-surface-variant/80 uppercase tracking-widest mb-6">
                      Come possiamo ricontattarvi e quando?
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-on-surface mb-2">
                        Indirizzo Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Es. nome@azienda.it"
                        className="w-full bg-surface-container border-none rounded-2xl py-4 px-6 font-sans text-base text-on-surface focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-container-high transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-on-surface mb-2">
                        Numero di telefono * (Per contatto rapido o WhatsApp)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Es. +39 333 1234567"
                        className="w-full bg-surface-container border-none rounded-2xl py-4 px-6 font-sans text-base text-on-surface focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-container-high transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-on-surface mb-2">
                        Tempistiche per l'avvio *
                      </label>
                      <select
                        name="urgency"
                        required
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full bg-surface-container border-none rounded-2xl py-4 px-6 font-sans text-base text-on-surface focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-container-high transition-all outline-none cursor-pointer"
                      >
                        <option value="" disabled>Selezionate un'urgenza...</option>
                        <option value="immediate">Massima priorità (avvio immediato)</option>
                        <option value="soon">Entro 1-2 mesi</option>
                        <option value="planning">Solo pianificazione / Studio preventivo</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Form Navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 py-3 px-5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-on-surface hover:bg-outline-variant/10 transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={16} /> Indietro
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!validateStep()}
                    className="flex items-center gap-2 py-3.5 px-6 rounded-full bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider hover:bg-secondary transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-sm"
                  >
                    Avanti <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!validateStep() || isSubmitting}
                    className="flex items-center gap-2 py-3.5 px-6 rounded-full bg-[#DDF247] text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white hover:scale-105 transition-all cursor-pointer disabled:opacity-50 shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        Analisi...
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        Invia ed Elabora <Sparkles size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          /* Analysis Report view */
          <motion.div
            key="wizard-report"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gradient-to-br from-[#1E112C] to-[#2D1B44] text-white p-6 md:p-10 rounded-[40px] shadow-2xl border-2 border-[#DDF247] relative overflow-hidden"
          >
            {/* Ambient glows inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={18} className="text-[#DDF247]" />
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#DDF247]">
                      Relazione Strategica Istantanea
                    </span>
                  </div>
                  <h3 className="font-headline text-2xl font-black text-white leading-tight uppercase">
                    {report.title}
                  </h3>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 font-mono text-[10px] text-white/75">
                  Elaborato: {report.date}
                </div>
              </div>

              {/* Introduction */}
              <p className="font-sans text-sm text-white/80 mb-6 leading-relaxed">
                Gentile <strong>{report.clientName}</strong>, sulla base della vostra compilazione e delle esigenze espresse per il vostro business di <strong>{report.sector}</strong>, abbiamo elaborato una proposta strategica preliminare ad alto impatto.
              </p>

              {/* Proposed Strategy Card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
                <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-widest block mb-1">
                  STRATEGIA CORE CONSIGLIATA
                </span>
                <h4 className="font-headline text-lg font-bold text-[#DDF247] mb-3">
                  {report.strategyTitle}
                </h4>
                <p className="font-sans text-xs md:text-sm text-white/90 leading-relaxed">
                  {report.strategyDescription}
                </p>
              </div>

              {/* Action Plan */}
              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold text-secondary uppercase tracking-widest block mb-3">
                  PUNTI D'AZIONE OPERATIVI (ROADMAP)
                </span>
                <ul className="space-y-3">
                  {report.steps.map((step: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#DDF247]/10 border border-[#DDF247]/30 flex items-center justify-center text-[#DDF247] text-xs font-bold mt-0.5 shrink-0">
                        {idx + 1}
                      </div>
                      <span className="font-sans text-xs md:text-sm text-white/80">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suitability Footer */}
              <p className="font-sans text-xs text-white/60 italic border-t border-white/10 pt-4 mb-6 leading-relaxed">
                {report.suitability}
              </p>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#DDF247] text-black font-headline text-base font-bold tracking-wide hover:bg-white transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
                >
                  <PhoneCall size={18} />
                  Fissiamo la Chiamata Gratuita
                </a>
                <button
                  onClick={resetForm}
                  className="py-4 px-6 rounded-full bg-white/10 border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer"
                >
                  Nuova Analisi
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
