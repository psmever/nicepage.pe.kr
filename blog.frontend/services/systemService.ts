import _Axios_ from '@Utils/_Axios_';
import { ServerDefaultResult, CodesInterface } from '@Types/commonInterface';

// 시스템 체크.
export function checkServer(): Promise<ServerDefaultResult<{}>> {
	return _Axios_({ method: 'get', url: '/api/system/check-status', payload: {} });
}

// 시스템 공지 사항.
export function checkServerNotice(): Promise<ServerDefaultResult<{ notice_message: string }>> {
	return _Axios_({ method: 'get', url: '/api/system/check-notice', payload: { data: {} } });
}

// 사이트 데이터 가지고 오기.
export function getSiteBaseData(): Promise<
	ServerDefaultResult<{
		codes: CodesInterface;
	}>
> {
	return _Axios_({ method: 'get', url: '/api/system/site-data', payload: { data: {} } });
}
