import React from 'react';
import serverInfo from '../data/server-info';
// Importamos iconos. Usamos 'Gamepad2' para representar Discord si no hay icono específico.
import { Twitter, Youtube, Gamepad2, Heart } from 'lucide-react';

const SocialIcons = {
  discord: Gamepad2, // Icono para Discord
  youtube: Youtube,
  twitter: Twitter
};

function Footer() {
  const { serverName, socials } = serverInfo;
  const currentYear = new Date().getFullYear();

  return (
    // Fondo oscuro con desenfoque y borde superior dorado sutil
    <footer className="bg-black/80 backdrop-blur-md border-t border-hytale-gold/10 pt-16 pb-8 relative z-20 mt-auto">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          {/* 1. Logo y Eslogan */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif text-hytale-gold mb-2 tracking-wide drop-shadow-md">
              {serverName}
            </h2>
            <p className="text-hytale-text/60 text-sm max-w-xs mx-auto md:mx-0 font-sans">
              Explora, construye y conquista en un universo sin límites. Únete a la aventura hoy mismo.
            </p>
          </div>

          {/* 2. Redes Sociales (Botones cuadrados elegantes) */}
          <div className="flex gap-4">
            {socials.map((social) => {
              const Icon = SocialIcons[social.icon] || Gamepad2;
              return (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-hytale-text hover:bg-hytale-gold/10 hover:border-hytale-gold hover:text-hytale-gold transition-all duration-300 shadow-lg hover:shadow-gold hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <Icon size={22} />
                </a>
              )
            })}
          </div>
        </div>

        {/* 3. Copyright y Créditos */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-hytale-text/30 font-mono">
          <p>
            &copy; {currentYear} <span className="text-hytale-gold/50">{serverName}</span>. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-2 mt-4 md:mt-0">
            Hecho con <Heart size={12} className="text-red-500/50 fill-red-500/50" /> por la comunidad
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;