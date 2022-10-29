import React from 'react';
import { UnderConstruction } from '@Styles/elements/elements';

const {
	ComingSoon,
	Container,
	MainContainer,
	MainLink,
	MainTextBox,
	TextBox,
	TextSpan,
	TextTitle,
	Wapper,
} = UnderConstruction;

const UnderConstructionComponent = () => {
	return (
		<MainContainer>
			<Container>
				<Wapper>
					<TextBox>
						<TextTitle>
							서버<TextSpan>작업중</TextSpan>
						</TextTitle>
						<ComingSoon>Coming Soon</ComingSoon>
						<MainTextBox>
							<MainLink href="https://nicepage.pe.kr">nicepage.pe.kr</MainLink>
							서버 작업 중입니다. 다시 시도해 주세요.
						</MainTextBox>
					</TextBox>
				</Wapper>
			</Container>
		</MainContainer>
	);
};

export default UnderConstructionComponent;
