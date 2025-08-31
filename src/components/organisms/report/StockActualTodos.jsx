
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
import {useEmpresaStore, useProductosStore} from "../../../index";
import logo from "../../../assets/logo.png";

export const StockActualTodos = () => {

    Font.register({
        family: "Inconsolata",
        src: "https://fonts.gstatic.com/s/inconsolata/v15/7bMKuoy6Nh0ft0SHnIGMuaCWcynf_cDxXwCLxiixG1c.ttf",
    });

    const { reportStockProductoTodos } = useProductosStore();
    const { dataEmpresa } = useEmpresaStore();

    const { data } = useQuery({
        queryKey: ["Reporte stock actual todos", { id_empresa: dataEmpresa?.id }],
        queryFn: () => reportStockProductoTodos({ id_empresa: dataEmpresa?.id }),
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

    const totalStock = data?.reduce((sum, item) => sum + item.stock, 0);

    return (
        <Container>
            <PDFViewer className="pdfviewer">
                <Document title="Reporte total de stock">
                    <Page size="A4" orientation="portrait" style={styles2.page}>

                        <View style={styles2.header}>
                            <View style={styles2.titleBlock}>
                                <Text style={styles2.title}>
                                    Reporte de todo el stock
                                </Text>
                                <Text style={styles2.subtitle}>
                                    Kardex - total de productos
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

                        <View style={[styles2.tableRow, styles2.totalRow]}>
                            <Text style={[styles2.tableCell, styles2.colProducto]}>Total</Text>
                            <Text style={[styles2.tableCell, styles2.colStock]}>{totalStock}</Text>
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
    .pdfviewer {
        width: 100%;
        height: 100%;
    }
`;
