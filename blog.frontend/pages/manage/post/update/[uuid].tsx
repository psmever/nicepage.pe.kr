import type { ReactElement } from 'react';
import React, { useEffect } from 'react';
import { ManageLayout } from '@Components/layouts';
import { EditorBox, PriviewBox } from '@Elements';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { atomPostState, selectPostState } from '@Recoil/manageState';
import { atomAppToastifyState } from '@Recoil/appToastify';
import Const from '@Common/const.json';
import { editPost, updatePost } from '@Services/postService';
import { PostCategory } from '@Types/commonInterface';
import { isEmpty } from 'lodash';

const Update: any = ({
	postData,
}: {
	postData: {
		title: string;
		category: PostCategory;
		tags: string[];
		contents: string;
	};
}) => {
	const router = useRouter();
	const setPost = useSetRecoilState(atomPostState);
	const recoilPostData = useRecoilValue(selectPostState);
	const resetPost = useResetRecoilState(atomPostState);
	const setToastify = useSetRecoilState(atomAppToastifyState);

	// 내용 업데이트 처리.
	const postSave = async () => {
		const response = await updatePost({
			uuid: recoilPostData.uuid,
			payload: recoilPostData.currentData,
		});

		if (!response.status) {
			setToastify({
				status: true,
				type: 'error',
				message: isEmpty(response.message)
					? `처리중 문제가 발생했습니다.`
					: response.message,
			});

			return;
		}

		setToastify({
			status: true,
			type: 'success',
			message: isEmpty(response.message) ? `저장하였습니다.` : response.message,
		});

		await resetPost();
		await router.push(`/manage/post/update/${recoilPostData.uuid}`);
	};

	// 로딩시 에디트 데이터 설정.
	useEffect(() => {
		const funcSetEditInfo = (uuid: string) => {
			setPost((prev) => ({
				...prev,
				mode: 'update',
				category: postData.category,
				uuid: uuid,
				getData: {
					title: postData.title,
					tags: postData.tags,
					contents: postData.contents,
				},
			}));
		};

		const {
			query: { uuid },
		} = router;
		funcSetEditInfo(typeof uuid === 'string' ? uuid : Const.default.postCreateCategory);
	}, [postData, router, setPost]);

	return (
		<div className="flex items-stretch bg-grey-lighter w-full min-h-screen">
			<EditorBox postSave={() => postSave()} />
			<PriviewBox />
		</div>
	);
};

Update.getInitialProps = async ({ query }: any) => {
	const { uuid } = query;
	const response = await editPost(uuid);
	return { postData: response.payload };
};

Update.getLayout = (page: ReactElement) => {
	return <ManageLayout>{page}</ManageLayout>;
};

export default Update;
