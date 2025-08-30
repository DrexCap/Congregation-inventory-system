import {ContentAccionesTabla} from "../ContentAccionesTabla.jsx";
import {ColorContentTabla} from "../../atoms/ColorContentTabla.jsx";
import {ContentEstadoStock} from "../ContentEstadoStock.jsx";

export const columnas = (editar, eliminar) => {

    return [
        {
            accessorKey: "descripcion",
            header: "Descripcion",
            cell: (info)=> <td data-title="Descripcion" className="ContentCell">
                <span>{info.getValue()}</span>
            </td>
        },
        {
            accessorKey: "stock",
            header: "Stock",
            enableSorting: false,
            cell: (info)=> <td data-title="Stock" className="ContentCell">
                <span>{info.getValue()}</span>
            </td>
        },
        {
            accessorKey: "",
            header: "Estado",
            enableSorting: false,
            cell: (info)=> <td data-title="Stock Min" className="ContentCell">
                <ContentEstadoStock
                    stock={info.row.original.stock}
                    stock_minimo={info.row.original.stock_minimo}
                />
            </td>
        },
        {
            accessorKey: "marca",
            header: "Marca",
            enableSorting: false,
            cell: (info)=> <td data-title="Marca" className="ContentCell">
                <span>{info.getValue()}</span>
            </td>
        },
        {
            accessorKey: "categoria",
            header: "Categoria",
            enableSorting: false,
            cell: (info)=> <td data-title="Categoria" className="ContentCell">
                <ColorContentTabla
                    $color={info.row.original.color}
                    className="contentCategoria"
                >
                    <span>{info.getValue()}</span>
                </ColorContentTabla>
            </td>
        },
        {
            accessorKey: "precio_compra",
            header: "Pr. compra",
            enableSorting: false,
            cell: (info)=> <td data-title="Pr. venta" className="ContentCell">
                <span>{info.getValue() + " S/."}</span>
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
