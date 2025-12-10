import React, { useMemo } from 'react';

const StarBackground = () => {

  // --- GRUPO 0: Nebulosas (Color ambiental) ---
  // Añaden "volumen" y color al fondo negro
  const nebulas = [
    { color: 'bg-hytale-accent', top: '10%', left: '20%', size: 'w-96 h-96', delay: '0s' },
    { color: 'bg-purple-900', top: '70%', left: '80%', size: 'w-80 h-80', delay: '-5s' },
    { color: 'bg-hytale-gold', top: '40%', left: '50%', size: 'w-64 h-64', delay: '-10s', opacity: 'opacity-20' }, // Oro sutil
  ];

  // --- GRUPO 1: Estrellas Estáticas (Fondo lejano) ---
  // Estas llenan el vacío. No se mueven, solo parpadean.
  const twinklingStars = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: `twinkle-${i}`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`, // Parpadeo entre 2 y 5 seg
      delay: `${Math.random() * 5}s`,
    }));
  }, []);

  // --- GRUPO 2: Estrellas que caen (Efecto velocidad/nieve) ---
  const fallingStars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: `fall-${i}`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 20 + 15}s`, // Un poco más lentas para ser elegantes
      delay: `-${Math.random() * 20}s`,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  // --- GRUPO 3: Estrellas Fugaces (Shooting Stars) ---
  const shootingStars = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: `shoot-${i}`,
      top: `${Math.random() * 40}%`, // Principalmente en la mitad superior
      left: `${Math.random() * 90}%`,
      duration: `${Math.random() * 3 + 4}s`,
      delay: `${Math.random() * 15 + 5}s`, 
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gaming-bg">
      
      {/* Capa 0: Nebulosas (Atmósfera) */}
      {nebulas.map((nebula, i) => (
        <div
          key={`nebula-${i}`}
          className={`nebula-glow absolute ${nebula.color} ${nebula.size} ${nebula.opacity || 'opacity-30'}`}
          style={{
            top: nebula.top,
            left: nebula.left,
            animationDelay: nebula.delay,
          }}
        />
      ))}

      {/* Capa 1: Estrellas Lejanas (Parpadeo) */}
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

      {/* Capa 2: Estrellas Cayendo (Movimiento) */}
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

      {/* Capa 3: Estrellas Fugaces (Detalle) */}
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
      
      {/* Capa 4: Vignette (Oscurece las esquinas para centrar la atención) */}
      <div className="absolute inset-0 bg-[radial-gradient(transparent_50%,#0a0c10_100%)]" />
      
    </div>
  );
};

export default StarBackground;