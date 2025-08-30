
import styled from "styled-components";
import { Btnsave, useUserStore } from "../../index";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function LoginTemplates() {
    const navigate = useNavigate();
    const { insertarUsuarioAdmin } = useUserStore();
    const mutationInsertUser = useMutation({
        mutationKey: ["Insertar usuario admin"],
        mutationFn: async () => {
            const p = {
                correo: "pruebas1@gmail.com",
                pass: "PASS123"
            }
            const data = await insertarUsuarioAdmin(p);
            if( data ) {
                navigate("/");
            }
        }
    });

    return (
        <Container>
            <Btnsave
                titulo="Crear Cuenta"
                bgcolor="#fff"
                funcion={mutationInsertUser.mutateAsync}
            />
        </Container>
    )
}

const Container = styled.div`
    height: 100vh
`;