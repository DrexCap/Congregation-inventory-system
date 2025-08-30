
import styled from "styled-components";
import { useUserStore } from "../../store/UserStore";
import { useEffect, useState } from "react";

export function ListaModulos({ checkBox, setCheckBox, accion }) {

    const { dataModulos, dataPermisosEdit } = useUserStore();
    const [isChecked, setisChecked] = useState(true);

    useEffect(() => {
        if (accion == "Editar") {
            let allDocs = [];
            dataModulos.map((element)=>{
                const statePermiso =
                    dataPermisosEdit?.some((objeto)=>objeto.modulos.nombre.includes(element.nombre))
                if(statePermiso){
                    allDocs.push({...element,check: true})
                }
                else{
                    allDocs.push({...element,check: false})
                }
            });
            setCheckBox(allDocs);
        } else {
            setCheckBox(dataModulos);
        }
    }, [dataPermisosEdit]);

    const handlecheckbox = (id) => {
        setCheckBox((prev) => {
            return prev?.map((item) => {
                if (item.id === id) {
                    return { ...item, check: !item.check };
                } else {
                    return { ...item };
                }
            });
        });
    };

    const seleccionar = (e) => {
        let check = e.target.checked;
        setisChecked(check);
    };

    return (
        <Container>
            {checkBox?.map((item, index) => {
                return (
                    <div
                        className="content"
                        key={index}
                        onClick={() => handlecheckbox(item.id)}
                    >
                        <input
                            checked={item.check}
                            class="checkbox"
                            type="checkbox"
                            onChange={(e) => seleccionar(e)}
                        />
                        <span>{item.nombre}</span>
                    </div>
                );
            })}
        </Container>

    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px dashed #414244;
    border-radius: 15px;
    padding: 15px;
    gap: 15px;
    .content{
        display: flex;
        gap: 15px;
    }
    .checkbox {
        appearance: none;
        overflow: hidden;
        min-width: 30px;
        aspect-ratio: 1/1;
        border-radius: 30% 70% 70% 30%/30% 30% 70% 70%;
        border: 2px solid rgb(255, 102, 0);
        position: relative;
        transition: all 0.2s ease-in-out;
        &::before {
            position: absolute;
            inset: 0;
            content: "";
            font-size: 35px;
            transition: all 0.2s ease-in-out;
        }
        &:checked {
            border: 2px solid rgb(255, 212, 59);
            background: linear-gradient(
                135deg,
                rgb(255, 212, 59) 0%,
                rgb(255, 102, 0) 100%
            );
            box-shadow: -5px -5px 30px rgba(255, 212, 59, 1), 5px 5px 30px rgba(255, 102, 0, 1);
            &::before {
                background: linear-gradient(
                    135deg,
                    rgb(255, 212, 59) 0%,
                    rgb(255, 102, 0) 100%
                );
            }
        }
    }
`;
