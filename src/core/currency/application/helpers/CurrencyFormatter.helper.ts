import { FormatCurrencyDTO } from '@/core/currency/domain/Currency.dto';

export class CurrencyFormatter {
	static format(value: number, currency: FormatCurrencyDTO = { code: 'USD', decimals: 2 }): string {
		return Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency.code,
			maximumFractionDigits: currency.decimals,
			minimumFractionDigits: currency.decimals,
			currencyDisplay: 'narrowSymbol',
		}).format(value);
	}
}
