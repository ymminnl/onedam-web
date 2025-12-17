import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

// ⚠️ CAMBIA ESTA URL por la dirección real donde corre tu bot.
// Si estás probando en tu PC, usa: "http://localhost:8080/api/news"
// Si está en un hosting (ej. Railway), usa: "https://tu-bot.up.railway.app/api/news"
const API_URL = "https://TU_URL_DEL_BOT_AQUI.com/api/news"; 

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo conectar con el servidor de noticias");
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
    <div className="min-h-screen bg-[#1a1614] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Título de la Sección */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-hytale-gold mb-4 font-cinzel">
            Noticias de Onedam
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Entérate de las últimas actualizaciones, eventos y novedades directamente desde nuestro equipo.
          </p>
        </motion.div>

        {/* Pantalla de Carga */}
        {loading && (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
             <Loader2 className="w-12 h-12 text-hytale-gold animate-spin" />
             <p className="text-hytale-gold font-mono animate-pulse">Buscando pergaminos...</p>
          </div>
        )}

        {/* Pantalla de Error */}
        {error && (
          <div className="flex flex-col items-center justify-center text-red-400 bg-red-900/10 p-10 rounded-xl border border-red-900/50">
            <AlertCircle className="w-12 h-12 mb-4" />
            <p className="text-xl font-bold">¡Error de conexión!</p>
            <span className="text-sm text-gray-400 mt-2 text-center">
              No pudimos obtener las noticias. Asegúrate de que el Bot esté encendido y la URL sea correcta.
            </span>
          </div>
        )}

        {/* Si no hay noticias */}
        {!loading && !error && news.length === 0 && (
          <div className="text-center text-gray-500 py-20 border border-dashed border-gray-700 rounded-xl">
            <p>No hay noticias publicadas en este momento.</p>
          </div>
        )}

        {/* Grid de Noticias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!loading && !error && news.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-[#2a2624] rounded-xl overflow-hidden border border-[#3a3634] hover:border-hytale-gold/50 transition-all duration-300 shadow-xl"
            >
              {/* Contenedor de Imagen */}
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a2624] to-transparent opacity-60 z-10" />
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.src = "https://onedam.net/images/default_news.jpg"; }} 
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-hytale-gold text-black text-[10px] font-black uppercase tracking-tighter rounded-sm shadow-lg">
                    Oficial
                  </span>
                </div>
              </div>

              {/* Información de la Noticia */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-hytale-gold/70 text-[11px] mb-3 font-mono">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-hytale-gold transition-colors line-clamp-2 font-cinzel">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 text-hytale-gold font-bold text-xs group-hover:gap-4 transition-all cursor-pointer">
                  LEER MÁS <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsPage;