import _Axios_ from '@utils/_Axios_';

export interface ServerDefaultResult<T> {
    status: boolean;
    message: string;
    payload: T;
}

export function login(payload: { email: string; password: string }): Promise<
    ServerDefaultResult<{
        access_token: string;
        refresh_token: string;
    }>
> {
    return _Axios_({ method: 'post', url: '/api/v1/auth/login', payload: payload });
}
