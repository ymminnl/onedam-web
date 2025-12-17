import { 
  Shield, AlertTriangle, MessageSquare, Gavel, Swords, 
  Terminal, Home, Map, Users, DollarSign, Box, Music, 
  Gamepad2, Smile, Crown, ShoppingBag, Lock, Settings, Flag
} from 'lucide-react';

export const wikiContent = {
  // --- SECCIÓN DE REGLAS (Sin cambios) ---
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
  },

  // --- SECCIÓN DE COMANDOS ---
  commands: {
    title: "Comandos del Servidor",
    // DESCRIPCIÓN ACTUALIZADA:
    description: "Consulta la lista definitiva de comandos para dominar todas las mecánicas del servidor.",
    lastUpdated: "Actualizado recientemente",
    sections: [
      {
        title: "Protecciones: Gestión Básica",
        icon: Shield,
        items: [
          { name: "/ps ayuda", desc: "Muestra la lista de ayuda dentro del juego." },
          { name: "/ps info", desc: "Muestra información detallada del terreno donde estás parado." },
          { name: "/ps lista", desc: "Abre una lista con todos tus terrenos protegidos." },
          { name: "/ps home [nombre]", desc: "Te teletransporta a uno de tus terrenos." },
          { name: "/ps sethome", desc: "Establece el punto exacto de aparición (home) en tu terreno." },
          { name: "/ps unclaim", desc: "Quita la protección donde estás parado y te devuelve el bloque al inventario." },
          { name: "/ps renombrar [nombre]", desc: "Cambia el nombre de tu terreno para identificarlo mejor." },
          { name: "/ps ver (o mostrarlimites)", desc: "Muestra visualmente los bordes de tu protección con partículas." },
          { name: "/ps ocultar", desc: "Oculta el bloque de protección (la piedra) visualmente." },
          { name: "/ps mostrarbloque", desc: "Vuelve a mostrar el bloque de protección si estaba oculto." },
          { name: "/ps tienda", desc: "Abre el menú para comprar nuevos bloques de protección o terrenos." },
          { name: "/ps comprar", desc: "Compra el terreno en el que estás (si está en venta)." },
          { name: "/ps vender [precio]", desc: "Pone tu terreno actual a la venta por el precio que elijas." }
        ]
      },
      {
        title: "Protecciones: Miembros y Ajustes",
        icon: Settings,
        items: [
          { name: "/ps agregarmiembro [jugador]", desc: "Permite a un amigo construir y abrir cofres en tu terreno." },
          { name: "/ps eliminarmiembro [jugador]", desc: "Quita los permisos de miembro a un jugador." },
          { name: "/ps agregardueño [jugador]", desc: "Le das rango de Dueño a otro jugador (¡Cuidado, tendrá control total!)." },
          { name: "/ps eliminardueño [jugador]", desc: "Le quitas el rango de dueño a alguien." },
          { name: "/ps expulsar [jugador]", desc: "Saca a un jugador de tu terreno inmediatamente." },
          { name: "/ps banear [jugador]", desc: "Prohíbe la entrada de un jugador a tu terreno." },
          { name: "/ps desban [jugador]", desc: "Permite entrar de nuevo a un jugador baneado." },
          { name: "/ps salir", desc: "Abandonas un terreno del que eres miembro o dueño." },
          { name: "/ps permisos", desc: "Abre el menú avanzado para editar qué pueden hacer los visitantes." },
          { name: "/ps ajustesterreno", desc: "Configura opciones generales del terreno." },
          { name: "/ps fly", desc: "Activa/Desactiva el vuelo dentro de tu propio terreno." },
          { name: "/ps publico", desc: "Hace que tu terreno sea público (cualquiera puede visitarlo)." },
          { name: "/ps privado", desc: "Hace que tu terreno sea privado (solo miembros)." },
          { name: "/ps juntar", desc: "Fusiona este terreno con otro adyacente." }
        ]
      },
      {
        title: "Clanes: Gestión y Guerra",
        icon: Flag,
        items: [
          { name: "/clan help", desc: "Muestra la ayuda general de clanes." },
          { name: "/clan create [tag] [nombre]", desc: "Crea tu propio clan (Costo: 100). El 'tag' es el nombre corto (Ej: ONE)." },
          { name: "/clan invite [jugador]", desc: "Invita a un jugador a unirse a tu clan." },
          { name: "/clan join [tag]", desc: "Acepta una invitación o únete a un clan abierto." },
          { name: "/clan home", desc: "Te teletransporta a la base del clan." },
          { name: "/clan home create", desc: "Establece la ubicación actual como base del clan." },
          { name: "/clan chat", desc: "Alterna el chat para hablar solo con los miembros del clan." },
          { name: "/clan info", desc: "Muestra información detallada de tu clan o de otro." },
          { name: "/clan list", desc: "Muestra la lista de todos los clanes del servidor." },
          { name: "/clan rival add [clan]", desc: "Declara la guerra a otro clan (Rivales)." },
          { name: "/clan ally add [clan]", desc: "Envía una solicitud de alianza a otro clan." },
          { name: "/clan ff", desc: "Activa o desactiva el fuego amigo (daño entre miembros)." },
          { name: "/clan promote [jugador]", desc: "Asciende a un miembro de rango." },
          { name: "/clan demote [jugador]", desc: "Desciende a un miembro de rango." },
          { name: "/clan kick [jugador]", desc: "Expulsa a un miembro del clan." },
          { name: "/clan disband", desc: "Disuelve (elimina) el clan permanentemente." },
          { name: "/clan profile", desc: "Abre tu perfil de jugador dentro del sistema de clanes." },
          { name: "/clan banner", desc: "Abre el editor para crear o cambiar el estandarte del clan." },
          { name: "/clan discord", desc: "Vincula o muestra el Discord del clan." }
        ]
      },
      {
        title: "Social y Utilidad",
        icon: Users,
        items: [
          { name: "/msg [jugador]", desc: "Envía un mensaje privado (susurro)." },
          { name: "/r [mensaje]", desc: "Responde rápidamente al último mensaje privado recibido." },
          { name: "/tpa [jugador]", desc: "Solicita teletransportarte a un amigo." },
          { name: "/tpaccept", desc: "Acepta una solicitud de TP." },
          { name: "/sethome [nombre]", desc: "Guarda tu ubicación actual como un hogar." },
          { name: "/home [nombre]", desc: "Viaja a tus hogares guardados." },
          { name: "/spawn", desc: "Vuelve al lobby principal." },
          { name: "/warps", desc: "Menú de viajes a biomas y zonas públicas." },
          { name: "/balance", desc: "Mira tu dinero actual." },
          { name: "/pay [jugador] [cantidad]", desc: "Envía dinero a otro usuario." },
          { name: "/donjhanzm", desc: "Menú de venta de items para conseguir dinero." },
          { name: "/personalizacion", desc: "Menú de cosméticos y efectos visuales." },
          { name: "/musica", desc: "Reproductor de música del servidor." }
        ]
      }
    ]
  }
};