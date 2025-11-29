import { AlertTriangle } from "lucide-react";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  max-width: 650px;
  margin: 0rem auto;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  display: flex;
`;

const IconWrapper = styled.div`
  color: #d97706;
  margin-top: 4px;
  flex-shrink: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const Text = styled.p`
  color: #374151;
  line-height: 1.45;
  margin: 0;
`;

const Modules = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
  font-weight: 500;

  span {
    background: #f3f4f6;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #374151;
    white-space: nowrap;
  }
`;

export function NoticeCard() {
  return (
    <Card>
      <IconWrapper>
        <AlertTriangle size={32} />
      </IconWrapper>

      <Content>
        <Title>Aviso importante</Title>

        <Text>
          Esta aplicación está actualmente en proceso de construcción. Los módulos ya operativos son:
        </Text>

        <Modules>
          <span>Categoría de Productos</span>
          <span>Marca de Productos</span>
          <span>Personal</span>
          <span>Tu Empresa</span>
        </Modules>

        <Text>
          Los módulos <strong>Productos</strong> y <strong>Kardex</strong> están en mantenimiento debido a una actualización de trazabilidad.
        </Text>

        <Text style={{ fontWeight: 600, marginTop: 4 }}>
          Gracias por tu comprensión.
        </Text>
      </Content>
    </Card>
  );
}
