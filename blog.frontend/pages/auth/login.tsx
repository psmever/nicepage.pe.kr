import { NextLayoutPage } from 'next';
import { KeyboardEvent, useRef, useState } from 'react';
import type { ReactElement } from 'react';
import * as authService from '@Services/auth.service';
import * as Helper from '@Utils/Helper';
import { useRouter } from 'next/router';
import ManageLayout from '@Components/layouts/manage';

const Login: NextLayoutPage = () => {
    const router = useRouter();
    const inputPasswordRef = useRef<HTMLInputElement | null>(null);
    const [loginInputValue, setLoginInputValue] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });

    const handleChangeInput = ({ name, value }: { name: string; value: string }) => {
        setLoginInputValue({
            ...loginInputValue,
            [name]: value,
        });
    };

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        const targetName: string = e.target.name;

        if (targetName === 'email') {
            inputPasswordRef.current?.focus();
            return;
        }

        if (targetName === 'password') {
            handleSubmit().then();
            return;
        }
    };

    const handleClickLoginButton = () => {
        handleSubmit().then();
    };

    const handleSubmit = async () => {
        const response = await authService.login({
            email: loginInputValue.email,
            password: loginInputValue.password,
        });

        if (response.status) {
            Helper.saveLoginToken({
                accessToken: response.payload.access_token,
                refreshToken: response.payload.refresh_token,
            });

            await router.push('/welcome');
        } else {
            // 에러 처리.
            Helper.COLORLOG('error', response.message);
        }
    };

    return (
        <div className="md:w-1/2 lg:w-1/3 mx-auto my-12">
            <h1 className="text-lg font-bold">로그인</h1>
            <div className="flex flex-col mt-4">
                <input
                    type="email"
                    name="email"
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    placeholder="이메일"
                    onChange={(e) => handleChangeInput(e.target)}
                    value={loginInputValue.email}
                    onKeyUp={(e) => onEnter(e)}
                />
                <input
                    type="password"
                    name="password"
                    className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    placeholder="비밀번호"
                    onChange={(e) => handleChangeInput(e.target)}
                    value={loginInputValue.password}
                    onKeyUp={(e) => onEnter(e)}
                    ref={inputPasswordRef}
                />
                <button
                    type="submit"
                    className="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
                    onClick={() => handleClickLoginButton()}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

Login.getLayout = (page: ReactElement) => {
    return <ManageLayout>{page}</ManageLayout>;
};

export default Login;
