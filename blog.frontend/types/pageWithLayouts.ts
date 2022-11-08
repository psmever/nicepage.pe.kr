import { NextPage } from 'next';
import type { ReactElement } from 'react';
import { AuthLayout, MainLayout, ManageLayout } from '@Components/layouts';

export type PageWithAuthLayoutType = NextPage & { layout: typeof AuthLayout };
export type PageWithManageLayoutType = NextPage & { layout: typeof ManageLayout };
export type PageWithMainLayoutType = NextPage & { layout: typeof MainLayout };

export type PageWithLayouts =
	| PageWithAuthLayoutType
	| PageWithManageLayoutType
	| PageWithMainLayoutType;

export type LayoutProps = ({ children }: { children: ReactElement }) => ReactElement;

export default PageWithLayouts;
