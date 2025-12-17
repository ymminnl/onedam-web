import React from 'react';
import { useLocation } from 'react-router-dom';
import serverInfo from '../data/server-info';
import { Heart } from 'lucide-react';

function Footer() {
  const { serverName } = serverInfo;
  const currentYear = new Date().getFullYear();
  
  const location = useLocation();
  const isWikiPage = location.pathname === '/wiki';
  const isNewsPage = location.pathname === '/news';
  const isNewsDetail = location.pathname.startsWith('/news/');

  let footerBgClass = "bg-[#0a0a0c]/95 border-white/10"; // Default
  if (isWikiPage) footerBgClass = "bg-[#121420]/95 border-white/10";
  if (isNewsPage) footerBgClass = "bg-[#0a0a0c]/95 border-white/10";
  if (isNewsDetail) footerBgClass = "bg-[#0e1826]/95 border-white/10";

  return (
    // CAMBIO: 'snap-start' para que el imán lo atrape y no te rebote hacia arriba.
    <footer className={`${footerBgClass} backdrop-blur-md border-t py-3 relative z-20 mt-auto transition-colors duration-500 snap-start`}>
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