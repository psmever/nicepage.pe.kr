import { NextPage } from 'next';
import type { ReactElement } from 'react';
import MainLayout from '@components/layouts/main';
import ManageLayout from '@components/layouts/manage';

export type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout };
export type PageWithManageLayoutType = NextPage & { layout: typeof ManageLayout };

export type PageWithLayouts = PageWithMainLayoutType | PageWithManageLayoutType;

export type LayoutProps = ({ children }: { children: ReactElement }) => ReactElement;

export default PageWithLayouts;
