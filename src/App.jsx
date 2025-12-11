import { useState } from 'react';
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
import ScrollToTop from './components/ScrollToTop';
import PageWrapper from './components/PageWrapper';

import serverInfo from './data/server-info';

function App() {
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);
  const location = useLocation();

  const handleOpenModal = () => setIsBackgroundBlurred(true);
  const handleCloseModal = () => setIsBackgroundBlurred(false);

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth relative bg-gaming-bg">

      <ScrollToTop />

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