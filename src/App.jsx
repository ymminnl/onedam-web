import { useState, useRef, useEffect } from 'react'; // Usamos useEffect en lugar de useLayoutEffect
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
  // Nuevo estado para controlar cuándo el snap es seguro de activar
  const [isSnapEnabled, setIsSnapEnabled] = useState(false);
  
  const location = useLocation(); 
  const mainRef = useRef(null); 

  const handleOpenModal = () => setIsBackgroundBlurred(true);
  const handleCloseModal = () => setIsBackgroundBlurred(false);

  // 1. APAGAR/ENCENDER SNAP SEGÚN LA RUTA
  useEffect(() => {
    if (location.pathname === '/') {
      // Forzamos el scroll a 0 inmediatamente antes de activar nada
      if (mainRef.current) mainRef.current.scrollTop = 0;
      
      const timer = setTimeout(() => {
        setIsSnapEnabled(true);
      }, 400); // Aumentamos el margen para que la animación termine
      return () => clearTimeout(timer);
    } else {
      setIsSnapEnabled(false);
      if (mainRef.current) mainRef.current.scrollTop = 0;
    }
    
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [location.pathname]);

  // 2. RESETEAR SCROLL Y REACTIVAR SNAP TRAS NAVEGACIÓN
  const handleExitComplete = () => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  };

  // CLASES DEL CONTENEDOR
  const containerClasses = isSnapEnabled 
    ? "h-screen overflow-y-auto snap-y snap-mandatory relative bg-gaming-bg"
    : "h-screen overflow-y-auto relative bg-gaming-bg";

  return (
    <div 
      id="main-scroll-container"
      ref={mainRef} 
      className={containerClasses}
    >
      
      <div className="fixed inset-0 bg-gradient-gaming opacity-50 z-0 pointer-events-none"></div>
      
      <StarBackground />

      <Navbar onOpenModal={handleOpenModal} />

      <main className="flex-grow z-10 relative">
        <AnimatePresence 
          mode="wait" 
          onExitComplete={handleExitComplete} // Aquí ocurre la magia
        >
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