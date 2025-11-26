import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Ingreso / recepción del lote',
    description:
      'Registro de la recepción del lote de hojas o materiales en el sistema, verificando cantidad, estado y responsable antes de su ingreso a almacén o línea de producción.',
  },
  {
    label: 'Asignación de impresora / máquina',
    description:
      'Designación de la impresora, máquina o línea de producción donde se procesará el lote, vinculando operador, turno y parámetros de impresión.',
  },
  {
    label: 'Chequeo de insumos',
    description:
      'Verificación de insumos necesarios (tinta, planchas, papel, solventes, etc.) asegurando que estén disponibles, en buen estado y correctamente configurados para la orden.',
  },
  {
    label: 'Ejecución de impresión',
    description:
      'Inicio del proceso de impresión según las especificaciones técnicas del trabajo. Se registran tiempos, incidencias y consumo real de materiales.',
  },
  {
    label: 'Control de calidad',
    description:
      'Revisión del resultado impreso mediante muestreo o control visual. Se valida color, registro, densidad y alineación antes de autorizar el siguiente paso.',
  },
  {
    label: 'Entrega a encuadernación',
    description:
      'Traslado del material impreso al área de encuadernación o acabado, registrando cantidad entregada, operador responsable y hora de transferencia.',
  },
  {
    label: 'Finalización y control global',
    description:
      'Cierre del proceso de impresión con el registro de resultados finales, consumo total de insumos y confirmación de trazabilidad completa del lote.',
  },
];

export const TimeLine = ({ setPasos }) => {
  
  const [activeStep, setActiveStep] = useState(0);

  // 🔹 Cada vez que cambie el paso, avisamos al padre
  useEffect(() => {
    if (setPasos) {
      setPasos(activeStep); // envía el índice actual (0, 1, 2, ...)
    }
  }, [activeStep, setPasos]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box 
      sx={{ 
        maxWidth: 400,
        textAlign: "left",
        "& .MuiStepLabel-label": { textAlign: "left" },
        "& .MuiStepContent-root": { textAlign: "left" },
        "& .MuiTypography-root": { textAlign: "left" },
        "& .MuiStepLabel-labelContainer": { textAlign: "left" }, 
      }}
    >
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: "0.9rem",
                  fontWeight: "bold !important", // 👈 fuerza negrita SIEMPRE
                  color: "#474747 !important", // 👈 evita que el color del estado la modifique
                },
              }}
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Último Paso</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography
                variant="subtitle2" 
                sx={{ mb: 1, textAlign: "left", color: "#555" }}
              >
                {step.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                </Button>

                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Anterior
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
