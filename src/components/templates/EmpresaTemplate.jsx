import styled from "styled-components";
import { Header, Title, BannerEmpresa } from "../../index";
import { useState } from "react";
// import vacio from "../../assets/vacio.json";

export function EmpresaTemplate() {
    const [state, setState] = useState(false);

    return (
        <Container>
            <header className="header">
                <Header
                    stateConfig={{ state: state, setState: () => setState(!state) }}
                />
            </header>
            <section className="area1">
                <ContentFiltro>
                    <Title>Tu empresa</Title>
                </ContentFiltro>
            </section>
            <section className="main">
                <BannerEmpresa/>
                {/* <Lottieanimacion
                    alto="300"
                    ancho="300"
                    animacion={vacio}
                  /> */}

            </section>
        </Container>
    );
}

const Container = styled.div`
  position: relative;
  overflow:hidden;
  height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  padding: 15px;
  grid-template:
    "header" 100px
    "area1" 100px
    "main" auto;
  .header {
    grid-area: header;
    /* background-color: rgba(103, 93, 241, 0.14); */
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    /* background-color: rgba(229, 67, 26, 0.14); */
    display: flex;
    align-items: center;
    justify-content: end;
  }
  
  .main {
    grid-area: main;
    /* background-color: rgba(179, 46, 241, 0.14); */
  }
`;

const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content:end;
  width:100%;
  gap:15px;
`;