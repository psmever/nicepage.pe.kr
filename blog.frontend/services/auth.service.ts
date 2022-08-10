import _Axios_ from '@Utils/_Axios_';

export interface ServerDefaultResult<T> {
    status: boolean;
    message: string;
    payload: T;
}

// 로그인
export function login(payload: { email: string; password: string }): Promise<
    ServerDefaultResult<{
        access_token: string;
        refresh_token: string;
    }>
> {
    return _Axios_({ method: 'post', url: '/api/v1/auth/login', payload: payload });
}

// 로그인 정보
export function loginInfo(): Promise<
    ServerDefaultResult<{
        id: number;
        name: string;
        email: string;
        email_verified_at: string;
        created_at: string;
        updated_at: string;
    }>
> {
    return _Axios_({ method: 'get', url: '/api/v1/auth/login-info', payload: {} });
}
