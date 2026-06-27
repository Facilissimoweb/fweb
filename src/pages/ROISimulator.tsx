import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Target, Users, ShoppingCart, Send, RefreshCw, DollarSign, Percent } from 'lucide-react';

export default function ROISimulator() {
  const [budget, setBudget] = useState(1000);
  const [cpc, setCpc] = useState(0.50);
  const [conversionRate, setConversionRate] = useState(2);
  const [avgSaleValue, setAvgSaleValue] = useState(500);

  const results = useMemo(() => {
    const clicks = budget / cpc;
    const leads = clicks * (conversionRate / 100);
    const revenue = leads * avgSaleValue;
    const profit = revenue - budget;
    const roi = budget > 0 ? (profit / budget) * 100 : 0;

    return {
      clicks: Math.floor(clicks),
      leads: Math.floor(leads),
      revenue: revenue.toFixed(2),
      profit: profit.toFixed(2),
      roi: roi.toFixed(0)
    };
  }, [budget, cpc, conversionRate, avgSaleValue]);

  const handleSubmit = () => {
    const message = `*Simulazione ROI & Strategia*%0A%0A*Budget Mensile:* €${budget}%0A*CPC Stimato:* €${cpc}%0A*Tasso Conversione:* ${conversionRate}%%0A*Valore Medio Vendita:* €${avgSaleValue}%0A%0A--- *Risultati Stimati* ---%0A*Click:* ${results.clicks}%0A*Leads/Vendite:* ${results.leads}%0A*Fatturato:* €${results.revenue}%0A*Profitto:* €${results.profit}%0A*ROI:* ${results.roi}%`;
    window.open(`https://wa.me/393793603321?text=${message}`, '_blank');
  };

  const handleReset = () => {
    setBudget(1000);
    setCpc(0.50);
    setConversionRate(2);
    setAvgSaleValue(500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 sm:px-10 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl w-full"
      >
        <div className="text-center mb-12">
          <h2 className="text-secondary font-headline text-sm font-black uppercase tracking-[0.3em] mb-2">Simulatore ROI & Strategia</h2>
          <h1 className="text-4xl sm:text-5xl font-headline font-black text-on-surface mb-6 leading-tight">
            Calcola il Tuo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Potenziale</span>
          </h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            Sperimenta con i parametri per capire quanto può rendere il tuo investimento in pubblicità e lead generation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-2 bg-surface/40 dark:bg-surface-dim/40 backdrop-blur-2xl border border-outline-variant/30 rounded-[40px] p-8 sm:p-10 shadow-2xl space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Budget Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-on-surface-variant">
                  <DollarSign size={16} className="text-blue-400" />
                  Budget Mensile
                </label>
                <span className="text-2xl font-black text-primary">€{budget.toLocaleString()}</span>
              </div>
              <input
                type="range" min="100" max="10000" step="100" value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-3 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-tighter">
                <span>€100</span>
                <span>€5,000</span>
                <span>€10,000+</span>
              </div>
            </div>

            {/* CPC Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-on-surface-variant">
                  <Target size={16} className="text-emerald-400" />
                  Costo per Click (CPC)
                </label>
                <span className="text-2xl font-black text-primary">€{cpc.toFixed(2)}</span>
              </div>
              <input
                type="range" min="0.05" max="5" step="0.05" value={cpc}
                onChange={(e) => setCpc(Number(e.target.value))}
                className="w-full h-3 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-tighter">
                <span>€0.05</span>
                <span>€2.50</span>
                <span>€5.00</span>
              </div>
            </div>

            {/* Conversion Rate Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-on-surface-variant">
                  <Percent size={16} className="text-purple-400" />
                  Tasso di Conversione
                </label>
                <span className="text-2xl font-black text-primary">{conversionRate}%</span>
              </div>
              <input
                type="range" min="0.1" max="10" step="0.1" value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-3 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-tighter">
                <span>0.1%</span>
                <span>5%</span>
                <span>10%</span>
              </div>
            </div>

            {/* Sale Value Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-on-surface-variant">
                  <ShoppingCart size={16} className="text-orange-400" />
                  Valore Medio Vendita
                </label>
                <span className="text-2xl font-black text-primary">€{avgSaleValue.toLocaleString()}</span>
              </div>
              <input
                type="range" min="10" max="5000" step="10" value={avgSaleValue}
                onChange={(e) => setAvgSaleValue(Number(e.target.value))}
                className="w-full h-3 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-tighter">
                <span>€10</span>
                <span>€2,500</span>
                <span>€5,000</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 hover:text-primary transition-colors"
            >
              <RefreshCw size={12} />
              Ripristina Default
            </button>
          </div>

          {/* Results Panel */}
          <div className="bg-[#11052C] dark:bg-[#0c051a] rounded-[40px] p-8 sm:p-10 text-white shadow-2xl flex flex-col justify-between border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <h3 className="font-headline font-black text-xl uppercase tracking-tighter border-b border-white/10 pb-4">
                Risultati Stimati
              </h3>

              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div className="text-white/60 text-xs font-bold uppercase tracking-widest">Click Totali</div>
                  <div className="text-3xl font-black text-blue-400">{results.clicks}</div>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div className="text-white/60 text-xs font-bold uppercase tracking-widest">Leads / Vendite</div>
                  <div className="text-3xl font-black text-emerald-400">{results.leads}</div>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <div className="text-white/60 text-xs font-bold uppercase tracking-widest">Fatturato Lordo</div>
                  <div className="text-3xl font-black text-white">€{Number(results.revenue).toLocaleString()}</div>
                </div>
                <div className="pt-4">
                  <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Ritorno sull'investimento</div>
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    {results.roi}%
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-10">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59,130,246,0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="w-full bg-white text-[#11052C] font-headline font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all"
              >
                Invia Strategia
                <Send size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
