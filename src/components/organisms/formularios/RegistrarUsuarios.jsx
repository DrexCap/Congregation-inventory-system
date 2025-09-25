import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { v } from "../../../styles/variables";
import { Device } from "../../../styles/breackpoints";
import {
    InputText,
    Btnsave,
    useUserStore,
    useCategoriasStore,
    ConvertirCapitalize,
    ContainerSelector,
    Selector,
    TipoDocData,
    TipouserData,
    ListaModulos, BtnFiltro, ListaGenerica
} from "../../../index";

import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";

export function RegistrarUsuarios({ onClose, dataSelect, accion }) {

    const { dataEmpresa } = useEmpresaStore();
    const { insertarUsuarios, editarUsuario, mostrarPermisosEdit } = useUserStore();

    const { isLoading } = useQuery({
        queryKey: ["Mostrar permisos Edit", { id_usuario: dataSelect?.id }],
        queryFn: () => mostrarPermisosEdit({ id_usuario: dataSelect?.id }),
        enabled: dataSelect?.id != null,
        // refetchOnMount: false, // default true
        // refetchOnWindowFocus: false,
    });

    const [checkBox, setCheckBox] = useState([])
    const [tipodoc, setTipodoc] = useState({
        icono: "",
        descripcion: "Otros"
    });
    const [tipouser, setTipouser] = useState({
        icono: "",
        descripcion: "Empleado"
    });

    // Es para abrir el checklist de Marca - ListaGenerica
    const [stateTipodoc, setStateTipoDoc] = useState(false);
    // Es para abrir el checklist de Categoria - ListaGenerica
    const [stateTipoUser, setStateTipoUser] = useState(false);
    // Para editar o agregar un producto
    const [subAccion, setSubAccion] = useState("");

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    //TODO: Para sacar el espacio entre selector y el elemento padre
    const [espacioIzquieElem1, setEspacioIzquieElem1] = useState(0);
    const [espacioIzquieElem2, setEspacioIzquieElem2] = useState(0);

    async function insertar(data) {
        if (accion === "Editar") {
            const p = {
                id: dataSelect.id,
                nombres: data.nombres,
                nro_doc: data.nro_doc,
                telefono: data.telefono,
                direccion: data.direccion,
                tipo_user: tipouser.descripcion,
                tipo_doc: tipodoc.descripcion
            };
            console.log({p});
            await editarUsuario(p, checkBox, dataEmpresa.id);
            onClose();
        } else {
            const p = {
                nombres: data.nombres,
                correo: data.correo,
                nro_doc: data.nro_doc,
                telefono: data.telefono,
                direccion: data.direccion,
                tipo_user: tipouser.descripcion,
                tipo_doc: tipodoc.descripcion,
                id_empresa: dataEmpresa?.id
            };
            const parametrosAuth = {correo: data.correo, pass: data.pass};
            console.log(checkBox);
            await insertarUsuarios(parametrosAuth, p, checkBox);
            onClose();
        }
    }

    useEffect(() => {
        if (accion === "Editar") {
            setTipodoc({icono:"",descripcion:dataSelect.tipo_doc})
            setTipouser({icono:"",descripcion:dataSelect.tipo_user})
        }
    }, []);

    if (isLoading) {
        return <span>cargando...</span>;
    }
    
    return (
        <Container>
            <div className="sub-contenedor">
                <div className="headers">
                    <section>
                        <h1>
                            {accion == "Editar" ? "Editar Personal" : "Registrar nuevo personal"}
                        </h1>
                    </section>

                    <section>
                        <span onClick={onClose}>X</span>
                    </section>
                </div>

                <form className="formulario" onSubmit={handleSubmit(insertar)}>
                    <section>
                        { accion !== "Editar" ? (
                            <article>
                                <InputText icono={<v.icononombre/>}>
                                    <input
                                        className="form__field"
                                        defaultValue={dataSelect.correo}
                                        type="text"
                                        placeholder=""
                                        {...register("correo", {required: true,})}
                                    />
                                    <label className="form__label">Correo</label>
                                    {errors.correo?.type === "required" && <p>Campo requerido</p>}
                                </InputText>
                            </article>
                        ) : (
                            <span
                                className="form__field disabled"
                            >
                                {dataSelect.correo}
                            </span>
                        )}

                        {
                            accion === "Nuevo" && (
                                <article>
                                    <InputText icono={<v.icononombre/>}>
                                        <input
                                            className="form__field"
                                            defaultValue={dataSelect.pass}
                                            type="text"
                                            placeholder=""
                                            {...register("pass", {
                                                required: true,
                                                minLength: 6,
                                            })}
                                        />
                                        <label className="form__label">Contraseña</label>
                                        {errors.pass?.type === "required" && <p>Campo requerido</p>}
                                        {errors.pass?.type === "minLength" && <p>Min 6 caracteres</p>}
                                    </InputText>
                                </article>
                            )
                        }

                        <ContainerSelector>
                            <label for="Tipo_doc">T. doc:</label>
                            <Selector
                                funcion={() => setStateTipoDoc(!stateTipodoc)}
                                state={stateTipodoc}
                                color="#fc6027"
                                texto1="✅ "
                                texto2={tipodoc.descripcion}
                                setEspacioIzquieElem={setEspacioIzquieElem1}
                            />
                            {
                                stateTipodoc && (<ListaGenerica
                                    anchoListaGenerica="220px"
                                    bottom="-222px"
                                    scroll="scroll"
                                    data={TipoDocData}
                                    funcion={(p) => setTipodoc(p)}
                                    setState={() => setStateTipoDoc(!stateTipodoc)}
                                    espacioIzquieElem={espacioIzquieElem1}
                                />)
                            }
                        </ContainerSelector>

                        <article>
                            <InputText icono={<v.iconostockminimo/>}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.nro_doc}
                                    type="text"
                                    placeholder=""
                                    {...register("nro_doc", {required: true,})}
                                />
                                <label className="form__label">Número de documento</label>
                                {errors.nro_doc?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        <article>
                            <InputText icono={<v.iconostock/>}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.nombres}
                                    type="text"
                                    placeholder=""
                                    {...register("nombres", {required: true,})}
                                />
                                <label className="form__label">Nombre </label>
                                {errors.nombres?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        <article>
                            <InputText icono={<v.iconocodigobarras/>}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.telefono}
                                    type="text"
                                    placeholder=""
                                    {...register("telefono", {required: true,})}
                                />
                                <label className="form__label">Telefono</label>
                                {errors.telefono?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        <article>
                            <InputText icono={<v.iconocodigointerno/>}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.direccion}
                                    type="text"
                                    placeholder=""
                                    {...register("direccion", {required: true,})}
                                />
                                <label className="form__label">Dirección </label>
                                {errors.direccion?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>
                    </section>

                    <section>

                        <ContainerSelector>
                            <label for="marca">T. Usuario:</label>
                            <Selector
                                funcion={() => setStateTipoUser(!stateTipoUser)}
                                state={stateTipoUser}
                                color="#fc6027"
                                texto1="👷‍♂️ "
                                texto2={tipouser.descripcion}
                                setEspacioIzquieElem={setEspacioIzquieElem2}
                            />
                            {
                                stateTipoUser && (<ListaGenerica
                                    bottom="-222px"
                                    scroll="scroll"
                                    data={TipouserData}
                                    funcion={(p) => setTipouser(p)}
                                    setState={() => setStateTipoUser(!stateTipoUser)}
                                    espacioIzquieElem={espacioIzquieElem2}
                                />)
                            }
                        </ContainerSelector>

                        Permisos:🔑
                        <ListaModulos
                            accion={accion}
                            checkBox={checkBox}
                            setCheckBox={setCheckBox}
                        />
                    </section>

                    <div className="btnguardarContent">
                        <Btnsave
                            icono={<v.iconoguardar/>}
                            titulo="Guardar"
                            bgcolor="#ef552b"
                        />
                    </div>
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

    .form__field {
        font-family: inherit;
        width: 100%;
        border: none;
        border-bottom: 2px solid #9b9b9b;
        outline: 0;
        font-size: 17px;
        color: ${(props)=>props.theme.text};
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;
        &.disabled{
            color: #696969;
            background: #2d2d2d;
            border-radius:8px;
            margin-top:8px;
            border-bottom: 1px dashed #656565;
        }
    }
    
    .sub-contenedor {
        width: 100%;
        max-width: 80%;
        border-radius: 20px;
        background: ${({ theme }) => theme.bgtotal};
        box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
        padding: 30px 36px 20px 36px;
        z-index: 100;
        height: 75%;
        overflow-y: auto;
        overflow-x: hidden;
        @media ${Device.tablet} {
            width: 90%;
            max-width: 75%;
            height: 75%;
        }
        
        &::-webkit-scrollbar {
            width: 8px; /* Ancho del scrollbar */
        }
        &::-webkit-scrollbar-track {
            background: #555; /* Color de fondo de la pista */
            border-radius: 10px; /* Bordes redondeados para la pista */
        }
        &::-webkit-scrollbar-thumb {
            background: #F97316; /* Color del pulgar (gris ceniza) */
            border-radius: 10px; /* Bordes redondeados para el pulgar */
            border: 2px solid #f1f1f1; /* Espacio alrededor del pulgar */
        }
        
        .headers {
            display: flex;
            justify-content: space-between;
            align-items: center;
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
        
        .formulario {
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
            @media ${Device.tablet} {
                grid-template-columns: repeat(2, 1fr);
            }
            
            section {
                gap: 20px;
                display: flex;
                flex-direction: column;
            }
            
            .btnguardarContent {
                display: flex;
                justify-content: end;
                grid-column: 1;
                @media ${Device.tablet} {
                    grid-column: 2;
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
`;