import { useState, useEffect } from 'react';
import { COLORLOG } from '@Utils/Helper';

export default function useRoot() {

    // 체크 상태.
    const [AppBaseCheckState, setAppBaseCheckState] = useState<boolean>(false);

    // 최초 로딩시 앱 초기화.
    useEffect(() => {
        const appStart = async () => {
            COLORLOG('info', ':: App Init Start :: ');
            setAppBaseCheckState(true);
        };

        appStart();
    }, []);

    useEffect(() => {
        // 로딩이 끝나고 상태가 정상이면.
        setAppBaseCheckState(false);
    }, []);


    // 임시.
    useEffect(() => {
        const timer = setInterval(() => {
            setAppBaseCheckState(true);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return {
        AppBaseCheckState,
    };
}