import {
    BloqueoPagina,
    KardexTemplate,
    SpinnerLoader,
    useUserStore, useEmpresaStore, useProductosStore, useKardexStore, useTipoSalidaStore
} from "../index";
import {useQuery} from "@tanstack/react-query";

export function Kardex() {

    // TODO: Revisa los permisos de los usuarios
    const { dataPermisos } = useUserStore()
    const statePermiso = dataPermisos.some((objeto)=> objeto.modulos.nombre.includes("Kardex"));

    // TODO: CRUD productos Store
    const { buscarProducto, buscador: buscadorProductos } = useProductosStore();

    const { mostrarKardex, dataKardex, buscarKardex, buscador: buscador, 
                            mostrarDocumentosMovimientoCaratula } = useKardexStore();
    const { dataEmpresa } = useEmpresaStore();
    const { mostrarTipoSalida } = useTipoSalidaStore();

    const {isLoading, error} = useQuery({
        queryKey: ["Mostrar kardex ", { _id_empresa: dataEmpresa?.id }],
        queryFn: () => mostrarKardex({ _id_empresa: dataEmpresa?.id }),
        enabled: dataEmpresa?.id!=null,
        refetchOnWindowFocus: false, // evita que se dispare al cambiar de pestaña
        refetchOnMount: false,       // no vuelve a pedir datos si ya están en cache
        refetchOnReconnect: false,   // evita refetch al reconectar internet
        staleTime: Infinity,  
    });

    const {data: documentosCaratula} = useQuery({
        queryKey: ["Mostrar Documento Movimiento Caratula", {
            _id_empresa: dataEmpresa.id,
        }],
        queryFn: () => mostrarDocumentosMovimientoCaratula({
            _id_empresa: dataEmpresa.id,
        }),
        enabled: dataEmpresa?.id!=null,
        refetchOnWindowFocus: false, // evita que se dispare al cambiar de pestaña
        refetchOnMount: false,       // no vuelve a pedir datos si ya están en cache
        refetchOnReconnect: false,   // evita refetch al reconectar internet
        staleTime: Infinity,
    })

    const { data: tipoSalida } = useQuery({
        queryKey: ["Mostrar Tipo Salida Kardex Suministro"],
        queryFn: () => mostrarTipoSalida(),
        refetchOnWindowFocus: false, // evita que se dispare al cambiar de pestaña
        refetchOnMount: false,       // no vuelve a pedir datos si ya están en cache
        refetchOnReconnect: false,   // evita refetch al reconectar internet
        staleTime: Infinity, 
    })

    const {data: buscarData} = useQuery({
        queryKey: ["Buscar producto ", {
            _id_empresa: dataEmpresa.id,
            buscador: buscadorProductos
        }],
        queryFn: () => buscarProducto({
            _id_empresa: dataEmpresa.id,
            buscador: buscadorProductos
        }),
        enabled: dataEmpresa?.id!=null
    });

    const {data: buscarKardexData} = useQuery({
        queryKey: ["Buscar kardex ", {
            _id_empresa: dataEmpresa.id,
            buscador: buscador
        }],
        queryFn: () => buscarKardex({
            _id_empresa: dataEmpresa.id,
            buscador: buscador
        }),
        enabled: dataEmpresa?.id!=null
    });

    if(statePermiso==false){
        return <BloqueoPagina state={statePermiso} />
    }

    if(isLoading) {
        return <SpinnerLoader />
    }

    if(error) {
        return <span>Error...</span>
    }

    return (
        <KardexTemplate data={dataKardex}/>
    );
}