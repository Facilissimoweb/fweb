import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Loader2, Bot, Mic, MicOff, Volume2, VolumeX, MessageCircle } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggleChat = () => {
      setIsOpen((prev) => !prev);
    };
    window.addEventListener('toggle-chat-widget', handleToggleChat);
    return () => {
      window.removeEventListener('toggle-chat-widget', handleToggleChat);
    };
  }, []);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Ciao! Sono l\'Assistente AI di FACILISSIMO WEB. Come posso aiutarti oggi a far conoscere la tua attività online in modo semplice ed efficace?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Speech Recognition (Speech-to-Text) states
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Speech Synthesis (Text-to-Speech) states
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'it-IT';

        rec.onstart = () => {
          setIsListening(true);
        };

        rec.onend = () => {
          setIsListening(false);
        };

        rec.onresult = (event: any) => {
          const speechToText = event.results[0][0].transcript;
          setInputValue((prev) => prev + (prev ? ' ' : '') + speechToText);
        };

        rec.onerror = (event: any) => {
          console.error('Speech recognition error', event);
          setIsListening(false);
        };

        recognitionRef.current = rec;
      }
    } catch (e) {
      console.warn('SpeechRecognition initialization failed or not allowed:', e);
    }
  }, []);

  // Stop synthesis when chat closes
  useEffect(() => {
    try {
      if (!isOpen && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setSpeakingIndex(null);
      }
    } catch (e) {
      console.warn('speechSynthesis cancel failed:', e);
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      setError('Riconoscimento vocale non supportato in questo browser.');
      setTimeout(() => setError(null), 4000);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const speakMessage = (text: string, index: number) => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (speakingIndex === index) {
          window.speechSynthesis.cancel();
          setSpeakingIndex(null);
          return;
        }

        window.speechSynthesis.cancel();

        // Clean text of markdown and bullet symbols for a smoother reading
        const cleanText = text
          .replace(/\*\*/g, '')
          .replace(/[-*•]/g, '')
          .trim();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'it-IT';

        const voices = window.speechSynthesis.getVoices();
        const italianVoice = voices.find(v => v.lang.startsWith('it'));
        if (italianVoice) {
          utterance.voice = italianVoice;
        }

        utterance.onend = () => {
          setSpeakingIndex(null);
        };

        utterance.onerror = () => {
          setSpeakingIndex(null);
        };

        setSpeakingIndex(index);
        window.speechSynthesis.speak(utterance);
      } else {
        setError('Sintesi vocale non supportata in questo browser.');
        setTimeout(() => setError(null), 4000);
      }
    } catch (e) {
      console.warn('Speech synthesis failed:', e);
      setError('Impossibile riprodurre l\'audio in questo ambiente.');
      setTimeout(() => setError(null), 4000);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    if (!textToSend) {
      setInputValue('');
    }
    setError(null);

    // Stop speaking currently active speech
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setSpeakingIndex(null);
      }
    } catch (e) {
      console.warn('speechSynthesis cancel failed inside sendMessage:', e);
    }

    const updatedMessages = [...messages, { role: 'user', content: text } as ChatMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Errore nella comunicazione con il server.');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Qualcosa è andato storto. Riprova più tardi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Safe and clean formatting parser for bold markup and list items
  const renderFormattedContent = (text: string) => {
    const lines = text.split('\n');
    let insideList = false;
    const elements: any[] = [];

    const parseLineText = (lineText: string, lineKey: string | number) => {
      const parts = [];
      let key = 0;
      const boldRegex = /\*\*([^*]+)\*\*/g;
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(lineText)) !== null) {
        if (match.index > lastIndex) {
          parts.push(<span key={key++}>{lineText.substring(lastIndex, match.index)}</span>);
        }
        parts.push(
          <strong key={key++} className="font-bold text-primary dark:text-primary">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < lineText.length) {
        parts.push(<span key={key++}>{lineText.substring(lastIndex)}</span>);
      }
      return parts;
    };

    lines.forEach((line, idx) => {
      let trimmed = line.trim();
      if (!trimmed) return;

      const isBullet = trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.startsWith('•');
      
      if (isBullet) {
        trimmed = trimmed.replace(/^[-*•]\s*/, '');
        elements.push(
          <li key={idx} className="list-disc ml-5 pl-1 text-xs md:text-sm text-on-surface leading-relaxed mb-1.5">
            {parseLineText(trimmed, `bullet-${idx}`)}
          </li>
        );
      } else {
        elements.push(
          <p key={idx} className="text-xs md:text-sm text-on-surface leading-relaxed mb-2 last:mb-0">
            {parseLineText(trimmed, `p-${idx}`)}
          </p>
        );
      }
    });

    return <div className="space-y-1">{elements}</div>;
  };

  const suggestions = [
    'Quali servizi offri?',
    'Chi è M.Teresa Rogani?',
    'Come funziona la Lead Generation?',
    'Come richiedo un preventivo?',
  ];

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-0 md:inset-auto md:bottom-[88px] md:right-6 md:w-[410px] md:h-[580px] md:max-h-[calc(100vh-170px)] bg-white/75 dark:bg-[#1C122C]/75 backdrop-blur-lg border-2 border-[#DDF247] rounded-none md:rounded-[32px] shadow-[0_0_30px_rgba(221,242,71,0.25)] z-[120] flex flex-col overflow-hidden text-on-surface"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Bot size={20} className="text-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-xs md:text-sm tracking-wide leading-none">Facilissimo AI Assistant</h4>
                  <p className="text-[9px] opacity-80 font-sans font-medium uppercase tracking-wider mt-1">
                    Attivo • Studio M.T. Rogani
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
                aria-label="Chiudi chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sticky WhatsApp Contact Bar inside the chat widget */}
            <div className="bg-green-50/90 dark:bg-green-950/20 border-b border-green-100 dark:border-green-900/10 px-4 py-2.5 flex items-center justify-between text-[11px] font-semibold text-green-800 dark:text-green-300 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
                <span>Vuoi parlare direttamente?</span>
              </div>
              <a
                href="https://wa.me/393793603321?text=Ciao%20M.Teresa,%20ho%20visto%20il%20sito%20di%20Facilissimo%20Web%20e%20vorrei%20informazioni%20sui%20tuoi%20servizi"
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white hover:bg-green-700 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <MessageCircle size={12} />
                Contatta M. Teresa
              </a>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-low/30 dark:bg-surface-container-high/10 scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="relative group max-w-[85%]">
                    <div
                      className={`rounded-[22px] p-3.5 font-sans ${
                        msg.role === 'user'
                          ? 'bg-primary text-on-primary rounded-tr-none shadow-sm'
                          : 'bg-white dark:bg-surface-container-high text-on-surface dark:text-on-surface border border-outline-variant/15 dark:border-outline-variant/10 shadow-sm rounded-tl-none'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <p className="text-xs md:text-sm leading-relaxed">{msg.content}</p>
                      ) : (
                        renderFormattedContent(msg.content)
                      )}
                    </div>
                    
                    {/* TTS Action button for Assistant message */}
                    {msg.role === 'assistant' && (
                      <button
                        onClick={() => speakMessage(msg.content, i)}
                        className={`absolute -right-7 top-2 p-1.5 rounded-full shadow-sm border transition-all cursor-pointer ${
                          speakingIndex === i
                            ? 'bg-primary text-on-primary border-primary animate-pulse'
                            : 'bg-white dark:bg-surface-container-highest text-on-surface-variant dark:text-on-surface-variant/90 border-outline-variant/20 dark:border-outline-variant/10 hover:text-primary hover:border-primary/50'
                        }`}
                        title={speakingIndex === i ? 'Ferma lettura' : 'Ascolta risposta'}
                      >
                        {speakingIndex === i ? <VolumeX size={12} /> : <Volume2 size={12} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Suggestions (only shown when conversation is just starting) */}
              {messages.length === 1 && (
                <div className="pt-2 space-y-2">
                  <span className="text-[10px] font-sans font-semibold text-outline tracking-wider uppercase block">
                    Suggerimenti veloci:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestClick(sug)}
                        className="text-left font-sans text-xs font-semibold text-secondary hover:text-primary bg-white dark:bg-surface-container-highest border border-secondary/15 dark:border-outline-variant/15 hover:border-secondary/30 dark:hover:border-primary/30 rounded-full px-3 py-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-surface-container-high border border-outline-variant/20 dark:border-outline-variant/10 shadow-sm rounded-[20px] rounded-tl-none p-3.5 flex items-center gap-2">
                    <Loader2 className="animate-spin text-secondary w-4 h-4" />
                    <span className="font-sans text-xs text-on-surface-variant dark:text-on-surface-variant/90">Facilissimo Web sta riflettendo...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-error-container/30 border border-error/20 rounded-xl text-error text-xs font-sans">
                  <strong>Errore:</strong> {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form with integrated Speech-to-Text Button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white dark:bg-surface-container-low border-t border-outline-variant/10 dark:border-outline-variant/15 flex items-center gap-2 shrink-0"
            >
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
                  isListening
                    ? 'bg-error text-white border-error animate-pulse'
                    : 'bg-surface-container border-outline-variant/10 text-on-surface hover:bg-surface-container-high dark:bg-surface-container-high dark:border-outline-variant/15 dark:text-on-surface'
                }`}
                title={isListening ? 'Interrompi dettatura' : 'Dettatura vocale (Microfono)'}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isListening ? 'Ascolto...' : 'Scrivi un messaggio...'}
                disabled={isLoading}
                className="flex-1 bg-surface-container py-3 px-4 rounded-xl font-sans text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-on-surface dark:bg-surface-container-high dark:text-on-surface disabled:opacity-60"
              />
              
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center hover:bg-secondary cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
