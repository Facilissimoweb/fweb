import { Service, PortfolioItem, Skill, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-design',
    title: 'Web Design',
    description: [
      '**Architettura web** d\'élite e design d\'impatto cucito su misura per il vostro brand.',
      '**Codice performante** studiato per garantire velocità estrema e posizionamento SEO.',
      '**Interfaccia immersiva** focalizzata sulla conversione strategica dei vostri visitatori.'
    ],
    iconName: 'Globe',
    colorClass: 'text-primary',
    containerColor: 'bg-primary-container/30',
    delay: '0ms'
  },
  {
    id: 'branding',
    title: 'Branding',
    description: [
      '**DNA di marca** definito per rendere il vostro posizionamento unico sul mercato.',
      '**Simbologia iconica** e sistemi visivi coerenti che esprimono assoluta autorevolezza.',
      '**Brand Manual** esclusivo per guidare ogni futura espansione di comunicazione.'
    ],
    iconName: 'Eye',
    colorClass: 'text-secondary',
    containerColor: 'bg-secondary-container/30',
    delay: '100ms'
  },
  {
    id: 'social-lead-generation',
    title: 'Social Lead Generation',
    description: [
      '**Acquisizione clienti** ingegnerizzata sui social per intercettare contatti qualificati.',
      '**Sistemi di funnel** persuasivi progettati per massimizzare il ritorno sull\'investimento.',
      '**Copywriting d\'assalto** e leve psicologiche per spingere ad una scelta immediata.'
    ],
    iconName: 'TrendingUp',
    colorClass: 'text-tertiary',
    containerColor: 'bg-tertiary-container/30',
    delay: '200ms'
  },
  {
    id: 'consulenze',
    title: 'Consulenze',
    description: [
      '**Primo incontro** di 20 minuti completamente **gratuito** per inquadrare la vostra idea.',
      '**Analisi avanzata** e rigorosa del progetto, che richiede un compenso professionale.',
      '**Algoritmo proprietario** e software nativo specializzato per una diagnosi di precisione.'
    ],
    iconName: 'MessageCircle',
    colorClass: 'text-primary',
    containerColor: 'bg-primary-fixed/30',
    delay: '300ms'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'lux-aura',
    title: 'Pacchetti CMS Chiavi in Mano',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    altText: 'Esempio di interfaccia web pulita ed elegante, progettata su CMS con un pannello di amministrazione intuitivo e reattivo.',
    delay: '0ms',
    techStack: ['WordPress o CMS analoghi', 'SEO On-Page & Copywriting', 'Responsive Design (Mobile-First)', 'Pannello di Controllo Semplificato', 'Formazione all\'Uso in Autonomia'],
    challenge: 'Offrire a microimprese e liberi professionisti una soluzione pronta all\'uso che garantisca completa autonomia nella gestione quotidiana dei contenuti, senza dover rinunciare ad un design d\'impatto estetico e ad un posizionamento d\'eccellenza su Google.',
    solution: 'Configurazione di una struttura CMS altamente solida e ottimizzata, stesura di testi strategici, integrazione di un pannello di controllo intuitivo ed erogazione di una formazione dedicata per consentirvi di aggiornare il sito in totale autonomia.',
    client: 'Piccole Imprese & Professionisti',
    year: '2026'
  },
  {
    id: 'tribal-identity',
    title: 'Identità di Marca d\'Élite',
    category: 'Logo',
    image: 'https://images.unsplash.com/photo-1541462608141-2f58c4809c57?auto=format&fit=crop&q=80&w=800',
    altText: 'Mockup di brand identity con logo geometrico, palette di colori coordinati e cancelleria aziendale esposta su una scrivania moderna.',
    delay: '100ms',
    techStack: ['Adobe Illustrator', 'Figma (Vector Layout)', 'Studio Geometrico del Logo', 'Tavolozza Colori Coordinata', 'Brand Manual Esclusivo'],
    challenge: 'Strutturare una Brand Identity forte, coerente e subito riconoscibile sul mercato, capace di trasmettere l\'assoluta autorevolezza, la serietà e i valori fondanti di un professionista o di una ditta individuale.',
    solution: 'Esplorazione concettuale del logo con griglie geometriche di precisione, studio coordinato della tipografia e della palette cromatica ed infine rilascio di un Brand Manual completo per guidare l\'espansione futura di ogni vostro canale di comunicazione.',
    client: 'Nuove Realtà & Liberi Professionisti',
    year: '2026'
  },
  {
    id: 'mindflow-app',
    title: 'Sviluppo Custom Code',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800',
    altText: 'Interfaccia di un\'applicazione web ad altissime prestazioni scritta interamente in codice custom, visualizzata su un monitor ad alta definizione.',
    delay: '200ms',
    techStack: ['React & Vite', 'TypeScript', 'Tailwind CSS', 'Motion (Animations)', 'Codice Scritto da Zero (Nessun CMS)'],
    challenge: 'Realizzare un sito web o una web app con esigenze funzionali specifiche e personalizzate che richiedano prestazioni estreme (PageSpeed 95%+), stabilità di lungo termine e sicurezza totale, non ottenibili tramite CMS tradizionali.',
    solution: 'Sviluppo dell\'architettura software interamente da zero per un caricamento istantaneo e un\'esperienza d\'uso d\'élite. Formula proposta in abbonamento annuale comprensivo di hosting, manutenzione evolutiva continua e supporto tecnico prioritario.',
    client: 'Progetti Digitali Avanzati',
    year: '2026'
  },
  {
    id: 'agile-motion',
    title: 'Soluzioni Native Integrate',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    altText: 'Grafici e flussi di dati integrati su una piattaforma aziendale per ottimizzare i flussi di lavoro e l\'automazione dei contatti.',
    delay: '300ms',
    techStack: ['API Custom & Webhooks', 'Integrazione CRM', 'Agende & Prenotazioni Online', 'Email Marketing Automation', 'Sincronizzazione Dati Real-time'],
    challenge: 'Eliminare i passaggi manuali e unire i diversi strumenti digitali del cliente in un unico flusso sinergico, consentendo al sito web di sincronizzarsi in tempo reale con software di prenotazione, database contatti o CRM.',
    solution: 'Sviluppo di connessioni native ad hoc per automatizzare l\'acquisizione e il nutrimento dei lead. Il vostro sito lavorerà per voi 24 ore su 24, gestendo prenotazioni, newsletter e dati contatti in modo sicuro e trasparente.',
    client: 'Studi Professionali & Consulenti',
    year: '2026'
  },
  {
    id: 'social-leads-generation',
    title: "Lead Generation Strategica",
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    altText: 'Funnel di marketing e canali pubblicitari visualizzati su un tablet durante un\'analisi strategica di lead generation.',
    delay: '400ms',
    techStack: ['Meta Ads (Facebook & IG)', 'LinkedIn Campaign Manager', 'Landing Page di Conversione', 'Strategie di Lead Magnet', 'Copywriting Persuasivo', 'Tracciamento & Analytics'],
    challenge: 'Attrarre contatti qualificati e interessati ai vostri servizi professionali, canalizzando il traffico dai canali social ad una landing page ottimizzata, riducendo a zero le dispersioni di budget.',
    solution: 'Progettazione di lead magnet di alto valore, strutturazione di landing page persuasive, configurazione tecnica di tracciamenti avanzati e lancio di campagne pubblicitarie ottimizzate basate sulle mie competenze certificate come Social Lead\'s Manager.',
    client: 'Attività Ambiziose & Consulenti',
    year: '2026'
  }
];

