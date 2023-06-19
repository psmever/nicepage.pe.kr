import _Axios_ from '@Utils/_Axios_';
import { PostListInterface, ServerDefaultResult } from '@Types/commonInterface';

// 글 리스트
export const getPosts = (page: number): Promise<ServerDefaultResult<PostListInterface>> => {
	return _Axios_({
		method: 'get',
		url: `/api/v1/blog/posts/20/${page}`,
		payload: {},
	});
};
