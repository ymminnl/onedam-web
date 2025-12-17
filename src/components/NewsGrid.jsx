import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const API_URL = "https://transcript.onedam.net/api/news";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

function NewsGrid() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        // Solo mostramos las 3 más recientes en el Grid principal
        setNews(data.slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando noticias en Grid:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="news-section" className="relative w-full bg-[#0a0a0c] pt-32 pb-16 z-20 snap-start min-h-screen flex flex-col">
      
      {/* Degradado superior para fundir con las estrellas */}
      <div className="absolute top-0 left-0 w-full h-32 -translate-y-full bg-gradient-to-b from-transparent to-[#0a0a0c] pointer-events-none"></div>

      <div className="container mx-auto px-4 flex-grow">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-serif text-hytale-gold text-center mb-12 drop-shadow-lg"
        >
          Últimas Noticias
        </motion.h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-hytale-gold animate-spin" />
          </div>
        ) : news.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  <h3 className="text-2xl font-serif text-hytale-gold mb-3 line-clamp-2">
                    {newsItem.title}
                  </h3>
                  <p className="text-xs font-bold text-hytale-text/50 mb-4 uppercase tracking-wider flex justify-between">
                    <span>{newsItem.date}</span>
                    <span>{newsItem.author || "Onedam Network"}</span>
                  </p>
                  <p className="text-hytale-text leading-relaxed flex-grow mb-6 line-clamp-3">
                    {newsItem.description}
                  </p>
                  <Link
                    to={`/news/${newsItem.timestamp}`}
                    className="mt-auto inline-block text-center bg-hytale-gold hover:bg-hytale-gold-hover text-[#1a1614] font-black py-2.5 px-5 rounded-md transition-all duration-300 shadow-sm uppercase text-xs tracking-tighter"
                  >
                    Leer Más
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20 bg-black/20 rounded-xl border border-white/10 border-dashed"
          >
            <p className="text-2xl text-hytale-text/50 font-serif">
              Sin novedades por ahora...
            </p>
            <p className="mt-2 text-hytale-text/30">
              Pronto agregaremos información sobre noticias y eventos.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default NewsGrid;