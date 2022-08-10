import '@Styles/globals.css';
import '@Styles/GithubMarkdown.css';
import React, { ReactNode, useState } from 'react';
import type { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import SplashComponent from '@Components/elements/SplashComponent';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (
    props: AppLayoutProps
) => {
    const [AppLoading, setAppLoading] = useState<boolean>(true);
    const { Component, pageProps } = props;

    const getLayout = Component.getLayout || ((page: ReactNode) => page);

    const handleAppLoading = () => {
        if (AppLoading === false) {
            setAppLoading(true);
        } else {
            setAppLoading(false);
        }
    };

    return (
        <>
            {(function () {
                if (AppLoading === true) {
                    return <SplashComponent appLoading={handleAppLoading} />;
                } else {
                    return <>{getLayout(<Component {...pageProps} />)}</>;
                }
            })()}
        </>
    );
};

export default MyApp;
