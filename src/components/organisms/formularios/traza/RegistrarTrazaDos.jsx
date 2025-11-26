
import { useState, useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { FileOutput } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Send } from "../../../animate-ui/icons/send";
import { Upload } from "../../../animate-ui/icons/upload";
import { InputText, useUserStore, useEmpresaStore, RadioCards, UploadFile } from "../../../../index";
import { v } from "../../../../styles/variables";
import { useQuery } from "@tanstack/react-query";

import Button from '@mui/material/Button';

const Card = styled.div`
  position: relative;
  background: #fafafa;
  border-radius: 10px;
  padding: 16px;
  margin: 12px 0;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  --card-border-color: ${({ color }) => color || "#19a92c"};

  &:hover {
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  /* Anillo animado */
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      var(--card-border-color) 90deg,
      transparent 180deg,
      var(--card-border-color) 270deg,
      transparent 360deg
    );
    animation: rotateClockwise 3s linear infinite;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 2px;
    background: #fafafa;
    border-radius: 8px;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  @keyframes rotateClockwise {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .formulario {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-grow: 1;
  }

  .formulario section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
  }

  .formulario .btnguardarContent {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    padding-top: 12px;
  }
`;

const SectionTitle = styled.h4`
  justify-content: space-between;
  display: flex;
  align-items: center;
  font-size: 15px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1.8px solid #e6e3e3;
  margin: 1rem 0;
`;

const DashedGridBackground = styled.div`
  position: relative;
  width: 100%;
  flex: 1; /* ✅ ocupa el espacio disponible */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: -16px;         
  padding-top: 16px;
  margin-bottom: -16px;         
  padding-bottom: 16px; 

  display: flex;
  flex-direction: column; /* ✅ permite empujar el botón al fondo */
  justify-content: space-between;
  padding-bottom: 16px; /* espacio visual inferior */

  /* Fondo de cuadrícula */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0; /* al fondo */
    background-image:
      linear-gradient(to right, #e7e5e4 1px, transparent 1px),
      linear-gradient(to bottom, #e7e5e4 1px, transparent 1px);
    background-size: 20px 20px;

    mask-image:
      repeating-linear-gradient(
        to right,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      repeating-linear-gradient(
        to bottom,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      );
    -webkit-mask-image:
      repeating-linear-gradient(
        to right,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      repeating-linear-gradient(
        to bottom,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      );

    mask-composite: intersect;
    -webkit-mask-composite: source-in;
  }

  /* Contenido encima */
  > * {
    position: relative;
    z-index: 1; /* asegura que todo lo interno esté sobre el fondo */
  }
`;

export const RegistrarTrazaDos = () => {

  const [isSetHovered, setHovered] = useState(null);
  const [fecha, setFecha] = useState("");

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { mostrarUsuarios } = useUserStore()
  const { dataEmpresa } = useEmpresaStore();

  const [isHovered, setIsHovered] = useState(false);

  const [estados, setEstados] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ["Mostrar Usuario Logueado "],
    queryFn: () => mostrarUsuarios(),
    enabled: dataEmpresa?.id != null,
    refetchOnWindowFocus: false, // evita que se dispare al cambiar de pestaña
    refetchOnReconnect: false, // evita refetch al reconectar internet
    refetchOnMount: false, // no vuelve a pedir datos si ya están en cache
    staleTime: Infinity,
  });

  // const { 
  //   control, 
  //   register, 
  //   handleSubmit, 
  //   formState: { errors, touchedFields }, 
  //   clearErrors, 
  //   watch, 
  // } = useForm();

  const { control, handleSubmit, register, formState: { errors }, clearErrors, watch } =
  useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldUnregister: true,
    defaultValues: { detalle: "" }
  });

  async function insertar(data) {
    console.log({ cod: data.codigo_interno });
  }

  useEffect(() => {
    const ahora = new Date();
    const dia = ahora.getDate().toString().padStart(2, "0");
    const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
    const anio = ahora.getFullYear();
    setFecha(`${dia}/${mes}/${anio}`);
    if (!estados) clearErrors("detalle");
  }, [estados, clearErrors]);

  return (
    <Card
      style={{ flex: 1, display: "flex", flexDirection: "column" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          backgroundColor: "#f3fff4",
          margin: "-15px -15px -15px -15px", // elimina padding lateral y superior del Card
          padding: "12px 16px", // espacio interno para el título y botón
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <SectionTitle style={{ cursor: "pointer" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#1a1a1a",
            }}
          >
            <motion.div
              animate={
                isSetHovered ? { scale: 1.1, y: -1 } : { scale: 1, y: 0 }
              }
              whileTap={{ scale: 0.9, y: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <FileOutput size={22} color="#30C85B" />
            </motion.div>
            Registro de Recepción del Lote
          </div>
        </SectionTitle>
      </div>

      <Divider style={{ width: "calc(100% + 32px)", marginLeft: "-16px" }} />

      <DashedGridBackground>  
        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <article>
              <InputText regis={true} icono={<v.iconoUserCheck size={22} />}>
                <input
                  disabled={true}
                  className="form__field"
                  defaultValue={data?.nombres}
                  type="text"
                  placeholder=""
                  {...register("responsable", {
                    required: false,
                  })}
                />
                <label className="form__label">Responsable</label>
              </InputText>
            </article>

            <article>
              <InputText regis={true} icono={<v.iconoCalendar1 size={22} />}>
                <input
                  disabled={true}
                  className="form__field"
                  defaultValue={fecha}
                  type="text"
                  placeholder=""
                  {...register("fecha", {
                    required: false,
                  })}
                />
                <label className="form__label">Fecha</label>
              </InputText>
            </article>

            <RadioCards setEstados={setEstados} />

            <AnimatePresence>
              {estados && (
                <motion.div
                  key="animated-section"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ display: "flex", flexDirection: "column", gap: 15, justifyContent: "center" }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  <Controller
                    name="detalle"
                    control={control}
                    rules={{ required: "Campo requerido" }}
                    render={({ field }) => (
                      <article>
                        <InputText regis={true} icono={<v.iconoTextArea />}>
                          <textarea
                            className="form__fielda"
                            type="text"
                            placeholder="Escribe las observaciones aquí"
                            {...field}
                          />
                          {errors.detalle && (
                            <p style={{ fontSize: "13px", color: "#d32f2f", marginTop: 4 }}>
                              {errors.detalle.message}
                            </p>
                          )}
                        </InputText>
                      </article>
                    )}
                  />
                  
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }} >
                    <Upload size={22} animateOnHover />
                    <div style={{ flex: 1 }}>
                      <UploadFile />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="btnguardarContent">
              <Button 
                type="submit"
                variant="contained" 
                startIcon={<Send size={14.5} animate={isHovered} />}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                GUARDAR
              </Button>
            </div>

          </section>
        </form>
      </DashedGridBackground>

    </Card>
  );
}