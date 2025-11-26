
import styled from "styled-components";
import { Trazabilidad, useKardexStore, useEmpresaStore, BtnPopover } from "../../../index";
import { TrendingDown, TrendingUp, ClipboardMinus } from "lucide-react";
import {ContentAccionesTabla} from "../ContentAccionesTabla.jsx";
import { Device } from "../../../styles/breackpoints";

export const columnasKardex = (eliminar, consultaDocs) => {

    const getColorDocumento = (valor) => {
        const coloresPorPrefijo = {
            INSU: "#868c96",
            PROD: "#10B981",
            CONS: "#8B5CF6",
            DEV:  "#3B82F6",
            MER:  "#EF4444",
            TRAS: "#F59E0B",
        };
        const prefijo = valor.split("-")[0]; // "INSU" de "INSU-0030"
        return coloresPorPrefijo[prefijo] || "#000000"; // negro por defecto
    }

    return [
        {
            accessorKey: "descripcion",
            header: "Producto",
            cell: (info) => (
                <div data-title="Producto" className="ContentCell">
                    <span >
                        {info.getValue()}
                    </span>
                </div>
            ),
            enableColumnFilter: true
        },
        {
            accessorKey: "fecha",
            header: "Fecha",
            enableSorting: false,
            cell: (info) => (
                <div data-title="Fecha" className="ContentCell">
                    <span>
                        {new Date(info.getValue()).toLocaleDateString("es-PE", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </span>
                </div>
            ),
            enableColumnFilter: true
        },
        {
            accessorKey: "tipo",
            header: "Tipo",
            enableSorting: false,
            cell: (info) => (
                <div data-title="Tipo" className="ContentCell">
                    {info.getValue() == "salida" || info.getValue() == "salidas"  ? (
                        <Colorcontent
                            color="#ed4d4d"
                            className="contentCategoria"
                        >
                            <TrendingDown size={20} />
                            {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
                        </Colorcontent>
                    ) : (
                        <Colorcontent
                            color="#30c85b"
                            className="contentCategoria"
                        >
                            <TrendingUp size={20} />
                            {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
                        </Colorcontent>
                    )}
                </div>
            ),
            enableColumnFilter: true
        },
        {
            accessorKey: "nombres",
            header: "Usuario",
            enableSorting: false,
            cell: (info) => (
                <div data-title="Usuario" className="ContentCell">
                    <span>{info.getValue()}</span>
                </div>
            ),
            enableColumnFilter: true
        },
        {
            accessorKey: "documento",
            header: "Documento",
            enableSorting: false,
            cell: (info) => (
                <div data-title="Documento" className="ContentCell">
                    <span
                        style={{
                            fontWeight: info.getValue().startsWith("PROD-") ? 750 : 600,
                            color: getColorDocumento(info.getValue()),
                            animation: info.getValue().startsWith("PROD-") ? 
                                consultaDocs(info.getValue()) ? 
                                    "none" : 
                                    "breathe 2s ease-in-out infinite": "none"
                        }}
                    >
                        {info.getValue()}
                    </span>
                </div>
            ),
            enableColumnFilter: true
        },
        {
            accessorKey: "cantidad",
            header: "Cantidad",
            enableSorting: false,
            cell: (info) => (
                <div data-title="Cantidad" className="ContentCell">
                    { (info.row.original.tipo==='salida' && info.row.original.documento!=='Anulado') || 
                        ((info.row.original.tipo==='entrada' || info.row.original.tipo==='entradas' ) 
                            && info.row.original.documento==='Anulado') ?
                        <span style={{color: "#ed4d4d", fontWeight: 700}}>
                            - {info.getValue()}
                        </span> :
                        <span style={{color: "#30c85b", fontWeight: 700}}>
                            + {info.getValue()}
                        </span>
                    }
                </div>
            ),
            enableColumnFilter: true
        },
        {
            accessorKey: "stock_resultante",
            header: "Stock Resul.",
            enableSorting: false,
            cell: (info) => (
                <div data-title="Stock_Resultante" className="ContentCell">
                    {
                        info.row.original.documento==="Anulado" ? 
                        <ClipboardMinus /> :
                        <span>{info.getValue()}</span>                        
                    }
                </div>
            ),
            enableColumnFilter: true
        },
        // {
        //     accessorKey: "movimiento",
        //     header: "Movimiento",
        //     enableSorting: false,
        //     cell: (info) => (
        //         <div data-title="Stock_Resultante" className="ContentCell">
        //             <span>{info.getValue()}</span>
        //         </div>
        //     ),
        //     enableColumnFilter: true
        // },
        {
            accessorKey: "detalle",
            header: "Seguimiento",
            enableSorting: false,
            cell: (info) => (
                <div data-title="Detalle" className="ContentCell">
                    { 
                        info.row.original.tipo === "entrada" || info.row.original.tipo === "entradas" ||
                        info.row.original.documento === "Anulado" ?
                        <BtnPopover 
                            tipo={info.row.original.tipo} 
                            detalle={info.getValue()}
                            fechaInicio={info.row.original.fecha_inicio} 
                            fechaFin={info.row.original.fecha_fin} 
                        /> : 
                        <Trazabilidad
                            lote={info.row.original.codigo_lote}
                            fechaInicio={info.row.original.fecha_inicio} 
                            fechaFin={info.row.original.fecha_fin}
                            verificarDoc={consultaDocs}
                            fecha={info.row.original.fecha}
                            cantidad={info.row.original.cantidad}
                            producto={info.row.original.descripcion}
                            documento={info.row.original.documento}
                            detalle={info.row.original.detalle}
                            id={info.row.original.id}
                            tipo={info.row.original.tipo}
                            color={getColorDocumento}
                            responsable={info.row.original.nombres}
                            tipoUser={info.row.original.tipo_user}
                        />
                    }
                </div>
            ),
            enableColumnFilter: true
        },
        {
            accessorKey: "acciones",
            header: "",
            enableSorting: false,
            cell: (info) => (
                <div data-title="Acciones" className="ContentCell">
                    <ContentAccionesTabla 
                        funcionEliminar={() => eliminar(info.row.original)}
                    />
                </div>
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

  display: flex;        /* activamos flexbox */
  align-items: center;  /* centramos verticalmente */
  justify-content: center; /* centramos horizontalmente */
  gap: 6px;                /* separación entre hijos */

  @media ${Device.tablet} {
    width:100%;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: #111827;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }
`;


