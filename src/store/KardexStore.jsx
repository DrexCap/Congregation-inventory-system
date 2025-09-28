
import { create } from "zustand";
import {
    BuscarKardex, 
    EditarKardex, 
    MostrarKardex, 
    EliminarKardex, 
    InsertarKardex, 
    MostrarDocumentoMovimientoCaratula,
    GenerarDocumentoMovimiento,
    VerificarDocMovimiento,
    GetdocKardex
} from "../index";

export const useKardexStore = create((set, get)=>({
    buscador: "",
    dataKardex: [], //TODO: Para presentar la información en la tabla Marca y su búsqueda
    kardexItemSelect: [], //TODO: Para seleccionar un registro de la tabla Marca
    parametros: {}, //TODO: Aquí se pone el id_empresa del usuario logueado
    selectKardex: (p) => {
        set({kardexItemSelect: p})
    },
    setBuscador: (p) => {
        set({buscador: p})
    },
    dataDocumentosCaratula: [],
    documentosCaratulaItemSelect: [],
    selectDocumentoCaratula: (p) => {
        set({documentosCaratulaItemSelect: p})
    },
    mostrarDocumentosMovimientoCaratula: async(p) => {
        const response = await MostrarDocumentoMovimientoCaratula(p);
        set({dataDocumentosCaratula: response});
        set({documentosCaratulaItemSelect: response[0]});
        return response;
    },
    getdocKardex: async(p) => {
        const response = await GetdocKardex(p);
        return response;
    },
    generarDocumentoMovimiento: async(p) => {
        const response = await GenerarDocumentoMovimiento(p);
        return response;
    },
    verificarDocMovimiento: async(p) => {
        const response = await VerificarDocMovimiento(p);
        return response;
    },
    mostrarKardex: async(p) => {
        const response = await MostrarKardex(p);
        set({parametros: p});
        set({dataKardex: response});
        set({kardexItemSelect: response[0]});
        return response;
    },
    insertarKardex: async(p) => {
        await InsertarKardex(p);
        const {mostrarKardex, parametros} = get();
        // const {parametros} = get();
        set(mostrarKardex(parametros));
    },
    eliminarKardex: async(p) => {
        await EliminarKardex(p);
        const {mostrarKardex, parametros} = get();
        set(mostrarKardex(parametros));
    },
    editarKardex: async (p) => {
        await EditarKardex(p);
        const { mostrarKardex, parametros } = get();
        set(mostrarKardex(parametros));
    },
    buscarKardex: async(p) => {
        const response = await BuscarKardex(p);
        set({dataKardex: response});
        return response;
    }
}))