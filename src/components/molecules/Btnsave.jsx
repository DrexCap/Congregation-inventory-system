import { useState } from "react";
import styled from "styled-components";
import { Icono } from "../../index";
import { Loader } from "lucide-react"; 
import { Send } from "../../components/animate-ui/icons/send";

export function Btnsave({ funcion, titulo, bgcolor, icono, url, loading, formId }) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container 
      type="submit" 
      $form={formId} 
      $bgcolor={bgcolor} 
      disabled={loading} 
      onClick={ formId ? undefined : funcion }
      $titulo={titulo}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="btn">
        {icono && (
          <Icono>
            {loading ? (
              <Loader className="spin" size={20} />
            ) : (
              <Send size={16} animate={isHovered}  />
            )}
          </Icono>
        )}
        <a href={url} target="_blank" rel="noreferrer">
          {loading ? "Guardando..." : titulo}
        </a>
      </span>
    </Container>
  );
}

const Container = styled.button`
  border: none;
  background: none;
  z-index: 2;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px; /* espacio entre icono y texto */
    background: ${(props) => props.$bgcolor};
    padding: ${(props) => props.$titulo === "Guardar" ? '0.3em 1.1em' : '0.5em 1.2em'};
    font-weight: 900;
    font-size: ${(props) => props.$titulo === "Guardar" ? '16px' : '18px'};
    border: 3px solid black;
    border-radius: 0.4em;
    box-shadow: 0.1em 0.1em #000;
    transition: 0.2s;
    color: #000;
    cursor: pointer;

    a {
      text-decoration: none;
      color: #000;
    }

    &:hover {
      transform: translate(-0.05em, -0.05em);
      box-shadow: 0.15em 0.15em #000;
    }

    &:active {
      transform: translate(0.05em, 0.05em);
      box-shadow: 0.05em 0.05em #000;
    }
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
