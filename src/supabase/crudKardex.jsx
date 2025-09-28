
import   { supabase } from "../index";
import Swal from "sweetalert2";

let vari = 1;

export const InsertarKardex = async(p) => {
    console.log("INSERTAR KARDEX: ", {p});
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
    console.log("MOSTRAR KARDEX: ", p);
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

export const MostrarDocumentoMovimientoCaratula = async(p) => {
    const { data, error } = await supabase.from("kardex_caratula")
            .select("documento, cantidad").eq("id_empresa", p._id_empresa)
            .like("documento", "PROD-%") // Filtra los que empiezan con "PROD-"
            .order("id", { ascending: true });
    if(error) {
        return;
    }
    console.log("Mostrar Documento Movimiento Caratula ", {data});
    return data;
}

export const GenerarDocumentoMovimiento = async(p) => {
    const {data, error} = await supabase.rpc("generar_documento_movimiento", p)
    if(error) {
        return;
    }
    console.log("Generar Documento Movimiento Caratula ", {data});
    return data;
}

export const VerificarDocMovimiento = async(p) => {
    const { data, error } = await supabase.from("kardex_caratula")
        .select("documento").eq("id_empresa", p._id_empresa)
        .like("documento", p._documento);
    if(error) {
        return;
    }
    console.log("Mostrar Documento verificado: "+vari++, {data});
    return data;
}

// TODO: Para verificar si existe el documento y crear estilos en la tabla "Kardex suministro"
export const GetdocKardex = async (p) => {
    // 1) Traigo documentos de kardex
    const { data: docsKardex, error: er1 } = await supabase
        .from("kardex")
        .select("documento")
        .eq("id_empresa", p._id_empresa)
        .like("documento", "PROD-%");

    if (er1) throw new Error(er1.message);

    const documentos = docsKardex.map(d => d.documento);

    // 2) Consulto solo esos en kardex_caratula
    const { data: docsCaratula, error: er2 } = await supabase
        .from("kardex_caratula")
        .select("documento")
        .eq("id_empresa", p._id_empresa)
        .in("documento", documentos);

    if (er2) throw new Error(er2.message);

    // 3) Devuelvo como array (únicos)
    return [...new Set(docsCaratula.map(d => d.documento))];
};


// const { data: registroDoc, error: erKardex } = await supabase.from("kardex").select("documento")
    //             .eq("id_empresa", p._id_empresa)    
    //             .like("documento", "PROD-%");

    // if (erKardex) throw new Error(`Error al extraer documentos de 'Kardex': ${erKardex.message}`);

    // const documentos = registroDoc.map(r => r.documento);

    // const { data: docsCaratula, error: erKarCaratula } = await supabase.from("kardex_caratula").select("documento")
    //             .eq("id_empresa", p._id_empresa)   
    //             .in("documento", documentos);
    
    // if (erKarCaratula) throw new Error(`Error al extraer documentos de 'Kardex Caratula': ${erKarCaratula.message}`);

    // const docsSet = new Set(docsCaratula.map(d => d.documento));

    // return docsSet;