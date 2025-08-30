
import { createContext, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import styled, {ThemeProvider} from "styled-components";
import { AuthContextProvider, MyRoutes, Light, Dark } from "./index";
import { Device } from "./styles/breackpoints";

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

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${({theme})=>theme.bgtotal};
  .ContentSidebar {
    display: none;
  }
  .ContentMenuambur {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSidebar {
      display: initial;
    }
    .ContentMenuambur {
      display: none;
    }
  }
  .ContentRoutes {
    grid-column: 1;
    width: 100%;
    @media ${Device.tablet} {
      grid-column: 2;
    }
  }
`;

export default App
