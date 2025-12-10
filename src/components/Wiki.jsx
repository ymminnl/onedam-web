import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Shield, Terminal, HelpCircle, Map, Sword, Search, ArrowLeft, AlertTriangle, AlertOctagon, Info, Clock, FileText } from 'lucide-react';
import { wikiContent } from '../data/wiki-data';

// --- CONFIGURACIÓN Y ESTILOS ---
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

const generateId = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// --- VARIANTES DE ANIMACIÓN (RESTAURADAS AL ESTILO INICIO) ---

// 1. Contenedor con cascada (Stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, // Que aparezcan uno tras otro
      delayChildren: 0.1 
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// 2. Ítems subiendo suavemente (Estilo Inicio)
const itemAppearVariants = {
  hidden: { opacity: 0, y: 30 }, // Empieza 30px abajo
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } // Sube lento (0.5s)
  }
};

// 3. Cabecera (Aparición suave)
const headerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, height: "auto", 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, height: 0, overflow: 'hidden', 
    transition: { duration: 0.3 } 
  }
};

// --- COMPONENTE PRINCIPAL ---
function Wiki() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [targetItemId, setTargetItemId] = useState(null);

  const handleBack = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    setTargetItemId(null);
  };

  const handleSearchResultClick = (categoryId, itemId) => {
    setSelectedCategory(categoryId);
    if (itemId) setTargetItemId(itemId);
    setSearchTerm('');
  };

  // Scroll automático
  useEffect(() => {
    if (selectedCategory && targetItemId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(targetItemId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory, targetItemId]);

  // Lógica de Búsqueda
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    const results = [];

    Object.keys(wikiContent).forEach((key) => {
      const content = wikiContent[key];
      const categoryMeta = wikiCategories.find(c => c.id === key);
      if (!content) return;

      if (content.title.toLowerCase().includes(term) || content.description.toLowerCase().includes(term)) {
        results.push({
          type: 'category',
          categoryId: key,
          itemId: `cat-${key}`,
          title: content.title,
          subtitle: 'Categoría Principal',
          icon: categoryMeta?.icon || Book,
          matchContext: content.description
        });
      }

      if (content.sections) {
        content.sections.forEach(section => {
          section.items.forEach(item => {
            if (
              item.name.toLowerCase().includes(term) || 
              item.desc.toLowerCase().includes(term) ||
              (item.sanction && item.sanction.toLowerCase().includes(term))
            ) {
              results.push({
                type: 'item',
                categoryId: key,
                itemId: generateId(item.name),
                title: item.name,
                subtitle: `En: ${section.title}`,
                icon: FileText,
                matchContext: item.desc,
                severity: item.severity
              });
            }
          });
        });
      }
    });
    return results;
  }, [searchTerm]);

  const activeContent = selectedCategory ? wikiContent[selectedCategory] : null;

  // --- RENDERS AUXILIARES ---

  const renderHeader = () => (
    <AnimatePresence>
      {!selectedCategory && (
        <motion.div
          variants={headerVariants}
          initial="hidden" animate="visible" exit="exit"
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-hytale-gold drop-shadow-lg mb-4 md:mb-6 break-words">
            Wiki Oficial
          </h1>
          <p className="text-lg md:text-xl text-hytale-text max-w-2xl mx-auto mb-8 md:mb-10 px-2">
            Todo lo que necesitas saber para sobrevivir y dominar en Onedam.
          </p>

          <div className="relative max-w-xl mx-auto group w-full z-20">
            <input
              type="text"
              placeholder="Buscar reglas, comandos, objetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3 md:py-4 bg-black/40 backdrop-blur-md border border-hytale-gold/30 rounded-xl text-hytale-text placeholder-hytale-text/50 focus:outline-none focus:border-hytale-gold transition-all shadow-lg text-sm md:text-base"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Search className="text-hytale-gold opacity-50 group-focus-within:opacity-100 transition-opacity" size={20} />
            </div>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-hytale-text/50 hover:text-white transition-colors z-10"
              >
                <ArrowLeft size={18} className="rotate-45" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderDetail = () => (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto w-full"
    >
      <button
        onClick={handleBack}
        className="flex items-center text-hytale-gold hover:text-white mb-6 md:mb-8 transition-colors group px-3 py-2 rounded-lg hover:bg-white/5 text-sm md:text-base"
      >
        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver a Categorías
      </button>

      {activeContent ? (
        <div>
          <h2 className="text-3xl md:text-5xl font-serif text-hytale-gold mb-4 md:mb-6 drop-shadow-md text-center md:text-left break-words">
            {activeContent.title}
          </h2>
          <p className="text-lg md:text-xl text-hytale-text/80 mb-8 md:mb-12 text-center md:text-left px-2">
            {activeContent.description}
          </p>

          <div className="space-y-8 md:space-y-12">
            {activeContent.sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4 md:mb-6 pb-2 border-b border-white/10">
                  <section.icon className="text-hytale-gold w-6 h-6 md:w-7 md:h-7" />
                  <h3 className="text-xl md:text-2xl font-bold text-hytale-text font-serif">{section.title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item, i) => {
                    const itemId = generateId(item.name);
                    const isTarget = targetItemId === itemId;
                    return (
                      <div
                        key={i}
                        id={itemId}
                        className={`p-4 md:p-5 rounded-xl border backdrop-blur-sm transition-all duration-300 
                          ${getSeverityStyles(item.severity)}
                          ${isTarget ? 'ring-2 ring-hytale-gold ring-offset-2 ring-offset-black scale-[1.02] shadow-[0_0_30px_rgba(205,176,117,0.3)]' : 'hover:-translate-y-1 hover:shadow-lg'}
                        `}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h4 className="text-base md:text-lg font-bold text-hytale-text">{item.name}</h4>
                          {item.severity && <SeverityIcon severity={item.severity} />}
                        </div>
                        <p className="text-sm text-hytale-text/70 mb-4 leading-relaxed">
                          {item.desc}
                        </p>
                        {item.sanction && (
                          <div className="flex flex-wrap items-center gap-2 mt-auto">
                            <span className="text-xs font-bold uppercase tracking-wider text-white/50">Sanción:</span>
                            <span className="text-xs font-mono bg-black/40 px-2 py-1 rounded text-white border border-white/5">
                              {item.sanction}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {activeContent.lastUpdated && (
            <div className="mt-12 md:mt-20 pt-8 border-t border-white/10 text-center">
              <p className="inline-flex items-center gap-2 text-hytale-text/40 text-xs md:text-sm font-mono bg-black/20 px-4 py-2 rounded-full border border-white/5">
                <Clock size={14} />
                Actualizado: <span className="text-hytale-gold/60">{activeContent.lastUpdated}</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-black/20 rounded-xl border border-white/10 border-dashed">
          <p className="text-2xl text-hytale-text/50 font-serif">Contenido en construcción...</p>
          <p className="mt-2 text-hytale-text/30">Pronto agregaremos información sobre {selectedCategory}.</p>
        </div>
      )}
    </motion.div>
  );

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return (
        <motion.div
          key="results-empty"
          variants={containerVariants} // Usar fade suave
          initial="hidden" animate="visible" exit="exit"
          className="text-center py-20"
        >
          <Search className="mx-auto text-hytale-text/20 mb-4" size={48} />
          <p className="text-hytale-text/50 text-lg">No encontramos nada sobre "{searchTerm}"</p>
          <p className="text-hytale-text/30 text-sm">Prueba con palabras como "hacks", "protección", "chat"...</p>
        </motion.div>
      );
    }

    return (
      <motion.div
        key="results-list"
        variants={containerVariants} // Usar variante con stagger
        initial="hidden" animate="visible" exit="exit"
        className="max-w-4xl mx-auto w-full"
      >
        <p className="text-hytale-text/50 mb-6 text-sm uppercase tracking-widest pl-2">
          Resultados encontrados: {searchResults.length}
        </p>
        <div className="grid grid-cols-1 gap-4">
          {searchResults.map((result) => (
            <motion.div
              key={`${result.categoryId}-${result.itemId}`}
              variants={itemAppearVariants} // Usar variante que sube lento
              // NO forzamos initial/animate aquí porque el padre (containerVariants) lo controla
              onClick={() => handleSearchResultClick(result.categoryId, result.itemId)}
              className="flex items-start gap-4 p-5 bg-black/40 backdrop-blur-md border border-white/10 hover:border-hytale-gold/50 rounded-xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg group"
            >
              <div className="p-3 bg-hytale-gold/10 rounded-lg text-hytale-gold group-hover:text-white transition-colors">
                <result.icon size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-white group-hover:text-hytale-gold transition-colors">
                    {result.title}
                  </h3>
                  <span className="text-xs text-hytale-text/40 bg-black/30 px-2 py-1 rounded border border-white/5">
                    {result.type === 'category' ? 'Categoría' : 'Artículo'}
                  </span>
                </div>
                <p className="text-xs text-hytale-gold/70 mb-1 font-mono uppercase tracking-wide">
                  {result.subtitle}
                </p>
                <p className="text-hytale-text/70 text-sm line-clamp-2">
                  {result.matchContext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderCategories = () => (
    <motion.div
      key="categories-grid"
      variants={containerVariants} // Usar variante con stagger
      initial="hidden" animate="visible" exit="exit"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      {wikiCategories.map((category) => (
        <motion.div
          key={category.id}
          variants={itemAppearVariants} // Usar variante que sube lento
          onClick={() => setSelectedCategory(category.id)}
          className="group bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/5 hover:border-hytale-gold/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(205,176,117,0.1)] hover:-translate-y-1 h-full"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-hytale-gold/10 rounded-lg group-hover:bg-hytale-gold/20 transition-colors">
              <category.icon className="text-hytale-gold w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif text-hytale-text group-hover:text-hytale-gold transition-colors">
              {category.title}
            </h3>
          </div>
          <p className="text-hytale-text/70 leading-relaxed text-sm md:text-base">
            {category.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <section className="container mx-auto px-4 pt-36 pb-16 relative z-10 min-h-screen flex flex-col">
      {renderHeader()}
      <AnimatePresence mode="wait">
        {selectedCategory ? renderDetail() : (searchTerm ? renderSearchResults() : renderCategories())}
      </AnimatePresence>
    </section>
  );
}

export default Wiki;