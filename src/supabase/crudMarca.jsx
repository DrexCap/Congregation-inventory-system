
import   { supabase } from "../index";
import Swal from "sweetalert2";
let i = 0;
let ix = 0;

export const InsertarMarca = async(p) => {
    const {error} = await supabase.rpc("insertarmarca", p);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Ya existe un registro con "+p._descripcion,
            footer: '<a href="#">Agregue una nueva descripcion</a>'
        });
    }
}

export const MostrarMarca = async(p) => {
    const {data} = await supabase.from("marca")
        .select()
        .eq("id_empresa", p.id_empresa)
        .order("id", {ascending: true});
    console.log("MostrarMarca ", i++);
    console.log(data);
    return data;
}

export const EliminarMarca = async(p) => {
    const {error} = await supabase
        .from("marca")
        .delete()
        .eq("id", p.id);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Error al eliminar la marca "+p._descripcion,
            footer: '<a href="#">Elimine la marca</a>'
        });
    }
}

export const EditarMarca = async(p) => {
    const {error} = await supabase
        .from("marca")
        .update(p).eq("id", p.id);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Error al editar la marca "+p._descripcion,
            footer: '<a href="#">Edite la marca</a>'
        });
    }
}

export const BuscarMarca = async(p) => {
    const {data} = await supabase.from("marca")
        .select()
        .eq("id_empresa", p.id_empresa)
        .ilike("descripcion", "%"+p.descripcion+"%");
    console.log("BuscarMarca ", ix++);
    console.log(data);
    return data;
}