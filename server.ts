import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

async function startServer() {
  const app = express();
  
  // Parse JSON payloads
  app.use(express.json());

  // 1. Dynamic Sitemap.xml endpoint for SEO / Search Engines
  app.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://facilissimoweb.com/</loc>
    <lastmod>2026-06-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://facilissimoweb.com/#services</loc>
    <lastmod>2026-06-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://facilissimoweb.com/#portfolio</loc>
    <lastmod>2026-06-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://facilissimoweb.com/#about</loc>
    <lastmod>2026-06-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://facilissimoweb.com/#contact</loc>
    <lastmod>2026-06-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
  });

  // 2. Secure Groq Chat Integration API
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Campi messaggi non validi' });
      }

      // Robust auto-discovery for Groq API key supporting multiple fallback names
      let apiKey = process.env.GROQ_API_KEY || process.env.Facilissimo_Groq || process.env.FACILISSIMO_GROQ;
      
      // If not found yet, scan all environment variables for one containing "groq" or containing a value starting with "gsk_"
      if (!apiKey) {
        const foundKey = Object.keys(process.env).find(key => {
          const val = process.env[key];
          return key.toLowerCase().includes('groq') || (val && val.startsWith('gsk_'));
        });
        if (foundKey) {
          apiKey = process.env[foundKey];
          console.log(`Auto-discovered Groq API key from environment variable: ${foundKey}`);
        }
      }

      if (!apiKey) {
        return res.status(500).json({
          error: 'Servizio di chat temporaneamente non configurato. Immettere la chiave API con il nome "Facilissimo_Groq" o "GROQ_API_KEY" nelle impostazioni (Settings).'
        });
      }

      // Persona definition for Facilissimo Web Assistant with strict formatting and topic guidelines
      const systemMessage = {
        role: 'system',
        content: `Sei l'Assistente AI ufficiale di FACILISSIMO WEB, lo studio di M.Teresa Rogani (P.Iva 02136780430), esperta Web Designer freelance di livello premium, specializzata nella realizzazione di siti web semplici, accessibili ed efficaci.

REGOLA DI LOCK ARGOMENTO (GUARDRAIL RIGIDO):
Devi parlare ESCLUSIVAMENTE di argomenti inerenti a FACILISSIMO WEB, ossia:
- I servizi dello studio (Web Design, Branding, Social Lead Generation, UI/UX).
- Chi è M.Teresa Rogani, il suo portfolio ("L'Archivio delle Idee") e la sua filosofia ("Il web semplice ed accessibile").
- Come richiedere preventivi o contattare lo studio (compilando il modulo, scrivendo a facilissimoweb.mc@gmail.com, o via WhatsApp al +39 379 360 3321).
Se l'utente fa domande fuori tema (es. ricette, compiti scolastici, programmazione generica non correlata, attualità, argomenti personali o generali), rifiuta cortesemente ma con decisione di rispondere. Di' che come assistente di FACILISSIMO WEB puoi rispondere solo a domande inerenti allo studio, al design o ai servizi offerti, e ricollegati subito a come puoi aiutarlo a far crescere la sua presenza online con semplicità.

REGOLA DI FORMATTAZIONE RIGIDA (ELENCHI DI 3 PUNTI):
Ogni tua risposta deve rispettare tassativamente questa struttura sintattica:
1. Una brevissima frase introduttiva (max 1 riga).
2. Un elenco puntato composto da esattamente TRE (3) punti salienti. Non di più, non di meno. Ogni punto deve iniziare con un trattino ("-") o un asterisco ("*").
3. All'interno di ciascuno dei 3 punti dell'elenco, evidenzia in GRASSETTO (usando la sintassi markdown **parola**) le parole chiave e i concetti principali più importanti per catturare l'attenzione.
4. Una brevissima frase di chiusura che invita all'azione o propone il contatto.

Mantieni uno stile professionale, accogliente, diretto, semplice ed estremamente chiaro, senza analogie feline o tribali. Rispondi sempre in lingua italiana.`
      };

      // Query Groq Cloud API
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [systemMessage, ...messages],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Groq API Error Response:', errText);
        try {
          const errObj = JSON.parse(errText);
          if (errObj.error && errObj.error.message) {
            return res.status(response.status).json({ error: `Errore Groq: ${errObj.error.message}` });
          }
        } catch (e) {}
        return res.status(response.status).json({ error: `Errore servizio Groq: ${response.statusText} - ${errText}` });
      }

      const data = await response.json();
      const assistantReply = data.choices?.[0]?.message?.content || 'Nessuna risposta disponibile.';
      
      return res.json({ reply: assistantReply });
    } catch (error: any) {
      console.error('Server Chat Endpoint Error:', error);
      return res.status(500).json({ error: 'Errore interno nel proxy server della chat.' });
    }
  });

  // 3. Vite middleware for development
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
