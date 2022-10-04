import { NextPage } from 'next';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface DraftPageProps {
	tagsValue: string[];
	setTagValues: Dispatch<SetStateAction<string[]>>;
}

const TagInput: NextPage<DraftPageProps> = ({ tagsValue = [], setTagValues }) => {
	const [input, setInput] = useState('');

	const [isKeyReleased, setIsKeyReleased] = useState(false);

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const { key } = e;
		const trimmedInput = input.trim();

		if (key === 'Enter' && trimmedInput.length && !tagsValue.includes(trimmedInput)) {
			e.preventDefault();
			setTagValues((prevState) => [...prevState, trimmedInput]);
			setInput('');
		}

		if (key === 'Backspace' && !input.length && tagsValue.length && isKeyReleased) {
			const tagsCopy = [...tagsValue];
			const poppedTag = tagsCopy.pop();
			e.preventDefault();
			setTagValues(tagsCopy);
			if (poppedTag) {
				setInput(poppedTag);
			}
		}

		setIsKeyReleased(false);
	};

	const onKeyUp = () => {
		setIsKeyReleased(true);
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setInput(value);
	};

	const deleteTag = (index: number) => {
		setTagValues((prevState) => prevState.filter((tag, i) => i !== index));
	};

	return (
		<div className="TagContainer">
			{tagsValue
				.filter((e) => e !== '')
				.map((tag, i) => (
					<div key={i} className="InputTag">
						{tag}
						<button onClick={() => deleteTag(i)}>x</button>
					</div>
				))}
			<input
				value={input}
				placeholder="Enter a tag"
				onKeyDown={onKeyDown}
				onKeyUp={onKeyUp}
				onChange={onChange}
			/>
		</div>
	);
};

export default TagInput;
