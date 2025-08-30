import {ContentAccionesTabla} from "../ContentAccionesTabla.jsx";
import {ContentEstadoStock} from "../ContentEstadoStock.jsx";

export const columnasUser = (editar, eliminar) => {

    return [
        {
            accessorKey: "nombres",
            header: "Nombres",
            cell: (info)=> <td data-title="Nombres" className="ContentCell">
                <span>{info.getValue()}</span>
            </td>
        },
        {
            accessorKey: "tipo_user",
            header: "T. Usuario",
            cell: (info)=> <td data-title="T. Usuario" className="ContentCell">
                <span>{info.getValue()}</span>
            </td>
        },
        {
            accessorKey: "estado",
            header: "Estado",
            enableSorting: false,
            cell: (info)=> <td data-title="Estado" className="ContentCell">
                <span>{info.getValue()}</span>
            </td>
        },
        {
            accessorKey: "acciones",
            header: "",
            enableSorting: false,
            cell: (info)=> (
                <td className="ContentCell">
                    <ContentAccionesTabla
                        funcionEditar={()=>editar(info.row.original)}
                        funcionEliminar={()=>eliminar(info.row.original)}
                    />
                </td>
            )
        }
    ];
}
