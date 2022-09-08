import { atom, selector } from 'recoil';

/**
 * post current
 */
export const postCurrentAtomState = atom<{ title: string; tags: string[]; contents: string }>({
	key: `post/currentState`,
	default: {
		title: `제목을 입력해 주세요.`,
		tags: [],
		contents: ``,
	},
});

/**
 * post current
 */
export const postCurrentStateSelect = selector({
	key: `post/currentStateSelect`,
	get: ({ get }) => {
		const { title, tags, contents } = get(postCurrentAtomState);

		return {
			title,
			tags,
			contents,
		};
	},
});
