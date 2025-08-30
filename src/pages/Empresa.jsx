import { useEmpresaStore } from "../store/EmpresaStore";
import { EmpresaTemplate } from "../components/templates/EmpresaTemplate";
import { useQuery } from "@tanstack/react-query";
import { BloqueoPagina } from "../components/molecules/BloqueoPagina";
import { useUserStore } from "../store/UserStore.jsx";

export function Empresa() {
    const { dataPermisos } = useUserStore();
    const statePermiso = dataPermisos.some((objeto) =>
        objeto.modulos.nombre.includes("Tu empresa")
    );

    const { nroUsuariosXEmpresa, dataEmpresa } = useEmpresaStore();
    //llamar a consultar usuarios por empresa

    const { data: contadorusurios } = useQuery({
        queryKey: ["contador de usuarios", dataEmpresa.id],
        queryFn: () => nroUsuariosXEmpresa({ id_empresa: dataEmpresa.id }),
        enabled: dataEmpresa?.id != null,
    });

    if (statePermiso == false) {
        return <BloqueoPagina state={statePermiso}/>;
    }

    return (
        <>
            <EmpresaTemplate />
        </>
    );
}