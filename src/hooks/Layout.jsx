
import styled from "styled-components";
import {useUserStore} from "../store/UserStore.jsx";
import {useEmpresaStore} from "../store/EmpresaStore.jsx";
import {useQuery} from "@tanstack/react-query";
import {SpinnerLoader} from "../components/molecules/SpinnerLoader.jsx";
import {ErrorMolecula} from "../components/molecules/ErrorMolecula.jsx";
import {Sidebar} from "../components/organisms/sidebar/Sidebar.jsx";
import {MenuHambur} from "../components/organisms/MenuHambur.jsx";
import {useState} from "react";
import {Device} from "../styles/breackpoints.jsx";

export const Layout = ({children}) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { mostrarUsuarios, idusuario, mostrarPermisos } = useUserStore();
    const { mostrarEmpresa, nroUsuariosXEmpresa } = useEmpresaStore();

    const { data: datausuario, isLoading, error } = useQuery({
        queryKey: ["Mostrar usuario logueado"],
        queryFn: mostrarUsuarios,
    });

    const { data: dataempresa } = useQuery({
        queryKey: ["Mostrar empresa"],
        queryFn: () => mostrarEmpresa({idusuario}),
        enabled: !!datausuario
    })

    const { data: nroUsuarios } = useQuery({
        queryKey: ["Contar usuarios x empresa"],
        queryFn: () => nroUsuariosXEmpresa({
            id_empresa: dataempresa?.id
        }),
        enabled:!!dataempresa
    })

    const { data } = useQuery({
        queryKey: ["Mostrar permisos", {id_usuario: idusuario}],
        queryFn: () => mostrarPermisos({id_usuario: idusuario}),
        enabled: !!datausuario
    })

    if(isLoading) {
        return <SpinnerLoader />
    }

    if(error) {
        return <ErrorMolecula mensaje={error.message}/>
    }

    return (
        <Container className={sidebarOpen?"active":""}>
            <section className="ContentSidebar">
                <Sidebar
                    state={sidebarOpen}
                    setState={()=>setSidebarOpen(!sidebarOpen)}
                />
            </section>

            <section className="ContentMenuambur">
                <MenuHambur />
            </section>

            <section className="ContentRoutes">
                {children}
            </section>
        </Container>
    )
}

const Container = styled.main`
    display: grid;
    grid-template-columns: 1fr;
    background-color: ${({theme})=>theme.bgtotal};
    .ContentSidebar {
        display: none;
    }
    .ContentMenuambur {
        display: block;
        position: absolute;
        left: 20px;
    }
    @media ${Device.tablet} {
        grid-template-columns: 65px 1fr;
        &.active {
            grid-template-columns: 220px 1fr;
        }
        .ContentSidebar {
            display: initial;
        }
        .ContentMenuambur {
            display: none;
        }
    }
    .ContentRoutes {
        grid-column: 1;
        width: 100%;
        @media ${Device.tablet} {
            grid-column: 2;
        }
    }
`;
