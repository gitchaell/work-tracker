import { Currency } from '.';

export class CurrencyFormatter {
	static format(
		value: number,
		currency: Partial<Currency> = { code: 'USD', decimals: 2 }
	): string {
		return Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency.code,
			maximumFractionDigits: currency.decimals,
			minimumFractionDigits: currency.decimals,
			currencyDisplay: 'narrowSymbol',
		}).format(value);
	}
}
