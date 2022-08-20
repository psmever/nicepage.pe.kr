import { NextLayoutPage } from 'next';
import type { ReactElement } from 'react';
import ManageLayout from '@Components/layouts/manage';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import * as authService from '@Services/authService';
import { useRouter } from 'next/router';

const welcome: NextLayoutPage = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [userInfo, setUserInfo] = useState<{
		id: number | null;
		name: string;
		email: string;
		email_verified_at: string;
		created_at: string;
		updated_at: string;
	}>({
		id: null,
		name: '',
		email: '',
		email_verified_at: '',
		created_at: '',
		updated_at: '',
	});
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const getLoginInfo = async () => {
			setUserInfo({
				id: null,
				name: '',
				email: '',
				email_verified_at: '',
				created_at: '',
				updated_at: '',
			});
			const response = await authService.loginInfo();
			if (response.status) {
				setUserInfo(response.payload);
			} else {
				console.debug(response);
				await router.push('/auth/login');
			}
		};

		const intervalId = setInterval(() => {
			getLoginInfo().then();
		}, 1000 * 2); // in milliseconds
		return () => clearInterval(intervalId);
	});
	return (
		<div className="flex items-center justify-center h-screen">
			<Head>
				<title>Nice Page Blog : Welcome</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className="md:w-1/2 lg:w-1/3 mx-auto my-12">
				<h1 className="m-0 leading-tight text-4xl text-center whitespace-nowrap">
					Welcome to
					<a className="text-[#0070f3] m-3">NicePage Blog!</a>
				</h1>

				<div className="flex items-center justify-center h-full mt-14">
					<div className="bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50">
						<div className="flex flex-col">
							<div>
								<h2 className="font-bold text-gray-600 text-center">로그인 정보</h2>
							</div>
							<div className="my-1">
								<div className="flex flex-row space-x-4 items-center">
									<div id="temp">
										<p className="text-xs text-gray-500">{userInfo.name}</p>
										<p className="text-xs text-gray-500">{userInfo.email}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

welcome.getLayout = (page: ReactElement) => {
	return <ManageLayout>{page}</ManageLayout>;
};

export default welcome;
