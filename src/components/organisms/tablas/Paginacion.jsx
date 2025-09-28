
import { useState } from "react";
import styled, { css }  from "styled-components";
import { ChevronLeft } from "../../../components/animate-ui/icons/chevron-left";
import { ChevronRight } from "../../../components/animate-ui/icons/chevron-right";
import { LayoutDashboard } from "../../../components/animate-ui/icons/layout-dashboard";
import { v } from "../../../index"

export const Paginacion = ({table, pagina, maximo, irinicio}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    const [isActive, setIsActive] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);

    const hoverStyle = {
        transform: "translateY(-3px)",
        boxShadow: "6px 6px 10px -3px #FF7800",
    };

    const activeStyle = {
        transform: "translateY(-1px) scale(0.98)",
        boxShadow: "3px 3px 6px -2px #FF7800",
    };

    return (
        <Container>
            <button
                onClick={() => irinicio()}
                disabled={!table.getCanPreviousPage()}
                onMouseEnter={() => setIsHovered3(true)}
                onMouseLeave={() => {
                    setIsHovered3(false);
                    setIsActive3(false);
                }}
                onMouseDown={() => setIsActive3(true)}
                onMouseUp={() => setIsActive3(false)}
                style={{
                    ...(isHovered3 ? hoverStyle : {}),
                    ...(isActive3 ? activeStyle : {}),
                }}
            >
                <span className="iconos">
                    {<LayoutDashboard size={21} animate={isHovered3} />}
                </span>
            </button>

            <button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => {
                    setIsHovered2(false);
                    setIsActive2(false);
                }}
                onMouseDown={() => setIsActive2(true)}
                onMouseUp={() => setIsActive2(false)}
                style={{
                    ...(isHovered2 ? hoverStyle : {}),
                    ...(isActive2 ? activeStyle : {}),
                }}
            >
                <span className="iconos izquierda">
                    {<ChevronLeft size={21} animate={isHovered2} />}
                </span>
            </button>

            <span>{pagina}</span>
            <p> de {maximo}</p>
            
            <button
                disabled={!table.getCanNextPage()}
                onClick={()=>table.nextPage()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setIsActive(false);
                }}
                onMouseDown={() => setIsActive(true)}
                onMouseUp={() => setIsActive(false)}
                style={{
                    ...(isHovered ? hoverStyle : {}),
                    ...(isActive ? activeStyle : {}),
                }}
            >
                <span className="iconos">
                    {<ChevronRight size={21} animate={isHovered} />}
                </span>
            </button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    button {
        background-color: #FF7800;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        text-align: center;
        transition: transform 0.25s ease, box-shadow 0.25s ease;

        ${(props) => props.$isHoverActive &&
        css`
            &:hover {
                transform: translateY(-3px); /* se eleva un poco */
                box-shadow: 6px 6px 10px -3px #FF7800; /* sombra más marcada abajo-derecha */
            }

            &:active {
                transform: translateY(-1px) scale(0.98); /* efecto de click */
                box-shadow: 3px 3px 6px -2px #FF7800; 
            }
        `}

        .iconos {
            color: #FFF;
            display: flex;
            align-items: center;
            justify-content: center;    
        }
    }
    button[disabled] {
        background-color: #646464;
        cursor: no-drop;
        box-shadow: none;
    }
`;