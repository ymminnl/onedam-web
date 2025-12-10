import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X as CloseIcon, Copy as CopyIcon } from 'lucide-react';
import serverInfo from '../data/server-info';

function ConnectModal({ onClose }) {
  const { serverIp } = serverInfo;
  const connectString = serverIp;
  const [copyMessage, setCopyMessage] = useState('Click para copiar');
  const modalRef = useRef(null);

  const copyToClipboard = (textToCopy, setMsg) => {
    navigator.clipboard.writeText(textToCopy);
    setMsg('¡Copiado!');
    setTimeout(() => {
      setMsg('Click para copiar');
    }, 2000); // Reset message after 2 seconds
  };

  // Cierra el modal/desenfoque al hacer clic fuera del contenido del modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    // Añadir event listener al documento SOLO cuando el modal está montado
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]); // Depende de onClose

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-hytale-blue/80 rounded-lg p-6 relative w-full max-w-lg mx-auto z-[1000] backdrop-blur-sm" // Fondo translúcido
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-hytale-gold hover:text-hytale-gold-hover transition-colors"
        >
          <CloseIcon size={24} />
        </button>

        <h2 className="text-3xl font-serif text-hytale-gold text-center mb-6 drop-shadow-lg">
          Conéctate a Nuestro Servidor
        </h2>

        {/* IP Display and Copy Button - Ahora flotando directamente en el modal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4"> {/* Eliminado bg, border, shadow */}
          <div className="flex items-center justify-center w-full sm:w-auto">
            <p className="text-hytale-gold text-base sm:text-lg font-bold mr-2 drop-shadow-sm">IP:</p>
            <code className="text-xl sm:text-2xl md:text-3xl font-mono text-hytale-gold font-bold tracking-wide break-all drop-shadow-md">
              {serverIp}
            </code>
          </div>
          <button
            onClick={() => copyToClipboard(connectString, setCopyMessage)}
            className="inline-flex items-center justify-center whitespace-nowrap text-base font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-gradient-button text-hytale-text border border-hytale-gold/20 hover:border-hytale-gold hover:bg-hytale-gold/10 hover:shadow-md transition-all duration-200 font-mono tracking-wider h-16 rounded-xl px-8 gap-2 w-full sm:w-auto drop-shadow-md active:translate-y-0.5 active:shadow-sm"
          >
            <CopyIcon className="w-5 h-5 drop-shadow-sm" />
            <span className="drop-shadow-sm">{copyMessage}</span>
          </button>
        </div>
        {/* Puedes añadir más información aquí si es necesario */}

      </motion.div>
    </AnimatePresence>
  );
}

export default ConnectModal;