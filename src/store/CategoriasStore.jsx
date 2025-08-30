
import { create } from "zustand";
import {
    BuscarCategorias,
    EditarCategorias,
    EliminarCategorias,
    InsertarCategorias,
    MostrarCategorias
} from "../index";

export const useCategoriasStore = create((set, get)=>({
    buscador: "",
    setBuscador: (p) => {
        set({buscador: p})
    },
    dataCategorias: [],
    categoriasItemSelect: [],
    parametros: {},
    mostrarCategorias: async(p) => {
        const response = await MostrarCategorias(p);
        set({parametros: p});
        set({dataCategorias: response});
        set({categoriasItemSelect: response[0]});
        return response;
    },
    selectCategorias: (p) => {
        set({categoriasItemSelect: p})
    },
    insertarCategorias: async(p) => {
        await InsertarCategorias(p);
        const {mostrarCategorias} = get();
        const {parametros} = get();
        set(mostrarCategorias(parametros));
    },
    eliminarCategorias: async(p) => {
        await EliminarCategorias(p);
        const {mostrarCategorias} = get();
        const {parametros} = get();
        set(mostrarCategorias(parametros));
    },
    editarCategorias: async (p) => {
        await EditarCategorias(p);
        const { mostrarCategorias } = get();
        const { parametros } = get();
        set(mostrarCategorias(parametros));
    },
    buscarCategorias: async(p) => {
        const response = await BuscarCategorias(p);
        set({dataCategorias: response});
        return response;
    }
}))