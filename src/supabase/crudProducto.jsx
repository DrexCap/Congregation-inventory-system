
import { supabase } from "../index";
import Swal from "sweetalert2";

const tabla = "producto";

export const InsertarProducto = async(p) => {
    try {
        const { error } = await supabase.rpc("insertarproducto", p);
        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ya existe un registro con el producto " + p._descripcion,
                footer: '<a href="">Agregue una nueva descripcion</a>',
            });
        }
    } catch (error) {}
}

export const MostrarProducto = async(p) => {
    try {
        const {data} = await supabase.rpc("mostrarproductos", p);
        console.log(data);
        return data;
    } catch (error) {}
}

export const EliminarProducto = async(p) => {
    const {error} = await supabase
        .from("producto")
        .delete()
        .eq("id", p.id);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Error al eliminar el producto: "+p._descripcion,
            footer: `<a href="#">${error.error_description} || ${error.message} eliminar productos</a>`
        });
    }
}

export const EditarProducto = async(p) => {
    const {error} = await supabase
        .from(tabla)
        .update(p).eq("id", p.id);
    if(error) {
        Swal.fire({
            icon: "error",
            title: "Oops "+error.message,
            text: "Error al editar el producto "+p._descripcion,
            footer: `<a href="#">${error.error_description} || ${error.message} editar productos</a>`
        });
    }
}
 
export const BuscarProducto = async(p) => {
    try {
        const {data} = await supabase.rpc("buscarproductos", p);
        console.log("BuscarProducto", {data});

        return data;        
    } catch (error) {}
}

// REPORTES
export const ReportStockProductoTodos = async(p) => {
    const {data, error} = await supabase.from(tabla)
        .select().eq("id_empresa", p.id_empresa);
    if(error) {
        return;
    }
    return data;
}

export const ReportStockXProducto = async(p) => {
    const {data, error} = await supabase.from(tabla)
        .select().eq("id_empresa", p.id_empresa).eq("id", p.id);
    if(error) {
        return;
    }
    return data;
}

export const ReportStockBajoMinimo = async(p) => {
    const {data, error} = await supabase.rpc("reportproductosbajominimo", p);
    console.log({data});
    if(error) {
        return;
    }
    return data;
}

export const ReportKardexEntradaSalida = async(p) => {
    const {data, error} = await supabase.rpc("mostrarreportekardex", p);
    if(error) {
        return;
    }
    return data;
}

export const ReportInventarioValorado = async(p) => {
    const {data, error} = await supabase.rpc("inventariovalorado", p);
    if(error) {
        return;
    }
    return data;
}


