
import { 
    useEmpresaStore, 
    useKardexStore,
    useUserStore,
} from "../index";
import {HomeTemplate} from "../index";
import {useQuery} from "@tanstack/react-query";

export function Home() {

    const { mostrarKardex } = useKardexStore();
    const { mostrarPermisos } = useUserStore();
    const { dataEmpresa } = useEmpresaStore();

    const {isLoading, error} = useQuery({
        queryKey: ["Mostrar kardex desde la Home", { _id_empresa: dataEmpresa?.id }],
        queryFn: () => mostrarKardex({ _id_empresa: dataEmpresa?.id }),
        enabled: dataEmpresa?.id!=null,
        refetchOnWindowFocus: false, // evita que se dispare al cambiar de pestaña
        refetchOnReconnect: false,   // evita refetch al reconectar internet
        refetchOnMount: false,       // no vuelve a pedir datos si ya están en cache
        staleTime: 0,  
    });

    const {isLoading: isLoadingPermisos, error: errorPermisos} = useQuery({
        queryKey: ["Mostrar permisos desde la Home", { _id_empresa: dataEmpresa?.id }],
        queryFn: () => mostrarPermisos({ _id_empresa: dataEmpresa?.id }),
        enabled: dataEmpresa?.id!=null,
        refetchOnWindowFocus: false, // evita que se dispare al cambiar de pestaña
        refetchOnReconnect: false,   // evita refetch al reconectar internet
        refetchOnMount: false,       // no vuelve a pedir datos si ya están en cache
        staleTime: 0,  
    });

    return (<HomeTemplate/>);
}

