
import styled from "styled-components";
import {Device} from "../../styles/breackpoints.jsx";

export const ColorContentTabla = styled.div`
    color: ${(props) => props.$color};
    border-radius: 8px;
    border: 2px dashed ${(props) => props.$color};
    font-weight: bold;
    text-align: center;
    padding: 3px;
    width: 70%;
    @media ${Device.tablet} {
        width: 100%;
    }
`;