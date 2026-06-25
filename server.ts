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

  // 2. Diagnostics Endpoint for Groq API Connection
  app.get('/api/chat/diagnostics', async (req, res) => {
    try {
      const keysChecked: Record<string, { exists: boolean; length?: number; prefix?: string; suffix?: string }> = {};
      const keyNames = ['GROQ_API_KEY', 'Facilissimo_Groq', 'FACILISSIMO_GROQ'];
      
      keyNames.forEach(name => {
        const value = process.env[name];
        if (value) {
          keysChecked[name] = {
            exists: true,
            length: value.length,
            prefix: value.substring(0, 4),
            suffix: value.substring(Math.max(0, value.length - 4))
          };
        } else {
          keysChecked[name] = { exists: false };
        }
      });

      // Search all keys containing "groq" or values starting with "gsk_"
      const otherKeys: string[] = [];
      Object.keys(process.env).forEach(key => {
        if (!keyNames.includes(key)) {
          const val = process.env[key];
          if (key.toLowerCase().includes('groq') || (val && val.startsWith('gsk_'))) {
            otherKeys.push(key);
            keysChecked[key] = {
              exists: true,
              length: val ? val.length : 0,
              prefix: val ? val.substring(0, 4) : '',
              suffix: val ? val.substring(Math.max(0, val.length - 4)) : ''
            };
          }
        }
      });

      // Find the key we would actually use
      let selectedKey = process.env.GROQ_API_KEY || process.env.Facilissimo_Groq || process.env.FACILISSIMO_GROQ;
      let selectedKeyName = process.env.GROQ_API_KEY ? 'GROQ_API_KEY' : (process.env.Facilissimo_Groq ? 'Facilissimo_Groq' : (process.env.FACILISSIMO_GROQ ? 'FACILISSIMO_GROQ' : ''));
      
      if (!selectedKey && otherKeys.length > 0) {
        selectedKeyName = otherKeys[0];
        selectedKey = process.env[selectedKeyName];
      }

      if (!selectedKey) {
        return res.json({
          ok: false,
          error_code: 'NO_API_KEY',
          message: 'Nessuna chiave API Groq rilevata nelle variabili d\'ambiente.',
          keys_checked: keysChecked,
          advice: 'Assicurati di aver aggiunto "Facilissimo_Groq" o "GROQ_API_KEY" nella scheda Secrets delle impostazioni (Settings) dell\'applet in AI Studio, e poi clicca su "Restart Dev Server" per caricarla.'
        });
      }

      // Try a real quick connection to Groq with 1 token max to verify validity
      try {
        const testResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${selectedKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: 'hi' }],
            max_tokens: 1
          })
        });

        if (testResponse.ok) {
          return res.json({
            ok: true,
            message: 'La connessione a Groq funziona perfettamente!',
            selected_key_name: selectedKeyName,
            key_details: {
              length: selectedKey.length,
              prefix: selectedKey.substring(0, 4),
              suffix: selectedKey.substring(Math.max(0, selectedKey.length - 4))
            }
          });
        } else {
          const errText = await testResponse.text();
          return res.json({
            ok: false,
            error_code: 'GROQ_API_ERROR',
            status: testResponse.status,
            message: `Groq ha rifiutato la chiave API. Dettaglio: ${errText}`,
            selected_key_name: selectedKeyName,
            advice: 'La chiave API inserita potrebbe non essere valida, scaduta, o mancare di credito sul portale console.groq.com. Verifica la correttezza dei caratteri copiate.'
          });
        }
      } catch (err: any) {
        return res.json({
          ok: false,
          error_code: 'FETCH_ERROR',
          message: `Impossibile contattare i server di Groq: ${err.message}`,
          advice: 'Si è verificato un errore di rete durante il tentativo di connessione con Groq.'
        });
      }
    } catch (e: any) {
      return res.status(500).json({ ok: false, error: e.message });
    }
  });

  // 3. Secure Groq Chat Integration API
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
          error: 'Servizio di chat temporaneamente non configurato. Immettere la chiave API con il nome "Facilissimo_Groq" o "GROQ_API_KEY" nelle impostazioni (Settings) dell\'applicazione.'
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

      // Ordered list of candidate models on Groq to attempt, for high availability and graceful fallback
      const candidateModels = [
        'llama-3.3-70b-versatile',
        'llama-3.3-70b-specdec',
        'llama-3.1-70b-versatile',
        'llama-3.1-8b-instant',
        'mixtral-8x7b-32768'
      ];

      let lastError = null;
      let assistantReply = null;

      // Query Groq Cloud API with fallbacks
      for (const modelName of candidateModels) {
        try {
          console.log(`Attempting chat completion with model: ${modelName}`);
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: modelName,
              messages: [systemMessage, ...messages],
              temperature: 0.7,
              max_tokens: 1024
            })
          });

          if (response.ok) {
            const data = await response.json();
            assistantReply = data.choices?.[0]?.message?.content;
            if (assistantReply) {
              console.log(`Success using model ${modelName}`);
              break; // Success! Exit loop
            }
          } else {
            const errText = await response.text();
            console.warn(`Model ${modelName} failed with status ${response.status}:`, errText);
            lastError = `Status ${response.status}: ${errText}`;
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} threw network error:`, err.message);
          lastError = err.message;
        }
      }

      if (assistantReply) {
        return res.json({ reply: assistantReply });
      }

      // If we got here, all models failed
      console.error('All Groq candidate models failed. Last error:', lastError);
      return res.status(502).json({
        error: `Tutti i modelli Groq disponibili hanno fallito l'esecuzione. Dettaglio ultimo errore: ${lastError || 'Nessun dettaglio disponibile.'}`
      });

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
