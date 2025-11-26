
import { useState } from "react";
import styled from "styled-components";
import {
    LinksArray,
    SecondarylinksArray,
    SidebarCard,
    ToggleTema,
} from "../../../index";
import { motion } from "framer-motion";
import {v} from "../../../styles/variables"
import { NavLink } from "react-router-dom";
import { Settings } from "../../animate-ui/icons/settings"
import LogoAndre from "../../../assets/logo_andre.png";

// eslint-disable-next-line react/prop-types
export function Sidebar({ state, setState }) {

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isHovered, setHovered] = useState(null);

    return (
        <Main $isopen={state.toString()}>

            <span className="Sidebarbutton" onClick={() => setState(!state)}>
                {<v.iconoflechaderecha />}
            </span>

            <Container $isopen={state.toString()} className={state ? "active" : ""}>
                <div className="Logocontent">
                    <div className="imgcontent">
                        <img className="logoStock" src={v.logo} />
                    </div>
                    <h2>StockPRO</h2>
                    <img className="logoAndre" src={LogoAndre} alt="Logo Andre" style={{ width: "25px", height: "25px" }} />
                </div>
                {LinksArray.map(({ icon: Icon, label, to, animateOnHover }, index) => (
                    <div
                        className={state ? "LinkContainer active" : "LinkContainer"}
                        key={label}
                    >
                        <NavLink
                          to={to}
                          className={({ isActive }) => `Links${isActive ? ` active` : ``}`}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <div className="Linkicon">
                            <motion.div
                              animate={hoveredIndex === index ? { scale: 1.1, y: -1 } : { scale: 1, y: 0 }}
                              whileTap={{ scale: 0.9, y: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              { animateOnHover ? (
                                <Icon animate={hoveredIndex === index} size={22} />
                              ) : (
                                <Icon  />
                              )}
                            </motion.div>
                          </div>
                          <span className={state ? "label_ver" : "label_oculto"}>
                            {label}
                          </span>
                        </NavLink>
                    </div>
                ))}
                <Divider />
                {SecondarylinksArray.map(({ icon, label, to }) => (
                    <div
                        className={state ? "LinkContainer active" : "LinkContainer"}
                        key={label}
                    >
                        <NavLink
                            to={to}
                            className={({ isActive }) => `Links${isActive ? ` active` : ``}`}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <div className="Linkicon">
                              <motion.div
                                animate={ isHovered ? { scale: 1.1, y: -1 } : { scale: 1, y: 0 }}
                                whileTap={{ scale: 0.9, y: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                style={{ display: "flex", alignItems: "center" }}
                              >
                                <Settings size={21.5} animate={isHovered} />
                              </motion.div>
                            </div>
                            <span className={state ? "label_ver" : "label_oculto"}>
                                {label}
                            </span>
                        </NavLink>
                    </div>
                ))}
                <ToggleTema/>
                <Divider />
                {state && <SidebarCard />}
            </Container>

        </Main>
    );
}

const Container = styled.div`
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.bg};
  position: fixed;
  padding-top: 20px;
  z-index: 1;
  height: 100%;
  width: 70px;
  transition: 0.1s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props)=>props.theme.colorScroll};
    border-radius: 10px;
  }
  &.active {
    width: 220px;
  }
  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 60px;
    gap: 5px;
    .imgcontent {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      cursor: pointer;
      transition: 0.3s ease;
      transform: ${({ $isopen }) => ($isopen==="true" ? `scale(0.7)` : `scale(1.5)`)}
        rotate(${({ theme }) => theme.logorotate});
      img.logoStock {
        width: 130%;
        animation: flotar 1.7s ease-in-out infinite alternate;
      }
    }
    img.logoAndre {
      display: ${({ $isopen }) => ($isopen==="true" ? `block` : `none`)};
    }
    h2 {
      display: ${({ $isopen }) => ($isopen==="true" ? `block` : `none`)};
    }
    @keyframes flotar {
      0% {
        transform: translate(0, 0px);
      }
      50% {
        transform: translate(0, 4px);
      }
      100% {
        transform: translate(0, -0px);
      }
    }
  }
  .LinkContainer {
    margin: 5px 0;
    transition: all 0.3s ease-in-out;
    padding: 0 5%;
    position: relative;
    &:hover {
      background: ${(props) => props.theme.bgAlpha};
    }
    .Links {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: calc(${() => v.smSpacing} - 2px) 0;
      color: ${(props) => props.theme.text};
      height: 60px;
      .Linkicon {
        padding: ${() => v.smSpacing} ${() => v.mdSpacing};
        display: flex;
        svg {
          font-size: 25px;
        }
      }
      .label_ver {
        transition: 0.3s ease-in-out;
        opacity: 1;
      }
      .label_oculto {
        opacity: 0;
      }
      &.active {
        color: ${(props) => props.theme.bg5};
        font-weight:600;
        &::before {
          content: "";
          position: absolute;
          height: 100%;
          background: ${(props) => props.theme.bg5};
          width: 4px;
          border-radius: 10px;
          left: 0;
        }
      }
    }
    &.active {
      padding: 0;
    }
  }
`;

const Main = styled.div`
  .Sidebarbutton {
    position: fixed;
    top: 70px;
    left: 42px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${(props) => props.theme.bgtgderecha};
    box-shadow: 0 0 4px ${(props) => props.theme.bg3},
      0 0 7px ${(props) => props.theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 2;
    transform: ${({ $isopen }) =>
    $isopen==="true" ? `translateX(162px) rotate(3.142rad)` : `initial`};
    color: ${(props) => props.theme.text};
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.lgSpacing} 0;
`;