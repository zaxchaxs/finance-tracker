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

interface ConversionRates {
    [key: string]: number; // This allows for dynamic keys representing currency codes and their conversion rates.
}

export interface ExchangeRateDataType {
    result: string;
    documentation: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
    base_code: string;
    conversion_rates: ConversionRates;
}