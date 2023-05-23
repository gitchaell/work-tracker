import { FindCurrenciesQuery } from '@/core/currency/application/queries/FindCurrencies.query';

export class CurrencyService {
	static findCurrencies = FindCurrenciesQuery.execute;
}
