import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { Globe, Eye, TrendingUp, LayoutGrid, X, Check, ArrowRight, MessageCircle } from 'lucide-react';

const iconMap: Record<string, any> = {
  Globe,
  Eye,
  TrendingUp,
  LayoutGrid,
  MessageCircle,
};

const serviceImages: Record<string, string> = {
  'web-design': 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800',
  'branding': 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800',
  'social-lead-generation': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  'consulenze': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
};

const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold text-[#DDF247]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

// Detailed specifications for each service popup
interface ServiceDetail {
  tagline: string;
  detailedIntro: string;
  features: string[];
  process: string;
  ctaText: string;
  ctaLink: string;
}

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'web-design': {
    tagline: 'Siti web reattivi, fluidi e ottimizzati per convertire.',
    detailedIntro: 'Progetto e sviluppo siti web ed e-commerce su misura, combinando un\'estetica raffinata con prestazioni fulminee. Ogni sito è ottimizzato per i motori di ricerca (SEO), completamente accessibile e strutturato per guidare il visitatore in modo naturale verso l\'azione.',
    features: [
      'Design Responsive di altissimo livello (Mobile-First)',
      'Ottimizzazione SEO On-Page & Velocità di Caricamento eccezionale',
      'Integrazione di sistemi di pagamento e gestione e-commerce sicuri',
      'Architettura dell\'informazione pulita e accessibile',
      'Pannello di gestione intuitivo per aggiornare i tuoi contenuti in autonomia'
    ],
    process: 'Analisi iniziale degli obiettivi, progettazione dei wireframe ed esperienza utente, sviluppo del codice pulito e ottimizzato, test di velocità ed accessibilità, e infine messa online con monitoraggio post-lancio.',
    ctaText: 'Progetta il tuo sito web su WhatsApp',
    ctaLink: 'https://wa.me/393793603321?text=Ciao%20M.Teresa,%20vorrei%20informazioni%20sulla%20creazione%20di%20un%20sito%20web%20professionale'
  },
  'branding': {
    tagline: 'Identità visive memorabili, d\'impatto e su misura.',
    detailedIntro: 'Il brand non è solo un logo: è la personalità, l\'anima e il volto del tuo business. Creo identità visive forti, coerenti e iconiche che ti permettono di emergere nel mercato, ispirando fiducia e affinità emotiva con la tua clientela ideale.',
    features: [
      'Progettazione Logo iconico, versatile e senza tempo',
      'Studio della Brand Identity completa (Color Palette, Tipografia coordinata)',
      'Brand Guidelines (Manuale d\'uso) per mantenere la coerenza visiva nel tempo',
      'Kit grafico coordinato per social media e canali di comunicazione',
      'Biglietti da visita, carta intestata e packaging su richiesta'
    ],
    process: 'Briefing e studio del posizionamento dei competitor, esplorazione concettuale tramite bozze a mano libera, digitalizzazione geometrica, raffinamento delle palette cromatiche e consegna del brand manual pronto all\'uso.',
    ctaText: 'Crea l\'identità del tuo brand su WhatsApp',
    ctaLink: 'https://wa.me/393793603321?text=Ciao%20M.Teresa,%20vorrei%20informazioni%20sullo%20studio%20del%20branding%20e%20della%20brand%20identity'
  },
  'social-lead-generation': {
    tagline: 'Campagne mirate per catturare contatti qualificati e ottimizzare le conversioni.',
    detailedIntro: 'Attiro l\'attenzione del tuo pubblico target con funnel di marketing performanti e strategie social mirate. Creo campagne pubblicitarie ottimizzate che trasformano la curiosità degli utenti in contatti reali e contratti commerciali.',
    features: [
      'Strategie di Social Media Marketing per Facebook, Instagram e LinkedIn',
      'Sviluppo di Lead Magnet ad altissimo valore aggiunto (guide, cataloghi, sconti)',
      'Landing Page di conversione ottimizzate (struttura persuasiva e mobile-first)',
      'Scrittura di testi persuasivi (Copywriting orientato all\'azione)',
      'Analisi e tracciamento continuo delle metriche di performance con report chiari'
    ],
    process: 'Analisi approfondita del cliente tipo (Buyer Persona), definizione dell\'offerta esca (Lead Magnet), creazione dei materiali visivi e testuali, configurazione tecnica dei pixel di tracciamento, lancio e ottimizzazione continua del budget.',
    ctaText: 'Attiva la tua campagna su WhatsApp',
    ctaLink: 'https://wa.me/393793603321?text=Ciao%20M.Teresa,%20vorrei%20informazioni%20sulle%20strategie%20di%20social%20lead%20generation'
  },
  'consulenze': {
    tagline: 'Strategia, diagnosi e soluzioni digitali di precisione.',
    detailedIntro: 'Per comprendere a fondo la direzione di un progetto e strutturare una presenza online di successo, offro un servizio di consulenza strategica personalizzata. La prima sessione conoscitiva di 20 minuti è completamente gratuita: un dialogo diretto per inquadrare le tue necessità. Tuttavia, le consulenze avanzate non si limitano a consigli generici: richiedono un esame scientifico e dettagliato tramite un software analitico specializzato di mia proprietà intellettuale. Per questo motivo, le sessioni successive di analisi approfondita sono regolate come servizi professionali a pagamento.',
    features: [
      'Primo incontro conoscitivo di 20 minuti gratuito per inquadrare l\'idea',
      'Analisi tecnica approfondita del tuo posizionamento digitale attuale',
      'Audit condotto con il mio software di diagnostica proprietario e nativo',
      'Report dettagliato con punti critici evidenziati e piano d\'azione concreto',
      'Consulenza strategica one-to-one mirata alle conversioni reali'
    ],
    process: 'Incontro conoscitivo gratuito di 20 minuti, analisi metodica tramite software diagnostico nativo proprietario, redazione del report strategico personalizzato e sessione di restituzione strategica con la roadmap d\'azione.',
    ctaText: 'Prenota la tua consulenza gratuita su WhatsApp',
    ctaLink: 'https://wa.me/393793603321?text=Ciao%20M.Teresa,%20vorrei%20prenotare%20la%20prima%20consulenza%20gratuita%20di%2020%20minuti'
  }
};