export const SKILLS: Skill[] = [
  {
    id: 'creative-direction',
    name: 'Direzione Creativa',
    percentage: 95,
    colorClass: 'bg-primary'
  },
  {
    id: 'web-development',
    name: 'Sviluppo Web',
    percentage: 88,
    colorClass: 'bg-secondary'
  },
  {
    id: 'digital-illustration',
    name: 'Illustrazione Digitale',
    percentage: 92,
    colorClass: 'bg-tertiary'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: '"Un design che respira. M.Teresa ha saputo tradurre la nostra visione in qualcosa di magico."',
    author: 'Marco Rossi',
    role: 'CEO, InnovaTech',
    colorClass: 'bg-secondary text-on-secondary',
    delay: '0ms'
  },
  {
    id: 'testimonial-2',
    quote: '"Grande professionalità e precisione millimetrica. Il miglior freelance con cui abbiamo lavorato."',
    author: 'Elena Bianchi',
    role: 'Marketing Manager, Studio G',
    colorClass: 'bg-primary text-on-primary',
    delay: '150ms'
  },
  {
    id: 'testimonial-3',
    quote: '"L\'estetica moderna e pulita di Facilissimo Web ha dato al nostro brand una marcia in più."',
    author: 'Luca Moretti',
    role: 'Founder, Art-e-Misia',
    colorClass: 'bg-tertiary text-on-tertiary',
    delay: '300ms'
  }
];
