import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MessageSquareText, BookOpen, ExternalLink, Users } from 'lucide-react';
import serverInfo from '../data/server-info'; // Asegurar importación

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
      className="relative flex items-center justify-center h-screen bg-cover bg-center text-center p-4 z-10"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} 
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Título Principal Estilo Logotipo RPG */}
        <div className="relative mb-6 group cursor-default">
          {/* Capa de Resplandor trasera */}
          <h1 className="absolute inset-0 text-6xl md:text-9xl font-serif font-black text-hytale-gold blur-2xl opacity-40 select-none scale-110">
            {serverName.toUpperCase()}
          </h1>
          
          {/* Texto Principal con Gradiente y Efectos */}
          <h1 className="relative text-6xl md:text-9xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-hytale-gold to-yellow-700 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] transform transition-transform duration-500 hover:scale-105">
            {serverName.toUpperCase()}
          </h1>
          
          {/* Subtítulo decorativo o línea */}
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-hytale-gold to-transparent mt-2 opacity-80"></div>
        </div>

        <p className="text-2xl md:text-3xl text-hytale-text font-sans mb-8 drop-shadow-md">
          {serverInfo.heroDescription}
        </p>

        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <button
            onClick={onToggleBackgroundBlur}
            className="group relative px-12 py-5 bg-gradient-to-br from-yellow-300 via-hytale-gold to-yellow-600 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(205,176,117,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(205,176,117,0.6)] border border-yellow-200/50"
          >
            {/* Contenido del Botón */}
            <span className="relative z-20 font-serif font-black text-2xl uppercase tracking-[0.15em] text-[#1a1a1a] flex items-center gap-2 drop-shadow-sm group-hover:text-black">
              Únete Ahora
            </span>
          </button>

          <div className="grid grid-cols-2 md:flex items-center justify-center gap-4 mt-16 w-full max-w-md md:max-w-none">
            {heroLinks.map((link, index) => {
              const IconComponent = LucideIcons[link.icon];
              const isExternal = link.url.startsWith('http');
              
              // Si es el último elemento (Wiki), lo centramos y limitamos su ancho
              const isLastItem = index === heroLinks.length - 1;
              
              // Ajustes de Grid y Ancho:
              // - Normal: col-span-1 y w-full
              // - Último (Wiki): col-span-2, centrado, ancho del 70% (un poco más ancho que antes para equilibrar el nuevo tamaño)
              const gridAndWidthClass = isLastItem 
                ? "col-span-2 w-[70%] mx-auto md:col-span-1 md:w-auto md:mx-0" 
                : "col-span-1 w-full md:w-auto";

              // ESTILO NUEVO: Azul Profundo (RPG Style), borde dorado, efecto levitación
              const commonClasses = `group relative flex items-center justify-center gap-3 px-6 py-4 bg-[#0f172a]/90 hover:bg-[#1e293b] border-2 border-hytale-gold/40 hover:border-hytale-gold text-hytale-text hover:text-white rounded-xl transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(205,176,117,0.4)] hover:-translate-y-1 ${gridAndWidthClass}`;

              const content = (
                <>
                  {IconComponent && <IconComponent className="w-6 h-6 text-hytale-gold group-hover:text-white transition-colors shrink-0" />}
                  <span className="font-serif font-bold tracking-wider uppercase text-sm sm:text-base md:text-lg truncate drop-shadow-sm">{link.name}</span>
                  {isExternal && <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 shrink-0 text-hytale-gold" />}
                </>
              );

              if (isExternal) {
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={commonClasses}
                  >
                    {content}
                  </a>
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