
import styled from "styled-components";
import { AccionTabla, v } from "../../index";

export const ContentAccionesTabla = ({funcionEditar, funcionEliminar}) => {
    return (
        <Container>
            {
                funcionEditar && (
                    <AccionTabla
                        funcion={funcionEditar}
                        color="#7d7d7d"
                        icono={<v.iconeditarTabla/>}
                        fontSize="18px"
                    />
                )

            }
            <AccionTabla
                funcion={funcionEliminar}
                color="#f76e8e"
                icono={<v.iconeliminarTabla/>}
                fontSize="18px"
            />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    @media (max-width: 48em) {
        justify-content: end;
    }
`;



