import { CurrencyRepository } from '@/core/currency/infrastructure/Currency.repository';
import { CurrencyEntity } from '@/core/currency/domain/entities/Currency.entity';

export class FindCurrencyByCountryQuery {
	static execute({ country }: { country: string }): CurrencyEntity | null {
		const currencyEntities = CurrencyRepository.findAll();

		const currency = currencyEntities.find((currency) => currency.countries.includes(country));

		return currency || null;
	}
}
