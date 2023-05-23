export class NumberFormatter {
	static toCurrency(value: number, currency: string, digits: number): string {
		return Intl.NumberFormat('en-US', {
			style: 'currency',
			currency,
			maximumFractionDigits: digits,
			minimumFractionDigits: digits,
			currencyDisplay: 'narrowSymbol',
		}).format(value);
	}

	static toTimer(milliseconds: number): string {
		const pad = (number: number) => number.toString().padStart(2, '0');

		const seconds = Math.floor(milliseconds / 1000) % 60;
		const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
		const hours = Math.floor(milliseconds / (1000 * 60 * 60));

		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	}
}
