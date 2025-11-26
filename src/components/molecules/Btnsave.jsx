import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Icono } from "../../index";
import { Loader } from "lucide-react"; 
import { CircleCheckBig } from "../../components/animate-ui/icons/circle-check-big";
import { Send } from "../../components/animate-ui/icons/send";
import Button from '@mui/material/Button';

export function Btnsave({ actualizar, traza=false, funcion, titulo, bgcolor, icono=null, url, loading, success, formId, regis=false }) {

  const [isHovered, setIsHovered] = useState(false);

  return traza ? (
    <Button
      type="submit"
      variant="contained"
      disabled={loading || success}
      startIcon={
        success ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 1.1], opacity: 1 }} // efecto "pulse"
            transition={{ duration: 1.3, ease: "easeOut" }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <CircleCheckBig size={15} animate={true} />
          </motion.div>
        ) : loading ? (
          <Loader style={{ animation: "spin 1s linear infinite", display: "flex", alignItems: "center" }}  size={15} />
        ) : (
          <Send size={15} animate={isHovered} />
        )
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {loading ? "GUARDANDO..." : success ? "GUARDADO!" : actualizar ? "ACTUALIZAR" : "GUARDAR"}
    </Button>
  ) : (
    <Container
      type="submit"
      $form={formId}
      $bgcolor={bgcolor}
      disabled={loading || success}
      onClick={formId ? undefined : funcion}
      $titulo={titulo}
      $regis={regis}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="btn">
        {icono ? (
          <Icono>
            {success ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.2, 1.1], opacity: 1 }} // efecto "pulse"
                transition={{ duration: 1.3, ease: "easeOut" }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <CircleCheckBig size={20} animate={true} />
              </motion.div>
            ) : loading ? (
              <Loader className="spin" size={20} />
            ) : (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {icono === "Enviar" ? (
                  <Send
                    size={regis ? 15 : 20}
                    animate={isHovered}
                    color={regis && "#fff"}
                  />
                ) : (
                  <motion.div
                    animate={
                      isHovered ? { scale: 1.1, y: -1 } : { scale: 1, y: 0 }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {icono}
                  </motion.div>
                )}
              </span>
            )}
          </Icono>
        ) : null}
        <a href={url} target="_blank" rel="noreferrer">
          {loading ? "Guardando..." : success ? "Guardado!" : titulo}
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
    opacity: 0.8;
    cursor: not-allowed;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px; /* espacio entre icono y texto */
    background: ${(props) => props.$success ? "#4ade80" : props.$bgcolor};

    padding: ${(props) => props.$titulo === "Guardar" && props.$regis === false ? 
                          '0.3em 1.1em' : 
                          props.$regis ? '0.4em 0.8em' :
                          '0.5em 1.2em'
              };

    font-weight: ${(props)=>props.$regis?500:900};
    font-size: ${(props) => props.$titulo === "Guardar" && props.$regis === false ? 
                            '16px' : 
                            props.$regis === true ? '14px' :
                            '18px'
                };
                
    border: 3px solid black;
    border-radius: 0.4em;
    box-shadow: 0.1em 0.1em #000;
    transition: 0.2s;
    color: ${(props)=> props.$regis?"#fff":"#000"};
    cursor: pointer;

    a {
      text-decoration: none;
      color: ${(props)=> props.$regis?"#fff":"#000"};
    }

    &:hover {
      transform: ${(props) => props.$success ? 'none' : 'translate(-0.05em, -0.05em)'};
      box-shadow: ${(props) => props.$success ? '0.1em 0.1em #000' : '0.15em 0.15em #000'};
    }

    &:active {
      transform: ${(props) => props.$success ? 'none' : 'translate(0.05em, 0.05em)'};
      box-shadow: ${(props) => props.$success ? '0.1em 0.1em #000' : '0.05em 0.05em #000'};
    }
  }

  .spin {
    animation: spin 1s linear infinite;
    display: flex;
    align-items: center;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
