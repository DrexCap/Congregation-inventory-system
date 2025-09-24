
import { create } from "zustand";
import {
    BuscarTipoSalida,
    MostrarTipoSalida
} from "../index";

export const useTipoSalidaStore = create((set, get)=>({
    buscador: "",
    setBuscador: (p) => {
        set({buscador: p})
    },
    dataTipoSalida: [],
    tipoSalidaItemSelect: [],
    parametros: {},
    mostrarTipoSalida: async(p) => {
      const response = await MostrarTipoSalida();
      set({parametros: p});
      set({dataTipoSalida: response});
      set({tipoSalidaItemSelect: response[0]});
      return response;
    },
    selectTipoSalida: (p) => {
      set({tipoSalidaItemSelect: p})
    },
    buscarTipoSalida: async(p) => {
      const response = await BuscarTipoSalida(p);
      set({dataTipoSalida: response});
      return response;
    }
}))