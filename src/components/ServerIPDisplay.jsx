import React, { useState } from 'react';
import { Copy as CopyIcon } from 'lucide-react';
import serverInfo from '../data/server-info';

function ServerIPDisplay({ className }) {
  const { serverIp } = serverInfo; // Ya no se necesita serverPort aquí
  const connectString = serverIp; // La cadena a copiar es solo la IP
  const [copyMessage, setCopyMessage] = useState('Click para copiar');

  const copyToClipboard = (textToCopy, setMsg) => {
    navigator.clipboard.writeText(textToCopy);
    setMsg('¡Copiado!');
    setTimeout(() => {
      setMsg('Click para copiar');
    }, 2000); // Reset message after 2 seconds
  };

  return (
    <div className={`rounded-lg p-3 sm:p-4 space-y-3 ${className || ''}`}>
      {/* Server IP */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center justify-center w-full sm:w-auto p-2 sm:p-0">
          <p className="text-hytale-gold text-base sm:text-lg font-bold mr-1 drop-shadow-sm tracking-wider">IP:</p>
          <code className="text-lg sm:text-xl md:text-2xl font-mono text-hytale-gold font-bold tracking-wide break-all drop-shadow-md">
            {serverIp}
          </code>
        </div>
        <button
          onClick={() => copyToClipboard(connectString, setCopyMessage)}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-gradient-button text-hytale-text border border-hytale-gold/20 hover:border-hytale-gold hover:bg-hytale-gold/10 hover:shadow-md transition-all duration-200 font-mono tracking-wider h-14 rounded-xl px-8 gap-2 w-full sm:w-auto drop-shadow-md active:translate-y-0.5 active:shadow-sm"
        >
          <CopyIcon className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
          <span className="text-base sm:text-lg font-bold tracking-wide drop-shadow-sm">{copyMessage}</span>
        </button>
      </div>
    </div>
  );
}

export default ServerIPDisplay;
