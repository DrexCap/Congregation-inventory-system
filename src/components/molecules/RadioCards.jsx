import { useState } from "react";
import styled, { css } from "styled-components";
import { Check } from "lucide-react"
import { AlarmClock } from "../../components/animate-ui/icons/alarm-clock";
import { BellRing } from "../../components/animate-ui/icons/bell-ring";
import { PartyPopper } from "../../components/animate-ui/icons/party-popper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  color: #fff;
`;

const TitleHeader = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #201a15;
`;

/* Colores base (puedes ajustarlos) */
const colors2 = {
  bg: "#121212",
  card: "#171717",
  cardHover: "#303030",        // hover intermedio (no seleccionado)
  selectedBg: "#37393b",      // fondo cuando está seleccionado
  selectedHoverBg: "#414244", // hover cuando ya está seleccionado
  border: "rgba(255,255,255,0.06)",
  selectedBorder: "rgba(255,255,255,0.18)",
  desc: "#a7a7a7",
  iconMuted: "#9aa0a6",
};

const colors = {
  // Fondo general
  bg: "#121212",              // negro con leve tinte azulado
  card: "#1976D2",            // gris azulado oscuro (cards base)
  cardHover: "#0357ab",       // un poco más claro para hover sutil
  
  // Estados seleccionados
  selectedBg: "#223043",      // tono azulado derivado del principal
  selectedHoverBg: "#2B3B50", // hover más luminoso
  border: "rgba(255,255,255,0.06)",
  selectedBorder: "rgba(25,118,210,0.45)", // borde con acento azul
  
  // Texto e iconografía
  // desc: "#b9c4d3",            // gris con leve tinte frío
  // iconMuted: "#9fb5cd",       // gris azulado suave
  desc: "#ffffff",
  iconMuted: "#ffffff",
  
  // Acentos
  primary: "#1976D2",         // color principal
  primaryHover: "#1E88E5",    // versión más brillante para hover
  primaryActive: "#1565C0",   // más oscuro para pressed state
};


const Card = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  background-color: ${({ selected }) => (selected ? colors.selectedBg : colors.card)};
  border: 1px solid ${({ selected }) => (selected ? colors.selectedBorder : colors.border)};
  cursor: pointer;
  transition: background-color 180ms ease, transform 150ms ease, box-shadow 200ms ease,
  border-color 180ms ease;
  text-align: left;
  outline: none;
  min-height: 60px;
  align-items: center;

  /* marquito / glow cuando está seleccionado */
  ${({ selected }) =>
    selected &&
    css`
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45), 0 0 0 4px rgba(255, 182, 110, 0.06);
    `}

  &:hover {
    /* hover intermedio si no está seleccionado */
    background-color: ${({ selected }) =>
      selected ? colors.selectedHoverBg : colors.cardHover};
    transform: translateY(-1px);
    border-color: ${({ selected }) => (selected ? colors.selectedBorder : "rgba(255,255,255,0.10)")};
  }

  &:active {
    transform: translateY(0);
  }

  /* Permite que el contenido interno no desborde en tamaños pequeños */
  & > * {
    min-width: 0;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.4rem;
  color: ${({ selected }) => (selected ? "#ffffff" : colors.iconMuted)};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
  color: ${({ selected }) => (selected ? "#fff" : "#e6e6e6")};
  font-size: 0.9rem;
  line-height: 1.2;
`;

const Description = styled.div`
  font-size: 0.8rem;
  color: ${colors.desc};
  line-height: 1.4;
  white-space: normal;
  word-break: break-word;
`;

const Checkbox = styled.div`
  margin-left: 4px;
  width: 18px;
  height: 18px;
  border: 2px solid ${({ selected }) => (selected ? "#d9d9d9" : "rgba(255,255,255,0.12)")};
  border-radius: 5px;
  background-color: ${({ selected }) => (selected ? "#ffffff" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 180ms ease;
  flex-shrink: 0;
  /* font-weight: 700;

  &::after {
    content: ${({ selected }) => (selected ? `Check` : "''")};
    font-size: 0.8rem;
    color: ${({ selected }) => (selected ? "#0a0a0a" : "transparent")};
  } */
`;

/* Componente */
export const RadioCards = ({ 
  value,
  onChange,
  options: customOptions, 
  // setEstados, 
  // setEstadoColor 
  } = {}) => {

  const selected = value;
  
  const [isHovered, setIsHovered] = useState(false);

  const defaultOptions = [
    {
      id: "Pendiente",
      icon: <AlarmClock size={24} animate={isHovered==="Pendiente"?true:false} />,
      title: "Pendiente",
      desc: "El lote aún no ha llegado.",
    },
    {
      id: "Observado / Detenido",
      icon: <BellRing size={24} animate={isHovered==="Observado / Detenido"?true:false} />,
      title: "Observado / Detenido",
      desc: "Se detectó algún problema.",
    },
    {
      id: "Completado",
      icon: <PartyPopper size={24} animate={isHovered==="Completado"?true:false} />,
      title: "Completado",
      desc: "Todo correcto, lote aceptado.",
    },
  ];

  const options = customOptions || defaultOptions;

  const handleSelect = (optId) => {
    onChange?.(optId);
    // setEstados?.(optId === "Observado / Detenido");
    // setEstadoColor?.(optId);
  };

  return (
    <Container role="radiogroup" aria-label="Subscription preferences">
      <TitleHeader>Estado del Proceso</TitleHeader>
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <Card
            key={opt.id}
            type="button"   
            selected={isSelected}
            onClick={() => handleSelect(opt.id)}
            role="radio"
            tabIndex={0}
            aria-checked={isSelected}
            onMouseEnter={() => setIsHovered(opt.id)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <IconWrapper selected={isSelected}>
              {opt.icon}
            </IconWrapper>
            <TextContent>
              <Title selected={isSelected}>{opt.title}</Title>
              <Description>{opt.desc}</Description>
            </TextContent>
            <Checkbox selected={isSelected}>
              {isSelected && <Check size={14} color="#0a0a0a" strokeWidth={3} />}
            </Checkbox>
          </Card>
        );
      })}
    </Container>
  );
};