import React from 'react';
import serverInfo from '../data/server-info';
// Importamos iconos. Usamos 'Clapperboard' para TikTok (Lucide no tiene TikTok oficial).
import { Instagram, Clapperboard, Gamepad2, Heart } from 'lucide-react';

const SocialIcons = {
  discord: Gamepad2,
  tiktok: Clapperboard, // Icono alternativo para TikTok
  instagram: Instagram
};

function Footer() {
  const { serverName, socials } = serverInfo;
  const currentYear = new Date().getFullYear();

  return (
    // Fondo oscuro con desenfoque y borde superior dorado sutil. Padding reducido (pt-10).
    <footer className="bg-black/80 backdrop-blur-md border-t border-hytale-gold/10 pt-10 pb-8 relative z-20 mt-auto">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          
          {/* 1. Logo y Eslogan */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif text-hytale-gold mb-1 tracking-wide drop-shadow-md">
              {serverName}
            </h2>
            <p className="text-hytale-text/60 text-xs max-w-xs mx-auto md:mx-0 font-sans">
              {serverInfo.footerDescription}
            </p>
          </div>

          {/* 2. Redes Sociales (Botones cuadrados elegantes) */}
          <div className="flex gap-3">
            {socials.map((social) => {
              const Icon = SocialIcons[social.icon] || Gamepad2;
              return (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-hytale-text hover:bg-hytale-gold/10 hover:border-hytale-gold hover:text-hytale-gold transition-all duration-300 shadow-lg hover:shadow-gold hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>

        {/* 3. Copyright y Créditos */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-hytale-text/30 font-mono">
          <p>
            &copy; {currentYear} <span className="text-hytale-gold/50">{serverName}</span>.
          </p>
          <p className="flex items-center gap-2 mt-2 md:mt-0">
            Hecho con <Heart size={10} className="text-red-500/50 fill-red-500/50" /> para la comunidad
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;