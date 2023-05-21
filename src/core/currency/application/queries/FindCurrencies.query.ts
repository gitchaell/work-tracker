import { CurrencyRepository } from '@/core/currency/infrastructure/Currency.repository';
import { Currency } from '@/core/currency/domain/Currency.entity';
import { FindCurrenciesDTO } from '@/core/currency/domain/Currency.dto';

const defaultParams: FindCurrenciesDTO = {
	limit: 10,
};

export class FindCurrenciesQuery {
	static execute({ limit }: FindCurrenciesDTO = defaultParams): Currency[] {
		const allCurrencies = CurrencyRepository.findAll();

		return allCurrencies.slice(0, limit);
	}
}
