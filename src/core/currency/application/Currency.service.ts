import { useCommand, useQuery } from 'use-cqrs';

import { Currency } from '@/core/currency/domain/Currency.entity';
import { CreateCurrencyDTO } from '@/core/currency/domain/Currency.dto';
import { GetAllCurrenciesQuery } from '@/core/currency/application/queries/GetAllCurrencies.query';
import { CreateCurrencyCommand } from '@/core/currency/application/commands/CreateCurrency.command';

export const CurrencyService = () => {
	const getAllCurrenciesQuery = useQuery<Currency[]>(new GetAllCurrenciesQuery());
	const createCurrencyCommand = useCommand();

	const findAllCurrencies = () => {
		const [response, process] = getAllCurrenciesQuery;
		process(new GetAllCurrenciesQuery());
		return response;
	};

	const createCurrency = (currency: CreateCurrencyDTO) => {
		const [response, execute] = createCurrencyCommand;
		execute(new CreateCurrencyCommand(currency));
		return response;
	};

	return {
		findAllCurrencies,
		createCurrency,
	};
};
