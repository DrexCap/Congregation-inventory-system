import { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener('resize', handleResize);

        console.log('Archivo eseWindowsSize');
        console.log('Ancho: ', size.width, ' Alto: ', size.height);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}

