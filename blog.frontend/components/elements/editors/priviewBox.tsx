import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import { MarkdownView } from '@Elements';
import { selectPostState } from '@Recoil/manageState';
import { isEmpty } from 'lodash';
import { PriviewBoxStyle } from '@Styles/elements/elements';

const { TitleBox, Title, MarkdownViewBox, Container, Wapper } = PriviewBoxStyle;

const PriviewBox: NextPage = () => {
	const currentPost = useRecoilValue(selectPostState);
	return (
		<Container>
			<Wapper>
				<TitleBox>
					<Title>
						{isEmpty(currentPost.currentData.title)
							? `제목을 입력해 주세요.`
							: currentPost.currentData.title}
					</Title>
				</TitleBox>
				<MarkdownViewBox>
					<MarkdownView
						Contents={
							isEmpty(currentPost.currentData.contents)
								? ``
								: currentPost.currentData.contents
						}
					/>
				</MarkdownViewBox>
			</Wapper>
		</Container>
	);
};

export default PriviewBox;
