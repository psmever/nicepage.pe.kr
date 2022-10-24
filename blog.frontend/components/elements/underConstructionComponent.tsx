import React from 'react';
import {
	UnderConstructionComingSoon,
	UnderConstructionContainer,
	UnderConstructionMainContainer,
	UnderConstructionMainLink,
	UnderConstructionMainTextBox,
	UnderConstructionTextBox,
	UnderConstructionTextSpan,
	UnderConstructionTextTitle,
	UnderConstructionWapper,
} from '@Styles/elements/elements';

const UnderConstructionComponent = () => {
	return (
		<UnderConstructionMainContainer>
			<UnderConstructionContainer>
				<UnderConstructionWapper>
					<UnderConstructionTextBox>
						<UnderConstructionTextTitle>
							서버<UnderConstructionTextSpan>작업중</UnderConstructionTextSpan>
						</UnderConstructionTextTitle>
						<UnderConstructionComingSoon>Coming Soon</UnderConstructionComingSoon>
						<UnderConstructionMainTextBox>
							<UnderConstructionMainLink href="https://nicepage.pe.kr">
								nicepage.pe.kr
							</UnderConstructionMainLink>
							서버 작업 중입니다. 다시 시도해 주세요.
						</UnderConstructionMainTextBox>
					</UnderConstructionTextBox>
				</UnderConstructionWapper>
			</UnderConstructionContainer>
		</UnderConstructionMainContainer>
	);
};

export default UnderConstructionComponent;
