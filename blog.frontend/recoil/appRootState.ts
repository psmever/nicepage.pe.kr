import { atom, selector } from 'recoil';
import * as CommonInterface from '@Types/commonInterface';

// app Root
export const atomAppRootState = atom<{ codes: CommonInterface.CodesInterface }>({
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

// app Root
export const selectAppRootState = selector({
	key: `app/appRootStateSelect`,
	get: ({ get }) => {
		const { codes } = get(atomAppRootState);

		return {
			codes,
		};
	},
});
