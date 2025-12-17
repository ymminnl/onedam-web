import { 
  Shield, AlertTriangle, MessageSquare, Gavel, Swords, 
  Terminal, Home, Map, Users, DollarSign, Box, Music, 
  Gamepad2, Smile, Crown, ShoppingBag, Lock, Settings, Flag, Star
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

  // --- SECCIÓN DE COMANDOS (ACTUALIZADA Y DETALLADA) ---
  commands: {
    title: "Comandos del Servidor",
    description: "Manual de uso. Los argumentos entre < > son obligatorios y los [ ] son opcionales.",
    lastUpdated: "Actualizado recientemente",
    sections: [
      {
        title: "Hogares y Teletransporte",
        icon: Map,
        items: [
          { name: "/sethome <nombre>", desc: "Guarda tu ubicación actual como un hogar." },
          { name: "/delhome <nombre>", desc: "Elimina un hogar que ya no uses." },
          { name: "/home [nombre]", desc: "Te teletransporta a tu hogar. Si no pones nombre, te lleva al principal." },
          { name: "/homes", desc: "Abre una lista gráfica o texto con todos tus hogares guardados." },
          { name: "/renamehome <viejo> <nuevo>", desc: "Cambia el nombre de uno de tus hogares." },
          { name: "/tpa <jugador>", desc: "Envía una solicitud para teletransportarte hacia otro jugador." },
          { name: "/tpaccept", desc: "Acepta la solicitud de teletransporte que recibiste." },
          { name: "/spawn", desc: "Te lleva al punto de aparición central del servidor." },
          { name: "/warps", desc: "Abre el menú de viajes rápidos (zonas públicas, biomas, etc)." },
          { name: "/warp <nombre>", desc: "Te lleva directamente a un warp específico." },
          { name: "/arena", desc: "Te teletransporta a la zona de combate (PvP)." }
        ]
      },
      {
        title: "Protecciones (PS): Gestión",
        icon: Shield,
        items: [
          { name: "/ps", desc: "Muestra el menú de ayuda de Protection Stones (alias: /terrenos)." },
          { name: "/ps info", desc: "Muestra detalles del terreno actual (dueño, miembros, tamaño)." },
          { name: "/ps lista", desc: "Lista todos los terrenos que tienes protegidos." },
          { name: "/ps home [id]", desc: "Te teletransporta a uno de tus terrenos." },
          { name: "/ps sethome", desc: "Fija el punto de aparición donde aparecerás al usar /ps home." },
          { name: "/ps unclaim", desc: "Elimina la protección actual y te devuelve el bloque al inventario." },
          { name: "/ps renombrar <nombre>", desc: "Asigna un nombre personalizado a tu terreno." },
          { name: "/ps ver", desc: "Muestra visualmente los bordes de tu protección con partículas." },
          { name: "/ps ocultar", desc: "Oculta el bloque de protección para que no se vea." },
          { name: "/ps mostrarbloque", desc: "Vuelve a hacer visible el bloque de protección." },
          { name: "/ps juntar", desc: "Fusiona la protección actual con otra adyacente que sea tuya." },
          { name: "/ps dividir", desc: "Separa terrenos que hayan sido fusionados previamente." },
          { name: "/ps prioridad <nivel>", desc: "Cambia la prioridad de carga del terreno." }
        ]
      },
      {
        title: "Protecciones (PS): Miembros y Venta",
        icon: Users,
        items: [
          { name: "/ps agregarmiembro <jugador>", desc: "Permite al jugador construir e interactuar en tu terreno." },
          { name: "/ps eliminarmiembro <jugador>", desc: "Revoca los permisos de miembro a un jugador." },
          { name: "/ps agregardueño <jugador>", desc: "Hace al jugador co-propietario (Cuidado: tiene control total)." },
          { name: "/ps eliminardueño <jugador>", desc: "Le quita el rango de dueño al jugador." },
          { name: "/ps banear <jugador>", desc: "Prohíbe la entrada de un jugador a tu terreno." },
          { name: "/ps desban <jugador>", desc: "Permite entrar nuevamente a un jugador baneado." },
          { name: "/ps expulsar <jugador>", desc: "Saca a un jugador que esté dentro de tu terreno ahora mismo." },
          { name: "/ps permisos", desc: "Abre un menú para ajustar banderas y permisos específicos." },
          { name: "/ps fly", desc: "Activa o desactiva el vuelo dentro de tu protección." },
          { name: "/ps publico", desc: "Hace que cualquiera pueda entrar a tu terreno." },
          { name: "/ps privado", desc: "Restringe la entrada solo a miembros y dueños." },
          { name: "/ps vender <precio>", desc: "Pone el terreno a la venta por el precio especificado." },
          { name: "/ps comprar", desc: "Compra el terreno en el que estás parado (si está en venta)." },
          { name: "/ps transferir <jugador>", desc: "Regala/Transfiere la propiedad del terreno a otro jugador." }
        ]
      },
      {
        title: "Economía y Tiendas",
        icon: DollarSign,
        items: [
          { name: "/balance", desc: "Muestra cuánto dinero tienes en tu cuenta." },
          { name: "/balancetop", desc: "Muestra la lista de los jugadores más ricos del servidor." },
          { name: "/pay <jugador> <cantidad>", desc: "Envía dinero de tu saldo a otro jugador." },
          { name: "/kami", desc: "Abre la tienda principal para comprar protecciones y mejoras." },
          { name: "/donjhanzm", desc: "Abre el menú para vender tus items y conseguir dinero." },
          { name: "/comerciante", desc: "Abre el menú de comercio general o te lleva al NPC." }
        ]
      },
      {
        title: "Clanes: Creación y Gestión",
        icon: Flag,
        items: [
          { name: "/clan create <tag> <nombre>", desc: "Crea un clan nuevo (Costo: 100). Tag = Nombre corto." },
          { name: "/clan disband", desc: "Disuelve tu clan y lo elimina para siempre." },
          { name: "/clan invite <jugador>", desc: "Invita a alguien a unirse a tu clan." },
          { name: "/clan join <tag>", desc: "Acepta una invitación o únete a un clan público." },
          { name: "/clan leave", desc: "Abandona el clan en el que estás actualmente." },
          { name: "/clan kick <jugador>", desc: "Expulsa a un miembro de tu clan." },
          { name: "/clan promote <jugador>", desc: "Sube de rango a un miembro." },
          { name: "/clan demote <jugador>", desc: "Baja de rango a un miembro." },
          { name: "/clan home", desc: "Te teletransporta a la base del clan." },
          { name: "/clan setbase", desc: "Define la ubicación actual como base del clan." },
          { name: "/clan list", desc: "Muestra una lista de todos los clanes existentes." },
          { name: "/clan info [tag]", desc: "Muestra información detallada de tu clan o de otro." },
          { name: "/clan profile", desc: "Muestra tu perfil personal y estadísticas dentro del clan." },
          { name: "/clan chat", desc: "Cambia el modo de chat para hablar solo con tu clan." }
        ]
      },
      {
        title: "Clanes: Guerra y Extras",
        icon: Swords,
        items: [
          { name: "/clan rival add <tag>", desc: "Declara la guerra a otro clan." },
          { name: "/clan rival remove <tag>", desc: "Propone paz o retira la rivalidad." },
          { name: "/clan ally add <tag>", desc: "Propone una alianza con otro clan." },
          { name: "/clan ff", desc: "Activa/Desactiva el fuego amigo (dañarse entre miembros)." },
          { name: "/clan banner", desc: "Abre el editor para crear la bandera de tu clan." },
          { name: "/clan discord", desc: "Muestra el enlace de Discord del clan." },
          { name: "/clan bank deposit <monto>", desc: "Deposita dinero en el banco del clan." },
          { name: "/clan bank withdraw <monto>", desc: "Retira dinero del banco del clan." },
          { name: "/clan level", desc: "Muestra el nivel del clan y requisitos para subir." }
        ]
      },
      {
        title: "Social, Utilidad y Otros",
        icon: Smile,
        items: [
          { name: "/msg <jugador> <mensaje>", desc: "Envía un mensaje privado (susurro)." },
          { name: "/tell <jugador> <mensaje>", desc: "Alias de /msg." },
          { name: "/r <mensaje>", desc: "Responde rápidamente al último susurro recibido." },
          { name: "/help", desc: "Muestra la ayuda general del servidor." },
          { name: "/ranktags", desc: "Abre el menú para seleccionar tu etiqueta de rango." },
          { name: "/playingtime", desc: "Consulta tu tiempo total jugado en el servidor." },
          { name: "/personalizacion", desc: "Abre el menú de cosméticos, partículas y efectos." },
          { name: "/musica", desc: "Abre el reproductor de música del servidor." },
          { name: "/evento", desc: "Te une al evento que esté activo en ese momento." }
        ]
      }
    ]
  }
};