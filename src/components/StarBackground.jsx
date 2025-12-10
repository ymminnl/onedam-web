import React, { useMemo } from 'react';

const StarBackground = () => {
  
  // --- GRUPO 1: Estrellas que caen lento ---
  const fallingStars = useMemo(() => {
    // Reduje un poco la cantidad (50) para asegurar fluidez total en gama baja
    return Array.from({ length: 50 }).map((_, i) => ({
      id: `fall-${i}`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`, // Estrellas un pelín más visibles
      duration: `${Math.random() * 30 + 20}s`, // Lentas (20-50s)
      delay: `-${Math.random() * 50}s`, // Delay negativo para que ya estén en pantalla al cargar
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  // --- GRUPO 2: Estrellas Fugaces (Shooting Stars) ---
  const shootingStars = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: `shoot-${i}`,
      // Posición inicial: Siempre arriba o a la izquierda, fuera de pantalla
      top: `${Math.random() * -20}%`,      // Entre -20% y 0% (Arriba)
      left: `${Math.random() * 50}%`,       // Mitad izquierda
      
      // Duración rápida pero visible
      duration: `${Math.random() * 2 + 3}s`, // 3 a 5 segundos
      
      // Delays muy separados para que no sea un bombardeo constante
      delay: `${i * 8 + Math.random() * 5}s`, 
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Capa 1: Estrellas Cayendo */}
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

      {/* Capa 2: Estrellas Fugaces */}
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
    </div>
  );
};

export default StarBackground;