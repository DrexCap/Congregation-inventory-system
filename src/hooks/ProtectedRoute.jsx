
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const ProtectedRoute = ({children, accessBy}) => {
    const {user} = UserAuth();
    if( accessBy === "non-authenticated"){
        if(!user) {
            return children;
        } else {
            return <Navigate to="/" />
        }
    } else if(accessBy === "authenticated") {
        if(user) {
            return children;
        }
    }

    return <Navigate to="/login" />

    // if(user==null) return <Navigate to="/login" replace/>
    // TODO: Muestra todos los elementos en caso que los children no se esten viendo o cargando la data
    // O va esperar a que reaccione los hijos y evita mostrar pantallas blancas
    // return children?children:<Outlet/>;
}