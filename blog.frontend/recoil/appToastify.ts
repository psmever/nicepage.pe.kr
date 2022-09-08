import { atom, selector } from 'recoil';
import * as CommonInterface from '@Types/commonInterface';

/**
 * app Root
 */
export const appToastifyAtomState = atom<{
	status: boolean;
	type: 'success' | 'error' | 'info';
	message: string;
}>({
	key: `app/ToastifyState`,
	default: {
		status: false,
		type: 'success',
		message: '',
	},
});

/**
 * app Root
 */
export const appToastifyStateSelector = selector({
	key: `app/ToastifyStateSelector`,
	get: ({ get }) => {
		const { status, message } = get(appToastifyAtomState);

		return {
			status,
			message,
		};
	},
});
