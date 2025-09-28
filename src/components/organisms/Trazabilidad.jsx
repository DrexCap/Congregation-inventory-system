
import { useState } from "react";
import styled from "styled-components";
import AnimatedGif from "../../assets/ojos.gif"; // 👈 tu JSON descargado
import Vista from "../../assets/vista.png";
import { Eye } from "lucide-react"; // 👀 ícono

// ==== Botón estilo de la imagen ====
const Button1 = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 6px;
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

const Button = styled.button`
  gap: 6px;
  display: flex;
  color: #111827;
  align-items: center;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 2.5rem;
  padding: 6px 12px;
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;

  &:hover, &:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(0, 0, 0, 0.65);
  }

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    background-color: #F0F0F1;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }
`;

// ==== Modal Overlay y Container ====
const ModalOverlay = styled.div`
  transition: 0.5s;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 600px;
  max-width: 90%;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

// ==== Estilos internos del modal ====
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Card = styled.div`
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 16px;
  margin: 12px 0;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
`;

const Label = styled.span`
  font-weight: 500;
  color: #333;
`;

const Value = styled.span`
  font-weight: 600;
  color: ${(props) => props.color || "#000"};
`;

const Badge = styled.span`
  background: ${(props) => (props.type === "success" ? "#dbeafe" : "#eee")};
  color: ${(props) => (props.type === "success" ? "#1d4ed8" : "#333")};
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 12px;
  font-weight: 600;
`;

// ==== Componente Principal ====
export function Trazabilidad({id, tipo, documento, verificarDoc}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Botón que abre el modal */}
      <Button onClick={() => setOpen(true)}>
        {documento?.startsWith("PROD-") ? (
            !verificarDoc(documento) && 
              <img src={AnimatedGif} alt="icono animado" style={{ width: 26, height: 26 }} />
          ) : <img src={Vista} alt="icono estatico" style={{ width: 21, height: 21 }} />
        }
        Trazabilidad
      </Button>

      {/* Modal */}
      {open && (
        <ModalOverlay>
          <ModalContainer>
            <Header>
              <div>
                <Title>Trazabilidad de Producción</Title>
                <Subtitle>
                  Libros producidos utilizando estas carátulas
                </Subtitle>
              </div>
              <CloseButton onClick={() => setOpen(false)}>×</CloseButton>
            </Header>

            {/* Detalle del Movimiento */}
            <Card>
              <SectionTitle>Detalle del Movimiento</SectionTitle>
              <Row>
                <Label>Concepto</Label>
                <Value>Producción libro 'Corazones en Llamas'</Value>
              </Row>
              <Row>
                <Label>Fecha</Label>
                <Value>17/1/2024</Value>
              </Row>
              <Row>
                <Label>Cantidad Utilizada</Label>
                <Value color="#dc2626">200 carátulas</Value>
              </Row>
              <Row>
                <Label>Documento</Label>
                <Value>PROD-001</Value>
              </Row>
            </Card>

            {/* Libros Producidos */}
            <Card>
              <SectionTitle>Libros Producidos</SectionTitle>
              <Row>
                <Label>Título</Label>
                <Value>Corazones en Llamas</Value>
              </Row>
              <Row>
                <Label>ISBN</Label>
                <Value>978-84-123-4567-8</Value>
              </Row>
              <Row>
                <Label>Cantidad</Label>
                <Value color="#059669">200 libros</Value>
              </Row>
              <Row>
                <Label>Estado</Label>
                <Badge type="success">terminado</Badge>
              </Row>
            </Card>

          </ModalContainer>
        </ModalOverlay>
      )}
    </div>
  );
}
