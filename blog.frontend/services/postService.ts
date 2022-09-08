import _Axios_ from '@Utils/_Axios_';
import { ServerDefaultResult, FormData } from '@Types/commonInterface';

// 이미지 업로드
export function imageUpload(payload: FormData): Promise<
	ServerDefaultResult<{
		media_url: string;
	}>
> {
	return _Axios_({ method: 'post', url: '/api/v1/media/blog/create-image', payload: payload });
}
