
import { supabase } from "../index";
import Swal from "sweetalert2";

export const InsertarCategorias = async(p) => {
    const {error} = await supabase.rpc("insertarcategoria", p);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Ya existe un registro con "+p._descripcion,
            footer: '<a href="#">Agregue una nueva descripcion</a>'
        });
    }
}

export const MostrarCategorias = async(p) => {
    const {data} = await supabase.from("categoria")
        .select()
        .eq("id_empresa", p.id_empresa)
        .order("id", {ascending: true});
    return data;
}

export const EliminarCategorias = async(p) => {
    const {error} = await supabase
        .from("categoria")
        .delete()
        .eq("id", p.id);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Error al eliminar la categiria "+p._descripcion,
            footer: '<a href="#">Elimine la marca</a>'
        });
    }
}

export const EditarCategorias = async(p) => {
    const {error} = await supabase
        .from("categoria")
        .update(p).eq("id", p.id);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Error al editar la categoria "+p._descripcion,
            footer: '<a href="#">Edite la marca</a>'
        });
    }
}

export const BuscarCategorias = async(p) => {
    const {data} = await supabase.from("categoria")
        .select()
        .eq("id_empresa", p.id_empresa)
        .ilike("descripcion", "%"+p.descripcion+"%");
    return data;
}