export default function Services() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Handle body scroll locking when modal is open
  useEffect(() => {
    if (selectedServiceId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedServiceId]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedServiceId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle custom 'open-service' event from Navbar/Menu
  useEffect(() => {
    const handleOpenService = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedServiceId(customEvent.detail);
        const element = document.getElementById('services');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('open-service', handleOpenService);
    return () => window.removeEventListener('open-service', handleOpenService);
  }, []);

  const activeService = SERVICES.find(s => s.id === selectedServiceId);
  const activeDetails = selectedServiceId ? SERVICE_DETAILS[selectedServiceId] : null;

  return (
    <section id="services" className="py-24 bg-surface-container-low relative scroll-mt-[110px]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary mb-4">
            Servizi su Misura
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-3"></div>
          <p className="font-sans text-sm md:text-base text-on-surface-variant max-w-xl mx-auto lowercase tracking-wide">
            clicca su una scheda per svelare l'approccio nel dettaglio ed attivare il servizio.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Globe;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                onClick={() => setSelectedServiceId(service.id)}
                className="p-8 rounded-[40px] shadow-[0_0_20px_rgba(221,242,71,0.15)] hover:shadow-[0_0_35px_rgba(221,242,71,0.45)] hover:-translate-y-1.5 transition-all duration-500 group flex flex-col items-start text-left cursor-pointer border-4 border-[#DDF247] relative overflow-hidden h-full min-h-[460px]"
              >
                {/* Background Image */}
                <img 
                  src={serviceImages[service.id] || "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80"}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110 brightness-[0.7] dark:brightness-[0.55] grayscale hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />

                {/* Overlay: semi-transparent default, very dark on hover */}
                <div className="absolute inset-0 bg-black/60 dark:bg-[#120a21]/75 backdrop-blur-[2px] group-hover:bg-black/90 dark:group-hover:bg-black/95 transition-all duration-500 z-1" />

                {/* Content wrapper with relative z-10 */}
                <div className="relative z-10 flex flex-col items-start h-full w-full flex-grow">
                  {/* Subtle top bar decorative */}
                  <div className={`absolute -top-8 -left-8 -right-8 h-1.5 ${service.containerColor} opacity-70`} />

                  <div
                    className={`w-16 h-16 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className={`w-8 h-8 text-[#DDF247]`} />
                  </div>
                  
                  <h3 className="font-headline text-xl md:text-2xl font-semibold text-white mb-4">
                    {service.title}
                  </h3>
                  
                  <div className="space-y-3.5 mb-6 flex-grow w-full">
                    {service.description.map((block, idx) => (
                      <p key={idx} className="font-sans text-xs md:text-sm text-slate-100 dark:text-slate-200 leading-relaxed pl-3 border-l-2 border-[#DDF247]/50">
                        {renderFormattedText(block)}
                      </p>
                    ))}
                  </div>

                  {/* Card CTA Button */}
                  <div className="w-full mt-auto pt-4">
                    <span className="w-full bg-[#DDF247] text-black group-hover:bg-white group-hover:text-black text-center py-3.5 px-6 rounded-2xl font-headline font-semibold text-lg tracking-wider uppercase transition-all duration-300 shadow-sm flex items-center justify-center gap-1.5">
                      SCOPRI DI PIÙ
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full-Page Overlay Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedServiceId && activeService && activeDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-inverse-surface/80 backdrop-blur-md z-[110] flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="backdrop-blur-xl bg-white/80 dark:bg-[#1C122C]/85 rounded-[40px] w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] shadow-[0_0_50px_rgba(221,242,71,0.35)] overflow-hidden flex flex-col relative text-on-surface border-4 border-[#DDF247]"
            >
              {/* Top Bar / Close Button */}
              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={() => setSelectedServiceId(null)}
                  className="w-10 h-10 rounded-full bg-surface-container/60 hover:bg-surface-container text-on-surface flex items-center justify-center transition-all shadow-sm cursor-pointer border border-outline-variant/10 active:scale-90"
                  aria-label="Chiudi"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto p-8 md:p-12 space-y-8 scrollbar-thin">
                
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-outline-variant/15 pb-8">
                  <div className={`w-16 h-16 shrink-0 ${activeService.containerColor} rounded-3xl flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = iconMap[activeService.iconName] || Globe;
                      return <IconComponent className={`w-8 h-8 ${activeService.colorClass}`} />;
                    })()}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-secondary uppercase tracking-widest block mb-1">
                      Servizio Professionale su Misura
                    </span>
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
                      {activeService.title}
                    </h2>
                  </div>
                </div>

                {/* Grid Content: Info & Bullets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  
                  {/* Left Column: Introdution */}
                  <div className="space-y-4">
                    <h3 className="font-headline text-lg md:text-xl font-semibold text-on-surface-variant italic leading-snug">
                      "{activeDetails.tagline}"
                    </h3>
                    <p className="font-sans text-sm md:text-base text-on-surface-variant/90 leading-relaxed">
                      {activeDetails.detailedIntro}
                    </p>

                    {/* Process description */}
                    <div className="bg-surface-container-low/40 p-5 rounded-3xl border border-outline-variant/10 space-y-2 mt-6">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
                        Il mio processo agile:
                      </span>
                      <p className="font-sans text-xs text-on-surface-variant/80 leading-relaxed">
                        {activeDetails.process}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Key Features & Bullet Checklist */}
                  <div className="space-y-4">
                    <h4 className="font-headline text-base font-bold text-primary tracking-wide uppercase">
                      Cosa include il servizio:
                    </h4>
                    
                    <ul className="space-y-3.5">
                      {activeDetails.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-secondary-container/30 flex items-center justify-center shrink-0 mt-0.5 text-secondary">
                            <Check size={12} strokeWidth={3} />
                          </div>
                          <span className="font-sans text-xs md:text-sm text-on-surface-variant leading-normal">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom CTA Section */}
                <div className="border-t border-outline-variant/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <p className="font-headline text-sm font-bold text-on-surface">
                      Pronto a fare un salto di qualità?
                    </p>
                    <p className="font-sans text-xs text-on-surface-variant/70">
                      Parla direttamente con M.Teresa Rogani per un preventivo personalizzato e gratuito.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <a
                      href={activeDetails.ctaLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs md:text-sm px-6 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <MessageCircle size={18} />
                      {activeDetails.ctaText}
                    </a>
                    
                    <button
                      onClick={() => setSelectedServiceId(null)}
                      className="bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs md:text-sm px-6 py-3.5 rounded-full transition-all cursor-pointer text-center"
                    >
                      Chiudi Dettagli
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
