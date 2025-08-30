
import styled from "styled-components";
import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet,
    Font,
    PDFViewer
} from "@react-pdf/renderer";
import {useQuery} from "@tanstack/react-query";
import {useEmpresaStore, useProductosStore, Buscador, ListaGenerica} from "../../../index";
import {useState} from "react";

export const StockActualPorProducto = () => {

    const [espacioAbajoElem, setEspacioAbajoElem] = useState(0);

    Font.register({
        family: "Inconsolata",
        src: "https://fonts.gstatic.com/s/inconsolata/v15/7bMKuoy6Nh0ft0SHnIGMuaCWcynf_cDxXwCLxiixG1c.ttf",
    });

    const [stateListaProductos, setStateListaProductos] = useState(false);
    
    const { reportStockXProducto,
        buscarProducto,
        buscador,
        setBuscador,
        selectProducto,
        productoItemSelect
    } = useProductosStore();
    const { dataEmpresa } = useEmpresaStore();

    const {data, isLoading, error} = useQuery({
        queryKey: ["Reporte stock por producto", {
            id_empresa: dataEmpresa?.id,
            id: productoItemSelect?.id
        }],
        queryFn: () => reportStockXProducto({
            id_empresa: dataEmpresa?.id,
            id: productoItemSelect?.id
        }),
        enabled: dataEmpresa?.id != null,
    });

    const {
        data:dataProductoBuscador,
        isLoading:isLoadingProductosBuscador,
        error:errorBuscador} = useQuery({
        queryKey: ["Buscar productos", { _id_empresa: dataEmpresa?.id, buscador }],
        queryFn: () => buscarProducto({
            _id_empresa: dataEmpresa?.id, buscador
        }),
        enabled: dataEmpresa?.id != null,
    });

    const styles = StyleSheet.create({
        page: {
            flexDirection: "row",
            position: "relative",
        },
        section: { margin: 10, padding: 10, flexGrow: 1 },
        table: { width: "100%", margin: "auto", marginTop: 10 },
        row: {
            flexDirection: "row",
            borderBottom: 1,
            borderBottomColor: "#121212",
            alignItems: "center",
            height: 24,
            borderLeftColor:"#000",
            borderLeft:1,
            textAlign:"left",
            justifyContent: "flex-start",
        },
        cell: { flex:1, textAlign:"center", fontFamily: "Inconsolata", borderLeftColor:"#000", justifyContent: "flex-start",
            alignItems: 'center',
        },
    });

    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    const renderTableRow = (rowData, isHeader = false) => (
        <View style={styles.row} key={rowData.id}>
            <Text style={[styles.cell, isHeader && styles.headerCell]}>
                {rowData.descripcion}
            </Text>
            <Text style={[styles.cell, isHeader && styles.headerCell]}>
                {rowData.stock}
            </Text>
        </View>
    );

    return (
        <Container>
            <Buscador
                funcion={()=>setStateListaProductos(!stateListaProductos)}
                setBuscador={setBuscador}
                setEspacioAbajoElem={setEspacioAbajoElem}
            />

            {
                stateListaProductos && (
                    <ListaGenerica
                        funcion={(p)=> {
                            selectProducto(p);
                            setBuscador("");
                        }}
                        // bottom="360px"
                        scroll="scroll"
                        anchoListaGenerica="870px"
                        data={dataProductoBuscador}
                        setState={()=>setStateListaProductos(!stateListaProductos)}
                        espacioAbajoElem={espacioAbajoElem}
                    />
                )
            }

            <PDFViewer className="pdfviewer">
                <Document title="Reporte de todo el stock">
                    <Page size="A4" orientation="portrait">
                        <View style={styles.page}>
                            <View style={styles.section}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: "ultrabold",
                                    marginBottom: 10,
                                    fontFamily: "Inconsolata",
                                }}>
                                    Stock actual por producto
                                </Text>
                                <Text>
                                    Fecha y hora del reporte: {formattedDate}
                                </Text>
                                <View>
                                    {renderTableRow(
                                        {
                                            descripcion: "Producto",
                                            stock: "Stock",
                                        },
                                        true
                                    )}
                                    {data?.map((item) => renderTableRow(item))}
                                </View>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </Container>
    )
}

export const Container = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    gap: 15px;
    .pdfviewer {
        width: 100%;
        height: 100%;
    }
`;
