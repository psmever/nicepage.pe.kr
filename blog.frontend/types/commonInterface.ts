export interface ServerDefaultResult<T> {
	status: boolean;
	message: string;
	payload: T;
}
export interface CodeNameItem {
	code_id: string;
	code_name: string;
}

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
