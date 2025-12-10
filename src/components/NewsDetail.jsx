import React from 'react';
import { useParams, Link } from 'react-router-dom';
import newsData from '../data/news.json';
import { ArrowLeft } from 'lucide-react';

function NewsDetail() {
  const { id } = useParams();
  const newsItem = newsData.find(item => item.id === parseInt(id));

  if (!newsItem) {
    return <div className="text-center text-white py-20">Noticia no encontrada</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in-up">
      <Link to="/" className="inline-flex items-center text-hytale-gold hover:text-white mb-6 transition-colors">
        <ArrowLeft className="mr-2" /> Volver al Inicio
      </Link>
      
      <article className="bg-hytale-blue/90 rounded-lg shadow-xl overflow-hidden border border-hytale-gold/20">
        <img 
          src={newsItem.image} 
          alt={newsItem.title} 
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="p-8">
          <h1 className="text-4xl md:text-5xl font-serif text-hytale-gold mb-4 drop-shadow-md">
            {newsItem.title}
          </h1>
          <p className="text-hytale-text/60 mb-8 italic">{newsItem.date}</p>
          
          <div className="prose prose-invert prose-lg max-w-none text-hytale-text">
            {/* Aquí renderizamos el contenido. Si tienes HTML en el JSON, usa dangerouslySetInnerHTML, si es texto plano: */}
            <p className="whitespace-pre-line leading-relaxed">
              {newsItem.content}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default NewsDetail;