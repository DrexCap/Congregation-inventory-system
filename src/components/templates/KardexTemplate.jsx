import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { PackagePlus, PackageMinus } from "lucide-react"
import { Header } from "../organisms/Header.jsx";
import {
    Buscador, ContentFiltro, Btnsave, RegistrarSalidaEntrada, 
    useKardexStore, Title, v, Tabs, useProductosStore, 
    useTipoSalidaStore, CardStock, useLocalStorage  } from "../../index";

export function KardexTemplate({data}) {
    
    const [tab, setTab] = useState("");
    const [state, setState] = useState(false);
    const [openRegistro, SetopenRegistro] = useState(false);
    const [accion, setAccion] = useState("");
    const [dataSelect, setdataSelect] = useState([]);
    const [tipo, setTipo] = useState("");
    
    const {setBuscador} = useKardexStore();
    const { selectProducto } = useProductosStore();

    const { mostrarTipoSalida } = useTipoSalidaStore();

    function cerrarRegistro() {
        SetopenRegistro(!openRegistro);
        selectProducto("");
        mostrarTipoSalida();
        
        setRefreshFlag(true);
    }

    function nuevaEntrada() {
        SetopenRegistro(true);
        setTipo("entrada");
    }

    function nuevaSalida() {
        SetopenRegistro(true);
        setTipo("salida");
    }

    const [refreshFlag, setRefreshFlag] = useLocalStorage("carStock", false);

    return (
        <Container >

            <AnimatePresence>
                { openRegistro && (
                    <ModalWrapper
                        key="registro-form"
                        initial={{ opacity: 0, y: -35 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -35 }} // igual que initial
                        transition={{ duration: 0.36, ease: "easeInOut" }}
                    >
                        <RegistrarSalidaEntrada
                            tipo={tipo}
                            dataSelect={dataSelect}
                            onClose={cerrarRegistro}
                            accion={accion}
                            setRefreshFlag={setRefreshFlag}
                        />
                    </ModalWrapper>
                )}
            </AnimatePresence>

            <header className="header">
                <Header
                    stateConfig={{ state: state, setState: () => setState(!state) }}
                />
            </header>

            <section className="area1">
                <ContentFiltro>
                    <Title>
                        Kardex
                    </Title>
                    <Btnsave
                        icono={<PackagePlus />}
                        titulo="Entrada"
                        bgcolor="#52de65"
                        funcion={nuevaEntrada}
                    />
                    <Btnsave
                        icono={<PackageMinus />}
                        titulo="Salida"
                        bgcolor="#fb6661"
                        funcion={nuevaSalida}
                    />
                </ContentFiltro>
            </section>

            <section className="area2">
                <div style={{width: "310px"}}></ div>

                <Buscador buscarProducto={true} setBuscador={setBuscador} />

                <AnimatePresence mode="wait">
                    {refreshFlag ? (
                        <motion.div
                            key="card-stock"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="rounded-xl shadow-md p-4 bg-white"
                        >
                            <CardStock tab={tab} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ width: "310px", height: "100px" }}
                        />
                    )}
                </AnimatePresence>     
            </section>

            <section className="main">
                <Tabs data={data} setTab={setTab} setRefreshFlag={setRefreshFlag} />
            </section>
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    padding: 15px;
    width: 100%;
    background: ${({ theme }) => theme.bgtotal};
    color: ${({ theme }) => theme.text};
    display: grid;
    grid-template:
    "header" 50px
    "area1" 80px
    "area2" 85px
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
    }
    
    .area2 {
        grid-area: area2;
        /* background-color: rgba(77, 237, 106, 0.14); */
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .main {
        margin-top:20px;
        grid-area: main;
        /* background-color: rgba(179, 46, 241, 0.14); */
    }
`;

const ModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  /* background: rgba(0, 0, 0, 0.4); // opcional: fondo semitransparente */
`;