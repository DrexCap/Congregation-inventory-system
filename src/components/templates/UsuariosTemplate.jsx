import {useState} from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {Header} from "../organisms/Header.jsx";
import vacio from "../../assets/vacio.json";
import {
    BtnFiltro,
    Buscador,
    ContentFiltro,
    RegistrarUsuarios,
    Lottieanimacion,
    TablaUsuarios, Title, useUserStore, v
} from "../../index";

export function UsuariosTemplate({data}) {
    const [state, setState] = useState(false);
    const [dataSelect, setDataSelect] = useState([]);
    const [accion, setAccion] = useState("");
    const [openRegistro, setOpenRegistro] = useState(false);

    // Controlar la animacion del Header
    const [headerAct, setHeader] = useState(true);

    const nuevoRegistro = () => {
        setOpenRegistro(!openRegistro);
        setAccion("Nuevo");
        setDataSelect([]);
        setHeader(false);
    }

    const { setBuscador } = useUserStore();

    const[nombreRegistro,setNombreRegistro] = useState("");

    return (
        <Container>
            {
                openRegistro && <RegistrarUsuarios
                    dataSelect={dataSelect}
                    accion={accion}
                    setNombreRegistro={setNombreRegistro}
                    onClose={()=>{
                        setOpenRegistro(!openRegistro)
                        setHeader(true);
                    }}
                />
            }
            <header className="header">
                <AnimatePresence mode="wait">
                    {
                        headerAct ? (
                            <motion.div
                                key="card-stock"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.15 }}
                                className="rounded-xl shadow-md p-4 bg-white"
                            >
                                <Header 
                                    nombreRegistro={nombreRegistro}
                                    stateConfig={{ state, setState: ()=>setState(!state) }} 
                                />
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
                        )
                    }
                </AnimatePresence>
            </header>

            <section className="area1">
                <ContentFiltro >
                    <Title>Personal</Title>
                    <BtnFiltro
                        funcion={nuevoRegistro}
                        bgcolor="#f6f3f3"
                        textcolor="#353535"
                        icono={<v.agregar />}
                    />
                </ContentFiltro>
            </section>

            <section className="area2">
                <Buscador setBuscador={setBuscador}/>
            </section>
            
            <section className="main">
                {data.length == 0 && (
                    <Lottieanimacion
                        alto="300"
                        ancho="300"
                        animacion={vacio}
                    />
                )}

                <TablaUsuarios
                    data={data}
                    setOpenRegistro={setOpenRegistro}
                    setDataSelect={setDataSelect}
                    setAccion={setAccion}
                    setHeader={setHeader}
                />
            </section>
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    background-color: ${({theme})=>theme.bgtotal};
    color: ${({theme})=>theme.text};
    width: 100%;
    display: grid;
    padding: 15px;
    grid-template: 
        "header" 100px
        "area1"  100px
        "area2"  100px
        "main"  auto
    ;
    .header {
        grid-area: header;
        justify-content: end;
        //background-color: rgba(103, 93, 241, 0.14);
        display: flex;
        align-items: center;
    }
    .area1 {
        grid-area: area1;
        //background-color: rgba(229, 67, 26, 0.14);
        display: flex;
        align-items: center;
    }
    .area2 {
        grid-area: area2;
        //background-color: rgba(77, 237, 106, 0.14);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .main {
        grid-area: main;
        //background-color: rgba(179, 46, 241, 0.14);
        //display: flex;
        align-items: top;
    }
`

