import { NextPage } from 'next';
import type { ReactElement } from 'react';
import MainLayout from '@Components/layouts/main';
import ManageLayout from '@Components/layouts/manage';

export type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout };
export type PageWithManageLayoutType = NextPage & { layout: typeof ManageLayout };

export type PageWithLayouts = PageWithMainLayoutType | PageWithManageLayoutType;

export type LayoutProps = ({ children }: { children: ReactElement }) => ReactElement;

export default PageWithLayouts;
