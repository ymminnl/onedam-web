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
        className="bg-hytale-blue/80 rounded-lg p-4 md:p-6 relative w-[90%] md:w-full max-w-lg mx-auto z-[1000] backdrop-blur-sm"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 z-50 text-hytale-gold hover:text-hytale-gold-hover transition-colors rounded-full active:bg-white/10"
        >
          <CloseIcon size={24} />
        </button>

        <h2 className="text-3xl font-serif text-hytale-gold text-center mb-8 drop-shadow-lg">
          Conéctate a Nuestro Servidor
        </h2>

        <div className="flex flex-col items-center gap-6 w-full">

          {/* Contenedor de la IP */}
          <div className="w-full bg-black/20 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2">
            <span className="text-hytale-text/70 text-sm font-sans uppercase tracking-widest">Dirección IP</span>
            <code className="text-3xl md:text-4xl font-mono text-hytale-gold font-bold tracking-wide drop-shadow-[0_0_10px_rgba(205,176,117,0.3)]">
              {serverIp}
            </code>
          </div>

          {/* Botón de copiar */}
          <button
            onClick={() => copyToClipboard(connectString, setCopyMessage)}
            className="w-full bg-hytale-gold hover:bg-hytale-gold-hover text-hytale-dark font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-3"
          >
            <CopyIcon className="w-5 h-5" />
            <span className="text-lg font-serif uppercase tracking-wide">{copyMessage}</span>
          </button>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ConnectModal;