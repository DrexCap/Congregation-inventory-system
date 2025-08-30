
import { useWindowSize } from "../index.js";

export const styleDevice = (espacioIzquieElem, espacioAbajoElem=null) => {

    const { width, height } = useWindowSize();

    console.log({width, height});
    console.log({espacioIzquieElem, espacioAbajoElem});

    const izquierda = () => {
        if(width > 2000) {
            return espacioIzquieElem < 500 ? espacioIzquieElem*0.19 : espacioIzquieElem*0.087;
        } else if (width > 1000) {
            if(espacioIzquieElem < 500) {
                return espacioIzquieElem*0.23
            } else {
                return espacioIzquieElem*0.109
            }
            // return espacioIzquieElem < 500 ? espacioIzquieElem*0.23 : espacioIzquieElem*0.109;
        } else {
            return espacioIzquieElem < 150 ? espacioIzquieElem*0.52 : espacioIzquieElem*0.61;
        }
    }

    const abajo = () => {
        if(height > 1000) { // 1018
            // return espacioAbajoElem < 500 ? espacioAbajoElem*0.19 : espacioAbajoElem*0.087;
            return espacioAbajoElem < 500 ? espacioAbajoElem*5.70 : espacioAbajoElem*0.087;
        } else if (height > 700) {
            if(espacioAbajoElem < 500) {
                // return espacioAbajoElem*0.23
                return espacioAbajoElem*3.19
            } else {
                // return espacioAbajoElem*0.109
                return espacioAbajoElem*0.109
            }
            // return espacioIzquieElem < 500 ? espacioIzquieElem*0.23 : espacioIzquieElem*0.109;
        } else {
            // return espacioAbajoElem < 150 ? espacioAbajoElem*0.52 : espacioAbajoElem*0.61;
            return espacioAbajoElem < 150 ? espacioAbajoElem*2.42 : espacioAbajoElem*0.61;
        }
    }

    return {izquierda, abajo};
}


















