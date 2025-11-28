
import {
    BtnCircular,
    UserAuth,
    v,
    ListaMenuDesplegable,
    DesplegableUser,
    useAuthStore,
    useUserStore
} from "../../index";
import {useQuery} from "@tanstack/react-query";
import styled, { keyframes } from "styled-components";

const shadowPulse = keyframes`
  0% {
    background: #F76F3A;
    box-shadow: -20px 0 #F76F3A, 20px 0 #F76F3A;
  }
  33% {
    background: #ffffff;
    box-shadow: -20px 0 #F76F3A, 20px 0 #ffffff;
  }
  66% {
    background: #F76F3A;
    box-shadow: -20px 0 #ffffff, 20px 0 #ffffff;
  }
  100% {
    background: #ffffff;
    box-shadow: -20px 0 #ffffff, 20px 0 #F76F3A;
  }
`;

export const LoaderNombre = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  top: 2px; 
  background: #F76F3A;
  box-shadow: -20px 0 #F76F3A, 20px 0 #F76F3A;
  animation: ${shadowPulse} 1.4s ease-in-out infinite;
`;

export function Header({ stateConfig, nombreRegistro }) {

    const { buscarNombreUsuario } = useUserStore();
    const { signOut } = useAuthStore();
    const { user } = UserAuth();

    const funcionXtipo = async (p) => {
        if (p.tipo === "cerrarsesion") {
            sessionStorage.removeItem("autoReloaded");
            await signOut();
        }
    };

    const { data, isFetching } = useQuery({
      queryKey: ["buscarNombreUsuario"],
      queryFn: () => buscarNombreUsuario({_id_auth: user.id}),
      enabled: user.id !== null,
      staleTime: 0,
      refetchOnWindowFocus: false,
    });

    return (
        <Container>
            <Datauser onClick={stateConfig.setState}>
                <div className="imgContainer">
                    <img src="https://i.ibb.co/kGYgRZ8/programador.png" />
                </div>
                <BtnCircular
                    icono={<v.iconocorona />}
                    width="25px"
                    height="25px"
                    bgcolor={`linear-gradient(15deg, rgba(255, 88, 58, 0.86) 9%, #f8bf5b 100%);`}
                    textcolor="#ffffff"
                    fontsize="11px"
                    translatex="-50px"
                    translatey="-12px"
                />
                <span className="nombre" style={{ fontSize: "18px" }}>
                  {nombreRegistro?.id === user?.id ? nombreRegistro.nombres : data?.[0]?.nombres}
                </span>
                {stateConfig.state && (
                    <ListaMenuDesplegable
                        data={DesplegableUser}
                        top="62px"
                        funcion={(p) => funcionXtipo(p)}
                    />
                )}
            </Datauser>
        </Container>
    );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: end;
`;
const Datauser = styled.div`
  z-index: 10;
  position: relative;
  top: 0;
  right: 0;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50px;
  margin: 15px;
  cursor: pointer;
  .imgContainer {
    height: 40px;
    width: 40px;
    min-height: 40px;
    min-width: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.bg3};
  }
  .nombre {
    width: 100%;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
`;