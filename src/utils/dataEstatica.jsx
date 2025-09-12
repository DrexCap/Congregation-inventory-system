import { v } from "../styles/variables";

import {
    AiOutlineHome,
    AiOutlineSetting,
} from "react-icons/ai";

export const DesplegableUser = [
    {
        text: "Mi perfil",
        icono: <v.iconoUser/>,
        tipo: "miperfil",
    },
    {
        text: "Configuracion",
        icono: <v.iconoSettings/>,
        tipo: "configuracion",
    },
    {
        text: "Cerrar sesión",
        icono: <v.iconoCerrarSesion/>,
        tipo: "cerrarsesion",
    },
];

//data SIDEBAR
export const LinksArray = [
    {
        label: "Home",
        icon: <AiOutlineHome />,
        to: "/",
    },
    {
        label: "Kardex",
        icon: <v.iconocategorias />,
        to: "/kardex",
    },
    {
        label: "Reportes",
        icon: <v.iconoreportes />,
        to: "/reportes",
    },
];

export const SecondarylinksArray = [
    {
        label: "Configuración",
        icon: <AiOutlineSetting />,
        to: "/configurar",
    },
];

//temas
export const TemasData = [
    {
        icono: "🌞",
        descripcion: "light",
    },
    {
        icono: "🌚",
        descripcion: "dark",
    },
];

//TODO: Data submodulo configuracion
export const DataSubModuloProductos = [
    {
        title:"Suministros",
        subtitle:"Registra tus suminitros",
        icono:"https://i.ibb.co/PGcg03R4/suministros-sin-fondo-2.png",
        link:"/configurar/productos/suministros",
    },
    {
        title:"Caratulas",
        subtitle:"Registra tus caratulas",
        icono:"https://i.ibb.co/4Rjxy68b/caratulas-removebg-preview.png",
        link:"/configurar/productos/caratulas",
    },
    {
        title:"Libros",
        subtitle:"Registra tus libros",
        icono:"https://i.ibb.co/pBQ1gSfY/libros-sin-fondo.png",
        link:"/configurar/productos/libros",
    },
]

//data configuracion
export const DataModulosConfiguracion =[
    {
        title:"Productos",
        subtitle:"registra tus productos",
        icono:"https://i.ibb.co/85zJ6yG/caja-del-paquete.png",
        link:"/configurar/productos",
    },
    {
        title:"Personal",
        subtitle:"ten el control de tu personal",
        icono:"https://i.ibb.co/5vgZ0fX/hombre.png",
        link:"/configurar/usuarios",
    },
    {
        title:"Tu empresa",
        subtitle:"configura tus opciones básicas",
        icono:"https://i.ibb.co/x7mHPgm/administracion-de-empresas.png",
        link:"/configurar/empresa",
    },
    {
        title:"Categoria de productos",
        subtitle:"asigna categorias a tus productos",
        icono:"https://i.ibb.co/VYbMRLZ/categoria.png",
        link:"/configurar/categorias",
    },
    {
        title:"Marca de productos",
        subtitle:"gestiona tus marcas",
        icono:"https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png",
        link:"/configurar/marca",
    }
]

//tipo usuario
export const TipouserData = [
    {
        descripcion: "Empleado",
        icono: "🪖",
    },
    {
        descripcion: "Administrador",
        icono: "👑",
    },
];

//tipodoc
export const TipoDocData = [
    {
        descripcion: "Dni",
        icono: "🪖",
    },
    {
        descripcion: "Libreta electoral",
        icono: "👑",
    },
    {
        descripcion: "Otros",
        icono: "👑",
    },
];

export const gradientes = {
    red: "linear-gradient(to right, #ffcdd2, #f44336, #b71c1c)",
    yellow: "linear-gradient(to right, #fff9c4, #ffeb3b, #fbc02d)",
    green: "linear-gradient(to right, #a8e6a3, #4caf50, #087f23)",
};