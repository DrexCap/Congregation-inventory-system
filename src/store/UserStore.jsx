import {
    MostrarUsuarios,
    supabase,
    DataModulosConfiguracion,
    DataSubModuloProductos,
    InsertarUsuarios,
    MostrarUsuarioTodo,
    MostrarModulos,
    EliminarUsuario,
    EditarUsuario, BuscarUsuario, InsertarAsignaciones, InsertarPermisos,
    MostrarPermisos,
    EliminarPermisos,
    BuscarNombreUsuario
} from "../index";
import { create } from "zustand";

export const useUserStore = create((set,get)=>({
    insertarUsuarioAdmin: async(p)=> {
        const { data, error } = await supabase.auth.signUp({
            email: p.correo,
            password: p.pass
        });
        if (error) return null;
        const dataUser = await InsertarUsuarios({
            id_auth: data.user.id,
            fecha_registro: new Date(),
            tipo_user: p.tipo_user
        })
        return dataUser;
    },
    idusuario: 0,
    mostrarUsuarios: async() => {
        const response = await MostrarUsuarios();
        set({idusuario: response.id})
        return response;
    },
    buscador: "",
    setBuscador: (p) => {
        set({buscador: p})
    },
    usuarioItemSelect: [],
    selectUsuario: (p) => {
        set({usuarioItemSelect: p})
    },
    parametros: {}, //TODO: Aquí se pone el id_empresa del usuario logueado
    dataUsuario: [],
    mostrarUsuariosTodos: async(p) => { // TODO: El parametro es el id_empresa
        const response = await MostrarUsuarioTodo(p);
        set({parametros: p});
        set({dataUsuario: response});
        set({usuarioItemSelect: response[0]});
        return response;
    },
    insertarUsuarios: async(parametrosAuth, p, datacheckpermisos) => {
        const {data, error} = await supabase.auth.signUp({
            email: parametrosAuth.correo,
            password: parametrosAuth.pass
        });
        if(error) return null;
        const dataUser = await InsertarUsuarios({
            nombres: p.nombres,
            nro_doc: p.nro_doc,
            telefono: p.telefono,
            direccion: p.direccion,
            correo: p.correo,
            fecha_registro: new Date(),
            estado: "activo",
            id_auth: data.user.id,
            tipo_user: p.tipo_user,
            tipo_doc: p.tipo_doc
        });
        await InsertarAsignaciones({
            id_usuario: dataUser.id,
            id_empresa: p.id_empresa
        });
        datacheckpermisos.forEach(async (element) => {
            if(element.check) {
                let parametrosPermisos = {
                    id_usuario: dataUser.id,
                    id_modulo: element.id
                };
                await InsertarPermisos(parametrosPermisos);
            }
        });
        await supabase.auth.signOut();
    },
    eliminarUsuario: async(p) => {
        await EliminarUsuario(p);
        const { mostrarUsuariosTodos, parametros} = get();
        set( mostrarUsuariosTodos(parametros));
    },
    editarUsuario: async(p, datacheckpermisos, idempresa) => {
        await EditarUsuario(p);
        await EliminarPermisos({ id_usuario: p.id });
        datacheckpermisos.forEach(async (item) => {
            if (item.check) {
                let parametrospermisos = {
                    id_usuario: p.id,
                    id_modulo: item.id,
                };
                await InsertarPermisos(parametrospermisos);
            }
        });
        const { mostrarUsuariosTodos } = get();
        set(mostrarUsuariosTodos({ _id_empresa: idempresa }));
    },
    buscarUsuario: async(p) => {
        const response = await BuscarUsuario(p);
        set({dataUsuario: response});
        return response;
    },
    dataUsuarioNombre: JSON.parse(localStorage.getItem("nombreUsuario")) || [],
    buscarNombreUsuario: async (p) => {
        const response = await BuscarNombreUsuario(p);
        set({ dataUsuarioNombre: response });
        localStorage.setItem("nombreUsuario", JSON.stringify(response));
        return response;
    },
    dataModulos: [],
    mostrarModulos: async() => {
        const response = await MostrarModulos();
        set({dataModulos: response});
        return response;
    },
    dataPermisos: [],
    kardexPermiso: JSON.parse(localStorage.getItem("kardexPermisoCache")) ?? false,
    usuarioPermiso: JSON.parse(localStorage.getItem("usuarioPermisoCache")) ?? false,
    productoPermiso: JSON.parse(localStorage.getItem("productoPermisoCache")) ?? false,
    empresaPermiso: JSON.parse(localStorage.getItem("empresaPermisoCache")) ?? false,
    categoriaPermiso: JSON.parse(localStorage.getItem("categoriaPermisoCache")) ?? false,
    marcaPermiso: JSON.parse(localStorage.getItem("marcaPermisoCache")) ?? false,
    mostrarPermisos: async (p) => {
        const response = await MostrarPermisos(p);
        set({ dataPermisos: response });
        const statePermisoKardex = response.some((objeto)=> objeto.modulos.nombre.includes("Kardex"));
        const statePermisoUsuario = response.some((objeto)=> objeto.modulos.nombre.includes("Personal"));
        const statePermisoProducto = response.some((objeto)=> objeto.modulos.nombre.includes("Productos"));
        const statePermisoEmpresa = response.some((objeto)=> objeto.modulos.nombre.includes("Tu empresa"));
        const statePermisoCategoria = response.some((objeto)=> objeto.modulos.nombre.includes("Categoria de productos"));
        const statePermisoMarca = response.some((objeto)=> objeto.modulos.nombre.includes("Marca de productos"));
        localStorage.setItem("kardexPermisoCache", JSON.stringify(statePermisoKardex));
        localStorage.setItem("usuarioPermisoCache", JSON.stringify(statePermisoUsuario));
        localStorage.setItem("productoPermisoCache", JSON.stringify(statePermisoProducto));
        localStorage.setItem("empresaPermisoCache", JSON.stringify(statePermisoEmpresa));
        localStorage.setItem("categoriaPermisoCache", JSON.stringify(statePermisoCategoria));
        localStorage.setItem("marcaPermisoCache", JSON.stringify(statePermisoMarca));
        set({ kardexPermiso: statePermisoKardex });
        set({ usuarioPermiso: statePermisoUsuario });
        set({ productoPermiso: statePermisoProducto });
        set({ empresaPermiso: statePermisoEmpresa });
        set({ categoriaPermiso: statePermisoCategoria });
        set({ marcaPermiso: statePermisoMarca });
                
        let allDocs = [];
        DataModulosConfiguracion.map((element) => {
            const statePermiso = response.some((objeto) =>
                objeto.modulos.nombre.includes(element.title)
            );
            if(statePermiso) {
                allDocs.push({...element,state:true})
            } else {
                allDocs.push({...element,state:false})
            }
        });
        DataModulosConfiguracion.splice(0,DataModulosConfiguracion.length)
        DataModulosConfiguracion.push(...allDocs)

        let allSubDocs = [];
        DataSubModuloProductos.map((element) => {
            const statePermiso = response.some((objeto) =>
                objeto.modulos.nombre.includes(element.title)
            );
            if(statePermiso) {
                allSubDocs.push({...element,state:true})
            } else {
                allSubDocs.push({...element,state:false})
            }
        });
        DataSubModuloProductos.splice(0,DataSubModuloProductos.length)
        DataSubModuloProductos.push(...allSubDocs)
        console.log({DataModulosConfiguracion,DataSubModuloProductos});

        return response;
    },
    dataPermisosEdit: [],
    mostrarPermisosEdit: async(p) => {
        const response = await MostrarPermisos(p);
        set({dataPermisosEdit: response});
        return response;
    },
}));