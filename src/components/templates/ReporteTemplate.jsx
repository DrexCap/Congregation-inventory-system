
import styled from "styled-components";
import {NavLink, Outlet} from "react-router-dom";

export function ReportesTemplate() {

    return (
        <Container>
            <PageContainer >
                <Content>
                    {/* <Outlet /> Muestra componentes que estan en subrutas */}
                    <Outlet />
                </Content>

                <Sidebar >
                    <SidebarSection>
                        <SidebarTitle>Stock Actual</SidebarTitle>
                        <SidebarItem to="stock-actual-por-producto" >Por Producto</SidebarItem>
                        <SidebarItem to="stock-actual-todos" >Todos</SidebarItem>
                        <SidebarItem to="stock-bajo-minimo" >Bajo del mínimo</SidebarItem>
                    </SidebarSection>

                    <SidebarSection>
                        <SidebarTitle>
                            Entradas y Salidas
                        </SidebarTitle>
                        <SidebarItem to="kardex-entradas-salidas">
                            Por producto
                        </SidebarItem>
                    </SidebarSection>

                    <SidebarSection>
                        <SidebarTitle>
                            Valorizado
                        </SidebarTitle>
                        <SidebarItem to="inventario-valorado">
                            Inventario valorado
                        </SidebarItem>
                    </SidebarSection>
                </Sidebar>
            </PageContainer>
        </Container>
    );
}

const Content = styled.div`
    padding: 20px;
    border-radius: 8px;
    margin: 20px;
    flex: 1;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    justify-content: center;
    width: 100%;
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

const Container = styled.div`
    min-height: 100vh;
    padding: 15px;
    width: 100%;
    color: ${({ theme }) => theme.text};
    
`;

const Sidebar = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    @media (min-width: 768px) {
        width: 250px;
        order: 2;
    }
`;

const SidebarSection = styled.div`
    margin-bottom: 20px;
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.color2};
    padding: 12px;
`;

const SidebarTitle = styled.h3`
    margin-bottom: 10px;
    font-size: 1.2rem;
`;

const SidebarItem = styled(NavLink)` 
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 12px;
    text-decoration: none;
    cursor: pointer;
    padding: 0 5%;
    margin: 5px 0;
    height: 60px;
    color: ${({ theme }) => theme.text};
    &:hover {
        color: ${({ theme }) => theme.colorSubtitle};
    }
    &.active {
        background: ${({ theme }) => theme.bg6};
        border: 2px solid ${({ theme }) => theme.bg5};
        color: ${({ theme }) => theme.color1};
        font-weight: 600;
    }
`;