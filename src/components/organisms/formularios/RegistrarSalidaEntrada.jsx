import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {useQuery} from "@tanstack/react-query";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btnsave,
  useUserStore,
  useEmpresaStore,
  useKardexStore,
  Buscador,
  Selector,
  useProductosStore,
  useTipoSalidaStore,
  ContainerSelector2,
  ListaGenerica,
  CardDatosMovimiento,
} from "../../../index";
import { Controller, useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { SquareX } from "../../../components/animate-ui/icons/square-x";

export function RegistrarSalidaEntrada({ onClose, dataSelect, accion, tipo }) {
    const [focused, setFocused] = useState(false);
    const [anchoSelectorBus, setAnchoSelectorBus] = useState(0);
    const [stateListaProd, SetstateListaProd] = useState(false);
    const [stateTipoSalida, setStateTipoSalida] = useState(false);
    const [documento, setDocumento] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // TODO: Para ver si se activo el scroll
    const contenedorRef = useRef(null);
    const [tieneScroll, setTieneScroll] = useState(false);

    const { idusuario } = useUserStore();
    const { dataTipoSalida, selectTipoSalida, tipoSalidaItemSelect } = useTipoSalidaStore();
    const { dataProducto, productoItemSelect, selectProducto, 
        setBuscador, buscarProducto, buscador } = useProductosStore();
    const { dataEmpresa } = useEmpresaStore();
    const { generarDocumentoMovimiento } = useKardexStore();

    const {
        insertarKardex,
        dataDocumentosCaratula,
        documentosCaratulaItemSelect,
        selectDocumentoCaratula,
    } = useKardexStore();

    useEffect(() => {
        // Esto es para desactivar el scroll de la home cuando se habre la ventala de registro
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto"; // restaurar al cerrar
        };
    }, []);

    function toggleTipoSalida() {
        setStateTipoSalida(!stateTipoSalida);
        setTimeout(() => {
            if (contenedorRef.current) {
                const { scrollHeight, clientHeight } = contenedorRef.current;
                setTieneScroll(scrollHeight > clientHeight);
            }
        }, 0);
    }

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();

    //TODO: Para sacar el espacio entre buscador y el elemento padre
    const [espacioIzquieElem, setEspacioIzquieElem] = useState(0);
    const [espacioIzquieElem1, setEspacioIzquieElem1] = useState(0);
    const [ancho, setAncho] = useState(0);

    async function insertar(data) {
        setLoading(true); // 🔒 desactiva botón
        try {
            let stockResultante = 0;
            let doc = "";
            if (tipo === "salida") {
                stockResultante = productoItemSelect.stock - parseFloat(data.cantidad);
            } else {
                stockResultante = productoItemSelect.stock + parseFloat(data.cantidad);
            }
            if (tipo === "entrada") {
                doc = await generarDocumentoMovimiento({ tipo_movimiento: "Insumo" });
            }
            const p = {
                fecha: new Date(),
                tipo: tipo,
                id_usuario: idusuario,
                id_producto: productoItemSelect.id,
                cantidad: parseFloat(data.cantidad),
                detalle: data.detalle,
                id_empresa: dataEmpresa.id,
                stock_resultante: stockResultante,
                documento: tipo === "entrada" ? doc : documento,
                id_tipo_salida: tipo === "entrada" ? 8 : tipoSalidaItemSelect?.id,
            };
            console.log("parametros Kardex", { p });

            await insertarKardex(p);

            setSuccess(true);
            
            setTimeout(() => {
                setSuccess(false);
                selectProducto("");
                onClose();  // 🔥 cierra después de mostrar "Guardado!"
            }, 1600);
            
        } catch (error) {
            console.error("Error al insertar", error);
        } finally {
            setLoading(false); // 🔓 vuelve a habilitar
        }
    }

    const {data: buscarData} = useQuery({
        queryKey: ["Buscar producto ", {
                _id_empresa: dataEmpresa.id,
                buscador: buscador
            }],
        queryFn: () => buscarProducto({
            _id_empresa: dataEmpresa.id,
            buscador: buscador
        }),
        enabled: dataEmpresa?.id!=null,
    });

    return (
        <Container>
            <div className="sub-contenedor">
                
                <div className="headers">
                    <section>
                        <h1>{accion == "Editar" ? "Editar kardex" : "Registrar " + tipo}</h1>
                    </section>

                    <section>
                        <span onClick={onClose}>
                            <SquareX size={28} animateOnHover />
                        </span>
                    </section>
                </div>            

                <form className="formulario" onSubmit={handleSubmit(insertar)}>
                    <section ref={contenedorRef} className="contenedor-formulario">
                        <div className="contentBuscador">
                            {/* ✅ VALIDAR PRODUCTO */}
                            <Controller
                                name="producto"
                                control={control}
                                rules={{ required: "Debes seleccionar un producto" }}
                                render={({ field }) => (
                                    <>
                                        <div onClick={() => SetstateListaProd(!stateListaProd)}>
                                            <Buscador
                                                setAnchoSelector={setAnchoSelectorBus}
                                                buscarProducto={true}
                                                setBuscador={setBuscador}
                                                setEspacioIzquieElem={setEspacioIzquieElem}
                                                onFocus={() => setFocused(true)}
                                            />
                                        </div>

                                        {stateListaProd && (
                                            <ListaGenerica
                                                bottom="-220px"
                                                scroll="scroll"
                                                espacioIzquieElem={espacioIzquieElem}
                                                anchoListaGenerica={anchoSelectorBus+'px'}
                                                setState={() => SetstateListaProd(!stateListaProd)}
                                                data={buscarData ?? []}
                                                funcion={(p) => {
                                                    selectProducto(p);      // tu store
                                                    setBuscador("");        // limpias buscador
                                                    field.onChange(p.id);   // ✅ sincronizas con RHF
                                                }}
                                            />
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        {errors.producto && (
                            <p style={{ color: "#f46943", fontSize: "14px", marginTop: "5px" }}>
                                ⚠️ {errors.producto.message}
                            </p>
                        )}

                        {/*TODO: OJO Cambiar el estilo para esta card */}
                        <CardProducto $tipo={tipo}>
                            { 
                                productoItemSelect?.descripcion &&
                                <span
                                    style={{
                                        color: tipo === "entrada" ? "#1fee61" : "#f04f4f",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {productoItemSelect?.descripcion}
                                </span>
                            }

                            <span style={{ color: (theme) => theme.text, fontWeight: 450 }}>
                                Stock Actual: {productoItemSelect?.stock}
                            </span>
                        </CardProducto>

                        {tipo === "salida" && (
                            <ContainerSelector2>
                                <label for="marca">Tipo de Salida: </label>
                                <Controller 
                                    name="tipoSalida"
                                    control={control}
                                    rules={{ required: "Debes seleccionar el tipo de salida" }}
                                    render={({ field }) => (
                                        <>
                                            <Selector
                                                funcion={toggleTipoSalida}
                                                state={stateTipoSalida}
                                                ancho={true}
                                                setAncho={setAncho}
                                                color="#fc6027"
                                                texto1="✅ "
                                                texto2={tipoSalidaItemSelect?.movimiento}
                                                setEspacioIzquieElem={setEspacioIzquieElem1}
                                            />

                                            {stateTipoSalida && (
                                                <ListaGenerica
                                                    bottom="-220px"
                                                    anchoSelector={
                                                        tieneScroll?ancho-6:ancho
                                                    }
                                                    scroll="scroll"
                                                    data={dataTipoSalida}
                                                    setState={() => setStateTipoSalida(!stateTipoSalida)}
                                                    funcion={(item) => {
                                                        selectTipoSalida(item);
                                                        // sincronizar con RHF
                                                        field.onChange(item.id);
                                                    }}
                                                    espacioIzquieElem={espacioIzquieElem1}
                                                />
                                            )}
                                        </>
                                    )}
                                />
                            </ContainerSelector2>
                        )}
                        {(errors.tipoSalida) && (
                            <p style={{ color: "#f46943", fontSize: "14px", 
                                marginTop: "3px", marginBottom: "5px" }}>
                                ⚠️ {errors.tipoSalida.message}
                            </p>
                        )}

                        <AnimatePresence>
                            {tipoSalidaItemSelect?.movimiento !== "Elegir" && (
                                <motion.div
                                    key="card-datos-mov"
                                    initial={{ opacity: 0, y: 15, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -15, scale: 0.97 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <CardDatosMovimiento
                                        data={dataDocumentosCaratula}
                                        itemSelect={documentosCaratulaItemSelect}
                                        selectItem={selectDocumentoCaratula}
                                        value={tipoSalidaItemSelect?.movimiento}
                                        setDocumento={setDocumento}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <article>
                            <InputText icono={<v.iconoNumero />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.descripcion}
                                    type="number"
                                    placeholder=""
                                    {...register("cantidad", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Cantidad</label>
                                { errors.cantidad?.type === "required" && 
                                    <p style={{fontSize: "14px"}}>
                                        Campo requerido
                                    </p>
                                }
                            </InputText>
                        </article>

                        <article>
                            <InputText icono={<v.iconoTextArea />} >
                                <textarea
                                    className="form__fielda"
                                    type="text"
                                    placeholder="Escribe el detalle aquí"
                                    {...register("detalle", { 
                                        required: true 
                                    })}
                                />
                                { errors.detalle?.type === "required" && 
                                    <p style={{fontSize: "14px"}}>
                                        Campo requerido
                                    </p>
                                }
                            </InputText>
                        </article>
                    </section>

                    <div className="btnguardarContent">
                        <Btnsave
                            icono="Enviar"
                            titulo="Enviar"
                            bgcolor="#ef552b"
                            loading={loading}
                            errors={errors}
                            success={success}
                        />
                    </div>
                </form>
            </div>
        </Container>
    );
}

const Container = styled.div`
  /* transition: 0.5s; */
  /* padding-right: 6px; */
  top: 0;
  left: 0;
  /* position: sticky; */
  position: fixed;
  /* background-color: rgba(10, 9, 9, 0.5); */
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {

    width: 520px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -5px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }

    .contentBuscador {
      position: relative;
    }

    .formulario {
        display: flex;
        flex-direction: column;
        max-height: 85vh;

        section {
            /* flex: 1; */
            gap: 4px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            overflow-x: hidden;
            padding-right: 6px;

            textarea::placeholder {
                font-size: 17px;
            }

            textarea:focus::placeholder {
                color: #8B8C8D; /* cambia el color al hacer focus */
                font-weight: 500;
            }
        }

        section::-webkit-scrollbar {
            width: 8px; /* Ancho del scrollbar */
        }

        section::-webkit-scrollbar-track {
            background: #555; /* Color de fondo de la pista */
            border-radius: 10px; /* Bordes redondeados para la pista */
        }

        section::-webkit-scrollbar-thumb {
            background: #f97316; /* Color del pulgar (gris ceniza) */
            border-radius: 8px; /* Bordes redondeados para el pulgar */
            border: 2px solid #f1f1f1; /* Espacio alrededor del pulgar */
        }

        section > * {
            flex-shrink: 0;  /* 🚀 evita que hijos como CardProducto se aplasten */
        }

        .btnguardarContent {
            display: flex;
            justify-content: flex-end; /* 🚀 botón pegado a la derecha */
            margin-top: 8px; 
            padding-top: 8px;
        }
    }
  }
`;

const CardProducto = styled.section`
  margin-top: 9px;
  align-item: center;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px dashed
    ${(props) => (props.$tipo === "entrada" ? "#54f04f" : "#f04f4f")};
  background-color: ${(props) =>
    props.$tipo === "entrada"
      ? "rgba(84, 240, 79, 0.1)"
      : "rgba(239, 56, 56, 0.1)"};
  padding: 10px;
`;

