
import styled from "styled-components";
import { BtnCerrar } from "../atoms/BtnCerrar.jsx";
import { styleDevice } from "../../index";
import { Device } from "../../styles/breackpoints.jsx";
import { useEffect } from "react";

export const ListaGenerica = ({data, setState, funcion, anchoListaGenerica, 
    scroll, bottom, espacioIzquieElem, espacioAbajoElem}) => {
        
    // TODO: Ver como hacerlo responsive
    const {izquierda, abajo} = styleDevice(espacioIzquieElem, espacioAbajoElem);

    useEffect(() => {
        console.log({espacioIzquieElem, espacioAbajoElem});
        console.log({izquierda, abajo});
    }, []);

    const seleccionar = (p) => {
        funcion(p);
        setState();
    }

    return (
        <Container 
            $scroll={scroll} 
            $bottom={bottom} 
            $bottom2={`${abajo()}px`}
            $anchoListaGenerica={anchoListaGenerica}
            style={{marginLeft: `${izquierda()}px`}}
        >
            <section className="contentClose">
                <BtnCerrar funcion={setState}/>
            </section>

            <section className="contentItems">
                {data?.map((item, index)=> {
                    return (
                        <ItemContainer key={index} onClick={() => seleccionar(item)}>
                            <span>⚔️</span>
                            <span>{item.descripcion}</span>
                        </ItemContainer>
                    )
                })}
            </section>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    position: absolute;
    margin-bottom: 15px;
    bottom: ${(props) => props.$bottom ? props.$bottom : props.$bottom2};
    width: 220px;
    padding: 15px;
    border-radius: 10px;
    z-index: 3;
    height: 235px;
    @media ${Device.tablet} {
        width: ${(props) => props.$anchoListaGenerica};
    }
    .contentClose {
        margin-left: auto
    }
    .contentItems {
        //overflow-y: ${(props) => props.$scroll};
    }

    .contentItems {
        overflow-y: auto; /* Asegura que el scrollbar aparezca cuando sea necesario */
    }

    .contentItems::-webkit-scrollbar {
        width: 8px; /* Ancho del scrollbar */
    }

    .contentItems::-webkit-scrollbar-track {
        background: #555; /* Color de fondo de la pista */
        border-radius: 10px; /* Bordes redondeados para la pista */
    }

    .contentItems::-webkit-scrollbar-thumb {
        background: #F97316; /* Color del pulgar (gris ceniza) */
        border-radius: 8px; /* Bordes redondeados para el pulgar */
        border: 2px solid #f1f1f1; /* Espacio alrededor del pulgar */
    }
`;

const ItemContainer = styled.div`
    gap: 10px;
    display: flex;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        background-color: ${({ theme }) => theme.bgtotal };
    }
`;