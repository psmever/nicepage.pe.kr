import { atom, selector } from 'recoil';

/**
 * app Root
 */
export const atomAppToastifyState = atom<{
	status: boolean;
	type: 'success' | 'error' | 'info';
	message: string;
}>({
	key: `app/toastifyState`,
	default: {
		status: false,
		type: 'success',
		message: '',
	},
});

/**
 * app Root
 */
export const selectAppToastifyState = selector({
	key: `app/toastifyStateSelect`,
	get: ({ get }) => {
		const { status, message } = get(atomAppToastifyState);

		return {
			status,
			message,
		};
	},
});
