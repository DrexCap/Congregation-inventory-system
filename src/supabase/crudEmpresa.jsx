import Swal from "sweetalert2";
import {supabase} from "../index";

export const MostrarEmpresa = async (p) => {
    const { error, data} = await supabase
        .from("asignar_empresa").select(`
            empresa(id,nombre,simbolo_moneda)
        `)
        .eq("id_usuario", p.idusuario).maybeSingle();
    if(data) return data;
}

export const ContarUsuariosXEmpresa = async (p) => {
    const { data, error } = await supabase.rpc("contar_usuarios_por_empresa",
        {_id_empresa: p.id_empresa});
    if(data) return data;
}