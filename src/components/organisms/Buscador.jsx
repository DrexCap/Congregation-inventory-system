import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// import {FaSearch} from "react-icons/fa";
import { PackageSearch } from "lucide-react";

export const Buscador = ({setBuscador, onFocus, funcion, 
                            buscarProducto=false, setEspacioAbajoElem=null, setAnchoSelector}) => {

    const [inputText, setInputText] = useState(false);
                                
    const cajaRef = useRef(null);

    useEffect(() => {
        if (cajaRef.current) {
            const bottom = cajaRef.current.getBoundingClientRect().bottom;
            if (typeof setAnchoSelector === "function") {
                setAnchoSelector(cajaRef.current.offsetWidth);
            }
            if(setEspacioAbajoElem) { setEspacioAbajoElem(bottom); }
        }

        function handleClickOutside(event) {
            // Verificamos que el click NO haya sido dentro del contenedor
            if (cajaRef.current && !cajaRef.current.contains(event.target)) {
                setInputText(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const buscar = (e) => {
        setBuscador(e.target.value);
    }

    const buscar2 = (e) => {
        const value = e.target.value.trim(); // ❌ elimina espacios al inicio y al final
        if (value === "") {
            setBuscador("");
            return;
        }
        const nomProducto = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase();
        setBuscador(nomProducto);        
    }

    function ejecutarFuncion() {
        setInputText(true);
        if (funcion) { //TODO: Si la funcion es una como tal, entonces ejecutala
            funcion();
        }
    }

    return (
        <Container
            onClick={ejecutarFuncion}
            ref={cajaRef}
            $borde={inputText}
        >
            <article className="content">
                <div className="icono">
                    <PackageSearch size={30} strokeWidth={inputText?1.5:1} /> 
                </div>
                <input 
                    onFocus={onFocus} 
                    onChange={buscarProducto?buscar2:buscar} 
                    placeholder="...Buscar Producto"
                />
            </article>
        </Container>
    );
}

const Container = styled.div`
    background-color: ${(props)=>props.theme.gb};
    border-radius: 10px;
    height: 60px;
    align-items: center;
    display: flex;
    color: ${(props)=>props.theme.text};
    border: ${(props)=>props.$borde?"2px":"1px"} solid #414244;
    
    .content {
        padding: 15px;
        gap: 10px;
        display: flex;
        align-items: center;

        .icono {
            display: flex;
            align-items: center;

            svg {
                transition: transform 0.1s ease, stroke-width 0.1s ease;
                transform: ${(props) => (props.$borde ? "scale(1.05)" : "scale(1)")};
            }
        }

        input {
            font-size: 18px;
            width: 100%;
            outline: none;
            background: none;
            border: 0;
            color: ${(props)=>props.theme.text};

            &::placeholder {
                font-size: 17px;
            }

            &:focus::placeholder {
                color: #8B8C8D; /* cambia el color al hacer focus */
                font-weight: 500;
            }
        }
    }
`;