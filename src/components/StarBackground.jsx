import React, { useMemo } from 'react';

// --- SISTEMAS ESTELARES (Decorativos) ---
// Estrellas brillantes fijas para dar personalidad al cielo
const DESTINATIONS = {
  wiki: { x: 75, y: 30, color: 'bg-cyan-300', shadow: 'shadow-cyan-500' }, // Arriba derecha
  news: { x: 20, y: 70, color: 'bg-purple-300', shadow: 'shadow-purple-500' }, // Abajo izquierda
};

const StarBackground = () => {
  // --- GRUPO 0: Nebulosas (Atmósfera estática) ---
  const nebulas = [
    { color: 'bg-hytale-accent', top: '10%', left: '20%', size: 'w-96 h-96', delay: '0s' },
    { color: 'bg-purple-900', top: '70%', left: '80%', size: 'w-80 h-80', delay: '-5s' },
    { color: 'bg-hytale-gold', top: '40%', left: '50%', size: 'w-64 h-64', delay: '-10s', opacity: 'opacity-20' }, 
  ];

  // --- GRUPO 1: Estrellas de Relleno ---
  const twinklingStars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: `twinkle-${i}`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  // --- GRUPO 2: Estrellas que caen ---
  const fallingStars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: `fall-${i}`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 20 + 15}s`, 
      delay: `-${Math.random() * 20}s`,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  // --- GRUPO 3: Estrellas Fugaces ---
  const shootingStars = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: `shoot-${i}`,
      top: `${Math.random() * 40}%`, 
      left: `${Math.random() * 90}%`,
      duration: `${Math.random() * 3 + 4}s`,
      delay: `${Math.random() * 15 + 5}s`, 
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gaming-bg">
      
      {/* 1. NEBULOSAS */}
      {nebulas.map((nebula, i) => (
        <div
          key={`nebula-${i}`}
          className={`nebula-glow absolute ${nebula.color} ${nebula.size} ${nebula.opacity || 'opacity-30'}`}
          style={{
            top: nebula.top,
            left: nebula.left,
            animationDelay: nebula.delay,
            animation: `nebula-drift ${20 + i * 5}s infinite ease-in-out alternate`
          }}
        />
      ))}

      {/* 2. ESTRELLAS DESTACADAS (Fijas) */}
      {Object.values(DESTINATIONS).map((dest, i) => (
          <div 
              key={`dest-${i}`}
              className={`absolute rounded-full ${dest.color} ${dest.shadow} shadow-[0_0_15px_currentColor] animate-pulse`}
              style={{
                  left: `${dest.x}%`,
                  top: `${dest.y}%`,
                  width: '5px',
                  height: '5px',
                  opacity: 0.8
              }}
          />
      ))}

      {/* 3. ESTRELLAS NORMALES */}
      {twinklingStars.map((star) => (
        <div
          key={star.id}
          className="star-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* 4. ESTRELLAS CAYENDO */}
      {fallingStars.map((star) => (
        <div
          key={star.id}
          className="star-falling"
          style={{
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}

      {/* 5. FUGACES */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="star-shooting"
          style={{
            top: star.top,
            left: star.left,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
      
      {/* 6. VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(transparent_50%,#0a0c10_100%)]" />

      <style>{`
        @keyframes nebula-drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -30px) scale(1.2); }
          66% { transform: translate(-40px, 40px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default StarBackground;