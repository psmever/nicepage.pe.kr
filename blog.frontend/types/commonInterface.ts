// 공통 서버 결과.
export interface ServerDefaultResult<T> {
	status: boolean;
	message: string;
	payload: T;
}

// 코드 아이템
export interface CodeNameItem {
	code_id: string;
	code_name: string;
}

// 공통 코드
export interface CodesInterface {
	code_name: any;
	code_group: {
		A01: CodeNameItem[];
		A02: CodeNameItem[];
		A03: CodeNameItem[];
		A04: CodeNameItem[];
		A05: CodeNameItem[];
	};
}

// 폼 데이터.
export interface FormData {
	append(name: string, value: any, fileName?: string): void;

	set(name: string, value: any, fileName?: string): void;
}

// post 카테고리.
export type PostCategory = 'A05010' | 'A05020' | 'A05030' | 'A05040';
