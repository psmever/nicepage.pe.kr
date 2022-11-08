import type { LayoutProps } from 'types/pageWithLayouts';
import React, { ReactElement } from 'react';
import { MainLayoutFooter, MainLayoutHeader } from '@Elements';
import { MainLayoutStyle } from '@Styles/layouts/main';

const { Container, MainSection } = MainLayoutStyle;

const MainLayout: LayoutProps = ({ children }: { children: ReactElement }) => {
	return (
		<Container>
			<MainLayoutHeader />

			<MainSection>{children}</MainSection>

			<MainLayoutFooter />
		</Container>
	);
};
export default MainLayout;
