import { CurrencyRepository } from '@/core/currency/infrastructure/Currency.repository';
import { Currency } from '@/core/currency/domain/Currency.entity';

export class FindCurrenciesQuery {
	static execute(): Currency[] {
		return CurrencyRepository.findAll();
	}
}
