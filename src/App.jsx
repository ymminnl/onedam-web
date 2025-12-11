import { useState, useRef, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import { AnimatePresence } from 'framer-motion'; 

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsGrid from './components/NewsGrid';
import NewsDetail from './components/NewsDetail';
import NewsPage from './components/NewsPage';
import Wiki from './components/Wiki';
import ConnectModal from './components/ConnectModal';
import Footer from './components/Footer';
import StarBackground from './components/StarBackground';
import PageWrapper from './components/PageWrapper';

import serverInfo from './data/server-info';

function App() {
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);
  const location = useLocation(); 
  const mainRef = useRef(null); 

  const isHome = location.pathname === '/';

  const handleOpenModal = () => setIsBackgroundBlurred(true);
  const handleCloseModal = () => setIsBackgroundBlurred(false);

  // --- SOLUCIÓN NUCLEAR PARA EL SCROLL ---
  useLayoutEffect(() => {
    // 1. Evitar que el navegador intervenga
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollContainer = mainRef.current;
    
    if (scrollContainer) {
      // 2. APAGAR TEMPORALMENTE EL SNAP Y EL SMOOTH
      // Si no hacemos esto, el 'snap-mandatory' peleará contra el scrollTop y ganará (dejándote abajo).
      scrollContainer.style.scrollSnapType = 'none';
      scrollContainer.style.scrollBehavior = 'auto';
      
      // 3. FORZAR EL SALTO A CERO
      scrollContainer.scrollTop = 0;
      
      // 4. REACTIVAR DESPUÉS DE UN FRAME
      // Esperamos a que el navegador pinte el salto para volver a encender las físicas.
      requestAnimationFrame(() => {
        // Solo restauramos el snap si estamos en el Home (donde se usa)
        // Eliminamos el valor inline para que las clases de Tailwind tomen el control de nuevo
        scrollContainer.style.scrollSnapType = ''; 
        scrollContainer.style.scrollBehavior = ''; 
      });
    }
  }, [location.pathname]);

  // CLASES DEL CONTENEDOR
  // Usamos 'snap-mandatory' en Home para el efecto agresivo que te gusta.
  const containerClasses = isHome 
    ? "h-screen overflow-y-auto snap-y snap-mandatory relative bg-gaming-bg"
    : "h-screen overflow-y-auto relative bg-gaming-bg";

  return (
    <div ref={mainRef} className={containerClasses}>
      
      <div className="fixed inset-0 bg-gradient-gaming opacity-50 z-0 pointer-events-none"></div>
      
      <StarBackground />

      <Navbar onOpenModal={handleOpenModal} />

      <main className="flex-grow z-10 relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            
            <Route path="/" element={
              <PageWrapper>
                <Hero 
                  onToggleBackgroundBlur={handleOpenModal}
                  serverName={serverInfo.serverName}
                  heroLinks={serverInfo.heroLinks}
                />
                <NewsGrid />
              </PageWrapper>
            } />

            <Route path="/news" element={
              <PageWrapper>
                <NewsPage />
              </PageWrapper>
            } />
            
            <Route path="/news/:id" element={
              <PageWrapper>
                <NewsDetail />
              </PageWrapper>
            } />
            
            <Route path="/wiki" element={
              <PageWrapper>
                <Wiki />
              </PageWrapper>
            } />

          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer /> 

      {isBackgroundBlurred && (
        <div 
          className="fixed inset-0 z-[998] flex items-center justify-center backdrop-blur-md bg-black/60"
          onClick={handleCloseModal}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ConnectModal onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App;