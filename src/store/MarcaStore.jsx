
import { create } from "zustand";
import {BuscarMarca, EditarMarca, EliminarMarca, InsertarMarca, MostrarMarca} from "../index";

export const useMarcaStore = create((set, get)=>({
    buscador: "",
    dataMarca: [], //TODO: Para presentar la información en la tabla Marca y su búsqueda
    marcaItemSelect: [], //TODO: Para seleccionar un registro de la tabla Marca
    parametros: {}, //TODO: Aquí se pone el id_empresa del usuario logueado
    selectMarca: (p) => {
        set({marcaItemSelect: p})
    },
    setBuscador: (p) => {
        set({buscador: p})
    },
    mostrarMarca: async(p) => {
        const response = await MostrarMarca(p);
        set({parametros: p});
        set({dataMarca: response});
        set({marcaItemSelect: response[0]});
        return response;
    },
    insertarMarca: async(p) => {
        await InsertarMarca(p);
        const {mostrarMarca, parametros} = get();
        // const {parametros} = get();
        set(mostrarMarca(parametros));
    },
    eliminarMarca: async(p) => {
        await EliminarMarca(p);
        const {mostrarMarca, parametros} = get();
        set(mostrarMarca(parametros));
    },
    editarMarca: async (p) => {
        await EditarMarca(p);
        const { mostrarMarca, parametros } = get();
        set(mostrarMarca(parametros));
    },
    buscarMarca: async(p) => {
        const response = await BuscarMarca(p);
        set({dataMarca: response});
        return response;
    }
}))