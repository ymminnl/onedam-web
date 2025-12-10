import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Shield, Terminal, HelpCircle, Map, Sword, Search, ArrowLeft, ArrowRight, AlertTriangle, AlertOctagon, Info, Clock, FileText } from 'lucide-react';
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
  if (severity === 'high') return "border-l-red-600 shadow-[inset_10px_0_20px_-10px_rgba(220,38,38,0.1)]"; // Rojo intenso
  if (severity === 'medium') return "border-l-orange-500 shadow-[inset_10px_0_20px_-10px_rgba(249,115,22,0.1)]"; // Naranja
  return "border-l-blue-500 shadow-[inset_10px_0_20px_-10px_rgba(59,130,246,0.1)]"; // Azul/Info
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

// 2. Ítems apareciendo suavemente (Sin movimiento, solo Fade)
const itemAppearVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.5, ease: "easeOut" }
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

// 4. Detalle de Tarjeta (Transición Cinemática tipo Página)
const pageTransitionVariants = {
  hidden: { opacity: 0, y: 10 }, // Solo opacidad y un ligero movimiento vertical
  visible: { 
    opacity: 1, y: 0,
    filter: 'blur(0px)', // Forzamos 0 por si acaso
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, y: -10, // Salida suave hacia arriba
    transition: { duration: 0.3, ease: "easeIn" }
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

  // Scroll al inicio al entrar a una categoría
  useEffect(() => {
    if (selectedCategory) {
      // Usamos un timeout y scroll instantáneo para asegurar que funcione
      // incluso si la altura de la página cambia drásticamente
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 10);
    }
  }, [selectedCategory]);

  // Scroll automático a items específicos
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

  const renderDetail = () => {
    // Calcular índices para navegación
    const currentIndex = wikiCategories.findIndex(c => c.id === selectedCategory);
    const prevCat = currentIndex > 0 ? wikiCategories[currentIndex - 1] : null;
    const nextCat = currentIndex < wikiCategories.length - 1 ? wikiCategories[currentIndex + 1] : null;

    return (
    <motion.div
      key="detail"
      variants={pageTransitionVariants}
      initial="hidden" animate="visible" exit="exit"
      className="max-w-5xl mx-auto w-full relative"
    >
      <button
        onClick={handleBack}
        className="flex items-center text-hytale-gold hover:text-white mb-6 md:mb-8 transition-colors group px-3 py-2 rounded-lg hover:bg-white/5 text-sm md:text-base relative z-10"
      >
        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver a Categorías
      </button>

      {activeContent ? (
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif text-hytale-gold mb-4 md:mb-6 drop-shadow-md text-center md:text-left break-words">
            {activeContent.title}
          </h2>
          <p className="text-lg md:text-xl text-hytale-text/80 mb-16 md:mb-24 text-center md:text-left px-2 max-w-3xl">
            {activeContent.description}
          </p>

          <div className="space-y-4">
            {activeContent.sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {/* LISTA LIMPIA SIN CAJAS NI FONDOS PROPIOS */}
                <div className="divide-y divide-white/5">
                  {section.items.map((item, i) => {
                    const itemId = generateId(item.name);
                    const isTarget = targetItemId === itemId;
                    
                    // Color del título
                    let titleColor = "text-hytale-gold";
                    if (item.severity === 'high') titleColor = "text-red-400";
                    else if (item.severity === 'medium') titleColor = "text-orange-400";

                    return (
                      <div
                        key={i}
                        id={itemId}
                        className={`group py-6 transition-all duration-500
                          ${isTarget ? 'bg-hytale-gold/5 -mx-4 px-4 rounded-lg' : ''}
                        `}
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12">
                            
                                                          <div className="flex-1">
                                                              <div className="flex items-center gap-3 mb-2">
                                                                <h4 className={`text-lg md:text-xl font-serif font-bold tracking-wide ${titleColor}`}>
                                                                    {item.name}
                                                                </h4>
                                                                {item.severity === 'high' && (
                                                                  <span className="text-[10px] font-bold uppercase bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 tracking-wider">
                                                                    Critico
                                                                  </span>
                                                                )}
                                                              </div>
                                                              
                                                              <p className="text-hytale-text/80 text-sm md:text-base leading-relaxed font-sans">
                                                                  {item.desc}
                                                              </p>
                                                          </div>
                            {/* Sanción minimalista */}
                            {item.sanction && (
                                <div className="mt-2 md:mt-1 md:text-right min-w-[200px]">
                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-hytale-text/30 mb-1">Consecuencia</span>
                                    <p className="text-sm font-mono text-red-300/90">
                                        {item.sanction}
                                    </p>
                                </div>
                            )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navegación entre Categorías */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mt-16 pt-8 border-t border-white/10">
            {prevCat ? (
                <button 
                    onClick={() => setSelectedCategory(prevCat.id)}
                    className="flex items-center gap-4 text-left group w-full md:w-auto p-4 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 hover:border-hytale-gold/30 transition-all"
                >
                    <div className="p-2 bg-hytale-gold/10 rounded-full group-hover:bg-hytale-gold/20 transition-colors">
                      <ArrowLeft className="text-hytale-gold group-hover:-translate-x-1 transition-transform" size={20} />
                    </div>
                    <div>
                        <span className="block text-xs text-hytale-text/50 uppercase tracking-wider mb-1">Anterior</span>
                        <span className="text-lg font-serif text-hytale-text group-hover:text-hytale-gold transition-colors">{prevCat.title}</span>
                    </div>
                </button>
            ) : <div />}

            {nextCat ? (
                <button 
                    onClick={() => setSelectedCategory(nextCat.id)}
                    className="flex items-center justify-end gap-4 text-right group w-full md:w-auto p-4 rounded-xl bg-black/20 hover:bg-white/5 border border-white/5 hover:border-hytale-gold/30 transition-all"
                >
                    <div>
                        <span className="block text-xs text-hytale-text/50 uppercase tracking-wider mb-1">Siguiente</span>
                        <span className="text-lg font-serif text-hytale-text group-hover:text-hytale-gold transition-colors">{nextCat.title}</span>
                    </div>
                    <div className="p-2 bg-hytale-gold/10 rounded-full group-hover:bg-hytale-gold/20 transition-colors">
                      <ArrowRight className="text-hytale-gold group-hover:translate-x-1 transition-transform" size={20} />
                    </div>
                </button>
            ) : <div />}
          </div>

          {activeContent.lastUpdated && (
            <div className="mt-8 pt-4 text-center">
              <p className="inline-flex items-center gap-2 text-hytale-text/40 text-xs md:text-sm font-mono px-4 py-2 rounded-full">
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
  };

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
      
      {/* IMAGEN DE FONDO (Igual que en Home) */}
      <div 
        className="fixed inset-0 z-[-20] bg-cover bg-center" 
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      ></div>
      
      {/* Overlay Oscuro Base (Igual que en Home: bg-black opacity-50) */}
      <div className="fixed inset-0 z-[-15] bg-black/50 pointer-events-none"></div>

      {/* FONDO DEGRADADO GLOBAL DE LA WIKI (Para lectura abajo) */}
      {/* Empieza transparente (respeta el overlay base) y se va a negro sólido. Fixed para evitar overflow. */}
      <div className="fixed inset-0 z-[-10] pointer-events-none bg-gradient-to-b from-transparent via-[#080a0f]/80 to-[#080a0f]"></div>

      {renderHeader()}
      <AnimatePresence mode="wait">
        {selectedCategory ? renderDetail() : (searchTerm ? renderSearchResults() : renderCategories())}
      </AnimatePresence>
    </section>
  );
}

export default Wiki;