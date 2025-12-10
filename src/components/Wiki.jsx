import React from 'react';
import { motion } from 'framer-motion';
// Asegúrate de que Search esté importado
import { Book, Shield, Terminal, HelpCircle, Map, Sword, Search } from 'lucide-react';

const wikiCategories = [
  { id: 'rules', title: 'Reglas', icon: Shield, description: 'Normas de convivencia y sanciones.' },
  { id: 'commands', title: 'Comandos', icon: Terminal, description: 'Lista de comandos útiles para jugadores.' },
  { id: 'ranks', title: 'Rangos', icon: Sword, description: 'Beneficios VIP y jerarquía del servidor.' },
  { id: 'faq', title: 'Preguntas Frecuentes', icon: HelpCircle, description: 'Respuestas a las dudas más comunes.' },
  { id: 'world', title: 'El Mundo', icon: Map, description: 'Mapa, biomas y ubicaciones clave.' },
  { id: 'items', title: 'Items Especiales', icon: Book, description: 'Guía de objetos únicos y crafteos.' },
];

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

function Wiki() {
  return (
    <section className="container mx-auto px-4 pt-32 pb-16 relative z-10">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif text-hytale-gold drop-shadow-lg mb-6"
        >
          Wiki Oficial
        </motion.h1>
        <p className="text-xl text-hytale-text max-w-2xl mx-auto mb-10">
          Todo lo que necesitas saber para sobrevivir y dominar en Onedam.
        </p>

        {/* CONTENEDOR DEL BUSCADOR */}
        {/* 'relative' es vital para que el icono absoluto se posicione respecto a esta caja */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-w-xl mx-auto group"
        >
          {/* INPUT */}
          {/* 'pl-12' deja espacio a la izquierda para el icono */}
          <input
            type="text"
            placeholder="Buscar en la wiki..."
            className="w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-md border border-hytale-gold/30 rounded-xl text-hytale-text placeholder-hytale-text/50 focus:outline-none focus:border-hytale-gold transition-all shadow-lg"
          />

          {/* ICONO DE LUPA */}
          {/* 'absolute' para flotar encima, 'z-10' para estar al frente, 'pointer-events-none' para poder hacer clic a través de él */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Search className="text-hytale-gold opacity-50 group-focus-within:opacity-100 transition-opacity" size={20} />
          </div>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {wikiCategories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            className="group bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/5 hover:border-hytale-gold/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(205,176,117,0.1)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-hytale-gold/10 rounded-lg group-hover:bg-hytale-gold/20 transition-colors">
                <category.icon className="text-hytale-gold w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-hytale-text group-hover:text-hytale-gold transition-colors">
                {category.title}
              </h3>
            </div>
            <p className="text-hytale-text/70 leading-relaxed">
              {category.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Wiki;