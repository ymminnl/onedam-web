import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MessageSquareText, BookOpen, ExternalLink, Users } from 'lucide-react';
import serverInfo from '../data/server-info';

const LucideIcons = {
  ShoppingCart: ShoppingCart,
  MessageSquareText: MessageSquareText,
  BookOpen: BookOpen,
  ExternalLink: ExternalLink,
  Users: Users,
};

function Hero({ onToggleBackgroundBlur, serverName, heroLinks }) {
  return (
    <section
      // Se agregó 'snap-start' al final de las clases
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-center p-4 z-10 snap-start"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* AJUSTE DE POSICIÓN: 'pt-28' añadido para dar espacio desde el top en móvil */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-2 md:pt-0">

        <div className="relative mb-4 md:mb-6 group cursor-default">
          {/* TÍTULO MÁS GRANDE: text-5xl sm:text-6xl */}
          <h1 className="absolute inset-0 text-5xl sm:text-6xl md:text-9xl font-serif font-black text-hytale-gold blur-2xl opacity-40 select-none scale-110">
            {serverName.toUpperCase()}
          </h1>

          {/* TÍTULO PRINCIPAL MÁS GRANDE: text-5xl sm:text-6xl */}
          <h1 className="relative text-5xl sm:text-6xl md:text-9xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-hytale-gold to-yellow-700 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] transform transition-transform duration-500 hover:scale-105">
            {serverName.toUpperCase()}
          </h1>
        </div>

        {/* SUBTÍTULO MÁS GRANDE: text-lg sm:text-xl */}
        <p className="text-lg sm:text-xl md:text-3xl text-hytale-text font-sans mb-6 md:mb-8 drop-shadow-md px-2 max-w-sm md:max-w-none">
          {serverInfo.heroDescription}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 md:gap-6 w-full">
          <button
            onClick={onToggleBackgroundBlur}
            className="group relative px-6 py-2 md:px-12 md:py-5 bg-gradient-to-br from-yellow-300 via-hytale-gold to-yellow-600 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(205,176,117,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(205,176,117,0.6)] border border-yellow-200/50"
          >
            <span className="relative z-20 font-serif font-black text-base md:text-2xl uppercase tracking-[0.15em] text-[#1a1a1a] flex items-center gap-2 drop-shadow-sm group-hover:text-black">
              Únete Ahora
            </span>
          </button>

          <div className="grid grid-cols-2 md:flex items-center justify-center gap-3 md:gap-4 mt-10 md:mt-16 w-full max-w-[320px] sm:max-w-md md:max-w-none">
            {heroLinks.map((link, index) => {
              const IconComponent = LucideIcons[link.icon];
              const isExternal = link.url.startsWith('http');

              const isLastItem = index === heroLinks.length - 1;

              const gridAndWidthClass = isLastItem
                ? "col-span-2 w-auto min-w-[120px] mx-auto md:col-span-1 md:w-auto md:mx-0"
                : "col-span-1 w-full md:w-auto";

              const commonClasses = `group relative flex items-center justify-center gap-2 md:gap-3 px-3 py-2 md:px-5 md:py-3 bg-[#0f172a]/90 hover:bg-[#1e293b] border-2 border-hytale-gold/40 hover:border-hytale-gold text-hytale-text hover:text-white rounded-xl transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(205,176,117,0.4)] hover:-translate-y-1 ${gridAndWidthClass}`;

              const content = (
                <>
                  {IconComponent && <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-hytale-gold group-hover:text-white transition-colors shrink-0" />}
                  <span className="font-serif font-bold tracking-wider uppercase text-xs sm:text-sm md:text-base truncate drop-shadow-sm">{link.name}</span>
                  {isExternal && <ExternalLink className="w-3 h-3 md:w-4 md:h-4 opacity-50 group-hover:opacity-100 shrink-0 text-hytale-gold" />}
                </>
              );

              if (isExternal) {
                return (
                  <button
                    key={link.id}
                    onClick={() => window.location.href = link.url}
                    className={commonClasses}
                  >
                    {content}
                  </button>
                );
              }

              return (
                <Link
                  key={link.id}
                  to={link.url}
                  className={commonClasses}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;