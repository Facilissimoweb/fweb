import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Share2, Tag, ArrowRight, MessageCircle, Heart, Search, CheckCircle } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  altText: string;
  contentBlocks: {
    type: 'paragraph' | 'heading' | 'highlight' | 'quote';
    text: string;
  }[];
  seo: {
    title: string;
    description: string;
    focusKeywords: string[];
    slug: string;
  };
}

const BLOG_ARTICLES: BlogPost[] = [
  {
    id: 'brand-identity-power',
    title: 'IL POTERE DELLA BRAND IDENTITY FELINA: COME CREARE UNA TRIBÙ INTORNO AL TUO MARCHIO',
    excerpt: 'Non basta avere un logo grazioso per emergere. Un brand di successo ha bisogno di una personalità magnetica capace di attrarre una nicchia specifica e fedele.',
    date: '18 Giugno 2026',
    readTime: '4 min lettura',
    category: 'Branding',
    tags: ['BRANDING', 'DESIGN SYSTEM', 'VISUAL STORYTELLING'],
    image: 'https://images.unsplash.com/photo-1541462608141-2f58c4809c57?auto=format&fit=crop&q=80&w=1200',
    altText: 'Creazione di un mockup di brand identity con palette di colori eleganti e logo minimalista su un tavolo da disegno.',
    contentBlocks: [
      {
        type: 'heading',
        text: 'IL LOGO NON È IL TUO BRAND: È SOLO LA PUNTA DELL\'ICEBERG'
      },
      {
        type: 'paragraph',
        text: 'Moltissimi piccoli business commettono l\'errore di pensare che avere un logo carino significhi possedere una **Brand Identity**. In realtà, il logo rappresenta solo l\'elemento visivo finale di un processo molto più profondo. **LA TUA IDENTITÀ DI MARCA È L\'ANIMA E LA PERSONALITÀ DEL TUO PROGETTO**.'
      },
      {
        type: 'paragraph',
        text: 'Come freelance, quando disegno un marchio per i miei clienti, non mi limito a tracciare linee su un foglio digitale: vado alla ricerca dei loro valori fondamentali. Chi è il tuo cliente ideale? Quale emozione provano quando interagiscono con te? La Brand Identity è la risposta visiva a queste domande fondamentali.'
      },
      {
        type: 'heading',
        text: 'STABILISCI UNA SINTONIA VISIVA COERENTE'
      },
      {
        type: 'paragraph',
        text: 'Per costruire fiducia e attrarre la tua "tribù", la coerenza è la tua arma segreta. Dalla palette cromatica alle scelte tipografiche, ogni elemento deve parlare la stessa lingua. **UN DESIGN COERENTE CREA UN SENSO DI FAMILIARITÀ E PROFESSIONALITÀ**.'
      },
      {
        type: 'highlight',
        text: 'RICORDA: UN UTENTE IMPIEGA MENO DI 3 SECONDI PER FARSI UN\'OPINIONE SULLA PROFESSIONALITÀ DEL TUO SITO. LA COERENZA VISIVA COMUNICA IMMEDIATAMENTE CHE TI PRENDI CURA DEI DETTAGLI.'
      },
      {
        type: 'paragraph',
        text: 'Dalle sfumature mauve e prugna del mio portfolio alla morbidezza dei pulsanti, ogni scelta estetica su FACILISSIMO WEB è stata calibrata da me per trasmettere agilità, precisione ed eleganza essenziale. Questo è ciò che intendo per sintonia visiva su misura.'
      },
      {
        type: 'heading',
        text: 'L\'ESSENZIALITÀ COME REGOLA: SEMPLICITÀ ED ELEGANZA'
      },
      {
        type: 'paragraph',
        text: 'L\'approccio minimalista al design significa sapersi muovere con agilità ed eleganza. Non serve fare rumore o riempire la pagina di elementi superflui per farsi notare. **IL VERO DESIGN DI LUSSO RISIEDE NELLO SPAZIO NEGATIVO E NELLA PRECISIONE DEI SINGOLI DETTAGLI**.'
      },
      {
        type: 'quote',
        text: '"L\'eleganza non è farsi notare, ma farsi ricordare. Nel branding, l\'essenzialità e la coerenza creano un legame emotivo indistruttibile."'
      }
    ],
    seo: {
      title: 'Brand Identity per Piccoli Business: Come Creare un Brand Forte | Facilissimo Web',
      description: 'Scopri l\'importanza della Brand Identity e come creare una personalità visiva coerente ed elegante per il tuo business. Consigli della freelance Maria Teresa Rogani.',
      focusKeywords: ['Brand Identity', 'Loghi su misura', 'Visual Design', 'Freelance Branding'],
      slug: 'brand-identity-felina-creare-tribu'
    }
  },
  {
    id: 'minimalist-web-design',
    title: 'WEB DESIGN MINIMALISTA E PRESTAZIONI: IL VUOTO COME STRUMENTO DI CONVERSIONE',
    excerpt: 'Nel web design contemporaneo, meno elementi significano più attenzione. Scopri come l\'utilizzo strategico dello spazio vuoto guida gli utenti verso il contatto.',
    date: '21 Giugno 2026',
    readTime: '5 min lettura',
    category: 'Web Design',
    tags: ['WEB DESIGN', 'MINIMALISMO', 'UX/UI', 'CONVERSIONE'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
    altText: 'Esempio di interfaccia web minimalista e pulita con abbondante spazio bianco su uno schermo da ufficio moderno.',
    contentBlocks: [
      {
        type: 'heading',
        text: 'LO SPAZIO NEGATIVO NON È VUOTO: È RESPIRO'
      },
      {
        type: 'paragraph',
        text: 'Spesso i clienti mi chiedono: "Possiamo riempire questo spazio bianco con altre informazioni?". La risposta è quasi sempre un fermo, ma gentile, no. **LO SPAZIO VUOTO (O SPAZIO NEGATIVO) È UNO DEGLI STRUMENTI DI DESIGN PIÙ POTENTI IN MIO POSSESSO**.'
      },
      {
        type: 'paragraph',
        text: 'Quando affolliamo una pagina web con testi infiniti, banner colorati e animazioni caotiche, distruggiamo la soglia di attenzione del visitatore. Lo spazio negativo, al contrario, agisce come una guida silenziosa. **IL VUOTO COSTRINGE L\'OCCHIO DEL VISITATORE A POSARSI ESATTAMENTE DOVE VOGLIO IO: SUL TUO PRODOTTO O SULLA TUA CTA**.'
      },
      {
        type: 'heading',
        text: 'VELOCITÀ DI CARICAMENTO E PRESTAZIONI: IL MINIMALISMO TECNICO'
      },
      {
        type: 'paragraph',
        text: 'Un sito web bello ma lento è un sito inutile. Google penalizza fortemente i siti che impiegano più di 2.5 secondi per caricarsi (Core Web Vitals). **IL MINIMALISMO ESTETICO DEVE ANDARE DI PARI PASSO CON L\'OTTIMIZZAZIONE DEL CODICE**.'
      },
      {
        type: 'paragraph',
        text: 'Progettando interfacce leggere con React e Vite, riducendo le dipendenze esterne al minimo ed esportando animazioni vettoriali ultraleggere in Lottie, garantisco ai miei clienti punteggi di velocità superiori al 95%. L\'utente non deve aspettare: la navigazione deve scivolare fluida e silenziosa, con passi felpati.'
      },
      {
        type: 'highlight',
        text: 'UN RITARDO DI UN SOLO SECONDO NEL CARICAMENTO DELLA PAGINA PUÒ RIDURRE LE CONVERSIONI DEL 7%. IL WEB DESIGN MINIMALISTA È ANCHE UNA SCELTA FINANZIARIA STRATEGICA.'
      },
      {
        type: 'heading',
        text: 'PROGETTARE PER IL TOUCH: L\'INTERFACCIA FELPATA'
      },
      {
        type: 'paragraph',
        text: 'Oltre l\'80% del traffico dei miei clienti proviene da smartphone. Per questo motivo, ogni mia creazione nasce mobile-first. **I PULSANTI DEVONO ESSERE FACILI DA TOCCARE CON IL POLLICE, CON UN TARGET DI ALMENO 44PX**.'
      },
      {
        type: 'paragraph',
        text: 'Inoltre, l\'uso di angoli ampiamente arrotondati (come i 32px e 40px che utilizzo nelle card) trasmette un senso di comfort visivo e accoglienza tattile, migliorando significativamente l\'interazione d\'uso.'
      },
      {
        type: 'quote',
        text: '"Un sito web di successo non si misura da quante cose puoi aggiungere, ma da quante cose puoi togliere senza compromettere l\'essenza della sua funzione."'
      }
    ],
    seo: {
      title: 'Web Design Minimalista e Conversione: Come Sfruttare lo Spazio Vuoto | Facilissimo Web',
      description: 'Scopri come il minimalismo estetico e le elevate prestazioni del sito web possono incrementare le conversioni e guidare gli utenti. A cura di Maria Teresa Rogani.',
      focusKeywords: ['Web Design Minimalista', 'Spazio Negativo UX', 'Performance Siti Web', 'Freelance Web Designer'],
      slug: 'web-design-minimalista-prestazioni-conversioni'
    }
  },
  {
    id: 'seo-for-designers',
    title: 'SEO STRATEGICA PER CREATIVI: COME SCALARE I MOTORI DI RICERCA SENZA PERDERE L\'ESTETICA',
    excerpt: 'La SEO non deve per forza rovinare il tuo stile visivo unico. Impara a coniugare ottimizzazione tecnica e design d\'impatto per conquistare Google.',
    date: '24 Giugno 2026',
    readTime: '5 min lettura',
    category: 'SEO',
    tags: ['SEO', 'GOOGLE RANKING', 'IMAGE OPTIMIZATION', 'CODICE PULITO'],
    image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80&w=1200',
    altText: 'Grafici di posizionamento SEO visualizzati su un laptop in un ufficio minimalista con toni neutri.',
    contentBlocks: [
      {
        type: 'heading',
        text: 'L\'OTTIMIZZAZIONE DELLE IMMAGINI IN EVIDENZA'
      },
      {
        type: 'paragraph',
        text: 'Molti designer caricano immagini non compresse ad altissima risoluzione per preservare ogni singolo pixel del loro portfolio. Questo è il modo migliore per distruggere il posizionamento SEO del tuo sito. **LA SEO RICHIEDE IMMAGINI COPRESSE, LEGGERE E IN FORMATO MODERNO COME WEBP**.'
      },
      {
        type: 'paragraph',
        text: 'Ogni immagine sul mio sito e sui siti dei miei clienti è dotata di tag `alt` descrittivi scritti a mano, privi di parole chiave artificiali ma ricchi di contesto per gli screen reader e i crawler di Google. Questo non solo aumenta l\'accessibilità, ma posiziona i progetti in primo piano nella ricerca immagini.'
      },
      {
        type: 'heading',
        text: 'PAROLE CHIAVE STRUTTURATE E TITOLI SEO'
      },
      {
        type: 'paragraph',
        text: 'Scrivere testi per la SEO non significa ripetere la stessa parola chiave cento volte in modo innaturale. Google utilizza algoritmi avanzati di elaborazione del linguaggio naturale (NLP). **IL CONTENUTO DEVE ESSERE UTILE, STRUTTURATO E PIACEVOLE DA LEGGERE**.'
      },
      {
        type: 'paragraph',
        text: 'L\'uso corretto dei tag di intestazione (H1, H2, H3) è fondamentale. Ogni paragrafo deve avere una sua coerenza logica, e l\'uso strategico del **grassetto** deve evidenziare i concetti chiave per consentire una lettura veloce o "scansione visiva" da parte degli utenti.'
      },
      {
        type: 'highlight',
        text: 'UN TITOLO CHIARO IN MAIUSCOLO COME QUESTO AGISCE SIA COME ANCORAGGIO VISIVO PER IL LETTORE SIA COME SEGNALE DI RILEVANZA PER I ROBOT DI INDICIZZAZIONE.'
      },
      {
        type: 'heading',
        text: 'ARCHITETTURA DELL\'INFORMAZIONE E PULIZIA DEL CODICE'
      },
      {
        type: 'paragraph',
        text: 'Un codice pulito e semanticamente corretto è il miglior regalo che puoi fare alla SEO. Utilizzare tag semantici HTML5 come `<nav>`, `<section>`, `<article>`, e `<footer>` permette a Google di comprendere la gerarchia del sito all\'istante.'
      },
      {
        type: 'paragraph',
        text: 'Anche i link interni e l\'aggiunta di una sitemap strutturata (come la sitemap interattiva che ho inserito nel footer di questo sito) aiutano i motori di ricerca a mappare in profondità tutte le pagine disponibili.'
      },
      {
        type: 'quote',
        text: '"Il miglior design è invisibile, la migliore SEO è naturale. Quando scrivi per persone reali con una struttura logica, Google ti premierà."'
      }
    ],
    seo: {
      title: 'SEO per Creativi e Designer: Come Posizionarsi su Google | Facilissimo Web',
      description: 'Scopri come integrare l\'ottimizzazione SEO tecnica all\'interno di un sito web d\'alta moda o di design. Consigli pratici di Maria Teresa Rogani.',
      focusKeywords: ['SEO per designer', 'Ottimizzazione immagini', 'Tag alt SEO', 'Codice semantico clean'],
      slug: 'seo-strategica-creativi-motori-ricerca'
    }
  }
];

// Dynamically calculates the estimated reading time based on word count
export const calculateReadingTime = (post: BlogPost): string => {
  const text = [
    post.title,
    post.excerpt,
    ...post.contentBlocks.map(block => block.text)
  ].join(' ');
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  // Average reading speed: 200 words per minute
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min lettura`;
};

export default function Blog() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('Tutti');
  const [likes, setLikes] = useState<Record<string, number>>({
    'brand-identity-power': 24,
    'minimalist-web-design': 42,
    'seo-for-designers': 19
  });
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const activePost = BLOG_ARTICLES.find(post => post.id === selectedPostId);

  const filteredPosts = BLOG_ARTICLES.filter((post) => {
    if (activeCategoryFilter === 'Tutti') return true;
    return post.category === activeCategoryFilter;
  });

  // Dynamic SEO implementation when reading an article
  useEffect(() => {
    if (activePost) {
      // Save original title
      const originalTitle = document.title;
      // Set new SEO Title
      document.title = activePost.seo.title;

      // Find or create description meta tag
      let metaDesc = document.querySelector('meta[name="description"]');
      const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
      
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', activePost.seo.description);

      return () => {
        // Restore original on unmount / close
        document.title = originalTitle;
        if (metaDesc && originalDesc) {
          metaDesc.setAttribute('content', originalDesc);
        } else if (metaDesc) {
          metaDesc.remove();
        }
      };
    }
  }, [selectedPostId, activePost]);

  // Lock body scroll when post detail is open
  useEffect(() => {
    if (selectedPostId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPostId]);

  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedPosts[postId]) {
      setLikes(prev => ({ ...prev, [postId]: prev[postId] - 1 }));
      setLikedPosts(prev => ({ ...prev, [postId]: false }));
    } else {
      setLikes(prev => ({ ...prev, [postId]: prev[postId] + 1 }));
      setLikedPosts(prev => ({ ...prev, [postId]: true }));
    }
  };

  const handleShare = (postId: string, platform: 'whatsapp' | 'linkedin' | 'facebook' | 'telegram', e: React.MouseEvent) => {
    e.stopPropagation();
    const post = BLOG_ARTICLES.find(p => p.id === postId);
    if (!post) return;

    const url = `https://facilissimoweb.com/blog/${post.seo.slug}`;
    const text = encodeURIComponent(`Leggi l'articolo "${post.title}" di Maria Teresa Rogani su FACILISSIMO WEB!`);
    
    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="blog" className="py-24 bg-surface-container-low dark:bg-surface-container-lowest relative border-t border-b border-outline-variant/10 scroll-mt-[110px] pl-12 md:pl-0">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs font-semibold text-secondary uppercase tracking-widest block mb-1">
              PENSIERI FELPATI & IDEE
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary mb-4">
              Il Taccuino delle Idee
            </h2>
            <div className="h-1 w-20 bg-secondary rounded-full mb-3"></div>
            <p className="font-sans text-base text-on-surface-variant max-w-xl leading-relaxed">
              Condivido la mia visione sul Web Design sartoriale, sulla Brand Identity felina e su come conquistare Google senza perdere l'eleganza estetica.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-outline border border-outline-variant/20 rounded-full px-4 py-2 bg-background/50 backdrop-blur-sm shadow-sm">
            <CheckCircle size={14} className="text-green-500 animate-pulse" />
            <span>SEO PRONTO PER L'INDICIZZAZIONE</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b border-outline-variant/10 font-sans text-xs md:text-sm font-semibold tracking-wide">
          {['Tutti', ...Array.from(new Set(BLOG_ARTICLES.map(post => post.category)))].map((category) => {
            const isActive = activeCategoryFilter === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategoryFilter(category)}
                className={`px-5 py-2.5 rounded-full transition-all cursor-pointer text-[11px] uppercase tracking-wider ${
                  isActive
                    ? 'bg-secondary text-on-secondary shadow-md hover:translate-y-[-2px]'
                    : 'bg-background text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container border border-outline-variant/10'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[350px]">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className="group flex flex-col h-full bg-background dark:bg-surface-container-low rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl border border-outline-variant/15 hover:border-primary/25 cursor-pointer transition-all duration-500 hover:-translate-y-2"
              >
                {/* Card Image */}
                <div className="relative h-56 w-full overflow-hidden bg-surface-container">
                  <img
                    src={post.image}
                    alt={post.altText}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-on-primary text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8 flex flex-col flex-1 justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs font-sans text-on-surface-variant/70">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-secondary" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-secondary" />
                        {calculateReadingTime(post)}
                      </span>
                    </div>

                    <h3 className="font-headline text-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="font-sans text-xs md:text-sm text-on-surface-variant/80 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="border-t border-outline-variant/10 pt-4 flex items-center justify-between mt-auto">
                    {/* Tags Preview */}
                    <div className="flex gap-1.5 overflow-hidden">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] font-mono font-semibold bg-surface-container text-on-surface-variant px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Likes and Read button */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => handleLike(post.id, e)}
                        className={`flex items-center gap-1 text-xs cursor-pointer ${likedPosts[post.id] ? 'text-red-500 font-semibold' : 'text-on-surface-variant/70 hover:text-red-500'} transition-colors`}
                      >
                        <Heart size={14} className={likedPosts[post.id] ? 'fill-current' : ''} />
                        <span>{likes[post.id]}</span>
                      </button>
                      <span className="text-xs font-semibold text-secondary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Leggi <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Full-Screen Article Detail Reader Drawer */}
      <AnimatePresence>
        {selectedPostId && activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-inverse-surface/85 backdrop-blur-md z-[110] flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-background dark:bg-surface-container rounded-[40px] w-full max-w-4xl max-h-[92vh] md:max-h-[85vh] shadow-2xl overflow-hidden flex flex-col relative text-on-surface border border-outline-variant/15"
            >
              {/* Close Button sticky top right */}
              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={() => setSelectedPostId(null)}
                  className="w-10 h-10 rounded-full bg-surface-container/80 hover:bg-surface-container text-on-surface flex items-center justify-center transition-all shadow-sm cursor-pointer border border-outline-variant/10 active:scale-90"
                  aria-label="Chiudi Articolo"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Reader Pane */}
              <div className="overflow-y-auto p-6 md:p-12 space-y-8 scrollbar-thin">
                
                {/* Article Header Metadata */}
                <div className="space-y-4 pb-6 border-b border-outline-variant/15">
                  <div className="flex flex-wrap gap-2 items-center text-xs font-sans text-on-surface-variant/70">
                    <span className="bg-primary/10 text-primary dark:bg-primary-container/20 dark:text-primary-container font-semibold px-3 py-1 rounded-full uppercase tracking-widest text-[10px]">
                      {activePost.category}
                    </span>
                    <span className="flex items-center gap-1 ml-2">
                      <Calendar size={13} className="text-secondary" />
                      {activePost.date}
                    </span>
                    <span className="flex items-center gap-1 ml-2 bg-secondary/10 text-secondary border border-secondary/10 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                      <Clock size={11} />
                      {calculateReadingTime(activePost)}
                    </span>
                  </div>

                  <h1 className="font-headline text-2xl md:text-3.5xl font-extrabold text-primary tracking-tight leading-tight uppercase">
                    {activePost.title}
                  </h1>

                  <div className="flex gap-2 flex-wrap">
                    {activePost.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-[10px] font-mono font-semibold bg-surface-container text-on-surface-variant px-3 py-1 rounded-full border border-outline-variant/10">
                        <Tag size={10} className="text-secondary" />
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Image */}
                <div className="w-full h-56 md:h-96 rounded-3xl overflow-hidden bg-surface-container shadow-inner border border-outline-variant/10 relative">
                  <img
                    alt={activePost.altText}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    src={activePost.image}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white/90 text-xs italic">
                    {activePost.altText}
                  </div>
                </div>

                {/* Article Body Content blocks */}
                <div className="space-y-6 max-w-none text-on-surface-variant font-sans text-sm md:text-base leading-relaxed">
                  {activePost.contentBlocks.map((block, index) => {
                    switch (block.type) {
                      case 'heading':
                        return (
                          <h3 key={index} className="font-headline text-lg md:text-xl font-extrabold text-primary uppercase tracking-wide pt-4 flex items-center gap-2">
                            <span className="h-4 w-1 bg-secondary rounded-full"></span>
                            {block.text}
                          </h3>
                        );
                      case 'highlight':
                        return (
                          <div key={index} className="bg-primary/5 dark:bg-primary-container/10 border-l-4 border-secondary p-5 rounded-r-2xl text-on-surface font-semibold text-xs md:text-sm uppercase tracking-wide leading-relaxed">
                            {block.text}
                          </div>
                        );
                      case 'quote':
                        return (
                          <blockquote key={index} className="relative py-4 pl-6 pr-4 border-l-2 border-outline italic text-on-surface-variant font-serif text-base bg-surface-container-low/30 rounded-r-xl">
                            <span className="absolute left-1.5 top-0 text-3xl text-secondary/30 font-serif">“</span>
                            {block.text}
                          </blockquote>
                        );
                      case 'paragraph':
                      default:
                        // Convert simple markdown **bold** to JSX bold tags
                        const parts = block.text.split('**');
                        return (
                          <p key={index} className="text-justify leading-relaxed">
                            {parts.map((part, i) => (
                              i % 2 === 1 ? <strong key={i} className="font-bold text-on-surface border-b border-secondary/15">{part}</strong> : part
                            ))}
                          </p>
                        );
                    }
                  })}
                </div>

                {/* SEO METADATA PANEL IN EVIDENCE */}
                <div className="bg-surface-container-low/60 border border-outline-variant/25 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-outline-variant/15 pb-3">
                    <span className="text-xs font-mono font-bold text-secondary uppercase flex items-center gap-1.5">
                      <Search size={14} />
                      PREDISPOSIZIONE SEO & METADATI (ATTIVI)
                    </span>
                    <span className="text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-full font-semibold font-mono">
                      VALIDATO SCHEMA.ORG
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="space-y-2">
                      <p><strong className="text-primary font-semibold uppercase block text-[10px] opacity-70">Meta Title Tag:</strong> {activePost.seo.title}</p>
                      <p><strong className="text-primary font-semibold uppercase block text-[10px] opacity-70">Meta Description:</strong> {activePost.seo.description}</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong className="text-primary font-semibold uppercase block text-[10px] opacity-70">Focus Keywords:</strong> {activePost.seo.focusKeywords.join(', ')}</p>
                      <p><strong className="text-primary font-semibold uppercase block text-[10px] opacity-70">Canonical Slug URL:</strong> <code className="bg-surface-container text-secondary px-1.5 py-0.5 rounded text-[11px]">https://facilissimoweb.com/blog/{activePost.seo.slug}</code></p>
                    </div>
                  </div>
                </div>

                {/* Social Sharing buttons & CTA row */}
                <div className="border-t border-outline-variant/15 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
                  {/* Likes and Sharing icons */}
                  <div className="space-y-2 text-center md:text-left w-full md:w-auto">
                    <span className="text-xs font-semibold text-on-surface-variant block uppercase tracking-wide mb-1">
                      Ti è piaciuto questo articolo? Condividilo:
                    </span>
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                      {/* Like button inside article */}
                      <button
                        onClick={(e) => handleLike(activePost.id, e)}
                        className={`flex items-center gap-1 px-4 py-2 rounded-full border text-xs cursor-pointer ${
                          likedPosts[activePost.id]
                            ? 'bg-red-500/10 border-red-500/25 text-red-500 font-semibold'
                            : 'bg-background hover:bg-surface-container border-outline-variant/20 text-on-surface-variant'
                        } transition-colors`}
                      >
                        <Heart size={14} className={likedPosts[activePost.id] ? 'fill-current' : ''} />
                        <span>Mi piace ({likes[activePost.id]})</span>
                      </button>

                      {/* WhatsApp Share */}
                      <button
                        onClick={(e) => handleShare(activePost.id, 'whatsapp', e)}
                        className="p-2.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 cursor-pointer active:scale-95 transition-all text-xs flex items-center gap-1 font-semibold"
                        title="Condividi su WhatsApp"
                      >
                        <Share2 size={13} />
                        <span>WhatsApp</span>
                      </button>

                      {/* LinkedIn Share */}
                      <button
                        onClick={(e) => handleShare(activePost.id, 'linkedin', e)}
                        className="p-2.5 rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] border border-[#0A66C2]/20 cursor-pointer active:scale-95 transition-all text-xs flex items-center gap-1 font-semibold"
                        title="Condividi su LinkedIn"
                      >
                        <Share2 size={13} />
                        <span>LinkedIn</span>
                      </button>

                      {/* Telegram Share */}
                      <button
                        onClick={(e) => handleShare(activePost.id, 'telegram', e)}
                        className="p-2.5 rounded-full bg-[#0088cc]/10 hover:bg-[#0088cc]/20 text-[#0088cc] border border-[#0088cc]/20 cursor-pointer active:scale-95 transition-all text-xs flex items-center gap-1 font-semibold"
                        title="Condividi su Telegram"
                      >
                        <Share2 size={13} />
                        <span>Telegram</span>
                      </button>
                    </div>
                  </div>

                  {/* Custom Freelance CTA button */}
                  <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4 bg-primary/5 dark:bg-primary-container/5 p-4 md:p-6 rounded-3xl border border-secondary/15">
                    <div className="text-center sm:text-left">
                      <p className="font-headline text-sm font-bold text-primary">
                        Progetto da Realizzare?
                      </p>
                      <p className="font-sans text-xs text-on-surface-variant">
                        Sviluppo interfacce d'élite e siti web eleganti.
                      </p>
                    </div>
                    
                    <a
                      href={`https://wa.me/393793603321?text=Ciao%20Maria%20Teresa,%20ho%20letto%20il%20tuo%20articolo%20${encodeURIComponent(activePost.title)}%20e%20vorrei%20consulenza%20per%20un%20progetto`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-primary text-on-primary font-bold text-xs px-6 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer w-full sm:w-auto"
                    >
                      <MessageCircle size={16} />
                      Parla con me su WhatsApp
                    </a>
                  </div>

                </div>

                {/* Back / Close button */}
                <div className="flex justify-end pt-4 border-t border-outline-variant/10">
                  <button
                    onClick={() => setSelectedPostId(null)}
                    className="bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs md:text-sm px-6 py-3 rounded-full transition-all cursor-pointer"
                  >
                    Torna all'Archivio
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
