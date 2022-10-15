import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import { ManageLayout } from '@Components/layouts';
import { EditorBox, PriviewBox } from '@Components/elements/editor';
import { useRouter } from 'next/router';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { postCurrentAtomState } from '@Recoil/postState';
import { appToastifyAtomState } from '@Recoil/appToastify';
import Const from '@Common/const.json';
import { editPost } from '@Services/postService';

const Update: any = ({
	postData,
}: {
	postData: {
		title: string;
		tags: string[];
		contents: string;
	};
}) => {
	const router = useRouter();
	const setPost = useSetRecoilState(postCurrentAtomState);
	const setToastify = useSetRecoilState(appToastifyAtomState);
	const resetPost = useResetRecoilState(postCurrentAtomState);

	const [editorInfo, setEditorInfo] = useState<{ uuid: string; mode: `create` | `update` | `` }>({
		uuid: ``,
		mode: ``,
	});

	const postSave = async () => {
		console.debug('postSave');
	};

	useEffect(() => {
		const funcSetEditInfo = (uuid: string) => {
			setEditorInfo({
				uuid: uuid,
				mode: `update`,
			});
		};

		const {
			query: { uuid },
		} = router;
		funcSetEditInfo(typeof uuid === 'string' ? uuid : Const.default.postCreateKey);
	}, [router]);

	useEffect(() => {
		setPost(postData);
	}, [postData, setPost]);

	return (
		<div className="flex items-stretch bg-grey-lighter w-full min-h-screen">
			<EditorBox postSave={() => postSave()} />
			<PriviewBox />
		</div>
	);
};

// export const getInitialProps = async (context) => {
// 	const { uuid } = context.params as IParams;
// 	const response = await editPost(uuid);
// 	return {
// 		props: { postData: response.payload }, // will be passed to the page component as props
// 	};
// };

Update.getInitialProps = async ({ query }: any) => {
	const { uuid } = query;
	const response = await editPost(uuid);
	return { postData: response.payload };
};

Update.getLayout = (page: ReactElement) => {
	return <ManageLayout>{page}</ManageLayout>;
};

export default Update;
