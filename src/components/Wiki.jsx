import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, Shield, Terminal, HelpCircle, Map, Sword, Search, ArrowLeft, ArrowRight, 
  AlertTriangle, AlertOctagon, Info, Clock, FileText, ChevronDown 
} from 'lucide-react';
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

const generateId = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// --- COMPONENTE DE REGLA DESPLEGABLE (Accordion) ---
const RuleItem = ({ item, isOpen, onToggle }) => {
  const itemId = generateId(item.name);
  
  return (
    <div 
      id={itemId}
      className={`group border-b border-white/5 transition-colors duration-300
        ${isOpen ? 'bg-white/5 rounded-lg border-transparent' : 'hover:bg-white/5 hover:rounded-lg'}
      `}
    >
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
      >
        <div className="flex items-center gap-3 pr-4">
          <span className="text-base md:text-xl font-serif font-bold tracking-wide text-hytale-gold">
            {item.name}
          </span>
        </div>

        <div className={`text-hytale-gold/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 text-sm md:text-base">
              
              {/* BADGES DE SEVERIDAD */}
              {item.severity === 'high' && (
                <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20 tracking-wider">
                        <AlertOctagon size={12} />
                        Infracción Crítica
                    </span>
                </div>
              )}
              {item.severity === 'medium' && (
                <div className="mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase bg-orange-500/10 text-orange-400 px-2 py-1 rounded border border-orange-500/20 tracking-wider">
                        <AlertTriangle size={12} />
                        Infracción Media
                    </span>
                </div>
              )}

              <p className="text-hytale-text/80 leading-relaxed font-sans mb-3 pl-2 border-l-2 border-white/10">
                {item.desc}
              </p>

              {item.sanction && (
                <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 bg-black/20 p-2 rounded text-xs md:text-sm font-mono text-red-300/90">
                  <span className="uppercase font-bold text-hytale-text/30 tracking-wider">Consecuencia:</span>
                  <span>{item.sanction}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL WIKI ---
function Wiki() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [targetItemId, setTargetItemId] = useState(null);
  const [expandedRuleId, setExpandedRuleId] = useState(null);

  const handleBack = () => {
    setSelectedCategory(null);
    setSearchTerm('');
    setTargetItemId(null);
    setExpandedRuleId(null);
  };

  const handleSearchResultClick = (categoryId, itemId) => {
    setSelectedCategory(categoryId);
    if (itemId) {
      setTargetItemId(itemId);
      setExpandedRuleId(itemId);
    }
    setSearchTerm('');
  };

  useEffect(() => {
    if (selectedCategory) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 10);
    }
  }, [selectedCategory]);

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

  const renderHeader = () => (
    !selectedCategory && (
      <div className="text-center mb-12">
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
            className="w-full pl-12 pr-10 py-3 md:py-4 bg-[#151725] border border-hytale-gold/30 rounded-xl text-hytale-text placeholder-hytale-text/50 focus:outline-none focus:border-hytale-gold transition-all shadow-lg text-sm md:text-base"
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
      </div>
    )
  );

  const renderDetail = () => {
    const currentIndex = wikiCategories.findIndex(c => c.id === selectedCategory);
    const prevCat = currentIndex > 0 ? wikiCategories[currentIndex - 1] : null;
    const nextCat = currentIndex < wikiCategories.length - 1 ? wikiCategories[currentIndex + 1] : null;
    
    const isRulesSection = selectedCategory === 'rules';

    return (
    <div className="max-w-5xl mx-auto w-full relative">
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

          <div className={isRulesSection ? "space-y-0" : "space-y-16"}>
            {activeContent.sections.map((section, idx) => {
              const SectionIcon = section.icon;
              return (
                <div key={idx} className={isRulesSection ? "contents" : "block"}>
                  {!isRulesSection && (
                    <div className="flex items-center gap-3 mb-6 pb-2 border-b border-white/5">
                      {SectionIcon && <SectionIcon className="text-hytale-gold" size={24} />}
                      <h3 className="text-2xl font-serif text-hytale-gold">{section.title}</h3>
                    </div>
                  )}

                  <div className={isRulesSection ? "contents" : "space-y-2"}>
                    {section.items.map((item, i) => {
                      const itemId = generateId(item.name);
                      return (
                        <RuleItem 
                          key={i} 
                          item={item} 
                          isOpen={expandedRuleId === itemId}
                          onToggle={() => setExpandedRuleId(prev => prev === itemId ? null : itemId)}
                        />
                      );
                    })}
                  </div>
                </div>
              ); 
            })}
          </div>
          
          <div className="flex flex-row justify-between items-center gap-2 mt-8">
            {prevCat ? (
                <button 
                    onClick={() => setSelectedCategory(prevCat.id)}
                    className="flex items-center gap-3 md:gap-4 text-left group w-fit p-3 md:p-5 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-hytale-gold/40 transition-all shadow-xl"
                >
                    <div className="p-2 md:p-3 bg-hytale-gold/10 rounded-full group-hover:bg-hytale-gold group-hover:text-black transition-all">
                      <ArrowLeft size={18} className="md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <div>
                        <span className="block text-[10px] md:text-xs text-hytale-text/40 uppercase tracking-wider mb-1">Anterior</span>
                        <span className="text-sm md:text-2xl font-serif text-hytale-text group-hover:text-hytale-gold transition-colors">{prevCat.title}</span>
                    </div>
                </button>
            ) : <div />}

            {nextCat ? (
                <button 
                    onClick={() => setSelectedCategory(nextCat.id)}
                    className="flex items-center justify-end gap-3 md:gap-4 text-right group w-fit ml-auto p-3 md:p-5 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-hytale-gold/40 transition-all shadow-xl"
                >
                    <div>
                        <span className="block text-[10px] md:text-xs text-hytale-text/40 uppercase tracking-wider mb-1">Siguiente</span>
                        <span className="text-sm md:text-2xl font-serif text-hytale-text group-hover:text-hytale-gold transition-colors">{nextCat.title}</span>
                    </div>
                    <div className="p-2 md:p-3 bg-hytale-gold/10 rounded-full group-hover:bg-hytale-gold group-hover:text-black transition-all">
                      <ArrowRight size={18} className="md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                </button>
            ) : (
                <Link 
                    to="/news"
                    className="flex items-center justify-end gap-3 md:gap-4 text-right group w-fit ml-auto p-3 md:p-5 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-hytale-gold/40 transition-all shadow-xl"
                >
                    <div>
                        <span className="block text-[10px] md:text-xs text-hytale-text/40 uppercase tracking-wider mb-1">Siguiente Sección</span>
                        <span className="text-sm md:text-2xl font-serif text-hytale-gold group-hover:text-white transition-colors">Ver Noticias</span>
                    </div>
                    <div className="p-2 md:p-3 bg-hytale-gold/10 rounded-full group-hover:bg-hytale-gold group-hover:text-black transition-all">
                      <ArrowRight size={18} className="md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>
            )}
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
    </div>
  );
  };

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return (
        <div className="text-center py-20">
          <Search className="mx-auto text-hytale-text/20 mb-4" size={48} />
          <p className="text-hytale-text/50 text-lg">No encontramos nada sobre "{searchTerm}"</p>
          <p className="text-hytale-text/30 text-sm">Prueba con palabras como "hacks", "protección", "chat"...</p>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto w-full">
        <p className="text-hytale-text/50 mb-6 text-sm uppercase tracking-widest pl-2">
          Resultados encontrados: {searchResults.length}
        </p>
        <div className="grid grid-cols-1 gap-4">
          {searchResults.map((result) => (
            <div
              key={`${result.categoryId}-${result.itemId}`}
              onClick={() => handleSearchResultClick(result.categoryId, result.itemId)}
              // CAMBIO: También aplicamos el degradado aquí para consistencia
              className="flex items-start gap-4 p-5 bg-gradient-to-br from-[#1e2235] to-[#121420] border border-white/10 hover:border-hytale-gold/50 rounded-xl cursor-pointer transition-all hover:-translate-y-1 shadow-md group"
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
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCategories = () => (
    <div className="flex flex-col gap-12 md:gap-20">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {wikiCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className="group bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/[0.07] hover:border-hytale-gold/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-hytale-gold/5 hover:-translate-y-1 h-full flex flex-col"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-4 mb-3 md:mb-4 text-center sm:text-left">
              <div className="p-2 md:p-3 bg-hytale-gold/10 rounded-lg group-hover:bg-hytale-gold/20 transition-colors w-fit">
                <category.icon className="text-hytale-gold w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h3 className="text-sm md:text-2xl font-serif text-hytale-text group-hover:text-hytale-gold transition-colors leading-tight">
                {category.title}
              </h3>
            </div>
            <p className="text-hytale-text/70 leading-relaxed text-[10px] md:text-base line-clamp-2 sm:line-clamp-none">
              {category.description}
            </p>
          </div>
        ))}
      </div>

      {/* CONTROLADOR DE NAVEGACIÓN GLOBAL - DEBAJO DE LAS TARJETAS SIN LÍNEA */}
      <div className="flex justify-end mt-4">
        <Link 
          to="/news" 
          className="flex items-center justify-end gap-3 md:gap-4 text-right group w-fit p-3 md:p-5 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-hytale-gold/40 transition-all shadow-xl"
        >
          <div>
            <span className="block text-[10px] md:text-xs text-hytale-text/40 uppercase tracking-wider mb-1">Siguiente Sección</span>
            <span className="text-sm md:text-2xl font-serif text-hytale-gold group-hover:text-white transition-colors">Ver Noticias</span>
          </div>
          <div className="p-2 md:p-3 bg-hytale-gold/10 rounded-full group-hover:bg-hytale-gold group-hover:text-black transition-all">
            <ArrowRight size={18} className="md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <section className="container mx-auto px-4 pt-36 pb-16 relative z-10 min-h-screen flex flex-col">
      <div className="fixed inset-0 z-[-20] bg-gradient-to-b from-[#121420] via-[#0d0f1a] to-[#050508]"></div>
      <div className="fixed inset-0 z-[-15] bg-[#0f0c29] opacity-30 pointer-events-none"></div>

      {renderHeader()}
      
      {selectedCategory ? renderDetail() : (searchTerm ? renderSearchResults() : renderCategories())}
      
    </section>
  );
}

export default Wiki;