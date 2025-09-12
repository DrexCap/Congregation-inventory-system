
import {ReportesTemplate, useEmpresaStore, useKardexStore} from "../index";
import {useQuery} from "@tanstack/react-query";

export function Reportes() {

    const { dataEmpresa } = useEmpresaStore();
    const { mostrarKardex } = useKardexStore();

    const {data, isLoading, error } = useQuery({
        queryKey: ["Reporte mostrarkardex todo", { _id_empresa: dataEmpresa.id }],
        queryFn: () => mostrarKardex({ _id_empresa: dataEmpresa.id }),
    });

    return (
        <ReportesTemplate />
    );
}
