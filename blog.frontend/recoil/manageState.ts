import { atom, selector } from 'recoil';
import { PostCategory } from '@Types/commonInterface';

// atop post current
export const atomPostState = atom<{
	mode: 'create' | 'update' | '';
	category: PostCategory | '';
	uuid: string;
	currentData: { title: string; tags: string[]; contents: string };
	getData: { title: string; tags: string[]; contents: string };
}>({
	key: `manage/postState`,
	default: {
		mode: '',
		category: '',
		uuid: '',
		currentData: {
			title: '',
			tags: [],
			contents: '',
		},
		getData: {
			title: '',
			tags: [],
			contents: '',
		},
	},
});

// select post
export const selectPostState = selector({
	key: `manage/postStateSelect`,
	get: ({ get }) => {
		const { mode, category, uuid, currentData, getData } = get(atomPostState);

		return {
			mode,
			category,
			uuid,
			currentData,
			getData,
		};
	},
});
