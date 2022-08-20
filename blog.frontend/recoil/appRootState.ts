import { atom, selector } from 'recoil';
import * as CommonInterface from '@Types/commonInterface';

export const appRootAtomState = atom<{ codes: CommonInterface.CodesInterface }>({
	key: 'appRootState',
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

export const appRootStateSelector = selector({
	key: 'appRootStateSelector',
	get: ({ get }) => {
		const { codes } = get(appRootAtomState);

		return {
			codes,
		};
	},
});
