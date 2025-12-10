import React from 'react';
import { ShoppingCart, MessageSquareText, BookOpen, ExternalLink, Users } from 'lucide-react';

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
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} // Asegúrate de que esta imagen exista
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-serif text-hytale-gold drop-shadow-lg mb-4">
          {serverName}
        </h1>
        <p className="text-2xl md:text-3xl text-hytale-text font-sans mb-8">
          Un mundo de aventura y creatividad.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 w-full">
          {/* Botón Principal */}
          <button
            onClick={onToggleBackgroundBlur}
            className="bg-hytale-gold hover:bg-hytale-gold-hover text-hytale-dark font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(205,176,117,0.5)] border-2 border-transparent hover:border-hytale-text"
          >
            Únete Ahora
          </button>

          {/* Botones Secundarios (Iconos) */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {heroLinks.map((link) => {
              const IconComponent = LucideIcons[link.icon];
              const isExternal = link.url.startsWith('http');

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : ""}
                  // CAMBIOS AQUÍ: Agregado 'min-w-[160px]' y 'justify-center'
                  className="group flex items-center justify-center gap-3 px-6 py-3 min-w-[160px] bg-hytale-blue/80 hover:bg-gaming-surface border border-hytale-gold/30 hover:border-hytale-gold text-hytale-text hover:text-hytale-gold rounded-lg transition-all duration-300 backdrop-blur-sm shadow-lg"
                >
                  {IconComponent && <IconComponent className="w-5 h-5 group-hover:drop-shadow-[0_0_5px_rgba(205,176,117,0.8)] transition-all" />}

                  {/* Agregamos uppercase para que coincida con tu imagen (opcional) */}
                  <span className="font-serif tracking-wide uppercase text-sm md:text-base">{link.name}</span>

                  {/* El icono externo se renderiza si es un enlace http */}
                  {isExternal && <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;