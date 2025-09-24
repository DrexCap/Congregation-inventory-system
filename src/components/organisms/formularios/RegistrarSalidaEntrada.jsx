import { useState, useEffect } from "react";
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
  ContainerSelector,
  ListaGenerica,
  CardDatosMovimiento,
} from "../../../index";
import { Controller, useForm } from "react-hook-form";
import { SquareX } from "../../../components/animate-ui/icons/square-x";

export function RegistrarSalidaEntrada({ onClose, dataSelect, accion, tipo }) {
    const [focused, setFocused] = useState(false);
    const [stateListaProd, SetstateListaProd] = useState(false);
    const [stateTipoSalida, setStateTipoSalida] = useState(false);
    const [documento, setDocumento] = useState("");

    const [loading, setLoading] = useState(false);

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
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto"; // restaurar al cerrar
        };
    }, []);

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
                doc = await generarDocumentoMovimiento({tipo_movimiento: "Insumo"});
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
            console.log("parametros Kardex",{p});
            
            await insertarKardex(p);
            selectProducto("");
            onClose();
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
            enabled: dataEmpresa?.id!=null
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
                                        buscarProducto={true}
                                        setBuscador={setBuscador}
                                        setEspacioIzquieElem={setEspacioIzquieElem}
                                        onFocus={() => setFocused(true)}
                                    />
                                </div>

                                {stateListaProd && (
                                    <ListaGenerica
                                        bottom="-250px"
                                        scroll="scroll"
                                        espacioIzquieElem={espacioIzquieElem}
                                        anchoListaGenerica="430px"
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
                    <span
                        style={{
                            color: tipo === "entrada" ? "#1fee61" : "#f04f4f",
                            fontWeight: "bold",
                        }}
                    >
                        {productoItemSelect?.descripcion}
                    </span>

                    <span style={{ color: (theme) => theme.text }}>
                        Stock Actual: {productoItemSelect?.stock}
                    </span>
                </CardProducto>

                <form className="formulario" onSubmit={handleSubmit(insertar)}>
                    <section>
                        {tipo === "salida" && (
                            <ContainerSelector>
                                <label for="marca">Tipo de Salida: </label>
                                <Controller 
                                    name="tipoSalida"
                                    control={control}
                                    rules={{ required: "Debes seleccionar el tipo de salida" }}
                                    render={({ field }) => (
                                        <>
                                            <Selector
                                                funcion={() => {
                                                    setStateTipoSalida(!stateTipoSalida)
                                                }}
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
                                                    bottom="-260px"
                                                    anchoSelector={ancho}
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
                            </ContainerSelector>
                        )}
                        {(errors.tipoSalida) && (
                            <p style={{ color: "#f46943", fontSize: "14px", marginTop: "5px" }}>
                                ⚠️ {errors.tipoSalida.message}
                            </p>
                        )}

                        {tipoSalidaItemSelect?.movimiento !== "Elegir" && (
                            <CardDatosMovimiento
                                data={dataDocumentosCaratula}
                                itemSelect={documentosCaratulaItemSelect}
                                selectItem={selectDocumentoCaratula}
                                value={tipoSalidaItemSelect?.movimiento}
                                setDocumento={setDocumento}
                            />
                        )}

                        <article>
                            <InputText icono={<v.iconoNumero />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.descripcion}
                                    type="number"
                                    step="1"
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

                        <div className="btnguardarContent">
                            <Btnsave
                                icono={<v.iconoguardar />}
                                titulo="Guardar"
                                bgcolor="#ef552b"
                                loading={loading}
                                errors={errors}
                            />
                        </div>
                    </section>
                </form>
            </div>
        </Container>
    );
}

const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
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
      section {
        gap: 10px;
        display: flex;
        flex-direction: column;

        .btnguardarContent {
            align-self: flex-end;
            margin-top: 10px; /* 🚀 botón a la derecha */
        }

        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;

const CardProducto = styled.section`
  margin-top: 10px;
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
