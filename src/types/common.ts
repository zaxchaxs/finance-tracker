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