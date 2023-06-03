import { CurrencyRepository } from '@/core/currency/infrastructure/Currency.repository';
import { CurrencyEntity } from '@/core/currency/domain/entities/Currency.entity';

export class FindCurrenciesQuery {
	static execute(): CurrencyEntity[] {
		return CurrencyRepository.findAll();
	}
}
