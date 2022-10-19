import type { LayoutProps } from 'types/pageWithLayouts';
import { ReactElement, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { atomAppToastifyState } from '@Recoil/appToastify';
import Head from 'next/head';
import { toast, ToastContainer } from 'react-toastify';

const ManageLayout: LayoutProps = ({ children }: { children: ReactElement }) => {
	const currentToastify = useRecoilValue(atomAppToastifyState);
	const resetToastify = useResetRecoilState(atomAppToastifyState);

	// 공통 알럿.
	useEffect(() => {
		const funcSetToastify = () => {
			if (currentToastify.type === 'error') {
				toast.error(currentToastify.message, {
					// onOpen: () => console.debug('onOpen'),
					onClose: () => resetToastify(),
				});
			} else if (currentToastify.type === 'success') {
				toast(currentToastify.message, {
					onClose: () => resetToastify(),
				});
			} else if (currentToastify.type === 'info') {
				toast.info(currentToastify.message, {
					onClose: () => resetToastify(),
				});
			}
		};

		if (currentToastify.status) {
			funcSetToastify();
		}
	}, [currentToastify, resetToastify]);

	return (
		<div className="flex items-center justify-center h-screen">
			<Head>
				<title>Nice Page Blog : 관리 레이아웃</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{children}

			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};
export default ManageLayout;
