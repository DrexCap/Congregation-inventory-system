import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RegistrarTrazaUno, RegistrarTrazaDos, 
    RegistrarTrazaTres, RegistrarTrazaCuatro, RegistrarTrazaCinco, 
    RegistrarTrazaSeis, RegistrarTrazaSiete } from "../../index";

const variants = {
  enter: {
    x: 100, // entra desde la izquierda
    opacity: 0,
  },
  center: {
    x: 0, // posición final centrada
    opacity: 1,
  },
  exit: {
    x: 100, // sale hacia la derecha
    opacity: 0,
  },
};

export const RegistrosAnimados = ({ pasos, setEstadoColor, estadoColor, code_lote }) => {

  const [reloadKey, setReloadKey] = useState(0);

  const recargar = () => {
    setReloadKey(k => k + 1);
  };

  return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pasos}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 100, damping: 20 },
            opacity: { duration: 0.3 },
          }}
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          {pasos === 0 ? (
            <RegistrarTrazaUno 
              key={reloadKey} 
              recargar={recargar} 
              setEstadoColor={setEstadoColor} 
              estadoColor={estadoColor} 
              code_lote={code_lote} 
            />
          ) : pasos === 1 ? (
            <RegistrarTrazaDos />
          ) : pasos === 2 ? (
            <RegistrarTrazaTres />
          ) : pasos === 3 ? (
            <RegistrarTrazaCuatro />
          ) : pasos === 4 ? (
            <RegistrarTrazaCinco />
          ) : pasos === 5 ? (
            <RegistrarTrazaSeis />
          ) : (
            <RegistrarTrazaSiete />
          )}
        </motion.div>
      </AnimatePresence>
    
  );
};
