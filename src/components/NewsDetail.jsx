import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

const API_URL = "https://transcript.onedam.net/api/news";

function NewsDetail() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error cargando noticias");
        return res.json();
      })
      .then((data) => {
        // Buscamos la noticia por timestamp (el id de la URL)
        const found = data.find(item => item.timestamp.toString() === id);
        setNewsItem(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <Loader2 className="w-12 h-12 text-hytale-gold animate-spin" />
        <p className="text-hytale-gold font-mono text-sm tracking-widest uppercase">Cargando Noticia...</p>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="container mx-auto py-24 px-4 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl text-white font-serif mb-4">No se pudo encontrar la noticia</h2>
        <Link to="/news" className="text-hytale-gold hover:underline flex items-center justify-center">
          <ArrowLeft className="mr-2" /> Volver a Noticias
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-[#0e1826]">
      {/* Fondo sólido integrado */}
      <div className="fixed inset-0 z-[-15] bg-gradient-to-b from-transparent to-black/40 pointer-events-none"></div>

      <div className="container mx-auto py-24 px-4 animate-fade-in-up flex-grow relative z-10">
        <Link to="/news" className="inline-flex items-center text-hytale-gold hover:text-white mb-12 transition-colors group w-fit">
          <ArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" /> Volver a Noticias
        </Link>
        
        <article className="max-w-4xl mx-auto w-full">
          {newsItem.image && (
            <div className="w-full h-[300px] md:h-[550px] relative mb-12 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
              <img 
                src={newsItem.image} 
                alt={newsItem.title} 
                className="w-full h-full object-cover"
                onError={(e) => {e.target.src = "https://onedam.net/images/default_news.jpg"}}
              />
            </div>
          )}
          
          <div className="px-2 md:px-0">
            <h1 className="text-4xl md:text-6xl font-serif text-hytale-gold mb-8 leading-tight drop-shadow-lg">
              {newsItem.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-12 text-hytale-text/50 font-mono text-xs md:text-sm uppercase tracking-[0.2em]">
              <span>{newsItem.date}</span>
              <span className="w-1.5 h-1.5 bg-hytale-gold rounded-full"></span>
              <span className="text-hytale-gold/80">Publicado por {newsItem.author || "Onedam Network"}</span>
            </div>
            
            <div className="prose prose-invert prose-xl max-w-none">
              <p className="text-hytale-text leading-relaxed whitespace-pre-wrap text-lg md:text-xl opacity-90">
                {newsItem.description}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default NewsDetail;