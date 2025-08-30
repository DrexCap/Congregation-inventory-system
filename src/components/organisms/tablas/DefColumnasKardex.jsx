
import styled from "styled-components";
import {ContentAccionesTabla} from "../ContentAccionesTabla.jsx";
import { Device } from "../../../styles/breackpoints";

export const columnasKardex = (eliminar) => {

    return [
        {
            accessorKey: "descripcion",
            header: "Producto",
            cell: (info) => <td data-title="Producto" className="ContentCell">
                <span style={{textDecoration: info.row.original.estado===0 && "line-through"}}>
                    {info.getValue()}
                </span>
            </td>,
            enableColumnFilter: true,
            filterFn: (row, columnId, filterStatuses) => {
                if (filterStatuses.length === 0) return true;
                const status = row.getValue(columnId);
                return filterStatuses.includes(status?.id);
            },
        },
        {
            accessorKey: "fecha",
            header: "Fecha",
            enableSorting: false,
            cell: (info) => (
                <td data-title="Fecha" className="ContentCell">
                    <span>{info.getValue()}</span>
                </td>
            ),
            enableColumnFilter: true,
            filterFn: (row, columnId, filterStatuses) => {
                if (filterStatuses.length === 0) return true;
                const status = row.getValue(columnId);
                return filterStatuses.includes(status?.id);
            },
        },
        {
            accessorKey: "tipo",
            header: "Tipo",
            enableSorting: false,
            cell: (info) => (
                <td data-title="Tipo" className="ContentCell">
                    {info.getValue() == "salida" || info.getValue() == "salidas"  ? (
                        <Colorcontent
                            color="#ed4d4d"
                            className="contentCategoria"
                        >
                            {info.getValue()}
                        </Colorcontent>
                    ) : (
                        <Colorcontent
                            color="#30c85b"
                            className="contentCategoria"
                        >
                            {info.getValue()}
                        </Colorcontent>
                    )}
                </td>
            ),
            enableColumnFilter: true,
            filterFn: (row, columnId, filterStatuses) => {
                if (filterStatuses.length === 0) return true;
                const status = row.getValue(columnId);
                return filterStatuses.includes(status?.id);
            },
        },
        {
            accessorKey: "detalle",
            header: "Detalle",
            enableSorting: false,
            cell: (info) => (
                <td data-title="Detalle" className="ContentCell">
                    <span >{info.getValue()}</span>
                </td>
            ),
            enableColumnFilter: true,
            filterFn: (row, columnId, filterStatuses) => {
                if (filterStatuses.length === 0) return true;
                const status = row.getValue(columnId);
                return filterStatuses.includes(status?.id);
            },
        },
        {
            accessorKey: "nombres",
            header: "Usuario",
            enableSorting: false,
            cell: (info) => (
                <td data-title="Usuario" className="ContentCell">
                    <span>{info.getValue()}</span>
                </td>
            ),
            enableColumnFilter: true,
            filterFn: (row, columnId, filterStatuses) => {
                if (filterStatuses.length === 0) return true;
                const status = row.getValue(columnId);
                return filterStatuses.includes(status?.id);
            },
        },
        {
            accessorKey: "cantidad",
            header: "Cantidad",
            enableSorting: false,
            cell: (info) => (
                <td data-title="Cantidad" className="ContentCell">
                    <span>{info.getValue()}</span>
                </td>
            ),
            enableColumnFilter: true,
            filterFn: (row, columnId, filterStatuses) => {
                if (filterStatuses.length === 0) return true;
                const status = row.getValue(columnId);
                return filterStatuses.includes(status?.id);
            },
        },
        {
            accessorKey: "stock",
            header: "Stock",
            enableSorting: false,
            cell: (info) => (
                <td data-title="Stock" className="ContentCell">
                    <span>{info.getValue()}</span>
                </td>
            ),
            enableColumnFilter: true,
            filterFn: (row, columnId, filterStatuses) => {
                if (filterStatuses.length === 0) return true;
                const status = row.getValue(columnId);
                return filterStatuses.includes(status?.id);
            },
        },
        {
            accessorKey: "acciones",
            header: "",
            enableSorting: false,
            cell: (info) => (
                <td className="ContentCell">
                  <ContentAccionesTabla 
                    funcionEliminar={() => eliminar(info.row.original)}
                  />
                </td>
            )
        }
    ];
}   


const Colorcontent = styled.div`
  color: ${(props) => props.color};
  border-radius: 8px;
  border:1px dashed ${(props) => props.color};
  text-align: center;
  padding:3px;
  width:70%;
  font-weight:700;
  @media ${Device.tablet} {
    width:100%;
  }
`;

