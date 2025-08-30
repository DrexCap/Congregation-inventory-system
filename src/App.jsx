
import { createContext, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import styled, {ThemeProvider} from "styled-components";
import { AuthContextProvider, MyRoutes, Light, Dark } from "./index";

export const ThemeContext = createContext(null);

function App() {
    const [themeUse, setThemeUse] = useState("dark");
    const theme = themeUse==="light"?"light":"dark";
    const themeStyle = theme==="light"?Light:Dark;

    return (
    <>
        <ThemeContext.Provider value={{theme, setThemeUse}}>
            <ThemeProvider theme={themeStyle}>
                <AuthContextProvider>
                    <MyRoutes />
                    <ReactQueryDevtools initialIsOpen={true}/>
                </AuthContextProvider>
            </ThemeProvider>
        </ThemeContext.Provider>
    </>
  )
}

export default App
