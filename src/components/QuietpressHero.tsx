import React, { useState } from 'react';
import { ShoppingCart, Menu, X, BarChart3, Heart } from 'lucide-react';
import { BoomerangVideoBg } from './BoomerangVideoBg';

export const QuietpressHero: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const navLinks = ['Anthology', 'Talents', 'Sound diary', 'Playback salon'];

  return (
    <div
      className="relative h-screen w-full overflow-hidden select-none quietpress-scope"
      style={{
        fontFamily: "'Helvetica Regular', Helvetica, Arial, sans-serif",
        height: '100dvh',
      }}
    >
      {/* Background Boomerang Video */}
      <BoomerangVideoBg />

      {/* Header (absolute, top, z-20) */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo (left) */}
          <div className="flex items-center gap-2.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 256 256"
              fill="#ffffff"
              className="shrink-0"
            >
              <path d="M 256 256 L 128 256 C 198.692 256 256 198.692 256 128 C 256 57.308 198.692 0 128 0 C 57.308 0 0 57.308 0 128 C 0 198.692 57.308 256 128 256 L 0 256 L 0 0 L 256 0 Z M 128 104 C 141.255 104 152 114.745 152 128 C 152 141.255 141.255 152 128 152 C 114.745 152 104 141.255 104 128 C 104 114.745 114.745 104 128 104 Z" />
            </svg>
            <span className="text-base tracking-tight text-white font-medium">
              quietpress
            </span>
          </div>

          {/* Nav links (center, hidden on mobile) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-white/90 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button className="flex items-center gap-2.5 rounded-xl bg-white p-1 pr-3 sm:pr-4 hover:scale-105 active:scale-95 transition-transform duration-200 shadow-md">
              <div className="h-7 w-7 rounded-lg bg-blue-700 flex items-center justify-center text-white shrink-0">
                <ShoppingCart size={14} strokeWidth={2} />
              </div>
              <span className="text-sm font-medium text-gray-900 hidden sm:inline">
                Cart (0)
              </span>
              <span className="text-sm font-medium text-gray-900 sm:hidden">
                (0)
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="liquid-glass h-9 w-9 rounded-xl flex items-center justify-center md:hidden text-white transition-transform duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 liquid-glass mx-4 rounded-2xl p-2 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-white/90 hover:bg-white/10 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero Content (centered, z-10) */}
      <main className="relative z-10 flex flex-col items-center text-center pt-28 sm:pt-36 md:pt-44 px-4 sm:px-6">
        {/* 1. Tag badge */}
        <div
          className="liquid-glass rounded-lg px-4 py-1.5 text-xs sm:text-sm text-white mb-5 sm:mb-6 animate-fade-up delay-1 inline-block"
          style={{ background: 'rgba(255, 255, 255, 0.16)' }}
        >
          Press 04 . Vernal woods
        </div>

        {/* 2. Headline */}
        <h1 className="max-w-3xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-white font-normal animate-fade-up delay-2 tracking-tight">
          records cut for the
          <br />
          calm listener.
        </h1>

        {/* 3. Subtext */}
        <p className="mt-5 sm:mt-6 max-w-md text-sm sm:text-base md:text-lg leading-relaxed text-white/90 font-normal animate-fade-up delay-3">
          Drone, roots, and nature-captured sound on wax LPs. Every disc cut
          just once, snag it or miss.
        </p>

        {/* 4. Two buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 animate-fade-up delay-4 w-full sm:w-auto px-6 sm:px-0">
          <button className="w-full sm:w-auto rounded-xl bg-white px-7 py-2.5 text-sm text-gray-900 font-medium hover:scale-105 active:scale-95 transition-transform duration-200 shadow-md">
            Browse the shelves
          </button>
          <button className="w-full sm:w-auto liquid-glass rounded-xl px-7 py-2.5 text-sm text-white font-medium hover:scale-105 active:scale-95 transition-transform duration-200">
            Newest arrivals
          </button>
        </div>
      </main>

      {/* Now Playing Widget (bottom-right, z-20) */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-10 z-20 max-w-[270px] sm:max-w-none sm:w-72 animate-fade-up delay-5">
        {/* Track card */}
        <div className="rounded-2xl bg-white p-2.5 pr-4 shadow-xl flex items-center gap-3">
          <div
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-11 w-11 rounded-xl bg-blue-700 flex items-center justify-center shrink-0 cursor-pointer text-white hover:scale-105 active:scale-95 transition-transform duration-200"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            <BarChart3
              size={20}
              strokeWidth={2.5}
              className={isPlaying ? 'animate-pulse' : 'opacity-70'}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              Helia Marsh -- Fern Light
            </div>
            {/* Progress bar */}
            <div className="h-1 rounded-full bg-gray-200 w-full overflow-hidden mt-1.5">
              <div className="w-[30%] h-full bg-blue-700 rounded-full" />
            </div>
            {/* Times */}
            <div className="flex justify-between text-[10px] text-gray-500 font-normal mt-1">
              <span>0:33</span>
              <span>-1:21</span>
            </div>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-2 mt-2">
          <button className="flex-1 rounded-2xl bg-white py-2 text-sm text-gray-900 font-medium shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200">
            Prev
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="h-10 w-10 rounded-full bg-white shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 flex items-center justify-center shrink-0"
            aria-label="Like track"
          >
            <Heart
              size={16}
              className={`transition-colors duration-200 ${
                isLiked
                  ? 'text-blue-700 fill-blue-700'
                  : 'text-blue-700 fill-none'
              }`}
            />
          </button>
          <button className="flex-1 rounded-2xl bg-white py-2 text-sm text-gray-900 font-medium shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
