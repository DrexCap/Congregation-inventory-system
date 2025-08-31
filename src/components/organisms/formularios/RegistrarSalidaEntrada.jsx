
import { useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
    InputText,
    Btnsave,
    useUserStore,
    useEmpresaStore,
    useKardexStore,
    Buscador,
    useProductosStore,
    ListaGenerica,
} from "../../../index";
import { useForm } from "react-hook-form";

export function RegistrarSalidaEntrada({ onClose, dataSelect, accion, tipo }) {
    const [focused, setFocused] = useState(false);
    const [stateListaProd, SetstateListaProd] = useState(false);

    const { idusuario } = useUserStore();
    const { dataProducto, productoItemSelect, selectProducto, setBuscador } = useProductosStore();

    const { insertarKardex } = useKardexStore();
    const { dataEmpresa } = useEmpresaStore();
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();

    //TODO: Para sacar el espacio entre buscador y el elemento padre
    const [espacioIzquieElem, setEspacioIzquieElem] = useState(0);

    const buscarProducto = true;

    async function insertar(data) {
        const p = {
            fecha: new Date(),
            tipo: tipo,
            id_usuario: idusuario,
            id_producto: productoItemSelect.id,
            cantidad: parseFloat(data.cantidad),
            detalle: data.detalle,
            id_empresa: dataEmpresa.id
        };
        await insertarKardex(p);
        selectProducto("");
        onClose();
    }

    return (
        <Container>
            <div className="sub-contenedor">
                <div className="headers">
                    <section>
                        <h1>{accion == "Editar" ? "Editar kardex" : "Registrar "+ tipo}</h1>
                    </section>

                    <section>
                        <span onClick={onClose}>x</span>
                    </section>
                </div>
           
                <div className="contentBuscador">
                    <div onClick={() => SetstateListaProd(!stateListaProd)}>
                        <Buscador
                            buscarProducto={buscarProducto}
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
                            data={dataProducto}
                            funcion={selectProducto}
                        />
                    )}
                </div>

                {/*TODO: OJO Cambiar el estilo para esta card */}
                <CardProducto>
                    <span style={{ color: "#1fee61", fontWeight: "bold" }}>
                        {productoItemSelect?.descripcion}
                    </span>

                    <span style={{ color: (theme) => theme.text }}>
                        stock actual: {productoItemSelect?.stock}
                    </span>
                </CardProducto>

                <form className="formulario" onSubmit={handleSubmit(insertar)}>
                    <section>
                        <article>
                            <InputText icono={<v.iconomarca />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.descripcion}
                                    type="text"
                                    placeholder=""
                                    {...register("cantidad", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Cantidad</label>
                                {errors.cantidad?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        <article>
                            <InputText icono={<v.iconomarca />}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.descripcion}
                                    type="text"
                                    placeholder=""
                                    {...register("detalle", {
                                        required: true,
                                    })}
                                />
                                <label className="form__label">Motivo</label>
                                {errors.detalle?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        <div className="btnguardarContent">
                            <Btnsave
                                icono={<v.iconoguardar />}
                                titulo="Guardar"
                                bgcolor="#ef552b"
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
                gap: 20px;
                display: flex;
                flex-direction: column;
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

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const ContainerEmojiPicker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const CardProducto = styled.section`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px dashed #54f04f;
  background-color: rgba(84, 240, 79, 0.1);
  padding: 10px;
`;