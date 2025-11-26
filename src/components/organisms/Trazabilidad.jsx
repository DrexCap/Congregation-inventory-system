
import { useState, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedGif from "../../assets/ojos.gif"; // 👈 tu JSON descargado
import Vista from "../../assets/vista.png";
import { SquareX } from "../../components/animate-ui/icons/square-x";
import { SquareArrowOutUpRight } from "../../components/animate-ui/icons/square-arrow-out-up-right";
import { CheckLine } from "../../components/animate-ui/icons/check-line";
import { ClipboardList } from "../../components/animate-ui/icons/clipboard-list";
import { MessageSquareText } from "../../components/animate-ui/icons/message-square-text";
import { ChartColumnIncreasing } from "../../components/animate-ui/icons/chart-column-increasing";
import { User } from "../../components/animate-ui/icons/user";
import { CalendarFold, Package2, FileBox, FileText, Printer } from "lucide-react";
import { TimeLine, RegistrosAnimados, ExampleProgress } from "../../index";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@/components/animate-ui/components/radix/hover-card';
import Button from '@mui/material/Button';
import { styled as style, createTheme, ThemeProvider } from '@mui/material/styles';

const subtheme = createTheme({
  palette: {
    secondary: {
      light: '#F97316',
      main: '#fff',
      dark: '#ee6300',
      // contrastText: '#fff',
    },
  },
}); 

const ColorButton = style(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.secondary.light,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const Button2 = styled.button`
  gap: ${(props) => props.gif ? "6px" : "8px"};;
  min-height: ${(props) => props.gif ? "2.1rem" : "2.3rem"};
  width: ${(props) => props.gif ? "auto" : "132px"};
  padding: 6px 12px;
  font-weight: 500;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  display: flex;
  color: #111827;
  align-items: center;
  background-color: #f9fafb;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;

  &:hover, &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(0, 0, 0, 0.65);
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: #F0F0F1;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }
`;

// ==== Modal Overlay y Container ====
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  overflow-x: hidden;
`;

const ModalContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 700px;
  max-width: 90%;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  max-height: 95vh; /* límite del modal en pantalla */
  display: flex;
  flex-direction: column; /* 👈 importante */
  overflow: hidden; /* evita scroll doble */
  overflow-x: hidden;
`;

const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  padding: 20px 20px 12px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5; /* mantiene el header arriba */
`;

const ModalBody = styled.div`
  flex: 1; /* ocupa el resto del espacio */
  overflow-y: auto; /* scroll solo aquí */
  scrollbar-gutter: stable both-edges;
  padding: 0 20px 20px 20px;
  overflow-x: hidden;
  
  /* estilos de scrollbar */
  &::-webkit-scrollbar {
     width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #555;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #f97316;
    border-radius: 8px;
    border: 2px solid #f1f1f1;
  }
`;

// ==== Estilos internos del modal ====
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 19px;
  font-weight: 700;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #666;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const Card = styled.div`
  position: relative;
  background: #fafafa;
  border-radius: 10px;
  padding: 16px;
  margin: 12px 0;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  --card-border-color: ${({ color }) => color || "#19a92c"};

  &:hover {
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  /* Anillo animado */
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      var(--card-border-color) 90deg,
      transparent 180deg,
      var(--card-border-color) 270deg,
      transparent 360deg
    );
    animation: rotateClockwise 3s linear infinite;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 2px;
    background: #fafafa;
    border-radius: 8px;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  @keyframes rotateClockwise {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const CardRegistro = styled.div`
  position: relative;
  background: #fafafa;
  border-radius: 10px;
  padding: 16px;
  margin: 12px 0;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  --card-border-color: ${({ color }) => color || "#19a92c"};

  &:hover {
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  /* Anillo animado */
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      var(--card-border-color) 90deg,
      transparent 180deg,
      var(--card-border-color) 270deg,
      transparent 360deg
    );
    animation: rotateClockwise 3s linear infinite;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 2px;
    background: #fafafa;
    border-radius: 8px;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  @keyframes rotateClockwise {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .formulario {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-grow: 1;
  }

  .formulario section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
  }

  .formulario .btnguardarContent {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    padding-top: 12px;
  }
`;

const SectionTitle = styled.h4`
  justify-content: space-between;
  display: flex;
  align-items: center;
  font-size: 15px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  /* margin: 4px 0; */
  /* margin-top: 0.5rem; */
  margin-bottom: 0.3rem;
`;

const Label = styled.span`
  font-weight: 500;
  color: #333;
`;

const Value = styled.span`
  font-weight: 450;
  color: ${(props) => props.color || "#000"};
`;

const Badge = styled.span`
  background: ${(props) => (props.type === "success" ? "#dbeafe" : "#eee")};
  color: ${(props) => (props.type === "success" ? "#1d4ed8" : "#333")};
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
`;

const ButtonCustom = styled.div`
  /* margin: 2px; */
  padding: 6px 13px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  border: 0px;
  font-weight: 400;
  box-shadow: 0px 0px 14px -7px #f09819;
  background-color: #F77B2F;
  /* background-image: linear-gradient(45deg, #FF512F 0%, #F09819  51%, #FF512F  100%); */
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-color: #FF512F;
    /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }

  &:active {
    /* transform: scale(0.95); */
  }
`

const Content = styled.div`
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 300px;
  max-width: 300px;
`;

const Row2 = styled.div`
  display: flex;
  justify-content: flex-start; /* 👈 ahora todos inician pegados a la izquierda */
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 5.9rem; /* mantiene espacio entre los hijos */
`;

const Row3 = styled.div`
  display: flex;
  justify-content: flex-start; /* 👈 ahora todos inician pegados a la izquierda */
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 5rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label2 = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: #555;
`;

const Value2 = styled.span`
  font-weight: 530;
  font-size: 14px;
  color: #111;
  margin-top: 0.3rem;
`;

const DocumentTag = styled.div`
  display: inline-block;
  /* background: #e9f9ee; */
  font-size: 0.80rem;
  border-radius: 8px;
  padding: 4px 10px;
  margin-top: 0.5rem;
`;                

const Divider = styled.hr`
  border: none;
  border-top: 1.8px solid #e6e3e3;
  margin: 1rem 0;
`;

const PatternSection = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 1rem;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.03) 19px, rgba(75, 85, 99, 0.03) 20px),
      repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.03) 19px, rgba(75, 85, 99, 0.03) 20px),
      radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.1) 2px, transparent 2px),
      radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.1) 2px, transparent 2px);
    background-size: 40px 40px;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const GridBackground = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  min-height: 100%;
  margin-top: -16px;         
  padding-top: 16px;        
  margin-left: -14px;
  padding-left: 14px;
  margin-right: -14px;
  padding-right: 14px;

  /* Capa 1: Cuadrícula */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image: 
      linear-gradient(to right, #d6d9e0 1px, transparent 1px),
      linear-gradient(to bottom, #d6d9e0 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.3; /* 🔹 Más visible que antes */
  }

  /* Capa 2: Bolitas sutiles */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image: radial-gradient(#9ca3af 0.6px, transparent 0.6px);
    background-size: 22px 22px;
    opacity: 0.5; /* 🔹 Le da un toque visible pero suave */
  }

  /* Contenido encima del fondo */
  > * {
    position: relative;
    z-index: 1;
  }
`;

const DashedGridBackground = styled.div`
  position: relative;
  width: 100%;
  flex: 1; /* ✅ ocupa el espacio disponible */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: -16px;         
  padding-top: 16px;
  margin-bottom: -16px;         
  padding-bottom: 16px;  
  
  /* Fondo de cuadrícula */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0; /* al fondo */
    background-image:
      linear-gradient(to right, #e7e5e4 1px, transparent 1px),
      linear-gradient(to bottom, #e7e5e4 1px, transparent 1px);
    background-size: 20px 20px;

    mask-image:
      repeating-linear-gradient(
        to right,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      repeating-linear-gradient(
        to bottom,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      );
    -webkit-mask-image:
      repeating-linear-gradient(
        to right,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      repeating-linear-gradient(
        to bottom,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      );

    mask-composite: intersect;
    -webkit-mask-composite: source-in;
  }

  /* Contenido encima */
  > * {
    position: relative;
    z-index: 1; /* asegura que todo lo interno esté sobre el fondo */
  }
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 0.5rem;
  flex-wrap: wrap; /* evita desbordes si el modal es pequeño */

  /* opcional: asegura que las tarjetas se vean bien en pantallas pequeñas */
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

// ==== Componente Principal ====
export function Trazabilidad({id, tipo, documento, verificarDoc, producto, cantidad, detalle, 
        fecha, color, responsable, fechaInicio, fechaFin, lote, tipoUser }) {

  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSetHovered, setHovered] = useState(null);
  const [isSetHovered2, setHovered2] = useState(null);
  const [pasos, setPasos] = useState(0);

  const [estadoColor, setEstadoColor] = useState("");

  const getColorDocumento = (valor) => {
        const coloresPorPrefijo = {
            INSU: "#d1d1d1",
            PROD: "#ddf7e6",
            CONS: "#eee8ff",
            DEV:  "#e6efff",
            MER:  "#fdeded",
            TRAS: "#ffe1ac",
        };
        const prefijo = valor.split("-")[0]; // "INSU" de "INSU-0030"
        return coloresPorPrefijo[prefijo] || "white"; // negro por defecto
  }

  function generarTitulo(documento, producto) {
      const prefijo = documento.split("-")[0]; // "INSU" de "INSU-0030"
      switch (prefijo) {
        case "MER":
          return "Registro y trazabilidad de pérdidas por merma";
        case "DEV":
          return `Control y seguimiento de la devolución de ${producto}`;
        case "PROD":
          return `Verificación y seguimiento de ${producto} en la producción de libros`;
        case "TRAS":
          return "Trazabilidad del traslado de materiales entre oficionas";
        case "CONS":
          return "Control del consumo interno de materiales";
        default:
          return "Registro general de movimiento de inventario";
      }
  }

  function pluralizar(palabra, cantidad) {
    if (palabra.endsWith("s") && !palabra.endsWith("z")) return palabra;

    if (cantidad < 2) return palabra; // No pluralizar si es singular o 0

    const ultima = palabra.slice(-1).toLowerCase();

    // Si termina en vocal (a, e, i, o, u)
    if (/[aeiouáéíóú]/.test(ultima)) {
      return palabra + "s";
    }

    // Si termina en 'z'
    if (ultima === "z") {
      return palabra.slice(0, -1) + "ces";
    }

    // Si termina en 's' o 'x'
    if (ultima === "s" || ultima === "x") {
      // Simplificación: mantenemos igual, pues no cambia visualmente
      return palabra; 
      // (podrías agregar una lógica más avanzada si quieres manejar acentos)
    }

    // Si termina en cualquier otra consonante
    return palabra + "es";
  }

  const handleOpenModalBarraLateral = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  }

  const handleCloseModalBarraLateral = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  }

  const colorbody = {
    "Pendiente": "#ffc117",            // Amarillo
    "Observado / Detenido": "#ff7d79", // Rojo
    "Completado": "#19a92c",           // Verde
  };

  const colorHead = {
    "Pendiente": "#fcf8ea",            // Amarillo
    "Observado / Detenido": "#ffefea", // Rojo
    "Completado": "#ecffee",           // Verde
  };

  const colorIcon = {
    "Pendiente": "#ffc800",            // Amarillo
    "Observado / Detenido": "#e8572a", // Rojo
    "Completado": "#30C85B",           // Verde
  };

  const colorSeleccionado = colorbody[estadoColor] || "#19a92c"; // color por defecto

  const colorCard = (prop="border") => {
    if(documento.startsWith("PROD-") && !verificarDoc(documento)) {
      return prop === "fondo" ? "#fefaf4" : "#ff7d79";
    } else if (documento.startsWith("PROD-") && verificarDoc(documento)) {
      return prop === "fondo" ? "#f3fff4" : "#19a92c";
    } else if(documento.startsWith("INSU-")) {
      return prop === "fondo" ? "#d1d1d1" : "#868c96";
    } else if(documento.startsWith("CONS-")) {
      return prop === "fondo" ? "#eee8ff" : "#8B5CF6";
    } else if(documento.startsWith("DEV-")) {
      return prop === "fondo" ? "#e6efff" : "#3B82F6";
    } else if(documento.startsWith("MER-")) {
      return prop === "fondo" ? "#fdeded" : "#EF4444";
    } else if(documento.startsWith("TRAS-")) {
      return prop === "fondo" ? "#ffe1ac" : "#F59E0B";
    }
  }

  return (
    <div>
      {/* Botón que abre el modal */}
      <Button2 gif={documento?.startsWith("PROD-")} onClick={handleOpenModalBarraLateral}>
        {documento?.startsWith("PROD-") ? (
            !verificarDoc(documento) && 
              <img src={AnimatedGif} alt="icono animado" style={{ width: 25, height: 25 }} />
          ) : <img src={Vista} alt="icono estatico" style={{ width: 20, height: 20 }} />
        }
        Trazabilidad
      </Button2>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <ModalOverlay
            // as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // transition={{ duration: 0.3, ease: "easeOut" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", display: "flex", justifyContent: "center" }}
              // transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ThemeProvider theme={subtheme}>
                <ModalContainer>
                  <ModalHeader>
                    <div>

                    </div>
                    <div>
                      <Title>Trazabilidad del Lote <span style={{ color: "#e8572a" }}>{lote}</span> de {producto}</Title>
                      <Subtitle>{generarTitulo(documento, producto)}</Subtitle>
                    </div>
                    <CloseButton onClick={handleCloseModalBarraLateral}>
                      <SquareX size={30} animateOnHover />
                    </CloseButton>
                  </ModalHeader>

                  <ModalBody>
                    {/* Detalle del Movimiento */}
                    <Card 
                      // color={
                      //   !verificarDoc(documento) && documento.startsWith("PROD-")
                      //     ? "#ff7d79"
                      //     : "#19a92c"
                      // }
                      color={colorCard()}
                      style={{ 
                        paddingBottom: 5,
                        // border: !verificarDoc(documento) && documento.startsWith("PROD-") ? 
                        //   "2.6px solid #ff7d79" :
                        //   "2.6px solid #19a92c" 
                        border: `2.6px solid ${colorCard()}`
                      }}
                      onMouseEnter={() => setHovered2(true)}
                      onMouseLeave={() => setHovered2(false)}
                    >
                      <div style={{
                        // backgroundColor: !verificarDoc(documento) && documento.startsWith("PROD-") ? "#fefaf4" : "#f3fff4", OJO AQUI 
                        backgroundColor: colorCard("fondo"),
                        margin: "-15px -15px -15px -15px", // elimina padding lateral y superior del Card
                        padding: "12px 16px",          // espacio interno para el título y botón
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px"
                      }}>
                        <SectionTitle>
                          <div 
                            style={{ display: "flex", alignItems: "center", gap: 4, 
                            fontSize: "1rem", fontWeight: 600, color: "#1a1a1a" }}
                          >
                            <motion.div
                              animate={isSetHovered2 ? { scale: 1.1, y: -1 } : { scale: 1, y: 0 }}
                              whileTap={{ scale: 0.9, y: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <FileText size={23.5} 
                                // color={!verificarDoc(documento) && documento.startsWith("PROD-") ? 
                                // "#F48120" : "#30C85B"}
                                color={colorCard()}
                              />                          
                            </motion.div> 
                            Detalle del movimiento
                          </div>

                          {
                            (!verificarDoc(documento) && documento.startsWith("PROD-")) && (
                              <ColorButton 
                                variant="contained" 
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                startIcon={<SquareArrowOutUpRight size={15} animate={isHovered} />}
                              >
                                RESOLVER MATCH
                              </ColorButton>
                            )
                          } 
                        </SectionTitle>
                      </div>

                      <Divider style={{ width: "calc(100% + 32px)", marginLeft: "-16px" }} />
                      
                      <GridBackground>
                        <Row2>
                          <Column>
                            <Label2>
                              <FileBox size={23} />
                              Documento Orden
                            </Label2>
                            <DocumentTag style={{
                              background: getColorDocumento(documento),
                              color: color(documento), 
                              fontWeight: documento.startsWith("PROD-") ? 750 : 600,
                              animation: documento.startsWith("PROD-") ? verificarDoc(documento) ? 
                                                "none" : 
                                                "breathe 2s ease-in-out infinite" : "none"
                            }}>
                              {documento}
                            </DocumentTag>              
                          </Column>

                          <Column>
                            <Label2>
                              <Printer size={23} />
                              Estado Gen.
                            </Label2>
                            <Value2 >
                              <ExampleProgress />
                            </Value2>
                          </Column>

                          <Column>
                            <Label2>
                              <Package2 size={23} />
                              Cantidad
                            </Label2>
                            <Value2 >{cantidad} {pluralizar(producto, cantidad)}</Value2>
                          </Column>
                        </Row2>

                        <Row3>
                          <Column>
                            <Label2 style={{ marginTop: "1.5rem", color: "#555" }}>
                              <CalendarFold size={23} />
                              Fecha programada
                            </Label2>
                            <Value2 >
                              {
                                new Date(fechaFin) < new Date() ? (
                                  <span style={{ color: "#F77424" }}>Fecha expirada</span>
                                ) : (
                                  <>
                                    {new Date(fechaInicio).toLocaleDateString("es-PE", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })}
                                    {" - "}
                                    {new Date(fechaFin).toLocaleDateString("es-PE", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })}
                                  </>
                                )
                              }
                            </Value2>
                          </Column>

                          <Column>
                            <Label2 style={{ marginTop: "1.5rem", color: "#555", 
                              marginLeft: new Date(fechaFin) < new Date() ? "0.2rem" : "0.2rem", 
                              marginRight: new Date(fechaFin) < new Date() ? "1.5rem" : "1.5rem",  
                            }}>
                              <User size={23} animateOnHover />
                              Responsable
                            </Label2>
                            <Value2 
                              style={{
                                marginLeft: new Date(fechaFin) < new Date() ? "0.2rem" : "0.3rem", 
                                marginRight: new Date(fechaFin) < new Date() ? "1.5rem" : "1.5rem", 
                              }}
                            >
                              {/* {responsable} */}
                              {responsable} {tipoUser === "superadmin" ? ("(Admin)") : ("(Operad.)")}
                            </Value2>
                          </Column>

                          <Column>
                            <Label2 style={{ marginTop: "1.5rem", color: "#555" }}>
                              <ClipboardList size={23} animateOnHover />
                              Detalle  
                            </Label2>
                            <Value2>
                              <HoverCard>
                                {
                                  detalle?.length < 10 ? 
                                  detalle :
                                  (
                                    <>
                                      <HoverCardTrigger>
                                        <MessageSquareText size={25} animateOnHover />
                                      </HoverCardTrigger>
                                      <HoverCardContent className="z-2000">
                                        <Content>
                                          <div>
                                            <Title>DETALLE</Title>
                                            <Subtitle>
                                              {detalle}
                                            </Subtitle>
                                          </div>
                                        </Content>
                                      </HoverCardContent>
                                    </>
                                  )
                                }
                              </HoverCard>              
                            </Value2>             
                          </Column>
                        </Row3>

                        {
                          !verificarDoc(documento) && documento.startsWith("PROD-") && 
                            <Divider style={{ borderTop: "3px solid #e6e3e3" }} /> 
                        }

                        <Row style={{ justifyContent: "center" }}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            {
                              !verificarDoc(documento) && documento.startsWith("PROD-") ? 
                                <>
                                  <div style={{
                                    fontSize: 18.5, 
                                    marginRight: 4,
                                    animation: "breathe 2s ease-in-out infinite"
                                  }}>
                                    ⚠️
                                  </div>
                                  <div>
                                    <Value style={{ color: "#fb4f49", fontSize: 14 }}>
                                      El Documento debe hacer "Match" con el nuevo lote de carátulas.
                                    </Value>
                                  </div> 
                                </>
                              : documento.startsWith("PROD-") ?
                                <>
                                  <div style={{ color: "#52DE65", marginRight: 5 }}>
                                    <motion.div
                                      initial={{ scale: 0.8, opacity: 0 }}
                                      animate={{ scale: [0.8, 1.2, 1.1], opacity: 1 }} // efecto "pulse"
                                      transition={{ duration: 1.3, ease: "easeOut" }}
                                      style={{ display: "flex", alignItems: "center" }}
                                    >
                                      <CheckLine animate={true} loop loopDelay={1800} 
                                                  strokeWidth={4} size={17}/>                            
                                    </motion.div>
                                  </div>
                                  <div>
                                    <Value style={{ color: "#19a92c", fontSize: 14 }}>
                                      El documento esta alineado con el nuevo lote de carátulas.
                                    </Value>
                                  </div> 
                                </>
                              : <></>
                            }
                          </div>
                        </Row>

                      </GridBackground>
                    </Card>
                    
                    <CardRow>
                      {/* Libros Producidos */}
                      <Card 
                        style={{ flex: 1, display: "flex", flexDirection: "column" }}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                      >
                        <div style={{
                          backgroundColor: "#ecffee", 
                          margin: "-15px -15px -15px -15px", // elimina padding lateral y superior del Card
                          padding: "12px 16px",          // espacio interno para el título y botón
                          borderTopLeftRadius: "8px",
                          borderTopRightRadius: "8px"
                        }}>
                          <SectionTitle style={{ cursor: "pointer" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, 
                              fontSize: "0.9rem", fontWeight: 600, color: "#1a1a1a" }}>
                              <ChartColumnIncreasing 
                                size={22}
                                animate={isSetHovered} 
                                color="#30C85B"
                              />
                              Control de Proceso de Impresión
                            </div>
                          </SectionTitle>
                        </div>

                        <Divider style={{ width: "calc(100% + 32px)", marginLeft: "-16px" }} />

                        <DashedGridBackground>
                          <TimeLine setPasos={setPasos} />  
                        </DashedGridBackground>

                      </Card>
                      
                      {/* <RegistrarTrazaUno /> */}
                      <CardRegistro 
                        color={colorSeleccionado}                    
                        style={{ flex: 1, display: "flex", flexDirection: "column" }}
                      >
                        <RegistrosAnimados 
                          setEstadoColor={setEstadoColor} 
                          estadoColor={estadoColor} 
                          pasos={pasos} 
                          code_lote={lote}
                        />
                      </CardRegistro>

                    </CardRow>

                    {/* Libros Producidos */}
                      <Card >
                        <SectionTitle>Libros Producidos</SectionTitle>
                        <Row>
                          <Label>Título</Label>
                          <Value>Corazones en Llamas</Value>
                        </Row>
                        <Row>
                          <Label>ISBN</Label>
                          <Value>978-84-123-4567-8</Value>
                        </Row>
                        <Row>
                          <Label>Cantidad</Label>
                          <Value color="#059669">200 libros</Value>
                        </Row>
                        <Row>
                          <Label>Estado</Label>
                          <Badge type="success">terminado</Badge>
                        </Row>
                      </Card>
                  
                  </ModalBody>  
                </ModalContainer>
              </ThemeProvider>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}
