import Swal from "sweetalert2";
import {ObtenerIdAuthSupabase, supabase} from "../index";

export const InsertarUsuarios = async(p) => {
    // TODO: El "maybeSingle()" retorna un simple objeto en lugar de un array
    const { data, error } =
        await supabase.from("usuario").insert(p).select().maybeSingle();

    console.log("InsertarUsuarios", data, error);
        
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al insertar usuarios "+error.message,
            // footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
    if ( data ) return data;
}

export const MostrarUsuarios = async () => {
    const idAuthSupabase = await ObtenerIdAuthSupabase();
    const { error, data} = await supabase.from("usuario").select()
        .eq("id_auth", idAuthSupabase).maybeSingle();
    if(data) return data;
}

// TODO: A partir de aqui se gestiona la informacion del personal
export const MostrarUsuarioTodo = async (p) => {
    const {error, data} = await supabase.rpc("mostrarpersonal", p);
    if(data) return data;
}

export const EliminarUsuario = async(p) => {
    const {error} = await supabase
        .from("usuario")
        .delete()
        .eq("id", p.id);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Error al eliminar el personal ",
            footer: '<a href="#">Elimine el personal</a>'
        });
    }
}

export const EditarUsuario = async(p) => {
    console.log("Entro EditarUsuario", p);
    const {error} = await supabase
        .from("usuario")
        .update(p).eq("id", p.id);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Error al editar la usuario "+p._descripcion,
            footer: '<a href="#">Edite al usuario o personal</a>'
        });
    }
}

export const BuscarUsuario = async(p) => {
    const {data} = await supabase.rpc("buscarpersonal", p);
    return data;
}

export const BuscarNombreUsuario = async(p) => {
    const {data} = await supabase.from("usuario")
        .select("nombres").eq("id_auth", p._id_auth);
    console.log("BuscarNombreUsuario", data);
    return data;
}

export const InsertarAsignaciones = async(p) => {
    const { data, error } =
        await supabase.from("asignar_empresa").insert(p);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al insertar asignaciones de usuarios."+error.message,
            // footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
    if ( data ) return data;
}

export const InsertarPermisos = async(p) => {

    const { data, error } =
        await supabase.from("permisos").insert(p);

    if (error) {
        alert("Error al editar Usuarios", error.message);
    }
    console.log(data);
    if ( data ) return data;
}

export const MostrarPermisos = async(p) => {
    const { data, error } =
        await supabase.from("permisos").select(
            `id, id_usuario, id_modulo, modulos(nombre)`
        ).eq("id_usuario", p.id_usuario);
    if ( data ) return data;
}

export async function EliminarPermisos(p) {
    const {error} = await supabase
        .from("permisos")
        .delete()
        .eq("id_usuario", p.id_usuario);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Error al eliminar los permisos ",
            footer: '<a href="#">Elimine la marca</a>'
        });
    }
}

export async function MostrarModulos() {
    const { data, error } =
        await supabase.from("modulos").select();
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al mostrar modulos "+error.message,
            // footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
    if ( data ) return data;
}

