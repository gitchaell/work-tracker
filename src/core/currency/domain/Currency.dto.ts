export interface CreateCurrencyDTO {
	name: string;
	code: string;
	decimals: number;
	countries: string[];
}

export interface UpdateCurrencyDTO {
	id: string;
	name?: string;
	code?: string;
	decimals?: number;
	countries?: string[];
}

export interface FormatCurrencyDTO {
	code: string;
	decimals: number;
}

export interface FindCurrenciesDTO {
	limit: number;
}
