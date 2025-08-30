
import {BloqueoPagina, MarcaTemplate, SpinnerLoader, useUserStore, useEmpresaStore, useMarcaStore} from "../index";
import {useQuery} from "@tanstack/react-query";

export function Marca() {
    // TODO: Revisa los permisos de los usuarios
    const { dataPermisos} = useUserStore();
    const statePermiso = dataPermisos.some((objeto)=>
        objeto.modulos.nombre.includes("Marca de productos"));

    const {mostrarMarca, dataMarca, buscarMarca, buscador} = useMarcaStore();
    const { dataEmpresa } = useEmpresaStore();

    const {isLoading, error} = useQuery({
        queryKey: ["Mostrar marca ", {id_empresa: dataEmpresa?.id}],
        queryFn: () => mostrarMarca({id_empresa: dataEmpresa?.id}),
        enabled: dataEmpresa?.id!=null
    });

    const {data:buscarData} = useQuery({
        queryKey: ["Buscar marca ", {
            id_empresa: dataEmpresa.id,
            descripcion: buscador
        }],
        queryFn: () => buscarMarca({
            id_empresa: dataEmpresa.id,
            descripcion: buscador
        }),
        enabled: dataEmpresa?.id!=null
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
        <MarcaTemplate data={dataMarca}/>
    );
}