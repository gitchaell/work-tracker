import { IQuery, IQueryHandler, Injectable } from 'use-cqrs';

import { CurrencyRepository } from '@/core/currency/infrastructure/Currency.repository';
import { Currency } from '@/core/currency/domain/Currency.entity';

export class GetAllCurrenciesQuery implements IQuery {}

@Injectable(GetAllCurrenciesQuery)
export class GetAllCurrenciesQueryHandler implements IQueryHandler<GetAllCurrenciesQuery, Currency[]> {
	async handle(): Promise<Currency[]> {
		return CurrencyRepository.findAll();
	}
}
