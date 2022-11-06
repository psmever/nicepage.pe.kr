import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { isEmpty } from 'lodash';
import { useWindowResize } from '@Hooks/useWindowResize';
import { Editor } from '@Elements/markdown';
import TagInput from './tagInput';
import Const from '@Common/const.json';
import { imageUpload } from '@Services/postService';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { atomAppToastifyState } from '@Recoil/appToastify';
import { EditorActionButton } from '@Elements/buttons';
import { atomPostState, selectPostState } from '@Recoil/manageState';
import { EditorBoxStyle } from '@Styles/elements/elements';

const {
	Container,
	Wapper,
	DropZoneBox,
	DropZoneButtonBox,
	DropZoneInput,
	DropZoneLabel,
	DropZoneTitleBox,
	DropZoneTitleP,
	DropZoneTitleSpan,
	EditorBoxWapper,
	TagBox,
	TitleBox,
	TitleInput,
} = EditorBoxStyle;

interface DraftPageProps {
	postSave: () => void;
}

const EditorBox: NextPage<DraftPageProps> = ({ postSave }) => {
	const setToastify = useSetRecoilState(atomAppToastifyState);
	const setPost = useSetRecoilState(atomPostState);
	const recoilPostData = useRecoilValue(selectPostState);

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
![
image](${response.payload.media_url})`,
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
		setPost((prev) => ({
			...prev,
			currentData: editData.edit,
		}));
	}, [editData, setPost]);

	useEffect(() => {
		const funcSetGetData = () => {
			setEditData((prevState) => ({
				...prevState,
				edit: recoilPostData.getData,
			}));
			setEditorTags(recoilPostData.getData.tags);
		};

		if (recoilPostData.mode === 'update') {
			funcSetGetData();
		}
	}, [recoilPostData.getData, recoilPostData.mode]);

	return (
		<Container>
			<Wapper>
				<TitleBox>
					<TitleInput
						type="text"
						name="title"
						placeholder="제목을 입력해 주세요"
						onChange={(e) => handleChangeTitle(e.target.value)}
						value={editData.edit.title}
					/>
				</TitleBox>

				<TagBox>
					<TagInput tagsValue={editData.edit.tags} setTagValues={setEditorTags} />
				</TagBox>

				<EditorBoxWapper>
					<Editor
						value={editData.edit.contents}
						onChange={(text) => handleChangeContents(text)}
						height={editorHeight}
						hideToolbar={true}
					/>
					<DropZoneBox>
						<DropZoneLabel htmlFor="dropzone-file">
							<DropZoneTitleBox>
								<DropZoneTitleP>
									<DropZoneTitleSpan className="font-semibold">
										Click to upload
									</DropZoneTitleSpan>{' '}
									or drag and drop
								</DropZoneTitleP>
							</DropZoneTitleBox>
							<DropZoneInput
								id="dropzone-file"
								type="file"
								className="hidden"
								accept="image/jpg,image/png,image/jpeg,image/gif"
								name="postImage"
								onChange={(e) => handleImageUpload(e)}
								ref={imageInputRef}
								onClick={handleFileInputReset}
							/>
						</DropZoneLabel>
					</DropZoneBox>
				</EditorBoxWapper>

				<DropZoneButtonBox>
					<EditorActionButton
						buttonName={`나가기`}
						onClickHandler={() => handleClickCancleButton()}
					/>
					<EditorActionButton
						buttonName={`저장`}
						onClickHandler={() => handleClickSaveButton()}
					/>
				</DropZoneButtonBox>
			</Wapper>
		</Container>
	);
};

export default EditorBox;
