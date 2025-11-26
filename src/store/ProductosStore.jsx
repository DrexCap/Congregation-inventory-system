
import { create } from "zustand";
import {
    InsertarProducto,
    BuscarProducto,
    MostrarProducto,
    EliminarProducto,
    EditarProducto, ReportStockProductoTodos,
    ReportStockXProducto,
    ReportStockBajoMinimo, ReportKardexEntradaSalida,
    ReportInventarioValorado
} from "../index";

export const useProductosStore = create((set, get)=>({
    buscador: "",
    setBuscador: (p) => {
        set({buscador: p})
    },
    dataProducto: [],
    productoItemSelect: [],
    parametros: {},
    itemProductoCero: () => {
        set({productoItemSelect: []});
    },
    mostrarProducto: async(p) => {
        const response = await MostrarProducto(p);
        set({parametros: p});
        set({dataProducto: response});
        // const {itemProductoCero} = get();
        // set(itemProductoCero);
        // set({productoItemSelect: response[0]});
        set({ productoItemSelect: [] });
        return response;
    },
    selectProducto: (p) => {
        set({productoItemSelect: p})
    },
    insertarProducto: async(p) => {
        await InsertarProducto(p);
        const {mostrarProducto, parametros} = get();
        // const {parametros} = get();
        await mostrarProducto(parametros);
    },
    eliminarProducto: async(p) => {
        await EliminarProducto(p);
        const {mostrarProducto, parametros} = get();
        // const {parametros} = get();
        await mostrarProducto(parametros);
    },
    editarProducto: async (p) => {
        await EditarProducto(p);
        const {mostrarProducto, parametros} = get();
        // const { parametros } = get();
        await mostrarProducto(parametros);
    },
    buscarProducto: async(p) => {
        const response = await BuscarProducto(p);
        set({dataProducto: response});
        return response;
    },
    reportStockProductoTodos: async(p) => {
        const response = await ReportStockProductoTodos(p);
        return response;
    },
    reportStockXProducto: async(p) => {
        const response = await ReportStockXProducto(p);
        return response;
    },
    reportStockBajoMinimo: async(p) => {
        const response = await ReportStockBajoMinimo(p);
        return response;
    },
    reportKardexEntradaSalida: async(p) => {
        const response = await ReportKardexEntradaSalida(p);
        return response;
    },
    reportInventarioValorado: async(p) => {
        const response = await ReportInventarioValorado(p);
        return response;
    }
}))