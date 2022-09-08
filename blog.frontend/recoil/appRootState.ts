import { atom, selector } from 'recoil';
import * as CommonInterface from '@Types/commonInterface';

/**
 * app Root
 */
export const appRootAtomState = atom<{ codes: CommonInterface.CodesInterface }>({
	key: `app/appRootState`,
	default: {
		codes: {
			code_name: [],
			code_group: {
				A01: [],
				A02: [],
				A03: [],
				A04: [],
				A05: [],
			},
		},
	},
});

/**
 * app Root
 */
export const appRootStateSelector = selector({
	key: `app/appRootStateSelector`,
	get: ({ get }) => {
		const { codes } = get(appRootAtomState);

		return {
			codes,
		};
	},
});
