
import   { supabase } from "../index";
import Swal from "sweetalert2";

export const InsertarTrazaHojas = async(p) => {
  console.log("INSERTAR TRAZA HOJA: ", {p});
  const {error} = await supabase.from("traza_prod_hoja").insert(p);
  if(error) {
    Swal.fire({
      icon: "error",
      title: "Oops "+error.message,
      text: "Ya existe un registro con "+JSON.stringify(p),
      footer: '<a href="#">Agregue una nueva descripcion</a>'
    });
  }
}

export const ActualizarTrazaHojas = async(p) => {
  console.log("ACTUALIZAR TRAZA HOJA: ", {p});
  const {error} = await supabase.from("traza_prod_hoja").update(p)
    .eq("proceso", p.proceso).eq("id_empresa", p.id_empresa).eq("cod_lote", p.cod_lote);
  if(error) {
    Swal.fire({
      icon: "error",
      title: "Oops "+error.message,
      text: "No se pudo actualizar la traza de hojas con el lote "+JSON.stringify(p.cod_lote),
      footer: '<a href="#">Agregue una nueva descripcion</a>'
    });
  }
}

export const ExtraerProceso1TrazaHojas = async(p) => {
  console.log("EXTRAER TRAZA PROCESO 1: ", {p});
  const {data, error} = await supabase.from("traza_prod_hoja").select("*")
    .eq("cod_lote", p.cod_lote).eq("id_empresa", p.id_empresa).eq("proceso", 1);

  if(error) {
    Swal.fire({
      icon: "error",
      title: "Oops "+error.message,
      text: "No se pudo extraer la traza de la hoja con el lote "+p.cod_lote,
      footer: '<a href="#">Intente de nuevo</a>'
    });
  }
  console.log("EXTRAER TRAZA PROCESO DATA: ", {data});
  return data;
}