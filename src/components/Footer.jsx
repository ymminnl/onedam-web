import React from 'react';
import { useLocation } from 'react-router-dom';
import serverInfo from '../data/server-info';
import { Heart } from 'lucide-react';

function Footer() {
  const { serverName } = serverInfo;
  const currentYear = new Date().getFullYear();
  
  const location = useLocation();
  const isWiki = location.pathname === '/wiki';

  // AJUSTE DE COLORES:
  // "Más dureza" = Tonos ligeramente más claros/sólidos que el fondo para que la barra se defina mejor.
  // Wiki: Fondo es #090914 -> Footer sube a #0c0c1c (Un toque más azulado/visible)
  // Home: Fondo es #0a0c10 -> Footer sube a #0e1016 (Un toque más gris/sólido)
  const footerBgClass = isWiki 
    ? "bg-[#0c0c1c]/95 border-white/10" 
    : "bg-[#0e1016]/95 border-hytale-gold/10";

  return (
    <footer className={`${footerBgClass} backdrop-blur-md border-t py-2 relative z-20 mt-auto transition-colors duration-500 snap-end`}>
      <div className="container mx-auto px-4 flex justify-center items-center">
        
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3 text-center">
            
            <h2 className="text-xs font-serif font-bold text-hytale-gold tracking-wide">
              {serverName}
            </h2>

            <span className="hidden md:inline text-[10px] text-hytale-text/30">|</span>
            
            <p className="hidden md:block text-[10px] text-hytale-text/50 max-w-xs truncate">
              {serverInfo.footerDescription}
            </p>

            <span className="hidden md:inline text-[10px] text-hytale-text/30">|</span>

            <div className="text-[10px] text-hytale-text/30 font-mono flex items-center gap-1">
               <span>&copy; {currentYear}</span>
               <span>-</span>
               <span className="flex items-center gap-1">
                 Hecho con <Heart size={8} className="text-red-500/50 fill-red-500/50" />
               </span>
            </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;