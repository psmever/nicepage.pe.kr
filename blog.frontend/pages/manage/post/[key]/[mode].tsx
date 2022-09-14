import { NextLayoutPage } from 'next';
import type { ReactElement } from 'react';
import { ManageLayout } from '@Components/layouts';
import { EditorBox, PriviewBox } from '@Components/elements/editor';

const Post: NextLayoutPage = () => {
	return (
		<div className="flex items-stretch bg-grey-lighter w-full min-h-screen">
			<EditorBox />
			<PriviewBox />
		</div>
	);
};

Post.getLayout = (page: ReactElement) => {
	return <ManageLayout>{page}</ManageLayout>;
};

export default Post;
