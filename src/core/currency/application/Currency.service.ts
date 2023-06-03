import { FindCurrenciesQuery } from '@/core/currency/application/queries/FindCurrencies.query';
import { FindCurrencyByIdQuery } from '@/core/currency/application/queries/FindCurrencyById.query';
import { FindCurrencyByCountryQuery } from '@/core/currency/application/queries/FindCurrencyByCountry.query';

export class CurrencyService {
	static findCurrencies = FindCurrenciesQuery.execute;
	static findCurrencyById = FindCurrencyByIdQuery.execute;
	static findCurrencyByCountry = FindCurrencyByCountryQuery.execute;
}
