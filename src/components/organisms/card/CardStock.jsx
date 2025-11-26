
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useProductosStore, useKardexStore, useEmpresaStore } from "../../../index";

const Card = styled.div`
  background-color: #1e1e1e;
  color: #fff;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  min-width: 310px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`;

const Badge = styled.span`
  background-color: #6d28d9;
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 6px;
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: #b3b3b3;
  line-height: 1.4;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #525151;
  margin: 5px 0;
`;

const StockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StockLabel = styled.span`
  font-size: 0.9rem;
  color: #ccc;
`;

const StockValue = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #4ade80;
`;

export const CardStock = ({ tab }) => {

  const [descripcion, setDescripcion] = useState("");
  const [stockTotal, setStockTotal] = useState(0);

  const { dataProducto, buscarProducto, buscador } = useProductosStore();
  const { dataEmpresa } = useEmpresaStore();

  const dataKardex = useKardexStore( state => state.dataKardex );

  const {data: buscarData} = useQuery({
    queryKey: ["Buscar producto ", {
      _id_empresa: dataEmpresa.id,
      buscador: buscador
    }],
    queryFn: () => buscarProducto({
      _id_empresa: dataEmpresa.id,
      buscador: buscador
    }),
    enabled: dataEmpresa?.id!=null,
  });

  useEffect(() => {
    const descripcionUnica = 
      dataKardex?.length > 0 &&
      dataKardex.every((producto) => producto.descripcion === dataKardex[0].descripcion) ? 
      dataKardex[0].descripcion : 
      "Todos los Productos";

    setDescripcion(descripcionUnica);

    const stockTotalData =
    descripcionUnica === "Todos los Productos"
      ? dataProducto?.reduce((acc, producto) => acc + producto.stock, 0) // suma todo
      : dataProducto
          ?.filter((p) => p.descripcion === descripcionUnica) // solo los que coinciden
          .reduce((acc, producto) => acc + producto.stock, 0); // suma filtrada

    setStockTotal(stockTotalData);

  }, [dataProducto, dataKardex]);

  return (
    <Card>
      <Header>
        <Title>{descripcion}</Title>
        <Badge>{tab}</Badge>
      </Header>

      <Divider />

      <StockContainer>
        <StockLabel>STOCK TOTAL:</StockLabel>
        <StockValue>{stockTotal}</StockValue>
      </StockContainer>
    </Card>
  );
};

