import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import NewsGrid from './components/NewsGrid';
import NewsDetail from './components/NewsDetail';
import ConnectModal from './components/ConnectModal';
import StarBackground from './components/StarBackground';
import serverInfo from './data/server-info';

function App() {
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);

  const handleOpenModal = () => setIsBackgroundBlurred(true);
  const handleCloseModal = () => setIsBackgroundBlurred(false);

  return (
    <div className="min-h-screen flex flex-col relative bg-gaming-bg">
      <div className="absolute inset-0 bg-gradient-gaming opacity-50 z-0 pointer-events-none"></div>
      <StarBackground />

      <Navbar onOpenModal={handleOpenModal} />

      <main className="flex-grow z-10 relative">
        <Routes>
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


          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </main>
      

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