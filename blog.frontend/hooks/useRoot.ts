import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { atomAppRootState } from '@Recoil/appRootState';
import { COLORLOG } from '@Utils/Helper';
import * as SystemService from '@Services/systemService';
import _ from 'lodash';
import Swal from 'sweetalert2';

export default function useRoot() {
	// 체크 상태.
	const [AppBaseCheckState, setAppBaseCheckState] = useState<boolean>(false);
	const [ServerFailState, setServerFail] = useState<boolean>(false);
	const [serverCheck, setServerCheck] = useState<boolean>(false); // 서버 체크 스테이트.
	const [serverNoticeCheck, setServerNoticeCheck] = useState<boolean>(false); // 서버 체크 스테이트.

	const setAppRootState = useSetRecoilState(atomAppRootState);

	// 최초 로딩시 앱 초기화.
	useEffect(() => {
		const appStart = async () => {
			COLORLOG('warning', ':: App Server Check :: ');

			// 기본 서버 체크.
			const { status } = await SystemService.checkServer();
			if (!status) {
				setServerFail(true);
				return;
			}

			setServerCheck(true);
		};

		COLORLOG('info', ':: App Init Start :: ');
		appStart().then();
	}, []);

	// 서버 체크시 정상 일때 서버 공지 사항 확인.
	useEffect(() => {
		const funcCheckServerNotice = async () => {
			COLORLOG('warning', ':: App Server Notice Check :: ');
			const { payload } = await SystemService.checkServerNotice();
			if (!_.isEmpty(payload)) {
				// 서버 공지사항이 있을때.
				await Swal.fire({
					text: payload.notice_message,
				});
			}

			setServerNoticeCheck(true);
		};

		if (serverCheck) {
			funcCheckServerNotice().then();
		}
	}, [serverCheck]);

	// 서버 공지사항 체크후 사이트 기본 데이터 가지고 오기.
	useEffect(() => {
		const funcGetSiteData = async () => {
			COLORLOG('warning', ':: App Server Get BaseData :: ');
			const { status, payload } = await SystemService.getSiteBaseData();

			if (status) {
				setAppRootState({
					codes: payload.codes,
				});

				COLORLOG('success', ':: App Init Success :: ');
				setAppBaseCheckState(true);
			}
		};

		if (serverNoticeCheck) {
			funcGetSiteData().then();
		}
	}, [serverNoticeCheck, setAppRootState]);

	return {
		AppBaseCheckState,
		ServerFailState,
	};
}
