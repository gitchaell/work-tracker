import { NumberFormatter } from '@/core/common/helpers/NumberFormatter.helper';
import { FormatCurrencyDTO } from '@/core/currency/domain/Currency.dto';

export class CurrencyFormatter {
	static format(value: number, currency: FormatCurrencyDTO = { code: 'USD', decimals: 2 }): string {
		return NumberFormatter.toCurrency(value, currency.code, currency.decimals);
	}
}
