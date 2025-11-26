
import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import {v} from "../../index.js";

export const Selector = ({ color, setAncho, state, ancho, funcion, texto1, texto2, setEspacioIzquieElem, fuente }) => {

    const cajaRef = useRef(null);

    useEffect(() => {
      if (cajaRef.current) {
        const { left, width } = cajaRef.current.getBoundingClientRect();
        setEspacioIzquieElem(left);
        if (setAncho) {
            let ancho = Math.round(width); 
            setAncho(ancho);
        }
      }
    }, []);

    return (
        <Container
            $fuente={`${fuente}px`}
            $ancho={ancho}
            ref={cajaRef}
            $color={color}
            onClick={funcion}
        >
            <div>
                <span>{texto1}</span>
                <span>{texto2}</span>
            </div>
            <div className={state?"open":"close"} style={{ display:"flex", alignItems:"center" }}>
                {<v.iconoFlechabajo />}
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    //height: 100%;
    ${(props) => props.$ancho &&
    css`
      flex: 1;
      min-width: 0;
    `}
    width: ${(props) => props.$ancho ? "" : "220px"};
    cursor: pointer;
    border: 2px solid ${(props) => props.$color};
    border-radius: 10px;
    padding: ${(props) => props.$fuente ? "5px" : "8px"};
    font-size: ${(props) => props.$fuente ?? "16px"};
    gap: 10px;
    transition: 0.3s;
    font-weight: ${(props) => props.$fuente ? "500" : "600"};
    box-shadow: 4px 9px 20px -12px ${(props) => props.$color};
    
    .open {
        transition: 0.3s;
        transform: rotate(0deg);
    }
    .close {
        transition: 0.3s;
        transform: rotate(180deg);
    }
    &:hover {
        background-color: ${(props) => props.$color};
        color: #000;
    }
`;