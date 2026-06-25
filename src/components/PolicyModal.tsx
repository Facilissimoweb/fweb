import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'cookie';
}

export default function PolicyModal({ isOpen, onClose, type }: PolicyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-[32px] p-8 md:p-10 shadow-2xl z-10 flex flex-col text-on-surface"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-outline hover:text-primary transition-colors cursor-pointer rounded-full bg-surface-container"
              aria-label="Chiudi"
            >
              <X size={20} />
            </button>

            {type === 'privacy' ? (
              <div className="space-y-6 font-sans">
                <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary tracking-tight">
                  Informativa sulla Privacy (Privacy Policy)
                </h3>
                <div className="h-0.5 w-16 bg-secondary rounded-full"></div>

                <div className="text-sm md:text-base leading-relaxed text-on-surface-variant space-y-4">
                  <p>
                    Benvenuto su <strong>FACILISSIMO WEB</strong>. La tua privacy è estremamente importante per noi. Questa Informativa sulla Privacy descrive come raccogliamo, utilizziamo, proteggiamo e condividiamo i tuoi dati personali in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR) dell'Unione Europea.
                  </p>

                  <h4 className="font-headline text-lg font-bold text-primary mt-6">
                    1. Titolare del Trattamento dei Dati
                  </h4>
                  <p>
                    Il Titolare del trattamento dei dati raccolti tramite questo sito web è:<br />
                    <strong>FACILISSIMO WEB di M.Teresa Rogani</strong><br />
                    Partita IVA: <strong>02136780430</strong><br />
                    Email di contatto: <a href="mailto:facilissimoweb.mc@gmail.com" className="text-secondary hover:underline">facilissimoweb.mc@gmail.com</a>
                  </p>

                  <h4 className="font-headline text-lg font-bold text-primary mt-6">
                    2. Tipologie di Dati Raccolti
                  </h4>
                  <p>
                    Raccogliamo i dati personali che decidi di fornirci spontaneamente tramite i moduli di contatto presenti sul sito, in particolare:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Nome o Ragione Sociale</li>
                    <li>Indirizzo Email</li>
                    <li>Contenuto del messaggio inviato</li>
                    <li>Dati di navigazione anonimi o statistici forniti tramite cookie analitici (es. indirizzo IP mascherato, pagine visitate)</li>
                  </ul>

                  <h4 className="font-headline text-lg font-bold text-primary mt-6">
                    3. Finalità del Trattamento
                  </h4>
                  <p>
                    I tuoi dati personali sono trattati esclusivamente per le seguenti finalità:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Rispondere alle tue richieste di preventivo, informazione o collaborazione inviate tramite il modulo di contatto o email.</li>
                    <li>Analizzare in forma anonima e aggregata le visite al sito per migliorarne le performance, l'usabilità e la navigazione.</li>
                    <li>Garantire la sicurezza del sito web e prevenire attività fraudolente o dannose.</li>
                  </ul>

                  <h4 className="font-headline text-lg font-bold text-primary mt-6">
                    4. Base Giuridica del Trattamento
                  </h4>
                  <p>
                    Trattiamo i tuoi dati sulla base del tuo esplicito consenso (es. compilando il modulo di contatto e selezionando la casella di accettazione) o per l'esecuzione di misure precontrattuali adottate su tua richiesta (es. richiesta di preventivo).
                  </p>

                  <h4 className="font-headline text-lg font-bold text-primary mt-6">
                    5. Periodo di Conservazione dei Dati
                  </h4>
                  <p>
                    I dati forniti tramite il modulo di contatto saranno conservati solo per il tempo strettamente necessario a gestire la tua richiesta e per l'eventuale successiva gestione del rapporto professionale, salvo obblighi di legge o richieste di cancellazione anticipata da parte tua.
                  </p>

                  <h4 className="font-headline text-lg font-bold text-primary mt-6">
                    6. I Tuoi Diritti
                  </h4>
                  <p>
                    In base al GDPR, hai il diritto di accedere ai tuoi dati personali, chiederne la rettifica o la cancellazione, limitarne il trattamento, opporti al trattamento o richiedere la portabilità dei dati. Puoi esercitare questi diritti in qualsiasi momento inviando una email a <a href="mailto:facilissimoweb.mc@gmail.com" className="text-secondary hover:underline">facilissimoweb.mc@gmail.com</a>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 font-sans">
                <h3 className="font-headline text-2xl md:text-3xl font-bold text-primary tracking-tight">
                  Informativa sui Cookie (Cookie Policy)
                </h3>
                <div className="h-0.5 w-16 bg-secondary rounded-full"></div>

                <div className="text-sm md:text-base leading-relaxed text-on-surface-variant space-y-4">
                  <p>
                    Questo sito web, <strong>FACILISSIMO WEB di M.Teresa Rogani (P.Iva 02136780430)</strong>, utilizza i cookie per rendere l'esperienza di navigazione più efficiente, sicura e personalizzata.
                  </p>

                  <h4 className="font-headline text-lg font-bold text-primary mt-6">
                    1. Cosa sono i Cookie?
                  </h4>
                  <p>
                    I cookie sono piccoli file di testo che i siti visitati dagli utenti inviano ai loro terminali (solitamente al browser), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.
                  </p>

                  <h4 className="font-headline text-lg font-bold text-primary mt-6">
                    2. Quali Cookie Utilizziamo?
                  </h4>
                  <p>
                    Utilizziamo diverse tipologie di cookie per differenti funzioni:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Cookie Tecnici Necessari:</strong> Essenziali per il corretto funzionamento del sito web (es. memorizzazione del consenso sui cookie stessi). Non possono essere disattivati.
                    </li>
                    <li>
                      <strong>Cookie di Preferenza o Funzionali:</strong> Utilizzati per ricordare scelte effettuate dall'utente (es. lo stato di apertura del pannello di assistenza AI) al fine di fornire un'esperienza più fluida.
                    </li>
                    <li>
                      <strong>Cookie Analitici:</strong> Utilizzati per raccogliere informazioni statistiche in forma anonima e aggregata sul numero degli utenti e su come questi visitano il sito.
                    </li>
                  </ul>

                  <h4 className="font-headline text-lg font-bold text-primary mt-6">
                    3. Consenso e Gestione delle Preferenze
                  </h4>
                  <p>
                    Al primo accesso al sito, ti viene mostrato un banner informativo che ti permette di accettare l'uso dei cookie o di personalizzare le tue preferenze. Puoi revocare o modificare il tuo consenso in qualsiasi momento cancellando la cache del browser o modificando le impostazioni dei cookie nel tuo browser web.
                  </p>

                  <h4 className="font-headline text-lg font-bold text-primary mt-6">
                    4. Come disattivare i Cookie tramite browser
                  </h4>
                  <p>
                    La maggior parte dei browser è configurata per accettare i cookie. Tuttavia, puoi disabilitare o bloccare i cookie modificando direttamente le preferenze del tuo browser (Chrome, Firefox, Safari, Edge, ecc.). Tieni presente che la disattivazione dei cookie tecnici potrebbe compromettere la corretta visualizzazione di alcune parti del sito.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-outline-variant/20 flex justify-end">
              <button
                onClick={onClose}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-headline font-semibold cat-pounce cursor-pointer shadow-md text-sm"
              >
                Ho Capito
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
