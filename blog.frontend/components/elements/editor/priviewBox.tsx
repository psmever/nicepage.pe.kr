import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import { MarkdownView } from '@Elements/markdown';
import { selectPostState } from '@Recoil/manageState';
import { isEmpty } from 'lodash';
import {
	PriviewBoxContainer,
	PriviewBoxMarkdownViewBox,
	PriviewBoxTitle,
	PriviewBoxTitleBox,
	PriviewBoxWapper,
} from '@Styles/elements/elements';

const PriviewBox: NextPage = () => {
	const currentPost = useRecoilValue(selectPostState);
	return (
		<PriviewBoxContainer>
			<PriviewBoxWapper>
				<PriviewBoxTitleBox>
					<PriviewBoxTitle>
						{isEmpty(currentPost.currentData.title)
							? `제목을 입력해 주세요.`
							: currentPost.currentData.title}
					</PriviewBoxTitle>
				</PriviewBoxTitleBox>
				<PriviewBoxMarkdownViewBox>
					<MarkdownView
						Contents={
							isEmpty(currentPost.currentData.contents)
								? ``
								: currentPost.currentData.contents
						}
					/>
				</PriviewBoxMarkdownViewBox>
			</PriviewBoxWapper>
		</PriviewBoxContainer>
	);
};

export default PriviewBox;
