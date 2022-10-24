import React, { useEffect } from 'react';
import useRoot from '@Hooks/useRoot';
import { LoadingText, SplashContainer, SplashWapoper } from '@Styles/elements/elements';

const SplashComponent = ({
	appLoading,
	serverFail,
}: {
	appLoading: () => void;
	serverFail: () => void;
}) => {
	const { AppBaseCheckState, ServerFailState } = useRoot();

	useEffect(() => {
		const setAppMainLoading = (loading: boolean) => {
			if (loading === true) {
				appLoading();
			}
		};

		setAppMainLoading(AppBaseCheckState);
	}, [AppBaseCheckState, appLoading]);

	useEffect(() => {
		// 서버 체크 에러시 공사중 페이지.
		const callServerFail = () => {
			if (ServerFailState) {
				serverFail();
			}
		};

		callServerFail();
	}, [ServerFailState, serverFail]);

	return (
		<SplashContainer>
			<SplashWapoper>
				<svg
					fill="none"
					className="w-6 h-6 animate-spin"
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clipRule="evenodd"
						d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
						fill="currentColor"
						fillRule="evenodd"
					/>
				</svg>

				<LoadingText>로딩중 ...</LoadingText>
			</SplashWapoper>
		</SplashContainer>
	);
};

export default SplashComponent;
