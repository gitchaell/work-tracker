import { NumberFormatter } from '@/core/common/helpers/NumberFormatter.helper';
import { FormatCurrencyDTO } from '@/core/currency/domain/Currency.dto';

export class CurrencyFormatter {
	static format(value: number, currency?: FormatCurrencyDTO | null): string {
		return NumberFormatter.toCurrency(value, currency?.code || 'USD', currency?.decimals ?? 2);
	}
}
