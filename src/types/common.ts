export type SelectDataType = {
	label: string
	value: any
	[x: string]: any
}

export interface ApiResponse<T> {
	data: T,
	status: string;
	message: string;
}

export interface ConvertedSumTransactionData {
	dataKey: string;
	income: number;
	expanse: number;
}