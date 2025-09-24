import { useState, useEffect } from "react";
import styled from "styled-components";
import { SquarePen } from "lucide-react";
import { ListaGenerica, useKardexStore, Selector, ContainerSelector, Loader } from "../../index";

export const CardDatosMovimiento = ({ value, data, itemSelect, selectItem, setDocumento }) => {
    const [fecha, setFecha] = useState("");
    const [documentoCard, setDocumentoCard] = useState("");
    const [docGenerado, setDocGenerado] = useState("");

    // TODO: Abrir y Cerrar Modales
    const [openListaDocumento, setOpenListaDocumento] = useState(true);
    const [stateDocumento, setStateDocumento] = useState(false);
    //TODO: Tema de Diseño
    const [ancho, setAncho] = useState(false);
    const [espacioIzquieElem, setEspacioIzquieElem] = useState(0);

    const { generarDocumentoMovimiento } = useKardexStore();

    function generarTitulo(tipo) {
      switch (tipo) {
        case "Merma":
          return "Registro de pérdida por merma";
        case "Devolución":
          return "Salida por devolución de productos";
        case "Producción":
          return "Salida de insumos para producción";
        case "Traslado":
          return "Movimiento de traslado entre almacenes";
        case "Consumo":
          return "Consumo interno de materiales";
        default:
          return "Movimiento de inventario";
      }
    }

    const getRandomNumber = () => {
      return Math.floor(Math.random() * (1500 - 900 + 1)) + 900;
    };

    const fakeRequest = (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({data});
        }, getRandomNumber()); // 2 segundos
      });
    };

    const generarDocumento = async() => {
      const doc = await generarDocumentoMovimiento({tipo_movimiento: value});
      setDocGenerado(doc);
      const {data} = await fakeRequest(doc);

      setDocumento(data); //TODO: Guarda el documento para RegistrarSalidaEntrada
      selectItem(data); // TODO: Guarda en el store el documento generado
      if (value === "Producción") {
        setDocumentoCard(data); //TODO: Guarda el documento generado en la CardDatosMovimientos
        setDocumento(data);
      }
      // setStateDocumento(!stateDocumento) // 1ra vez Muestra la ListaGenerica
      // setOpenListaDocumento(!openListaDocumento) // 1ra vez no muestra el componente (ListaGenerica y el Selector)
    }

    useEffect(() => {
      if(value !== "Producción") {
        generarDocumento();
      }
      const ahora = new Date();
      const dia = ahora.getDate().toString().padStart(2, "0");
      const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
      const anio = ahora.getFullYear();
      setFecha(`${dia}/${mes}/${anio}`);
    }, [value]);

    return (
        <CardDatosMovimientoOverlay>
            <CardDatosMovimientoContainer>
              <Header>
                <div>
                  <Title>{generarTitulo(value)}</Title>
                </div>
              </Header>

              {/* Detalle del Movimiento */}
              <Card>
                <SectionTitle>Detalle del Movimiento</SectionTitle>
                <Row>
                  <Label>Fecha de apartado: </Label>
                  <Value>{fecha}</Value>
                </Row>

                { value !== "Producción" ? (
                    <Row>
                      <Label>Documento de movimiento: </Label>
                        { itemSelect!==docGenerado ? (
                          <LoaderWrapper size="100px">
                            <Loader size="20px" />
                          </LoaderWrapper>
                        ) : (
                          <Value>{itemSelect}</Value>
                        )}
                    </Row>
                  ) : openListaDocumento ? (
                    <Row>
                      {/* <ContainerSelector> */}
                            <Label>Documento: </Label>
                            <Selector
                                funcion={() => setStateDocumento(!stateDocumento)}
                                state={stateDocumento}
                                // ancho={true}
                                setAncho={setAncho}
                                color="#fc6027"
                                texto1="✅ "
                                texto2={itemSelect?.documento || "Generar Doc."}
                                setEspacioIzquieElem={setEspacioIzquieElem}
                            />
                            {
                                stateDocumento && (<ListaGenerica
                                    bottom="-200px"
                                    anchoSelector={ancho}
                                    scroll="scroll"
                                    data={data}
                                    setState={() => {
                                      setStateDocumento(!stateDocumento)
                                      setOpenListaDocumento(!openListaDocumento)
                                    }}
                                    funcion={selectItem}
                                    espacioIzquieElem={espacioIzquieElem}
                                    generarDocumento={generarDocumento}
                                />)
                            }
                      {/* </ContainerSelector> */}
                    </Row>
                  ) : (
                    <Row>
                      <Label>Documento de movimiento: </Label>
                        { documentoCard!==docGenerado ? (
                          <LoaderWrapper size="100px">
                            <Loader size="20px" />
                          </LoaderWrapper>
                        ) : (
                          <Value >{documentoCard}</Value>
                        )}
                      <SquarePen  
                        size={19} 
                        color="red"
                        style={{ cursor: "pointer" }} 
                        onClick={() => setOpenListaDocumento(!openListaDocumento)} 
                      />
                    </Row>
                  )
                }
              </Card>
            </CardDatosMovimientoContainer>
        </CardDatosMovimientoOverlay>
    )
}

const CardDatosMovimientoOverlay = styled.div`
    /* width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-bottom: 1px solid #f0f0f0; */

    gap: 15px;
    position: relative;

    transition: 0.5s;
    /* position: fixed; */
    top: 0;
    left: 0;
    width: 100%;
    /* height: 100%; */
    /* background: rgba(0,0,0,0.4); */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
`
const CardDatosMovimientoContainer = styled.div`
    /* width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border-bottom: 1px solid #f0f0f0; */

    background: #fff;
    border-radius: 12px;
    padding: 20px;
    width: 600px;
    max-width: 100%;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`

// ==== Estilos internos del modal ====
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 700;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const Card = styled.div`
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 16px;
  margin: 12px 0;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
  align-items: center;
`;

const Label = styled.span`
  font-weight: 500;
  color: #333;
  font-size: 15px;
`;

const Value = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: ${(props) => props.color || "#000"};
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.size || "20px"};
  /* height: ${(props) => props.size || "20px"}; */
  height: 20px;
  overflow: hidden; // 🔑 para que no se salga
`;
