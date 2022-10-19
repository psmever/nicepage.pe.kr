import _Axios_ from '@Utils/_Axios_';
import { FormData, PostCategory, ServerDefaultResult } from '@Types/commonInterface';

// 이미지 업로드
export function imageUpload(payload: FormData): Promise<
	ServerDefaultResult<{
		media_url: string;
	}>
> {
	return _Axios_({ method: 'post', url: '/api/v1/media/blog/create-image', payload: payload });
}

// 글 등록
export const createPost = (payload: {
	category: string;
	title: string;
	tags: string[];
	contents: string;
}): Promise<
	ServerDefaultResult<{
		post_uuid: string;
	}>
> => {
	return _Axios_({
		method: 'post',
		url: `/api/v1/post/${payload.category}/create`,
		payload: {
			title: payload.title,
			tags: payload.tags,
			contents: payload.contents,
		},
	});
};

// 글 에디트
export const editPost = (
	uuid: string
): Promise<
	ServerDefaultResult<{
		title: string;
		category: PostCategory;
		tags: string[];
		contents: string;
	}>
> => {
	return _Axios_({
		method: 'get',
		url: `/api/v1/post/${uuid}/edit`,
		payload: {},
	});
};

// 글 수정
export const updatePost = ({
	uuid,
	payload,
}: {
	uuid: string;
	payload: {
		title: string;
		tags: string[];
		contents: string;
	};
}): Promise<
	ServerDefaultResult<{
		title: string;
		category: PostCategory;
		tags: string[];
		contents: string;
	}>
> => {
	return _Axios_({
		method: 'put',
		url: `/api/v1/post/${uuid}/update`,
		payload: payload,
	});
};
