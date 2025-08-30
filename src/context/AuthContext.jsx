
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../index.js";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        // TODO: Se le nombre de data a "authListener" para identificar de mejor manera a data
        const {data:authListener} = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if(session?.user==null) {
                    setUser(null);
                } else {
                    setUser(session?.user);
                }
            }
        )
        return () => {
            authListener.subscription;
        };
    }, []);

    return (
        <AuthContext.Provider value={{user}} >
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}
