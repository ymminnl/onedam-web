import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import newsData from '../data/news.json';

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
  return (
    <section className="container mx-auto px-4 pt-24 pb-16 relative z-10 min-h-screen">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 md:mb-16"
      >
        {/* Título responsive: 3xl en móvil, 7xl en PC */}
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif text-hytale-gold drop-shadow-lg mb-4 md:mb-6 break-words uppercase">
          Noticias y Actualizaciones
        </h1>
        <p className="text-lg md:text-xl text-hytale-text max-w-2xl mx-auto px-2">
          Mantente al día con los últimos eventos, parches y anuncios de Onedam.
        </p>
      </motion.div>

      {newsData.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {newsData.map((newsItem) => (
            <motion.div
              key={newsItem.id}
              variants={itemVariants}
              className="bg-hytale-blue rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-[0_0_20px_rgba(205,176,117,0.15)] hover:-translate-y-2 flex flex-col border border-white/5"
            >
              {newsItem.image && (
                <div className="overflow-hidden h-48">
                  <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-serif text-hytale-gold mb-3 line-clamp-2">
                  {newsItem.title}
                </h3>
                <p className="text-xs font-bold text-hytale-text/50 mb-4 uppercase tracking-wider">
                  {newsItem.date}
                </p>
                <p className="text-hytale-text leading-relaxed flex-grow mb-6 line-clamp-3 text-sm md:text-base">
                  {newsItem.excerpt}
                </p>
                <Link
                  to={`/news/${newsItem.id}`}
                  className="mt-auto inline-block text-center bg-hytale-gold hover:bg-hytale-gold-hover text-hytale-dark font-bold py-2 px-5 rounded-md transition-colors shadow-sm w-full md:w-auto"
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
          animate={{ opacity: 1 }}
          className="text-center py-16 md:py-20 bg-black/20 rounded-xl border border-white/10 border-dashed max-w-2xl mx-auto mx-4"
        >
          <p className="text-xl md:text-2xl text-hytale-text/50 font-serif">
            Sin novedades por ahora...
          </p>
          <p className="mt-2 text-hytale-text/30 px-4">
            Estamos trabajando en cosas increíbles. ¡Vuelve pronto!
          </p>
        </motion.div>
      )}
    </section>
  );
}

export default NewsPage;