import {ContarUsuariosXEmpresa, MostrarEmpresa} from "../index";
import { create } from "zustand";

export const useEmpresaStore = create((set,get)=>({
    dataEmpresa: [],
    mostrarEmpresa: async(p) => {
        const response = await MostrarEmpresa(p);
        set({ dataEmpresa: response.empresa })
        return response.empresa;
    },
    nroUsuarios: 0,
    nroUsuariosXEmpresa: async(p) => {
        const response = await ContarUsuariosXEmpresa(p);
        set({ nroUsuarios: response });
        return response;
    }
}));