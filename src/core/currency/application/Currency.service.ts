import { FindCurrenciesQuery } from '@/core/currency/application/queries/FindCurrencies.query';
import { CreateCurrencyCommand } from '@/core/currency/application/commands/CreateCurrency.command';

export class CurrencyService {
	static findCurrencies = FindCurrenciesQuery.execute;
	static createCurrency = CreateCurrencyCommand.execute;
}
