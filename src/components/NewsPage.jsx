import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';

// URL de tu API en el Bot
const API_URL = "https://transcript.onedam.net/api/news";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error");
        return res.json();
      })
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando noticias:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="container mx-auto px-4 pt-24 pb-16 relative z-10 min-h-screen">
      <div className="fixed inset-0 z-[-20] bg-[#0a0a0c]"></div>
      <div className="fixed inset-0 z-[-15] bg-gradient-to-b from-transparent to-[#050508] opacity-50 pointer-events-none"></div>
      
      {/* Título y Cabecera */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 md:mb-16"
      >
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif text-hytale-gold drop-shadow-lg mb-4 md:mb-6 break-words uppercase">
          Noticias y Actualizaciones
        </h1>
        <p className="text-lg md:text-xl text-hytale-text max-w-2xl mx-auto px-2">
          Mantente al día con los últimos eventos, parches y anuncios de Onedam.
        </p>
      </motion.div>

      {/* Estado de Carga */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 gap-4">
           <Loader2 className="w-12 h-12 text-hytale-gold animate-spin" />
           <p className="text-hytale-gold font-mono text-sm tracking-widest uppercase">Consultando Archivos...</p>
        </div>
      ) : error ? (
        /* Estado de Error */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-red-950/10 rounded-xl border border-red-500/20 max-w-2xl mx-auto"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-xl text-white font-serif">No se pudo conectar con el bot</p>
          <p className="mt-2 text-gray-400 px-4">Verifica que el servidor de noticias esté en línea.</p>
        </motion.div>
      ) : news.length > 0 ? (
        /* Lista de Noticias Dinámica */
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {news.map((newsItem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/[0.03] backdrop-blur-sm rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-[0_0_20px_rgba(205,176,117,0.1)] hover:-translate-y-2 flex flex-col border border-white/10 hover:border-hytale-gold/30"
            >
              {newsItem.image && (
                <div className="overflow-hidden h-48 relative">
                  <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {e.target.src = "https://onedam.net/images/default_news.jpg"}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent opacity-60"></div>
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-serif text-hytale-gold mb-3 line-clamp-2">
                  {newsItem.title}
                </h3>
                <p className="text-[10px] font-bold text-hytale-text/50 mb-4 uppercase tracking-widest flex justify-between">
                  <span>{newsItem.date}</span>
                  <span>{newsItem.author || "Onedam Network"}</span>
                </p>
                <p className="text-hytale-text leading-relaxed flex-grow mb-6 line-clamp-3 text-sm md:text-base opacity-80">
                  {newsItem.description}
                </p>
                
                {/* Nota: Usamos el timestamp como ID para la ruta de detalle si no tienes uno slug único */}
                <Link
                  to={`/news/${newsItem.timestamp}`}
                  className="mt-auto inline-block text-center bg-hytale-gold hover:bg-hytale-gold-hover text-[#1a1614] font-black py-2.5 px-5 rounded-md transition-all duration-300 shadow-sm w-full md:w-auto uppercase text-xs tracking-tighter"
                >
                  Leer Más
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Si no hay noticias en la BD */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 md:py-20 bg-black/20 rounded-xl border border-white/10 border-dashed max-w-2xl mx-auto"
        >
          <p className="text-xl md:text-2xl text-hytale-text/50 font-serif">
            Sin novedades por ahora...
          </p>
          <p className="mt-2 text-hytale-text/30 px-4">
            Estamos preparando el próximo gran anuncio. ¡Vuelve pronto!
          </p>
        </motion.div>
      )}
    </section>
  );
}

export default NewsPage;