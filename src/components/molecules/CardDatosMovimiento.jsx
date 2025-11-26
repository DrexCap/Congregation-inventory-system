import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { SquarePen } from "lucide-react";
import { DatePicker, Space, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { SquareX } from "../../components/animate-ui/icons/square-x";
import { ListaGenerica, useKardexStore, useEmpresaStore, Selector, 
  ContainerSelector, Loader, useTipoSalidaStore } from "../../index";

export const CardDatosMovimiento = ({ value, data, itemSelect, selectItem, 
                        setDocumento, setFechaProgram, producto, setCardDatosMovi, setTituloCardMovimientos, resetField,
                        setRegistroLote }) => {

    const [fecha, setFecha] = useState("");
    const [colorDoc, setColorDoc] = useState("#6B7280");
    const [documentoCard, setDocumentoCard] = useState("");
    const [docGenerado, setDocGenerado] = useState("");
    const [lote, setLote] = useState("");

    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;

    const disabledDate = current => {
      // No se pueden seleccionar días anteriores a hoy y hoy
      return current && current < dayjs().startOf('day');
    };

    // TODO: Abrir y Cerrar Modales
    const [openListaDocumento, setOpenListaDocumento] = useState(true);
    const [stateDocumento, setStateDocumento] = useState(false);
    //TODO: Tema de Diseño
    const [ancho, setAncho] = useState(false);
    const [espacioIzquieElem, setEspacioIzquieElem] = useState(0);

    const { mostrarTipoSalida } = useTipoSalidaStore();
    const { generarDocumentoMovimiento, generarCodigoLote } = useKardexStore();
    const { dataEmpresa } = useEmpresaStore();

    const coloresSalida = {
      Merma: "#EF4444",       // rojo
      Devolución: "#3B82F6",  // azul
      Producción: "#10B981",  // verde
      Traslado: "#F59E0B",    // ámbar
      Consumo: "#8B5CF6",     // violeta
    };

    function getColorSalida() {
      return coloresSalida[value] || "#6B7280"; // gris por defecto
    }

    function generarTitulo(tipo) {
      switch (tipo) {
        case "Merma":
          setTituloCardMovimientos("Registro de Pérdida por Merma");
          return "Registro de Pérdida por Merma";
        case "Devolución":
          setTituloCardMovimientos("Salida por Devolución de Productos");
          return "Salida por Devolución de Productos";
        case "Producción":
          setTituloCardMovimientos("Salida de Insumos para Producción");
          return "Salida de Insumos para Producción";
        case "Traslado":
          setTituloCardMovimientos("Movimiento de Traslado entre Oficinas");
          return "Movimiento de Traslado entre Oficinas";
        case "Consumo":
          setTituloCardMovimientos("Consumo Interno de Materiales");
          return "Consumo Interno de Materiales";
        default:
          return "Movimiento de Inventario";
      }
    }

    const getRandomNumber = () => {
      return Math.floor(Math.random() * (1500 - 900 + 1)) + 900;
    };

    const fakeRequest = (data, getColorSalida) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (["H-", "P-", "C-"].includes(data.substring(0, 2))) {
            resolve({ data });
          } else {
            const color = getColorSalida(); 
            resolve({ data, color });
          }
        }, getRandomNumber()); // 
      });
    };

    const generarDocumento = async() => {
      const doc = await generarDocumentoMovimiento({tipo_movimiento: value, _id_empresa: dataEmpresa?.id});
      setDocGenerado(doc);
      const { data, color } = await fakeRequest(doc, () => getColorSalida(value));
      setColorDoc(color);

      setDocumento(data); //TODO: Guarda el documento para RegistrarSalidaEntrada
      selectItem(data); // TODO: Guarda en el store el documento generado
      if (value === "Producción") {
        setDocumentoCard(data); //TODO: Guarda el documento generado en la CardDatosMovimientos
        // setDocumento(data);
      }
    }

    const generarLote = async() => {
      const lote = await generarCodigoLote({_nombre_producto: producto, _id_empresa: dataEmpresa?.id});
      setRegistroLote(lote);
      const { data } = await fakeRequest(lote, null);
      setLote(data);
    }

    useEffect(() => {
      console.log("COLOR MOVIMIENTO",getColorSalida());
      
      if(value !== "Producción") {
        generarDocumento();        
      } 
      generarLote();
      
      const ahora = new Date();
      const dia = ahora.getDate().toString().padStart(2, "0");
      const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
      const anio = ahora.getFullYear();
      setFecha(`${dia}/${mes}/${anio}`);
    }, [value]);

    const onChange = (date, dateString) => {
      console.log({dateString});
      setFechaProgram({
        fecha_inicio: dateString[0],
        fecha_fin: dateString[1],
      });
    };

    const handleCloseModal = async (e) => {
      e.preventDefault();
      setCardDatosMovi(false);
      await mostrarTipoSalida();
      resetField('tipoSalida');
      resetField('cantidad'); 
      resetField('detalle'); 
    }

    return (
        <CardDatosMovimientoOverlay>
            <CardDatosMovimientoContainer>
              <Header>
                <div>
                  <Title>{generarTitulo(value)}</Title>
                </div>
                <CloseButton type="button" onClick={handleCloseModal}>
                  <SquareX size={30} animateOnHover />
                </CloseButton>
              </Header>

              {/* Detalle del Movimiento */}
              <Card>
                <SectionTitle>Detalle del Movimiento</SectionTitle>
                <Row>
                  <Label>Fecha de apartado: </Label>
                  <Value>{fecha}</Value>
                </Row>
                {
                  ["hoja", "hojas", "papel", "papeles", "caratulas"].includes(producto?.toLowerCase()) && (
                    <Row>
                      <Label>Lote de {producto}: </Label>
                      { lote=="" ? (
                          <LoaderWrapper size="100px">
                            <Loader size="20px" />
                          </LoaderWrapper>
                        ) : (
                          <Value >
                            {lote}
                          </Value>
                        )}
                    </Row>
                  )
                }
                <Row2>
                  <Label style={{ marginRight: 16 }}>Programación: </Label>
                  <Value>
                    <ConfigProvider
                      theme={{
                        components: {
                          DatePicker: {
                            activeBorderColor: "#FC6027",
                            lineWidthBold: 3,
                            lineWidth: 2,
                          },
                        },
                      }}
                    >
                      <RangePicker status="warning" disabledDate={disabledDate} onChange={onChange} />
                    </ConfigProvider>
                  </Value>
                </Row2>
                { value !== "Producción" ? (
                    <Row>
                      <Label>Documento de movimiento: </Label>
                        { itemSelect!==docGenerado ? (
                          <LoaderWrapper size="100px">
                            <Loader size="20px" />
                          </LoaderWrapper>
                        ) : (
                          <Value $color={colorDoc} >
                            {itemSelect}
                          </Value>
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
                                fuente={14}
                                texto1="✅ "
                                texto2={itemSelect?.documento || "Generar Doc."}
                                setEspacioIzquieElem={setEspacioIzquieElem}
                            />
                            {
                                stateDocumento && (<ListaGenerica
                                    fuente={14}
                                    bottom="-165px"
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
                          <Value $color={colorDoc}>
                            {documentoCard}
                          </Value>
                        )}
                        <motion.div
                          whileHover={{ scale: 1.2, y: -1 }}
                          whileTap={{ scale: 0.9, y: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <SquarePen  
                            size={18} 
                            color="#f97316"
                            style={{ cursor: "pointer" }} 
                            onClick={() => setOpenListaDocumento(!openListaDocumento)} 
                          />
                        </motion.div>
                    </Row>
                  )
                }
              </Card>
            </CardDatosMovimientoContainer>
        </CardDatosMovimientoOverlay>
    )
}

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

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
    right: 0;
    width: 100%;
    /* height: 100%; */
    /* background: rgba(0,0,0,0.4); */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
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
    border-radius: 15px;
    padding: 20px;
    width: 600px;
    max-width: 100%;
    box-shadow: 4px 4px 15px rgba(0,0,0,0.2);
`

// ==== Estilos internos del modal ====
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-bottom: 15px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
  align-items: center;
`;

const Row2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0 13px 0;
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
  color: ${(props) => props.$color || "#000"};
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
