
import {
    BloqueoPagina,
    CategoriasTemplate,
    SpinnerLoader,
    useCategoriasStore,
    useEmpresaStore,
    useUserStore
} from "../index";
import {useQuery} from "@tanstack/react-query";

export function Categorias() {
    // TODO: Revisa los permisos de los usuarios
    const {categoriaPermiso} = useUserStore();

    const {mostrarCategorias, dataCategorias, buscarCategorias, buscador} = useCategoriasStore();
    const { dataEmpresa } = useEmpresaStore();

    const {isLoading, error} = useQuery({
        queryKey: ["Mostrar categorias", {id_empresa: dataEmpresa?.id}],
        queryFn: () => mostrarCategorias({id_empresa: dataEmpresa?.id}),
        enabled: dataEmpresa?.id!=null
    });

    const {data:buscarData} = useQuery({
        queryKey: ["Buscar categorias ", {
            id_empresa: dataEmpresa.id,
            descripcion: buscador
        }],
        queryFn: () => buscarCategorias({
            id_empresa: dataEmpresa.id,
            descripcion: buscador
        }),
        enabled: dataEmpresa?.id!=null
    });

    if(!categoriaPermiso) {
        return <BloqueoPagina />
    }

    if(isLoading) {
        return <SpinnerLoader />
    }

    if(error) {
        return <span>Error...</span>
    }

    return (
        <CategoriasTemplate data={dataCategorias}/>
    );
}