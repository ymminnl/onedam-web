import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsGrid from './components/NewsGrid';
import NewsDetail from './components/NewsDetail';
import ConnectModal from './components/ConnectModal';
import serverInfo from './data/server-info';

function App() {
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);

  const handleOpenModal = () => setIsBackgroundBlurred(true);
  const handleCloseModal = () => setIsBackgroundBlurred(false);

  return (
    <div className="min-h-screen flex flex-col relative bg-gaming-bg">
      <div className="absolute inset-0 bg-gradient-gaming opacity-50 z-0 pointer-events-none"></div>

      {/* Pasamos la función de abrir modal al Navbar */}
      <Navbar onOpenModal={handleOpenModal} />

      <main className="flex-grow z-10 relative">
        <Routes>
          {/* Ruta Principal: Hero + Grid de Noticias */}
          <Route path="/" element={
            <>
              <Hero 
                onToggleBackgroundBlur={handleOpenModal}
                serverName={serverInfo.serverName}
                heroLinks={serverInfo.heroLinks}
              />
              <NewsGrid />
            </>
          } />

          {/* Ruta de Detalle de Noticia */}
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </main>
      
      {/* Modal Global */}
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