import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { Device } from "../../../styles/breackpoints";
import {
    InputText,
    Btnsave,
    useProductosStore,
    useCategoriasStore,
    ConvertirCapitalize,
    ContainerSelector,
    Selector,
    useMarcaStore, BtnFiltro, RegistrarMarca, ListaGenerica, RegistrarCategorias
} from "../../../index";

import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";

function generarCodigoUnico() {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let codigo = "";
        for (let i = 0; i < 7; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres[indice];
        }
        return codigo;
}

export function RegistrarProductos({ onClose, dataSelect, accion }) {
    const { insertarProducto, editarProducto } = useProductosStore();
    const { dataEmpresa } = useEmpresaStore();
    const { marcaItemSelect, dataMarca, selectMarca, mostrarMarca } = useMarcaStore();
    const { categoriasItemSelect, dataCategorias, selectCategorias, mostrarCategorias } = useCategoriasStore();
    // Es para abrir el checklist de Marca - ListaGenerica
    const [stateMarca, setStateMarca] = useState(false);
    // Es para abrir el checklist de Categoria - ListaGenerica
    const [stateCategoria, setStateCategoria] = useState(false);
    // Para editar o agregar un producto
    const [subAccion, setSubAccion] = useState("");
    // Para abrir y cerrar el modal de marca
    const [openRegistroMarca, SetopenRegistroMarca] = useState(false);
    // Para abrir y cerrar el modal de categoria
    const [openRegistroCategoria, SetopenRegistroCategoria] = useState(false);
    // Guardar codigo Interno
    const [codigoInterno, setCodigoInterno] = useState("");

    useEffect(() => {
        setCodigoInterno(generarCodigoUnico());
    }, []);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    //TODO: Para sacar el espacio entre selector y el elemento padre
    const [espacioIzquieElem1, setEspacioIzquieElem1] = useState(0);
    const [espacioIzquieElem2, setEspacioIzquieElem2] = useState(0);

    const nuevoregistroMarca = () => {
        SetopenRegistroMarca(!openRegistroMarca);
        setSubAccion("nuevo");
    }

    const nuevoregistroCategoria = () => {
        SetopenRegistroCategoria(!openRegistroCategoria);
        setSubAccion("nuevo");
    }

    async function insertar(data) {
        console.log({cod: data.codigo_interno});
        
        if (accion === "Editar") {
            const p = {
                id: dataSelect.id,
                descripcion: ConvertirCapitalize(data.nombre),
                id_marca: marcaItemSelect.id,
                stock: parseFloat(data.stock),
                stock_minimo: parseFloat(data.stock_minimo),
                codigo_barras: parseFloat(data.codigo_barras),
                codigo_interno: data.codigo_interno,
                precio_venta: parseFloat(data.precio_venta),
                precio_compra: parseFloat(data.precio_compra),
                id_categoria: categoriasItemSelect.id,
                id_empresa: dataEmpresa.id,
            };
            await editarProducto(p);
            onClose();
        } else {
            const p = {
                _descripcion:ConvertirCapitalize(data.nombre),
                _idmarca: marcaItemSelect.id,
                _stock: parseFloat(data.stock),
                _stockminimo: parseFloat(data.stock_minimo),
                _codigobarras: parseFloat(data.codigo_barras),
                _codigointerno: data.codigo_interno,
                _precioventa: parseFloat(data.precio_venta),
                _preciocompra: parseFloat(data.precio_compra),
                _idcategoria: categoriasItemSelect.id,
                _idempresa: dataEmpresa.id,
            };
            await insertarProducto(p);
            onClose();
        }
    }

    const obtenerMarcayCategoria = () => {
        dataMarca.map(marca=>{
            if(marca.id === dataSelect?.id_marca){
                selectMarca(marca);
            }
        })
        dataCategorias.map(categoria => {
            if (categoria.id === dataSelect?.id_categoria) {
                selectCategorias(categoria);
            }
        })
    }

    useEffect(() => {
        console.log(dataSelect);
        if (accion === "Editar") {
            obtenerMarcayCategoria();
        } else {
            mostrarMarca({id_empresa: dataEmpresa?.id})
            mostrarCategorias({id_empresa: dataEmpresa?.id})
        }
    }, []);
    
    return (
        <Container>
            <div className="sub-contenedor">
                <div className="headers">
                    <section>
                        <h1>
                            {accion == "Editar" ? "Editar Producto" : "Registrar nuevo producto"}
                        </h1>
                    </section>

                    <section>
                        <span onClick={onClose}>X</span>
                    </section>
                </div>

                <form className="formulario" onSubmit={handleSubmit(insertar)}>
                    <section >
                        <article>
                            <InputText icono={<v.icononombre/>}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.descripcion}
                                    type="text"
                                    placeholder=""
                                    {...register("nombre", {required: true,})}
                                />
                                <label className="form__label">Descripcion</label>
                                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        <ContainerSelector>
                            <label for="marca">Marca: </label>
                            <Selector
                                funcion={() => setStateMarca(!stateMarca)}
                                state={stateMarca}
                                color="#fc6027"
                                texto1="✅ "
                                texto2={marcaItemSelect?.descripcion}
                                setEspacioIzquieElem={setEspacioIzquieElem1}
                            />
                            {
                                stateMarca && (<ListaGenerica
                                    bottom="-225px"
                                    anchoListaGenerica="220px"
                                    scroll="scroll"
                                    data={dataMarca}
                                    funcion={selectMarca}
                                    setState={() => setStateMarca(!stateMarca)}
                                    espacioIzquieElem={espacioIzquieElem1}
                                />)
                            }
                            <BtnFiltro
                                funcion={nuevoregistroMarca}
                                bgcolor="#f6f3f3"
                                textcolor="#353535"
                                icono={<v.agregar/>}
                            />
                        </ContainerSelector>

                        <article>
                            <InputText icono={<v.iconostock/>}>
                                <input
                                    readOnly={accion==="Editar"?true:false}
                                    className={accion==="Editar"?"form__field disabled":"form__field"}
                                    defaultValue={dataSelect.stock}
                                    type="number"
                                    step="1"
                                    placeholder=""
                                    {...register("stock", {required: accion==="Editar"?false:true,})}
                                />
                                <label className="form__label">Stock actual</label>
                                {errors.stock?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        <article>
                            <InputText icono={<v.iconostockminimo/>}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.stock_minimo}
                                    type="number"
                                    step="1"
                                    placeholder=""
                                    {...register("stock_minimo", {required: true,})}
                                />
                                <label className="form__label">Stock ingresante</label>
                                {errors.stock_minimo?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        <article>
                            <InputText stilos={true} icono={<v.iconocodigobarras/>}>
                                <input
                                    disabled={true}
                                    className="form__field disabled"
                                    defaultValue={dataSelect.codigo_barras}
                                    type="`number`"
                                    placeholder=""
                                    {...register("codigo_barras", {required: false,})}
                                />
                                <label className="form__label ">Codigo de Barras</label>
                                {/* {errors.codigo_barras?.type === "required" && <p>Campo requerido</p>} */}
                            </InputText>
                        </article>
                    </section>

                    <section >
                        <article>
                            <InputText icono={<v.iconocodigointerno/>}>
                                <input
                                    readOnly={true}
                                    className={accion==="Editar"?"form__field disabled":"form__field"}
                                    defaultValue={dataSelect.codigo_interno || codigoInterno}
                                    type="text"
                                    placeholder=""
                                    {...register("codigo_interno", {required: accion==="Editar"?false:true,})}
                                />
                                <label className="form__label">
                                    {
                                        dataSelect.codigo_interno?
                                        `Codigo Interno:  ${dataSelect.codigo_interno}`:
                                        `Cod. Interno Generado:  ${codigoInterno}`
                                    }
                                </label>
                                {errors.codigo_interno?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>

                        <ContainerSelector>
                            <label for="marca">Categoria: </label>
                            <Selector
                                funcion={() => setStateCategoria(!stateCategoria)}
                                state={stateCategoria}
                                color="#fc6027"
                                texto1="✅ "
                                texto2={categoriasItemSelect?.descripcion}
                                setEspacioIzquieElem={setEspacioIzquieElem2}
                            />
                            {
                                stateCategoria && (<ListaGenerica
                                    bottom="-225px"
                                    scroll="scroll"
                                    data={dataCategorias}
                                    funcion={selectCategorias}
                                    setState={() => setStateCategoria(!stateCategoria)}
                                    espacioIzquieElem={espacioIzquieElem2}
                                />)
                            }
                            <BtnFiltro
                                funcion={nuevoregistroCategoria}
                                bgcolor="#f6f3f3"
                                textcolor="#353535"
                                icono={<v.agregar/>}
                            />
                        </ContainerSelector>

                        <article>
                            <InputText stilos={true} icono={<v.iconocodigointerno/>}>
                                <input
                                    disabled={true}
                                    className="form__field disabled"
                                    defaultValue={dataSelect.precio_venta}
                                    type="`number`"
                                    placeholder=""
                                    {...register("precio_venta", {required: false,})}
                                />
                                <label className="form__label">Precio de venta</label>
                                {/* {errors.precio_venta?.type === "required" && <p>Campo requerido</p>} */}
                            </InputText>
                        </article>

                        <article>
                            <InputText icono={<v.iconocodigointerno/>}>
                                <input
                                    className="form__field"
                                    defaultValue={dataSelect.precio_compra}
                                    type="`number`"
                                    placeholder=""
                                    {...register("precio_compra", {required: true,})}
                                />
                                <label className="form__label">Precio de compra</label>
                                {errors.precio_compra?.type === "required" && <p>Campo requerido</p>}
                            </InputText>
                        </article>
                    </section>

                    <div className="btnguardarContent">
                        <Btnsave
                            icono={<v.iconoguardar/>}
                            titulo="Guardar"
                            bgcolor="#ef552b"
                        />
                    </div>
                </form>

                {
                    openRegistroMarca && (
                        <RegistrarMarca
                            accion={subAccion}
                            dataSelect={dataSelect}
                            onClose={() => SetopenRegistroMarca(!openRegistroMarca)}
                        />
                    )
                }
                {
                    openRegistroCategoria && (
                        <RegistrarCategorias
                            accion={subAccion}
                            dataSelect={dataSelect}
                            onClose={() => SetopenRegistroCategoria(!openRegistroCategoria)}
                        />
                    )
                }
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
        width: 100%;
        max-width: 90%;
        border-radius: 20px;
        background: ${({ theme }) => theme.bgtotal};
        box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
        padding: 30px 36px 20px 36px;
        z-index: 100;
        height: 75vh;
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