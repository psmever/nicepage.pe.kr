import React, { useState } from 'react';

React.useLayoutEffect = React.useEffect;

export const useWindowResize = () => {
    const [size, setSize] = useState([0, 0]);

    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
};
