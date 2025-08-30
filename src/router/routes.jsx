
import { Routes, Route } from "react-router-dom";

import {
    Configuracion,
    Home,
    Login, Marca,
    Categorias,
    ProtectedRoute,
    Kardex,
    Empresa,
    Productos,
    Usuarios,
    Reportes,Layout,
    StockActualTodos,
    StockActualPorProducto, StockBajoMinimo,
    KardexEntradaSalida, StockInventarioValorado
} from "../index";

export function MyRoutes() {

    return (
        <Routes>
            <Route path="/login" element={
                <ProtectedRoute accessBy="non-authenticated" >
                    <Login />
                </ProtectedRoute>
            }/>

            <Route path="/" element={
                <ProtectedRoute accessBy="authenticated" >
                    <Layout>
                        <Home />
                    </Layout>
                </ProtectedRoute>
            }/>

            {/*Configuraciones*/}
            <Route path="/configurar" element={
                <ProtectedRoute accessBy="authenticated" >
                    <Layout>
                        <Configuracion />
                    </Layout>
                </ProtectedRoute>
            }/>

            <Route path="/configurar/usuarios" element={
                <ProtectedRoute accessBy="authenticated" >
                    <Layout>
                        <Usuarios />
                    </Layout>
                </ProtectedRoute>
            }/>

            <Route path="/configurar/marca" element={
                <ProtectedRoute accessBy="authenticated" >
                    <Layout>
                        <Marca />
                    </Layout>
                </ProtectedRoute>
            }/>

            <Route path="/configurar/categorias" element={
                <ProtectedRoute accessBy="authenticated" >
                    <Layout>
                        <Categorias />
                    </Layout>
                </ProtectedRoute>
            }/>

            <Route path="/configurar/productos" element={
                <ProtectedRoute accessBy="authenticated" >
                    <Layout>
                        <Productos />
                    </Layout>
                </ProtectedRoute>
            }/>

            <Route path="/configurar/empresa" element={
                <ProtectedRoute accessBy="authenticated" >
                    <Layout>
                        <Empresa />
                    </Layout>
                </ProtectedRoute>
            }/>

            {/* Operaciones */}
            <Route path="/kardex" element={
                <ProtectedRoute accessBy="authenticated" >
                    <Layout>
                        <Kardex />
                    </Layout>
                </ProtectedRoute>
            }/>

            <Route path="/reportes" element={
                <ProtectedRoute accessBy="authenticated" >
                    <Layout>
                        <Reportes />
                    </Layout>
                </ProtectedRoute>
            }>
                <Route path="stock-actual-todos" element={<StockActualTodos />} />
                <Route path="stock-actual-por-producto" element={<StockActualPorProducto />} />
                <Route path="stock-bajo-minimo" element={<StockBajoMinimo />} />
                <Route path="kardex-entradas-salidas" element={<KardexEntradaSalida />} />
                <Route path="inventario-valorado" element={<StockInventarioValorado />} />
            </Route>

        </Routes>
    );
}
