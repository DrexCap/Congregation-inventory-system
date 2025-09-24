
import { useWindowSize } from "../index.js";

export const styleDevice = (espacioIzquieElem, espacioAbajoElem=null) => {

    const { width, height } = useWindowSize();

    console.log({width, height});
    console.log({espacioIzquieElem, espacioAbajoElem});

    const izquierda = () => {
        if(width > 2000) {
            if (espacioIzquieElem < 500 ) {
                return espacioIzquieElem*0.19;
            } else if (espacioIzquieElem > 1000 ) {
                return espacioIzquieElem*0.087;
            } else if (espacioIzquieElem < 960) {
                return espacioIzquieElem*0.14;
            } else {
                return espacioIzquieElem*0.138;
            }
        } else if (width > 1000) {
            // TODO: Para laptop Form Productos x100
            if(espacioIzquieElem > 290 && espacioIzquieElem < 300) {
                return espacioIzquieElem*0.23
            } else if ( espacioIzquieElem > 850 && espacioIzquieElem < 900 ) {
                return espacioIzquieElem*0.112
            } 

            // TODO: Para laptop Form Productos x90 (Normal)
            if(espacioIzquieElem > 315 && espacioIzquieElem < 320) {
                return espacioIzquieElem*0.22
            } else if ( espacioIzquieElem > 950 && espacioIzquieElem < 960 ) {
                return espacioIzquieElem*0.104
            } 

            // TODO: Para laptop Form kardex x100
            if( espacioIzquieElem > 670 && espacioIzquieElem < 680 ) {
                return espacioIzquieElem*0.191
            } else if( espacioIzquieElem > 700 && espacioIzquieElem < 730 ) {
                return espacioIzquieElem*0.189
            }

            // TODO: Para laptop Form kardex x90
            if( espacioIzquieElem > 760 && espacioIzquieElem < 765 ) {
                return espacioIzquieElem*0.169
            } 
            else if( espacioIzquieElem > 800 && espacioIzquieElem < 810 ) {
                return espacioIzquieElem*0.165
            }
        } else {
            return espacioIzquieElem < 150 ? espacioIzquieElem*0.52 : espacioIzquieElem*0.61;
        }
    }

    const abajo = () => {
        if(height > 1000) { // 1018
            // return espacioAbajoElem < 500 ? espacioAbajoElem*0.19 : espacioAbajoElem*0.087;
            return espacioAbajoElem < 500 ? espacioAbajoElem*3.75 : espacioAbajoElem*0.087;
        } else if (height > 700) {
            if(espacioAbajoElem < 500) {
                // return espacioAbajoElem*0.23
                return espacioAbajoElem*2.60
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


















