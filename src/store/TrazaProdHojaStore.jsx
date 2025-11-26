
import { create } from "zustand";
import {
    InsertarTrazaHojas,
    ExtraerProceso1TrazaHojas,
    ActualizarTrazaHojas
} from "../index";

export const useTrazaProdHojaStore = create((set, get)=>({ 
    buscador: "",
    dataTrazaProdHoja1: [], 
    TrazaProdHojaItemSelect: [], 
    parametros: {}, 
    selectTazaProdHoja: (p) => {
        set({TrazaProdHojaItemSelect: p})
    },
    setBuscador: (p) => {
        set({buscador: p})
    },
    insertarTrazaHojas: async(p) => {
        await InsertarTrazaHojas(p);
    },
    extraerProcesosTrazaHojas: async(p) => {
        const data = await ExtraerProceso1TrazaHojas(p);
        set({dataTrazaProdHoja1: data})
        return data;
    },
    actualizarTrazaHojas: async(p) => {
        await ActualizarTrazaHojas(p);
    },
}))