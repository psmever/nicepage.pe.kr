import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { isEmpty } from 'lodash';
import { useWindowResize } from '@Hooks/useWindowResize';
import { Editor } from '@Elements/markdown';
import TagInput from './tagInput';
import Const from '@Common/const.json';
import { imageUpload } from '@Services/postService';
import { useSetRecoilState } from 'recoil';
import { appToastifyAtomState } from '@Recoil/appToastify';
import { EditorActionButton } from '@Elements/buttons';
import { postCurrentAtomState } from '@Recoil/postState';

interface DraftPageProps {
	postSave: () => void;
}

const EditorBox: NextPage<DraftPageProps> = ({ postSave }) => {
	const setToastify = useSetRecoilState(appToastifyAtomState);
	const setPost = useSetRecoilState(postCurrentAtomState);
	// const resetPost = useResetRecoilState(postCurrentAtomState);

	const [editData, setEditData] = useState<{
		edit: {
			title: string;
			tags: string[];
			contents: string;
		};
		info: {
			key: string;
			mode: string;
		};
	}>(Const.editDataInitialize);
	const [editorTags, setEditorTags] = useState(['']); // 테그
	const [windowWidth, windowHeight] = useWindowResize();
	const [editorHeight, setEditorHeight] = useState<number>(0);
	const imageInputRef = useRef<HTMLInputElement>(null);

	// 제목 변경시.
	const handleChangeTitle = (title: string) => {
		setEditData((prevState) => ({
			...prevState,
			edit: {
				...prevState.edit,
				title: title,
			},
		}));
	};

	// 내용 변경시.
	const handleChangeContents = (contents: string | undefined) => {
		const contentsText = contents ? contents : '';
		setEditData((prevState) => ({
			...prevState,
			edit: {
				...prevState.edit,
				contents: contentsText,
			},
		}));
	};

	// 이미지 리셋처리.
	const handleFileInputReset = () => {
		if (imageInputRef.current && imageInputRef.current.value) {
			imageInputRef.current.value = '';
		}
	};

	// 이미지 업로드 처리
	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
				setEditData((prevState) => ({
					...prevState,
					edit: {
						...prevState.edit,
						contents: `${prevState.edit.contents}
![image](${response.payload.media_url})`,
					},
				}));
			}
		}
	};

	// 저장 버튼 클릭.
	const handleClickSaveButton = () => {
		postSave();
	};

	// 나가기 버튼 클릭.
	const handleClickCancleButton = () => {
		console.debug(`handleClickCancleButton`);
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

	// 테그 변경 되었을때.
	useEffect(() => {
		setEditData((prevState) => ({
			...prevState,
			edit: {
				...prevState.edit,
				tags: editorTags.filter((e) => e !== ''),
			},
		}));
	}, [editorTags]);

	// 에디터 내용변경시 recoil 에 저장.
	useEffect(() => {
		setPost(editData.edit);
	}, [editData.edit, setPost]);

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
						value={editData.edit.title}
					/>
				</div>

				<div className="w-full mt-4 grid-cols-12">
					<TagInput tagsValue={editData.edit.tags} setTagValues={setEditorTags} />
				</div>

				<div className="w-full mt-4 grid-cols-12">
					<Editor
						value={editData.edit.contents}
						onChange={(text) => handleChangeContents(text)}
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
