import { useState } from "react";
import styled from "styled-components";
import {
  Popover,
  PopoverTrigger,
  PopoverClose,
  PopoverContent,
} from '@/components/animate-ui/components/radix/popover';
import { ClipboardList } from "../../components/animate-ui/icons/clipboard-list";

const Content = styled.div`
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 350px;
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 18.5px;
  font-weight: 600;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 15px;
  margin: 0;
  font-weight: 300;
`;

const Subtitle2 = styled.p`
  font-size: 15px;
  margin: 0;
  font-weight: 600;
`;

const Subtitle3 = styled.p`
  font-size: 15px;
  color: #666;
  margin: 0;
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
  width: 130px;

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

export const BtnPopover = ({ detalle, tipo, fechaInicio, fechaFin }) => { 

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ClipboardList size={17} animate={isHovered} />
          {tipo === "entrada" || tipo === "entradas" ? "Insumo" : "Suministro"}
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <Content>
            <div>
              <Title>DETALLE</Title>
              <Subtitle>
                {detalle}
                <br />
              </Subtitle>
              <Subtitle2>
                {fechaInicio && fechaFin && "Fecha Programada: "} 
              </Subtitle2>
              <Subtitle3>
                {fechaInicio && fechaFin && `${fechaInicio} al ${fechaFin}`}
              </Subtitle3>
            </div>
        </Content>
        {/* <PopoverClose>Close popover</PopoverClose> */}
      </PopoverContent>
    </Popover>
  )
}