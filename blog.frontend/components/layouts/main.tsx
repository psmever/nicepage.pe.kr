import type { LayoutProps } from 'types/pageWithLayouts';
import { ReactElement } from 'react';
import Head from 'next/head';

const MainLayout: LayoutProps = ({ children }: { children: ReactElement }) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Head>
                <title>Nice Page Blog : 메인 레이아웃</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {children}
        </div>
    );
};
export default MainLayout;
