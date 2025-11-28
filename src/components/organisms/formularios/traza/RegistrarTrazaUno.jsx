
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { FileOutput } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Upload } from "../../../animate-ui/icons/upload";
import Swal from "sweetalert2";
import { 
  InputText, 
  useUserStore, 
  useEmpresaStore, 
  RadioCards, 
  UploadFile, 
  useTrazaProdHojaStore,
  Btnsave,
  supabase
} from "../../../../index";
import { v } from "../../../../styles/variables";
import ReactDOMServer from "react-dom/server";
import { useQuery } from "@tanstack/react-query";


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

const DashedGridBackgroundRegistro = styled.div`
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

export const RegistrarTrazaUno = ({ setEstadoColor, estadoColor, code_lote, recargar }) => {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [isSetHovered, setHovered] = useState(null);
  
  const [fecha, setFecha] = useState("");
  
  const [estados, setEstados] = useState(false)
  
  const { mostrarUsuarios } = useUserStore()
  const { dataEmpresa } = useEmpresaStore();
  const { insertarTrazaHojas, extraerProcesosTrazaHojas, actualizarTrazaHojas } = useTrazaProdHojaStore();

  const [paso, setPaso] = useState({
    id_empresa: dataEmpresa?.id,
    cod_lote: code_lote,
    proceso: 1,
    fecha: "",
    estado_proceso: "",
    observaciones: "",
    evidencia: "",
    evidencia_public_id: ""
  })

  const { data: dataTrazaProdHoja } = useQuery({
    queryKey: ["Extraer Procesos Traza Hojas", dataEmpresa?.id, code_lote],
    queryFn: () =>
      extraerProcesosTrazaHojas({
        id_empresa: dataEmpresa?.id,
        cod_lote: code_lote,
      }),
    enabled: !!dataEmpresa?.id && !!code_lote,
    staleTime: 0,
  });

  const { control, handleSubmit, register, formState: { errors }, clearErrors, trigger, reset, setValue } =
  useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldUnregister: true,
    defaultValues: { detalle: "" }
  });

  const deleteImage = async (publicId) => {
    const { data, error } = await supabase.functions.invoke("delete-cloudinary", {
      body: { public_id: publicId },
    });

    if (error) {
      console.error("Error eliminando imagen:", error);
      return null;
    }

    console.log("Respuesta Cloudinary:", data);
    return data;
  };

  const dataUser = JSON.parse(localStorage.getItem("nombreUsuario"));

  // Para cargar las imagenes
  const [fileLista, setFileLista] = useState([]);

  async function insertar(data) {    
    setLoading(true); // 🔒 desactiva botón

    let dataImg;
    if(data.evidencia) {
      // Preparando la data para subir a Cloudinary
      const fileList = data.evidencia || [];
      const file = fileList[0].originFileObj;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "imagenes_evidencia");
      // opcionalmente agregar carpeta dinámica:
      formData.append("folder", `Evidencia Inventario/${dataEmpresa?.id}`);
      // Envío de la imagen a Cloudinary 
      const res = await fetch("https://api.cloudinary.com/v1_1/dfcnotc0f/image/upload", {
        method: "POST",
        body: formData,
      });
      // Extraer la url
      dataImg = await res.json();
    } 

    try {
      const isObservado = estadoColor === "Observado / Detenido";
      const p = {
        id_empresa: dataEmpresa?.id,
        cod_lote: code_lote,
        proceso: 1,
        responsable: dataUser?.[0]?.nombres,
        fecha,
        estado_proceso: estadoColor,
        ...(isObservado
          ? {
              observaciones: data?.detalle?.trim() || null,
              evidencia: dataImg?.secure_url || null,
            }
          : {
              observaciones: null,
              evidencia: null,
            }
        ),
        evidencia_public_id : dataImg?.public_id || null
      };

      if(actualizar) {        
        await actualizarTrazaHojas(p);
        await deleteImage(JSON.parse(localStorage.getItem(`traza_${code_lote}-${p.proceso}`)).evidencia_public_id); 
        recargar();
      } else {
        await insertarTrazaHojas(p);
        setActualizar(true);
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1600);

      localStorage.setItem(`traza_${code_lote}-${p.proceso}`, JSON.stringify(p));

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops "+error.message,
        text: "HUBO ALGUN PROBLEMA",
      });
    } finally {
      setLoading(false); // 🔓 vuelve a habilitar
    }    
  }

  // TODO: Para controlar el Loading de la subida de la imagen
  const [loadingUpload, setLoadingUpload] = useState(false);
  const getRandomNumber = () => {
    return Math.floor(Math.random() * (1200 - 900 + 1)) + 900;
  };

  const [actualizar, setActualizar] = useState(false);

  useEffect(() => {
    const ahora = new Date();
    const dia = ahora.getDate().toString().padStart(2, "0");
    const mes = (ahora.getMonth() + 1).toString().padStart(2, "0");
    const anio = ahora.getFullYear();
    setFecha(`${dia}/${mes}/${anio}`);
    if (!estados) clearErrors("detalle");

    (JSON.parse(localStorage.getItem(`traza_${code_lote}-${paso.proceso}`)) && (Array.isArray(dataTrazaProdHoja) && dataTrazaProdHoja.length > 0)) 
      && setActualizar(true);
    
    setEstadoColor("Completado");

    if(!JSON.parse(localStorage.getItem(`traza_${code_lote}-${paso.proceso}`)) && (Array.isArray(dataTrazaProdHoja) && dataTrazaProdHoja.length > 0)) {
      const p = {
        id_empresa: dataTrazaProdHoja[0].id_empresa,
        cod_lote: dataTrazaProdHoja[0].cod_lote,
        proceso: dataTrazaProdHoja[0].proceso,
        responsable: dataTrazaProdHoja[0].responsable,
        evidencia_public_id: dataTrazaProdHoja[0].evidencia_public_id,        
        fecha: dataTrazaProdHoja[0].fecha,
        estado_proceso: dataTrazaProdHoja[0].estado_proceso,
        observaciones: dataTrazaProdHoja[0].observaciones,
        evidencia: dataTrazaProdHoja[0].evidencia,
      };
      localStorage.setItem(`traza_${code_lote}-${p.proceso}`, JSON.stringify(p));      
      recargar();
    } else {
      const dataLocal = JSON.parse(localStorage.getItem(`traza_${code_lote}-${paso.proceso}`));
  
      // 👉 Solo si existe algo guardado en localStorage
      if (dataLocal && Object.keys(dataLocal).length > 0) {

        dataLocal.evidencia && setLoadingUpload(true);   // ⬅️ antes de reconstruir

        // reconstruir fileLista
        if (dataLocal.evidencia) {
          const file = {
            uid: "-1",
            name: "evidencia.jpg",
            status: "done",
            url: dataLocal.evidencia,
          };

          setTimeout(() => {
            setFileLista([file]);   // ⬅️ aquí recién mandas la imagen
            setLoadingUpload(false); // ⬅️ loading termina
          }, getRandomNumber()); // tiempo que tú quieras

          setValue("evidencia", [file]); // No tengo idea para que es esta linea
        }

        const nombreLogueadoCache = JSON.parse(localStorage.getItem("nombreUsuario"));

        reset({
          responsable: dataLocal.responsable !== nombreLogueadoCache[0].nombres ? 
            `${dataLocal.responsable}   --->   ${nombreLogueadoCache[0].nombres}` : dataLocal.responsable,
          fecha: dataLocal.fecha,
          estadoProceso: dataLocal.estado_proceso,
          detalle: dataLocal.observaciones || "",
          evidencia: [] // se setea arriba correctamente
        });  
  
        // Para mostrar automáticamente textarea si corresponde
        setEstados(dataLocal.estado_proceso === "Observado / Detenido");
        // Para que el card se pinte
        setEstadoColor(dataLocal.estado_proceso);
      }
    }

  }, [dataTrazaProdHoja]);

  const colorHead = {
    "Pendiente": "#fcf8ea",            // Amarillo
    "Observado / Detenido": "#ffefea", // Rojo
    "Completado": "#ecffee",           // Verde
  };

  const colorIcon = {
    "Pendiente": "#ffc800",            // Amarillo
    "Observado / Detenido": "#e8572a", // Rojo
    "Completado": "#30C85B",           // Verde
  };

  const colorSeleccionado2 = colorHead[estadoColor] || "#ecffee"; // color por defecto

  const colorSeleccionado3 = colorIcon[estadoColor] || "#30C85B"; // color por defecto

  const handleFileChange = (newList) => {
    setFileLista(newList);
    setValue("evidencia", newList);    
  };



  return (
    <div
      style={{ flex: 1, display: "flex", flexDirection: "column" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          backgroundColor: colorSeleccionado2,
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
              <FileOutput size={22} color={colorSeleccionado3} />
            </motion.div>
            Registro de Recepción del Lote
          </div>
        </SectionTitle>
      </div>

      <Divider style={{ width: "calc(100% + 32px)", marginLeft: "-16px" }} />

      <DashedGridBackgroundRegistro>
        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <article>
              <InputText regis={true} icono={<v.iconoUserCheck size={22} />}>
                <input
                  disabled={true}
                  className="form__field"
                  defaultValue={dataUser?.[0]?.nombres}
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

            <Controller
              name="estadoProceso"
              control={control}
              rules={{ required: "Debe seleccionar un estado" }}
              render={({ field }) => (
                <div>
                  <RadioCards
                    value={field.value}
                    onChange={(val) => {
                      field.onChange(val);
                      setEstados(val === "Observado / Detenido");
                      setEstadoColor(val);
                      clearErrors("estadoProceso");
                      trigger("estadoProceso");
                    }}
                  />
                  {errors.estadoProceso && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#d32f2f",
                        marginTop: 4,
                      }}
                    >
                      {errors.estadoProceso.message}
                    </p>
                  )}
                </div>
              )}
            />

            <AnimatePresence>
              {estados && (
                <motion.div
                  key="animated-section"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 15,
                    justifyContent: "center",
                  }}
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
                            <p
                              style={{
                                fontSize: "13px",
                                color: "#d32f2f",
                                marginTop: 4,
                              }}
                            >
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
                      <Controller
                        name="evidencia"
                        control={control}
                        render={({ field }) => (
                          <UploadFile
                            value={fileLista}
                            onChange={handleFileChange}
                            loading={loadingUpload}
                          />
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="btnguardarContent">
              <Btnsave
                traza={true}
                actualizar={actualizar}
                icono="Enviar"
                titulo="Enviar"
                bgcolor="#ef552b"
                success={success}
                loading={loading}
              />              
            </div>
          </section>
        </form>
      </DashedGridBackgroundRegistro>
    </div>
  );
}