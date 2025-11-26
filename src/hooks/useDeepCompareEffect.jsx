import { useEffect, useRef } from "react";
import { isEqual } from "lodash";

/**
 * useDeepCompareEffect: ejecuta el efecto solo cuando el valor cambia en profundidad (no solo referencia)
 */
export const useDeepCompareEffect = (effect, dependencies) => {
  const prevDepsRef = useRef();

  if (!isEqual(prevDepsRef.current, dependencies)) {
    prevDepsRef.current = dependencies;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [prevDepsRef.current]);
};
