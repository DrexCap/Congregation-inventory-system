
import styled from "styled-components";
import {useState} from "react";
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
import logo from "../../../assets/logo.png";

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

    const styles2 = StyleSheet.create({
        page: {
            padding: 30,
            fontSize: 10,
            fontFamily: "Helvetica"
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            borderBottomWidth: 2,
            borderBottomColor: "#1E88E5",
            paddingBottom: 10
        },
        logo: {
            width: 60,
            height: 60
        },
        titleBlock: {
            flexDirection: "column",
            textAlign: "right",
            fontFamily: "Inconsolata",
        },
        title: {
            color: "#1E88E5",
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 5,
            fontFamily: "Inconsolata",
        },
        subtitle: {
            fontSize: 10,
            color: "#666",
            fontFamily: "Inconsolata",
        },
        table: {
            display: "table",
            width: "auto",
            marginTop: 10,
            borderStyle: "solid",
            borderColor: "#ccc",
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 0
        },
        tableRow: {
            flexDirection: "row"
        },
        tableHeader: {
            backgroundColor: "#1E88E5",
            color: "white",
            fontWeight: "bold"
        },
        tableCell: {
            margin: 4,
            padding: 4,
            fontSize: 9,
            flexGrow: 1,
            borderStyle: "solid",
            borderColor: "#ccc",
            borderBottomWidth: 1,
            borderRightWidth: 1
        },
        // 📐 Ancho fijo de columnas
        colProducto: { width: "60%", textAlign: "left" },
        colStock: { width: "40%" },
        rowAlt: {
            backgroundColor: "#f9f9f9"
        },
        totalRow: {
            backgroundColor: "#FB8C00",
            color: "white",
            fontWeight: "bold"
        }
    });
    
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    const renderTableRow = (rowData, isHeader = false) => (
        <View style={[styles2.tableRow, styles2.tableHeader]} key={rowData.id}>
            <Text style={[styles2.tableCell, isHeader && styles2.colProducto]}>
                {rowData.descripcion}
            </Text>
            <Text style={[styles2.tableCell, isHeader && styles2.colStock]}>
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
                buscarProducto={true}
            />

            {
                stateListaProductos && (
                    <ListaGenerica
                        funcion={(p)=> {
                            selectProducto(p);
                            setBuscador("");
                        }}
                        bottom="635px"
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
                    <Page size="A4" orientation="portrait" style={styles2.page}>

                        <View style={styles2.header}>
                            <View style={styles2.titleBlock}>
                                <Text style={styles2.title}>
                                    Reporte del stock por producto
                                </Text>
                                <Text style={styles2.subtitle}>
                                    Kardex - entrada y salida por producto
                                </Text>
                                <Text style={styles2.subtitle}>
                                    Fecha y hora del reporte: {formattedDate}
                                </Text>
                            </View>
                            <Image src={logo} style={styles2.logo} />
                        </View>

                        <View style={styles2.table}>
                            {renderTableRow(
                                {
                                    descripcion: "Producto",
                                    stock: "Stock",
                                },
                                true
                            )}
                            {data?.map((item, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles2.tableRow,
                                        index % 2 === 1 ? styles2.rowAlt : null
                                    ]}
                                >
                                    <Text style={[styles2.tableCell, styles2.colProducto]}>
                                        {item.descripcion}
                                    </Text>
                                    <Text style={[styles2.tableCell, styles2.colStock]}>
                                        {item.stock}
                                    </Text>
                                </View>
                            ))}
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
