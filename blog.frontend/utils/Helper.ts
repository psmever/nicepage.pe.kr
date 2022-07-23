/**
 * 개발 디버그.
 * @param e
 * @constructor
 */
export const DEBUG = (e: any) => {
    console.debug('%c::DEBUG::', 'color: green; font-weight: bold;', e);
};

/**
 * 컬러 로그
 * @param message
 * @param color
 * @constructor
 */
export const COLORLOG = (
    message: string,
    color: 'success' | 'info' | 'error' | 'warning'
): void => {
    switch (color) {
        case 'success':
            console.log('%c' + message, 'color: Green');
            break;
        case 'info':
            console.log('%c' + message, 'color: #42FF33');
            break;
        case 'error':
            console.log('%c' + message, 'color: Red');
            break;
        case 'warning':
            console.log('%c' + message, 'color: Orange');
            break;
        default:
            console.log('%c' + message, 'color: Green');
    }

    return;
};

/**
 * 로컬 스토리지 매니저.
 */
export const storageManager = {
    set: (key: string, object: any) => {
        if (!localStorage) return;
        localStorage[key] = typeof object === 'string' ? object : JSON.stringify(object);
    },
    get: (key: string) => {
        if (!localStorage) return null;

        if (!localStorage[key]) {
            return null;
        }

        try {
            return JSON.parse(localStorage[key]);
        } catch (e) {
            return localStorage[key];
        }
    },
    remove: (key: string) => {
        if (!localStorage) return null;

        if (localStorage[key]) {
            localStorage.removeItem(key);
        }
    },
};

/**
 * 로그인 토큰 저장.
 * @param payload
 */
export function saveLoginToken({
    access_token,
    refresh_token,
}: {
    access_token: string;
    refresh_token: string;
}): void {
    storageManager.set('loginState', 'true');
    storageManager.set('accessToken', access_token);
    storageManager.set('refreshToken', refresh_token);
}

/**
 * 로그인 토큰 제거.
 */
export function removeLoginToken(): void {
    storageManager.remove('loginState');
    storageManager.remove('accessToken');
    storageManager.remove('refreshToken');
}

/**
 * 로컬 스토리지 토큰. 페이지 다시 로드시 사용.
 */
export function getLocalToken(): {
    loginState: boolean | null;
    accessToken: string | null;
    refreshToken: string | null;
} {
    return {
        loginState: storageManager.get('loginState'),
        accessToken: storageManager.get('accessToken'),
        refreshToken: storageManager.get('refreshToken'),
    };
}

/**
 * return AccessToken.
 */
export function getAccessToken() {
    return storageManager.get('accessToken');
}

/**
 * return RefreshToken.
 */
export function getRefreshToken() {
    return storageManager.get('refreshToken');
}

/**
 * RefreshToken 저장.
 * @param payload
 */
export function saveRefreshToken({
    accessToken,
    refreshToken,
}: {
    accessToken: string;
    refreshToken: string;
}): void {
    storageManager.set('accessToken', accessToken);
    storageManager.set('refreshToken', refreshToken);
}

/**
 * undefined check
 * @param value
 */
export const isEmpty = function (value: any) {
    return (
        value === '' ||
        value === null ||
        value === undefined ||
        (typeof value === 'object' && !Object.keys(value).length)
    );
};

/**
 * 이메일 문자열 확인
 * @param emailString
 */
export const isValidEmail = (emailString: string) => {
    const emailChack =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailChack.test(String(emailString).toLowerCase());
};
