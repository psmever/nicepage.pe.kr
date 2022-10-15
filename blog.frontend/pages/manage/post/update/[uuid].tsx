import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import { ManageLayout } from '@Components/layouts';
import { EditorBox, PriviewBox } from '@Components/elements/editor';
import { useRouter } from 'next/router';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { postCurrentAtomState, postCurrentStateSelect } from '@Recoil/postState';
import { appToastifyAtomState } from '@Recoil/appToastify';
import Const from '@Common/const.json';

export async function getServerSideProps(context: any) {
	return {
		props: {}, // will be passed to the page component as props
	};
}

const Update: any = ({ country }: { country: any }) => {
	const router = useRouter();
	const postValue = useRecoilValue(postCurrentStateSelect);
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
		console.debug(router);
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

	return (
		<div className="flex items-stretch bg-grey-lighter w-full min-h-screen">
			<EditorBox postSave={() => postSave()} />
			<PriviewBox />
		</div>
	);
};

Update.getLayout = (page: ReactElement) => {
	return <ManageLayout>{page}</ManageLayout>;
};

export default Update;
