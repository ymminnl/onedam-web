import { Shield, AlertTriangle, MessageSquare, Gavel, Swords } from 'lucide-react';

export const wikiContent = {
  rules: {
    title: "Normativas y Sanciones",
    description: "Queremos un ambiente divertido y competitivo. Aquí te explico qué cosas no están permitidas <3",
    lastUpdated: "10 de Diciembre de 2025",
    sections: [
      {
        title: "Seguridad y Hacks",
        icon: Shield,
        items: [
          { 
            name: "Clientes Modificados (Hacks)", 
            desc: "Usar cositas como KillAura, Fly o Speed para tener ventaja no se vale! :/", 
            sanction: "30 días a Permanente (IP)", 
            severity: "high" 
          },
          { 
            name: "X-Ray / Texture Packs Ilegales", 
            desc: "Ver minerales a través de las paredes es trampa u.u", 
            sanction: "7 días a Permanente", 
            severity: "medium" 
          },
          { 
            name: "Máquinas de Lag", 
            desc: "Hacer mecanismos solo para que el server vaya lento :(", 
            sanction: "Permanente + Borrado de zona", 
            severity: "high" 
          },
          { 
            name: "Abuso de Bugs (Dupeo)", 
            desc: "Aprovechar errores para multiplicar items. Mejor repórtalos y te daremos tag especial por tu ayuda <3", 
            sanction: "Permanente + Wipe", 
            severity: "high" 
          }
        ]
      },
      {
        title: "Dinámicas de Survival",
        icon: Swords,
        items: [
          { 
            name: "Raideos de Bases", 
            desc: "¡Asegúrate de proteger tu casita con bloques de protección (PS) para que no entren! :)", 
            sanction: "No Sancionable (Legal)", 
            severity: "low" 
          },
          { 
            name: "Filtración de Coordenadas", 
            desc: "Si compartes tus coords en el chat es bajo tu responsabilidad, ten mucho cuidado :/", 
            sanction: "No Sancionable (Legal)", 
            severity: "low" 
          },
          { 
            name: "TPA Kill", 
            desc: "Pedir tp o aceptarlo para matar a traición al instante es muy feo. No seas así u.u", 
            sanction: "Advertencia a 30 días", 
            severity: "medium" 
          },
          { 
            name: "Grifeo Masivo Injustificado", 
            desc: "Destruir el mapa (lava cast) sin razón, solo por dejarlo feo.", 
            sanction: "7 a 30 días o permanente", 
            severity: "medium" 
          }
        ]
      },
      {
        title: "Comportamiento y Convivencia",
        icon: Gavel,
        items: [
          { 
            name: "Toxicidad Extrema / Odio", 
            desc: "Racismo, homofobia o amenazas reales. Aquí puro amor y buena vibra, nada de eso >:(", 
            sanction: "Permanente (Sin apelación)", 
            severity: "high" 
          },
          { 
            name: "Acoso Continuo", 
            desc: "Perseguir a alguien todo el rato para no dejarle jugar. ¡Vive y deja vivir! :/", 
            sanction: "5 a 15 días", 
            severity: "medium" 
          },
          { 
            name: "Estafas en Intercambios", 
            desc: "Robar items cuando habías quedado en un trato. La honestidad ante todo <3", 
            sanction: "7 a 14 días", 
            severity: "medium" 
          }
        ]
      },
      {
        title: "Chat y Comunicación",
        icon: MessageSquare,
        items: [
          { 
            name: "Spam / Flood", 
            desc: "Escribir lo mismo muchas veces o llenar el chat. ¡Tranqui, te leemos igual! :) aveces...", 
            sanction: "Mute temporal (15m - 1h)", 
            severity: "low" 
          },
          { 
            name: "Publicidad (IPs)", 
            desc: "Pasar IPs de otros sitios. Encerio no lo hagas!", 
            sanction: "Permanente", 
            severity: "high" 
          }
        ]
      }
    ]
  }
};