
import styled from "styled-components";
import { motion } from "framer-motion";
import { SquarePen } from "lucide-react";
import { Trash2  } from "../../components/animate-ui/icons/trash-2";
import { AccionTabla } from "../../index";

export const ContentAccionesTabla = ({funcionEditar, funcionEliminar}) => {
    return (
        <Container>
            {
                funcionEditar && (
                    <AccionTabla
                        funcion={funcionEditar}
                        color="#7d7d7d"
                        icono={
                            <motion.div
                                whileHover={{ scale: 1.2, y: -1 }}
                                whileTap={{ scale: 0.9, y: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                <SquarePen  
                                    size={20} 
                                    style={{ cursor: "pointer" }} 
                                />
                            </motion.div>
                        }
                        fontSize="20px"
                    />
                )

            }
            <AccionTabla
                funcion={funcionEliminar}
                color="#f76e8e"
                icono={
                    <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9, y: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                            <Trash2 size={20} animateOnHover />
                    </motion.div>
                }
                fontSize="20px"
            />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    gap: 13px;
    justify-content: center;
    flex-wrap: wrap;
    @media (max-width: 48em) {
        justify-content: end;
    }
`;



