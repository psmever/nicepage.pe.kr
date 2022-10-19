import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import { MarkdownView } from '@Elements/markdown';
import { selectPostState } from '@Recoil/manageState';
import { isEmpty } from 'lodash';

const PriviewBox: NextPage = () => {
	const currentPost = useRecoilValue(selectPostState);
	return (
		<div className="flex-1 text-grey-darker bg-grey-light">
			<div className="h-screen p-4">
				<div className="w-full grid-cols-12">
					<p className="text-5xl font-black text-gray-900 m-4">
						{isEmpty(currentPost.currentData.title)
							? `제목을 입력해 주세요.`
							: currentPost.currentData.title}
					</p>
				</div>
				<div className="w-full grid-cols-12 mt-12">
					<MarkdownView
						Contents={
							isEmpty(currentPost.currentData.contents)
								? ``
								: currentPost.currentData.contents
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default PriviewBox;
