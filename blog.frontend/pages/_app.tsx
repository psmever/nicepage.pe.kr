import '@Styles/globals.css';
import '@Styles/GithubMarkdown.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { ReactNode, useState } from 'react';
import type { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import SplashComponent from '@Components/elements/SplashComponent';
import UnderConstructionComponent from '@Components/elements/underConstructionComponent';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (
	props: AppLayoutProps
) => {
	const [AppLoading, setAppLoading] = useState<boolean>(true);
	const [serverFail, setServerFail] = useState<boolean>(false);
	const { Component, pageProps } = props;

	const getLayout = Component.getLayout || ((page: ReactNode) => page);

	const handleAppLoading = () => {
		if (!AppLoading) {
			setAppLoading(true);
		} else {
			setAppLoading(false);
		}
	};

	const handleServerFail = () => {
		setServerFail(true);
	};

	return (
		<RecoilRoot>
			{(function () {
				if (serverFail) {
					return <UnderConstructionComponent />;
				}

				if (AppLoading) {
					return (
						<SplashComponent
							appLoading={handleAppLoading}
							serverFail={handleServerFail}
						/>
					);
				} else {
					return <>{getLayout(<Component {...pageProps} />)}</>;
				}
			})()}
		</RecoilRoot>
	);
};

export default MyApp;
