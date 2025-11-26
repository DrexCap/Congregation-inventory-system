import { useState, useEffect } from "react";
import styled from "styled-components";
import { Progress } from "@base-ui-components/react/progress";

const ProgressRoot = styled(Progress.Root)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.25rem;
  grid-row-gap: 0.5rem;
  width: 8rem;
`;

const Label = styled(Progress.Label)`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #1f2937;
`;

const Value = styled(Progress.Value)`
  grid-column-start: 2;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #1f2937;
  text-align: right;
`;

const Track = styled(Progress.Track)`
  grid-column: 1 / 3;
  overflow: hidden;
  background-color: #ffd289;
  box-shadow: inset 0 0 0 1px #a0978b;
  height: 0.35rem;
  border-radius: 0.25rem;
`;

const Indicator = styled(Progress.Indicator)`
  display: block;
  background-color: #F48120;
  transition: width 500ms;
`;

export const ExampleProgress = () => {
  const [value, setValue] = useState(20);

  // Simula cambios del progreso cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) => Math.min(100, Math.round(current + Math.random() * 25)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ProgressRoot value={value}>
      <Label>Progreso</Label>
      <Value>{value}%</Value>
      <Track>
        <Indicator />
      </Track>
    </ProgressRoot>
  );
}
