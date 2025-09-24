import {useState} from "react";
import styled from "styled-components";
import {Header} from "../organisms/Header.jsx";
import vacio from "../../assets/vacio.json";

import {
    BtnFiltro,
    Buscador,
    ContentFiltro,
    RegistrarProductos,
    TablaProducto,
    Lottieanimacion,
    Title,
    useProductosStore,
    v
} from "../../index";

export function ProductoTemplate({data}) {
    // Para abrir y cerrar el menu desplegable del Header
    const [state, setState] = useState(false);
    // Para ver el registro de producto seleccionado a partir de la tabla
    const [dataSelect, setDataSelect] = useState([]);
    // Para editar o agregar un producto, de acuedo al valor del estado que le den
    const [accion, setAccion] = useState("");
    // Para abrir y cerrar el modal registro de productos
    const [openRegistro, setOpenRegistro] = useState(false);

    const nuevoRegistro = () => {
        setOpenRegistro(!openRegistro);
        setAccion("nuevo");
        setDataSelect([]);
    }

    const { setBuscador } = useProductosStore();

    return (
        <Container>
            {
                openRegistro && <RegistrarProductos
                    dataSelect={dataSelect}
                    accion={accion}
                    onClose={()=>setOpenRegistro(!openRegistro)}
                />
            }

            <header className="header">
                <Header
                    stateConfig={{state: state, setState: ()=>setState(!state)}}
                />
            </header>

            <section className="area1">
                <ContentFiltro >
                    <Title>Productos</Title>
                    <BtnFiltro
                        funcion={nuevoRegistro}
                        bgcolor="#f6f3f3"
                        textcolor="#353535"
                        icono={<v.agregar />}
                    />
                </ContentFiltro>
            </section>

            <section className="area2">
                <Buscador buscarProducto={true} setBuscador={setBuscador}/>
            </section>

            <section className="main">
                {data?.length == 0 && (
                    <Lottieanimacion
                        alto="300"
                        ancho="300"
                        animacion={vacio}
                    />
                )}

                <TablaProducto
                    data={data}
                    setOpenRegistro={setOpenRegistro}
                    setDataSelect={setDataSelect}
                    setAccion={setAccion}
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

