import { CurrencyRepository } from '@/core/currency/infrastructure/Currency.repository';
import { CurrencyEntity } from '@/core/currency/domain/entities/Currency.entity';

export class FindCurrencyByIdQuery {
	static execute({ id }: { id: string }): CurrencyEntity | null {
		return CurrencyRepository.findById(id);
	}
}
