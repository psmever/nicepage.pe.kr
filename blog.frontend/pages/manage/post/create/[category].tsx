import { NextLayoutPage } from 'next';
import type { ReactElement } from 'react';
import React, { useEffect } from 'react';
import { ManageLayout } from '@Components/layouts';
import { EditorBox, PriviewBox } from '@Elements';
import { useRouter } from 'next/router';
import Const from '@Common/const.json';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { atomPostState } from '@Recoil/manageState';
import { atomAppToastifyState } from '@Recoil/appToastify';
import { createPost } from '@Services/postService';
import { isEmpty } from 'lodash';
import { PostCategory } from '@Types/commonInterface';

const Create: NextLayoutPage = () => {
	const router = useRouter();
	const [postData, setPostData] = useRecoilState(atomPostState);
	const setToastify = useSetRecoilState(atomAppToastifyState);
	const resetPost = useResetRecoilState(atomPostState);

	// 글 수정
	const postSave = async () => {
		if (isEmpty(postData.category)) {
			setToastify({
				status: true,
				type: 'error',
				message: `포스트 코드가 존재 하지 않습니다.`,
			});

			return;
		}
		const { title, tags, contents } = postData.currentData;
		const response = await createPost({
			category: postData.category,
			title: title,
			tags: tags.filter((e) => e !== ''),
			contents: contents,
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

		await resetPost();
		await router.push(`/manage/post/update/${response.payload.post_uuid}`);
	};

	// 로딩시 에디터 정보 설정.
	useEffect(() => {
		const funcSetEditInfo = (category: PostCategory) => {
			if (!Const.postCreateCategory.find((e) => e === category)) {
				return;
			}

			setPostData((prev) => ({
				...prev,
				category: category,
				mode: 'create',
			}));
		};

		const {
			query: { category },
		} = router;
		funcSetEditInfo(category as PostCategory);
	}, [router, setPostData]);

	return (
		<div className="flex items-stretch bg-grey-lighter w-full min-h-screen">
			<EditorBox postSave={() => postSave()} />
			<PriviewBox />
		</div>
	);
};

// static path 설정
export const getStaticPaths = async () => {
	const postKeys = Const.postCreateCategory;
	const pathsWithParams = postKeys.map((el) => ({ params: { category: el } }));

	return {
		paths: pathsWithParams,
		fallback: true,
	};
};

export async function getStaticProps() {
	return {
		props: {},
	};
}

Create.getLayout = (page: ReactElement) => {
	return <ManageLayout>{page}</ManageLayout>;
};

export default Create;
