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
    title: 'Lux Aura',
    category: 'Web',
    image: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
    altText: 'A sophisticated minimalist web design portfolio piece featuring soft mauve and white tones. The interface uses elegant typography and generous whitespace, displayed on a clean digital tablet mockup in a high-end, light-filled studio setting. The aesthetic is tactile and premium, mirroring a luxury lifestyle brand.',
    delay: '0ms',
    techStack: ['HTML5 & CSS3', 'React & Vite', 'Motion (Animate)', 'Tailwind CSS', 'Figma (Layout & Grid)'],
    challenge: 'Creare un\'esperienza d\'uso d\'élite che trasmettesse il senso tattile e lo spazio di un brand di lusso fisico, mantenendo al contempo tempi di caricamento istantanei e punteggi SEO impeccabili.',
    solution: 'Implementazione di animazioni asincrone con Motion per un caricamento fluido dei contenuti, ottimizzazione millimetrica delle immagini e utilizzo di una palette cromatica d\'alta moda combinata con abbondante spazio negativo.',
    client: 'Aura Lifestyle Group',
    year: '2025'
  },
  {
    id: 'tribal-identity',
    title: 'Tribal Identity',
    category: 'Logo',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI53nnb9pl3KXv3WtwGzJxueNEn3makj9rdRmfv2YkJIDvReZr4gLYyZjmXLR4oSOolmtOE65cVPEBmVcfXUCzXGa5hFLqFVyFyWp2GFDkNOYsU6ebqgNmztonnwKa6YEV0pRAZLnHI-Ih1NGpk2MH4efPKCYlV4ipcJ3bKtPgXD9RWrhVJEJlvzFCk47qbg7xZDFMYsTPG5IgFDEXuzpoim66aAHAljs6z0b2ov0kzzGur-VyWwoF6k8w_FsLY0h9jkZPgLnno-Q',
    altText: 'Creative logo design process showcase. A set of tribal-inspired feline symbols, crafted with intricate geometric patterns in deep violet and lavender. The logos are displayed on textured paper with subtle shadows, conveying a sense of handcrafted precision and organic flow in a bright, modern design workspace.',
    delay: '100ms',
    techStack: ['Adobe Illustrator', 'Figma (Vectoring)', 'Paper Sketching', 'Golden Ratio Grid'],
    challenge: 'Sviluppare un logo altamente distintivo basato su simbologia ancestrale felina, che fosse geometricamente perfetto, riproducibile su qualsiasi superficie (dai piccolissimi favicon ai cartelloni pubblicitari) e forte nell\'impatto visivo.',
    solution: 'Disegno a mano libera di 12 prototipi concettuali, digitalizzazione con griglia vettoriale geometrica a sezione aurea, e test di leggibilità e contrasto cromatico ad alta fedeltà sia in positivo che in negativo.',
    client: 'Tribal Cats Inc.',
    year: '2026'
  },
  {
    id: 'mindflow-app',
    title: 'MindFlow App',
    category: 'Web',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzPkK5UyG8q9vWPgfCgy6RLFTBQ8Y9sAy7hRErR2y_ZAyUWXIb-dZdv3QnUMyRoL2AUf2M8zQZeie2J7VNWQc5TFxm62wHrtjieJRAHRP8FLdF3wXMT3DorLM5du0jYgiYYXKMkE1hiB0pfZKRnAb1vCawBc35RlmJnS31jH4iNpn2BLavuT6e_Sgx9AKNFKhlwpKnSiD8LnjUgIfOHtXYLHcVtzkp_MJAzJPcrnb7lSqglhlDV8PK4uEpSrX8R82u2SEHBFKmRWE',
    altText: 'Modern mobile app UI design featuring a soft, lavender-themed interface for a wellness application. The screen shows rounded cards, elegant line icons, and a fluid layout. The lighting is soft and ambient, emphasizing the tactile quality and user-friendly accessibility of the design.',
    delay: '200ms',
    techStack: ['Figma (UI/UX)', 'Component-Driven Design System', 'Tailwind CSS Prototype', 'WCAG AA Accessibility Guidelines'],
    challenge: 'Progettare l\'architettura informativa di un\'app per la meditazione che riducesse i livelli di stress cognitivo del 40%, offrendo controlli touch ad altissima facilità d\'uso anche per utenti non avvezzi alla tecnologia.',
    solution: 'Definizione di flussi d\'uso con meno di tre tocchi per iniziare la meditazione, interfacce tattili morbide con raggio di curvatura elevato (32px), contrasto testuale certificato WCAG AA e icone custom rilassanti.',
    client: 'MindFlow S.r.l.',
    year: '2025'
  },
  {
    id: 'agile-motion',
    title: 'Agile Motion',
    category: 'Web',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2Bfsa05dxN_9zEZkpZaNxin0P3SKnqHGy8_U4cXYPDDQBx9pWZ8MjYNvNYg3O-ZYHocvhesu1w8xtbThisCOOd9FusDSDj0dM09xm_H-hW7RoYuDv6nGUplSMe2ZFVqzDaypWJpuhBsdywucHlxROCyYiq2LdwEK6AHUV3bFDluxobsNuNtMOXXzjnrskasdlSubnJarQYTAT7zWMfq0mJuYF4tIERL6bvaCx4U2cNUbvzhYy1PG5j3CzrV5FNYDiSX3I3uhbkLc',
    altText: 'A vibrant motion graphics still showing abstract geometric shapes pouncing and swirling in a lavender and mauve atmosphere. The composition is dynamic and agile, with glowing edges and soft motion blur effects that suggest rapid, graceful movement against a textured, light lilac background.',
    delay: '300ms',
    techStack: ['Adobe After Effects', 'Lottie Files & JSON', 'Vector Asset Design', 'Keyframe Animation Curves'],
    challenge: 'Inserire micro-interazioni grafiche animate e performanti all\'interno di un portale web istituzionale senza penalizzare il punteggio PageSpeed del sito.',
    solution: 'Creazione di vettoriali animati leggeri esportati tramite Lottie Files (JSON), garantendo una riproduzione a 60fps con un peso file complessivo inferiore a 85KB, integrando curve di pounce personalizzate.',
    client: 'Agile Motion Studio',
    year: '2026'
  },
  {
    id: 'social-leads-generation',
    title: "Social Lead's Generation",
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    altText: 'Abstract minimalist 3D rendering with soft purple shapes and gradients, conveying flow, communication, and high-converting marketing pipelines.',
    delay: '400ms',
    techStack: ['Meta Ads (Facebook & IG)', 'LinkedIn Campaign Manager', 'Funnel Design', 'WhatsApp Business API', 'Copywriting d\'Assalto', 'Lead Magnets', 'Retargeting Pixel'],
    challenge: 'Catturare l\'attenzione del target con funnel d\'élite e campagne social ad altissimo impatto, trasformando la semplice curiosità digitale in contratti commerciali reali.',
    solution: 'Progettazione di lead magnet esclusivi, landing page ottimizzate per conversioni istantanee e flussi automatizzati integrati con WhatsApp per una risposta in tempo reale.',
    client: 'Facilissimo Web Consulting',
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
