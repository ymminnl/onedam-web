import React, { useState, useEffect } from 'react'; // 1. Asegúrate de importar useEffect
import { Routes, Route, useLocation } from 'react-router-dom'; 
import { AnimatePresence, motion } from 'framer-motion'; 
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

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(5px)' }} 
    animate={{ opacity: 1, filter: 'blur(0px)' }} 
    exit={{ opacity: 0, filter: 'blur(5px)' }}    
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);
  const location = useLocation(); 
  const { pathname } = location; // Obtenemos el pathname

  // --- ESTO ES LO QUE FALTABA ---
  // Cada vez que cambia la ruta (pathname), sube el scroll arriba
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // -----------------------------

  const handleOpenModal = () => setIsBackgroundBlurred(true);
  const handleCloseModal = () => setIsBackgroundBlurred(false);

  return (
    <div className="min-h-screen flex flex-col relative bg-gaming-bg">
      
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