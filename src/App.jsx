import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // 1. IMPORTANTE: Importar useLocation
import { AnimatePresence, motion } from 'framer-motion'; // 2. Importar AnimatePresence
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsGrid from './components/NewsGrid';
import NewsDetail from './components/NewsDetail';
import NewsPage from './components/NewsPage';
import Wiki from './components/Wiki';
import ConnectModal from './components/ConnectModal';
import Footer from './components/Footer';
import serverInfo from './data/server-info';
import StarBackground from './components/StarBackground';

// 3. Creamos un componente "Wrapper" para no repetir código
// Este componente le dará el efecto de entrada/salida a CADA página
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(5px)' }} // Empieza invisible y borroso
    animate={{ opacity: 1, filter: 'blur(0px)' }} // Se enfoca y aparece
    exit={{ opacity: 0, filter: 'blur(5px)' }}    // Se desenfoca y desaparece al salir
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);
  const location = useLocation(); // Hook para saber en qué ruta estamos

  const handleOpenModal = () => setIsBackgroundBlurred(true);
  const handleCloseModal = () => setIsBackgroundBlurred(false);

  return (
    <div className="min-h-screen flex flex-col relative bg-gaming-bg">
      
      <div className="fixed inset-0 bg-gradient-gaming opacity-50 z-0 pointer-events-none"></div>
      
      <StarBackground />

      <Navbar onOpenModal={handleOpenModal} />

      <main className="flex-grow z-10 relative">
        {/* 4. AnimatePresence mode="wait": Espera a que la página vieja salga antes de meter la nueva */}
        <AnimatePresence mode="wait">
          {/* Usamos location.pathname como 'key' para forzar la animación al cambiar de ruta */}
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