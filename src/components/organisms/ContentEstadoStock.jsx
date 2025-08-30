
import styled from "styled-components";
import {Device} from "../../styles/breackpoints.jsx";
import { gradientes } from "../../index.js";

export const ContentEstadoStock = ({stock, stock_minimo}) => {

    const porcentaje = (stock * 100) / stock_minimo;

    let color = "";
    if (100 - porcentaje.toFixed(0) >= 50 && 100 - porcentaje.toFixed(0) <= 70) color = "red";
    else if (100 - porcentaje.toFixed(0) <= 50) color = "yellow";

    return (
        <>
            {stock_minimo > stock ? (
                <Container $color={color}>
                    <span>Falt.&nbsp;&nbsp;&nbsp;{100 - porcentaje.toFixed(0)}%</span>
                </Container>
            ) : stock_minimo < stock ? (
                <Container style={{background: gradientes["green"]}}>
                    <span>Excd.&nbsp;&nbsp;&nbsp;{porcentaje.toFixed(0)-100}%</span>
                </Container>
            ) : (
                <Container style={{background: gradientes["green"]}}>
                    <span>&nbsp;&nbsp;&nbsp;{100}%</span>
                </Container>
            )}
        </>
    )
}

const Container = styled.div`
    background: ${({ $color }) => gradientes[$color] || "transparent"}; 
    color: ${(props) => props.$color==='yellow' && '#000'};
    font-weight: bold;
    border-radius: 8px;
    text-align: center;
    padding: 3px;
    width: 70%;
    @media ${Device.tablet} {
        width: 100%;
    }
`;
