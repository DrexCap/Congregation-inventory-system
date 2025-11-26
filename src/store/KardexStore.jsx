
import { create } from "zustand";
import {
    BuscarKardex, 
    EditarKardex, 
    MostrarKardex, 
    EliminarKardex, 
    InsertarKardex, 
    MostrarDocumentoMovimientoCaratula,
    GenerarDocumentoMovimiento,
    GenerarCodigoLote,
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
    generarCodigoLote: async(p) => {
        const response = await GenerarCodigoLote(p);
        return response;
    },
    verificarDocMovimiento: async(p) => {
        const response = await VerificarDocMovimiento(p);
        return response;
    },
    dataKardexCache: JSON.parse(localStorage.getItem("kardexCache")) || [],
    mostrarKardex: async(p) => {
        const response = await MostrarKardex(p);
        localStorage.setItem("kardexCache", JSON.stringify(response));
        set({
            parametros: p,
            dataKardex: Array.isArray(response) ? [...response] : [],
            dataKardexCache: Array.isArray(response) ? [...response] : [],
            kardexItemSelect: response?.[0] || null
        });
        return response;
    },
    insertarKardex: async(p) => {
        await InsertarKardex(p);
        const {mostrarKardex, parametros} = get();
        const response = await mostrarKardex(parametros);
        set({ 
            dataKardex: Array.isArray(response) ? [...response] : [],
            dataKardexCache: Array.isArray(response) ? [...response] : [],
            kardexItemSelect: response?.[0] || null, 
        });
    },
    eliminarKardex: async(p) => {
        await EliminarKardex(p);
        const {mostrarKardex, parametros} = get();
        const response = await mostrarKardex(parametros);
        set({ 
            dataKardexCache: Array.isArray(response) ? [...response] : [],
            dataKardex: Array.isArray(response) ? [...response] : [],
            kardexItemSelect: response?.[0] || null, 
        });
    },
    buscarKardex: async(p) => {
        const response = await BuscarKardex(p);
        // set({dataKardex: response});
        set({ 
            dataKardex: Array.isArray(response) ? [...response] : [],
            dataKardexCache: Array.isArray(response) ? [...response] : [],
        });
        return response;
    }
}))