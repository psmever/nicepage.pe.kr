import '../styles/globals.css';
import '@styles/GithubMarkdown.css';
import React, { ReactNode } from 'react';
import type { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (
    props: AppLayoutProps
) => {
    const { Component, pageProps } = props;

    const getLayout = Component.getLayout || ((page: ReactNode) => page);

    return <>{getLayout(<Component {...pageProps} />)}</>;
};

export default MyApp;
