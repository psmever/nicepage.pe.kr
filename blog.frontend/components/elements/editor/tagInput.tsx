import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { TagsInput } from 'react-tag-input-component';
import { postCurrentAtomState } from '@Recoil/postState';

const TagInput: NextPage = () => {
	const [tags, setTags] = useState(['']);
	const setPost = useSetRecoilState(postCurrentAtomState);

	useEffect(() => {
		const funcSetPostTags = () => {
			setPost((prevState) => ({
				...prevState,
				tags: tags,
			}));
		};

		funcSetPostTags();
	}, [setPost, tags]);

	return (
		<TagsInput
			value={tags.filter((e) => e !== '')}
			onChange={setTags}
			name="tags"
			placeHolder="테그를 입력해 주세요."
		/>
	);
};

export default TagInput;