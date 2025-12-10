import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Shield, Terminal, HelpCircle, Map, Sword, Search, ArrowLeft, AlertTriangle, AlertOctagon, Info, Swords, Clock } from 'lucide-react';
import { wikiContent } from '../data/wiki-data';


const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
    y: 20
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.4, type: "spring", stiffness: 100 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(10px)",
    y: -20,
    transition: { duration: 0.3 }
  }
};

const wikiCategories = [
  { id: 'rules', title: 'Reglas', icon: Shield, description: 'Normas de convivencia y sanciones.' },
  { id: 'commands', title: 'Comandos', icon: Terminal, description: 'Lista de comandos útiles para jugadores.' },
  { id: 'ranks', title: 'Rangos', icon: Sword, description: 'Beneficios VIP y jerarquía del servidor.' },
  { id: 'faq', title: 'Preguntas Frecuentes', icon: HelpCircle, description: 'Respuestas a las dudas más comunes.' },
  { id: 'world', title: 'El Mundo', icon: Map, description: 'Mapa, biomas y ubicaciones clave.' },
  { id: 'items', title: 'Items Especiales', icon: Book, description: 'Guía de objetos únicos y crafteos.' },
];

const SeverityIcon = ({ severity }) => {
  if (severity === 'high') return <AlertOctagon className="text-red-500" size={24} />;
  if (severity === 'medium') return <AlertTriangle className="text-orange-400" size={24} />;
  return <Info className="text-blue-400" size={24} />;
};

const getSeverityStyles = (severity) => {
  if (severity === 'high') return "border-red-500/30 hover:border-red-500/60 bg-red-950/20";
  if (severity === 'medium') return "border-orange-500/30 hover:border-orange-500/60 bg-orange-950/20";
  return "border-blue-500/30 hover:border-blue-500/60 bg-blue-950/20";
};

function Wiki() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBack = () => setSelectedCategory(null);
  const activeContent = selectedCategory ? wikiContent[selectedCategory] : null;

  return (
    <section className="container mx-auto px-4 pt-32 pb-16 relative z-10 min-h-screen flex flex-col">
      <AnimatePresence>
        {!selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-center mb-12 overflow-hidden"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-hytale-gold drop-shadow-lg mb-6">
              Wiki Oficial
            </h1>
            <p className="text-xl text-hytale-text max-w-2xl mx-auto mb-10">
              Todo lo que necesitas saber para sobrevivir y dominar en Onedam.
            </p>

            <div className="relative max-w-xl mx-auto group">
              <input
                type="text"
                placeholder="Buscar en la wiki..."
                className="w-full pl-12 pr-4 py-4 bg-black/40 backdrop-blur-md border border-hytale-gold/30 rounded-xl text-hytale-text placeholder-hytale-text/50 focus:outline-none focus:border-hytale-gold transition-all shadow-lg"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Search className="text-hytale-gold opacity-50 group-focus-within:opacity-100 transition-opacity" size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div
            key="grid"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {wikiCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="group bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/5 hover:border-hytale-gold/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(205,176,117,0.1)] hover:-translate-y-1"
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
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="max-w-5xl mx-auto w-full"
          >
            <button
              onClick={handleBack}
              className="flex items-center text-hytale-gold hover:text-white mb-8 transition-colors group px-4 py-2 rounded-lg hover:bg-white/5"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Volver a Categorías
            </button>

            {activeContent ? (
              <div>
                <h2 className="text-4xl md:text-5xl font-serif text-hytale-gold mb-6 drop-shadow-md text-center md:text-left">
                  {activeContent.title}
                </h2>

                <p className="text-xl text-hytale-text/80 mb-12 text-center md:text-left">
                  {activeContent.description}
                </p>

                <div className="space-y-12">
                  {activeContent.sections.map((section, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/10">
                        <section.icon className="text-hytale-gold w-7 h-7" />
                        <h3 className="text-2xl font-bold text-hytale-text font-serif">{section.title}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.items.map((item, i) => (
                          <div
                            key={i}
                            className={`p-5 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${getSeverityStyles(item.severity)}`}
                          >
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <h4 className="text-lg font-bold text-hytale-text">{item.name}</h4>
                              {item.severity && <SeverityIcon severity={item.severity} />}
                            </div>

                            <p className="text-sm text-hytale-text/70 mb-4 leading-relaxed">
                              {item.desc}
                            </p>

                            {item.sanction && (
                              <div className="flex items-center gap-2 mt-auto">
                                <span className="text-xs font-bold uppercase tracking-wider text-white/50">Sanción:</span>
                                <span className="text-xs font-mono bg-black/40 px-2 py-1 rounded text-white border border-white/5">
                                  {item.sanction}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
                {activeContent.lastUpdated && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 pt- text-center"
                  >
                    <p className="inline-flex items-center gap- text-hytale-text/40 text-sm font-mono px- py-">
                      <Clock size={14} />
                      Última actualización: <span className="text-hytale-gold/60">{activeContent.lastUpdated}</span>
                    </p>
                  </motion.div>
                )}

              </div>
            ) : (
              <div className="text-center py-20 bg-black/20 rounded-xl border border-white/10 border-dashed">
                <p className="text-2xl text-hytale-text/50 font-serif">
                  Contenido en construcción...
                </p>
                <p className="mt-2 text-hytale-text/30">
                  Pronto agregaremos información sobre {selectedCategory}.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Wiki;