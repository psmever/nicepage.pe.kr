import { atom, selector } from 'recoil';

// app Posts
export const appPostsState = atom<{ posts: string[] }>({
	key: `app/appPostsState`,
	default: {
		posts: [],
	},
});

// app Posts
export const selectAppPostsState = selector({
	key: `app/selectAppPostsState`,
	get: ({ get }) => {
		const { posts } = get(appPostsState);

		return {
			posts,
		};
	},
});
