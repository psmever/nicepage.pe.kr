import { NextLayoutPage } from 'next';
import type { ReactElement } from 'react';
import { KeyboardEvent, useRef, useState } from 'react';
import * as authService from '@Services/authService';
import * as Helper from '@Utils/Helper';
import { useRouter } from 'next/router';
import { AuthLayout } from '@Components/layouts';
import {
	Container,
	EmailInput,
	InputWapper,
	LoginButton,
	PasswordInput,
	Title,
} from '@Styles/pages/login';

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

			await router.push('/posts');
		} else {
			// 에러 처리.
			Helper.COLORLOG('error', response.message);
		}
	};

	return (
		<Container>
			<Title>로그인</Title>
			<InputWapper>
				<EmailInput
					type="email"
					name="email"
					placeholder="이메일"
					onChange={(e) => handleChangeInput(e.target)}
					value={loginInputValue.email}
					onKeyUp={(e) => onEnter(e)}
				/>
				<PasswordInput
					type="password"
					name="password"
					placeholder="비밀번호"
					onChange={(e) => handleChangeInput(e.target)}
					value={loginInputValue.password}
					onKeyUp={(e) => onEnter(e)}
					ref={inputPasswordRef}
				/>
				<LoginButton type="submit" onClick={() => handleClickLoginButton()}>
					Login
				</LoginButton>
			</InputWapper>
		</Container>
	);
};

Login.getLayout = (page: ReactElement) => {
	return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
