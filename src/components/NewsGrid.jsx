import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import newsData from '../data/news.json';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
};

function NewsGrid() {
  return (
    <section className="relative w-full bg-gaming-bg py-16 z-20">
      
      <div className="absolute top-1 left- w-full h-32 -translate-y-full bg-gradient-to-b from-transparent to-gaming-bg pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-serif text-hytale-gold text-center mb-12 drop-shadow-lg"
        >
          Últimas Noticias
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                <h3 className="text-2xl font-serif text-hytale-gold mb-3 line-clamp-2">
                  {newsItem.title}
                </h3>
                <p className="text-xs font-bold text-hytale-text/50 mb-4 uppercase tracking-wider">
                  {newsItem.date}
                </p>
                <p className="text-hytale-text leading-relaxed flex-grow mb-6 line-clamp-3">
                  {newsItem.excerpt}
                </p>
                <Link
                  to={`/news/${newsItem.id}`}
                  className="mt-auto inline-block text-center bg-hytale-gold hover:bg-hytale-gold-hover text-hytale-dark font-bold py-2 px-5 rounded-md transition-colors shadow-sm"
                >
                  Leer Más
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default NewsGrid;