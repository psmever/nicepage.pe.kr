import { NextLayoutPage } from 'next';
import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import { ManageLayout } from '@Components/layouts';
import { EditorBox, PriviewBox } from '@Components/elements/editor';
import { useRouter } from 'next/router';
import Const from '@Common/const.json';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { postCurrentAtomState } from '@Recoil/postState';
import { appToastifyAtomState } from '@Recoil/appToastify';
import { createPost } from '@Services/postService';
import { isEmpty } from 'lodash';

const Create: NextLayoutPage = () => {
	const router = useRouter();
	const [post, setPost] = useRecoilState(postCurrentAtomState);
	const setToastify = useSetRecoilState(appToastifyAtomState);
	const resetPost = useResetRecoilState(postCurrentAtomState);

	const [editKey, setRditKey] = useState<string>(Const.default.postCreateKey);

	const postSave = async () => {
		// 생성 일때.
		const response = await createPost({
			category: editKey,
			title: post.title,
			tags: post.tags.filter((e) => e !== ''),
			contents: post.contents,
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

		await router.push(`/manage/post/update/${response.payload.post_uuid}`);
	};

	useEffect(() => {
		const funcSetEditInfo = (key: string) => {
			setRditKey(key);
		};

		const {
			query: { key },
		} = router;
		funcSetEditInfo(typeof key === 'string' ? key : Const.default.postCreateKey);
	}, [router]);

	return (
		<div className="flex items-stretch bg-grey-lighter w-full min-h-screen">
			<EditorBox postSave={() => postSave()} />
			<PriviewBox />
		</div>
	);
};

// static path 설정?
export const getStaticPaths = async () => {
	const postKeys = Const.postCreateKey;
	const pathsWithParams = postKeys.map((el) => ({ params: { key: el } }));

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
