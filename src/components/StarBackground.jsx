import React, { useMemo } from 'react';

// --- SISTEMAS ESTELARES (Decorativos) ---
const DESTINATIONS = {
  wiki: { x: 75, y: 30, color: 'bg-cyan-300', shadow: 'shadow-cyan-500' },
  news: { x: 20, y: 70, color: 'bg-purple-300', shadow: 'shadow-purple-500' },
};

const StarBackground = () => {
  // ELIMINADO: Grupo 0 (Nebulosas) - Ya no se usan.

  // --- GRUPO 1: Estrellas de Relleno (Twinkling) ---
  const twinklingStars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: `twinkle-${i}`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  // --- GRUPO 2: Estrellas que caen (Falling) ---
  const fallingStars = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: `fall-${i}`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 20 + 15}s`, 
      delay: `-${Math.random() * 20}s`,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  // --- GRUPO 3: Estrellas Fugaces (Shooting) ---
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
      
      {/* NUEVO FONDO AMBIENTAL 
         Sustituye a las nebulosas. Es un degradado radial sutil.
         - from-indigo-900/20: Un toque azul oscuro muy sutil en el centro.
         - via-[#0a0c10]: El color oscuro de tu tema.
         - to-black: Bordes negros.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-[#0a0c10]/50 to-black/80 z-0"></div>

      {/* LUZ CELESTIAL (Opcional)
         Un brillo dorado muy tenue en la parte superior central para iluminar el título del Hero.
      */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-hytale-gold/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>


      {/* 1. ESTRELLAS DESTACADAS (Fijas) */}
      {Object.values(DESTINATIONS).map((dest, i) => (
          <div 
              key={`dest-${i}`}
              className={`absolute rounded-full ${dest.color} ${dest.shadow} shadow-[0_0_15px_currentColor] animate-pulse z-10`}
              style={{
                  left: `${dest.x}%`,
                  top: `${dest.y}%`,
                  width: '4px',
                  height: '4px',
                  opacity: 0.8
              }}
          />
      ))}

      {/* 2. ESTRELLAS NORMALES */}
      {twinklingStars.map((star) => (
        <div
          key={star.id}
          className="star-twinkle z-0"
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

      {/* 3. ESTRELLAS CAYENDO */}
      {fallingStars.map((star) => (
        <div
          key={star.id}
          className="star-falling z-0"
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

      {/* 4. FUGACES */}
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="star-shooting z-0"
          style={{
            top: star.top,
            left: star.left,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
      
      {/* 5. VIGNETTE (Bordes oscuros para centrar la atención) */}
      <div className="absolute inset-0 bg-[radial-gradient(transparent_40%,#000000_100%)] z-10" />

      {/* Se eliminó el style de keyframes nebula-drift porque ya no se usa */}
    </div>
  );
};

export default StarBackground;