
import {
    ProductoTemplate,
    SpinnerLoader,
    useEmpresaStore,
    useMarcaStore,
    useUserStore,
    useCategoriasStore,
    useProductosStore,
    BloqueoPagina
} from "../index";
import {useQuery} from "@tanstack/react-query";

export function Productos() {
    // TODO: Revisa los permisos de los usuarios
    const {dataPermisos} = useUserStore();
    const statePermiso = dataPermisos.some((objeto)=>objeto.modulos.nombre.includes("Productos"));

    const { mostrarProducto, dataProducto, buscarProducto, buscador} = useProductosStore();
    const { mostrarMarca } = useMarcaStore();
    const { mostrarCategorias } = useCategoriasStore();
    const { dataEmpresa } = useEmpresaStore();

    const {data, isLoading, error} = useQuery({
        queryKey: ["Mostrar producto ", {_id_empresa: dataEmpresa?.id}],
        queryFn: () => mostrarProducto({_id_empresa: dataEmpresa?.id}),
        enabled: dataEmpresa?.id!=null,
    });

    const {data:buscarData} = useQuery({
        queryKey: ["Buscar producto ", {
            _id_empresa: dataEmpresa.id,
            descripcion: buscador
        }],
        queryFn: () => buscarProducto({
            _id_empresa: dataEmpresa.id,
            buscador: buscador
        }),
        enabled: dataEmpresa?.id!=null
    });

    const { data:dataMarcas} = useQuery({
        queryKey: ["Mostrar Marca ", {id_empresa: dataEmpresa?.id}],
        queryFn: () => mostrarMarca({id_empresa: dataEmpresa?.id}),
        enabled: dataEmpresa?.id!=null,
    });

    const { data:dataCategorias} = useQuery({
        queryKey: ["Mostrar Categoria ", {id_empresa: dataEmpresa?.id}],
        queryFn: () => mostrarCategorias({id_empresa: dataEmpresa?.id}),
        enabled: dataEmpresa?.id!=null,
    });

    if(statePermiso==false){
        return <BloqueoPagina />
    }

    if(isLoading) {
        return <SpinnerLoader />
    }

    if(error) {
        return <span>Error...</span>
    }

    return (
        <ProductoTemplate data={dataProducto}/>
    );
}