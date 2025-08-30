
import   { supabase } from "../index";
import Swal from "sweetalert2";

export const InsertarKardex = async(p) => {
    console.log("INSERTAR KARDEX: ", p);
    const {error} = await supabase.from("kardex").insert(p);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Ya existe un registro con "+p._descripcion,
            footer: '<a href="#">Agregue una nueva descripcion</a>'
        });
    }
}

export const MostrarKardex = async(p) => {
    const {data} = await supabase.rpc("mostrarkardexempresa", p)
        .order("id", {ascending: false});
        console.log("INFORMACION DE KARDEX X EMPRESA: ", data);
    return data;
}

export const EliminarKardex = async(p) => {
    console.log("ELIMINAR KARDEX: ", p);  
    const {error} = await supabase
        .from("kardex")
        .delete()
        .eq("id", p.id);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Error al eliminar el kardex "+p._descripcion,
            footer: '<a href="#">Elimine la kardex</a>'
        });
    }
}

export const EditarKardex = async(p) => {
    const {error} = await supabase
        .from("kardex")
        .update(p).eq("id", p.id);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Error al editar la kardex "+p._descripcion,
            footer: '<a href="#">Edite la kardex</a>'
        });
    }
}

export const BuscarKardex = async(p) => {
    const { data } = await supabase
        .rpc("buscarkardexempresa", {
            _id_empresa: p._id_empresa,
            buscador: p.buscador,
        })
        .order("id", { ascending: false });
    return data;
}