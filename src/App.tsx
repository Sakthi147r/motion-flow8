import React, { useState, useEffect } from 'react';
import { LithosHero } from './components/LithosHero';
import { QuietpressHero } from './components/QuietpressHero';
import { Sparkles, Disc } from 'lucide-react';

export const App: React.FC = () => {
  // Read initial view from URL hash or search param, default to 'lithos'
  const getInitialBrand = (): 'lithos' | 'quietpress' => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('quietpress')) return 'quietpress';
      if (hash.includes('lithos')) return 'lithos';
      const params = new URLSearchParams(window.location.search);
      if (params.get('brand') === 'quietpress') return 'quietpress';
    }
    return 'lithos';
  };

  const [brand, setBrand] = useState<'lithos' | 'quietpress'>(getInitialBrand);

  useEffect(() => {
    if (brand === 'lithos') {
      document.title = 'Lithos — Layers hold tales of time';
      window.history.replaceState(null, '', '#lithos');
    } else {
      document.title = 'quietpress — records cut for the calm listener';
      window.history.replaceState(null, '', '#quietpress');
    }
  }, [brand]);

  // Keyboard shortcut: 1 for Lithos, 2 for quietpress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') setBrand('lithos');
      if (e.key === '2') setBrand('quietpress');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden font-sans">
      {/* Active Brand Hero Section */}
      {brand === 'lithos' ? <LithosHero /> : <QuietpressHero />}

      {/* Floating Showcase Switcher (Bottom-Center) */}
      <aside
        aria-label="Experience Switcher"
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[110] bg-black/60 hover:bg-black/85 backdrop-blur-xl border border-white/20 rounded-full px-2 py-1.5 flex items-center gap-1.5 shadow-2xl transition-all duration-300"
      >
        <button
          onClick={() => setBrand('lithos')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            brand === 'lithos'
              ? 'bg-white text-black font-semibold shadow-sm scale-[1.02]'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          title="Press '1' to switch to Lithos"
        >
          <Sparkles size={13} className={brand === 'lithos' ? 'text-[#e8702a]' : ''} />
          <span>Lithos</span>
        </button>

        <span className="text-white/30 text-xs">|</span>

        <button
          onClick={() => setBrand('quietpress')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            brand === 'quietpress'
              ? 'bg-white text-black font-semibold shadow-sm scale-[1.02]'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          title="Press '2' to switch to quietpress"
        >
          <Disc size={13} className={brand === 'quietpress' ? 'text-blue-700' : ''} />
          <span>quietpress</span>
        </button>
      </aside>
    </div>
  );
};

export default App;
