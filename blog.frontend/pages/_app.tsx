import '../styles/globals.css';
import '@styles/GithubMarkdown.css';
import { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import PageWithLayoutType from 'types/pageWithLayouts';

type AppLayoutProps = AppProps & {
    Component: PageWithLayoutType;
    pageProps: any;
};

function MyApp({ Component, pageProps }: AppLayoutProps) {
    const Layout = Component.layout || ((children: ReactElement) => <>{children}</>);
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
