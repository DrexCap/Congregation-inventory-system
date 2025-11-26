
import {
    UsuariosTemplate,
    SpinnerLoader,
    useEmpresaStore,
    useMarcaStore, useUserStore, BloqueoPagina
} from "../index";
import {useQuery} from "@tanstack/react-query";

export function Usuarios() {
    const {
        mostrarModulos,
        mostrarUsuariosTodos,
        dataUsuario,
        buscarUsuario,
        buscador, usuarioPermiso } = useUserStore();
    const { dataEmpresa } = useEmpresaStore();

    const { data: datamodulos } = useQuery({
        queryKey: ["Mostrar modulos"],
        queryFn: mostrarModulos,
    });

    const { isLoading, error } = useQuery({
        queryKey: ["Mostrar todos los usuarios", { _id_empresa: dataEmpresa?.id }],
        queryFn: () => mostrarUsuariosTodos({ _id_empresa: dataEmpresa?.id }),
        enabled: dataEmpresa?.id != null,
    });

    const { data: buscarData } = useQuery({
        queryKey: ["Buscar Usuarios", { _id_empresa: dataEmpresa.id, buscador: buscador }],
        queryFn: () => buscarUsuario({
            _id_empresa: dataEmpresa.id,
            buscador
        }),
        enabled: dataEmpresa.id != null,
    });

    if(!usuarioPermiso){
        return <BloqueoPagina />
    }

    if(isLoading) {
        return <SpinnerLoader />
    }

    if(error) {
        return <span>Error...</span>
    }

    return (
        <UsuariosTemplate data={dataUsuario}/>
    );
}