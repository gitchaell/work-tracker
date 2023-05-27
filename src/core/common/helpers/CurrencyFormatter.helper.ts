export class CurrencyFormatter {
	static format(value: number, currency: string, digits: number): string {
		return Intl.NumberFormat('en-US', {
			style: 'currency',
			currency,
			maximumFractionDigits: digits,
			minimumFractionDigits: digits,
			currencyDisplay: 'narrowSymbol',
		}).format(value);
	}
}
