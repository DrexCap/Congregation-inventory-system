
import { supabase } from "../index";
import Swal from "sweetalert2";

export const MostrarTipoSalida = async () => {
  const { data, error } = await supabase
    .from("tipo_salida")
    .select()
    .neq("movimiento", "Insumo") // ✅ excluye los registros con movimiento = 'Insumo'
    .order("id", { ascending: true });

  if (error) {
    console.error("Error al mostrar tipo de salida:", error);
    return [];
  }

  console.log("Mostrar Tipo Salida ", { data });
  return data;
};


export const BuscarTipoSalida = async(p) => {
    const {data} = await supabase.from("tipo_salida")
        .select()
        .ilike("movimiento", "%"+p.movimiento+"%");
    console.log("Buscar Tipo Salida ", {data});
    return data;
}