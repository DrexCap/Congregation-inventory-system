
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
                                    Stock actual todo
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
    .pdfviewer {
        width: 100%;
        height: 100%;
    }
`;
