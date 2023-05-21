import { Currency } from '@/core/currency/domain/Currency.entity';

export class CurrencyMapper {
	static toCurrency(currencyDTO: Partial<Currency>): Currency {
		return {
			name: currencyDTO.name,
			code: currencyDTO.code,
			decimals: currencyDTO.decimals,
			countries: currencyDTO.countries,
		} as Currency;
	}
}
