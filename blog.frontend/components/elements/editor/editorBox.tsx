import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowResize } from '@Hooks/useWindowResize';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { postCurrentAtomState, postCurrentStateSelect } from '@Recoil/postState';
import { Editor } from '@Elements/markdown';
import TagInput from './tagInput';
import { EditorActionButton } from '@Elements/buttons';
import { appToastifyAtomState } from '@Recoil/appToastify';
import { isEmpty } from 'lodash';
import { createPost, editPost, imageUpload } from '@Services/postService';
import Const from '@Common/const.json';

type DraftPageProps = {};

const EditorBox: NextPage<DraftPageProps> = () => {
	const router = useRouter();

	const [editInfo, setEditorInfo] = useState<{ mode: 'create' | 'update' | null; key: string }>({
		mode: null,
		key: '',
	});

	const setPost = useSetRecoilState(postCurrentAtomState);
	const setToastify = useSetRecoilState(appToastifyAtomState);
	const resetPost = useResetRecoilState(postCurrentAtomState);
	const postValue = useRecoilValue(postCurrentStateSelect);

	const [editorTitle, setEditorTitle] = useState<string>(''); // 제목
	const [editorTags, setEditorTags] = useState(['']); // 테그
	const [editorContents, setEditorContents] = useState<string>(''); // 내용

	const [windowWidth, windowHeight] = useWindowResize();

	const [editorHeight, setEditorHeight] = useState<number>(0);

	const imageInputRef = useRef<HTMLInputElement>(null);

	// 타이틀 변경 처리.
	const handleChangeTitle = useCallback((title: string) => {
		setEditorTitle(title);
	}, []);

	// 내용 변경 처리.
	const handleChangeContents = useCallback((contents: any) => {
		setEditorContents(contents);
	}, []);

	// 나가기 버튼 클릭.
	const handleClickCancleButton = useCallback(() => {
		console.debug(`handleClickCancleButton`);
	}, []);

	// 리셋 함수
	const handleResetPostData = async () => {
		setEditorTitle('');
		setEditorTags([]);
		setEditorContents('');
		resetPost();
	};

	// 리셋.
	useEffect(() => {
		return () => {
			console.debug('cleanup');
			resetPost();
		};
	}, [resetPost]);

	// 저장 버튼 클릭.
	const handleClickSaveButton = async () => {
		if (editInfo.mode === 'create') {
			// 생성 일때.
			const response = await createPost({
				category: editInfo.key,
				title: postValue.title,
				tags: postValue.tags.filter((e) => e !== ''),
				contents: postValue.contents,
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

			handleResetPostData().then();
			await router.push(`/manage/post/${response.payload.post_uuid}/update`);
			return;
		}

		if (editInfo.mode === 'update') {
			// 수정 일때.

			console.debug('update');
			return;
		}
	};

	// 이미지 업로드 처리
	const handleImageUpload = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			if (e.target.files && e.target.files.length > 0) {
				const file = e.target.files[0];
				const formData = new FormData();
				formData.append('image', file);

				const response = await imageUpload(formData);
				if (!response.status) {
					setToastify({
						status: true,
						type: 'error',
						message: isEmpty(response.message)
							? `처리중 문제가 발생했습니다.`
							: response.message,
					});
				} else {
					setEditorContents(`${editorContents}

![image](${response.payload.media_url})`);
				}
			}
		},
		[editorContents, setToastify]
	);

	const handleFileInputReset = () => {
		if (imageInputRef.current && imageInputRef.current.value) {
			imageInputRef.current.value = '';
		}
	};

	// 윈도우 높이, 넓이.
	useEffect(() => {
		const funSetHeight = (height: number) => {
			setEditorHeight(height - 230);
		};

		if (windowHeight > 0) {
			funSetHeight(windowHeight);
		}
	}, [windowWidth, windowHeight]);

	// 제목 변경 되었을때.
	useEffect(() => {
		const funSetPostTitle = () => {
			setPost((prevState) => ({
				...prevState,
				title: editorTitle,
			}));
		};

		funSetPostTitle();
	}, [editorTitle, setPost]);

	// 테그 변경 됐을때.
	useEffect(() => {
		const funcSetPostTags = () => {
			setPost((prevState) => ({
				...prevState,
				tags: editorTags,
			}));
		};

		funcSetPostTags();
	}, [editorTags, setPost]);

	// 내용 변경 되었을때.
	useEffect(() => {
		const funSetPostContents = () => {
			setPost((prevState) => ({
				...prevState,
				contents: editorContents,
			}));
		};

		funSetPostContents();
	}, [editorContents, setPost]);

	// 업데이트일때.
	useEffect(() => {
		const funcSetUpdate = async () => {
			// 데이터 가지고 오기.
			const { key: uuid } = editInfo;
			const response = await editPost(uuid);
			if (response.status) {
				const { title, tags, contents } = response.payload;
				setEditorTitle(title);
				setEditorTags(tags);
				setEditorContents(contents);
			} else {
				setToastify({
					status: true,
					type: 'error',
					message: isEmpty(response.message)
						? `처리중 문제가 발생했습니다.`
						: response.message,
				});
			}
		};

		if (editInfo.mode === 'update') {
			funcSetUpdate().then();
		}
	}, [editInfo, setToastify]);

	// 최초 로딩.
	useEffect(() => {
		const funcSetEditInfo = ({ key, mode }: { key: string; mode: 'create' | 'update' }) => {
			setEditorInfo({
				key: key,
				mode: mode,
			});
		};

		const {
			query: { key, mode },
		} = router;

		if (mode === 'create' || mode === 'update') {
			funcSetEditInfo({
				key: typeof key === 'string' ? key : Const.default.postCreateKey,
				mode: mode,
			});
		}
	}, [router]);

	return (
		<div className="flex-1 text-grey-darker text-center bg-grey-light">
			<div className="h-screen p-4">
				<div className="m-4">
					<input
						type="text"
						name="title"
						className="block w-full rounded-lg sm:text-md border-none focus:outline-none text-4xl"
						placeholder="제목을 입력해 주세요"
						onChange={(e) => handleChangeTitle(e.target.value)}
						value={editorTitle}
					/>
				</div>

				<div className="w-full mt-4 grid-cols-12">
					<TagInput tagsValue={editorTags} setTagValues={setEditorTags} />
				</div>

				<div className="w-full mt-4 grid-cols-12">
					<Editor
						value={editorContents}
						onChange={handleChangeContents}
						height={editorHeight}
						hideToolbar={true}
					/>
					<div className="flex justify-center items-center w-full">
						<label
							htmlFor="dropzone-file"
							className="flex flex-col justify-center items-center w-full border-2"
						>
							<div className="flex flex-col justify-center items-center pt-2 pb-2">
								<p className="text-sm">
									<span className="font-semibold">Click to upload</span> or drag
									and drop
								</p>
							</div>
							<input
								id="dropzone-file"
								type="file"
								className="hidden"
								accept="image/jpg,impge/png,image/jpeg,image/gif"
								name="postImage"
								onChange={(e) => handleImageUpload(e)}
								ref={imageInputRef}
								onClick={handleFileInputReset}
							/>
						</label>
					</div>
				</div>

				<div className="flex justify-start mt-2">
					<EditorActionButton
						buttonName={`나가기`}
						onClickHandler={() => handleClickCancleButton()}
					/>
					<EditorActionButton
						buttonName={`저장`}
						onClickHandler={() => handleClickSaveButton()}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditorBox;
